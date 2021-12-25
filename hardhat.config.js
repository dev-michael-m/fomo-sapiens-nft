/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
   solidity: {
      version: "0.8.0",
      settings: {
         optimizer: {
            enabled: true,
            runs: 200
         }
      }
   },
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: process.env.API_URL,
         accounts: [`0x${process.env.REACT_APP_PRIVATE_KEY}`]
      }
   },
   etherscan: {
      apiKey: process.env.ETHERSCAN_API
   }
}