import React from 'react';
import './Scoreboard.styles.css';

function Scoreboard({ totalWinnings, player1Score, player2Score }) {
  return (
    <div className="scoreboard">
      <div className="scoreboard-header">
        <div className="scoreboard-title">Game Statistics</div>
        <div className="total-winnings">
          Total Winnings
          <span className="amount">{totalWinnings} SOL</span>
        </div>
      </div>
      <div className="score-container">
        <div className="player-score">
          <div className="score-label">Player 1</div>
          <div className="score-value">{player1Score}</div>
          <div className="score-bar">
            <div 
              className="score-fill"
              style={{ width: `${(player1Score / 52) * 100}%` }}
            />
          </div>
        </div>
        <div className="player-score">
          <div className="score-label">Player 2</div>
          <div className="score-value">{player2Score}</div>
          <div className="score-bar">
            <div 
              className="score-fill"
              style={{ width: `${(player2Score / 52) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scoreboard; 