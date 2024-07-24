// src/components/LanguageSelector.js
import React from 'react';
import './LanguageSelector.css';

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
  const handleLanguageSelect = (code) => {
    // Handle language selection (e.g., navigate to a different page or update state)
    alert(`Selected language: ${code}`);
  };

  return (
    <div className="language-selector">
      <div className="background-image" />
      <h1 className="museum-name">Museum Name</h1>
      <div className="language-cards">
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
