import React, { createContext, useState, useEffect } from 'react';

const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);

  // Check if browser supports speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
    } else {
      setSpeechSupported(false);
      console.warn('Speech recognition not supported in this browser');
    }
  }, []);

  const toggleVoiceMode = () => {
    if (!speechSupported) {
      alert('Voice mode is not supported in your browser. Please use Chrome or Edge.');
      return;
    }
    
    const newVoiceMode = !isVoiceMode;
    setIsVoiceMode(newVoiceMode);
    
    if (newVoiceMode) {
      // Start voice mode
      startListening();
    } else {
      // Stop voice mode
      stopListening();
    }
    
    localStorage.setItem('voiceModeEnabled', newVoiceMode.toString());
  };

  const startListening = () => {
    if (!speechSupported) return;

    // This is a mock implementation
    // In a real app, you would use the Web Speech API
    setIsListening(true);
    console.log('Starting voice recognition...');
    
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      // In real implementation, you would set the transcript
      setTranscript('Hello, how can I help you today?');
    }, 1000);
  };

  const stopListening = () => {
    setIsListening(false);
    console.log('Stopping voice recognition...');
  };

  const speakText = (text) => {
    if (!speechSupported) return;

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN'; // Indian English accent
      utterance.rate = 0.9; // Slightly slower for better understanding
      window.speechSynthesis.speak(utterance);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
  };

  // Load voice mode preference from localStorage
  useEffect(() => {
    const savedVoiceMode = localStorage.getItem('voiceModeEnabled');
    if (savedVoiceMode === 'true') {
      setIsVoiceMode(true);
    }
  }, []);

  return (
    <VoiceContext.Provider value={{
      isVoiceMode,
      isListening,
      transcript,
      speechSupported,
      toggleVoiceMode,
      startListening,
      stopListening,
      speakText,
      clearTranscript
    }}>
      {children}
    </VoiceContext.Provider>
  );
};

export { VoiceContext };