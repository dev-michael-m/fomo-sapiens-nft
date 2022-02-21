// SPDX-License-Identifier: GPL-3.0
// @author SYNDK8
// $SAPIEN Token

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SapienToken is ERC20 {
    uint256 public _supply = 1001001001;

    constructor() ERC20("$SAPIEN TOKEN","SAPIEN"){
        _mint(address(this),_supply);
    }
}