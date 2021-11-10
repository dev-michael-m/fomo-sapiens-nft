// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Sapien is ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // keep track of total number of NFTs alloted
    uint256 public supply;
    uint256 public tokenCount;
    uint256 private _sapienPrice = 80000000000000000;
    bool private active;
    
    constructor(string memory _name, string memory _symbol, uint256 _supply) public ERC721(_name, _symbol) {
        supply = _supply;
    }

    // @recipient: recipient's address
    // @tokenURI: URL to NFT metadata (ie. Pinata)
    // this is a payable contract
    function mintSapien(address recipient, string memory tokenURI) public payable returns (uint256)
    {
        // sale must be active to mint NFTs
        require(active, "Sale is currently inactive");
        // Ether sent must equal the amount of a Sapien
        require(msg.value == _sapienPrice, "Incorrect amount of ether");
        // Each address is allowed one Sapien
        require(getBalance(recipient) == 0, "You cannot mint more than one Sapien");
        // Tokens minted must not exceed the supply of tokens
        require(getTokensMinted() < supply, "All NFTs have been minted");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCount = tokenCount + 1;
        return newItemId;
    }
    
    // @_owner: recipient's address
    // @returns: number of tokens currently in wallet
    function getBalance(address _owner) private returns (uint256){
        uint256 tokens = balanceOf(_owner);
        return tokens;
    }
    
    // @getTokensMinted: returns the number of NFTs currently minted
    function getTokensMinted() public view returns (uint256){
        return tokenCount;
    }
    
    // @_active: sale boolean
    function setActive(bool _active) public onlyOwner {
        active = _active;
    }
}