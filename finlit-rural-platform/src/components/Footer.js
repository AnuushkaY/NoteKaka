import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import '../styles/components.css';

function Footer() {
  const { translate, currentLanguage } = useContext(LanguageContext);

  const footerLinks = {
    learn: [
      { name: 'Savings Basics', path: '/savings' },
      { name: 'Digital Payments', path: '/payments' },
      { name: 'Bank Accounts', path: '/dashboard' },
      { name: 'Government Schemes', path: '/schemes' }
    ],
    stories: [
      { name: 'Farmer Stories', path: '/stories?type=farmer' },
      { name: 'Shopkeeper Stories', path: '/stories?type=shopkeeper' },
      { name: 'Student Stories', path: '/stories?type=student' },
      { name: 'Success Stories', path: '/stories?type=success' }
    ],
    support: [
      { name: 'AI Coach', path: '/coach' },
      { name: 'Human Help', path: '/help' },
      { name: 'FAQ', path: '/help#faq' },
      { name: 'Contact Us', path: '/help#contact' }
    ]
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{translate('Learn')}</h3>
          <ul>
            {footerLinks.learn.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{translate(link.name)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>{translate('Stories')}</h3>
          <ul>
            {footerLinks.stories.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{translate(link.name)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h3>{translate('Support')}</h3>
          <ul>
            {footerLinks.support.map((link, index) => (
              <li key={index}>
                <Link to={link.path}>{translate(link.name)}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-links">
          <a href="#" className="social-icon" aria-label="Facebook"></a>
          <a href="#" className="social-icon" aria-label="WhatsApp"></a>
          <a href="#" className="social-icon" aria-label="YouTube"></a>
          <a href="#" className="social-icon" aria-label="Instagram"></a>
        </div>
        
        <div className="copyright">
          <p>© {new Date().getFullYear()} NoteKaka. {translate('All rights reserved.')}</p>
          <p className="footer-note">
            Made with for rural India. Available in Hindi, Tamil, Telugu, Bengali, Marathi, and English.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;