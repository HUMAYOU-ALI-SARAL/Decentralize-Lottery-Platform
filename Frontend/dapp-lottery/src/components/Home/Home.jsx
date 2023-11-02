

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './Home.css'

import { Link } from 'react-router-dom';
function Home() {
  const [hasConnectedMetaMask, setHasConnectedMetaMask] = useState(false);
  const [isEnteringLottery, setIsEnteringLottery] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    // Simulate MetaMask connection status (you will need to use Web3.js to connect to MetaMask).
    setTimeout(() => {
      setHasConnectedMetaMask(true);
    }, 2000);
  }, []);

  const handleConnectMetaMask = async () => {
    // Connect to MetaMask (you need to integrate Web3.js here).
    // You should handle MetaMask connection in a real DApp.
  };

  const handleEnterLottery = async () => {
    // Simulate entering the lottery.
    setIsEnteringLottery(true);

    // Show the popup indicating that the user has successfully entered the lottery.
    setTimeout(() => {
      setIsPopupVisible(true);
    }, 2000);

    // Hide the popup after 5 seconds.
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 7000);
  };

  const navigationSpring = useSpring({
    opacity: hasConnectedMetaMask ? 1 : 0,
    transform: `translateY(${hasConnectedMetaMask ? '0px' : '-100px'})`,
  });

  const heroSectionSpring = useSpring({
    opacity: isEnteringLottery ? 0 : 1,
    transform: `translateY(${isEnteringLottery ? '-100px' : '0px'})`,
  });

  const popupSpring = useSpring({
    opacity: isPopupVisible ? 1 : 0,
    transform: `translateY(${isPopupVisible ? '0px' : '100px'})`,
  });

  return (
    <div>
        <animated.nav
  style={navigationSpring}
  className="navbar"
>
  <Link to="/Marketplace">Marketplace</Link> {/* Use Link instead of anchor (a) */}
  {hasConnectedMetaMask ? (
    <button onClick={handleEnterLottery}>Get into Lottery</button>
  ) : (
    <button onClick={handleConnectMetaMask}>Connect MetaMask</button>
  )}
</animated.nav>
       
      <animated.section className="hero" style={heroSectionSpring}>
        <h1>Lottery DApp</h1>
        <p>Win big prizes!</p>
        {isEnteringLottery ? (
          <button onClick={handleEnterLottery}>Entering Lottery...</button>
        ) : (
          <button onClick={handleEnterLottery}>Get into lottery</button>
        )}
        <div className="lottery-data">
          <p>Participants: 100</p>
          <p>Amount Gathered: 10 ETH</p>
        </div>
      </animated.section>

      <animated.div className="popup" style={popupSpring}>
        <h2>You have successfully entered the lottery!</h2>
      </animated.div>
    </div>
  );
}

export default Home;
