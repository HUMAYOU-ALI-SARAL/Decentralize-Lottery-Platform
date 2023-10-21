const { ethers } = require("hardhat")

const networkConfig={
    11155111:{
        name:"sepolia",
        vrfCoordinator:"0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
        subscriptionId:"5888",
        entranceFee:ethers.parseEther("0.01"),
        gasLane:"0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        interval:"30"
    },
    31337:{
        name:"hardhat",
        subscriptionId:"5888",
        vrfCoordinator:"0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625",
        entranceFee:ethers.parseEther("0.01"),
        gasLane:"0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c",
        interval:"30"
        
    }
}
const developmentChains=["hardhat","localhost","sepolia"]



module.exports={networkConfig,developmentChains}