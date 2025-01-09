import React, { useEffect, useState } from 'react';
import './Dealer.styles.css';

function Dealer({ message }) {
  const [animation, setAnimation] = useState('idle');
  const [dealerMessage, setDealerMessage] = useState("Welcome to Sol Warz! Place your bet and draw cards!");

  useEffect(() => {
    if (message) {
      if (message.includes('wins')) {
        setAnimation('excited');
      } else if (message.includes('War')) {
        setAnimation('surprised');
      } else {
        setAnimation('idle');
      }

      setDealerMessage(getDealerMessage(message));
    }
  }, [message]);

  const getDealerMessage = (gameMessage) => {
    if (gameMessage.includes('Player 1 wins')) {
      return "Player 1 takes the round! The house always remembers...";
    } else if (gameMessage.includes('Player 2 wins')) {
      return "Player 2 claims victory this time! Ready for another round?";
    } else if (gameMessage.includes('War')) {
      return "WAR! This is getting intense! Double stakes!";
    }
    return "Place your bets and may the odds be in your favor!";
  };

  return (
    <div className="dealer-container">
      <div className={`dealer-avatar ${animation}`}>
        <div className="dealer-head">
          <div className="dealer-eyes"></div>
          <div className="dealer-smile"></div>
        </div>
        <div className="dealer-body">
          <div className="dealer-bowtie"></div>
        </div>
      </div>
      <div className="dealer-speech-bubble">
        <p>{dealerMessage}</p>
      </div>
    </div>
  );
}

export default Dealer; 