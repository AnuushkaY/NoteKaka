import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { VoiceContext } from '../context/VoiceContext';
import '../styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const { translate, currentLanguage } = useContext(LanguageContext);
  const { isVoiceMode, toggleVoiceMode } = useContext(VoiceContext);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStartLearning = () => {
    navigate('/test');
  };

  const handlePlayGame = () => {
    navigate('/games');
  };

  const handleExploreWithoutLogin = () => {
    navigate('/dashboard');
  };

  const successStories = [
    {
      name: 'Ram Singh',
      location: 'Rajasthan',
      story: 'Learned crop insurance, saved ₹20,000 in losses',
      image: ''
    },
    {
      name: 'Asha Devi',
      location: 'Uttar Pradesh',
      story: 'Opened tailoring shop with micro-loan guidance',
      image: ''
    },
    {
      name: 'Rajesh Kumar',
      location: 'Bihar',
      story: 'Started saving daily, bought smartphone for business',
      image: ''
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="greeting">
            <span className="namaste">🙏</span>
            <h1>{translate('Namaste!')}</h1>
          </div>
          
          <h2 className="hero-title">{translate('Learn Money Wisdom with NoteKaka')}</h2>
          
          <p className="hero-description">
            {translate('Your village guide to financial literacy. Learn about savings, budgeting, loans, and insurance in simple language.')}
          </p>
          
          <div className="hero-actions">
            <button 
              className="button button-primary hero-button"
              onClick={handleStartLearning}
            >
              {translate('Start Learning')}
            </button>
            <button 
              className="button button-success hero-button"
              onClick={handlePlayGame}
            >
              🎮 {translate('Play Games')}
            </button>
            <button 
              className="button button-outline hero-button"
              onClick={handleExploreWithoutLogin}
            >
              {translate('Explore Without Login')}
            </button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <h2 className="section-title">{translate('Why People Trust NoteKaka')}</h2>
        
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon">👥</div>
            <h3>{translate('Made for Villages')}</h3>
            <p>{translate('Content designed specifically for rural life and needs')}</p>
          </div>
          
          <div className="trust-card">
            <div className="trust-icon">🗣️</div>
            <h3>{translate('Your Language')}</h3>
            <p>{translate('Available in Hindi, Tamil, Telugu, Bengali, Marathi and more')}</p>
          </div>
          
          <div className="trust-card">
            <div className="trust-icon">🎮</div>
            <h3>{translate('Learn by Doing')}</h3>
            <p>{translate('Interactive stories and simulations, not boring lectures')}</p>
          </div>
          
          <div className="trust-card">
            <div className="trust-icon">🔒</div>
            <h3>{translate('100% Safe')}</h3>
            <p>{translate('No real money needed. Learn without risk')}</p>
          </div>
        </div>
      </section>

      {/* Quick Start Options */}
      <section className="quick-start-section">
        <h2 className="section-title">{translate('Start Your Journey')}</h2>
        
        <div className="start-options">
          <div className="start-option" onClick={() => navigate('/test')}>
            <div className="option-icon">📝</div>
            <h3>{translate('Take Financial Personality Test')}</h3>
            <p>{translate('5 simple questions to understand your needs')}</p>
          </div>
          
          <div className="start-option" onClick={() => navigate('/stories')}>
            <div className="option-icon">📖</div>
            <h3>{translate('Learn Through Stories')}</h3>
            <p>{translate('Real-life scenarios with choices and consequences')}</p>
          </div>
          
          <div className="start-option" onClick={() => navigate('/savings')}>
            <div className="option-icon">💰</div>
            <h3>{translate('Try Savings Simulator')}</h3>
            <p>{translate('Practice saving without using real money')}</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>{translate('Ready to Take Control of Your Money?')}</h2>
          <p>{translate('Join 1,50,000+ learners who are building financial confidence')}</p>
          <button 
            className="button button-primary cta-button"
            onClick={handleStartLearning}
          >
            {translate('Start Learning for Free')}
          </button>
          <p className="cta-note">{translate('No registration required. Start immediately!')}</p>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;