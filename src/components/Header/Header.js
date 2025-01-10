import React from 'react';
import './Header.styles.css';
import WalletConnect from '../WalletConnect/WalletConnect';
import { getAssetPath } from '../../utils/paths';

function Header() {
  const logoPath = getAssetPath('sol-warz-logo.png');
  
  console.log('Logo path:', logoPath);
  
  return (
    <div className="header">
      <div className="logo">
        <img 
          src={logoPath}
          alt="Sol Warz" 
          className="logo-image"
          onError={(e) => {
            console.log('Logo load error:', e);
          }}
        />
      </div>
      <WalletConnect />
    </div>
  );
}

export default Header; 