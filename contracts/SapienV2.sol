// SPDX-License-Identifier: GPL-3.0
// @author SYNDK8
// FOMO SAPIENS NFT Contract

pragma solidity >=0.7.0 <0.9.0;

import "./ERC721S.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Sapien is ERC721S, Ownable{
    using Strings for uint256;
    using ECDSA for bytes32;
    using ECDSA for bytes;

    struct Config {
        bool active;
        bool presale_active;
        bool paused;
        bool revealed;
        uint16 starting_idx;
        uint16 _tokenIds;
        uint16 max_supply;
        uint16 max_mint;
        uint16 GIVEAWAYS;
        uint256 SALE_PRICE;
        string BASE_URL;
        string FSNFT_PROVENANCE;
    }

    uint256 private starting_block_num;    
    bytes32 public EXTENSION = ".json";
    mapping(address => uint256) private minted;
    Config public config;
    address pubkey = 0x103EcE5B498b9c425295F58148Aa5bdAc7575708;
    address DAO = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    address founder1 = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db;
    address founder2 = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;
    address founder3 = 0x617F2E2fD72FD9D5503197092aC168c91465E7f2;  

    
    
    constructor() ERC721S("FOMO SAPIENS NFT", "SAPIEN", 6000, 3) {
        config.max_supply = 6000;
        config.max_mint = 3;
        config.GIVEAWAYS = 30;
        config.SALE_PRICE = 0.1 ether;
    }

    function mint(uint16 quantity) public payable
    {
        uint16 ids = config._tokenIds;

        require(!config.paused);
        require(config.active, "Sale is currently inactive");
        require(tx.origin == msg.sender, "Contracts are not allowed to mint");
        require(msg.value == (config.SALE_PRICE * quantity), "Incorrect amount of ether");
        require(ids < config.max_supply, "All Sapiens have been minted");
        require((ids + quantity) <= config.max_supply, "Purchase would exceed max supply of sapiens"); 
        require(balanceOf(msg.sender) < config.max_mint, "You cannot mint more than 3 sapiens from the same address");
        require((balanceOf(msg.sender) + quantity) <= config.max_mint, "You cannot mint more than 3 sapiens");
         
        _mint(msg.sender, quantity);
        config._tokenIds = ids + quantity;     
    }

    /**
    *   @dev function to set aside tokens for giveaways.
    */
    // this will cause an issue when minting for giveaways
    function devMint() public onlyOwner {

        uint256 num_batch = config.GIVEAWAYS / config.max_mint;

        for(uint256 i = 0; i < num_batch; i++){ 
            _mint(msg.sender, config.max_mint);
        }

        config._tokenIds += config.GIVEAWAYS;
    }

    /**
    *   @dev function for members to reserve sapiens.  Address must be whitelisted to reserve.
    *   @param _signature - used to verify whitelisted address.
    */
    function whitelistMint(bytes calldata _signature, uint16 quantity) public payable {
        require(!config.paused);
        require(config.presale_active,"Presale is currently inactive");
        require(tx.origin == msg.sender,"Contracts are not allowed to mint");
        require(isWhitelisted(_signature, msg.sender),"Must be on whitelist to mint a sapien");
        require(msg.value == (config.SALE_PRICE * quantity),"Incorrect amount of ether");
        require((minted[msg.sender] + quantity) <= config.max_mint,"You cannot mint more than 3 Sapiens");
        require(minted[msg.sender] < config.max_mint,"You can only mint up to 3 Sapiens from the same address");
        
        minted[msg.sender] += quantity;
        _mint(msg.sender, quantity);
        config._tokenIds += quantity;
    }

    /**
    *   @dev function displays placeholder image if not revealed, otherwise displays token image.
    *   @param _tokenId - minted tokenId
    *   @return tokenURI
    */
    function tokenURI(uint256 _tokenId) public view virtual override returns(string memory){
        return !config.revealed ? config.BASE_URL : string(abi.encodePacked(config.BASE_URL, _tokenId.toString(), EXTENSION));
    }
    
    function setPublicSale() public onlyOwner {
        config.active = !config.active;
    }

    function setPresale() public onlyOwner {
        config.presale_active = !config.presale_active;
    }

    function setPaused() public onlyOwner {
        config.paused = !config.paused;
    }

    function setProvenanceHash(string memory _provenance) public onlyOwner {
        require(starting_block_num == 0,"Provenance has already been set");

        config.FSNFT_PROVENANCE = _provenance;
        starting_block_num = block.number;
    }

    function getInitialSequence() internal override view returns (uint16){
        return (config._tokenIds + config.starting_idx) % config.max_supply + 1;
    }

    function _exists(uint16 tokenId) internal view override returns (bool) {
        if(tokenId > 0 && tokenId <= config.max_supply){
            if(tokenId < config.starting_idx){
                return tokenId + config.max_supply - config.starting_idx <= config._tokenIds;
            }

            return tokenId - config.starting_idx <= config._tokenIds;
        }

        return false;
    }

    function setStartingIdx() public onlyOwner {
        _setStartingIdx(starting_block_num);
    }

    function _setStartingIdx(uint256 starting_block) internal virtual {
        require(config.starting_idx == 0,"Starting index has already been set");

        config.starting_idx = uint16(uint256(blockhash(starting_block)) % config.max_supply);
    }

    function toggleReveal(string memory _url) public onlyOwner {
        config.BASE_URL = _url;
        config.revealed = !config.revealed;
    }

    function totalSupply() public view returns (uint16) {
        return config._tokenIds;
    }

    function setBaseURL(string memory _url) public onlyOwner {
        config.BASE_URL = _url;
    }

    /**
    *   @dev function to verify address is whitelisted
    *   @param _signature - used to verify address
    *   @param _user - address of connected user
    *   @return bool verification
    */
    function isWhitelisted(bytes calldata _signature, address _user) public view returns(bool) {
        return abi.encode(_user,config.max_supply).toEthSignedMessageHash().recover(_signature) == pubkey;
    }

    function withdraw() public payable onlyOwner {
        // transfer 20% of funds to DAO
        (bool dao,)= payable(DAO).call{value:(address(this).balance * 20 / 100)}("");
        require(dao);

        uint256 remainingBalance = address(this).balance * 33 / 100;
        payable(founder1).transfer(remainingBalance);
        payable(founder2).transfer(remainingBalance);
        payable(founder3).transfer(remainingBalance);

        (bool os,)= payable(DAO).call{value:address(this).balance}("");
        require(os);
    }
}