import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { UserContext } from '../context/UserContext';
import '../styles/PersonalityTest.css';

function PersonalityTest() {
  const navigate = useNavigate();
  const { translate } = useContext(LanguageContext);
  const { updatePersonalityTest } = useContext(UserContext);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'What best describes you?',
      options: [
        { id: 'student', label: 'Student', icon: '', description: 'Learning and studying' },
        { id: 'farmer', label: 'Farmer', icon: '', description: 'Agriculture and farming' },
        { id: 'shopkeeper', label: 'Shopkeeper/Business', icon: '', description: 'Small business owner' },
        { id: 'homemaker', label: 'Homemaker', icon: '', description: 'Managing household' },
        { id: 'worker', label: 'Daily Wage Worker', icon: '', description: 'Daily employment' },
        { id: 'other', label: 'Other', icon: '', description: 'Other occupation' }
      ],
      type: 'single'
    },
    {
      id: 2,
      question: 'What scares you most about money?',
      options: [
        { id: 'bank', label: 'Bank Procedures', icon: '', description: 'Complex bank processes' },
        { id: 'loan', label: 'Taking Loans', icon: '', description: 'Fear of debt traps' },
        { id: 'losing', label: 'Losing Money', icon: '', description: 'Risk of losing savings' },
        { id: 'digital', label: 'Digital Payments', icon: '', description: 'Using phone for money' },
        { id: 'fraud', label: 'Fraud & Scams', icon: '', description: 'Being cheated' },
        { id: 'none', label: 'Nothing Scares Me', icon: '', description: 'Confident with money' }
      ],
      type: 'multiple'
    },
    {
      id: 3,
      question: 'How do you usually manage money?',
      options: [
        { id: 'cash', label: 'Keep Cash at Home', icon: '', description: 'Physical cash savings' },
        { id: 'bank', label: 'Bank Account', icon: '', description: 'Use bank regularly' },
        { id: 'post', label: 'Post Office', icon: '', description: 'Post office savings' },
        { id: 'family', label: 'Family Manages', icon: '', description: 'Family handles money' },
        { id: 'daily', label: 'Day by Day', icon: '', description: 'Manage as needed daily' }
      ],
      type: 'single'
    },
    {
      id: 4,
      question: 'What is your biggest money goal?',
      options: [
        { id: 'education', label: 'Education', icon: '', description: 'Study or children\'s education' },
        { id: 'business', label: 'Start Business', icon: '', description: 'Begin small business' },
        { id: 'home', label: 'Buy/Repair Home', icon: '', description: 'House construction/repair' },
        { id: 'marriage', label: 'Marriage', icon: '', description: 'Wedding expenses' },
        { id: 'savings', label: 'Build Savings', icon: '', description: 'Create safety net' },
        { id: 'equipment', label: 'Buy Equipment', icon: '', description: 'Tools or farming equipment' }
      ],
      type: 'multiple'
    },
    {
      id: 5,
      question: 'How much do you earn regularly?',
      options: [
        { id: 'none', label: 'No Regular Income', icon: '', description: 'Irregular or no income' },
        { id: 'low', label: 'Under ₹5,000/month', icon: '', description: 'Small regular income' },
        { id: 'medium', label: '₹5,000 - ₹15,000', icon: '', description: 'Moderate income' },
        { id: 'good', label: '₹15,000 - ₹30,000', icon: '', description: 'Good regular income' },
        { id: 'high', label: 'Above ₹30,000', icon: '', description: 'High regular income' }
      ],
      type: 'single'
    }
  ];

  const handleAnswer = (optionId) => {
    const question = questions[currentQuestion];
    
    if (question.type === 'single') {
      setAnswers(prev => ({
        ...prev,
        [question.id]: optionId
      }));
      
      // Auto-advance for single choice questions
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
        } else {
          calculateResults();
        }
      }, 300);
    } else {
      // For multiple choice
      setAnswers(prev => {
        const currentAnswers = prev[question.id] || [];
        const updatedAnswers = currentAnswers.includes(optionId)
          ? currentAnswers.filter(id => id !== optionId)
          : [...currentAnswers, optionId];
        
        return {
          ...prev,
          [question.id]: updatedAnswers
        };
      });
    }
  };

  const calculateResults = () => {
    // Calculate risk level based on answers
    let riskLevel = 'medium';
    let awarenessLevel = 'beginner';
    const needs = [];

    // Analyze occupation
    const occupation = answers[1];
    if (['farmer', 'shopkeeper'].includes(occupation)) {
      needs.push('business_management', 'loans');
    } else if (occupation === 'student') {
      needs.push('savings', 'part_time');
    } else {
      needs.push('savings', 'budgeting');
    }

    // Analyze fears
    const fears = answers[2] || [];
    if (fears.includes('digital')) {
      needs.push('digital_literacy');
    }
    if (fears.includes('loan')) {
      needs.push('loan_education');
    }
    if (fears.includes('fraud')) {
      needs.push('fraud_protection');
    }

    // Analyze income
    const income = answers[5];
    if (income === 'none' || income === 'low') {
      riskLevel = 'high';
      needs.push('micro_savings', 'government_schemes');
    } else if (income === 'high') {
      riskLevel = 'low';
      awarenessLevel = 'intermediate';
    }

    // Analyze goals
    const goals = answers[4] || [];
    if (goals.includes('education')) {
      needs.push('education_planning');
    }
    if (goals.includes('business')) {
      needs.push('business_planning', 'microfinance');
    }

    const results = {
      riskLevel,
      awarenessLevel,
      needs: [...new Set(needs)], // Remove duplicates
      occupation,
      completed: true,
      timestamp: new Date().toISOString()
    };

    updatePersonalityTest(results);
    setIsComplete(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleStartLearning = () => {
    navigate('/dashboard');
  };

  if (isComplete) {
    return (
      <div className="personality-test">
        <div className="test-header">
          <h1>Your Financial Personality</h1>
          <p>Based on your answers, here's what we recommend:</p>
        </div>

        <div className="results-container">
          <div className="result-card primary">
            <div className="result-icon">🎯</div>
            <div className="result-content">
              <h3>Focus Areas</h3>
              <ul className="focus-areas">
                <li>Daily savings habits</li>
                <li>Understanding bank accounts</li>
                <li>Safe digital payments</li>
                <li>Basic budgeting</li>
              </ul>
            </div>
          </div>

          <div className="result-grid">
            <div className="result-card">
              <div className="result-icon">📊</div>
              <div className="result-content">
                <h3>Risk Level</h3>
                <div className="risk-level medium">
                  <div className="risk-bar">
                    <div className="risk-fill" style={{ width: '60%' }}></div>
                  </div>
                  <span>Medium</span>
                </div>
                <p>You're cautious but open to learning</p>
              </div>
            </div>

            <div className="result-card">
              <div className="result-icon">🧠</div>
              <div className="result-content">
                <h3>Awareness Level</h3>
                <div className="awareness-level beginner">
                  Beginner
                </div>
                <p>Great starting point for learning!</p>
              </div>
            </div>
          </div>

          <div className="recommendations">
            <h3>Recommended Learning Path</h3>
            <div className="path-steps">
              <div className="path-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Start with Savings Basics</h4>
                  <p>Learn how to save small amounts daily</p>
                </div>
              </div>
              <div className="path-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Understand Bank Accounts</h4>
                  <p>How to open and use accounts safely</p>
                </div>
              </div>
              <div className="path-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Learn Digital Payments</h4>
                  <p>Use UPI and mobile banking securely</p>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="button button-primary" onClick={handleStartLearning}>
              Start Your Learning Journey
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQ.id];
  const isAnswered = selectedAnswer && 
    (currentQ.type === 'single' || (currentQ.type === 'multiple' && selectedAnswer.length > 0));

  return (
    <div className="personality-test">
      <div className="test-header">
        <h1>Financial Personality Test</h1>
        <p>Answer 5 simple questions to get personalized guidance</p>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="progress-text">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      <div className="question-container">
        <h2 className="question-text">{currentQ.question}</h2>
        <p className="question-help">Select {currentQ.type === 'single' ? 'one' : 'one or more'} options</p>

        <div className="options-grid">
          {currentQ.options.map((option) => {
            const isSelected = currentQ.type === 'single' 
              ? selectedAnswer === option.id
              : (selectedAnswer || []).includes(option.id);

            return (
              <button
                key={option.id}
                className={`option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleAnswer(option.id)}
              >
                <div className="option-icon">{option.icon}</div>
                <div className="option-content">
                  <h3>{option.label}</h3>
                  <p>{option.description}</p>
                </div>
                {isSelected && (
                  <div className="selection-indicator">✓</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="navigation-buttons">
        {currentQuestion > 0 && (
          <button className="button button-outline" onClick={handlePrevious}>
            ← Previous
          </button>
        )}
        
        <div className="question-counter">
          {currentQuestion + 1} / {questions.length}
        </div>
        
        {currentQ.type === 'multiple' && (
          <button 
            className="button button-primary" 
            onClick={handleNext}
            disabled={!isAnswered}
          >
            {currentQuestion === questions.length - 1 ? 'See Results →' : 'Next →'}
          </button>
        )}
      </div>

      <div className="test-tips">
        <div className="tip-icon">💡</div>
        <p>There are no right or wrong answers. Be honest for the best guidance.</p>
      </div>
    </div>
  );
}

export default PersonalityTest;