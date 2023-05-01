require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */

const INFURA_URL = process.env.INFURA_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

module.exports = {
  solidity: {
    compilers:[
      {version:"0.8.18"},
      {version: "0.8.0"},
    ]
  },
  networks:{
    sepolia:{
      url:INFURA_URL,
      accounts:[PRIVATE_KEY],
      chainid: 11155111,
    }
  },
  namedAccounts:{
    deployer:{
      default: 0,
    },
  },
};
