// Voice helper utility for speech recognition and synthesis

let recognition = null;

export const initializeSpeechRecognition = () => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    throw new Error('Speech recognition not supported in this browser');
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();

  // Configure recognition
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-IN'; // Indian English
  recognition.maxAlternatives = 1;

  return recognition;
};

export const startListening = (onResult, onError) => {
  if (!recognition) {
    recognition = initializeSpeechRecognition();
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (onResult) onResult(transcript);
  };

  recognition.onerror = (event) => {
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    console.log('Speech recognition ended');
  };

  try {
    recognition.start();
    return true;
  } catch (error) {
    console.error('Error starting speech recognition:', error);
    if (onError) onError('START_ERROR');
    return false;
  }
};

export const stopListening = () => {
  if (recognition) {
    try {
      recognition.stop();
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  }
};

export const speak = (text, options = {}) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser');
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set options
  utterance.lang = options.lang || 'en-IN';
  utterance.rate = options.rate || 0.9; // Slightly slower for better understanding
  utterance.pitch = options.pitch || 1;
  utterance.volume = options.volume || 1;

  // Add event listeners
  utterance.onstart = () => {
    if (options.onStart) options.onStart();
  };

  utterance.onend = () => {
    if (options.onEnd) options.onEnd();
  };

  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event);
    if (options.onError) options.onError(event);
  };

  try {
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.error('Error speaking text:', error);
    return false;
  }
};

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const getAvailableVoices = () => {
  if (!('speechSynthesis' in window)) {
    return [];
  }

  return window.speechSynthesis.getVoices();
};

export const setVoiceForLanguage = (langCode) => {
  const voices = getAvailableVoices();
  
  // Try to find a voice for the specified language
  const voice = voices.find(v => v.lang.startsWith(langCode)) || 
                voices.find(v => v.lang.startsWith('en')) ||
                voices[0];
  
  return voice;
};

export const isSpeechSupported = () => {
  return ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) &&
         'speechSynthesis' in window;
};

// Predefined voice commands for common actions
export const voiceCommands = {
  'open dashboard': { action: 'navigate', target: '/dashboard' },
  'show savings': { action: 'navigate', target: '/savings' },
  'learn about loans': { action: 'navigate', target: '/dashboard' },
  'government schemes': { action: 'navigate', target: '/schemes' },
  'digital payments': { action: 'navigate', target: '/payments' },
  'help me': { action: 'navigate', target: '/help' },
  'talk to coach': { action: 'navigate', target: '/coach' },
  'go back': { action: 'navigate', target: 'back' },
  'go home': { action: 'navigate', target: '/' },
  'start learning': { action: 'navigate', target: '/test' },
  'next lesson': { action: 'function', target: 'nextLesson' },
  'previous lesson': { action: 'function', target: 'previousLesson' },
  'repeat that': { action: 'function', target: 'repeat' },
  'speak slower': { action: 'settings', target: 'slowSpeech' },
  'speak faster': { action: 'settings', target: 'fastSpeech' },
  'change language': { action: 'settings', target: 'changeLanguage' },
  'turn off voice': { action: 'settings', target: 'disableVoice' }
};

export const processVoiceCommand = (command) => {
  const normalizedCommand = command.toLowerCase().trim();
  
  // Check for exact matches
  if (voiceCommands[normalizedCommand]) {
    return voiceCommands[normalizedCommand];
  }
  
  // Check for partial matches
  for (const [key, value] of Object.entries(voiceCommands)) {
    if (normalizedCommand.includes(key)) {
      return value;
    }
  }
  
  // Default: treat as a question for AI coach
  return { action: 'question', target: command };
};