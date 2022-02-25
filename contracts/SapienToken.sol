// SPDX-License-Identifier: GPL-3.0
// @author SYNDK8
// $SAPIEN Token

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract SapienToken is ERC20, ERC20Burnable, Ownable {
    mapping(address => bool) private minters;

    constructor(address _sponsor, uint256 _initSupply) ERC20("$SAPIEN TOKEN","SAPIEN"){
        _mint(_sponsor,_initSupply);
    }

    function setMintPrivilege(address _minter) public onlyOwner {
        require(!minters[_minter], "Address already has minter privilege");
        minters[_minter] = true;
    }

    function mintTokens(uint256 _amount) public payable {
        require(minters[msg.sender], "Address is not allowed to mint");
        _mint(msg.sender,_amount);
    }

    function revokeMintPrivilege(address _account) public onlyOwner {
        require(minters[_account], "Address is not allowed to mint");
        minters[_account] = false;
    }


}