import { Box, Button } from '@chakra-ui/react';
// This component shows feedback to users about their sentence construction attempts, focusing on article usage
import React from 'react';

const ArticleFeedbackDisplay = ({ 
  feedback // String containing the feedback message to display
}) => {

  // Don't render anything if there's no feedback to show
  if (!feedback) {
    return null;
  }

  // Determine feedback type based on content for appropriate styling
  const getFeedbackType = (feedbackText) => {
    if (feedbackText.includes('✅') || feedbackText.includes('CONGRATULATIONS') || feedbackText.includes('Excellent')) {
      return 'success';
    } else if (feedbackText.includes('❌') || feedbackText.includes('doesn\'t match') || feedbackText.includes('needs better')) {
      return 'error';
    } else if (feedbackText.includes('Please build') || feedbackText.includes('Try again')) {
      return 'warning';
    } else {
      return 'info';
    }
  };

  // Get styling based on feedback type
  const getFeedbackStyling = (type) => {
    const stylingMap = {
      success: {
        backgroundColor: 'green.100',   // Light green background
        borderColor: 'green.200',       // Green border
        textColor: 'green.800',         // Dark green text
        iconColor: 'green.500'          // Green icon
      },
      error: {
        backgroundColor: 'red.100',   // Light red background
        borderColor: 'red.200',       // Red border
        textColor: 'red.800',         // Dark red text
        iconColor: 'red.500'          // Red icon
      },
      warning: {
        backgroundColor: 'yellow.100',   // Light yellow background
        borderColor: '#ffeaa7',       // Yellow border
        textColor: 'yellow.800',         // Dark yellow text
        iconColor: 'yellow.400'          // Yellow icon
      },
      info: {
        backgroundColor: 'cyan.100',   // Light blue background
        borderColor: '#bee5eb',       // Blue border
        textColor: 'cyan.800',         // Dark blue text
        iconColor: 'cyan.500'          // Blue icon
      }
    };
    return stylingMap[type] || stylingMap.info;
  };

  const feedbackType = getFeedbackType(feedback);
  const styling = getFeedbackStyling(feedbackType);

  // Split feedback into lines for better formatting
  const feedbackLines = feedback.split('\n').filter(line => line.trim());

  return (
    // Main feedback container with dynamic styling based on feedback type
    <Box style={{
      padding: '20px',                    // Internal spacing
      marginTop: '20px',                  // Space above feedback
      marginBottom: '20px',               // Space below feedback
      backgroundColor: styling.backgroundColor,
      border: `2px solid ${styling.borderColor}`,
      borderRadius: '8px',                // Rounded corners
      color: styling.textColor,
      fontSize: '16px',                   // Standard readable text size
      lineHeight: '1.5',                  // Better line spacing
      textAlign: 'center',                // Center-align feedback content
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow for depth
      position: 'relative',               // For potential animations
      animation: 'fadeIn 0.5s ease-in'    // Fade in animation
    }}>

      {/* Feedback icon based on type */}
      <Box style={{
        fontSize: '24px',                 // Large icon size
        marginBottom: '10px',             // Space below icon
        color: styling.iconColor
      }}>
        {feedbackType === 'success' && '🎉'}
        {feedbackType === 'error' && '❌'}
        {feedbackType === 'warning' && '⚠️'}
        {feedbackType === 'info' && 'ℹ️'}
      </Box>

      {/* Main feedback content */}
      <Box style={{
        fontWeight: feedbackType === 'success' ? 'bold' : 'normal',
        fontSize: feedbackType === 'success' ? '18px' : '16px'
      }}>
        {/* Render each line of feedback */}
        {feedbackLines.map((line, index) => (
          <Box key={index} style={{
            marginBottom: index < feedbackLines.length - 1 ? '8px' : '0',
            // Make first line (usually main message) more prominent
            fontWeight: index === 0 ? 'bold' : 'normal',
            fontSize: index === 0 ? '18px' : '16px'
          }}>
            {line}
          </Box>
        ))}
      </Box>

      {/* Progress indicator for success messages */}
      {feedbackType === 'success' && feedback.includes('/10') && (
        <Box style={{
          marginTop: '15px',              // Space above progress
          padding: '10px',                // Internal spacing
          backgroundColor: 'rgba(255,255,255,0.3)', // Semi-transparent white
          borderRadius: '6px',            // Rounded corners
          fontSize: '14px',               // Smaller text for progress
          fontWeight: 'bold'              // Bold for progress info
        }}>
          {/* Extract and display progress information */}
          {feedback.match(/(\d+)\/(\d+)/g) && (
            <Box>
              Keep going! You're mastering article usage! 🚀
            </Box>
          )}
        </Box>
      )}

      {/* Completion celebration for final success */}
      {feedback.includes('CONGRATULATIONS') && feedback.includes('10 correct') && (
        <Box style={{
          marginTop: '15px',              // Space above celebration
          padding: '15px',                // Internal spacing
          backgroundColor: 'rgba(255,255,255,0.4)', // Semi-transparent white
          borderRadius: '8px',            // Rounded corners
          fontSize: '16px',               // Standard text size
          fontWeight: 'bold',             // Bold celebration text
          border: `2px solid ${styling.iconColor}` // Colored border
        }}>
          <Box style={{ fontSize: '20px', marginBottom: '8px' }}>🏆</Box>
          <Box>You've mastered article usage!</Box>
          <Box style={{ fontSize: '14px', marginTop: '5px', opacity: '0.8' }}>
            Ready for a new articles challenge?
          </Box>
        </Box>
      )}

      {/* Action suggestions based on feedback type - focused on articles */}
      {feedbackType === 'error' && (
        <Box style={{
          marginTop: '15px',              // Space above suggestions
          padding: '12px',                // Internal spacing
          backgroundColor: 'rgba(255,255,255,0.2)', // Semi-transparent white
          borderRadius: '6px',            // Rounded corners
          fontSize: '14px',               // Smaller text for suggestions
          fontStyle: 'italic'             // Italic for suggestions
        }}>
          💡 Remember: 'a' before consonant sounds, 'an' before vowel sounds, 'the' for specific things
        </Box>
      )}

      {/* Encouragement for warning messages */}
      {feedbackType === 'warning' && (
        <Box style={{
          marginTop: '15px',              // Space above encouragement
          padding: '12px',                // Internal spacing
          backgroundColor: 'rgba(255,255,255,0.2)', // Semi-transparent white
          borderRadius: '6px',            // Rounded corners
          fontSize: '14px',               // Smaller text for encouragement
          fontStyle: 'italic'             // Italic for encouragement
        }}>
          📚 Take your time and remember the article rules from the lesson above!
        </Box>
      )}

      {/* Article-specific tips for info messages */}
      {feedbackType === 'info' && (
        <Box style={{
          marginTop: '15px',              // Space above tips
          padding: '12px',                // Internal spacing
          backgroundColor: 'rgba(255,255,255,0.2)', // Semi-transparent white
          borderRadius: '6px',            // Rounded corners
          fontSize: '14px',               // Smaller text for tips
          fontStyle: 'italic'             // Italic for tips
        }}>
          🎯 Focus on the sound: 'university' starts with 'y' sound (a university), 'umbrella' starts with 'u' sound (an umbrella)
        </Box>
      )}

      {/* Dismiss button for long feedback messages */}
      {feedback.length > 100 && (
        <Button
          onClick={() => {
            // This would need to be passed as a prop if we want dismiss functionality
            // For now, it's just visual
          }}
          style={{
            position: 'absolute',         // Position in corner
            top: '10px',                  // Distance from top
            right: '10px',                // Distance from right
            backgroundColor: 'transparent', // Transparent background
            border: 'none',               // No border
            color: styling.textColor,     // Match text color
            fontSize: '18px',             // Standard close button size
            cursor: 'pointer',            // Show clickable cursor
            padding: '5px',               // Small padding for click area
            borderRadius: '50%',          // Circular button
            width: '30px',                // Fixed width
            height: '30px',               // Fixed height
            display: 'flex',              // Flex for centering
            alignItems: 'center',         // Center vertically
            justifyContent: 'center',     // Center horizontally
            opacity: '0.7',               // Slightly transparent
            transition: 'opacity 0.2s ease' // Smooth opacity transition
          }}
          onMouseOver={(e) => {
            e.target.style.opacity = '1'; // Full opacity on hover
            e.target.style.backgroundColor = 'rgba(255,255,255,0.3)'; // Light background
          }}
          onMouseOut={(e) => {
            e.target.style.opacity = '0.7'; // Return to transparent
            e.target.style.backgroundColor = 'transparent'; // Remove background
          }}
          title="Dismiss feedback"
        >
          x
        </Button>
      )}
    </Box>
  );
};

// Add CSS animation for fade-in effect
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

export default ArticleFeedbackDisplay;