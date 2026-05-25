import { Box, Button, Heading, Text } from '@chakra-ui/react';
// This component allows users to choose between beginner, intermediate, and advanced article complexity
import React from 'react';

const ArticleLevelSelection = ({ 
  currentLevel,     // Currently selected difficulty level (beginner/intermediate/advanced)
  setCurrentLevel   // Function to update the selected difficulty level
}) => {
  
  // Array of available difficulty levels with descriptions focused on articles
  const levels = [
    {
      name: 'beginner',
      displayName: 'Beginner',
      description: 'Simple articles with basic nouns',
      color: 'green.500' // Green for beginner
    },
    {
      name: 'intermediate', 
      displayName: 'Intermediate',
      description: 'Articles with adjectives & vowel sounds',
      color: 'orange.500' // Orange for intermediate
    },
    {
      name: 'advanced',
      displayName: 'Advanced', 
      description: 'Complex articles & specific usage',
      color: 'red.500' // Red for advanced
    }
  ];

  return (
    // Main container for level selection with center alignment
    <Box sx={{ 
      textAlign: 'center',              // Center all content
      padding: '20px',                  // Internal spacing
      backgroundColor: 'gray.50',       // Light gray background
      borderRadius: '8px',              // Rounded corners
      margin: '20px 0',                 // Vertical spacing
      border: '1px solid gray.200'          // Light border for definition
    }}>
      
      {/* Section title */}
      <Heading as="h3" size="md" sx={{ 
        marginBottom: '15px',           // Space below title
        color: 'gray.700',                  // Dark gray color
        fontSize: '20px'                // Standard title size
      }}>
        Choose Difficulty Level:
      </Heading>

      {/* Description of what level selection affects */}
      <Text sx={{
        fontSize: '14px',               // Smaller descriptive text
        color: 'gray.500',                  // Gray color for secondary text
        marginBottom: '20px',           // Space below description
        lineHeight: '1.4'               // Better line spacing
      }}>
        Select your skill level to get appropriate article practice and sentence complexity
      </Text>
      
      {/* Level selection buttons container */}
      <Box style={{
        display: 'flex',                // Horizontal layout
        justifyContent: 'center',       // Center the buttons
        gap: '10px',                    // Space between buttons
        flexWrap: 'wrap'                // Wrap buttons on smaller screens
      }}>
        {/* Map through each level to create selection buttons */}
        {levels.map(level => (
          <Box key={level.name} style={{ textAlign: 'center' }}>
            {/* Level selection button */}
            <Button
              onClick={() => setCurrentLevel(level.name)} // Update level when clicked
              style={{
                // Conditional styling based on whether this level is currently selected
                backgroundColor: currentLevel === level.name ? level.color : '#f0f0f0',
                color: currentLevel === level.name ? 'white' : 'black',
                border: `2px solid ${currentLevel === level.name ? level.color : 'gray.300'}`,
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
                  e.target.style.borderColor = 'gray.400';       // Darker border on hover
                  e.target.style.transform = 'translateY(-1px)'; // Slight lift effect
                }
              }}
              onMouseOut={(e) => {
                if (currentLevel !== level.name) {
                  e.target.style.backgroundColor = '#f0f0f0'; // Return to original gray
                  e.target.style.borderColor = 'gray.300';       // Return to original border
                  e.target.style.transform = 'translateY(0)'; // Return to original position
                }
              }}
            >
              {level.displayName}
            </Button>

            {/* Level description displayed below each button */}
            <Box sx={{
              fontSize: '12px',           // Small font for descriptions
              color: 'gray.500',              // Gray color for secondary text
              marginTop: '5px',           // Space above description
              lineHeight: '1.3',          // Compact line spacing
              fontStyle: 'italic'         // Italic styling for descriptions
            }}>
              {level.description}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Current level indicator */}
      <Box style={{
        marginTop: '20px',              // Space above indicator
        padding: '10px',                // Internal spacing
        backgroundColor: currentLevel === 'beginner' ? 'green.50' : 
                         currentLevel === 'intermediate' ? 'orange.50' : 'red.50',
        borderRadius: '6px',            // Rounded corners
        border: `1px solid ${currentLevel === 'beginner' ? 'green.500' : 
                             currentLevel === 'intermediate' ? 'orange.500' : 'red.500'}`,
        fontSize: '14px'                // Standard text size
      }}>
        <strong>Current Level:</strong> {levels.find(l => l.name === currentLevel)?.displayName}
        <br />
        <em>{levels.find(l => l.name === currentLevel)?.description}</em>
      </Box>

      {/* Help text explaining what happens when level changes */}
      <Box style={{
        marginTop: '15px',              // Space above help text
        fontSize: '12px',               // Small font for help text
        color: '#888',                  // Light gray for subtle appearance
        fontStyle: 'italic'             // Italic styling
      }}>
        💡 Changing levels will generate new words and adjust article complexity
      </Box>
    </Box>
  );
};

export default ArticleLevelSelection;