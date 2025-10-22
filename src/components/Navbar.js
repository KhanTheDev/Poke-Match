// Navigation bar component that shows on all pages
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  // This tells us which page we're currently on
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and title */}
        <Link to="/" className="navbar-brand">
          <h1>PokéMatch</h1>
        </Link>
        
        {/* Navigation links */}
        <div className="navbar-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
          <Link 
            to="/game" 
            className={location.pathname === '/game' ? 'nav-link active' : 'nav-link'}
          >
            Play Game
          </Link>
          <Link 
            to="/leaderboard" 
            className={location.pathname === '/leaderboard' ? 'nav-link active' : 'nav-link'}
          >
            Leaderboard
          </Link>
          <Link 
            to="/profile" 
            className={location.pathname === '/profile' ? 'nav-link active' : 'nav-link'}
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
