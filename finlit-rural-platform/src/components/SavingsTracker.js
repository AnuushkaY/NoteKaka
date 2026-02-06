import React, { useState, useEffect } from 'react';
import '../styles/SavingsTracker.css';

function SavingsTracker({ monthlyGoal = 3000 }) {
  const [saved, setSaved] = useState(1850);
  const [savingsHistory, setSavingsHistory] = useState([]);
  const [dayStreak, setDayStreak] = useState(12);

  const remaining = monthlyGoal - saved;
  const percentage = Math.round((saved / monthlyGoal) * 100);

  const quickAddAmounts = [10, 20, 50, 100, 200, 500];

  const handleAddSavings = (amount) => {
    if (saved + amount <= monthlyGoal) {
      setSaved(prev => prev + amount);
      setSavingsHistory(prev => [...prev, {
        amount,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
      }]);
    }
  };

  const handleReset = () => {
    setSaved(0);
    setSavingsHistory([]);
  };

  const progressBarStyle = {
    width: `${percentage}%`,
    backgroundColor: percentage >= 100 ? '#4CAF50' : '#2196F3'
  };

  return (
    <div className="savings-tracker card">
      <h2>Savings Tracker</h2>
      <p className="tracker-subtitle">Track your daily savings goal</p>
      
      <div className="monthly-goal-section">
        <h3>Monthly Goal</h3>
        <div className="goal-amount">₹{monthlyGoal} / monthly goal</div>
        
        <div className="progress-container">
          <div className="progress-bar" style={progressBarStyle}></div>
        </div>
        <div className="progress-text">{percentage}% complete</div>
      </div>
      
      <div className="savings-stats">
        <div className="stat-box">
          <div className="stat-label">Saved So Far</div>
          <div className="stat-amount">₹{saved}</div>
        </div>
        
        <div className="stat-box">
          <div className="stat-label">Remaining</div>
          <div className="stat-amount remaining">₹{remaining}</div>
        </div>
      </div>
      
      <div className="quick-add-section">
        <h3>Add Savings:</h3>
        <div className="quick-add-buttons">
          {quickAddAmounts.map(amount => (
            <button
              key={amount}
              className="quick-add-btn"
              onClick={() => handleAddSavings(amount)}
              disabled={saved + amount > monthlyGoal}
            >
              + ₹{amount}
            </button>
          ))}
        </div>
      </div>
      
      <div className="daily-tip">
        <h3>Daily Tip</h3>
        <p>Put aside money for savings before spending on wants.</p>
      </div>
      
      <div className="streak-section">
        <div className="streak-icon">🔥</div>
        <div className="streak-info">
          <div className="streak-count">{dayStreak} Day Streak</div>
          <div className="streak-sub">Keep going! Your consistency is paying off.</div>
        </div>
      </div>
      
      {savingsHistory.length > 0 && (
        <div className="savings-history">
          <h3>Recent Savings</h3>
          <div className="history-list">
            {savingsHistory.slice(-5).map((entry, index) => (
              <div key={index} className="history-item">
                <span className="history-amount">+₹{entry.amount}</span>
                <span className="history-time">{entry.date} {entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="tracker-actions">
        <button className="button button-secondary" onClick={handleReset}>
          Reset Tracker
        </button>
      </div>
    </div>
  );
}

export default SavingsTracker;