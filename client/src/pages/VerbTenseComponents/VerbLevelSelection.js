// This component allows users to choose between beginner, intermediate, and advanced verb complexity
import React from 'react';

const VerbLevelSelection = ({ 
  currentLevel,     // Currently selected difficulty level (beginner/intermediate/advanced)
  setCurrentLevel   // Function to update the selected difficulty level
}) => {
  
  // Array of available difficulty levels with descriptions
  const levels = [
    {
      name: 'beginner',
      displayName: 'Beginner',
      description: 'Simple present/past tenses',
      color: '#4CAF50' // Green for beginner
    },
    {
      name: 'intermediate', 
      displayName: 'Intermediate',
      description: 'Continuous tenses & auxiliaries',
      color: '#ff9800' // Orange for intermediate
    },
    {
      name: 'advanced',
      displayName: 'Advanced', 
      description: 'Perfect tenses & complex structures',
      color: '#f44336' // Red for advanced
    }
  ];

  return (
    // Main container for level selection with center alignment
    <div style={{ 
      textAlign: 'center',              // Center all content
      padding: '20px',                  // Internal spacing
      backgroundColor: '#f8f9fa',       // Light gray background
      borderRadius: '8px',              // Rounded corners
      margin: '20px 0',                 // Vertical spacing
      border: '1px solid #ddd'          // Light border for definition
    }}>
      
      {/* Section title */}
      <h3 style={{ 
        marginBottom: '15px',           // Space below title
        color: '#333',                  // Dark gray color
        fontSize: '20px'                // Standard title size
      }}>
        Choose Difficulty Level:
      </h3>

      {/* Description of what level selection affects */}
      <p style={{
        fontSize: '14px',               // Smaller descriptive text
        color: '#666',                  // Gray color for secondary text
        marginBottom: '20px',           // Space below description
        lineHeight: '1.4'               // Better line spacing
      }}>
        Select your skill level to get appropriate verb tenses and sentence complexity
      </p>
      
      {/* Level selection buttons container */}
      <div style={{
        display: 'flex',                // Horizontal layout
        justifyContent: 'center',       // Center the buttons
        gap: '10px',                    // Space between buttons
        flexWrap: 'wrap'                // Wrap buttons on smaller screens
      }}>
        {/* Map through each level to create selection buttons */}
        {levels.map(level => (
          <div key={level.name} style={{ textAlign: 'center' }}>
            {/* Level selection button */}
            <button
              onClick={() => setCurrentLevel(level.name)} // Update level when clicked
              style={{
                // Conditional styling based on whether this level is currently selected
                backgroundColor: currentLevel === level.name ? level.color : '#f0f0f0',
                color: currentLevel === level.name ? 'white' : 'black',
                border: `2px solid ${currentLevel === level.name ? level.color : '#ccc'}`,
                padding: '12px 20px',       // Internal spacing for comfortable clicking
                margin: '4px',              // Small margin around each button
                cursor: 'pointer',          // Show clickable cursor
                borderRadius: '6px',        // Rounded corners
                fontSize: '16px',           // Standard readable text size
                fontWeight: currentLevel === level.name ? 'bold' : 'normal', // Bold when selected
                minWidth: '120px',          // Minimum width for consistent button sizes
                transition: 'all 0.3s ease' // Smooth transition for hover effects
              }}
              // Add hover effects only for non-selected levels
              onMouseOver={(e) => {
                if (currentLevel !== level.name) {
                  e.target.style.backgroundColor = '#e0e0e0'; // Darker gray on hover
                  e.target.style.borderColor = '#999';       // Darker border on hover
                  e.target.style.transform = 'translateY(-1px)'; // Slight lift effect
                }
              }}
              onMouseOut={(e) => {
                if (currentLevel !== level.name) {
                  e.target.style.backgroundColor = '#f0f0f0'; // Return to original gray
                  e.target.style.borderColor = '#ccc';       // Return to original border
                  e.target.style.transform = 'translateY(0)'; // Return to original position
                }
              }}
            >
              {level.displayName}
            </button>

            {/* Level description displayed below each button */}
            <div style={{
              fontSize: '12px',           // Small font for descriptions
              color: '#666',              // Gray color for secondary text
              marginTop: '5px',           // Space above description
              lineHeight: '1.3',          // Compact line spacing
              fontStyle: 'italic'         // Italic styling for descriptions
            }}>
              {level.description}
            </div>
          </div>
        ))}
      </div>

      {/* Current level indicator */}
      <div style={{
        marginTop: '20px',              // Space above indicator
        padding: '10px',                // Internal spacing
        backgroundColor: currentLevel === 'beginner' ? '#e8f5e8' : 
                         currentLevel === 'intermediate' ? '#fff3e0' : '#ffebee',
        borderRadius: '6px',            // Rounded corners
        border: `1px solid ${currentLevel === 'beginner' ? '#4CAF50' : 
                             currentLevel === 'intermediate' ? '#ff9800' : '#f44336'}`,
        fontSize: '14px'                // Standard text size
      }}>
        <strong>Current Level:</strong> {levels.find(l => l.name === currentLevel)?.displayName}
        <br />
        <em>{levels.find(l => l.name === currentLevel)?.description}</em>
      </div>

      {/* Help text explaining what happens when level changes */}
      <div style={{
        marginTop: '15px',              // Space above help text
        fontSize: '12px',               // Small font for help text
        color: '#888',                  // Light gray for subtle appearance
        fontStyle: 'italic'             // Italic styling
      }}>
        💡 Changing levels will generate new words and adjust sentence complexity
      </div>
    </div>
  );
};

export default VerbLevelSelection;