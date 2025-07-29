// ProgressTracker.js - Component that displays and manages user progress through the sentence building challenge
import React from 'react';

const ProgressTracker = ({ 
  correctCount,        // Number of correct sentences completed
  totalAttempts,       // Total number of attempts made
  streak,              // Current streak of consecutive correct answers
  isCompleted,         // Whether user has completed the challenge (10 correct)
  sessionHistory,      // Array of recent attempts with details
  showProgress,        // Boolean to show/hide detailed progress information
  setShowProgress,     // Function to toggle progress details visibility
  resetProgress,       // Function to reset all progress and start over
  TARGET_CORRECT       // Target number of correct sentences (10)
}) => {

  return (
    <div style={{
      textAlign: 'left'  // Left-align content for better organization
    }}>
      {/* Main progress header with toggle button */}
      <h3>{isCompleted ? 'Challenge Completed!' : 'Progress Tracker'}</h3>
      
      {/* Button to show/hide detailed progress information */}
      <button 
        onClick={() => setShowProgress(!showProgress)}
        style={{
          backgroundColor: '#f0f0f0',   // Light gray background
          border: '2px solid #ccc',     // Gray border
          padding: '6px 12px',          // Internal spacing
          cursor: 'pointer',            // Show clickable cursor
          borderRadius: '4px',          // Rounded corners
          fontSize: '12px'              // Smaller text size
        }}
        // Add hover effects for better interactivity
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#e0e0e0';  // Darker on hover
          e.target.style.borderColor = '#999';        // Darker border on hover
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#f0f0f0';  // Return to original
          e.target.style.borderColor = '#ccc';        // Return to original border
        }}
      >
        {showProgress ? 'Hide Details' : 'Show Details'}
      </button>

      {/* Main progress display showing completion percentage */}
      <div>
        Progress: {correctCount}/{TARGET_CORRECT} ({Math.round((correctCount / TARGET_CORRECT) * 100)}%)
      </div>

      {/* Statistics grid showing key metrics */}
      <div>
        <div>Correct: {correctCount}</div>
        <div>Incorrect: {totalAttempts - correctCount}</div>
        <div>Current Streak: {streak}</div>
        <div>Accuracy: {totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0}%</div>
      </div>

      {/* Detailed session history - only shown when showProgress is true */}
      {showProgress && sessionHistory.length > 0 && (
        <div>
          <h4>Recent Attempts:</h4>
          {/* Show last 5 attempts in reverse chronological order */}
          {sessionHistory.slice(-5).reverse().map((entry, index) => (
            <div key={index}>
              "{entry.sentence}" → {entry.structure} - {entry.timestamp} - {entry.correct ? 'Correct' : 'Incorrect'}
            </div>
          ))}
        </div>
      )}

      {/* Button to reset all progress and start over */}
      <button 
        onClick={resetProgress}
        style={{
          backgroundColor: '#f44336',    // Red background for destructive action
          color: 'white',                // White text
          border: '2px solid #d32f2f',   // Darker red border
          padding: '8px 16px',           // Internal spacing
          cursor: 'pointer',             // Show clickable cursor
          borderRadius: '4px',           // Rounded corners
          fontSize: '14px',              // Standard text size
          fontWeight: 'bold'             // Bold text for emphasis
        }}
        // Add hover effect
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#d32f2f';  // Darker red on hover
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#f44336';  // Return to original red
        }}
      >
        Reset Progress
      </button>
    </div>
  );
};

export default ProgressTracker;