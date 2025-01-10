import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Dealer from './components/Dealer/Dealer';
import Scoreboard from './components/Scoreboard/Scoreboard';
import BettingControls from './components/BettingControls/BettingControls';
import PlayerProfile from './components/PlayerProfile/PlayerProfile';
import Settings from './components/Settings/Settings';
import StatisticsModal from './components/StatisticsModal/StatisticsModal';
import MenuDropdown from './components/MenuDropdown/MenuDropdown';
import Tutorial from './components/Tutorial/Tutorial';
import './App.css';

function App() {
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);
  const [player1Card, setPlayer1Card] = useState(null);
  const [player2Card, setPlayer2Card] = useState(null);
  const [gameStatus, setGameStatus] = useState('');
  const [currentBet, setCurrentBet] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [roundWinnings, setRoundWinnings] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    sound: true,
    volume: 80,
    animations: true
  });
  const [showStats, setShowStats] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  
  // Mock wallet addresses
  const player1Wallet = "8xzt...3kj9";
  const player2Wallet = "2yfm...9p4r";

  // Create and shuffle deck
  const initializeGame = () => {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];

    // Create deck
    for (let suit of suits) {
      for (let value of values) {
        deck.push({
          suit,
          value,
          numValue: values.indexOf(value),
          display: `${value}${suit}`
        });
      }
    }

    // Shuffle deck
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    // Deal cards
    setPlayer1Deck(deck.slice(0, 26));
    setPlayer2Deck(deck.slice(26, 52));
    setPlayer1Card(null);
    setPlayer2Card(null);
    setGameStatus('');
  };

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    // Debug image paths
    console.log('Base URL:', window.location.origin);
    console.log('Pathname:', window.location.pathname);
    console.log('Public URL:', process.env.PUBLIC_URL);
    console.log('Full dealer path:', `${process.env.PUBLIC_URL}/assets/dealer-robot.png`);
  }, []);

  const handleRoundEnd = (winner, winAmount) => {
    setRoundWinnings(winAmount);
    setShowResult(true);
    setTimeout(() => setShowResult(false), 2000);
  };

  const drawCards = () => {
    if (player1Deck.length === 0 || player2Deck.length === 0) {
      setGameStatus(player1Deck.length === 0 ? 'Player 2 Wins!' : 'Player 1 Wins!');
      return;
    }

    const p1Card = player1Deck[0];
    const p2Card = player2Deck[0];
    const remainingP1Deck = player1Deck.slice(1);
    const remainingP2Deck = player2Deck.slice(1);

    setPlayer1Card(p1Card);
    setPlayer2Card(p2Card);

    if (p1Card.numValue > p2Card.numValue) {
      setPlayer1Deck([...remainingP1Deck, p1Card, p2Card]);
      setPlayer2Deck(remainingP2Deck);
      setGameStatus('Player 1 wins this round!');
      handleRoundEnd(1, currentBet);
      updatePlayerStats(1);
    } else if (p2Card.numValue > p1Card.numValue) {
      setPlayer2Deck([...remainingP2Deck, p1Card, p2Card]);
      setPlayer1Deck(remainingP1Deck);
      setGameStatus('Player 2 wins this round!');
      handleRoundEnd(2, currentBet);
      updatePlayerStats(2);
    } else {
      setPlayer1Deck(remainingP1Deck);
      setPlayer2Deck(remainingP2Deck);
      setGameStatus('War! (Tie - cards discarded)');
    }
  };

  const handleBetChange = (amount) => {
    setCurrentBet(amount);
  };

  const [player1Profile, setPlayer1Profile] = useState({
    username: "Player 1",
    avatar: `${process.env.PUBLIC_URL}/assets/avatars/soldier-orange.svg`,
    totalPlays: 0,
    wins: 0,
    losses: 0,
    winStreak: 0,
    level: 1,
    experience: 0
  });

  const [player2Profile, setPlayer2Profile] = useState({
    username: "Player 2",
    avatar: `${process.env.PUBLIC_URL}/assets/avatars/soldier-blue.svg`,
    totalPlays: 0,
    wins: 0,
    losses: 0,
    winStreak: 0,
    level: 1,
    experience: 0
  });

  const updatePlayerStats = (winner) => {
    if (winner === 1) {
      setPlayer1Profile(prev => ({
        ...prev,
        totalPlays: prev.totalPlays + 1,
        wins: prev.wins + 1,
        winStreak: prev.winStreak + 1,
        experience: prev.experience + 10,
        level: Math.floor(prev.experience / 100) + 1
      }));
      setPlayer2Profile(prev => ({
        ...prev,
        totalPlays: prev.totalPlays + 1,
        losses: prev.losses + 1,
        winStreak: 0
      }));
    } else if (winner === 2) {
      setPlayer2Profile(prev => ({
        ...prev,
        totalPlays: prev.totalPlays + 1,
        wins: prev.wins + 1,
        winStreak: prev.winStreak + 1,
        experience: prev.experience + 10,
        level: Math.floor(prev.experience / 100) + 1
      }));
      setPlayer1Profile(prev => ({
        ...prev,
        totalPlays: prev.totalPlays + 1,
        losses: prev.losses + 1,
        winStreak: 0
      }));
    }
  };

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="App">
      <Header 
        onOpenStats={() => setShowStats(true)}
        onOpenSettings={() => setShowSettings(true)}
        onOpenTutorial={() => setShowTutorial(true)}
      />
      <main className="main-content">
        <Dealer message={gameStatus} />
        
        <div className="game-container">
          <div className="player-section">
            <PlayerProfile 
              {...player1Profile} 
              cardsRemaining={player1Deck.length}
            />
            <div className="card-space">
              {player1Card && (
                <div className={`card ${player1Card.suit === '♥' || player1Card.suit === '♦' ? 'red' : 'black'}`}>
                  {player1Card.display}
                </div>
              )}
            </div>
            <div className="cards-remaining">
              Cards remaining: {player1Deck.length}
            </div>
          </div>

          <div className="game-controls">
            <button className="draw-button" onClick={drawCards}>DRAW</button>
            <button className="reset-button" onClick={initializeGame}>New Game</button>
            <div className="bet-controls">
              <input 
                type="number" 
                value={currentBet}
                onChange={(e) => setCurrentBet(Number(e.target.value))}
                min="0"
                step="0.1"
                placeholder="0.0"
              />
              <span className="bet-label">◎ SOL</span>
            </div>
          </div>

          <div className="player-section">
            <PlayerProfile 
              {...player2Profile}
              cardsRemaining={player2Deck.length}
            />
            <div className="card-space">
              {player2Card && (
                <div className={`card ${player2Card.suit === '♥' || player2Card.suit === '♦' ? 'red' : 'black'}`}>
                  {player2Card.display}
                </div>
              )}
            </div>
            <div className="cards-remaining">
              Cards remaining: {player2Deck.length}
            </div>
          </div>
        </div>

        <Scoreboard 
          totalWinnings={totalWinnings}
          player1Score={player1Deck.length}
          player2Score={player2Deck.length}
        />

        {showResult && (
          <div className="round-result">
            <h3>{gameStatus}</h3>
            <p>Won {roundWinnings} SOL</p>
          </div>
        )}
      </main>
      <BettingControls onBetChange={handleBetChange} maxBet={10} />
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingChange={handleSettingChange}
      />
      <StatisticsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        player1Stats={player1Profile}
        player2Stats={player2Profile}
      />
      <MenuDropdown 
        onOpenStats={() => setShowStats(true)}
        onOpenSettings={() => setShowSettings(true)}
        onOpenTutorial={() => setShowTutorial(true)}
      />
      <Tutorial 
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
      />
    </div>
  );
}

export default App;
