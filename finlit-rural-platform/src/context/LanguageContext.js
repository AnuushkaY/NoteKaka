import React, { createContext, useState, useEffect } from 'react';

// Dummy translation data - In real app, this would come from Google Translate API
const translations = {
  en: {
    'Home': 'Home',
    'Dashboard': 'Dashboard',
    'Stories': 'Stories',
    'Digital Payments': 'Digital Payments',
    'Savings': 'Savings',
    'Government Schemes': 'Government Schemes',
    'AI Coach': 'AI Coach',
    'Help': 'Help',
    'Voice Mode': 'Voice Mode',
    'Namaste!': 'Namaste!',
    'Learn Money Wisdom with NoteKaka': 'Learn Money Wisdom with NoteKaka',
    'Start Learning': 'Start Learning',
    'Explore Without Login': 'Explore Without Login'
  },
  hi: {
    'Home': 'होम',
    'Dashboard': 'डैशबोर्ड',
    'Stories': 'कहानियाँ',
    'Digital Payments': 'डिजिटल भुगतान',
    'Savings': 'बचत',
    'Government Schemes': 'सरकारी योजनाएं',
    'AI Coach': 'एआई कोच',
    'Help': 'मदद',
    'Voice Mode': 'आवाज मोड',
    'Namaste!': 'नमस्ते!',
    'Learn Money Wisdom with NoteKaka': 'नोटकाका के साथ पैसे की समझ सीखें',
    'Start Learning': 'सीखना शुरू करें',
    'Explore Without Login': 'बिना लॉगिन के एक्सप्लोर करें'
  },
  ta: {
    'Home': 'முகப்பு',
    'Dashboard': 'டாஷ்போர்டு',
    'Stories': 'கதைகள்',
    'Digital Payments': 'டிஜிட்டல் பேமெண்ட்',
    'Savings': 'சேமிப்பு',
    'Government Schemes': 'அரசு திட்டங்கள்',
    'AI Coach': 'AI பயிற்சியாளர்',
    'Help': 'உதவி',
    'Voice Mode': 'குரல் முறை',
    'Namaste!': 'வணக்கம்!',
    'Learn Money Wisdom with NoteKaka': 'நோட்ககாவுடன் பண ஞானம் கற்றுக்கொள்ளுங்கள்',
    'Start Learning': 'கற்றல் தொடங்கவும்',
    'Explore Without Login': 'லாகினின்றி ஆராயவும்'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [availableLanguages, setAvailableLanguages] = useState([
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' }
  ]);

  const translate = (text) => {
    if (currentLanguage === 'en') return text;
    return translations[currentLanguage]?.[text] || text;
  };

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && availableLanguages.find(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      availableLanguages,
      translate,
      changeLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext };