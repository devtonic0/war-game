import React from 'react';
import './CardCounter.styles.css';

const CardCounter = ({ count }) => {
  return (
    <div className="card-counter">
      <div className="counter-ring">
        <svg viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="rgba(255,255,255,0.1)" 
            strokeWidth="5"
          />
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="url(#gradient)" 
            strokeWidth="5"
            strokeDasharray={`${(count/52) * 283} 283`}
            transform="rotate(-90 50 50)"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f12711" />
              <stop offset="100%" stopColor="#f5af19" />
            </linearGradient>
          </defs>
        </svg>
        <div className="counter-content">
          <span className="counter-value">{count}</span>
          <span className="counter-label">CARDS</span>
        </div>
      </div>
    </div>
  );
}; 