// WordBank.js - Component that displays draggable words for sentence construction
import React from 'react';

const WordBank = ({ availableWords, handleDragStart }) => {

  return (
    <div style={{ textAlign: 'left' }}> {/* Left-align for functional clarity */}
      <h3>Word Bank - Drag words to build your sentence</h3>
      
      {/* Container for all draggable word buttons */}
      <div 
        style={{ 
          border: '1px solid black',  // Black border around word bank area
          padding: '10px',            // Internal spacing
          minHeight: '100px'          // Minimum height to maintain consistent appearance
        }}
      >
        {/* Map through each available word to create draggable buttons */}
        {availableWords.map((word) => (
          <button
            key={word.id}                                    // Unique identifier for each word
            draggable                                        // Make the button draggable
            onDragStart={(e) => handleDragStart(e, word)}    // Handle drag start event
            style={{
              backgroundColor: '#f0f0f0',  // Light gray background
              border: '2px solid #ccc',    // Gray border
              padding: '8px 12px',         // Internal spacing for comfortable clicking
              margin: '4px',               // Space between word buttons
              cursor: 'grab',              // Show grab cursor to indicate draggable
              borderRadius: '4px',         // Rounded corners for modern appearance
              fontSize: '14px',            // Standard readable text size
              fontWeight: 'bold'           // Bold text for better visibility
            }}
            // Add hover effects for better user feedback
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#e0e0e0';  // Darker gray on hover
              e.target.style.borderColor = '#999';        // Darker border on hover
              e.target.style.cursor = 'grab';             // Maintain grab cursor
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#f0f0f0';  // Return to original background
              e.target.style.borderColor = '#ccc';        // Return to original border
            }}
            // Tooltip showing word text and grammatical type
            title={`${word.text} (${word.type})`}
          >
            {word.text} {/* Display the actual word */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WordBank;