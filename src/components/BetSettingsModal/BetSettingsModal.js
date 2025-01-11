import React, { useState } from 'react';
import './BetSettingsModal.styles.css';

const BetSettingsModal = ({ isOpen, onClose, onSave }) => {
  const [customBets, setCustomBets] = useState([0.1, 0.5, 1.0, 2.0]);

  const handleBetChange = (index, change) => {
    const newBets = [...customBets];
    newBets[index] = Math.max(0.1, (newBets[index] || 0) + change);
    setCustomBets(newBets);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Customize Bet Amounts</h3>
        <div className="bet-inputs">
          {customBets.map((bet, index) => (
            <div key={index} className="bet-input-group">
              <label className="bet-label">BET {index + 1}</label>
              <div className="bet-amount-wrapper">
                <button 
                  className="bet-button" 
                  onClick={() => handleBetChange(index, -0.1)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={bet}
                  onChange={(e) => {
                    const newBets = [...customBets];
                    newBets[index] = parseFloat(e.target.value);
                    setCustomBets(newBets);
                  }}
                  min="0.1"
                  step="0.1"
                />
                <button 
                  className="bet-button" 
                  onClick={() => handleBetChange(index, 0.1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>Cancel</button>
          <button className="save-button" onClick={() => onSave(customBets)}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default BetSettingsModal; 