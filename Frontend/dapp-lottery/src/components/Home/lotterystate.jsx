  import React, { useState } from 'react';

export const getLotteryState = () => ({
  participants: 0,
  prizePool: 0,
  drawingDate: new Date(),
});

const LotteryState = () => {
  const [lotteryData, setLotteryData] = useState(getLotteryState());

  return (
    <div>
      <p>Participants: {lotteryData.participants}</p>
      <p>Prize Pool: {lotteryData.prizePool}</p>
      <p>Drawing Date: {lotteryData.drawingDate.toLocaleDateString()}</p>
    </div>
  );
};

export default LotteryState;
