const { network, getNamedAccounts, ethers, deployments } = require('hardhat')
const {developmentChains, networkConfig}=require('../../helpers-hardhat');
const { assert } = require('chai');
// !developmentChains.includes[network.name]?
// describe.skip:
describe("Lottery Unit Testing",async()=>{
let Lottery,vrfV2Mock,accounts,player,interval,chainId;
beforeEach(async()=>{
    accounts=await ethers.getSigners()
    player=accounts[1]
    await deployments.fixture(["Lottery","mocks"])
    Lottery=await ethers.getContract("Lottery")
    vrfV2Mock=await ethers.getContract("VRFCoordinatorV2Mock")
    interval=await Lottery.getCurrentInterval()
    chainId=network.config.chainId
    console.log(interval)
})
describe("Constructor",function(){
    it("initialize Constructor",async()=>{
        const LotteryState=(await Lottery.getLotteryState().toString())
        assert(LotteryState,"0")
    })
})

describe("Entry Fee",()=>{
it("initialized entry fee",async()=>{
    // const entryFee=networkConfig[chainId]["entranceFee"]
    const entryFee=await Lottery.getEntryFee()
    assert(entryFee,networkConfig[chainId]["entranceFee"])
})
})





})