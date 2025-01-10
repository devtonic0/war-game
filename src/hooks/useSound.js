import { useCallback } from 'react';

const sounds = {
  card: new Audio('/sounds/card-flip.mp3'),
  win: new Audio('/sounds/win.mp3'),
  click: new Audio('/sounds/click.mp3'),
  bet: new Audio('/sounds/bet.mp3')
};

export const useSound = (isSoundEnabled = true) => {
  const playSound = useCallback((soundName) => {
    if (isSoundEnabled && sounds[soundName]) {
      sounds[soundName].currentTime = 0;
      sounds[soundName].play().catch(error => {
        console.log('Sound play failed:', error);
      });
    }
  }, [isSoundEnabled]);

  return playSound;
}; 