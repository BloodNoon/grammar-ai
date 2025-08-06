
import React from 'react';

const ActionButtons = ({ 
  checkSentence,                 // Function to check if the constructed sentence is valid
  resetSentenceOnly,             // Function to reset just the sentence (keep progress)
  generateWordSetFromTestCases,  // Function to generate new set of words
  sentenceArea,                  // Array of words currently in the sentence
  isCompleted                    // Whether the user has completed the challenge
}) => {

  return (
    <div style={{ textAlign: 'center' }}> {/* Center-align the action buttons */}
      
      {/* Button to check if the constructed sentence is grammatically correct */}
      <button
        onClick={checkSentence}
        // Disable if no sentence is built or challenge is completed
        disabled={sentenceArea.length === 0 || isCompleted}
        style={{
          // Conditional styling based on disabled state
          backgroundColor: (sentenceArea.length === 0 || isCompleted) ? '#ccc' : '#4CAF50', // Gray if disabled, green if active
          color: 'white',                         // White text
          border: '2px solid #45a049',            // Green border
          padding: '12px 24px',                   // Large padding for prominent button
          margin: '8px',                          // Space between buttons
          cursor: (sentenceArea.length === 0 || isCompleted) ? 'not-allowed' : 'pointer', // Different cursor for disabled
          borderRadius: '4px',                    // Rounded corners
          fontSize: '16px',                       // Large text for main action
          fontWeight: 'bold'                      // Bold text for emphasis
        }}
        // Add hover effect only when button is enabled
        onMouseOver={(e) => {
          if (!(sentenceArea.length === 0 || isCompleted)) {
            e.target.style.backgroundColor = '#45a049'; // Darker green on hover
          }
        }}
        onMouseOut={(e) => {
          if (!(sentenceArea.length === 0 || isCompleted)) {
            e.target.style.backgroundColor = '#4CAF50'; // Return to original green
          }
        }}
      >
        Check Sentence
      </button>
      
      {/* Button to reset the current sentence while keeping progress */}
      <button
        onClick={resetSentenceOnly}
        disabled={isCompleted}                    // Disable when challenge is completed
        style={{
          backgroundColor: isCompleted ? '#ccc' : '#ff9800', // Gray if disabled, orange if active
          color: 'white',                         // White text
          border: '2px solid #f57c00',            // Orange border
          padding: '12px 24px',                   // Large padding
          margin: '8px',                          // Space between buttons
          cursor: isCompleted ? 'not-allowed' : 'pointer', // Different cursor for disabled
          borderRadius: '4px',                    // Rounded corners
          fontSize: '16px',                       // Large text
          fontWeight: 'bold'                      // Bold text
        }}
        // Add hover effect only when button is enabled
        onMouseOver={(e) => {
          if (!isCompleted) {
            e.target.style.backgroundColor = '#f57c00'; // Darker orange on hover
          }
        }}
        onMouseOut={(e) => {
          if (!isCompleted) {
            e.target.style.backgroundColor = '#ff9800'; // Return to original orange
          }
        }}
      >
        Reset Sentence
      </button>

      {/* Button to generate a new set of words for variety */}
      <button
        onClick={generateWordSetFromTestCases}
        disabled={isCompleted}                    // Disable when challenge is completed
        style={{
          backgroundColor: isCompleted ? '#ccc' : '#9C27B0', // Gray if disabled, purple if active
          color: 'white',                         // White text
          border: '2px solid #7B1FA2',            // Purple border
          padding: '12px 24px',                   // Large padding
          margin: '8px',                          // Space between buttons
          cursor: isCompleted ? 'not-allowed' : 'pointer', // Different cursor for disabled
          borderRadius: '4px',                    // Rounded corners
          fontSize: '16px',                       // Large text
          fontWeight: 'bold'                      // Bold text
        }}
        // Add hover effect only when button is enabled
        onMouseOver={(e) => {
          if (!isCompleted) {
            e.target.style.backgroundColor = '#7B1FA2'; // Darker purple on hover
          }
        }}
        onMouseOut={(e) => {
          if (!isCompleted) {
            e.target.style.backgroundColor = '#9C27B0'; // Return to original purple
          }
        }}
      >
        New Words
      </button>
    </div>
  );
};

export default ActionButtons;