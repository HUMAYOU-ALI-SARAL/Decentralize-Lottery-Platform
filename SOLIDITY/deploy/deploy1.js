const {network, ethers} = require("hardhat") 
const {networkConfig, developmentChains}=require("../helpers-hardhat")
module.exports=async function({ getNamedAccounts, deployments}){
   let vrfCoordinator;
   const{deploy,log}=deployments;
   const {deployer}=await getNamedAccounts()
   const chainId=network.config.chainId
   if(chainId===31337){
     const mock=await ethers.getContract("VRFCoordinatorV2Mock")
     vrfCoordinator=await mock.getAddress()
   }
   else{
      vrfCoordinator=networkConfig[chainId]["vrfCoordinator"]
   }
   const entranceFee=networkConfig[chainId]["entranceFee"]
   const subId=networkConfig[chainId]["subscriptionId"]
   const interval=networkConfig[chainId]["interval"];
   const callbackGasLimit=300;
   const gasLane=networkConfig[chainId]["gasLane"]
   const arguments=[entranceFee,vrfCoordinator,gasLane,subId,callbackGasLimit,interval]
   const Lottery=await deploy("Lottery",{
    from:deployer,
    log:true,
    args:arguments,
    waitConfirmation:network.config.blockConfirmations||1, 
   })
    log(arguments)
   log("------real contract deployed hurray!!!!!!!!!!!!!")
}
module.exports.tags=["all","Lottery"]
