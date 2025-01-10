export const getAssetPath = (filename) => {
  const isDev = process.env.NODE_ENV === 'development';
  const basePath = window.location.pathname.includes('/war-game') ? '/war-game' : '';
  
  // Handle both development and production (GitHub Pages) paths
  const path = `${basePath}/assets/${filename}`;
    
  return path;
}; 