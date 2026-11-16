import React from 'react';

/**
 * Reusable StatCard component to display key metrics on the dashboard.
 */
function StatCard({ title, value, subtitle, icon, variant = 'primary', onClick }) {
  return (
    <div 
      className={`stat-card stat-card--${variant} ${onClick ? 'stat-card--clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="stat-card__icon-wrapper">
        <span className="stat-card__icon">{icon}</span>
      </div>
      <div className="stat-card__content">
        <p className="stat-card__title">{title}</p>
        <h3 className="stat-card__value">{value}</h3>
        {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

export default StatCard;
