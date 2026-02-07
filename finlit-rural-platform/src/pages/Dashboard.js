import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import LessonCard from '../components/LessonCard';
import '../styles/Dashboard.css';

function Dashboard() {
  const { points } = useContext(UserContext);
  
  const stats = {
    villagesReached: 2500,
    activeLearners: 150000,
    lessonsAvailable: 48,
    languages: 3
  };
  
  const todayLessons = [
    {
      id: 1,
      title: 'Smart Savings',
      description: 'Learn how to save money every day, even with a small income.',
      progress: 100,
      completed: true,
      duration: '15 min'
    },
    {
      id: 2,
      title: 'Family Budget',
      description: 'Create a simple budget to manage your household expenses.',
      progress: 65,
      completed: false,
      duration: '20 min'
    },
    {
      id: 3,
      title: 'Understanding Loans',
      description: 'Know the difference between good loans and debt traps.',
      progress: 0,
      completed: false,
      duration: '25 min'
    },
    {
      id: 4,
      title: 'Crop Insurance',
      description: 'Protect your harvest and livelihood with the right insurance.',
      progress: 0,
      completed: false,
      duration: '30 min'
    }
  ];

  const learningModules = [
    {
      id: 1,
      title: 'Bank Account',
      description: 'How to open and use a bank account for your benefit.',
      icon: '🏦',
      path: '/lessons/bank-account'
    },
    {
      id: 2,
      title: 'Digital Payments',
      description: 'Use UPI and mobile banking safely and easily.',
      icon: '📱',
      path: '/payments'
    },
    {
      id: 3,
      title: 'Government Schemes',
      description: 'Find schemes that can help you and your family.',
      icon: '📋',
      path: '/schemes'
    },
    {
      id: 4,
      title: 'Small Business',
      description: 'Manage and grow your small shop or business.',
      icon: '🏪',
      path: '/lessons/business'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>NoteKaka</h1>
          <p className="tagline">Empowering villages with financial wisdom</p>
        </div>
        <div className="points-badge">
          <span className="points-icon">⭐</span>
          <span className="points-text">{points} Points</span>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.villagesReached.toLocaleString()}+</div>
          <div className="stat-label">Villages Reached</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.activeLearners.toLocaleString()}+</div>
          <div className="stat-label">Active Learners</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.lessonsAvailable}</div>
          <div className="stat-label">Lessons Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.languages}</div>
          <div className="stat-label">Languages</div>
        </div>
      </div>
      
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Today's Lessons</h2>
          <p>Learn step by step with NoteKaka</p>
        </div>
        
        <div className="lessons-grid">
          {todayLessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
      
      
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Learning Modules</h2>
          <p>Explore all learning topics</p>
        </div>
        
        <div className="modules-grid">
          {learningModules.map(module => (
            <Link to={module.path} key={module.id} className="module-card">
              <div className="module-icon">{module.icon}</div>
              <h3 className="module-title">{module.title}</h3>
              <p className="module-description">{module.description}</p>
              <div className="module-action">
                <span className="action-text">Start Learning</span>
                <span className="action-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      
    </div>
  );
}

export default Dashboard;