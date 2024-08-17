
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import LanguageSelector from './components/LanguageSelector';
import AudioGuide from './components/AudioGuide';
import PageTransition from './components/PageTransition'; // Import the updated PageTransition component
import './App.css';

// Create a wrapper component to handle page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <PageTransition location={location}>
      <Routes location={location}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/language-selector" element={<LanguageSelector />} />
        <Route path="/audio-guide/:language" element={<AudioGuide />} />
      </Routes>
    </PageTransition>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
