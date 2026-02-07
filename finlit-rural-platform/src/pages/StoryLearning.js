import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { stories } from '../data/stories';
import ProgressBar from '../components/ProgressBar';
import '../styles/StoryLearning.css';

function StoryLearning() {
  const [searchParams] = useSearchParams();
  const { translate } = useContext(LanguageContext);
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [showConsequence, setShowConsequence] = useState(false);
  const [storyCompleted, setStoryCompleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Stories', icon: '📚' },
    { id: 'farmer', name: 'Farmer Stories', icon: '👨‍🌾' },
    { id: 'shopkeeper', name: 'Shopkeeper Stories', icon: '🏪' },
    { id: 'student', name: 'Student Stories', icon: '🎓' },
    { id: 'savings', name: 'Savings Stories', icon: '💰' },
    { id: 'loan', name: 'Loan Stories', icon: '🏦' }
  ];

  // Filter stories based on category
  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  useEffect(() => {
    // Set category from URL if provided
    const category = searchParams.get('type');
    if (category && categories.find(c => c.id === category)) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const handleStorySelect = (story) => {
    setSelectedStory(story);
    setCurrentStep(0);
    setUserChoices([]);
    setShowConsequence(false);
    setStoryCompleted(false);
  };

  const handleChoiceSelect = (choice) => {
    const newChoices = [...userChoices, choice];
    setUserChoices(newChoices);
    setShowConsequence(true);

    // Show consequence for 2 seconds, then move to next step or complete story
    setTimeout(() => {
      setShowConsequence(false);
      
      if (currentStep < selectedStory.steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setStoryCompleted(true);
      }
    }, 2000);
  };

  const resetStory = () => {
    setSelectedStory(null);
    setCurrentStep(0);
    setUserChoices([]);
    setShowConsequence(false);
    setStoryCompleted(false);
  };

  const calculateScore = () => {
    if (!userChoices.length) return 0;
    const goodChoices = userChoices.filter(choice => choice.isGood);
    return Math.round((goodChoices.length / userChoices.length) * 100);
  };

  const getConsequenceMessage = (choice) => {
    if (choice.isGood) {
      return {
        title: 'Good Choice! ',
        message: choice.consequence,
        icon: '🎯',
        color: '#4CAF50'
      };
    } else {
      return {
        title: 'Think Again! ',
        message: choice.consequence,
        icon: '💡',
        color: '#FF9800'
      };
    }
  };

  if (!selectedStory) {
    return (
      <div className="story-learning">
        <div className="stories-header">
          <h1>Learn Through Stories</h1>
          <p>Real-life scenarios from rural India. Make choices and see consequences without real risks.</p>
        </div>

        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="stories-grid">
          {filteredStories.map(story => (
            <div 
              key={story.id} 
              className="story-preview"
              onClick={() => handleStorySelect(story)}
            >
              <div className="story-preview-header">
                <div className="story-icon">{story.icon}</div>
                <div className="story-meta">
                  <span className="story-category">{story.category}</span>
                  <span className="story-duration">{story.duration}</span>
                </div>
              </div>
              
              <h3 className="story-title">{story.title}</h3>
              <p className="story-description">{story.description}</p>
              
              <div className="story-stats">
                <div className="stat">
                  <span className="stat-icon">👤</span>
                  <span>{story.character}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">📍</span>
                  <span>{story.location}</span>
                </div>
                <div className="stat">
                  <span className="stat-icon">🎯</span>
                  <span>{story.lessons} lessons</span>
                </div>
              </div>
              
              <button className="button button-primary story-start-btn">
                Start Story
              </button>
            </div>
          ))}
        </div>

        <div className="learning-tips">
          <h2>How Story Learning Works:</h2>
          <div className="tips-grid">
            <div className="tip">
              <div className="tip-icon">1️⃣</div>
              <h3>Read the Situation</h3>
              <p>Understand the character's financial situation and challenges</p>
            </div>
            <div className="tip">
              <div className="tip-icon">2️⃣</div>
              <h3>Make Choices</h3>
              <p>Choose what you think is the best course of action</p>
            </div>
            <div className="tip">
              <div className="tip-icon">3️⃣</div>
              <h3>See Consequences</h3>
              <p>Learn what happens with each choice, good or bad</p>
            </div>
            <div className="tip">
              <div className="tip-icon">4️⃣</div>
              <h3>Learn & Apply</h3>
              <p>Take these lessons to your real financial decisions</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = selectedStory.steps[currentStep];

  return (
    <div className="story-learning">
      <div className="story-container">
        <div className="story-header">
          <button className="back-button" onClick={resetStory}>
            ← Back to Stories
          </button>
          <div className="story-progress">
            <ProgressBar 
              progress={((currentStep + 1) / selectedStory.steps.length) * 100} 
              height={10}
              showLabel={false}
            />
            <div className="progress-text">
              Step {currentStep + 1} of {selectedStory.steps.length}
            </div>
          </div>
        </div>

        <div className="story-character">
          <div className="character-avatar">{selectedStory.icon}</div>
          <div className="character-info">
            <h2>{selectedStory.title}</h2>
            <p className="character-desc">{selectedStory.character} from {selectedStory.location}</p>
          </div>
        </div>

        <div className="story-content">
          <div className="situation-card">
            <h3>Current Situation:</h3>
            <p>{currentStepData.situation}</p>
            
            {currentStepData.image && (
              <div className="situation-image">
                <img src={currentStepData.image} alt={currentStepData.situation} />
              </div>
            )}
          </div>

          <div className="choices-section">
            <h3>What should {selectedStory.character.split(' ')[0]} do?</h3>
            
            <div className="choices-grid">
              {currentStepData.choices.map((choice, index) => (
                <button
                  key={index}
                  className="choice-card"
                  onClick={() => handleChoiceSelect(choice)}
                  disabled={showConsequence}
                >
                  <div className="choice-icon">{choice.isGood ? '' : ''}</div>
                  <div className="choice-content">
                    <h4>{choice.text}</h4>
                    <p className="choice-reason">{choice.reason}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {showConsequence && userChoices.length > 0 && (
            <div className="consequence-modal">
              <div 
                className="consequence-card"
                style={{ borderColor: getConsequenceMessage(userChoices[userChoices.length - 1]).color }}
              >
                <div className="consequence-header">
                  <span className="consequence-icon">
                    {getConsequenceMessage(userChoices[userChoices.length - 1]).icon}
                  </span>
                  <h3>{getConsequenceMessage(userChoices[userChoices.length - 1]).title}</h3>
                </div>
                <p className="consequence-message">
                  {getConsequenceMessage(userChoices[userChoices.length - 1]).message}
                </p>
              </div>
            </div>
          )}

          {storyCompleted && (
            <div className="completion-card">
              <div className="completion-header">
                <h2>🎉 Story Completed!</h2>
                <p>You've finished "{selectedStory.title}"</p>
              </div>
              
              <div className="score-card">
                <h3>Your Score: {calculateScore()}%</h3>
                <ProgressBar progress={calculateScore()} height={30} />
                
                <div className="score-feedback">
                  {calculateScore() >= 80 && (
                    <p>Excellent! You made great financial decisions! </p>
                  )}
                  {calculateScore() >= 50 && calculateScore() < 80 && (
                    <p>Good job! You're learning well. Keep practicing! </p>
                  )}
                  {calculateScore() < 50 && (
                    <p>That's okay! Learning from mistakes is important. Try again! </p>
                  )}
                </div>
              </div>
              
              <div className="key-lessons">
                <h3>Key Lessons Learned:</h3>
                <ul>
                  {selectedStory.keyLessons.map((lesson, index) => (
                    <li key={index}>
                      <span className="lesson-icon"></span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="completion-actions">
                <button className="button button-primary" onClick={resetStory}>
                  Try Another Story
                </button>
                <button className="button button-outline">
                  Save Your Progress
                </button>
              </div>
            </div>
          )}

          <div className="story-tips">
            <div className="tip-icon">💡</div>
            <p>Remember: This is a safe learning environment. No real money is involved!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryLearning;