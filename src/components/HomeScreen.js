
// src/components/HomeScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Design } from '../assets/design.svg';
import { ReactComponent as Logo } from '../assets/logo.svg';
import './HomeScreen.css';

const HomeScreen = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Function to handle the click event and navigate to the language selector
  const handleScreenClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/language-selector',{ state: { startAnimation: true } });
    }, 500); // Duration of the animations
  };

  return (
    <div className="home-screen" onClick={handleScreenClick}>
      <div className="design-container">
        <Design className={`design ${isAnimating ? 'fade-out' : ''}`} />
        <Logo className={`home-logo ${isAnimating ? 'logo-move' : ''}`} />
      </div>
      <div className={`tap-text ${isAnimating ? 'fade-out' : ''}`}>
        Tap Anywhere to Start..
      </div>
    </div>
  );
};

export default HomeScreen;
