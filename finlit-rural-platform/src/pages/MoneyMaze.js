import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/MoneyMaze.css';

export default function MoneyMaze() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const size = 50;

  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [popup, setPopup] = useState(null);

  const initialMaze = [
    [0,6,1,7,0,2,0,1,3,0],
    [0,1,1,0,1,0,0,1,0,0],
    [8,0,0,0,1,4,1,0,5,0],
    [1,1,0,1,0,0,1,0,1,0],
    [0,3,0,1,0,1,0,0,10,0],
    [0,1,0,0,0,1,0,1,2,0],
    [0,1,1,1,0,0,0,1,0,0],
    [0,0,0,1,5,1,0,0,7,1],
    [3,1,0,0,0,1,1,1,0,0],
    [0,0,0,1,0,0,0,6,0,9]
  ];

  const [maze, setMaze] = useState(initialMaze);

  const icons = {
    2: "🏦",
    3: "🌾",
    4: "🛡",
    5: "🚑",
    6: "💰",
    7: "🏪",
    8: "🎓",
    10: "📜"
  };

  const events = {
    2: {
      text: "A bank offers you a small loan.",
      choices: [
        { t: "Accept the loan", f: () => setScore(s => s + 20) },
        { t: "Decline", f: () => setScore(s => s + 5) }
      ]
    },
    3: {
      text: "You can buy better farming tools.",
      choices: [
        { t: "Buy tools", f: () => setScore(s => s + (Math.random() > 0.5 ? 25 : -10)) },
        { t: "Keep old tools", f: () => setScore(s => s + 3) }
      ]
    },
    4: {
      text: "An insurance agent visits your home.",
      choices: [
        { t: "Buy insurance", f: () => setScore(s => s + 10) },
        { t: "Say no", f: () => setScore(s => s - 5) }
      ]
    },
    5: {
      text: "A sudden medical expense happens.",
      choices: [
        { t: "Use savings", f: () => setScore(s => s - 5) },
        { t: "Borrow money", f: () => setScore(s => s - 15) }
      ]
    },
    6: {
      text: "You receive extra income this month.",
      choices: [
        { t: "Save some money", f: () => setScore(s => s + 10) },
        { t: "Spend it", f: () => setScore(s => s + 2) }
      ]
    },
    7: {
      text: "You get a chance to start a small shop.",
      choices: [
        { t: "Start the business", f: () => setScore(s => s + (Math.random() > 0.5 ? 30 : -15)) },
        { t: "Wait and observe", f: () => setScore(s => s + 4) }
      ]
    },
    8: {
      text: "A family member wants education support.",
      choices: [
        { t: "Pay for education", f: () => setScore(s => s + 15) },
        { t: "Delay it", f: () => setScore(s => s - 5) }
      ]
    },
    10: {
      text: "A government savings scheme is available.",
      choices: [
        { t: "Join the scheme", f: () => setScore(s => s + 12) },
        { t: "Ignore it", f: () => setScore(s => s + 1) }
      ]
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const type = maze[y][x];
        const px = x * size;
        const py = y * size;

        if (type === 1) {
          ctx.fillStyle = "#333";
          ctx.fillRect(px, py, size, size);
          continue;
        }

        if (type === 9) {
          ctx.fillStyle = "lime";
          ctx.fillRect(px + 8, py + 8, 34, 34);
          ctx.font = "28px Arial";
          ctx.fillText("🏁", px + 10, py + 36);
          continue;
        }

        if (icons[type]) {
          ctx.font = "28px Arial";
          ctx.fillText(icons[type], px + 10, py + 36);
        }

        if (x === 0 && y === 0) {
          ctx.fillStyle = "cyan";
          ctx.beginPath();
          ctx.arc(px + 25, py + 25, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(player.x * size + 25, player.y * size + 25, 12, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    draw();
  }, [player, maze]);

  const move = (dx, dy) => {
    if (popup) return;

    const nx = player.x + dx;
    const ny = player.y + dy;

    if (nx < 0 || ny < 0 || nx >= 10 || ny >= 10) return;
    if (maze[ny][nx] === 1) return;

    const tile = maze[ny][nx];
    setPlayer({ x: nx, y: ny });

    if (tile === 9) {
      alert(`🏆 Finished! Final Score: ${score}`);
      window.location.reload();
      return;
    }

    if (events[tile]) {
      setPopup({ tile, data: events[tile] });
    }
  };

  useEffect(() => {
    const handleKey = e => {
      if (e.key === "ArrowUp") move(0, -1);
      if (e.key === "ArrowDown") move(0, 1);
      if (e.key === "ArrowLeft") move(-1, 0);
      if (e.key === "ArrowRight") move(1, 0);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const handleChoice = choice => {
    choice.f();

    const newMaze = maze.map(row => [...row]);
    newMaze[player.y][player.x] = 0;
    setMaze(newMaze);

    setPopup(null);
  };

  return (
    <div className="money-maze-container">
      <div className="maze-header">
        <button 
          className="back-button"
          onClick={() => navigate('/games')}
          title="Return to Games Hub"
        >
          ← Back
        </button>
        <h2>💰 Money Maze</h2>
        <div style={{width: '60px'}}></div>
      </div>
      <p className="maze-score">Score: {score}</p>

      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="maze-canvas"
      />

      <div className="maze-instructions">
        <p>Use Arrow Keys to move • Avoid walls (Dark blocks) • Reach the finish line 🏁</p>
      </div>

      {popup && (
        <div className="maze-popup-overlay">
          <div className="maze-popup">
            <p className="popup-text">{popup.data.text}</p>

            <div className="popup-choices">
              {popup.data.choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleChoice(c)}
                  className="popup-button"
                >
                  {c.t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
