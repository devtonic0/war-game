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
import BetSettingsModal from './components/BetSettingsModal/BetSettingsModal';
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
  const [showBetSettings, setShowBetSettings] = useState(false);
  const [customBets, setCustomBets] = useState([0.1, 0.5, 1.0, 2.0]);
  const [deckCount, setDeckCount] = useState(1);
  
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
              Player 1: {player1Wallet}
            </div>
          </div>

          <div className="game-controls">
            <button className="draw-button" onClick={drawCards}>DRAW</button>
            <button className="reset-button" onClick={initializeGame}>New Game</button>
            <div className="bet-controls">
              <div className="bet-amount-wrapper">
                <button 
                  className="bet-button" 
                  onClick={() => setCurrentBet(Math.max(0, currentBet - 0.1))}
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={currentBet}
                  onChange={(e) => setCurrentBet(Number(e.target.value))}
                  min="0"
                  step="0.1"
                  placeholder="0.0"
                />
                <button 
                  className="bet-button" 
                  onClick={() => setCurrentBet(currentBet + 0.1)}
                >
                  +
                </button>
              </div>
              <span className="bet-label">SOL</span>
            </div>
            <div className="quick-bet-options">
              <button 
                className={`quick-bet-button ${currentBet === 0.1 ? 'active' : ''}`} 
                onClick={() => setCurrentBet(0.1)}
              >
                0.1
              </button>
              <button 
                className={`quick-bet-button ${currentBet === 0.5 ? 'active' : ''}`} 
                onClick={() => setCurrentBet(0.5)}
              >
                0.5
              </button>
              <button 
                className={`quick-bet-button ${currentBet === 1.0 ? 'active' : ''}`} 
                onClick={() => setCurrentBet(1.0)}
              >
                1.0
              </button>
              <button 
                className={`quick-bet-button ${currentBet === 2.0 ? 'active' : ''}`} 
                onClick={() => setCurrentBet(2.0)}
              >
                2.0
              </button>
              <svg 
                className="settings-icon" 
                onClick={() => setShowBetSettings(true)} 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <div className="deck-options">
              <button className={`deck-button ${deckCount === 1 ? 'active' : ''}`} onClick={() => setDeckCount(1)}>1 Deck</button>
              <button className={`deck-button ${deckCount === 2 ? 'active' : ''}`} onClick={() => setDeckCount(2)}>2 Decks</button>
              <button className={`deck-button ${deckCount === 3 ? 'active' : ''}`} onClick={() => setDeckCount(3)}>3 Decks</button>
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
              Player 2: {player2Wallet}
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
      <BetSettingsModal 
        isOpen={showBetSettings}
        onClose={() => setShowBetSettings(false)}
        onSave={(newBets) => {
          setCustomBets(newBets);
          setShowBetSettings(false);
        }}
      />
    </div>
  );
}

export default App;
