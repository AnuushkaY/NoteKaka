import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { VoiceContext } from '../context/VoiceContext';
import LanguageSelector from './LanguageSelector';
import VoiceToggle from './VoiceToggle';
import '../styles/components.css';

function Header() {
  const location = useLocation();
  const { translate } = useContext(LanguageContext);
  const { isVoiceMode } = useContext(VoiceContext);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/stories', label: 'Stories' },
    { path: '/payments', label: 'Digital Payments' },
    { path: '/schemes', label: 'Government Schemes' },
    { path: '/coach', label: 'AI Coach' },
    { path: '/help', label: 'Help' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">💰</span>
          <h1>NoteKaka</h1>
        </div>
        
        <nav className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {translate(item.label)}
            </Link>
          ))}
        </nav>
        
        <div className="header-actions">
          <LanguageSelector />
          <VoiceToggle />
          {isVoiceMode && (
            <div className="voice-indicator">
              <span className="pulse-dot"></span>
              <span>{translate('Voice Mode')}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;