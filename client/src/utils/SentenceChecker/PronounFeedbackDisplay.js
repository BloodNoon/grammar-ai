// This component shows feedback to users about their sentence construction attempts
import React from 'react';

const PronounFeedbackDisplay = ({ 
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
    } else if (feedbackText.includes('❌') || feedbackText.includes('doesn\'t match') || feedbackText.includes('needs work')) {
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
        backgroundColor: '#d4edda',   // Light green background
        borderColor: '#c3e6cb',       // Green border
        textColor: '#155724',         // Dark green text
        iconColor: '#28a745'          // Green icon
      },
      error: {
        backgroundColor: '#f8d7da',   // Light red background
        borderColor: '#f5c6cb',       // Red border
        textColor: '#721c24',         // Dark red text
        iconColor: '#dc3545'          // Red icon
      },
      warning: {
        backgroundColor: '#fff3cd',   // Light yellow background
        borderColor: '#ffeaa7',       // Yellow border
        textColor: '#856404',         // Dark yellow text
        iconColor: '#ffc107'          // Yellow icon
      },
      info: {
        backgroundColor: '#d1ecf1',   // Light blue background
        borderColor: '#bee5eb',       // Blue border
        textColor: '#0c5460',         // Dark blue text
        iconColor: '#17a2b8'          // Blue icon
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
    <div style={{
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
      <div style={{
        fontSize: '24px',                 // Large icon size
        marginBottom: '10px',             // Space below icon
        color: styling.iconColor
      }}>
        {feedbackType === 'success' && '🎉'}
        {feedbackType === 'error' && '❌'}
        {feedbackType === 'warning' && '⚠️'}
        {feedbackType === 'info' && 'ℹ️'}
      </div>

      {/* Main feedback content */}
      <div style={{
        fontWeight: feedbackType === 'success' ? 'bold' : 'normal',
        fontSize: feedbackType === 'success' ? '18px' : '16px'
      }}>
        {/* Render each line of feedback */}
        {feedbackLines.map((line, index) => (
          <div key={index} style={{
            marginBottom: index < feedbackLines.length - 1 ? '8px' : '0',
            // Make first line (usually main message) more prominent
            fontWeight: index === 0 ? 'bold' : 'normal',
            fontSize: index === 0 ? '18px' : '16px'
          }}>
            {line}
          </div>
        ))}
      </div>

      {/* Progress indicator for success messages */}
      {feedbackType === 'success' && feedback.includes('/10') && (
        <div style={{
          marginTop: '15px',              // Space above progress
          padding: '10px',                // Internal spacing
          backgroundColor: 'rgba(255,255,255,0.3)', // Semi-transparent white
          borderRadius: '6px',            // Rounded corners
          fontSize: '14px',               // Smaller text for progress
          fontWeight: 'bold'              // Bold for progress info
        }}>
          {/* Extract and display progress information */}
          {feedback.match(/(\d+)\/(\d+)/g) && (
            <div>
              Keep going! You're doing great with pronoun practice! 🚀
            </div>
          )}
        </div>
      )}

      {/* Completion celebration for final success */}
      {feedback.includes('CONGRATULATIONS') && feedback.includes('10 correct') && (
        <div style={{
          marginTop: '15px',              // Space above celebration
          padding: '15px',                // Internal spacing
          backgroundColor: 'rgba(255,255,255,0.4)', // Semi-transparent white
          borderRadius: '8px',            // Rounded corners
          fontSize: '16px',               // Standard text size
          fontWeight: 'bold',             // Bold celebration text
          border: `2px solid ${styling.iconColor}` // Colored border
        }}>
          <div style={{ fontSize: '20px', marginBottom: '8px' }}>🏆</div>
          <div>You've mastered pronouns in sentence building!</div>
          <div style={{ fontSize: '14px', marginTop: '5px', opacity: '0.8' }}>
            Ready for a new challenge?
          </div>
        </div>
      )}

      {/* Action suggestions based on feedback type */}
      {feedbackType === 'error' && (
        <div style={{
          marginTop: '15px',              // Space above suggestions
          padding: '12px',                // Internal spacing
          backgroundColor: 'rgba(255,255,255,0.2)', // Semi-transparent white
          borderRadius: '6px',            // Rounded corners
          fontSize: '14px',               // Smaller text for suggestions
          fontStyle: 'italic'             // Italic for suggestions
        }}>
          💡 Try focusing on when to use the different kinds of pronouns
        </div>
      )}

      {/* Encouragement for warning messages */}
      {feedbackType === 'warning' && (
        <div style={{
          marginTop: '15px',              // Space above encouragement
          padding: '12px',                // Internal spacing
          backgroundColor: 'rgba(255,255,255,0.2)', // Semi-transparent white
          borderRadius: '6px',            // Rounded corners
          fontSize: '14px',               // Smaller text for encouragement
          fontStyle: 'italic'             // Italic for encouragement
        }}>
          📚 Take your time and remember the different kinds of pronouns from the lesson above!
        </div>
      )}

      {/* Dismiss button for long feedback messages */}
      {feedback.length > 100 && (
        <button
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
          ×
        </button>
      )}
    </div>
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

export default PronounFeedbackDisplay;