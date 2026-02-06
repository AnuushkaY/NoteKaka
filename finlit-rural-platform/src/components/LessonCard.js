import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import '../styles/components.css';

function LessonCard({ lesson }) {
  const { translate } = useContext(LanguageContext);
  
  const progressStyle = {
    width: `${lesson.progress}%`,
    backgroundColor: lesson.progress === 100 ? '#4CAF50' : '#2196F3'
  };

  return (
    <div className="lesson-card">
      <div className="lesson-header">
        <h3 className="lesson-title">{lesson.title}</h3>
        {lesson.duration && (
          <span className="lesson-duration">{lesson.duration}</span>
        )}
      </div>
      
      <p className="lesson-description">{lesson.description}</p>
      
      <div className="lesson-progress">
        <div className="progress-info">
          <span className="progress-text">{lesson.progress}% complete</span>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={progressStyle}></div>
        </div>
      </div>
      
      <div className="lesson-actions">
        {lesson.completed ? (
          <div className="completed-badge">
            <span className="check-icon">✓</span>
            Completed
          </div>
        ) : lesson.progress > 0 ? (
          <Link to={`/lessons/${lesson.id}`} className="button button-primary">
            Continue →
          </Link>
        ) : (
          <Link to={`/lessons/${lesson.id}`} className="button button-secondary">
            Start Lesson
          </Link>
        )}
      </div>
    </div>
  );
}

export default LessonCard;