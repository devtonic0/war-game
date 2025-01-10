import React from 'react';
import './BettingShortcuts.styles.css';

const BettingShortcuts = ({ onSetBet }) => {
  const shortcuts = [0.1, 0.5, 1, 2];

  return (
    <div className="betting-shortcuts">
      {shortcuts.map((amount) => (
        <button
          key={amount}
          onClick={() => onSetBet(amount)}
          className="shortcut-btn"
        >
          {amount} SOL
        </button>
      ))}
    </div>
  );
};

export default BettingShortcuts; 