import { Box, Button, Heading, Text } from '@chakra-ui/react';
// This component displays progress toward the goal of 10 correct verb sentences with detailed statistics
import React from 'react';

const PronounProgressTracker = ({ 
  correctCount,      // Number of correct sentences completed so far
  totalAttempts,     // Total number of sentence attempts made
  streak,            // Current streak of consecutive correct sentences
  isCompleted,       // Boolean indicating if 10 correct sentences achieved
  sessionHistory,    // Array of recent sentence attempts with details
  showProgress,      // Boolean controlling visibility of detailed progress info
  setShowProgress,   // Function to toggle detailed progress visibility
  resetProgress,     // Function to reset all progress and start over
  TARGET_CORRECT     // Target number of correct sentences needed (10)
}) => {

  return (
    // Main container for progress tracking section
    <Box style={{ textAlign: 'left' }}>
      {/* Progress section title - changes based on completion status */}
      <Heading as="h3" size="md">{isCompleted ? 'Drag & Drop Challenge Completed!' : 'Drag & Drop Progress Tracker'}</Heading>
      
      {/* Toggle button to show/hide detailed progress information */}
      <Button 
        onClick={() => setShowProgress(!showProgress)}
        style={{
          backgroundColor: '#f0f0f0',   // Light gray background
          border: '2px solid gray.300',     // Gray border
          padding: '6px 12px',          // Internal spacing
          cursor: 'pointer',            // Show clickable cursor
          borderRadius: '4px',          // Rounded corners
          fontSize: '12px'              // Smaller text size
        }}
        // Add hover effects for better user interaction
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#e0e0e0';
          e.target.style.borderColor = 'gray.400';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#f0f0f0';
          e.target.style.borderColor = 'gray.300';
        }}
      >
        {showProgress ? 'Hide Details' : 'Show Details'}
      </Button>

      {/* Main progress display showing completion percentage */}
      <Box style={{ margin: '10px 0', fontSize: '16px', fontWeight: 'bold' }}>
        Progress: {correctCount}/{TARGET_CORRECT} ({Math.round((correctCount / TARGET_CORRECT) * 100)}%)
      </Box>

      {/* Statistics grid showing key performance metrics */}
      <Box style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '10px',
        margin: '15px 0'
      }}>
        {/* Correct sentences count */}
        <Box sx={{ 
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: 'green.50', 
          borderRadius: '6px',
          border: '1px solid green.500'
        }}>
          <Box sx={{ fontSize: '18px', fontWeight: 'bold', color: 'green.500' }}>
            {correctCount}
          </Box>
          <Box sx={{ fontSize: '12px', color: 'gray.500' }}>Correct</Box>
        </Box>

        {/* Incorrect sentences count */}
        <Box sx={{ 
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: 'red.50', 
          borderRadius: '6px',
          border: '1px solid red.500'
        }}>
          <Box sx={{ fontSize: '18px', fontWeight: 'bold', color: 'red.500' }}>
            {totalAttempts - correctCount}
          </Box>
          <Box sx={{ fontSize: '12px', color: 'gray.500' }}>Incorrect</Box>
        </Box>

        {/* Current streak display */}
        <Box sx={{ 
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: 'orange.50', 
          borderRadius: '6px',
          border: '1px solid #ff9800'
        }}>
          <Box sx={{ fontSize: '18px', fontWeight: 'bold', color: 'orange.500' }}>
            {streak}
          </Box>
          <Box sx={{ fontSize: '12px', color: 'gray.500' }}>Current Streak</Box>
        </Box>

        {/* Overall accuracy percentage */}
        <Box sx={{ 
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: 'blue.50', 
          borderRadius: '6px',
          border: '1px solid blue.500'
        }}>
          <Box sx={{ fontSize: '18px', fontWeight: 'bold', color: 'blue.500' }}>
            {totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0}%
          </Box>
          <Box sx={{ fontSize: '12px', color: 'gray.500' }}>Accuracy</Box>
        </Box>
      </Box>

      {/* Detailed session history - only shown when showProgress is true */}
      {showProgress && sessionHistory.length > 0 && (
        <Box style={{
          backgroundColor: '#fafafa',   // Very light gray background
          padding: '15px',              // Internal spacing
          borderRadius: '6px',          // Rounded corners
          marginTop: '15px',            // Space above history section
          border: '1px solid gray.200'      // Light border
        }}>
          <Heading as="h4" size="sm" style={{ marginBottom: '10px' }}>Recent Attempts:</Heading>
          {/* Display last 5 attempts in reverse chronological order */}
          {sessionHistory.slice(-5).reverse().map((entry, index) => (
            <Box key={index} sx={{
              padding: '8px',                                         // Internal spacing
              marginBottom: '5px',                                    // Space between entries
              backgroundColor: entry.correct ? 'green.50' : 'red.50', // Green for correct, red for incorrect
              borderRadius: '4px',                                    // Rounded corners
              fontSize: '14px',                                       // Smaller text for history
              border: entry.correct ? '1px solid green.500' : '1px solid red.500' // Colored borders
            }}>
              {/* Display sentence with result indicator and timestamp */}
              <strong>"{entry.sentence}"</strong> → {entry.structure} - {entry.timestamp} - 
              <Text as="span" sx={{ 
                fontWeight: 'bold', 
                color: entry.correct ? 'green.500' : 'red.500' 
              }}>
                {entry.correct ? ' ✅ Correct' : ' ❌ Incorrect'}
              </Text>
            </Box>
          ))}
        </Box>
      )}

      {/* Reset progress button to start challenge over */}
      <Button 
        onClick={resetProgress}
        sx={{
          backgroundColor: 'red.500',    // Red background for destructive action
          color: 'white',                // White text for contrast
          border: '2px solid #d32f2f',   // Darker red border
          padding: '8px 16px',           // Internal spacing
          cursor: 'pointer',             // Show clickable cursor
          borderRadius: '4px',           // Rounded corners
          fontSize: '14px',              // Standard text size
          fontWeight: 'bold',            // Bold text for emphasis
          marginTop: '15px'              // Space above button
        }}
        // Add hover effect for better interaction
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#d32f2f';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = 'red.500';
        }}
      >
        🔄 Reset Drag & Drop Progress
      </Button>
    </Box>
  );
};

export default PronounProgressTracker;