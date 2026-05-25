import { Box, Button, Heading, Text } from '@chakra-ui/react';
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
    <Box sx={{ 
      textAlign: 'left',               // Left-align content for better readability
      padding: '20px',                 // Internal spacing
      backgroundColor: 'gray.50',      // Light gray background
      borderRadius: '8px',             // Rounded corners
      margin: '20px 0',                // Vertical spacing
      border: '1px solid gray.200'         // Light border for definition
    }}>
      
      {/* Section title */}
      <Heading as="h3" size="md" sx={{ 
        marginBottom: '15px',          // Space below title
        color: 'gray.700'                  // Dark gray color
      }}>
        Choose an Article Structure to Practice (Optional)
      </Heading>

      {/* Explanation of structure practice */}
      <Text sx={{
        fontSize: '14px',              // Standard descriptive text size
        color: 'gray.500',                 // Gray color for secondary text
        marginBottom: '20px',          // Space below explanation
        lineHeight: '1.4'              // Better line spacing for readability
      }}>
        Select a specific sentence pattern to focus your article practice, or leave unselected for free-form building.
      </Text>
      
      {/* Display structures filtered by current level or show all for advanced */}
      <Box style={{
        display: 'grid',               // Grid layout for structure cards
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', // Responsive grid
        gap: '15px',                   // Space between structure cards
        marginBottom: '20px'           // Space below structure grid
      }}>
        {articleStructureExamples
          .filter(s => s.level === currentLevel || currentLevel === 'advanced') // Filter by level
          .map((structure, index) => (
            <Box key={index} sx={{ 
              border: selectedStructure === structure.pattern ? '2px solid blue.500' : '1px solid gray.300',
              backgroundColor: selectedStructure === structure.pattern ? 'blue.50' : 'white',
              padding: '15px',          // Internal spacing for each structure card
              borderRadius: '8px',      // Rounded corners
              transition: 'all 0.3s ease', // Smooth transition for selection
              cursor: 'pointer'         // Show clickable cursor
            }}
            // Add hover effects for better user interaction
            onMouseOver={(e) => {
              if (selectedStructure !== structure.pattern) {
                e.target.style.backgroundColor = 'gray.50';
                e.target.style.borderColor = 'gray.400';
              }
            }}
            onMouseOut={(e) => {
              if (selectedStructure !== structure.pattern) {
                e.target.style.backgroundColor = 'white';
                e.target.style.borderColor = 'gray.300';
              }
            }}
            onClick={() => selectStructure(structure)} // Select structure when card is clicked
            >
              
              {/* Structure description/title */}
              <Box sx={{ 
                fontWeight: 'bold', 
                fontSize: '16px',
                marginBottom: '8px',
                color: selectedStructure === structure.pattern ? 'blue.500' : 'gray.700'
              }}>
                {structure.description}
              </Box>
              
              {/* Structure pattern syntax */}
              <Box sx={{ 
                fontSize: '14px',
                color: 'gray.500',
                marginBottom: '8px',
                fontFamily: 'monospace',    // Monospace font for pattern syntax
                backgroundColor: 'gray.50',  // Light background for code-like appearance
                padding: '4px 8px',         // Small padding for pattern display
                borderRadius: '4px',        // Rounded corners
                border: '1px solid gray.100' // Light border
              }}>
                <strong>Pattern:</strong> {structure.pattern}
              </Box>
              
              {/* Example sentence showing the pattern in use */}
              <Box style={{ 
                fontSize: '14px',
                fontStyle: 'italic',
                color: '#555',
                marginBottom: '12px'
              }}>
                <strong>Example:</strong> "{structure.example}"
              </Box>
              
              {/* Selection button for each structure */}
              <Button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click when button is clicked
                  selectStructure(structure);
                }}
                style={{
                  // Conditional styling based on whether this structure is selected
                  backgroundColor: selectedStructure === structure.pattern ? 'blue.500' : '#f0f0f0',
                  color: selectedStructure === structure.pattern ? 'white' : 'black',
                  border: '2px solid gray.300',
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
                    e.target.style.borderColor = 'gray.400';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedStructure !== structure.pattern) {
                    e.target.style.backgroundColor = '#f0f0f0';
                    e.target.style.borderColor = 'gray.300';
                  }
                }}
              >
                {/* Button text changes based on selection state */}
                {selectedStructure === structure.pattern ? '✓ Selected' : 'Practice This Pattern'}
              </Button>
            </Box>
          ))}
      </Box>

      {/* Display selected structure information and clear option */}
      {selectedStructure && (
        <Box sx={{ 
          border: '2px solid blue.500',  // Blue border to highlight selected structure
          backgroundColor: 'blue.50',   // Light blue background
          padding: '15px',              // Internal spacing
          borderRadius: '8px',          // Rounded corners
          marginTop: '20px'             // Space above selected structure display
        }}>
          <Box style={{
            display: 'flex',            // Horizontal layout
            justifyContent: 'space-between', // Space between content and button
            alignItems: 'center',       // Vertical alignment
            flexWrap: 'wrap',           // Wrap on smaller screens
            gap: '10px'                 // Space between items when wrapped
          }}>
            {/* Selected structure information */}
            <Box>
              <strong style={{ color: 'blue.500', fontSize: '16px' }}>
                🎯 Target Structure:
              </strong>
              <Box style={{ 
                marginTop: '5px',
                fontFamily: 'monospace',    // Monospace font for pattern
                fontSize: '14px',
                backgroundColor: 'white',   // White background for contrast
                padding: '8px',             // Internal spacing
                borderRadius: '4px',        // Rounded corners
                border: '1px solid blue.500' // Blue border
              }}>
                {selectedStructure}
              </Box>
            </Box>
            
            {/* Clear target structure button */}
            <Button 
              onClick={() => setSelectedStructure('')} // Clear selection when clicked
              style={{
                backgroundColor: 'red.500',  // Red background for clear action
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
                e.target.style.backgroundColor = 'red.500';
              }}
            >
              ✖ Clear Target
            </Button>
          </Box>

          {/* Help text explaining what targeting a structure does */}
          <Box sx={{
            marginTop: '10px',           // Space above help text
            fontSize: '12px',            // Small font for help text
            color: 'gray.500',               // Gray color for secondary text
            fontStyle: 'italic'          // Italic styling
          }}>
            💡 With a target structure selected, you'll only get feedback when your sentence matches this exact pattern.
          </Box>
        </Box>
      )}

      {/* General help text when no structure is selected */}
      {!selectedStructure && (
        <Box sx={{
          backgroundColor: 'orange.50',    // Light orange background
          border: '1px solid #ff9800',   // Orange border
          padding: '12px',               // Internal spacing
          borderRadius: '6px',           // Rounded corners
          fontSize: '14px',              // Standard text size
          color: '#e65100'               // Dark orange text
        }}>
          <strong>💡 Tip:</strong> Without a target structure, you can build any grammatically correct sentence and receive feedback on whatever pattern you create.
        </Box>
      )}
    </Box>
  );
};

export default ArticleStructureSelection;