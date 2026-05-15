// This component shows available words that users can drag into the sentence building area
import React from 'react';

const PronounWordBank = ({ 
  availableWords,   // Array of word objects with id, text, and type properties
  handleDragStart   // Function called when user starts dragging a word
}) => {

  // Updated color mapping for different grammatical word types including pronoun subtypes
  const getWordTypeColor = (word) => {
    // First check if it's a pronoun and get the subtype for specific coloring
    if (word.type === 'Pronoun' && word.subtype) {
      const pronounColorMap = {
        'Subject': '#F44336',    // Red for subject pronouns
        'Object': '#4CAF50',      // Green for object pronouns
        'Possessive': '#2196F3',   // Blue for possessive pronouns
        'Reflexive': '#FF9800',   // Orange for reflexive pronouns
       
      };
      return pronounColorMap[word.subtype] || '#607D8B';
    }

  };

  // Get lighter background color for word cards
  const getWordTypeBackgroundColor = (word) => {
    // First check if it's a verb and get the subtype for specific background coloring
    if (word.type === 'Pronoun' && word.subtype) {
      const pronounBackgroundMap = {
        'Subject': '#ffebee',    // Light red for subject pronouns
        'Object': '#e8f5e8',      // Light green for object pronouns
        'Possessive': '#e3f2fd',         // Light blue for possessive pronouns
        'Reflexive': '#fff3e0',   // Light orange for reflexive pronouns
        
      };
      return pronounBackgroundMap[word.subtype] || '#eceff1';
    }
    
    
  };

  return (
    // Main container for the word bank section
    <div style={{ 
      textAlign: 'left',                // Left-align content for better organization
      padding: '20px',                  // Internal spacing
      backgroundColor: '#fafafa',       // Very light gray background
      borderRadius: '8px',              // Rounded corners
      margin: '20px 0',                 // Vertical spacing
      border: '2px solid #e0e0e0'       // Light border for definition
    }}>
      
      {/* Word bank title */}
      <h3 style={{ 
        marginBottom: '15px',           // Space below title
        color: '#333',                  // Dark gray color
        textAlign: 'center'             // Center the title
      }}>
         Word Bank
      </h3>

      {/* Instructions for users */}
      <p style={{
        fontSize: '14px',               // Standard descriptive text size
        color: '#666',                  // Gray color for secondary text
        marginBottom: '20px',           // Space below instructions
        textAlign: 'center',            // Center the instructions
        lineHeight: '1.4'               // Better line spacing
      }}>
        Drag and drop pronouns to their correct type. Words are color-coded by grammatical type.
      </p>

      {/* Check if there are words available to display */}
      {availableWords.length === 0 ? (
        // Show message when no words are available
        <div style={{
          textAlign: 'center',          // Center the message
          padding: '40px',              // Large padding for empty state
          fontSize: '16px',             // Standard text size
          color: '#999',                // Light gray for empty state
          fontStyle: 'italic',          // Italic styling
          backgroundColor: '#f9f9f9',   // Very light background
          borderRadius: '6px',          // Rounded corners
          border: '2px dashed #ddd'     // Dashed border for empty state
        }}>
          No words available. Click "Generate New Words" to get started!
        </div>
      ) : (
        // Display grid of available words when words exist
        <div style={{
          display: 'grid',              // Grid layout for organized word display
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', // Responsive grid
          gap: '10px',                  // Space between word cards
          padding: '10px'               // Internal padding for grid container
        }}>
          {/* Map through each available word to create draggable cards */}
          {availableWords.map((word) => (
            <div
              key={word.id}             // Unique key for React rendering
              draggable                 // Make the div draggable
              onDragStart={(e) => {
                e.target.style.cursor = 'grabbing'; // Show grabbing cursor during drag
                handleDragStart(e, word);
              }} // Handle drag start
              style={{
                backgroundColor: getWordTypeBackgroundColor(word),
                border: `2px solid ${getWordTypeColor(word)}`,
                color: getWordTypeColor(word),
                padding: '12px 8px',     // Internal spacing for word cards
                textAlign: 'center',     // Center text within cards
                cursor: 'grab',          // Show grab cursor to indicate draggable
                borderRadius: '6px',     // Rounded corners
                fontSize: '14px',        // Standard readable text size
                fontWeight: 'bold',      // Bold text for better visibility
                minHeight: '70px',       // Slightly increased height for verb subtype labels
                display: 'flex',         // Flex layout for centering
                flexDirection: 'column', // Stack content vertically
                justifyContent: 'center', // Center content vertically
                alignItems: 'center',    // Center content horizontally
                transition: 'all 0.2s ease', // Smooth transition for interactions
                userSelect: 'none'       // Prevent text selection during drag
              }}
              // Add hover effects for better user interaction
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)'; // Slight lift on hover
                e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; // Shadow on hover
                e.target.style.cursor = 'grab'; // Ensure grab cursor
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'; // Return to original position
                e.target.style.boxShadow = 'none'; // Remove shadow
              }}
              onDragEnd={(e) => {
                e.target.style.cursor = 'grab'; // Return to grab cursor after drag
              }}
            >
              {/* Display the word text */}
              <div style={{ 
                fontSize: '16px',        // Larger font for the word itself
                marginBottom: '4px'      // Small space below word
              }}>
                {word.text}
              </div>
              
              {/* Display the grammatical type label - show "Pronoun" for Subject type, verb subtype if available */}
              <div style={{ 
                fontSize: '10px',        // Small font for type label
                opacity: '0.8',          // Slightly transparent for subtle appearance
                textTransform: 'uppercase', // Uppercase for type labels
                letterSpacing: '0.5px'   // Letter spacing for readability
              }}>
                {word.type === 'Subject' ? 'PRONOUN' : 
                 word.type === 'Verb' && word.subtype ? word.subtype : 
                 word.type}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Word count indicator */}
      <div style={{
        textAlign: 'center',            // Center the count
        marginTop: '15px',              // Space above count
        fontSize: '12px',               // Small font for count
        color: '#888',                  // Light gray color
        fontStyle: 'italic'             // Italic styling
      }}>
        {availableWords.length} words available for dragging
      </div>

      {/* Updated legend showing word type colors including verb subtypes */}
      <div style={{
        marginTop: '20px',              // Space above legend
        padding: '15px',                // Internal spacing
        backgroundColor: '#f0f0f0',     // Light gray background
        borderRadius: '6px',            // Rounded corners
        border: '1px solid #ddd'        // Light border
      }}>
        <h4 style={{ 
          marginBottom: '10px',         // Space below legend title
          fontSize: '14px',             // Small title font
          color: '#333',                // Dark color
          textAlign: 'center'           // Center legend title
        }}>
          Word Type Color Guide:
        </h4>
        
        {/* Updated legend showing word type colors including "Pronoun" instead of "Subject" */}
        <div style={{
          display: 'grid',              // Grid layout for legend
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', // Responsive grid
          gap: '8px',                   // Space between legend items
          fontSize: '11px'              // Small font for legend
        }}>
          {/* Create legend items for common word types with "Pronoun" instead of "Subject" */}
          {[
            { type: 'Subject', label: 'Subject', color: '#F44336' },
            { type: 'Object', label: 'Object', color: '#4CAF50' },
            { type: 'Possessive', label: 'Possessive', color: '#2196F3' },
            { type: 'Reflexive', label: 'Reflexive', color: '#FF9800' },
          ].map(({ type, label, color }) => (
            <div key={type} style={{
              display: 'flex',          // Horizontal layout
              alignItems: 'center',     // Vertical alignment
              gap: '5px'                // Space between color and label
            }}>
              {/* Color indicator dot */}
              <div style={{
                width: '12px',          // Small dot size
                height: '12px',         // Square dot
                backgroundColor: color,
                borderRadius: '50%',    // Make it circular
                flexShrink: 0           // Prevent shrinking
              }}></div>
              {/* Type label */}
              <span style={{ color: '#666' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PronounWordBank;