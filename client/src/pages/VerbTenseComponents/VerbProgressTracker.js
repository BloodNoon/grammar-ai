// This component displays progress toward the goal of 10 correct verb sentences with detailed statistics
import React from 'react';

const VerbProgressTracker = ({ 
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
    <div style={{ textAlign: 'left' }}>
      {/* Progress section title - changes based on completion status */}
      <h3>{isCompleted ? 'Drag & Drop Challenge Completed!' : 'Drag & Drop Progress Tracker'}</h3>
      
      {/* Toggle button to show/hide detailed progress information */}
      <button 
        onClick={() => setShowProgress(!showProgress)}
        style={{
          backgroundColor: '#f0f0f0',   // Light gray background
          border: '2px solid #ccc',     // Gray border
          padding: '6px 12px',          // Internal spacing
          cursor: 'pointer',            // Show clickable cursor
          borderRadius: '4px',          // Rounded corners
          fontSize: '12px'              // Smaller text size
        }}
        // Add hover effects for better user interaction
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#e0e0e0';
          e.target.style.borderColor = '#999';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#f0f0f0';
          e.target.style.borderColor = '#ccc';
        }}
      >
        {showProgress ? 'Hide Details' : 'Show Details'}
      </button>

      {/* Main progress display showing completion percentage */}
      <div style={{ margin: '10px 0', fontSize: '16px', fontWeight: 'bold' }}>
        Progress: {correctCount}/{TARGET_CORRECT} ({Math.round((correctCount / TARGET_CORRECT) * 100)}%)
      </div>

      {/* Statistics grid showing key performance metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '10px',
        margin: '15px 0'
      }}>
        {/* Correct sentences count */}
        <div style={{ 
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#e8f5e8', 
          borderRadius: '6px',
          border: '1px solid #4CAF50'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#4CAF50' }}>
            {correctCount}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Correct</div>
        </div>

        {/* Incorrect sentences count */}
        <div style={{ 
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          borderRadius: '6px',
          border: '1px solid #f44336'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f44336' }}>
            {totalAttempts - correctCount}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Incorrect</div>
        </div>

        {/* Current streak display */}
        <div style={{ 
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#fff3e0', 
          borderRadius: '6px',
          border: '1px solid #ff9800'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff9800' }}>
            {streak}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Current Streak</div>
        </div>

        {/* Overall accuracy percentage */}
        <div style={{ 
          textAlign: 'center', 
          padding: '10px', 
          backgroundColor: '#e3f2fd', 
          borderRadius: '6px',
          border: '1px solid #2196F3'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2196F3' }}>
            {totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0}%
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Accuracy</div>
        </div>
      </div>

      {/* Detailed session history - only shown when showProgress is true */}
      {showProgress && sessionHistory.length > 0 && (
        <div style={{
          backgroundColor: '#fafafa',   // Very light gray background
          padding: '15px',              // Internal spacing
          borderRadius: '6px',          // Rounded corners
          marginTop: '15px',            // Space above history section
          border: '1px solid #ddd'      // Light border
        }}>
          <h4 style={{ marginBottom: '10px' }}>Recent Attempts:</h4>
          {/* Display last 5 attempts in reverse chronological order */}
          {sessionHistory.slice(-5).reverse().map((entry, index) => (
            <div key={index} style={{
              padding: '8px',                                         // Internal spacing
              marginBottom: '5px',                                    // Space between entries
              backgroundColor: entry.correct ? '#e8f5e8' : '#ffebee', // Green for correct, red for incorrect
              borderRadius: '4px',                                    // Rounded corners
              fontSize: '14px',                                       // Smaller text for history
              border: entry.correct ? '1px solid #4CAF50' : '1px solid #f44336' // Colored borders
            }}>
              {/* Display sentence with result indicator and timestamp */}
              <strong>"{entry.sentence}"</strong> → {entry.structure} - {entry.timestamp} - 
              <span style={{ 
                fontWeight: 'bold', 
                color: entry.correct ? '#4CAF50' : '#f44336' 
              }}>
                {entry.correct ? ' ✅ Correct' : ' ❌ Incorrect'}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Reset progress button to start challenge over */}
      <button 
        onClick={resetProgress}
        style={{
          backgroundColor: '#f44336',    // Red background for destructive action
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
          e.target.style.backgroundColor = '#f44336';
        }}
      >
        🔄 Reset Drag & Drop Progress
      </button>
    </div>
  );
};

export default VerbProgressTracker;