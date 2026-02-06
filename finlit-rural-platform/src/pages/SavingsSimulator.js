import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import ProgressBar from '../components/ProgressBar';
import '../styles/SavingsSimulator.css';

function SavingsSimulator() {
  const { translate } = useContext(LanguageContext);
  const [income, setIncome] = useState(15000);
  const [savingsPercent, setSavingsPercent] = useState(20);
  const [timePeriod, setTimePeriod] = useState(12); // months
  const [savingsGoal, setSavingsGoal] = useState(50000);
  const [festivalExpense, setFestivalExpense] = useState(5000);
  const [showComparison, setShowComparison] = useState(false);
  const [scenario, setScenario] = useState('regular');

  const calculateSavings = () => {
    const monthlySavings = (income * savingsPercent) / 100;
    const totalSavings = monthlySavings * timePeriod;
    const festivalSavings = totalSavings - festivalExpense;
    const goalProgress = Math.min((totalSavings / savingsGoal) * 100, 100);
    
    return {
      monthlySavings,
      totalSavings,
      festivalSavings,
      goalProgress,
      remainingMonths: Math.max(0, Math.ceil((savingsGoal - totalSavings) / monthlySavings))
    };
  };

  const calculateBadHabitCost = () => {
    const habits = [
      { name: 'Daily Tea/Beedi', cost: 50, frequency: 'daily' },
      { name: 'Weekly Snacks', cost: 200, frequency: 'weekly' },
      { name: 'Monthly Mobile Recharge', cost: 299, frequency: 'monthly' },
      { name: 'Impulse Shopping', cost: 500, frequency: 'monthly' }
    ];

    return habits.map(habit => {
      let monthlyCost = habit.cost;
      if (habit.frequency === 'daily') monthlyCost = habit.cost * 30;
      if (habit.frequency === 'weekly') monthlyCost = habit.cost * 4;
      return {
        ...habit,
        monthlyCost,
        yearlyCost: monthlyCost * 12
      };
    });
  };

  const getCropCyclePlan = () => {
    const cycles = [
      { crop: 'Wheat', months: [11, 0, 1, 2], investment: 20000, return: 40000 },
      { crop: 'Rice', months: [6, 7, 8, 9], investment: 25000, return: 50000 },
      { crop: 'Sugarcane', months: [10, 11, 0, 1, 2, 3], investment: 40000, return: 80000 },
      { crop: 'Vegetables', months: [0, 1, 2, 3, 4, 5], investment: 15000, return: 35000 }
    ];

    const currentMonth = new Date().getMonth();
    return cycles.find(cycle => cycle.months.includes(currentMonth)) || cycles[0];
  };

  const getFestivalPlan = () => {
    const festivals = [
      { name: 'Diwali', month: 10, typicalExpense: 10000 },
      { name: 'Eid', month: 4, typicalExpense: 8000 },
      { name: 'Christmas', month: 11, typicalExpense: 5000 },
      { name: 'Holi', month: 2, typicalExpense: 3000 },
      { name: 'Pongal/Makar Sankranti', month: 0, typicalExpense: 7000 }
    ];

    const currentMonth = new Date().getMonth();
    const nextFestival = festivals.find(f => f.month >= currentMonth) || festivals[0];
    const monthsToFestival = (nextFestival.month - currentMonth + 12) % 12 || 12;
    
    return {
      ...nextFestival,
      monthsToFestival,
      monthlySavingsNeeded: nextFestival.typicalExpense / monthsToFestival
    };
  };

  const { monthlySavings, totalSavings, festivalSavings, goalProgress, remainingMonths } = calculateSavings();
  const badHabits = calculateBadHabitCost();
  const cropPlan = getCropCyclePlan();
  const festivalPlan = getFestivalPlan();

  const totalBadHabitYearly = badHabits.reduce((sum, habit) => sum + habit.yearlyCost, 0);
  const alternativeUses = [
    { amount: totalBadHabitYearly * 0.3, use: '6 months of school fees' },
    { amount: totalBadHabitYearly * 0.5, use: 'New smartphone' },
    { amount: totalBadHabitYearly, use: 'Small business investment' },
    { amount: totalBadHabitYearly * 2, use: 'House repair fund' }
  ];

  const scenarios = {
    regular: {
      name: 'Regular Savings',
      description: 'Saving fixed percentage every month',
      monthly: monthlySavings,
      yearly: monthlySavings * 12
    },
    aggressive: {
      name: 'Aggressive Savings',
      description: 'Saving 30% with festival cuts',
      monthly: monthlySavings * 1.5,
      yearly: monthlySavings * 18
    },
    cropbased: {
      name: 'Crop Cycle Based',
      description: 'Save more during harvest months',
      monthly: monthlySavings * 1.2,
      yearly: monthlySavings * 14.4
    }
  };

  return (
    <div className="savings-simulator">
      <div className="simulator-header">
        <h1>Savings & Investment Simulator</h1>
        <p>Practice saving and investing without using real money. See how small changes grow over time.</p>
      </div>

      <div className="simulator-container">
        <div className="controls-section">
          <h2>Adjust Your Scenario</h2>
          
          <div className="control-group">
            <label>
              Monthly Income: ₹{income.toLocaleString()}
              <input
                type="range"
                min="5000"
                max="100000"
                step="1000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
              />
            </label>
            <div className="range-values">
              <span>₹5,000</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          <div className="control-group">
            <label>
              Savings Percentage: {savingsPercent}%
              <input
                type="range"
                min="5"
                max="50"
                step="5"
                value={savingsPercent}
                onChange={(e) => setSavingsPercent(Number(e.target.value))}
              />
            </label>
            <div className="savings-tips">
              <span className="tip">5% - Basic</span>
              <span className="tip">20% - Good</span>
              <span className="tip">50% - Excellent</span>
            </div>
          </div>

          <div className="control-group">
            <label>
              Time Period: {timePeriod} months
              <input
                type="range"
                min="1"
                max="60"
                step="1"
                value={timePeriod}
                onChange={(e) => setTimePeriod(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="control-group">
            <label>
              Savings Goal: ₹{savingsGoal.toLocaleString()}
              <input
                type="range"
                min="10000"
                max="500000"
                step="10000"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(Number(e.target.value))}
              />
            </label>
          </div>

          <div className="scenario-selector">
            <h3>Choose Savings Style:</h3>
            <div className="scenario-buttons">
              {Object.keys(scenarios).map(key => (
                <button
                  key={key}
                  className={`scenario-btn ${scenario === key ? 'active' : ''}`}
                  onClick={() => setScenario(key)}
                >
                  {scenarios[key].name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="results-section">
          <div className="savings-card primary">
            <h2>Your Savings Plan</h2>
            <div className="savings-stats">
              <div className="stat">
                <div className="stat-label">Monthly Savings</div>
                <div className="stat-value">₹{monthlySavings.toLocaleString()}</div>
              </div>
              <div className="stat">
                <div className="stat-label">After {timePeriod} months</div>
                <div className="stat-value">₹{totalSavings.toLocaleString()}</div>
              </div>
              <div className="stat">
                <div className="stat-label">After Festival</div>
                <div className="stat-value">₹{festivalSavings.toLocaleString()}</div>
              </div>
            </div>

            <div className="goal-progress">
              <h3>Goal Progress: ₹{savingsGoal.toLocaleString()}</h3>
              <ProgressBar progress={goalProgress} height={25} />
              <div className="goal-details">
                <span>Saved: ₹{totalSavings.toLocaleString()}</span>
                <span>Remaining: ₹{(savingsGoal - totalSavings).toLocaleString()}</span>
                <span>Time needed: {remainingMonths} months</span>
              </div>
            </div>
          </div>

          <div className="comparison-section">
            <button 
              className="comparison-toggle"
              onClick={() => setShowComparison(!showComparison)}
            >
              <h3>💡 See How Small Changes Help {showComparison ? '▲' : '▼'}</h3>
            </button>
            
            {showComparison && (
              <div className="comparison-content">
                <div className="comparison-grid">
                  {Object.keys(scenarios).map(key => (
                    <div key={key} className={`comparison-card ${scenario === key ? 'active' : ''}`}>
                      <h4>{scenarios[key].name}</h4>
                      <p>{scenarios[key].description}</p>
                      <div className="comparison-amount">
                        ₹{(scenarios[key].yearly).toLocaleString()}/year
                      </div>
                      <div className="comparison-diff">
                        {key !== 'regular' && 
                          `+${(((scenarios[key].yearly - scenarios.regular.yearly) / scenarios.regular.yearly) * 100).toFixed(0)}% more`
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="habits-section">
        <h2>Small Habits, Big Impact</h2>
        <p>See how daily expenses add up over time:</p>
        
        <div className="habits-grid">
          {badHabits.map((habit, index) => (
            <div key={index} className="habit-card">
              <div className="habit-header">
                <h4>{habit.name}</h4>
                <span className="habit-frequency">{habit.frequency}</span>
              </div>
              <div className="habit-costs">
                <div className="cost">
                  <span>Monthly:</span>
                  <span className="cost-amount">₹{habit.monthlyCost}</span>
                </div>
                <div className="cost">
                  <span>Yearly:</span>
                  <span className="cost-amount">₹{habit.yearlyCost.toLocaleString()}</span>
                </div>
              </div>
              <div className="habit-alternative">
                <small>Could buy: {alternativeUses[index]?.use || 'Something useful'}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="habits-total">
          <div className="total-card">
            <h3>Total Yearly Expense on Small Habits:</h3>
            <div className="total-amount">₹{totalBadHabitYearly.toLocaleString()}</div>
            <p className="total-note">
              This amount could be invested or saved for important goals!
            </p>
          </div>
        </div>
      </div>

      <div className="special-plans">
        <div className="crop-plan">
          <h2>🌾 Crop Cycle Budgeting</h2>
          <div className="plan-details">
            <div className="plan-stat">
              <span>Current Crop:</span>
              <strong>{cropPlan.crop}</strong>
            </div>
            <div className="plan-stat">
              <span>Investment Needed:</span>
              <strong>₹{cropPlan.investment.toLocaleString()}</strong>
            </div>
            <div className="plan-stat">
              <span>Expected Return:</span>
              <strong>₹{cropPlan.return.toLocaleString()}</strong>
            </div>
            <div className="plan-stat">
              <span>Profit Potential:</span>
              <strong className="profit">₹{(cropPlan.return - cropPlan.investment).toLocaleString()}</strong>
            </div>
          </div>
          <div className="plan-tip">
            <p>💡 Tip: Save 10-15% of harvest income for next season's investment</p>
          </div>
        </div>

        <div className="festival-plan">
          <h2>🎉 Festival Savings Plan</h2>
          <div className="plan-details">
            <div className="plan-stat">
              <span>Next Festival:</span>
              <strong>{festivalPlan.name}</strong>
            </div>
            <div className="plan-stat">
              <span>Months to go:</span>
              <strong>{festivalPlan.monthsToFestival}</strong>
            </div>
            <div className="plan-stat">
              <span>Typical Expense:</span>
              <strong>₹{festivalPlan.typicalExpense.toLocaleString()}</strong>
            </div>
            <div className="plan-stat">
              <span>Save Monthly:</span>
              <strong>₹{Math.ceil(festivalPlan.monthlySavingsNeeded).toLocaleString()}</strong>
            </div>
          </div>
          <div className="plan-tip">
            <p>💡 Tip: Start saving early to avoid loans during festivals</p>
          </div>
        </div>
      </div>

      <div className="simulator-tips">
        <div className="tip-card">
          <div className="tip-icon">💭</div>
          <div className="tip-content">
            <h3>Remember:</h3>
            <p>"Saving is not about having lots of money. It's about making your money work for you, even in small amounts."</p>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="button button-primary">
            Save This Plan
          </button>
          <button className="button button-outline">
            Start Over
          </button>
          <button className="button button-secondary">
            Share with Family
          </button>
        </div>
      </div>
    </div>
  );
}

export default SavingsSimulator;