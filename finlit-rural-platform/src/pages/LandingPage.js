import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { VoiceContext } from '../context/VoiceContext';
import '../styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const { translate, currentLanguage } = useContext(LanguageContext);
  const { isVoiceMode, toggleVoiceMode } = useContext(VoiceContext);

  const handleStartLearning = () => {
    navigate('/test');
  };

  const handleExploreWithoutLogin = () => {
    navigate('/dashboard');
  };

  const successStories = [
    {
      name: 'Ram Singh',
      location: 'Rajasthan',
      story: 'Learned crop insurance, saved ₹20,000 in losses',
      image: '👨‍🌾'
    },
    {
      name: 'Asha Devi',
      location: 'Uttar Pradesh',
      story: 'Opened tailoring shop with micro-loan guidance',
      image: '👩‍🏭'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Bihar',
      story: 'Started saving daily, bought smartphone for business',
      image: '👨‍💼'
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="greeting">
            <span className="namaste">🙏</span>
            <h1>Namaste!</h1>
          </div>
          
          <h2 className="hero-title">Learn Money Wisdom with NoteKaka</h2>
          
          <p className="hero-description">
            Your village guide to financial literacy. Learn about savings, budgeting, loans, and insurance in simple language.
          </p>
          
          <div className="hero-actions">
            <button 
              className="button button-primary hero-button"
              onClick={handleStartLearning}
            >
              Start Learning
            </button>
            <button 
              className="button button-outline hero-button"
              onClick={handleExploreWithoutLogin}
            >
              Explore Without Login
            </button>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="floating-icons">
            <span className="icon money">💰</span>
            <span className="icon shield">🛡️</span>
            <span className="icon growth">📈</span>
            <span className="icon phone">📱</span>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <h2 className="section-title">Why People Trust NoteKaka</h2>
        
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon">👥</div>
            <h3>Made for Villages</h3>
            <p>Content designed specifically for rural life and needs</p>
          </div>
          
          <div className="trust-card">
            <div className="trust-icon">🗣️</div>
            <h3>Your Language</h3>
            <p>Available in Hindi, Tamil, Telugu, Bengali, Marathi and more</p>
          </div>
          
          <div className="trust-card">
            <div className="trust-icon">🎮</div>
            <h3>Learn by Doing</h3>
            <p>Interactive stories and simulations, not boring lectures</p>
          </div>
          
          <div className="trust-card">
            <div className="trust-icon">🔒</div>
            <h3>100% Safe</h3>
            <p>No real money needed. Learn without risk</p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="stories-section">
        <h2 className="section-title">Success Stories from Nearby Villages</h2>
        
        <div className="stories-grid">
          {successStories.map((story, index) => (
            <div key={index} className="story-card">
              <div className="story-avatar">{story.image}</div>
              <div className="story-content">
                <h3>{story.name}</h3>
                <p className="story-location">{story.location}</p>
                <p className="story-text">{story.story}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Start Options */}
      <section className="quick-start-section">
        <h2 className="section-title">Start Your Journey</h2>
        
        <div className="start-options">
          <div className="start-option" onClick={() => navigate('/test')}>
            <div className="option-icon">📝</div>
            <h3>Take Financial Personality Test</h3>
            <p>5 simple questions to understand your needs</p>
          </div>
          
          <div className="start-option" onClick={() => navigate('/stories')}>
            <div className="option-icon">📖</div>
            <h3>Learn Through Stories</h3>
            <p>Real-life scenarios with choices and consequences</p>
          </div>
          
          <div className="start-option" onClick={() => navigate('/savings')}>
            <div className="option-icon">💰</div>
            <h3>Try Savings Simulator</h3>
            <p>Practice saving without using real money</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>Ready to Take Control of Your Money?</h2>
          <p>Join 1,50,000+ learners who are building financial confidence</p>
          <button 
            className="button button-primary cta-button"
            onClick={handleStartLearning}
          >
            Start Learning for Free
          </button>
          <p className="cta-note">No registration required. Start immediately!</p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;