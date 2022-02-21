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

    struct Item {
        uint128 _price;
        uint128 max_supply;
    }

    struct Sapien {
        uint256 multiplier;
        uint256 poison_count;
        uint256 counters;
        bool initialized;
    }

    Item public upgrade_fire;
    Item public upgrade_gen2Tools;
    Item public poison_vial;
    Item public serum;
    Item public fur_pelt;

    uint128 public base_rate;
    bool private paused;
    mapping(address => EnumerableSet.UintSet) private _deposits;
    mapping(address => mapping(uint256 => uint256)) public _depositTimestamps;
    mapping(uint256 => Sapien) private _sapienStats;
    IERC20 public tokenAddress;
    ERC721S public nftAddress;

    constructor (ERC721S _nftAddress, IERC20 _tokenAddress) {
        base_rate = 10;
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
            nftAddress.safeTransferFrom(msg.sender,address(this),tokenIds[i],"");
            _deposits[msg.sender].add(tokenIds[i]);
            _depositTimestamps[msg.sender][tokenIds[i]] = block.timestamp; // save timestamp for reward calc

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

        return (base_rate * _sapienStats[tokenId].multiplier * (block.timestamp - depositTimestamp)/3600)/10;
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
