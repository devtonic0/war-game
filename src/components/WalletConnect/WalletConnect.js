import React, { useState } from 'react';
import './WalletConnect.styles.css';

function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleConnect = () => {
    // Implement Solana wallet connection logic here
    setIsConnected(true);
    setBalance(100); // Example balance
  };

  return (
    <div className="wallet-connect">
      {!isConnected ? (
        <button className="connect-button" onClick={handleConnect}>
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <span className="balance">{balance} SOL</span>
          <span className="wallet-address">
            {/* Show truncated wallet address */}
            0x1234...5678
          </span>
        </div>
      )}
    </div>
  );
}

export default WalletConnect; 