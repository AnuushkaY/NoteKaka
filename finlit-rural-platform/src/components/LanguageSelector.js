import React, { useState, useContext, useRef, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import '../styles/components.css';

function LanguageSelector() {
  const { currentLanguage, availableLanguages, changeLanguage } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button 
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <span className="language-icon">🌐</span>
        <span className="language-code">{currentLang?.code.toUpperCase()}</span>
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {availableLanguages.map((language) => (
            <button
              key={language.code}
              className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(language.code)}
            >
              <span className="option-flag">
                {language.code === 'hi' ? '🇮🇳' : 
                 language.code === 'ta' ? '🇮🇳' :
                 language.code === 'te' ? '🇮🇳' :
                 language.code === 'bn' ? '🇧🇩' :
                 language.code === 'mr' ? '🇮🇳' : '🇺🇸'}
              </span>
              <span className="option-text">
                <span className="option-native">{language.nativeName}</span>
                <span className="option-name">{language.name}</span>
              </span>
              {currentLanguage === language.code && (
                <span className="check-mark">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;