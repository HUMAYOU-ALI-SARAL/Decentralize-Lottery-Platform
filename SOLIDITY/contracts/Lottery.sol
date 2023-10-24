// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.18;
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";


error LowAmount();
error tranferFailed();
error invalidTimeInterval();
error  insufficientPlayers();
error insufficientFunds();
error lotteryUpkeepNotNeeded(uint currentbalance,uint players,uint lotteryState);
contract Lottery is VRFConsumerBaseV2,AutomationCompatibleInterface{
   //events
   //participant entered
   event participantEntered(address indexed);
   event requestLotteryWinner(uint indexed requestId);
   event WinnerPicked(address);
    // State Variables
    uint private immutable i_entryFee;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subcriptionId;
    uint16 requestConfirmations = 3;
    uint32 private immutable i_callbackGasLimit;
    uint32 private NUM_Words=1;
    address payable[] private players;
    VRFCoordinatorV2Interface private immutable i_vrfCoordinatorInterface;
    uint private lastTimeStamp;
    // Lottery Variables
    address payable public s_recentWinner;


    // @forChainlinkKeepers
    uint private s_setInterval;


    // LotteryState
    enum LotteryState{
        Open,
        Pending,
        Close
    }
   LotteryState private stateLottery;
    constructor(uint _entryFee,address vrfCoordinator,bytes32 gasLane,uint64 subscriptionId,uint32 callbackGasLimit,uint setInterval) VRFConsumerBaseV2(vrfCoordinator){
        i_entryFee=_entryFee;
        i_vrfCoordinatorInterface=VRFCoordinatorV2Interface(vrfCoordinator);
        i_gasLane=gasLane;
        i_callbackGasLimit=callbackGasLimit;
        i_subcriptionId=subscriptionId;
        s_setInterval=setInterval;
        stateLottery=LotteryState(0);
    }
    
    function performUpkeep(bytes memory /*performdata*/)external override{
        (bool upkeepNeeded,)=checkUpkeep("");
        if(!upkeepNeeded){
            revert lotteryUpkeepNotNeeded(address(this).balance,players.length,uint(stateLottery));
        }
       uint requestId= i_vrfCoordinatorInterface.requestRandomWords(
        i_gasLane,
        i_subcriptionId,
        requestConfirmations,
        i_callbackGasLimit,
        NUM_Words
       );
       emit requestLotteryWinner(requestId);
    }

    function fulfillRandomWords(
    uint256,
    uint[] memory randomWords
    )internal override{
      uint256 indexOfwinner=randomWords[0]%players.length;
      address payable recentWinner=players[indexOfwinner];
      s_recentWinner=recentWinner;
      stateLottery=LotteryState.Open;
      players=new address payable[](0);
      s_setInterval=block.timestamp; 
      (bool success,)=recentWinner.call{value:address(this).balance}("");
      if(!success){
       revert tranferFailed();
        }
        emit WinnerPicked(recentWinner);

    }

    function getEntered()public payable{
        if(msg.value<i_entryFee){
            revert LowAmount();
            }
        players.push(payable(msg.sender));
        emit participantEntered(msg.sender);
    }

    function getRecentWinner()public view returns(address){
        return s_recentWinner;
    }


    function getEntryFee()public view returns(uint){
        return i_entryFee;
    }


    function getPlayer(uint index)public view returns(address){
        return players[index];
    }


//   for performing tasks on chain keepers
     function checkUpkeep(bytes memory)
     public
     view 
     override
     returns(bool upKeepNeeded,bytes memory  /*performData*/){
       bool isOpen=(LotteryState.Open==stateLottery);
       bool timePassed=((block.timestamp-lastTimeStamp)>s_setInterval);
       bool hasPlayers=(players.length>0);
       bool hasBalance=address(this).balance>0;
       upKeepNeeded=(isOpen && timePassed && hasBalance && hasPlayers);
     }
 

     function getLotteryState()public view returns(LotteryState){
        return stateLottery;
     }


     function getNumWords()public view returns(uint){
        return NUM_Words;
     }
    
    function getNumberOfPlayer()public view returns(uint){
        return players.length;
    }
    
    function getCurrentInterval()public view returns(uint){
        return s_setInterval;
    }
    function getRequestConfirmation()public view returns(uint){
        return requestConfirmations;
    }


}