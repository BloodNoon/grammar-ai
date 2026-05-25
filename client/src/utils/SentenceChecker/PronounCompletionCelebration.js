import { Box, Button, Heading, Text } from '@chakra-ui/react';
// This component only renders when the drag & drop challenge is completed, showing success message and final stats
import React from 'react';

const PronounCompletionCelebration = ({ 
  isCompleted,    // Boolean indicating if the drag & drop challenge is completed (10 correct sentences)
  correctCount,   // Final number of correct sentences achieved
  totalAttempts,  // Total number of attempts made during the challenge
  resetProgress   // Function to reset progress and start a new challenge
}) => {
  
  // Only render celebration if the challenge is completed
  if (!isCompleted) {
    return null; // Return nothing if challenge is not yet completed
  }

  return (
    // Main celebration container with center alignment and prominent styling
    <Box sx={{ 
      textAlign: 'center',              // Center all celebration content
      backgroundColor: 'green.500',       // Green background to indicate success
      color: 'white',                   // White text for good contrast
      padding: '30px',                  // Generous padding for celebration feel
      borderRadius: '12px',             // Rounded corners for modern appearance
      margin: '20px 0',                 // Vertical spacing around celebration
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Subtle shadow for depth
      border: '3px solid #45a049'       // Darker green border for emphasis
    }}>
      
      {/* Main celebration headline with emojis for visual impact */}
      <Heading as="h2" size="lg" style={{ 
        fontSize: '28px',               // Large font for impact
        marginBottom: '15px',           // Space below headline
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)' // Subtle text shadow for depth
      }}>
        🎉 DRAG & DROP MASTERY ACHIEVED! 🎉
      </Heading>
      
      {/* Success message with achievement details */}
      <Text style={{ 
        fontSize: '18px',               // Large readable font
        marginBottom: '15px',           // Space below message
        lineHeight: '1.4'               // Better line spacing for readability
      }}>
        You've successfully built <strong>{correctCount}</strong> correct pronoun sentences!
      </Text>
      
      {/* Final statistics display with detailed performance metrics */}
      <Text style={{ 
        fontSize: '16px',               // Standard font size for stats
        marginBottom: '25px',           // Space below stats
        backgroundColor: 'rgba(255,255,255,0.2)', // Semi-transparent white background
        padding: '15px',                // Internal spacing for stats box
        borderRadius: '8px',            // Rounded corners for stats container
        lineHeight: '1.5'               // Better line spacing
      }}>
        <strong>Final Performance:</strong><br />
        ✅ Correct Sentences: {correctCount}<br />
        📊 Total Attempts: {totalAttempts}<br />
        🎯 Success Rate: {Math.round((correctCount / totalAttempts) * 100)}% accuracy
      </Text>
      
      {/* Button to start a new challenge */}
      <Button 
        onClick={resetProgress}         // Reset all progress when clicked
        sx={{
          backgroundColor: 'white',     // White background for contrast against green
          color: 'green.500',            // Green text to match theme
          border: '3px solid white',    // White border for button definition
          padding: '15px 30px',         // Large padding for prominent button
          cursor: 'pointer',            // Show clickable cursor
          borderRadius: '8px',          // Rounded corners
          fontSize: '18px',             // Large text for important action
          fontWeight: 'bold',           // Bold text for emphasis
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Subtle shadow for depth
          transition: 'all 0.3s ease'   // Smooth transition for hover effects
        }}
        // Add hover effects for better user interaction
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#f0f0f0'; // Light gray on hover
          e.target.style.transform = 'translateY(-2px)'; // Slight lift effect
          e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)'; // Enhanced shadow
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = 'white'; // Return to white
          e.target.style.transform = 'translateY(0)'; // Return to original position
          e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)'; // Original shadow
        }}
      >
        🚀 Start New Drag & Drop Challenge
      </Button>

      {/* Additional encouraging message */}
      <Box style={{
        marginTop: '20px',              // Space above encouragement
        fontSize: '14px',               // Smaller font for secondary message
        fontStyle: 'italic',            // Italic styling for emphasis
        opacity: '0.9'                  // Slightly transparent for subtle appearance
      }}>
        Ready to master pronouns again? Challenge yourself with new sentences!
      </Box>
    </Box>
  );
};

export default PronounCompletionCelebration;