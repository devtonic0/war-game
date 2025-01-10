import React, { useState } from 'react';
import './BettingControls.styles.css';

const BettingControls = ({ onBetChange, maxBet = 10 }) => {
  const [betAmount, setBetAmount] = useState(0);
  const quickBets = [0.1, 0.5, 1, 2, 5];

  const handleSliderChange = (e) => {
    const value = parseFloat(e.target.value);
    setBetAmount(value);
    onBetChange(value);
  };

  const handleQuickBet = (amount) => {
    setBetAmount(amount);
    onBetChange(amount);
  };

  return (
    <div className="betting-controls">
      <div className="quick-bets">
        {quickBets.map((amount) => (
          <button
            key={amount}
            className={`quick-bet ${betAmount === amount ? 'active' : ''}`}
            onClick={() => handleQuickBet(amount)}
          >
            {amount} SOL
          </button>
        ))}
      </div>
      
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max={maxBet}
          step="0.1"
          value={betAmount}
          onChange={handleSliderChange}
          className="bet-slider"
        />
        <div className="bet-amount">
          <span>{betAmount} SOL</span>
        </div>
      </div>
    </div>
  );
};

export default BettingControls; 