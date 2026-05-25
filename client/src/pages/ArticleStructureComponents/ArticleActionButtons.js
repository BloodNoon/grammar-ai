import { Box, Button, Heading, Text } from '@chakra-ui/react';
// This component provides buttons for checking sentences, resetting, and generating new words focused on articles
import React from 'react';

const ArticleActionButtons = ({ 
  checkSentence,                    // Function to check if current sentence has proper article usage
  resetSentenceOnly,                // Function to reset sentence and generate new words
  generateArticleWordSetFromTestCases, // Function to generate new word set focused on articles
  sentenceArea,                     // Array of words currently in the sentence
  isCompleted                       // Boolean indicating if challenge is completed
}) => {

  return (
    // Main container for action buttons with center alignment
    <Box style={{ 
      textAlign: 'center',              // Center all buttons
      padding: '20px',                  // Internal spacing
      backgroundColor: 'white',          // White background
      borderRadius: '8px',              // Rounded corners
      margin: '20px 0',                 // Vertical spacing
      border: '1px solid gray.200'       // Light border for definition
    }}>
      
      {/* Button container with responsive layout */}
      <Box style={{
        display: 'flex',                // Horizontal layout
        justifyContent: 'center',       // Center buttons
        gap: '15px',                    // Space between buttons
        flexWrap: 'wrap',               // Wrap on smaller screens
        alignItems: 'center'            // Vertical alignment
      }}>
        
        {/* Check Sentence Button - Primary action focused on article validation */}
        <Button 
          onClick={checkSentence}
          disabled={sentenceArea.length === 0 || isCompleted} // Disable if no sentence or completed
          sx={{
            backgroundColor: sentenceArea.length === 0 || isCompleted ? 'gray.500' : 'green.500',
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
              e.target.style.backgroundColor = 'green.500'; // Return to original green
              e.target.style.transform = 'translateY(0)'; // Return to original position
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; // Original shadow
            }
          }}
        >
          {/* Button text with icon */}
          ✅ Check Sentence
        </Button>

        {/* Reset & New Words Button - Secondary action */}
        <Button 
          onClick={resetSentenceOnly}
          disabled={isCompleted} // Disable when challenge is completed
          sx={{
            backgroundColor: isCompleted ? 'gray.500' : 'yellow.400',
            color: isCompleted ? 'white' : 'gray.800', // Dark text on yellow background
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
              e.target.style.backgroundColor = 'yellow.400'; // Return to original yellow
              e.target.style.transform = 'translateY(0)'; // Return to original position
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; // Original shadow
            }
          }}
        >
          {/* Button text with icon */}
          🔄 Reset & New Words
        </Button>

        {/* Generate New Words Button - Tertiary action */}
        <Button 
          onClick={generateArticleWordSetFromTestCases}
          disabled={isCompleted} // Disable when challenge is completed
          sx={{
            backgroundColor: isCompleted ? 'gray.500' : 'cyan.500',
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
              e.target.style.backgroundColor = 'cyan.500'; // Return to original teal
              e.target.style.transform = 'translateY(0)'; // Return to original position
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'; // Original shadow
            }
          }}
        >
          {/* Button text with icon */}
          🎲 Generate New Words
        </Button>
      </Box>

      {/* Button descriptions and help text */}
      <Box sx={{
        marginTop: '20px',              // Space above help section
        padding: '15px',                // Internal spacing
        backgroundColor: 'gray.50',     // Light gray background
        borderRadius: '6px',            // Rounded corners
        border: '1px solid gray.200',    // Light border
        textAlign: 'left'               // Left-align help text for readability
      }}>
        <Heading as="h4" size="sm" sx={{ 
          marginBottom: '12px',         // Space below title
          color: 'gray.600',             // Dark gray
          fontSize: '16px',             // Standard title size
          textAlign: 'center'           // Center the title
        }}>
          Button Guide:
        </Heading>
        
        {/* Button descriptions in a grid layout */}
        <Box style={{
          display: 'grid',              // Grid layout for descriptions
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Responsive grid
          gap: '15px',                  // Space between descriptions
          fontSize: '13px',             // Small descriptive text
          lineHeight: '1.4'             // Better line spacing
        }}>
          {/* Check Articles description */}
          <Box style={{
            padding: '10px',            // Internal spacing
            backgroundColor: 'white',   // White background
            borderRadius: '4px',        // Rounded corners
            border: '1px solid green.500' // Green border to match button
          }}>
            <Box sx={{ 
              fontWeight: 'bold', 
              color: 'green.500',
              marginBottom: '5px'
            }}>
              ✅ Check Articles
            </Box>
            <Box sx={{ color: 'gray.500' }}>
              Validates your sentence structure and article usage (a, an, the). Only works when you have words in your sentence.
            </Box>
          </Box>

          {/* Reset & New Words description */}
          <Box style={{
            padding: '10px',            // Internal spacing
            backgroundColor: 'white',   // White background
            borderRadius: '4px',        // Rounded corners
            border: '1px solid yellow.400' // Yellow border to match button
          }}>
            <Box sx={{ 
              fontWeight: 'bold', 
              color: 'yellow.800',
              marginBottom: '5px'
            }}>
              🔄 Reset & New Words
            </Box>
            <Box sx={{ color: 'gray.500' }}>
              Clears your current sentence and generates a fresh set of words with articles to practice with.
            </Box>
          </Box>

          {/* Generate New Words description */}
          <Box style={{
            padding: '10px',            // Internal spacing
            backgroundColor: 'white',   // White background
            borderRadius: '4px',        // Rounded corners
            border: '1px solid cyan.500' // Teal border to match button
          }}>
            <Box sx={{ 
              fontWeight: 'bold', 
              color: 'cyan.500',
              marginBottom: '5px'
            }}>
              🎲 Generate New Words
            </Box>
            <Box sx={{ color: 'gray.500' }}>
              Gets a new random selection of words including articles without clearing your current sentence.
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Current sentence status indicator */}
      {sentenceArea.length > 0 && (
        <Box sx={{
          marginTop: '15px',            // Space above status
          padding: '10px',              // Internal spacing
          backgroundColor: 'green.100',   // Light green background
          color: 'green.800',             // Dark green text
          borderRadius: '6px',          // Rounded corners
          border: '1px solid green.200',  // Green border
          fontSize: '14px',             // Standard text size
          fontWeight: 'bold'            // Bold text for status
        }}>
          📝 Ready to check: "{sentenceArea.map(word => word.text).join(' ')}"
          {sentenceArea.filter(w => w.type === 'Determiner').length > 0 && (
            <Text as="span" sx={{ marginLeft: '10px', color: 'green.500' }}>
              • {sentenceArea.filter(w => w.type === 'Determiner').length} article(s) found
            </Text>
          )}
        </Box>
      )}

      {/* Empty sentence reminder */}
      {sentenceArea.length === 0 && !isCompleted && (
        <Box sx={{
          marginTop: '15px',            // Space above reminder
          padding: '10px',              // Internal spacing
          backgroundColor: 'yellow.100',   // Light yellow background
          color: 'yellow.800',             // Dark yellow text
          borderRadius: '6px',          // Rounded corners
          border: '1px solid #ffeaa7',  // Yellow border
          fontSize: '14px',             // Standard text size
          fontStyle: 'italic'           // Italic for reminder text
        }}>
          💡 Build a sentence first by dragging words from the word bank above. Remember to include articles!
        </Box>
      )}

      {/* Completion status */}
      {isCompleted && (
        <Box sx={{
          marginTop: '15px',            // Space above status
          padding: '15px',              // Internal spacing
          backgroundColor: 'cyan.100',   // Light blue background
          color: 'cyan.800',             // Dark blue text
          borderRadius: '6px',          // Rounded corners
          border: '1px solid #bee5eb',  // Blue border
          fontSize: '14px',             // Standard text size
          fontWeight: 'bold',           // Bold text for completion
          textAlign: 'center'           // Center completion message
        }}>
          🎉 Articles challenge completed! Use the reset button in the progress section to start a new challenge.
        </Box>
      )}

      {/* Keyboard shortcuts info */}
      <Box sx={{
        marginTop: '20px',              // Space above shortcuts
        fontSize: '11px',               // Small font for shortcuts
        color: 'gray.500',               // Gray color
        textAlign: 'center',            // Center shortcuts info
        fontStyle: 'italic',            // Italic styling
        padding: '8px',                 // Internal spacing
        backgroundColor: '#f1f3f4',     // Very light background
        borderRadius: '4px'             // Rounded corners
      }}>
        💡 Pro tip: Focus on proper article usage - 'a' before consonants, 'an' before vowels, 'the' for specific things
      </Box>
    </Box>
  );
};

export default ArticleActionButtons;
