import React from "react";
import "../styles/components.css";

function SchemeCard({ scheme, onViewDetails }) {
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

  if (!scheme) return null;

  const shortDescription =
    scheme.description?.length > 120
      ? scheme.description.slice(0, 120) + "..."
      : scheme.description;

  const shortBenefit =
    scheme.benefits?.split(".")[0];

  return (
    <div className="scheme-card compact">
      {/* HEADER */}
      <div
        className="scheme-header"
        style={{ backgroundColor: getCategoryColor(scheme.category) }}
      >
        <h3 className="scheme-title">{scheme.name}</h3>
        <div className="scheme-badges">
          <span className="badge category">
            {scheme.category?.toUpperCase()}
          </span>
          {scheme.level && (
            <span className="badge level">
              {scheme.level}
            </span>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="scheme-body">
        <p className="scheme-description">
          {shortDescription}
        </p>

        {shortBenefit && (
          <p className="scheme-benefit">
            <strong>Benefit:</strong> {shortBenefit}
          </p>
        )}

        {/* ACTIONS */}
        <div className="scheme-actions">
          <button 
            className="button button-outline small"
            onClick={() => onViewDetails && onViewDetails(scheme)}
          >
            View Details
          </button>
          <button 
            className="button button-primary small"
            onClick={() => onViewDetails && onViewDetails(scheme)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default SchemeCard;