// This component provides buttons for checking sentences, resetting, and generating new words
import React from 'react';

const PronounActionButton = ({ 
  checkSentence,                    // Function to check if current sentence is correct
  resetSentenceOnly,                // Function to reset sentence and generate new words
  generatePronounSetFromTestCases, // Function to generate new word set
  sentenceArea,                     // Array of words currently in the sentence
  isCompleted                       // Boolean indicating if challenge is completed
}) => {

  return (
    // Main container for action buttons with center alignment
    <div style={{ 
      textAlign: 'center',              // Center all buttons
      padding: '20px',                  // Internal spacing
      backgroundColor: '#fff',          // White background
      borderRadius: '8px',              // Rounded corners
      margin: '20px 0',                 // Vertical spacing
      border: '1px solid #dee2e6'       // Light border for definition
    }}>
      
      {/* Button container with responsive layout */}
      <div style={{
        display: 'flex',                // Horizontal layout
        justifyContent: 'center',       // Center buttons
        gap: '15px',                    // Space between buttons
        flexWrap: 'wrap',               // Wrap on smaller screens
        alignItems: 'center'            // Vertical alignment
      }}>
        
        {/* Check Sentence Button - Primary action */}
        <button 
          onClick={checkSentence}
          disabled={sentenceArea.length === 0 || isCompleted} // Disable if no sentence or completed
          style={{
            backgroundColor: sentenceArea.length === 0 || isCompleted ? '#6c757d' : '#28a745',
            color: 'white',                 // White text for contrast
            border: 'none',                 // No border for clean look
            padding: '15px 25px',           // Large padding for primary button
            cursor: sentenceArea.length === 0 || isCompleted ? 'not-allowed' : 'pointer',
            borderRadius: '8px',            // Rounded corners
            fontSize: '16px',               // Standard readable text
            fontWeight: 'bold',             // Bold text for emphasis
            minWidth: '160px',              // Minimum width for consistency
            transition: 'all 0.3s ease',    // Smooth transitions
            boxShadow: sentenceArea.length === 0 || isCompleted ? 'none' : '0 2px 4px rgba(0,0,0,0.1)',
            textTransform: 'uppercase',     // Uppercase for button importance
            letterSpacing: '0.5px'          // Letter spacing for readability
          }}
          // Add hover effects only for enabled button
          onMouseOver={(e) => {
            if (sentenceArea.length > 0 && !isCompleted) {
              e.target.style.backgroundColor = '#218838'; // Darker green on hover
              e.target.style.transform = 'translateY(-2px)'; // Slight lift
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; // Enhanced shadow
            }
          }}
          onMouseOut={(e) => {
            if (sentenceArea.length > 0 && !isCompleted) {
              e.target.style.backgroundColor = '#28a745'; // Return to original green
              e.target.style.transform = 'translateY(0)'; // Return to original position
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; // Original shadow
            }
          }}
        >
          {/* Button text with icon */}
          ✅ Check Sentence
        </button>

        {/* Reset & New Words Button - Secondary action */}
        <button 
          onClick={resetSentenceOnly}
          disabled={isCompleted} // Disable when challenge is completed
          style={{
            backgroundColor: isCompleted ? '#6c757d' : '#ffc107',
            color: isCompleted ? 'white' : '#212529', // Dark text on yellow background
            border: 'none',                 // No border
            padding: '12px 20px',           // Medium padding for secondary button
            cursor: isCompleted ? 'not-allowed' : 'pointer',
            borderRadius: '8px',            // Rounded corners
            fontSize: '14px',               // Slightly smaller text
            fontWeight: 'bold',             // Bold text
            minWidth: '140px',              // Minimum width for consistency
            transition: 'all 0.3s ease',    // Smooth transitions
            boxShadow: isCompleted ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
          }}
          // Add hover effects only for enabled button
          onMouseOver={(e) => {
            if (!isCompleted) {
              e.target.style.backgroundColor = '#e0a800'; // Darker yellow on hover
              e.target.style.transform = 'translateY(-1px)'; // Slight lift
              e.target.style.boxShadow = '0 3px 6px rgba(0,0,0,0.15)'; // Enhanced shadow
            }
          }}
          onMouseOut={(e) => {
            if (!isCompleted) {
              e.target.style.backgroundColor = '#ffc107'; // Return to original yellow
              e.target.style.transform = 'translateY(0)'; // Return to original position
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; // Original shadow
            }
          }}
        >
          {/* Button text with icon */}
          🔄 Reset & New Words
        </button>

        {/* Generate New Words Button - Tertiary action */}
        <button 
          onClick={generatePronounSetFromTestCases}
          disabled={isCompleted} // Disable when challenge is completed
          style={{
            backgroundColor: isCompleted ? '#6c757d' : '#17a2b8',
            color: 'white',                 // White text for contrast
            border: 'none',                 // No border
            padding: '12px 20px',           // Medium padding
            cursor: isCompleted ? 'not-allowed' : 'pointer',
            borderRadius: '8px',            // Rounded corners
            fontSize: '14px',               // Slightly smaller text
            fontWeight: 'bold',             // Bold text
            minWidth: '140px',              // Minimum width for consistency
            transition: 'all 0.3s ease',    // Smooth transitions
            boxShadow: isCompleted ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
          }}
          // Add hover effects only for enabled button
          onMouseOver={(e) => {
            if (!isCompleted) {
              e.target.style.backgroundColor = '#138496'; // Darker teal on hover
              e.target.style.transform = 'translateY(-1px)'; // Slight lift
              e.target.style.boxShadow = '0 3px 6px rgba(0,0,0,0.15)'; // Enhanced shadow
            }
          }}
          onMouseOut={(e) => {
            if (!isCompleted) {
              e.target.style.backgroundColor = '#17a2b8'; // Return to original teal
              e.target.style.transform = 'translateY(0)'; // Return to original position
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; // Original shadow
            }
          }}
        >
          {/* Button text with icon */}
          🎲 Generate New Words
        </button>
      </div>

      {/* Button descriptions and help text */}
      <div style={{
        marginTop: '20px',              // Space above help section
        padding: '15px',                // Internal spacing
        backgroundColor: '#f8f9fa',     // Light gray background
        borderRadius: '6px',            // Rounded corners
        border: '1px solid #dee2e6',    // Light border
        textAlign: 'left'               // Left-align help text for readability
      }}>
        <h4 style={{ 
          marginBottom: '12px',         // Space below title
          color: '#495057',             // Dark gray
          fontSize: '16px',             // Standard title size
          textAlign: 'center'           // Center the title
        }}>
          Button Guide:
        </h4>
        
        {/* Button descriptions in a grid layout */}
        <div style={{
          display: 'grid',              // Grid layout for descriptions
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Responsive grid
          gap: '15px',                  // Space between descriptions
          fontSize: '13px',             // Small descriptive text
          lineHeight: '1.4'             // Better line spacing
        }}>
          {/* Check Sentence description */}
          <div style={{
            padding: '10px',            // Internal spacing
            backgroundColor: 'white',   // White background
            borderRadius: '4px',        // Rounded corners
            border: '1px solid #28a745' // Green border to match button
          }}>
            <div style={{ 
              fontWeight: 'bold', 
              color: '#28a745',
              marginBottom: '5px'
            }}>
              ✅ Check Sentence
            </div>
            <div style={{ color: '#666' }}>
              Validates your sentence structure. Only works when you have words in your sentence.
            </div>
          </div>

          {/* Reset & New Words description */}
          <div style={{
            padding: '10px',            // Internal spacing
            backgroundColor: 'white',   // White background
            borderRadius: '4px',        // Rounded corners
            border: '1px solid #ffc107' // Yellow border to match button
          }}>
            <div style={{ 
              fontWeight: 'bold', 
              color: '#856404',
              marginBottom: '5px'
            }}>
              🔄 Reset & New Words
            </div>
            <div style={{ color: '#666' }}>
              Clears your current sentence and generates a fresh set of words to practice with.
            </div>
          </div>

          {/* Generate New Words description */}
          <div style={{
            padding: '10px',            // Internal spacing
            backgroundColor: 'white',   // White background
            borderRadius: '4px',        // Rounded corners
            border: '1px solid #17a2b8' // Teal border to match button
          }}>
            <div style={{ 
              fontWeight: 'bold', 
              color: '#17a2b8',
              marginBottom: '5px'
            }}>
              🎲 Generate New Words
            </div>
            <div style={{ color: '#666' }}>
              Gets a new random selection of words without clearing your current sentence.
            </div>
          </div>
        </div>
      </div>

      {/* Current sentence status indicator */}
      {sentenceArea.length > 0 && (
        <div style={{
          marginTop: '15px',            // Space above status
          padding: '10px',              // Internal spacing
          backgroundColor: '#d4edda',   // Light green background
          color: '#155724',             // Dark green text
          borderRadius: '6px',          // Rounded corners
          border: '1px solid #c3e6cb',  // Green border
          fontSize: '14px',             // Standard text size
          fontWeight: 'bold'            // Bold text for status
        }}>
          📝 Ready to check: "{sentenceArea.map(word => word.text).join(' ')}"
        </div>
      )}

      {/* Empty sentence reminder */}
      {sentenceArea.length === 0 && !isCompleted && (
        <div style={{
          marginTop: '15px',            // Space above reminder
          padding: '10px',              // Internal spacing
          backgroundColor: '#fff3cd',   // Light yellow background
          color: '#856404',             // Dark yellow text
          borderRadius: '6px',          // Rounded corners
          border: '1px solid #ffeaa7',  // Yellow border
          fontSize: '14px',             // Standard text size
          fontStyle: 'italic'           // Italic for reminder text
        }}>
          💡 Build a sentence first by dragging words from the word bank above
        </div>
      )}

      {/* Completion status */}
      {isCompleted && (
        <div style={{
          marginTop: '15px',            // Space above status
          padding: '15px',              // Internal spacing
          backgroundColor: '#d1ecf1',   // Light blue background
          color: '#0c5460',             // Dark blue text
          borderRadius: '6px',          // Rounded corners
          border: '1px solid #bee5eb',  // Blue border
          fontSize: '14px',             // Standard text size
          fontWeight: 'bold',           // Bold text for completion
          textAlign: 'center'           // Center completion message
        }}>
          🎉 Challenge completed! Use the reset button in the progress section to start a new challenge.
        </div>
      )}

      {/* Keyboard shortcuts info */}
      <div style={{
        marginTop: '20px',              // Space above shortcuts
        fontSize: '11px',               // Small font for shortcuts
        color: '#6c757d',               // Gray color
        textAlign: 'center',            // Center shortcuts info
        fontStyle: 'italic',            // Italic styling
        padding: '8px',                 // Internal spacing
        backgroundColor: '#f1f3f4',     // Very light background
        borderRadius: '4px'             // Rounded corners
      }}>
        💡 Pro tip: You can also use keyboard shortcuts - Enter to check sentence, Escape to reset
      </div>
    </div>
  );
};

export default PronounActionButton;