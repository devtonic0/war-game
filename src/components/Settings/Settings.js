import React, { useState } from 'react';
import './Settings.styles.css';

const Settings = ({ isOpen, onClose, settings, onSettingChange }) => {
  if (!isOpen) return null;

  return (
    <div className="settings-overlay">
      <div className="settings-panel">
        <div className="settings-header">
          <h2>Game Settings</h2>
        </div>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="settings-content">
          <div className="settings-group">
            <h3>Sound</h3>
            <div className="setting-item">
              <label>
                Game Sound
                <input
                  type="checkbox"
                  checked={settings.sound}
                  onChange={(e) => onSettingChange('sound', e.target.checked)}
                />
              </label>
            </div>
            <div className="setting-item">
              <label>
                Sound Volume
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.volume}
                  onChange={(e) => onSettingChange('volume', e.target.value)}
                  disabled={!settings.sound}
                />
              </label>
            </div>
          </div>

          <div className="settings-group">
            <h3>Visual</h3>
            <div className="setting-item">
              <label>
                Animations
                <input
                  type="checkbox"
                  checked={settings.animations}
                  onChange={(e) => onSettingChange('animations', e.target.checked)}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 