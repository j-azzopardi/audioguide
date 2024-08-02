
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LanguageSelector from './components/LanguageSelector';
import AudioGuide from './components/AudioGuide';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LanguageSelector />} />
        <Route path="/audio-guide/:language" element={<AudioGuide />} />
      </Routes>
    </Router>
  );
};

export default App;
