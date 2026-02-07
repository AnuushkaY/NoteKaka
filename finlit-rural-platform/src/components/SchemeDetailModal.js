import React, { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/SchemeDetailModal.css";

function SchemeDetailModal({ scheme, onClose }) {
  const { translate } = useContext(LanguageContext);

  const getCategoryColor = (category) => {
    const colors = {
      farmer: "#4CAF50",
      student: "#2196F3",
      women: "#E91E63",
      senior: "#FF9800",
      general: "#9C27B0",
      business: "#3F51B5"
    };
    return colors[category] || "#607D8B";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Header */}
        <div 
          className="modal-header" 
          style={{ backgroundColor: getCategoryColor(scheme.category) }}
        >
          <h2>{scheme.name}</h2>
          <div className="modal-badges">
            <span className="badge category">
              {scheme.category?.toUpperCase()}
            </span>
            {scheme.level && (
              <span className="badge level">{scheme.level}</span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          
          {/* Description */}
          <section className="modal-section">
            <h3>About</h3>
            <p>{scheme.description}</p>
          </section>

          {/* Benefits */}
          {scheme.benefits && (
            <section className="modal-section">
              <h3>Benefits</h3>
              <p>{scheme.benefits}</p>
            </section>
          )}

          {/* Eligibility */}
          {scheme.eligibility && (
            <section className="modal-section">
              <h3>Eligibility</h3>
              {Array.isArray(scheme.eligibility) ? (
                <ul className="eligibility-list">
                  {scheme.eligibility.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{scheme.eligibility}</p>
              )}
            </section>
          )}

          {/* How to Apply */}
          {scheme.application && (
            <section className="modal-section">
              <h3>How to Apply</h3>
              <p>{scheme.application}</p>
            </section>
          )}

          {/* Documents Required */}
          {scheme.documents && (
            <section className="modal-section">
              <h3>Documents Required</h3>
              {Array.isArray(scheme.documents) ? (
                <ul className="documents-list">
                  {scheme.documents.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              ) : (
                <p>{scheme.documents}</p>
              )}
            </section>
          )}

          {/* Contact Info - Show if available */}
          {scheme.contactInfo && (
            <section className="modal-section">
              <h3>Contact Information</h3>
              <p>{scheme.contactInfo}</p>
            </section>
          )}

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="button button-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SchemeDetailModal;
