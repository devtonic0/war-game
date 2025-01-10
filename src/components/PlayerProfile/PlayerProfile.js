import React from 'react';
import './PlayerProfile.styles.css';

const PlayerProfile = ({ 
  avatar, 
  totalPlays, 
  wins, 
  losses, 
  winStreak, 
  level,
  experience,
  cardsRemaining 
}) => {
  const winRate = totalPlays > 0 ? Math.round((wins / totalPlays) * 100) : 0;
  
  return (
    <div className="player-profile">
      <div className="profile-main">
        <div className="profile-header">
          <div className="avatar-frame" data-streak={winStreak > 2}>
            <img 
              src={avatar || `${process.env.PUBLIC_URL}/assets/avatars/soldier-default.svg`} 
              alt="Player Avatar" 
              className="avatar" 
            />
            <div className="level-badge">
              <span>{level}</span>
            </div>
          </div>
          <div className="player-info">
            <div className="stats-row">
              <div className="win-rate">
                <span className="rate-value">{winRate}%</span>
                <span className="rate-label">Win Rate</span>
              </div>
              <div className="win-loss">
                <span className="stat-value win">{wins}</span>
                <span className="stat-value loss">{losses}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="game-stats">
        <div className="stat-row">
          <div className="stat-pill">
            <span className="stat-value">{totalPlays}</span>
            <span className="stat-label">Plays</span>
          </div>
          <div className="stat-pill highlight">
            <span className="stat-value">{winStreak}</span>
            <span className="stat-label">Streak</span>
          </div>
          <div className="cards-remaining">
            <span className="remaining-value">{cardsRemaining}</span>
            <span className="remaining-label">Cards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile; 