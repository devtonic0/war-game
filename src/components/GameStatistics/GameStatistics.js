import React from 'react';

const GameStatistics = ({ player1Score, player2Score, totalWinnings }) => {
  return (
    <div className="game-statistics">
      <div className="statistics-header">
        <h3>Game Statistics</h3>
        <div className="total-winnings">
          <span>{totalWinnings}</span>
          <span>SOL</span>
        </div>
      </div>
      <div className="player-stats">
        <div className="stat-row">
          <span>Player 1</span>
          <span>{player1Score}</span>
          <div className="progress-bar" style={{ width: `${(player1Score / 52) * 100}%` }} />
        </div>
        <div className="stat-row">
          <span>Player 2</span>
          <span>{player2Score}</span>
          <div className="progress-bar" style={{ width: `${(player2Score / 52) * 100}%` }} />
        </div>
      </div>
    </div>
  );
};

export default GameStatistics; 