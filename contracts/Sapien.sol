// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Sapien is ERC721Enumerable, Ownable{
    using Strings for uint256;

    uint256 public MAX_SUPPLY = 2000;
    uint256 public PRESALE_SUPPLY = 1000;
    uint256 private SALE_PRICE = 0.1 ether;
    bool private active = false; // variable for public sale
    bool private presale_active = false; // variable for presale
    bool public paused = false;
    bool public revealed = false;
    mapping(address => bool) public whitelist;
    
    constructor() public ERC721("FOMO SAPIENS", "FSNFT") {}

    function mint() public payable returns(uint256)
    {
        require(!paused);
        // sale must be active
        require(active || presale_active, "Sale is currently inactive");
        // Ether sent must equal the amount of a Sapien
        require(msg.value == SALE_PRICE, "Incorrect amount of ether");
        
        if(presale_active){
            // sender must be on whitelist during presale
            require(whitelist[msg.sender] == true, "You must be on the whitelist to mint");
        }
        // Each address is allowed one Sapien
        require(balanceOf(msg.sender) == 0, "You cannot mint more than one Sapien");
        // Tokens minted must not exceed the supply of tokens
        if(presale_active && !active){
            require(totalSupply() < PRESALE_SUPPLY, "All Sapiens have been minted");
        }else{
            require(totalSupply() < MAX_SUPPLY, "All Sapiens have been minted");
        }   

        uint256 _tokenId = getRand();

        // check if random token exists
        if(_exists(_tokenId)){
            // find next available token
            for(uint256 i = _tokenId; i <= MAX_SUPPLY; i++){
                if(!_exists(i)){
                    _tokenId = i;   // set token to available
                    break;
                }
            }
        } 

        // loop to the front
        if(_exists(_tokenId)){
            // find next available token
            for(uint256 i = _tokenId; i >= 1; i--){
                if(!_exists(i)){
                    _tokenId = i;
                    break;
                }
            }
        }    

        // double check to make sure random token has not been minted
        require(!_exists(_tokenId), "Cannot mint this token");
        
        _safeMint(msg.sender, _tokenId);
        //_setTokenURI(_tokenId, tokenURI);

        return _tokenId;
    }
    
    // @_active: sale boolean
    function setPublicSale(bool _active) public onlyOwner {
        active = _active;
    }

    function setPresale(bool _active) public onlyOwner {
        presale_active = _active;
    }

    function getPublicSale() public view returns (bool){
        return active;
    }

    function getPresale() public view returns (bool){
        return presale_active;
    }

    function setPaused(bool _state) public onlyOwner {
        paused = _state;
    }

    function whitelistUser(address _user) public onlyOwner {
        whitelist[_user] = true;
    }
 
    function removeWhitelistUser(address _user) public onlyOwner {
        whitelist[_user] = false;
    }

    function setReveal(bool _reveal) public onlyOwner {
        revealed = _reveal;
    }

    function getRand() public view returns(uint256){
        // generates random num from 1 - 2000
        return uint256(keccak256(abi.encodePacked(block.difficulty,msg.sender,tx.gasprice))) % MAX_SUPPLY + 1;
    }

    function withdraw() public payable onlyOwner {

        // withdraw 30% of funds to DAO

        // withdraw 23.33% of funds to F1

        // withdraw 23.33% of funds to F2

        // withdraw 23.33% of funds to F3

        // withdraw remaining funds to contract owner
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}