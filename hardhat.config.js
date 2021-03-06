/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require('@nomiclabs/hardhat-ethers');
 require('@nomiclabs/hardhat-etherscan');
 require("@nomiclabs/hardhat-web3");
 require("hardhat-gas-reporter");
 require('hardhat-storage-layout');

const { bsctestnetPrivateKey } = require('./.secret/secrets.json');
const { etherscanAPIkey } = require('./.secret/secrets.json');

 // This is a sample Hardhat task. To learn how to create your own go to
 // https://hardhat.org/guides/create-task.html
 task("accounts", "Prints the list of accounts", async () => {
   const accounts = await ethers.getSigners();
 
   for (const account of accounts) {
     console.log(account.address);
   }
 });
 
 // You need to export an object to set up your config
 // Go to https://hardhat.org/config/ to learn more
 
 /**
  * @type import('hardhat/config').HardhatUserConfig
  */
 module.exports = {
   defaultNetwork: "hardhat",
   networks: {
     localhost: {
       url: "http://127.0.0.1:8545"
     },
     hardhat: {
     },
     bsctestnet: {
       url: "https://data-seed-prebsc-1-s1.binance.org:8545",
       chainId: 97,
       gasPrice: 20000000000,
       accounts: {mnemonic: bsctestnetPrivateKey}
     }
   },
   etherscan: {
     apiKey: etherscanAPIkey
   },  
   solidity: {
   version: "0.8.9",
   settings: {
     optimizer: {
       enabled: true
     },
     outputSelection: {
      "*": {
          "*": ["storageLayout"],
      },
    }
    }
   },
   paths: {
     sources: "./contracts",
     tests: "./test",
     cache: "./cache",
     artifacts: "./artifacts"
   },
   mocha: {
     timeout: 20000
   }
 };
 