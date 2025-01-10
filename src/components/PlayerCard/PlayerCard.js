import React from 'react';

const PlayerCard = ({ player, card, wallet, cardsRemaining }) => {
  return (
    <div className="card-container">
      <div>
        <h2>Player {player}</h2>
        <div className="wallet-address">{wallet}</div>
      </div>
      <div className="card-space">
        {card && (
          <div className={`card ${card.suit === '♥' || card.suit === '♦' ? 'red' : 'black'}`}>
            {card.display}
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