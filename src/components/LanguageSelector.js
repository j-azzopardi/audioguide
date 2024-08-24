
// src/components/LanguageSelector.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LanguageSelector.css';
import { ReactComponent as Logo } from '../assets/logo.svg';

const languages = [
  { code: 'mt', name: 'Maltese', flag: 'https://flagcdn.com/w320/mt.png' },
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w320/gb.png' },
  { code: 'fr', name: 'French', flag: 'https://flagcdn.com/w320/fr.png' },
  { code: 'it', name: 'Italian', flag: 'https://flagcdn.com/w320/it.png' },
  { code: 'es', name: 'Spanish', flag: 'https://flagcdn.com/w320/es.png' },
  { code: 'de', name: 'German', flag: 'https://flagcdn.com/w320/de.png' },
  { code: 'ru', name: 'Russian', flag: 'https://flagcdn.com/w320/ru.png' },
  { code: 'pl', name: 'Polish', flag: 'https://flagcdn.com/w320/pl.png' },
];

const LanguageSelector = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.startAnimation) {
      setIsAnimating(true);
    }
  }, [location.state]);

  const handleLanguageSelect = (code) => {
    navigate(`/audio-guide/${code}`);
  };

  return (
    <div className="language-selector">
      <div className="logo-box">
        <Logo className={`logo ${isAnimating ? 'shrink-logo' : ''}`} />
      </div>
      <div className={`language-cards ${isAnimating ? 'float-in' : ''}`}>
        {languages.map((lang) => (
          <div
            key={lang.code}
            className="language-card"
            onClick={() => handleLanguageSelect(lang.code)}
          >
            <img src={lang.flag} alt={lang.name} className="flag" />
            <div className="language-name">{lang.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
