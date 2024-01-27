import React from 'react';
import './LoadingSpinner.css'; // Path to your CSS file

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <svg viewBox="0 0 50 50" className="spinner">
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
