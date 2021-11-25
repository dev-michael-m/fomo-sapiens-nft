// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Sapien is ERC721Enumerable, Ownable{
    using Strings for uint256;
    // keep track of total number of NFTs alloted
    uint256 public supply = 2000;
    uint256 public presale_supply = 1000;
    uint256 public tokenCount;
    uint256 private _sapienPrice = 1 ether;
    bool private public_active = false; // variable for public sale
    bool private presale_active = false; // variable for presale
    bool public paused = false;
    bool public revealed = false;
    mapping(address => bool) public whitelist;
    
    constructor() public ERC721("FOMO SAPIENS", "SAPIEN") {}

    // @recipient: recipient's address
    // @tokenURI: URL to NFT metadata (ie. Pinata)
    // @_tokenId: randomly generated tokenId to attach to metadata
    // this is a payable contract
    function _publicMint(address recipient) public payable returns(uint256)
    {
        // tokenId must be generated on-chain***
        // sale must be active to mint NFTs
        require(!paused);

        require(public_active, "Sale is currently inactive");
        // Ether sent must equal the amount of a Sapien
        require(msg.value == _sapienPrice, "Incorrect amount of ether");
        uint256 _tokenId = getRand();
        require(!_exists(_tokenId), "This NFT has already been minted");
        // Each address is allowed one Sapien
        require(getBalance(msg.sender) == 0, "You cannot mint more than one Sapien");
        // Tokens minted must not exceed the supply of tokens
        require(getTokensMinted() < supply, "All NFTs have been minted");
        
        _safeMint(recipient, _tokenId);
        //_setTokenURI(_tokenId, tokenURI);
        tokenCount = tokenCount + 1;

        return _tokenId;
    }

    function _presaleMint(address recipient) public payable returns(uint256)
    {
        // tokenId must be generated on-chain***
        // sale must be active to mint NFTs
        require(!paused);

        require(presale_active, "Sale is currently inactive");

        uint256 _tokenId = getRand();
        require(!_exists(_tokenId), "This NFT has already been minted");

        require(whitelist[recipient] == true, "You must be on the whitelist to mint");
        // Ether sent must equal the amount of a Sapien
        require(msg.value == _sapienPrice, "Incorrect amount of ether");
        // Each address is allowed one Sapien
        require(getBalance(msg.sender) == 0, "You cannot mint more than one Sapien");
        // Tokens minted must not exceed the supply of presale tokens
        require(getTokensMinted() < presale_supply, "All presale NFTs have been minted");
        
        _safeMint(recipient, _tokenId);
        //_setTokenURI(_tokenId, tokenURI);
        tokenCount = tokenCount + 1;

        return _tokenId;
    }
    
    // @_owner: recipient's address
    // @returns: number of tokens currently in wallet
    function getBalance(address _owner) public view returns (uint256){
        return balanceOf(_owner);
    }
    
    // @getTokensMinted: returns the number of NFTs currently minted
    function getTokensMinted() public view returns (uint256){
        return tokenCount;
    }
    
    // @_active: sale boolean
    function setPublicSale(bool _active) public onlyOwner {
        public_active = _active;
    }

    function setPresale(bool _active) public onlyOwner {
        presale_active = _active;
    }

    function getPublicSale() public view returns (bool){
        return public_active;
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

    // convert this to private once finished
    function getRand() public view returns(uint256){
        // issue: calling block.timestamp creates similar rand num for the same sender if called quick enough
        return uint256(keccak256(abi.encodePacked(block.timestamp,msg.sender,tx.gasprice))) % supply;
    }

    function withdraw() public payable onlyOwner {

        // withdraw 30% of funds to DAO

        // withdraw 23.33% of funds to F1

        // withdraw 23.33% of funds to F2

        // withdraw 23.33% of funds to F3

        // withdraw remaining funds to owner
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}