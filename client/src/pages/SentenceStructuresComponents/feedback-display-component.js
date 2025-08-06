import React from 'react';

const FeedbackDisplay = ({ feedback }) => {
  
  // Only render if there is feedback to display
  if (!feedback) {
    return null; // Return nothing if no feedback
  }

  return (
    <div style={{ 
      border: '1px solid black',  // Black border around feedback area
      padding: '10px',            // Internal spacing for readability
      textAlign: 'left'           // Left-align text for better readability
    }}>
      {/* Display the feedback message */}
      {feedback}
    </div>
  );
};

export default FeedbackDisplay;