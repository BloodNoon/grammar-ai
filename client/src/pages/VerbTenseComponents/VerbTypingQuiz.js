// This component manages a typing-based quiz where users must complete 10 correct verb tense answers
import React from 'react';

const VerbTypingQuiz = ({ 
  currentQuizQuestion,        // Index of current question being displayed
  quizAnswers,               // Object storing user's typed answers by question index
  setQuizAnswers,            // Function to update quiz answers
  quizCompleted,             // Boolean indicating if user completed 10 correct answers
  setQuizCompleted,          // Function to set quiz completion status
  quizCorrectCount,          // Number of correct answers achieved so far
  setQuizCorrectCount,       // Function to update correct answer count
  quizTotalAttempts,         // Total number of attempts made
  setQuizTotalAttempts,      // Function to update total attempts
  quizSessionHistory,        // Array of recent quiz attempts with details
  setQuizSessionHistory,     // Function to update session history
  currentQuizFeedback,       // Current feedback message for the active question
  setCurrentQuizFeedback,    // Function to update current question feedback
  generateNewQuizQuestion,   // Function to generate a new random question
  resetQuiz,                 // Function to reset entire quiz progress
  QUIZ_TARGET_CORRECT        // Target number of correct answers needed (10)
}) => {

  // ===== QUIZ QUESTIONS DATA SECTION =====
  // 15 different verb tense questions with multiple acceptable answers for each
  const verbQuizQuestions = [
    {
      id: 1,
      sentence: "She _____ the dog every morning.",
      correctAnswers: ["walks", "is walking"], // Present simple for habit or present continuous for current action
      tenseHint: "Present Simple or Present Continuous",
      explanation: "Use 'walks' for habitual action or 'is walking' for current action."
    },
    {
      id: 2,
      sentence: "They _____ their homework yesterday.",
      correctAnswers: ["finished", "completed"], // Past simple for completed past actions
      tenseHint: "Past Simple",
      explanation: "Use past simple tense for completed actions in the past."
    },
    {
      id: 3,
      sentence: "He _____ at the concert tomorrow.",
      correctAnswers: ["will sing", "will be singing"], // Future simple or future continuous
      tenseHint: "Future Simple or Future Continuous",
      explanation: "Use 'will sing' or 'will be singing' for future actions."
    },
    {
      id: 4,
      sentence: "We _____ this movie before.",
      correctAnswers: ["have seen", "have watched"], // Present perfect for past experiences
      tenseHint: "Present Perfect",
      explanation: "Use present perfect for experiences or actions with present relevance."
    },
    {
      id: 5,
      sentence: "She _____ dinner when I called.",
      correctAnswers: ["was cooking", "was making", "was preparing"], // Past continuous for interrupted actions
      tenseHint: "Past Continuous",
      explanation: "Use past continuous for ongoing actions interrupted by another action."
    },
    {
      id: 6,
      sentence: "By next year, I _____ my degree.",
      correctAnswers: ["will have finished", "will have completed"], // Future perfect for completed future actions
      tenseHint: "Future Perfect",
      explanation: "Use future perfect for actions that will be completed before a future time."
    },
    {
      id: 7,
      sentence: "The cat _____ on the windowsill right now.",
      correctAnswers: ["is sleeping", "is lying", "is sitting"], // Present continuous for current actions
      tenseHint: "Present Continuous",
      explanation: "Use present continuous for actions happening at the moment of speaking."
    },
    {
      id: 8,
      sentence: "They _____ to the store before it closed.",
      correctAnswers: ["had gone", "had walked", "had driven"], // Past perfect for actions before other past actions
      tenseHint: "Past Perfect",
      explanation: "Use past perfect for actions completed before another past action."
    },
    {
      id: 9,
      sentence: "I _____ my keys somewhere in the house.",
      correctAnswers: ["have lost", "have left", "have misplaced"], // Present perfect for recent actions with present consequences
      tenseHint: "Present Perfect",
      explanation: "Use present perfect for recent actions with present consequences."
    },
    {
      id: 10,
      sentence: "The children _____ outside every afternoon.",
      correctAnswers: ["play", "are playing"], // Present simple for habits or present continuous for current actions
      tenseHint: "Present Simple or Present Continuous",
      explanation: "Use present simple for habits or present continuous for current actions."
    },
    {
      id: 11,
      sentence: "She _____ a letter when the phone rang.",
      correctAnswers: ["was writing", "was typing"], // Past continuous for interrupted ongoing actions
      tenseHint: "Past Continuous",
      explanation: "Use past continuous for ongoing past actions interrupted by another action."
    },
    {
      id: 12,
      sentence: "We _____ to Paris next summer.",
      correctAnswers: ["will travel", "will go", "will fly", "are going"], // Future or planned future actions
      tenseHint: "Future Simple or Present Continuous for future",
      explanation: "Use future tense or present continuous for planned future actions."
    },
    {
      id: 13,
      sentence: "He _____ three cups of coffee today.",
      correctAnswers: ["has drunk", "has had"], // Present perfect for actions within current time period
      tenseHint: "Present Perfect",
      explanation: "Use present perfect for actions completed within a time period that includes now."
    },
    {
      id: 14,
      sentence: "The students _____ their presentation by tomorrow.",
      correctAnswers: ["will have prepared", "will have finished"], // Future perfect for actions completed before future deadline
      tenseHint: "Future Perfect",
      explanation: "Use future perfect for actions that will be completed before a future deadline."
    },
    {
      id: 15,
      sentence: "She _____ to work when it started raining.",
      correctAnswers: ["was walking", "was driving", "was going"], // Past continuous for interrupted ongoing actions
      tenseHint: "Past Continuous",
      explanation: "Use past continuous for ongoing actions interrupted by another event."
    }
  ];

  // ===== QUIZ INTERACTION FUNCTIONS =====
  // Handle user typing in the answer input field
  const handleQuizAnswer = (questionIndex, typedAnswer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: typedAnswer.trim() // Store trimmed answer to remove extra spaces
    }));
    setCurrentQuizFeedback(''); // Clear previous feedback when user starts typing new answer
  };

  // Check if the user's typed answer is correct for the current question
  const checkQuizAnswer = (questionIndex) => {
    const question = verbQuizQuestions[questionIndex];
    const userAnswer = quizAnswers[questionIndex];
    
    // Validate that user entered an answer
    if (!userAnswer) {
      setCurrentQuizFeedback("Please enter an answer.");
      return { correct: false };
    }

    // Check if user's answer matches any of the acceptable answers (case-insensitive)
    const isCorrect = question.correctAnswers.some(answer => 
      answer.toLowerCase() === userAnswer.toLowerCase()
    );

    // Update total attempts counter
    const newQuizTotalAttempts = quizTotalAttempts + 1;
    setQuizTotalAttempts(newQuizTotalAttempts);

    if (isCorrect) {
      // Handle correct answer
      const newQuizCorrectCount = quizCorrectCount + 1;
      setQuizCorrectCount(newQuizCorrectCount);
      
      // Add successful attempt to session history
      setQuizSessionHistory(prev => [...prev, {
        question: question.sentence,
        userAnswer: userAnswer,
        correct: true,
        timestamp: new Date().toLocaleTimeString()
      }]);

      // Check if user has completed the 10-answer challenge
      if (newQuizCorrectCount >= QUIZ_TARGET_CORRECT) {
        setQuizCompleted(true);
        setCurrentQuizFeedback(`🎉 CONGRATULATIONS! You've mastered verb tenses with ${QUIZ_TARGET_CORRECT} correct answers! "${userAnswer}" is correct!`);
        return { correct: true, completed: true };
      } else {
        // Show progress feedback for correct answer
        setCurrentQuizFeedback(`✅ Correct! "${userAnswer}" is the right verb tense. Progress: ${newQuizCorrectCount}/${QUIZ_TARGET_CORRECT} (${QUIZ_TARGET_CORRECT - newQuizCorrectCount} more to go!)`);
        return { correct: true, completed: false };
      }
    } else {
      // Handle incorrect answer
      // Add failed attempt to session history
      setQuizSessionHistory(prev => [...prev, {
        question: question.sentence,
        userAnswer: userAnswer,
        correct: false,
        timestamp: new Date().toLocaleTimeString()
      }]);

      // Show feedback with hint for incorrect answer
      setCurrentQuizFeedback(`❌ "${userAnswer}" is incorrect. Hint: ${question.tenseHint}. Try again! Progress: ${quizCorrectCount}/${QUIZ_TARGET_CORRECT} correct`);
      return { correct: false };
    }
  };

  return (
    // Main container for the typing quiz section
    <div style={{
      border: '2px solid #2196F3',    // Blue border to distinguish quiz section
      padding: '20px',                // Internal spacing
      marginTop: '30px',              // Space above quiz section
      marginBottom: '20px',           // Space below quiz section
      textAlign: 'left',              // Left-align content for readability
      borderRadius: '8px'             // Rounded corners for modern appearance
    }}>
      {/* ===== QUIZ TITLE ===== */}
      <h2 style={{ 
        color: '#2196F3',             // Blue color to match border
        textAlign: 'center',          // Center the title
        marginBottom: '20px'          // Space below title
      }}>
        ✍️ Verb Tense Typing Challenge
      </h2>

      {/* ===== QUIZ PROGRESS TRACKER ===== */}
      <div style={{
        backgroundColor: '#e3f2fd',   // Light blue background
        padding: '15px',              // Internal spacing
        borderRadius: '6px',          // Rounded corners
        marginBottom: '20px',         // Space below progress section
        border: '1px solid #2196F3'   // Blue border
      }}>
        <h4>{quizCompleted ? 'Typing Challenge Completed!' : 'Typing Challenge Progress'}</h4>
        {/* Progress bar showing completion percentage */}
        <div>Progress: {quizCorrectCount}/{QUIZ_TARGET_CORRECT} correct ({Math.round((quizCorrectCount / QUIZ_TARGET_CORRECT) * 100)}%)</div>
        {/* Statistics display */}
        <div>
          <div>Correct: {quizCorrectCount}</div>
          <div>Incorrect: {quizTotalAttempts - quizCorrectCount}</div>
          <div>Accuracy: {quizTotalAttempts > 0 ? Math.round((quizCorrectCount / quizTotalAttempts) * 100) : 0}%</div>
        </div>
      </div>

      {/* ===== QUIZ COMPLETION CELEBRATION ===== */}
      {quizCompleted && (
        <div style={{
          backgroundColor: '#4CAF50',  // Green background for success
          color: 'white',              // White text for contrast
          padding: '25px',             // Generous padding for celebration
          borderRadius: '8px',         // Rounded corners
          textAlign: 'center',         // Center-align celebration content
          marginBottom: '20px'         // Space below celebration
        }}>
          <h3>🎉 VERB TENSE TYPING MASTERY ACHIEVED! 🎉</h3>
          <p>You've successfully completed {QUIZ_TARGET_CORRECT} correct verb tense answers!</p>
          <p>Final Stats: {quizCorrectCount} correct out of {quizTotalAttempts} attempts ({Math.round((quizCorrectCount / quizTotalAttempts) * 100)}% accuracy)</p>
          <button
            onClick={resetQuiz}
            style={{
              backgroundColor: 'white', // White background for contrast
              color: '#4CAF50',        // Green text to match theme
              padding: '12px 24px',    // Button spacing
              border: 'none',          // No border for clean look
              borderRadius: '6px',     // Rounded corners
              fontSize: '16px',        // Standard text size
              fontWeight: 'bold',      // Bold text for emphasis
              cursor: 'pointer',       // Clickable cursor
              marginTop: '10px'        // Space above button
            }}
          >
            🚀 Start New Typing Challenge
          </button>
        </div>
      )}

      {/* ===== CURRENT QUIZ QUESTION ===== */}
      {!quizCompleted && (
        <div style={{
          backgroundColor: '#f9f9f9', // Light gray background for question area
          padding: '25px',            // Internal spacing
          borderRadius: '8px',        // Rounded corners
          border: '1px solid #ddd',   // Light border
          marginBottom: '20px'        // Space below question area
        }}>
          <h4 style={{ color: '#333', marginBottom: '15px' }}>
            Complete the sentence with the correct verb tense:
          </h4>

          {/* Display current question sentence with blank to fill in */}
          <div style={{ 
            fontSize: '18px',          // Large text for readability
            marginBottom: '20px',      // Space below question
            padding: '15px',           // Internal spacing
            backgroundColor: 'white',  // White background for emphasis
            borderRadius: '6px',       // Rounded corners
            border: '2px solid #2196F3' // Blue border to highlight question
          }}>
            {verbQuizQuestions[currentQuizQuestion]?.sentence}
          </div>

          {/* Display hint for the current question */}
          <div style={{ marginBottom: '15px' }}>
            <strong>Hint:</strong> {verbQuizQuestions[currentQuizQuestion]?.tenseHint}
          </div>

          {/* Input field for user to type their answer */}
          <input
            type="text"
            value={quizAnswers[currentQuizQuestion] || ''}
            onChange={(e) => handleQuizAnswer(currentQuizQuestion, e.target.value)}
            placeholder="Type the correct verb form here..."
            style={{
              width: '100%',           // Full width input
              padding: '12px',         // Internal spacing
              fontSize: '16px',        // Large text for readability
              border: '2px solid #ccc', // Gray border
              borderRadius: '6px',     // Rounded corners
              marginBottom: '15px'     // Space below input
            }}
            // Handle Enter key press to check answer
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const result = checkQuizAnswer(currentQuizQuestion);
                // If correct and not completed, generate new question after delay
                if (result.correct && !result.completed) {
                  setTimeout(() => {
                    generateNewQuizQuestion();
                    setQuizAnswers(prev => ({ ...prev, [currentQuizQuestion]: '' }));
                  }, 2000);
                }
              }
            }}
          />

          {/* Check Answer Button */}
          <button
            onClick={() => {
              const result = checkQuizAnswer(currentQuizQuestion);
              // If correct and not completed, generate new question after delay for user to see feedback
              if (result.correct && !result.completed) {
                setTimeout(() => {
                  generateNewQuizQuestion();
                  setQuizAnswers(prev => ({ ...prev, [currentQuizQuestion]: '' }));
                }, 2000);
              }
            }}
            style={{
              backgroundColor: '#4CAF50', // Green background for primary action
              color: 'white',             // White text
              padding: '12px 24px',       // Button spacing
              border: 'none',             // No border
              borderRadius: '6px',        // Rounded corners
              fontSize: '16px',           // Standard text size
              fontWeight: 'bold',         // Bold text
              cursor: 'pointer',          // Clickable cursor
              marginRight: '10px'         // Space to the right
            }}
          >
            Check Answer
          </button>

          {/* Skip Question Button */}
          <button
            onClick={generateNewQuizQuestion}
            style={{
              backgroundColor: '#ff9800', // Orange background for secondary action
              color: 'white',             // White text
              padding: '12px 24px',       // Button spacing
              border: 'none',             // No border
              borderRadius: '6px',        // Rounded corners
              fontSize: '16px',           // Standard text size
              fontWeight: 'bold',         // Bold text
              cursor: 'pointer'           // Clickable cursor
            }}
          >
            Skip Question
          </button>

          {/* Display current question feedback */}
          {currentQuizFeedback && (
            <div style={{
              marginTop: '15px',         // Space above feedback
              padding: '10px',           // Internal spacing
              borderRadius: '6px',       // Rounded corners
              border: '2px solid #ddd',  // Light border
              // Background color based on feedback type (green for correct, red for incorrect)
              backgroundColor: currentQuizFeedback.includes('✅') ? '#e8f5e8' : '#ffebee'
            }}>
              <div style={{ fontWeight: 'bold' }}>
                {currentQuizFeedback}
              </div>
              {/* Show explanation for the current question */}
              <div style={{ marginTop: '10px', fontStyle: 'italic' }}>
                Explanation: {verbQuizQuestions[currentQuizQuestion]?.explanation}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== QUIZ SESSION HISTORY ===== */}
      {quizSessionHistory.length > 0 && (
        <div style={{
          backgroundColor: '#fafafa', // Very light gray background
          padding: '15px',            // Internal spacing
          borderRadius: '6px',        // Rounded corners
          marginTop: '20px'           // Space above history section
        }}>
          <h4>Recent Typing Attempts:</h4>
          {/* Display last 5 attempts in reverse chronological order */}
          {quizSessionHistory.slice(-5).reverse().map((entry, index) => (
            <div key={index} style={{
              padding: '8px',                                        // Internal spacing
              marginBottom: '5px',                                   // Space between entries
              backgroundColor: entry.correct ? '#e8f5e8' : '#ffebee', // Green for correct, red for incorrect
              borderRadius: '4px',                                   // Rounded corners
              fontSize: '14px'                                       // Smaller text for history
            }}>
              <strong>"{entry.userAnswer}"</strong> for "{entry.question.replace('_____', '___')}" - 
              {entry.correct ? ' ✅ Correct' : ' ❌ Incorrect'} - {entry.timestamp}
            </div>
          ))}
        </div>
      )}

      {/* ===== RESET QUIZ BUTTON ===== */}
      <button
        onClick={resetQuiz}
        style={{
          backgroundColor: '#f44336', // Red background for reset action
          color: 'white',             // White text
          padding: '10px 20px',       // Button spacing
          border: 'none',             // No border
          borderRadius: '6px',        // Rounded corners
          fontSize: '14px',           // Standard text size
          fontWeight: 'bold',         // Bold text
          cursor: 'pointer',          // Clickable cursor
          marginTop: '15px'           // Space above button
        }}
      >
        🔄 Reset Typing Challenge
      </button>
    </div>
  );
};

export default VerbTypingQuiz;