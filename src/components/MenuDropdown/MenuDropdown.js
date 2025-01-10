import React, { useState, useRef, useEffect } from 'react';
import './MenuDropdown.styles.css';

const MenuDropdown = ({ onOpenSettings, onOpenTutorial }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const menuItems = [
    { icon: '❔', label: 'Tutorial', onClick: onOpenTutorial },
    { icon: '⚙️', label: 'Settings', onClick: onOpenSettings },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (callback) => {
    setIsOpen(false);
    callback();
  };

  return (
    <div className="menu-container" ref={menuRef}>
      <button 
        className={`menu-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {isOpen && (
        <div className="menu-dropdown">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="menu-item"
              onClick={() => handleItemClick(item.onClick)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuDropdown; 