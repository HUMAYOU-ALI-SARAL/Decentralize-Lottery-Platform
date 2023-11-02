import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';
import Home from './components/Home/Home';
import { Routes } from 'react-router-dom';
import Marketplace from './components/Marketplace/Marketplace';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={Home} />
          <Route path="/marketplace" element={Marketplace} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
