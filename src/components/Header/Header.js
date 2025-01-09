import React from 'react';
import './Header.styles.css';
import WalletConnect from '../WalletConnect/WalletConnect';

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <h1>Sol Warz</h1>
      </div>
      <WalletConnect />
    </div>
  );
}

export default Header; 