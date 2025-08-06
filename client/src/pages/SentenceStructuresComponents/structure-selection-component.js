import React from 'react';

const StructureSelection = ({ 
  structureExamples,    // Array of available sentence structure patterns
  currentLevel,         // Current difficulty level (affects which structures are shown)
  selectedStructure,    // Currently selected structure pattern
  selectStructure,      // Function to select a structure for practice
  setSelectedStructure  // Function to clear structure selection
}) => {

  return (
    <div style={{ textAlign: 'left' }}> {/* Left-align for better readability */}
      <h3>Choose a Structure to Practice (Optional)</h3>
      
      {/* Filter and display structures based on current level or show all for advanced */}
      {structureExamples
        .filter(s => s.level === currentLevel || currentLevel === 'advanced')
        .map((structure, index) => (
          <div key={index} style={{ 
            border: '1px solid #ccc',  // Gray border around each structure option
            padding: '10px',           // Internal spacing
            margin: '5px 0'            // Vertical spacing between options
          }}>
            {/* Structure title/description */}
            <div>
              <strong>{structure.description}</strong>
            </div>
            
            {/* Display the pattern syntax */}
            <div>Pattern: {structure.pattern}</div>
            
            {/* Show example sentence */}
            <div>Example: "{structure.example}"</div>
            
            {/* Button to select this structure for practice */}
            <button 
              onClick={() => selectStructure(structure)}
              style={{
                // Conditional styling based on whether this structure is selected
                backgroundColor: selectedStructure === structure.pattern ? '#2196F3' : '#f0f0f0', // Blue if selected
                color: selectedStructure === structure.pattern ? 'white' : 'black',             // White text if selected
                border: '2px solid #ccc',        // Gray border
                padding: '6px 12px',             // Internal spacing
                margin: '5px 0',                 // Vertical margin
                cursor: 'pointer',               // Show clickable cursor
                borderRadius: '4px',             // Rounded corners
                fontSize: '12px',                // Smaller text size
                fontWeight: selectedStructure === structure.pattern ? 'bold' : 'normal' // Bold if selected
              }}
              // Add hover effects only for non-selected structures
              onMouseOver={(e) => {
                if (selectedStructure !== structure.pattern) {
                  e.target.style.backgroundColor = '#e0e0e0'; // Darker gray on hover
                  e.target.style.borderColor = '#999';       // Darker border on hover
                }
              }}
              onMouseOut={(e) => {
                if (selectedStructure !== structure.pattern) {
                  e.target.style.backgroundColor = '#f0f0f0'; // Return to original
                  e.target.style.borderColor = '#ccc';       // Return to original border
                }
              }}
            >
              {/* Button text changes based on selection state */}
              {selectedStructure === structure.pattern ? 'Selected' : 'Practice This'}
            </button>
          </div>
        ))}

      {/* Display selected structure with option to clear */}
      {selectedStructure && (
        <div style={{ 
          border: '2px solid #2196F3', // Blue border to highlight selected structure
          padding: '10px',             // Internal spacing
          margin: '10px 0'             // Vertical spacing
        }}>
          <strong>Target Structure:</strong> {selectedStructure}
          
          {/* Button to clear the selected structure */}
          <button 
            onClick={() => setSelectedStructure('')} // Clear selection
            style={{
              backgroundColor: '#f44336',    // Red background for clear action
              color: 'white',                // White text
              border: '2px solid #d32f2f',   // Darker red border
              padding: '4px 8px',            // Small internal spacing
              marginLeft: '10px',            // Space from the text
              cursor: 'pointer',             // Show clickable cursor
              borderRadius: '4px',           // Rounded corners
              fontSize: '12px',              // Small text size
              fontWeight: 'bold'             // Bold text for emphasis
            }}
            // Add hover effect
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#d32f2f'; // Darker red on hover
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#f44336'; // Return to original red
            }}
          >
            Clear Target
          </button>
        </div>
      )}
    </div>
  );
};

export default StructureSelection;