// BottomNavBar.js
import React from 'react';
import './BottomNavBar.css';
import { Link } from 'react-router-dom';

function BottomNavBar() {
  return (
    <nav className="bottom-nav">
      <Link to="/orders" className="nav-item">
        <img src="/order.svg" alt="Orders" />
      </Link>
      <Link to="/profile" className="nav-item">
        <img src="/profile.svg" alt="Profile" />
      </Link>
      <Link to="/map" className="nav-item">
        <img src="maps.svg" alt="Map" />
      </Link>
    </nav>
  );
}

export default BottomNavBar;
