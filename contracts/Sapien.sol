// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Sapien is ERC721Enumerable, Ownable{
    using Strings for uint256;
    // keep track of total number of NFTs alloted
    uint256 public MAX_SUPPLY = 14; // change val before launch
    uint256 public PRESALE_SUPPLY = 7;  // change val before launch
    uint256 private SALE_PRICE = 0.1 ether;
    bool private active = false; // variable for public sale
    bool private presale_active = false; // variable for presale
    bool public paused = false;
    bool public revealed = false;
    string public BASE_URL = "ipfs://QmVy1ZWFhg6stX7VSo2XoFopoLqJVT7xc3RWReQ6MXCRMV/";
    string public PLACEHOLDER = "ipfs://QmWnrqkBe9Z1B24H5hooiMMN7z4ZpKRM2N2nNcZPPi7s5r";
    string public EXTENSION = ".json";   // change this to .json for metadata
    mapping(address => bool) public whitelist;
    
    constructor() public ERC721("FOMO SAPIENS", "SAPIEN") {}

    function mint() public payable returns(string memory)
    {
        require(!paused);
        // sale must be active
        require(active || presale_active, "Sale is currently inactive");
        
        if(presale_active){
            // sender must be on whitelist during presale
            require(whitelist[msg.sender] == true, "You must be on the whitelist to mint");
        }

        // Ether sent must equal the amount of a Sapien
        require(msg.value == SALE_PRICE, "Incorrect amount of ether");

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
        string memory _tokenURI = tokenURI(_tokenId);

        return _tokenURI;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns(string memory){
        if(!revealed){
            return PLACEHOLDER;
        }

        return bytes(BASE_URL).length > 0
        ? string(abi.encodePacked(BASE_URL, _tokenId.toString(), EXTENSION)) : "";
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
        // generates random num from 1 - MAX_SUPPLY
        return uint256(keccak256(abi.encodePacked(block.difficulty,msg.sender,tx.gasprice))) % MAX_SUPPLY + 1;
    }

    function withdraw() public payable onlyOwner {
        // **Replace all test addresses before deployment to mainnet**
        // transfer 30% of funds to DAO
        (bool dao, ) = payable(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2).call{value: address(this).balance * 30 / 100}("");
        require(dao);
        // transfer 23.33% of funds to F1
        (bool f1, ) = payable(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db).call{value: address(this).balance * 23 / 100}("");
        require(f1);
        // transfer 23.33% of funds to F2
        (bool f2, ) = payable(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB).call{value: address(this).balance * 23 / 100}("");
        require(f2);
        // transfer 23.33% of funds to F3
        (bool f3, ) = payable(0x617F2E2fD72FD9D5503197092aC168c91465E7f2).call{value: address(this).balance * 23 / 100}("");
        require(f3);
        // transfer remaining funds to contract owner
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}