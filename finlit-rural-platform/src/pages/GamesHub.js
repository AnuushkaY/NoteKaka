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
      id: 'coins',
      title: '💎 Coin Collector',
      description: 'React quickly to collect good financial choices while avoiding bad ones. Increase your coins and reach higher levels!',
      longDescription: 'Test your reflexes in this fast-paced action game. Collect green arrows (good financial choices) to increase your coin count and earn points. Avoid red arrows (bad choices) which decrease your coins. The game gets faster as you progress through levels.',
      difficulty: 'Easy',
      playTime: '3-5 min',
      color: '#FFA500',
      icon: '🎯',
      path: '/coins'
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
            <h4>Think Before Acting</h4>
            <p>Take time to understand each scenario. Financial decisions have consequences!</p>
          </div>
          <div className="tip-card">
            <div className="tip-number">2</div>
            <h4>Learn from Mistakes</h4>
            <p>Use each game as a learning opportunity. Try different strategies!</p>
          </div>
          <div className="tip-card">
            <div className="tip-number">3</div>
            <h4>Practice Regularly</h4>
            <p>Help your financial skills improve by playing multiple times.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesHub;
