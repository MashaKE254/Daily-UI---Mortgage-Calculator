import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MortgageCalculator from './components/MortgageCalculator';
import ExplanationCards from './components/ExplanationCards';
import './App.css';
import './Animation.css';
import './GradientBackground.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const gradientStyle = {
    backgroundPosition: `${(mousePosition.x / window.innerWidth) * 100}% ${(mousePosition.y / window.innerHeight) * 100}%`
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="gradient-bg" style={gradientStyle}></div>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="content-container">
        <div className="fade-in-up delay-1">
          <MortgageCalculator isDarkMode={isDarkMode} />
        </div>
        <div className="fade-in-up delay-2">
          <ExplanationCards />
        </div>
      </div>
    </div>
  );
}

export default App;
