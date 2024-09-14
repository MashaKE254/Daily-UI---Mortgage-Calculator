import React from 'react';
import './Navbar.css';

function Navbar({ isDarkMode, toggleDarkMode }) {
  return (
    <nav className="navbar fade-in-up">
      <div className="navbar-container">
        <a href="https://github.com/MashaKE254" target="_blank" rel="noopener noreferrer" className="nav-link">
          <i className="fab fa-github"></i> GitHub Code
        </a>
        <a href="https://dribbble.com/MashaKE254" target="_blank" rel="noopener noreferrer" className="nav-link">
          <i className="fab fa-dribbble"></i> Dribbble Profile
        </a>
        <button onClick={toggleDarkMode} className="theme-toggle">
          <i className={isDarkMode ? "fas fa-sun" : "fas fa-moon"}></i>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;