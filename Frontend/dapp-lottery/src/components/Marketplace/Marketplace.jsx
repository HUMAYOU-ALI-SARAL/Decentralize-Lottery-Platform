import React, { useState, useEffect } from 'react';
import {  animated } from 'react-spring';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom'
import './Marketplace.css';

const Marketplace = () => {
  // Simulated marketplace items
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Simulate fetching marketplace items from the backend
    setTimeout(() => {
      const mockItems = [
        { id: 1, name: 'Item 1', price: 10, description: 'Description for Item 1' },
        { id: 2, name: 'Item 2', price: 15, description: 'Description for Item 2' },
        { id: 3, name: 'Item 3', price: 20, description: 'Description for Item 3' },
        { id: 4, name: 'Item 4', price: 25, description: 'Description for Item 4' },
        { id: 5, name: 'Item 5', price: 30, description: 'Description for Item 5' },
        { id: 6, name: 'Item 6', price: 35, description: 'Description for Item 6' },
        { id: 7, name: 'Item 7', price: 40, description: 'Description for Item 7' },
        { id: 8, name: 'Item 8', price: 45, description: 'Description for Item 8' },
      ];
      setItems(mockItems);
    }, 1000); // Simulate a delay for fetching data
  }, []);

  return (
    <div className="marketplace">
     <animated.nav className="navbar">
        <Link to="/">Home</Link> {/* Link to the home page */}
      </animated.nav>
     
     
      <h2>Marketplace</h2>
      <div className="items">
        {items.map((item) => (
          <div key={item.id} className="item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>{item.description}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
