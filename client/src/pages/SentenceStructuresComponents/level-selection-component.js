import React from 'react';

const LevelSelection = ({ currentLevel, setCurrentLevel }) => {
  
  // Array of available difficulty levels
  const levels = ['beginner', 'intermediate', 'advanced'];

  return (
    <div style={{ textAlign: 'center' }}> {/* Center-align the level selection */}
      <h3>Choose Difficulty Level:</h3>
      
      {/* Map through each level to create selection buttons */}
      {levels.map(level => (
        <button
          key={level}
          onClick={() => setCurrentLevel(level)} // Update current level when clicked
          style={{
            // Conditional styling based on whether this level is currently selected
            backgroundColor: currentLevel === level ? '#4CAF50' : '#f0f0f0', // Green if selected, gray if not
            color: currentLevel === level ? 'white' : 'black',               // White text if selected, black if not
            border: '2px solid #ccc',        // Gray border
            padding: '8px 16px',             // Internal spacing
            margin: '4px',                   // Space between buttons
            cursor: 'pointer',               // Show clickable cursor
            borderRadius: '4px',             // Rounded corners
            fontSize: '14px',                // Standard text size
            fontWeight: currentLevel === level ? 'bold' : 'normal' // Bold if selected
          }}
          // Add hover effects only for non-selected levels
          onMouseOver={(e) => {
            if (currentLevel !== level) {
              e.target.style.backgroundColor = '#e0e0e0'; // Darker gray on hover
              e.target.style.borderColor = '#999';       // Darker border on hover
            }
          }}
          onMouseOut={(e) => {
            if (currentLevel !== level) {
              e.target.style.backgroundColor = '#f0f0f0'; // Return to original gray
              e.target.style.borderColor = '#ccc';       // Return to original border
            }
          }}
        >
          {/* Capitalize first letter of level name for display */}
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default LevelSelection;