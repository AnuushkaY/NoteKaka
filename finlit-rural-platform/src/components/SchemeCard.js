import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import '../styles/components.css';

function SchemeCard({ scheme }) {
  const { translate } = useContext(LanguageContext);

  const getCategoryColor = (category) => {
    const colors = {
      'farmer': '#4CAF50',
      'student': '#2196F3',
      'women': '#E91E63',
      'senior': '#FF9800',
      'general': '#9C27B0',
      'business': '#3F51B5'
    };
    return colors[category] || '#607D8B';
  };

  const formatEligibility = (eligibility) => {
    if (Array.isArray(eligibility)) {
      return eligibility.slice(0, 3).map(item => `• ${item}`).join('\n');
    }
    return eligibility;
  };

  return (
    <div className="scheme-card">
      <div 
        className="scheme-header"
        style={{ backgroundColor: getCategoryColor(scheme.category) }}
      >
        <h3 className="scheme-title">{scheme.name}</h3>
        <div className="scheme-category">{scheme.category.toUpperCase()}</div>
      </div>
      
      <div className="scheme-body">
        <div className="scheme-description">
          <p>{scheme.description}</p>
        </div>
        
        <div className="scheme-details">
          <div className="detail-item">
            <span className="detail-label">Benefits:</span>
            <span className="detail-value">{scheme.benefits}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Income Limit:</span>
            <span className="detail-value">{scheme.incomeLimit}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Age Limit:</span>
            <span className="detail-value">{scheme.ageLimit}</span>
          </div>
          
          {scheme.website && (
            <div className="detail-item">
              <span className="detail-label">Website:</span>
              <a href={scheme.website} target="_blank" rel="noopener noreferrer" className="detail-link">
                Visit Official Site
              </a>
            </div>
          )}
        </div>
        
        <div className="eligibility-section">
          <h4>Eligibility:</h4>
          <div className="eligibility-list">
            {Array.isArray(scheme.eligibility) ? (
              scheme.eligibility.slice(0, 3).map((item, index) => (
                <div key={index} className="eligibility-item">
                  <span className="bullet">•</span>
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <div className="eligibility-item">
                <span>{scheme.eligibility}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="documents-section">
          <h4>Documents Needed:</h4>
          <div className="documents-list">
            {scheme.documents.slice(0, 5).map((doc, index) => (
              <span key={index} className="document-tag">{doc}</span>
            ))}
            {scheme.documents.length > 5 && (
              <span className="document-tag more">+{scheme.documents.length - 5} more</span>
            )}
          </div>
        </div>
        
        <div className="confidence-meter">
          <div className="confidence-label">
            <span>Should you worry?</span>
            <span className={`confidence-level ${scheme.confidenceLevel}`}>
              {scheme.confidenceLevel === 'high' ? '👍 Easy to Apply' :
               scheme.confidenceLevel === 'medium' ? '🤔 Some Complexity' :
               '⚠️ Needs Help'}
            </span>
          </div>
          <div className="confidence-bar">
            <div 
              className={`confidence-fill ${scheme.confidenceLevel}`}
              style={{ 
                width: scheme.confidenceLevel === 'high' ? '90%' :
                       scheme.confidenceLevel === 'medium' ? '60%' : '30%'
              }}
            ></div>
          </div>
        </div>
        
        <div className="scheme-actions">
          <button className="button button-primary">
            Learn More
          </button>
          <button className="button button-outline">
            Save for Later
          </button>
        </div>
      </div>
    </div>
  );
}

export default SchemeCard;