import React, { useContext } from 'react';
import { VoiceContext } from '../context/VoiceContext';
import '../styles/components.css';

function VoiceToggle() {
  const { isVoiceMode, toggleVoiceMode } = useContext(VoiceContext);

  return (
    <button 
      className={`voice-toggle ${isVoiceMode ? 'active' : ''}`}
      onClick={toggleVoiceMode}
      aria-label={isVoiceMode ? 'Turn off voice mode' : 'Turn on voice mode'}
      title={isVoiceMode ? 'Voice mode is on' : 'Voice mode is off'}
    >
      <span className="voice-icon">
        {isVoiceMode ? '🎤' : '🔊'}
      </span>
      <span className="voice-text">
        {isVoiceMode ? 'Voice On' : 'Voice Off'}
      </span>
      {isVoiceMode && (
        <span className="voice-pulse"></span>
      )}
    </button>
  );
}

export default VoiceToggle;