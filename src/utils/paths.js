export const getAssetPath = (filename) => {
  // Check if we're in development
  const isDev = process.env.NODE_ENV === 'development';
  
  const path = isDev 
    ? `/assets/${filename}`  // Simplified path for development
    : `/war-game/assets/${filename}`; // Path for production
    
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Generated asset path:', path);
  
  return path;
}; 