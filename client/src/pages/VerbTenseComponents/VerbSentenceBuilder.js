// This component provides the area where users drop words to construct sentences
import React from 'react';

const VerbSentenceBuilder = ({ 
  sentenceArea,        // Array of word objects currently in the sentence
  removeFromSentence,  // Function to remove a word from the sentence by index
  handleDragOver,      // Function to handle drag over events (prevents default)
  handleDrop           // Function to handle drop events when words are dropped
}) => {

  // Color mapping for different grammatical word types (same as WordBank)
  const getWordTypeColor = (type) => {
    const colorMap = {
      'Subject': '#4CAF50',      // Green for subjects
      'Object': '#2196F3',       // Blue for objects
      'Determiner': '#9C27B0',   // Purple for determiners
      'Adjective': '#FF9800',    // Orange for adjectives
      'Noun': '#607D8B',         // Blue-gray for nouns
      'Auxiliary': '#F44336',    // Red for auxiliary verbs
      'PresentVerb': '#8BC34A',  // Light green for present verbs
      'PastVerb': '#4CAF50',     // Green for past verbs
      'Continuous': '#00BCD4',   // Cyan for continuous verbs
      'Perfect': '#009688',      // Teal for perfect verbs
      'Unknown': '#757575'       // Gray for unknown word types
    };
    return colorMap[type] || '#757575';
  };

  // Get lighter background color for word cards in sentence
  const getWordTypeBackgroundColor = (type) => {
    const backgroundMap = {
      'Subject': '#e8f5e8',      // Light green
      'Object': '#e3f2fd',       // Light blue
      'Determiner': '#f3e5f5',   // Light purple
      'Adjective': '#fff3e0',    // Light orange
      'Noun': '#eceff1',         // Light blue-gray
      'Auxiliary': '#ffebee',    // Light red
      'PresentVerb': '#f1f8e9',  // Very light green
      'PastVerb': '#e8f5e8',     // Light green
      'Continuous': '#e0f2f1',   // Light cyan
      'Perfect': '#e0f2f1',      // Light teal
      'Unknown': '#f5f5f5'       // Light gray
    };
    return backgroundMap[type] || '#f5f5f5';
  };

  return (
    // Main container for the sentence building area
    <div style={{ 
      textAlign: 'center',              // Center-align content
      padding: '20px',                  // Internal spacing
      backgroundColor: '#f8f9fa',       // Light background
      borderRadius: '8px',              // Rounded corners
      margin: '20px 0',                 // Vertical spacing
      border: '2px solid #dee2e6'       // Light border
    }}>
      
      {/* Sentence builder title */}
      <h3 style={{ 
        marginBottom: '15px',           // Space below title
        color: '#333'                   // Dark gray color
      }}>
        🏗️ Sentence Builder
      </h3>

      {/* Instructions for sentence building */}
      <p style={{
        fontSize: '14px',               // Standard text size
        color: '#666',                  // Gray color for secondary text
        marginBottom: '20px',           // Space below instructions
        lineHeight: '1.4'               // Better line spacing
      }}>
        Drop words here to build your sentence. Click words to remove them.
      </p>

      {/* Main drop zone area */}
      <div
        onDragOver={handleDragOver}     // Handle drag over to allow dropping
        onDrop={(e) => handleDrop(e)}   // Handle drop events
        style={{
          minHeight: '120px',           // Minimum height for drop zone
          padding: '20px',              // Internal spacing
          backgroundColor: sentenceArea.length === 0 ? '#f8f9fa' : 'white',
          border: sentenceArea.length === 0 ? '3px dashed #ccc' : '2px solid #28a745',
          borderRadius: '8px',          // Rounded corners
          display: 'flex',              // Flex layout for sentence words
          flexWrap: 'wrap',             // Allow words to wrap to new lines
          alignItems: 'center',         // Center words vertically
          justifyContent: sentenceArea.length === 0 ? 'center' : 'flex-start',
          gap: '8px',                   // Space between words
          transition: 'all 0.3s ease', // Smooth transition for border changes
          position: 'relative'          // For positioning drag indicators
        }}
        // Add visual feedback during drag operations
        onDragEnter={(e) => {
          e.preventDefault();
          e.target.style.backgroundColor = '#e8f5e8'; // Light green when dragging over
          e.target.style.borderColor = '#28a745';     // Green border
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          // Only change back if not hovering over a child element
          if (!e.currentTarget.contains(e.relatedTarget)) {
            e.target.style.backgroundColor = sentenceArea.length === 0 ? '#f8f9fa' : 'white';
            e.target.style.borderColor = sentenceArea.length === 0 ? '#ccc' : '#28a745';
          }
        }}
      >
        {/* Show placeholder text when no words are in the sentence */}
        {sentenceArea.length === 0 ? (
          <div style={{
            color: '#999',              // Light gray for placeholder
            fontSize: '18px',           // Large placeholder text
            fontStyle: 'italic',        // Italic styling
            textAlign: 'center',        // Center the placeholder
            width: '100%'               // Full width for centering
          }}>
            Drag words here to build your sentence...
          </div>
        ) : (
          // Display words in the sentence when they exist
          <>
            {sentenceArea.map((word, index) => (
              <React.Fragment key={`${word.id}-${index}`}>
                {/* Word card in the sentence */}
                <div
                  onClick={() => removeFromSentence(index)} // Remove word when clicked
                  style={{
                    backgroundColor: getWordTypeBackgroundColor(word.type),
                    border: `2px solid ${getWordTypeColor(word.type)}`,
                    color: getWordTypeColor(word.type),
                    padding: '10px 12px',   // Internal spacing for sentence words
                    borderRadius: '6px',    // Rounded corners
                    cursor: 'pointer',      // Show clickable cursor
                    fontSize: '16px',       // Standard text size
                    fontWeight: 'bold',     // Bold text for visibility
                    display: 'flex',        // Flex layout for word content
                    flexDirection: 'column', // Stack content vertically
                    alignItems: 'center',   // Center content
                    minWidth: '80px',       // Minimum width for consistency
                    textAlign: 'center',    // Center text
                    transition: 'all 0.2s ease', // Smooth transitions
                    userSelect: 'none',     // Prevent text selection
                    position: 'relative'    // For hover effects
                  }}
                  // Add hover effects for better interaction feedback
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)'; // Slight lift
                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; // Shadow
                    e.target.style.opacity = '0.8'; // Slight transparency to indicate removable
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)'; // Return to original position
                    e.target.style.boxShadow = 'none'; // Remove shadow
                    e.target.style.opacity = '1'; // Return to full opacity
                  }}
                  title={`Click to remove "${word.text}" from sentence`} // Tooltip
                >
                  {/* Word text */}
                  <div style={{ fontSize: '16px' }}>
                    {word.text}
                  </div>
                  
                  {/* Word type label */}
                  <div style={{ 
                    fontSize: '10px',
                    opacity: '0.7',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginTop: '2px'
                  }}>
                    {word.type}
                  </div>

                  {/* Remove indicator on hover */}
                  <div style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    backgroundColor: '#f44336',
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    fontSize: '10px',
                    display: 'none', // Hidden by default
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                  className="remove-indicator">
                    ×
                  </div>
                </div>

                {/* Add space between words (except after last word) */}
                {index < sentenceArea.length - 1 && (
                  <div style={{
                    fontSize: '16px',       // Standard spacing size
                    color: '#999',          // Light gray for spacing
                    userSelect: 'none'      // Prevent selection of spacing
                  }}>
                    {/* Visual space between words */}
                  </div>
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </div>

      {/* Current sentence display */}
      {sentenceArea.length > 0 && (
        <div style={{
          marginTop: '20px',            // Space above sentence display
          padding: '15px',              // Internal spacing
          backgroundColor: '#e9ecef',   // Light gray background
          borderRadius: '6px',          // Rounded corners
          border: '1px solid #dee2e6'   // Light border
        }}>
          <h4 style={{ 
            marginBottom: '10px',       // Space below title
            color: '#495057',           // Dark gray
            fontSize: '16px'            // Standard title size
          }}>
            Current Sentence:
          </h4>
          
          {/* Display the sentence as readable text */}
          <div style={{
            fontSize: '20px',           // Large readable text
            fontWeight: 'bold',         // Bold for emphasis
            color: '#212529',           // Dark text color
            fontFamily: 'serif',        // Serif font for readability
            lineHeight: '1.4',          // Better line spacing
            textAlign: 'center',        // Center the sentence
            padding: '10px',            // Internal spacing
            backgroundColor: 'white',   // White background for contrast
            borderRadius: '4px',        // Rounded corners
            border: '1px solid #ced4da', // Light border
            fontStyle: 'italic'         // Italic for sentence emphasis
          }}>
            "{sentenceArea.map(word => word.text).join(' ')}"
          </div>

          {/* Word count and structure info */}
          <div style={{
            marginTop: '10px',          // Space above info
            fontSize: '12px',           // Small info text
            color: '#6c757d',           // Gray color
            textAlign: 'center',        // Center the info
            fontStyle: 'italic'         // Italic styling
          }}>
            {sentenceArea.length} words • Click any word above to remove it
          </div>
        </div>
      )}

      {/* Help text */}
      <div style={{
        marginTop: '15px',              // Space above help text
        fontSize: '12px',               // Small font for help
        color: '#6c757d',               // Gray color
        textAlign: 'center',            // Center help text
        fontStyle: 'italic'             // Italic styling
      }}>
        💡 Tip: You can also drag words between positions in your sentence
      </div>

      {/* Add CSS for hover effect on remove indicator */}
      <style>{`
        .sentence-word:hover .remove-indicator {
          display: flex !important;
        }
      `}</style>
    </div>
  );
};

export default VerbSentenceBuilder;