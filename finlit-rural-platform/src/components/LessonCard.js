import React, { useContext, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { UserContext } from '../context/UserContext';
import '../styles/components.css';

function LessonCard({ lesson }) {
  const { translate } = useContext(LanguageContext);
  const { completeLesson, points, completedLessons } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(completedLessons.includes(lesson.id));

  // Simple lesson content structure
  const lessonContent = {
    1: {
      title: 'Smart Savings',
      steps: [
        { title: 'What is Saving?', content: 'Saving is putting aside money for future use. Even small amounts add up!' },
        { title: 'Why Save?', content: 'Saving helps you handle emergencies and achieve your goals. It builds security.' },
        { title: 'How to Start?', content: 'Start small - save even 1-5% of your income. Every rupee counts!' },
        { title: 'Simple Tips', content: '💡 Use a piggy bank or savings account. Set a daily/weekly savings target. Track your progress!' }
      ],
      points: 50
    },
    2: {
      title: 'Family Budget',
      steps: [
        { title: 'What is a Budget?', content: 'A budget is a plan for your money - how much you earn and spend.' },
        { title: 'Income', content: 'Calculate your total monthly income from all sources - job, farming, business, etc.' },
        { title: 'Expenses', content: 'List all expenses: food, rent, school, transport, healthcare, and others.' },
        { title: 'Balance', content: '✓ Ensure income > expenses. The difference is what you can save or invest!' }
      ],
      points: 50
    },
    3: {
      title: 'Understanding Loans',
      steps: [
        { title: 'Types of Loans', content: 'Good loans: home loans, education loans, business loans with reasonable interest.' },
        { title: 'Debt Traps', content: '⚠️ Avoid: high-interest loans, loans from money lenders, loans you cannot repay.' },
        { title: 'Interest Rates', content: 'Always check interest rates. Lower rates save you money in the long run.' },
        { title: 'Repayment', content: '🛡️ Only borrow what you can repay. Read agreements carefully before signing.' }
      ],
      points: 50
    },
    4: {
      title: 'Crop Insurance',
      steps: [
        { title: 'What is Insurance?', content: 'Insurance protects you from financial loss due to unexpected events.' },
        { title: 'Crop Insurance', content: 'Protects farmers if crops fail due to weather, pests, or diseases.' },
        { title: 'Government Schemes', content: '🌾 PM Fasal Bima Yojana and other schemes offer affordable crop insurance.' },
        { title: 'How to Enroll', content: 'Visit your local agriculture office or bank to enroll. Some schemes are subsidized!' }
      ],
      points: 50
    }
  };

  const content = lessonContent[lesson.id] || lessonContent[1];

  const handleStartLesson = () => {
    setShowModal(true);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (currentStep < content.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the lesson
      completeLesson(lesson.id, content.points);
      setLessonCompleted(true);
      setShowModal(false);
      setCurrentStep(0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentStep(0);
  };

  const progressStyle = {
    width: `${lesson.progress}%`,
    backgroundColor: lesson.progress === 100 ? '#4CAF50' : '#2196F3'
  };

  return (
    <>
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
          {lessonCompleted ? (
            <div className="completed-badge">
              <span className="check-icon">✓</span>
              Completed - {content.points} pts
            </div>
          ) : null}
          <button 
            onClick={handleStartLesson}
            className={`button ${lessonCompleted ? 'button-secondary' : 'button-primary'}`}
          >
            {lessonCompleted ? 'Revisit Lesson' : 'Start Lesson →'}
          </button>
        </div>
      </div>

      {/* Lesson Modal */}
      {showModal && (
        <div className="lesson-modal-overlay" onClick={handleCloseModal}>
          <div className="lesson-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>✕</button>
            
            <div className="modal-header">
              <h2>{content.title}</h2>
              <div className="step-indicator">
                Step {currentStep + 1} of {content.steps.length}
              </div>
            </div>

            <div className="modal-progress-bar">
              <div 
                className="modal-progress-fill"
                style={{ width: `${((currentStep + 1) / content.steps.length) * 100}%` }}
              ></div>
            </div>

            <div className="modal-content">
              <h3 className="step-title">{content.steps[currentStep].title}</h3>
              <p className="step-content">{content.steps[currentStep].content}</p>
            </div>

            <div className="modal-actions">
              <button 
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="button button-secondary"
              >
                ← Previous
              </button>
              
              <div className="step-counter">
                {currentStep + 1} / {content.steps.length}
              </div>
              
              <button 
                onClick={handleNextStep}
                className="button button-primary"
              >
                {currentStep === content.steps.length - 1 ? `Complete & Get ${content.points} Points 🎉` : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LessonCard;