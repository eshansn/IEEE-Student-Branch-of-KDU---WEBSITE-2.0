import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import './Preloader.css';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [slideUp, setSlideUp] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can adjust this or connect to actual loading events)
    const timer = setTimeout(() => {
      setSlideUp(true);
      // Call onLoadingComplete immediately when slide starts
      // This will show the content behind the sliding preloader
      onLoadingComplete();
      
      // Remove preloader after slide-up animation completes
      setTimeout(() => {
        setIsVisible(false);
      }, 800);
    }, 3000); // Show preloader for 3 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <Box className={`preloader ${slideUp ? 'slide-up' : ''}`}>
      <div className="preloader-content">
        <img 
          src="/images/logo/IEEE KDU New logo - Copy.png" 
          alt="IEEE KDU Logo" 
          className="preloader-logo"
        />
        
      </div>
    </Box>
  );
};

export default Preloader;
