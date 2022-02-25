// SPDX-License-Identifier: GPL-3.0
// @author SYNDK8
// FOMO SAPIENS OutPost

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ERC721S.sol";

contract TheOutpost is IERC721Receiver, Ownable {
    using EnumerableSet for EnumerableSet.UintSet;

    struct Sapien {
        uint256 multiplier;
        uint256 counter;
        uint16 evolution;
        bool initialized;
    }

    uint128 public base_rate = 100;
    uint16 public MAX_EVOLUTION = 3;
    uint256 public evolution_rate = 120;
    bool private paused;
    mapping(address => EnumerableSet.UintSet) private _deposits;
    mapping(address => mapping(uint256 => uint256)) public _depositTimestamps;
    mapping(uint256 => Sapien) private _sapienStats;
    IERC20 public tokenAddress;
    ERC721S public nftAddress;

    constructor (ERC721S _nftAddress, IERC20 _tokenAddress) {
        nftAddress = _nftAddress;
        tokenAddress = _tokenAddress;
    }

    function setRate(uint128 _rate) public onlyOwner {
        base_rate = _rate;
    }

    function getDeposits(address _account) public view returns (uint256) {
        return EnumerableSet.length(_deposits[_account]);
    }

    function deposit(uint256[] calldata tokenIds) public payable {
        require(!paused);
        require(msg.sender != address(this), "Invalid address");

        for(uint256 i = 0; i < tokenIds.length; i++){
            
            _deposits[msg.sender].add(tokenIds[i]);
            _depositTimestamps[msg.sender][tokenIds[i]] = block.timestamp; // save timestamp for reward calc
            nftAddress.safeTransferFrom(msg.sender,address(this),tokenIds[i],"");
            // initialize sapien multiplier if not set
            if(!_sapienStats[tokenIds[i]].initialized){
                _sapienStats[tokenIds[i]].initialized = true;
                _sapienStats[tokenIds[i]].multiplier = 1;
            }
        }
    }

    function claim(address _account, uint256[] calldata tokenIds) public payable {
        require(!paused);

        uint256 total_reward;

        for(uint256 i = 0; i < tokenIds.length; i++){
            total_reward += calcReward(_account,tokenIds[i]);
            _depositTimestamps[_account][tokenIds[i]] = block.timestamp;  // reset timestamp after claiming rewards
        }
        
        // transfer reward to holder
        tokenAddress.transfer(_account,total_reward);
    }

    function calcReward(address _account, uint256 tokenId) public view returns(uint256) {
        uint256 depositTimestamp = _depositTimestamps[_account][tokenId];
    
        require(block.timestamp > depositTimestamp, "Invalid timestamp");
        require(_deposits[_account].contains(tokenId), "Calculating reward for an unstaked token");

        return (base_rate * _sapienStats[tokenId].multiplier * (block.timestamp - depositTimestamp)/3600);
    }

    function withdraw(uint256[] calldata tokenIds) public payable {
        require(!paused);
        claim(msg.sender, tokenIds);

        // remove token from deposits
        for(uint256 i = 0; i < tokenIds.length; i++){
            require(_deposits[msg.sender].contains(tokenIds[i]), "Cannot withdraw unstaked token");
            _deposits[msg.sender].remove(tokenIds[i]);

            // transfer token back to original owner
            nftAddress.safeTransferFrom(address(this),msg.sender,tokenIds[i],"");
        }
    }

    // method to use an item that was purchased
    function useItem(uint256 _item, uint256 _tokenId) public view {

    }

    // method to remove a degradeable item that was purchased
    function destroyItem(uint256 _item, uint256 _tokenId) public view {

    }

    // method to evolve a single sapien token
    function evolve(uint256 _tokenId) public {
        uint16 _evolution = _sapienStats[_tokenId].evolution;
        require(_deposits[msg.sender].contains(_tokenId), "Attempt to evolve an unstaked token");
        require(_evolution < MAX_EVOLUTION, "You have hit the maximum evolution for this Sapien");
        // require(tokenAddress.balanceOf(msg.sender) >= evolution price);

        _sapienStats[_tokenId].evolution += 1;
        _sapienStats[_tokenId].multiplier += (_evolution * evolution_rate);

        // msg.sender needs to burn tokens equal to price
    }

    function getMultiplier(uint256 _tokenId) public view returns(uint256) {
        return _sapienStats[_tokenId].multiplier;
    }

    // method to purchase an item from the outpost
    function purchaseItem(uint256 _item) public view {
        // require(tokenAddress.balanceOf(msg.sender) >= items price);
        // msg.sender mints ERC1155 Item token
        // msg.sender must burn tokens equal to item price
    }

    function togglePaused() public onlyOwner {
        paused = !paused;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

}
