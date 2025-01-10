import React, { useEffect } from 'react';
import './Header.styles.css';
import WalletConnect from '../WalletConnect/WalletConnect';
import { getAssetPath } from '../../utils/paths';

function Header() {
  const logoPath = getAssetPath('sol-warz-logo.png');
  
  useEffect(() => {
    // Debug image loading
    const img = new Image();
    img.onload = () => console.log('Logo loaded successfully');
    img.onerror = (e) => {
      console.error('Logo load error:', e);
      console.log('Attempted path:', logoPath);
    };
    img.src = logoPath;
  }, [logoPath]);

  return (
    <div className="header">
      <div className="logo">
        <img 
          src={logoPath}
          alt="Sol Warz" 
          className="logo-image"
          onError={(e) => {
            console.error('Logo load error:', e);
            console.log('Attempted path:', logoPath);
          }}
        />
      </div>
      <WalletConnect />
    </div>
  );
}

export default Header; 