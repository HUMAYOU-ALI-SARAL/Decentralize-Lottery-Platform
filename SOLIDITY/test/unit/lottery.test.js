const { network,ethers, deployments } = require('hardhat')
const {developmentChains, networkConfig}=require('../../helpers-hardhat');
const { assert, expect } = require('chai');
// !developmentChains.includes[network.name]?
// describe.skip:
describe("Lottery Unit Testing",async()=>{
let Lottery,vrfV2Mock,accounts,player,chainId,entryFee,interval;
chainId=network.config.chainId
beforeEach(async()=>{
    accounts=await ethers.getSigners()
    player=accounts[1]
    await deployments.fixture(["Lottery","mocks"])
    Lottery=await ethers.getContract("Lottery")
    vrfV2Mock=await ethers.getContract("VRFCoordinatorV2Mock")
    interval=await Lottery.getCurrentInterval()
    entryFee=await Lottery.getEntryFee()
 
})
describe("Constructor",function(){
    it("initialize Constructor",async()=>{
        const LotteryState=(await Lottery.getLotteryState().toString())
        assert(LotteryState,"0")
    })
})


describe("Interval",()=>{
    it("gets Interval",async()=>{
     assert(interval,networkConfig[chainId]["interval"])
    })
})


describe("Enter Raffle",()=>{
    it("reverts when amount is less than entry fee",async()=>{
        await expect(Lottery.getEntered()).to.be.revertedWith("LowAmount")
    })
    it("record new player after paying entry fee",async()=>{
        await Lottery.getEntered({value:entryFee})
        const playerFromContract=await Lottery.getPlayer(0)
        assert(playerFromContract,player)
    })
    it("emits event when player get entered",async()=>{
        const getEnter=await expect(Lottery.getEntered({value:entryFee}))
        getEnter.to.emit(Lottery,"participantEntered")
    })

    it("does not allow entrance when lottery s calculating",async()=>{
        await network.provider.send("evm_increaseTime",[interval.toNumber()+1])
        await network.provider.send("evm_mine",[])
        await Lottery.performUpkeep([])
    })
})





})
