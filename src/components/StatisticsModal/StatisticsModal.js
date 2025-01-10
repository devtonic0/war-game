import React from 'react';
import { Line } from 'react-chartjs-2';
import '../../utils/chartConfig';
import './StatisticsModal.styles.css';

const StatisticsModal = ({ isOpen, onClose, player1Stats, player2Stats }) => {
  if (!isOpen) return null;

  const calculateWinRate = (wins, totalPlays) => {
    return totalPlays > 0 ? Math.round((wins / totalPlays) * 100) : 0;
  };

  // Chart data
  const chartData = {
    labels: ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5'],
    datasets: [
      {
        label: 'Winnings',
        data: [0, 0.5, 0.3, 0.8, 0.4],
        borderColor: 'rgb(245, 175, 25)',
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(245, 175, 25, 0.1)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)'
        }
      }
    }
  };

  return (
    <div className="stats-overlay">
      <div className="stats-modal">
        <div className="stats-header">
          <h2>Game Statistics</h2>
        </div>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="stats-content">
          {/* Player Stats Panel */}
          <div className="player-stats-container">
            <div className="panel-header">
              <h3>Player Statistics</h3>
            </div>
            <div className="player-stats">
              <div className="stats-avatar">
                <img src={player1Stats.avatar} alt="Player 1" />
                <div className="level-indicator">Level {player1Stats.level}</div>
              </div>
              
              <div className="stats-details">
                <h3>Player 1</h3>
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-value">{player1Stats.totalPlays}</span>
                    <span className="stat-label">Total Games</span>
                  </div>
                  <div className="stat-box highlight">
                    <span className="stat-value">
                      {calculateWinRate(player1Stats.wins, player1Stats.totalPlays)}%
                    </span>
                    <span className="stat-label">Win Rate</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">{player1Stats.wins}</span>
                    <span className="stat-label">Wins</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">{player1Stats.losses}</span>
                    <span className="stat-label">Losses</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">{player1Stats.winStreak}</span>
                    <span className="stat-label">Current Streak</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">{player1Stats.experience}</span>
                    <span className="stat-label">XP</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="stats-divider" />

            {/* Player 2 Stats (similar structure) */}
            <div className="player-stats">
              {/* Similar structure to Player 1 stats */}
            </div>
          </div>

          {/* Performance Chart Panel */}
          <div className="performance-chart">
            <div className="panel-header">
              <h3>Performance History</h3>
            </div>
            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Battle History Panel */}
          <div className="battle-history">
            <div className="panel-header">
              <h3>Recent Battles</h3>
              <button className="view-all-button">View All</button>
            </div>
            <div className="match-list">
              {[
                {
                  result: 'win',
                  opponent: 'Player 2',
                  bet: '0.5 SOL',
                  cards: 'A♠ vs K♥',
                  time: '2m ago'
                },
                {
                  result: 'loss',
                  opponent: 'Player 2',
                  bet: '0.3 SOL',
                  cards: 'J♣ vs Q♦',
                  time: '5m ago'
                },
                {
                  result: 'win',
                  opponent: 'Player 2',
                  bet: '0.8 SOL',
                  cards: 'Q♠ vs 10♥',
                  time: '8m ago'
                },
                {
                  result: 'win',
                  opponent: 'Player 2',
                  bet: '0.4 SOL',
                  cards: 'K♣ vs J♥',
                  time: '12m ago'
                }
              ].map((match, index) => (
                <div key={index} className="match-item">
                  <div className={`match-result ${match.result}`}>
                    {match.result === 'win' ? '🏆' : '❌'}
                    <span>{match.result.toUpperCase()}</span>
                  </div>
                  <div className="match-details">
                    <div>vs {match.opponent}</div>
                    <div>{match.cards}</div>
                    <div>{match.time}</div>
                  </div>
                  <div className="match-bet">{match.bet}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsModal; 