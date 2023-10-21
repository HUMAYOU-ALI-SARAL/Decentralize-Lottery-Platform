const { network, ethers } = require("hardhat")
const {developmentChains}=require("../helpers-hardhat")

const baseFee=ethers.parseEther("0.25")
const gasPriceLink=1000000000
module.exports=async function({getNamedAccounts,deployments}){
// let vrfCoordinator;
const {deploy,log}=deployments
const {deployer}=await getNamedAccounts()
if(developmentChains.includes(network.name)){
  await deploy("VRFCoordinatorV2Mock",{
    from:deployer,
    log:true,
    args:[baseFee,gasPriceLink]
  })
  log("----------------------------")
  log("Mocks deployed hurrayyyyyy!!!!!!!!!!")
  log("----------------------------")
}

}
module.exports.tags=["all","mocks"]