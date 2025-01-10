import React from 'react';
import './Header.styles.css';
import MenuDropdown from '../MenuDropdown/MenuDropdown';

const Header = ({ onOpenStats, onOpenSettings, onOpenTutorial }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <img 
            src={`${process.env.PUBLIC_URL}/assets/sol-warz-logo.png`} 
            alt="Sol Warz" 
            className="logo-image"
          />
        </div>
      </div>

      <div className="header-right">
        <button 
          className="stats-button" 
          onClick={onOpenStats}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2"/>
            <path d="M7 12l4-4 4 4 4-4" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Statistics
        </button>
        <button className="connect-wallet">
          Connect Wallet
        </button>
      </div>
    </header>
  );
};

export default Header; 