import React from 'react';
import '../styles/components.css';

function ProgressBar({ progress, height = 20, showLabel = true, color = null }) {
  const percentage = Math.min(Math.max(progress, 0), 100);
  
  const getColor = () => {
    if (color) return color;
    if (percentage >= 80) return '#4CAF50';
    if (percentage >= 50) return '#FF9800';
    return '#F44336';
  };

  const progressStyle = {
    width: `${percentage}%`,
    height: `${height}px`,
    backgroundColor: getColor(),
    borderRadius: height / 2,
    transition: 'width 0.5s ease'
  };

  const containerStyle = {
    height: `${height}px`,
    borderRadius: height / 2,
    backgroundColor: '#E0E0E0'
  };

  return (
    <div className="progress-bar-container">
      {showLabel && (
        <div className="progress-label">
          <span>{percentage}% complete</span>
          {percentage === 100 && <span className="completed-text">✓ Completed</span>}
        </div>
      )}
      
      <div className="progress-track" style={containerStyle}>
        <div className="progress-fill" style={progressStyle}>
          {height >= 30 && (
            <span className="progress-text">{percentage}%</span>
          )}
        </div>
      </div>
      
      {showLabel && percentage < 100 && (
        <div className="progress-help">
          {percentage < 30 && 'Just getting started!'}
          {percentage >= 30 && percentage < 70 && 'Keep going!'}
          {percentage >= 70 && percentage < 100 && 'Almost there!'}
        </div>
      )}
    </div>
  );
}

export default ProgressBar;