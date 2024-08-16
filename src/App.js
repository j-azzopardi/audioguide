// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './components/HomeScreen.js';
import LanguageSelector from './components/LanguageSelector';
import AudioGuide from './components/AudioGuide';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/language-selector" element={<LanguageSelector />} />
        <Route path="/audio-guide/:language" element={<AudioGuide />} />
      </Routes>
    </Router>
  );
}

export default App;

