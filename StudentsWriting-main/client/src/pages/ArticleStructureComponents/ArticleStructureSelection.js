// This component allows users to choose target sentence structures for focused article practice
import React from 'react';

const ArticleStructureSelection = ({ 
  articleStructureExamples, // Array of available sentence structure patterns with examples
  currentLevel,          // Current difficulty level (affects which structures are shown)
  selectedStructure,     // Currently selected structure pattern (if any)
  selectStructure,       // Function to select a structure for targeted practice
  setSelectedStructure   // Function to clear structure selection
}) => {

  return (
    // Main container for structure selection with left alignment for readability
    <div style={{ 
      textAlign: 'left',               // Left-align content for better readability
      padding: '20px',                 // Internal spacing
      backgroundColor: '#f8f9fa',      // Light gray background
      borderRadius: '8px',             // Rounded corners
      margin: '20px 0',                // Vertical spacing
      border: '1px solid #ddd'         // Light border for definition
    }}>
      
      {/* Section title */}
      <h3 style={{ 
        marginBottom: '15px',          // Space below title
        color: '#333'                  // Dark gray color
      }}>
        Choose an Article Structure to Practice (Optional)
      </h3>

      {/* Explanation of structure practice */}
      <p style={{
        fontSize: '14px',              // Standard descriptive text size
        color: '#666',                 // Gray color for secondary text
        marginBottom: '20px',          // Space below explanation
        lineHeight: '1.4'              // Better line spacing for readability
      }}>
        Select a specific sentence pattern to focus your article practice, or leave unselected for free-form building.
      </p>
      
      {/* Display structures filtered by current level or show all for advanced */}
      <div style={{
        display: 'grid',               // Grid layout for structure cards
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', // Responsive grid
        gap: '15px',                   // Space between structure cards
        marginBottom: '20px'           // Space below structure grid
      }}>
        {articleStructureExamples
          .filter(s => s.level === currentLevel || currentLevel === 'advanced') // Filter by level
          .map((structure, index) => (
            <div key={index} style={{ 
              border: selectedStructure === structure.pattern ? '2px solid #2196F3' : '1px solid #ccc',
              backgroundColor: selectedStructure === structure.pattern ? '#e3f2fd' : 'white',
              padding: '15px',          // Internal spacing for each structure card
              borderRadius: '8px',      // Rounded corners
              transition: 'all 0.3s ease', // Smooth transition for selection
              cursor: 'pointer'         // Show clickable cursor
            }}
            // Add hover effects for better user interaction
            onMouseOver={(e) => {
              if (selectedStructure !== structure.pattern) {
                e.target.style.backgroundColor = '#f5f5f5';
                e.target.style.borderColor = '#999';
              }
            }}
            onMouseOut={(e) => {
              if (selectedStructure !== structure.pattern) {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = '#ccc';
              }
            }}
            onClick={() => selectStructure(structure)} // Select structure when card is clicked
            >
              
              {/* Structure description/title */}
              <div style={{ 
                fontWeight: 'bold', 
                fontSize: '16px',
                marginBottom: '8px',
                color: selectedStructure === structure.pattern ? '#2196F3' : '#333'
              }}>
                {structure.description}
              </div>
              
              {/* Structure pattern syntax */}
              <div style={{ 
                fontSize: '14px',
                color: '#666',
                marginBottom: '8px',
                fontFamily: 'monospace',    // Monospace font for pattern syntax
                backgroundColor: '#f8f9fa',  // Light background for code-like appearance
                padding: '4px 8px',         // Small padding for pattern display
                borderRadius: '4px',        // Rounded corners
                border: '1px solid #e9ecef' // Light border
              }}>
                <strong>Pattern:</strong> {structure.pattern}
              </div>
              
              {/* Example sentence showing the pattern in use */}
              <div style={{ 
                fontSize: '14px',
                fontStyle: 'italic',
                color: '#555',
                marginBottom: '12px'
              }}>
                <strong>Example:</strong> "{structure.example}"
              </div>
              
              {/* Selection button for each structure */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click when button is clicked
                  selectStructure(structure);
                }}
                style={{
                  // Conditional styling based on whether this structure is selected
                  backgroundColor: selectedStructure === structure.pattern ? '#2196F3' : '#f0f0f0',
                  color: selectedStructure === structure.pattern ? 'white' : 'black',
                  border: '2px solid #ccc',
                  padding: '8px 16px',      // Internal button spacing
                  cursor: 'pointer',        // Show clickable cursor
                  borderRadius: '4px',      // Rounded corners
                  fontSize: '14px',         // Standard button text size
                  fontWeight: selectedStructure === structure.pattern ? 'bold' : 'normal',
                  width: '100%'             // Full width button within card
                }}
                // Add hover effects only for non-selected structures
                onMouseOver={(e) => {
                  if (selectedStructure !== structure.pattern) {
                    e.target.style.backgroundColor = '#e0e0e0';
                    e.target.style.borderColor = '#999';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedStructure !== structure.pattern) {
                    e.target.style.backgroundColor = '#f0f0f0';
                    e.target.style.borderColor = '#ccc';
                  }
                }}
              >
                {/* Button text changes based on selection state */}
                {selectedStructure === structure.pattern ? '✓ Selected' : 'Practice This Pattern'}
              </button>
            </div>
          ))}
      </div>

      {/* Display selected structure information and clear option */}
      {selectedStructure && (
        <div style={{ 
          border: '2px solid #2196F3',  // Blue border to highlight selected structure
          backgroundColor: '#e3f2fd',   // Light blue background
          padding: '15px',              // Internal spacing
          borderRadius: '8px',          // Rounded corners
          marginTop: '20px'             // Space above selected structure display
        }}>
          <div style={{
            display: 'flex',            // Horizontal layout
            justifyContent: 'space-between', // Space between content and button
            alignItems: 'center',       // Vertical alignment
            flexWrap: 'wrap',           // Wrap on smaller screens
            gap: '10px'                 // Space between items when wrapped
          }}>
            {/* Selected structure information */}
            <div>
              <strong style={{ color: '#2196F3', fontSize: '16px' }}>
                🎯 Target Structure:
              </strong>
              <div style={{ 
                marginTop: '5px',
                fontFamily: 'monospace',    // Monospace font for pattern
                fontSize: '14px',
                backgroundColor: 'white',   // White background for contrast
                padding: '8px',             // Internal spacing
                borderRadius: '4px',        // Rounded corners
                border: '1px solid #2196F3' // Blue border
              }}>
                {selectedStructure}
              </div>
            </div>
            
            {/* Clear target structure button */}
            <button 
              onClick={() => setSelectedStructure('')} // Clear selection when clicked
              style={{
                backgroundColor: '#f44336',  // Red background for clear action
                color: 'white',              // White text for contrast
                border: '2px solid #d32f2f', // Darker red border
                padding: '8px 16px',         // Internal spacing
                cursor: 'pointer',           // Show clickable cursor
                borderRadius: '4px',         // Rounded corners
                fontSize: '14px',            // Standard text size
                fontWeight: 'bold'           // Bold text for emphasis
              }}
              // Add hover effect for clear button
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#d32f2f';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f44336';
              }}
            >
              ✖ Clear Target
            </button>
          </div>

          {/* Help text explaining what targeting a structure does */}
          <div style={{
            marginTop: '10px',           // Space above help text
            fontSize: '12px',            // Small font for help text
            color: '#666',               // Gray color for secondary text
            fontStyle: 'italic'          // Italic styling
          }}>
            💡 With a target structure selected, you'll only get feedback when your sentence matches this exact pattern.
          </div>
        </div>
      )}

      {/* General help text when no structure is selected */}
      {!selectedStructure && (
        <div style={{
          backgroundColor: '#fff3e0',    // Light orange background
          border: '1px solid #ff9800',   // Orange border
          padding: '12px',               // Internal spacing
          borderRadius: '6px',           // Rounded corners
          fontSize: '14px',              // Standard text size
          color: '#e65100'               // Dark orange text
        }}>
          <strong>💡 Tip:</strong> Without a target structure, you can build any grammatically correct sentence and receive feedback on whatever pattern you create.
        </div>
      )}


      
    </div>
  );
};

export default ArticleStructureSelection;