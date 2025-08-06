import React from 'react';

const SentenceBuilder = ({ 
  sentenceArea,        // Array of words currently in the sentence
  removeFromSentence,  // Function to remove a word from the sentence
  handleDragOver,      // Function to handle drag over events (allows dropping)
  handleDrop           // Function to handle drop events (adds word to sentence)
}) => {

  return (
    <div style={{ textAlign: 'left' }}> {/* Left-align for functional clarity */}
      <h3>Build Your Sentence Here</h3>
      
      {/* Main drop zone area where users can drop words */}
      <div 
        onDragOver={handleDragOver}      // Allow dropping by handling drag over
        onDrop={(e) => handleDrop(e)}    // Handle when words are dropped
        style={{
          border: '2px dashed black',    // Dashed border to indicate drop zone
          padding: '20px',               // Generous padding for easy dropping
          minHeight: '80px'              // Minimum height to maintain consistent appearance
        }}
      >
        {/* Conditional rendering based on whether sentence has words */}
        {sentenceArea.length === 0 ? (
          // Show placeholder text when sentence is empty
          <div>Drop words here to build your sentence...</div>
        ) : (
          // Display each word in the sentence as a button with remove option
          sentenceArea.map((word, index) => (
            <span key={`sentence-${word.id}-${index}`}> {/* Unique key for each word */}
              <button
                style={{
                  backgroundColor: '#e8f5e8',     // Light green background to show it's in sentence
                  border: '2px solid #4CAF50',    // Green border
                  padding: '8px 12px',            // Internal spacing
                  margin: '4px',                  // Space between words
                  borderRadius: '4px',            // Rounded corners
                  fontSize: '14px',               // Standard text size
                  fontWeight: 'bold',             // Bold text for emphasis
                  position: 'relative'            // Position relative for absolute positioning of remove button
                }}
              >
                {word.text} {/* Display the word text */}
                
                {/* Remove button positioned absolutely in top-right corner */}
                <button
                  onClick={() => removeFromSentence(index)} // Remove this word from sentence
                  style={{
                    position: 'absolute',         // Position absolutely within parent button
                    top: '-8px',                  // Position above the word button
                    right: '-8px',                // Position to the right of the word button
                    backgroundColor: '#f44336',   // Red background for delete action
                    color: 'white',               // White text
                    border: 'none',               // No border
                    borderRadius: '50%',          // Make it circular
                    width: '20px',                // Fixed width
                    height: '20px',               // Fixed height (same as width for circle)
                    fontSize: '12px',             // Small text size
                    cursor: 'pointer',            // Show clickable cursor
                    fontWeight: 'bold'            // Bold text for visibility
                  }}
                  // Add hover effect for remove button
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#d32f2f'; // Darker red on hover
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f44336'; // Return to original red
                  }}
                >
                  × {/* X symbol for remove */}
                </button>
              </button>
              
              {/* Add space between words, but not after the last word */}
              {index < sentenceArea.length - 1 && <span> </span>}
            </span>
          ))
        )}
      </div>

      {/* Display completed sentence as text preview */}
      {sentenceArea.length > 0 && (
        <div>
          <strong>Your sentence:</strong> "{sentenceArea.map(w => w.text).join(' ')}"
        </div>
      )}
    </div>
  );
};

export default SentenceBuilder;