import React, { useState, useEffect } from 'react';
import './Tutorial.styles.css';

const tutorialSteps = [
  {
    title: "Welcome to Sol Warz!",
    description: "Learn the basics of the game in this quick tutorial.",
    image: "/assets/tutorial/welcome.svg"
  },
  {
    title: "Place Your Bet",
    description: "Start by placing your bet in SOL. Choose your amount wisely!",
    image: "/assets/tutorial/betting.svg"
  },
  {
    title: "Draw Cards",
    description: "Click DRAW to reveal your cards. The higher card wins the round!",
    image: "/assets/tutorial/gameplay.svg"
  },
  {
    title: "Win Conditions",
    description: "Collect all cards to win the game. Watch your stats grow!",
    image: "/assets/tutorial/winning.svg"
  }
];

const Tutorial = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setIsExiting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`tutorial-overlay ${isExiting ? 'exiting' : ''}`}>
      <div className="tutorial-modal">
        <button className="close-button" onClick={handleClose}>×</button>
        
        <div className="tutorial-content">
          <div className="tutorial-image">
            <img src={tutorialSteps[currentStep].image} alt="Tutorial" />
          </div>
          
          <div className="tutorial-text">
            <h2>{tutorialSteps[currentStep].title}</h2>
            <p>{tutorialSteps[currentStep].description}</p>
          </div>
          
          <div className="tutorial-navigation">
            <div className="step-indicators">
              {tutorialSteps.map((_, index) => (
                <div 
                  key={index}
                  className={`step-dot ${index === currentStep ? 'active' : ''}`}
                  onClick={() => setCurrentStep(index)}
                />
              ))}
            </div>
            
            <div className="tutorial-buttons">
              {currentStep > 0 && (
                <button className="prev-button" onClick={handlePrev}>
                  Previous
                </button>
              )}
              <button className="next-button" onClick={handleNext}>
                {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial; 