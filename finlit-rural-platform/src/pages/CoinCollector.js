import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CoinCollector.css';

function CoinCollector() {
  const navigate = useNavigate();
  const gameAreaRef = useRef(null);
  
  const [coins, setCoins] = useState(0);
  const [playerLane, setPlayerLane] = useState(1);
  const [obstacles, setObstacles] = useState([]);
  const [gameActive, setGameActive] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const LANES = 3;
  const GAME_WIDTH = 400;
  const GAME_HEIGHT = 600;
  const OBSTACLE_WIDTH = 50;
  const OBSTACLE_HEIGHT = 50;
  const OBSTACLE_SPEED = 5;

  // Generate obstacles
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      const randomLane = Math.floor(Math.random() * LANES);
      const isGood = Math.random() > 0.4; // 60% good, 40% bad

      const newObstacle = {
        id: Math.random(),
        lane: randomLane,
        y: -OBSTACLE_HEIGHT,
        isGood: isGood,
        collected: false
      };

      setObstacles(prev => [...prev, newObstacle]);
    }, 800 - level * 50); // Faster as level increases

    return () => clearInterval(interval);
  }, [gameActive, level]);

  // Move obstacles
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setObstacles(prev => {
        const updated = prev
          .map(obstacle => ({ ...obstacle, y: obstacle.y + OBSTACLE_SPEED }))
          .filter(obstacle => obstacle.y < GAME_HEIGHT);

        // Check for collisions
        updated.forEach(obstacle => {
          const obstacleBottom = obstacle.y + OBSTACLE_HEIGHT;
          const playerTop = GAME_HEIGHT - 100;
          const playerBottom = playerTop + 60;

          const obstacleLeft = (obstacle.lane * (GAME_WIDTH / LANES)) + 10;
          const obstacleRight = obstacleLeft + OBSTACLE_WIDTH;

          const playerLeft = (playerLane * (GAME_WIDTH / LANES)) + 10;
          const playerRight = playerLeft + OBSTACLE_WIDTH;

          if (
            obstacleBottom >= playerTop &&
            obstacle.y <= playerBottom &&
            obstacleRight >= playerLeft &&
            obstacleLeft <= playerRight &&
            !obstacle.collected
          ) {
            obstacle.collected = true;

            if (obstacle.isGood) {
              setCoins(c => c + 1);
              setScore(s => s + 10);
            } else {
              if (coins > 0) setCoins(c => c - 1);
              setScore(s => Math.max(0, s - 5));
            }
          }
        });

        return updated;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [playerLane, coins, gameActive]);

  // Level up
  useEffect(() => {
    if (score > 0 && score % 100 === 0) {
      setLevel(prev => prev + 1);
    }
  }, [score]);

  const moveLeft = () => {
    if (playerLane > 0) {
      setPlayerLane(playerLane - 1);
    }
  };

  const moveRight = () => {
    if (playerLane < LANES - 1) {
      setPlayerLane(playerLane + 1);
    }
  };

  const getLaneX = (lane) => {
    return (lane * (GAME_WIDTH / LANES)) + 10;
  };

  const toggleGame = () => {
    setGameActive(!gameActive);
  };

  const resetGame = () => {
    setCoins(0);
    setPlayerLane(1);
    setObstacles([]);
    setGameActive(true);
    setGameOver(false);
    setScore(0);
    setLevel(1);
  };

  return (
    <div className="coin-collector-container">
      <div className="game-header">
        <button className="back-button" onClick={() => navigate('/games')}>
          ← Back
        </button>
        <h1>💰 Coin Collector</h1>
        <div className="game-stats">
          <div className="stat">
            <span className="stat-label">Coins:</span>
            <span className="stat-value">{coins}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Lane:</span>
            <span className="stat-value">{playerLane + 1}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Level:</span>
            <span className="stat-value">{level}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Score:</span>
            <span className="stat-value">{score}</span>
          </div>
        </div>
      </div>

      <div className="game-area" ref={gameAreaRef}>
        {/* Lane separators */}
        {[...Array(LANES - 1)].map((_, i) => (
          <div
            key={`lane-${i}`}
            className="lane-separator"
            style={{
              left: `${((i + 1) * (GAME_WIDTH / LANES))}px`,
              height: `${GAME_HEIGHT}px`
            }}
          />
        ))}

        {/* Obstacles */}
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            className={`obstacle ${obstacle.isGood ? 'good' : 'bad'} ${
              obstacle.collected ? 'collected' : ''
            }`}
            style={{
              left: `${getLaneX(obstacle.lane)}px`,
              top: `${obstacle.y}px`,
              width: `${OBSTACLE_WIDTH}px`,
              height: `${OBSTACLE_HEIGHT}px`
            }}
          >
            <span className="obstacle-icon">
              {obstacle.isGood ? '↑' : '↓'}
            </span>
          </div>
        ))}

        {/* Player */}
        <div
          className="player"
          style={{
            left: `${getLaneX(playerLane)}px`,
            width: `${OBSTACLE_WIDTH}px`,
            height: '60px',
            bottom: '10px'
          }}
        >
          <span className="player-icon">₹</span>
        </div>
      </div>

      <div className="game-controls">
        <button className="control-button left-button" onClick={moveLeft}>
          ← Move Left
        </button>
        <button className="control-button right-button" onClick={moveRight}>
          Move Right →
        </button>
      </div>

      <div className="game-info">
        <p className="info-text">
          Collect green arrows (↑ = good choices) and avoid red arrows (↓ = bad choices)!
        </p>
        <p className="info-text" style={{ fontSize: '0.9rem', marginTop: '5px' }}>
          Complete levels to increase difficulty. Higher scores = Better financial decisions!
        </p>
      </div>

      {gameActive === false && (
        <div className="game-pause-overlay">
          <div className="pause-menu">
            <h2>Game Paused</h2>
            <p>Score: {score}</p>
            <button className="menu-button" onClick={toggleGame}>
              Resume
            </button>
            <button className="menu-button" onClick={resetGame}>
              New Game
            </button>
            <button className="menu-button" onClick={() => navigate('/')}>
              Home
            </button>
          </div>
        </div>
      )}

      <div className="pause-toggle">
        <button
          className="pause-button"
          onClick={toggleGame}
          title={gameActive ? 'Pause' : 'Resume'}
        >
          {gameActive ? '⏸' : '▶'}
        </button>
      </div>
    </div>
  );
}

export default CoinCollector;
