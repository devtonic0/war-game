import React from 'react';
import './Header.styles.css';
import WalletConnect from '../WalletConnect/WalletConnect';

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img 
          src={process.env.PUBLIC_URL + '/assets/sol-warz-logo.png'}
          alt="Sol Warz" 
          className="logo-image"
        />
      </div>
      <WalletConnect />
    </div>
  );
}

export default Header; 