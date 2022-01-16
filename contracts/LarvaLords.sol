// SPDX-License-Identifier: GPL-3.0
// Larva Lords NFT Contract

// Audited 1/16/2022 - SSAP
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LarvaLords is ERC721, Ownable {
    using Strings for uint256;

    uint256 public MAX_SUPPLY = 5432;
    uint256 public MAX_BATCH = 10;
    uint256 private SALE_PRICE = 0.008 ether;
    uint256 public _tokenIds;
    bool public active;
    bool public paused;
    string public BASE_URL;
    bytes32 public EXTENSION = ".json";
    address public founder = 0x0200E96F5253EdD00769E443ec904bC3fa1cE0fC;

    constructor() ERC721("Larva Lords", "LARVA") {}

    /*
    *   @dev Mints Larva Lord NFT
    * Requirements:
    * - `tokensToMint` can only be the value 1 - MAX_BATCH
    * - User cannot mint more than MAX_BATCH per transaction
    */
    function mint(uint256 tokensToMint) public payable
    {
        require(!paused);
        require(active, "Sale is currently inactive");
        require(tx.origin == msg.sender, "Contracts are not allowed to mint");
        require(tokensToMint <= MAX_BATCH, "Only allowed to mint 10 tokens per transaction");
        require(msg.value == (SALE_PRICE * tokensToMint), "Incorrect amount of ether");
        require(_tokenIds < MAX_SUPPLY, "All tokens have been minted");
        require((_tokenIds + tokensToMint) <= MAX_SUPPLY, "Purchase would exceed max supply of tokens");

        for(uint256 i = 0; i < tokensToMint; i++){ 
            _mint(msg.sender, _tokenIds);
            _tokenIds++;    
        }       
    }

    /*
    *   @dev Returns the tokenURI to the tokens Metadata
    * Requirements:
    * - `_tokenId` Must be a valid token
    * - `BASE_URL` Must be set
    */
    function tokenURI(uint256 _tokenId) public view virtual override returns(string memory){
        return string(abi.encodePacked(BASE_URL, _tokenId.toString(), EXTENSION));
    }

    /*
    *   @dev Sets the state of the public sale
    * Requirements:
    * - `_active` Must be a boolean value
    */
    function setPublicSale(bool _active) public onlyOwner {
        active = _active;
    }

    /*
    *   @dev Sets the state of paused for emergency
    * Requirements:
    * - `_state` Must be a boolean value
    */
    function setPaused(bool _state) public onlyOwner {
        paused = _state;
    }

    /*
    *   @dev Sets the BASE_URL for tokenURI
    * Requirements:
    * - `_url` Must be in the form: ipfs//hash/
    */
    function setBaseURL(string memory _url) public onlyOwner {
        BASE_URL = _url;
    }

    function withdraw() public payable onlyOwner {
        (bool os,)= payable(founder).call{value:address(this).balance}("");
        require(os);
    }
}