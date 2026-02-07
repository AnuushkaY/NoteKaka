import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GamesHub.css';

function GamesHub() {
  const navigate = useNavigate();

  const games = [
    {
      id: 'maze',
      title: '💰 Money Maze',
      description: 'Navigate through a financial maze and make smart money decisions at every turn. Reach the finish line while maximizing your score!',
      longDescription: 'Navigate through a 10x10 maze grid and encounter various financial scenarios. Make decisions about loans, insurance, savings, and business opportunities. Each choice impacts your final score. Perfect for learning about financial planning and decision-making.',
      difficulty: 'Medium',
      playTime: '5-10 min',
      color: '#667eea',
      icon: '🎮',
      path: '/game'
    },
    {
      id: 'scam-chat',
      title: '🛡️ Scam Chat Defender',
      description: 'Learn to identify and avoid online scams through realistic chat simulations. No hints during gameplay - learn from your choices!',
      longDescription: 'Engage in realistic chat conversations with AI scammers pretending to be from banks, lotteries, or emergencies. Make choices in real-time conversations and learn why certain responses are safe or dangerous. Covers 10+ scam types including KYC fraud, lottery scams, emergency money requests, phishing, and romance scams.',
      difficulty: 'Easy to Hard',
      playTime: '3-8 min',
      color: '#4CAF50',
      icon: '💬',
      path: '/scam-chat'
    }
  ];

  return (
    <div className="games-hub-container">
      <div className="games-hub-header">
        <button className="back-button-hub" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h1>🎮 Choose Your Game</h1>
      </div>

      <div className="games-intro">
        <p>Learn financial literacy through interactive games. Each game teaches different money management skills!</p>
      </div>

      <div className="games-grid">
        {games.map(game => (
          <div
            key={game.id}
            className="game-card"
            style={{ borderTopColor: game.color }}
          >
            <div className="game-header-card" style={{ backgroundColor: game.color }}>
              <div className="game-icon">{game.icon}</div>
              <h3>{game.title}</h3>
            </div>

            <div className="game-content">
              <p className="game-description">{game.description}</p>

              <div className="game-details">
                <div className="detail-item">
                  <span className="detail-label">📊 Difficulty:</span>
                  <span className="detail-value">{game.difficulty}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">⏱️ Time:</span>
                  <span className="detail-value">{game.playTime}</span>
                </div>
              </div>

              <div className="game-long-description">
                <h4>What You'll Learn:</h4>
                <p>{game.longDescription}</p>
              </div>

              <button
                className="play-button"
                style={{
                  backgroundColor: game.color,
                  borderColor: game.color
                }}
                onClick={() => navigate(game.path)}
              >
                Play Now →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="games-tips">
        <h2>💡 Tips for Success</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-number">1</div>
            <h4>Think Before Responding</h4>
            <p>Read messages carefully. Scammers use urgency and emotion to trick you!</p>
          </div>
          <div className="tip-card">
            <div className="tip-number">2</div>
            <h4>Verify Information</h4>
            <p>Always verify through official channels. Real institutions don\'t ask for OTP or passwords!</p>
          </div>
          <div className="tip-card">
            <div className="tip-number">3</div>
            <h4>Recognize Patterns</h4>
            <p>Scams follow similar patterns. Learn to spot red flags like urgency and too-good-to-be-true offers.</p>
          </div>
        </div>
      </div>

      <div className="game-features">
        <h2>🎯 Game Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h4>Realistic Scenarios</h4>
            <p>Based on actual scam reports and patterns used by fraudsters.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h4>Chat Interface</h4>
            <p>Familiar WhatsApp-like interface for authentic learning experience.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h4>AI-Powered</h4>
            <p>Dynamic conversations that adapt based on your responses.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h4>Educational Feedback</h4>
            <p>Detailed explanations of why choices were safe or dangerous.</p>
          </div>
        </div>
      </div>

      <div className="scam-types-info">
        <h2>🛡️ Scam Types Covered</h2>
        <div className="scam-types-grid">
          <div className="scam-type">
            <span className="scam-icon">🏦</span>
            <span className="scam-name">Bank/KYC Scams</span>
          </div>
          <div className="scam-type">
            <span className="scam-icon">🎰</span>
            <span className="scam-name">Lottery Scams</span>
          </div>
          <div className="scam-type">
            <span className="scam-icon">🚨</span>
            <span className="scam-name">Emergency Scams</span>
          </div>
          <div className="scam-type">
            <span className="scam-icon">💼</span>
            <span className="scam-name">Job Scams</span>
          </div>
          <div className="scam-type">
            <span className="scam-icon">❤️</span>
            <span className="scam-name">Romance Scams</span>
          </div>
          <div className="scam-type">
            <span className="scam-icon">💻</span>
            <span className="scam-name">Tech Support Scams</span>
          </div>
        </div>
        <p className="scam-types-note">And 4 more scam types to discover!</p>
      </div>
    </div>
  );
}

export default GamesHub;