// CompletionCelebration.js - Component that displays celebration message when user completes the challenge
import React from 'react';

const CompletionCelebration = ({ 
  isCompleted,    // Boolean indicating if the challenge is completed
  correctCount,   // Number of correct sentences achieved
  totalAttempts,  // Total number of attempts made
  resetProgress   // Function to start a new challenge
}) => {
  
  // Only render if the challenge is completed
  if (!isCompleted) {
    return null; // Return nothing if challenge is not completed
  }

  return (
    <div style={{ textAlign: 'center' }}> {/* Center-align celebration content */}
      
      {/* Main celebration heading */}
      <h2>CONGRATULATIONS!</h2>
      
      {/* Success message */}
      <p>You've successfully completed 10 correct sentences!</p>
      
      {/* Display final statistics */}
      <p>
        Final Stats: {correctCount} correct out of {totalAttempts} attempts 
        ({Math.round((correctCount / totalAttempts) * 100)}% accuracy)
      </p>
      
      {/* Button to start a new challenge */}
      <button 
        onClick={resetProgress}  // Reset all progress to start over
        style={{
          backgroundColor: '#4CAF50',    // Green background for positive action
          color: 'white',                // White text for contrast
          border: '2px solid #45a049',   // Darker green border
          padding: '12px 24px',          // Large padding for prominent button
          cursor: 'pointer',             // Show clickable cursor
          borderRadius: '4px',           // Rounded corners
          fontSize: '16px',              // Large text size
          fontWeight: 'bold'             // Bold text for emphasis
        }}
        // Add hover effect for better interactivity
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#45a049'; // Darker green on hover
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#4CAF50'; // Return to original green
        }}
      >
        Start New Challenge
      </button>
    </div>
  );
};

export default CompletionCelebration;