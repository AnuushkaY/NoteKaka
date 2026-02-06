// Translation utility using Google Translate API (mock implementation)
// In a real app, this would make API calls to Google Translate

const cachedTranslations = {};

export const translateText = async (text, targetLanguage = 'hi') => {
  // Return cached translation if available
  const cacheKey = `${text}_${targetLanguage}`;
  if (cachedTranslations[cacheKey]) {
    return cachedTranslations[cacheKey];
  }

  // Mock translation - in real app, this would call Google Translate API
  const mockTranslations = {
    'hi': {
      'Hello': 'नमस्ते',
      'Welcome to NoteKaka': 'नोटकाका में आपका स्वागत है',
      'Learn Money Wisdom': 'पैसे की समझ सीखें',
      'Savings': 'बचत',
      'Loans': 'कर्ज',
      'Insurance': 'बीमा',
      'Digital Payments': 'डिजिटल भुगतान',
      'Government Schemes': 'सरकारी योजनाएं',
      'Start Learning': 'सीखना शुरू करें',
      'Dashboard': 'डैशबोर्ड',
      'Stories': 'कहानियाँ',
      'Help': 'मदद'
    },
    'ta': {
      'Hello': 'வணக்கம்',
      'Welcome to NoteKaka': 'நோட்ககாவுக்கு வரவேற்கிறோம்',
      'Learn Money Wisdom': 'பண ஞானம் கற்றுக்கொள்ளுங்கள்',
      'Savings': 'சேமிப்பு',
      'Loans': 'கடன்',
      'Insurance': 'காப்பீடு',
      'Digital Payments': 'டிஜிட்டல் பேமெண்ட்',
      'Government Schemes': 'அரசு திட்டங்கள்',
      'Start Learning': 'கற்றல் தொடங்கவும்',
      'Dashboard': 'டாஷ்போர்டு',
      'Stories': 'கதைகள்',
      'Help': 'உதவி'
    },
    'te': {
      'Hello': 'హలో',
      'Welcome to NoteKaka': 'నోటకాకాకు స్వాగతం',
      'Learn Money Wisdom': 'డబ్బు జ్ఞానం నేర్చుకోండి',
      'Savings': 'పొదుపు',
      'Loans': 'లోన్లు',
      'Insurance': 'వీమా',
      'Digital Payments': 'డిజిటల్ పేమెంట్స్',
      'Government Schemes': 'ప్రభుత్వ పథకాలు',
      'Start Learning': 'నేర్చుకోవడం ప్రారంభించండి',
      'Dashboard': 'డాష్బోర్డ్',
      'Stories': 'కథలు',
      'Help': 'సహాయం'
    },
    'bn': {
      'Hello': 'হ্যালো',
      'Welcome to NoteKaka': 'নোটকাকায় স্বাগতম',
      'Learn Money Wisdom': 'টাকা জ্ঞান শিখুন',
      'Savings': 'সঞ্চয়',
      'Loans': 'ঋণ',
      'Insurance': 'বীমা',
      'Digital Payments': 'ডিজিটাল পেমেন্ট',
      'Government Schemes': 'সরকারি স্কিম',
      'Start Learning': 'শেখা শুরু করুন',
      'Dashboard': 'ড্যাশবোর্ড',
      'Stories': 'গল্প',
      'Help': 'সাহায্য'
    },
    'mr': {
      'Hello': 'नमस्कार',
      'Welcome to NoteKaka': 'नोटकाका मध्ये आपले स्वागत आहे',
      'Learn Money Wisdom': 'पैशाचे ज्ञान शिका',
      'Savings': 'बचत',
      'Loans': 'कर्ज',
      'Insurance': 'विमा',
      'Digital Payments': 'डिजिटल पेमेंट्स',
      'Government Schemes': 'सरकारी योजना',
      'Start Learning': 'शिकणे सुरू करा',
      'Dashboard': 'डॅशबोर्ड',
      'Stories': 'कथा',
      'Help': 'मदत'
    }
  };

  // Return mock translation or original text if not found
  const translatedText = mockTranslations[targetLanguage]?.[text] || text;
  
  // Cache the translation
  cachedTranslations[cacheKey] = translatedText;
  
  return translatedText;
};

export const detectLanguage = (text) => {
  // Simple language detection based on character ranges
  const hindiRegex = /[\u0900-\u097F]/;
  const tamilRegex = /[\u0B80-\u0BFF]/;
  const teluguRegex = /[\u0C00-\u0C7F]/;
  const bengaliRegex = /[\u0980-\u09FF]/;
  const marathiRegex = /[\u0900-\u097F]/; // Same as Hindi range

  if (hindiRegex.test(text)) return 'hi';
  if (tamilRegex.test(text)) return 'ta';
  if (teluguRegex.test(text)) return 'te';
  if (bengaliRegex.test(text)) return 'bn';
  if (marathiRegex.test(text)) return 'mr';
  
  return 'en'; // Default to English
};

export const translateBatch = async (texts, targetLanguage) => {
  const translations = {};
  
  for (const text of texts) {
    translations[text] = await translateText(text, targetLanguage);
  }
  
  return translations;
};

export const getLanguageName = (code) => {
  const languages = {
    'en': 'English',
    'hi': 'Hindi',
    'ta': 'Tamil',
    'te': 'Telugu',
    'bn': 'Bengali',
    'mr': 'Marathi'
  };
  
  return languages[code] || code;
};