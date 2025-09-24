import React, { useState, useEffect } from 'react';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight > 0) {
        setScrollProgress((currentProgress / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-1 bg-accent z-50 transition-all duration-150 ease-out"
      style={{
        width: `${scrollProgress}%`,
        backgroundColor: 'var(--accent)'
      }}
    />
  );
}