require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-ethers")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const PrivateKey=process.env.PrivateKey
const EtherScanApiKey=process.env.EtherScanApiKey
const Sepolia_Rpc_Url=process.env.Sepolia_Rpc_Url
/** 
 * 
@type import('hardhat/config').HardhatUserConfig 
*/

module.exports={
  defaultNetwork:"hardhat",
  solidity:"0.8.18",
  namedAccounts: {
        deployer: {
            default: 0, 
            1:0// here this will by default take the first account as deployer
             // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
        player: {
            default: 0,
        },
    },
  networks:{
    hardhat:{
      chainId:31337,
      blockConfirmation:1,
    },
    sepolia:{
      url:Sepolia_Rpc_Url||"https://eth-sepolia.g.alchemy.com/v2/ElyVvZi045_6qUvVtN4HagaSbIfr0WQx",
      accounts:PrivateKey!==undefined?[PrivateKey]:["fe4a041b1774b72457f94a9b347cc66c3fc4e581735165c7e4b4b7637e8ec658"],
      chainId:11155111,
      blockConfirmation:6,
    }
  },
  gasReporter:{
   enabled:false,
   currency:"USD",
   outputFile:"gas-reporter.txt",
   noColors:true
  },
  mocha: {
    timeout: 500000, // 500 seconds max for running tests
},
}