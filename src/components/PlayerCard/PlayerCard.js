import React, { useState, useEffect } from 'react';
import './PlayerCard.styles.css';

const PlayerCard = ({ player, card, wallet, cardsRemaining }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (card) {
      setIsFlipping(true);
      setTimeout(() => setIsFlipping(false), 600);
    }
  }, [card]);

  return (
    <div className="card-container">
      <div>
        <h2>Player {player}</h2>
        <div className="wallet-address">{wallet}</div>
      </div>
      <div className="card-space">
        {card && (
          <div className={`card ${isFlipping ? 'flipping' : ''} ${card.suit === '♥' || card.suit === '♦' ? 'red' : 'black'}`}>
            <div className="card-face card-front">
              {card.display}
            </div>
            <div className="card-face card-back" />
          </div>
        )}
      </div>
      <div className="cards-remaining">
        Cards remaining: {cardsRemaining}
      </div>
    </div>
  );
};

export default PlayerCard; 