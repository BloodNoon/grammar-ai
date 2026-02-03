// This component manages a typing-based quiz where users must complete 10 correct article answers
import React from 'react';

const ArticleTypingQuiz = ({ 
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
  // 10 different article questions with multiple acceptable answers for each
  const articleQuizQuestions = [
    {
      id: 1,
      sentence: "I saw ___ elephant at the zoo.",
      correctAnswers: ["an"],
      hint: "The word 'elephant' starts with a vowel sound",
      explanation: "Use 'an' before words that start with vowel sounds."
    },
    {
      id: 2,
      sentence: "She bought ___ new car yesterday.",
      correctAnswers: ["a"],
      hint: "The word 'new' starts with a consonant sound",
      explanation: "Use 'a' before words that start with consonant sounds."
    },
    {
      id: 3,
      sentence: "Please close ___ door behind you.",
      correctAnswers: ["the"],
      hint: "We're talking about a specific door",
      explanation: "Use 'the' for specific things that both speaker and listener know about."
    },
    {
      id: 4,
      sentence: "I need ___ umbrella because it's raining.",
      correctAnswers: ["an"],
      hint: "The word 'umbrella' starts with a vowel sound",
      explanation: "Use 'an' before words that start with vowel sounds."
    },
    {
      id: 5,
      sentence: "He found ___ book on the table.",
      correctAnswers: ["a"],
      hint: "The word 'book' starts with a consonant sound",
      explanation: "Use 'a' before words that start with consonant sounds."
    },
    {
      id: 6,
      sentence: "___ sun is shining brightly today.",
      correctAnswers: ["the"],
      hint: "There's only one sun, making it specific",
      explanation: "Use 'the' for unique things that everyone knows about."
    },
    {
      id: 7,
      sentence: "She ate ___ apple for lunch.",
      correctAnswers: ["an"],
      hint: "The word 'apple' starts with a vowel sound",
      explanation: "Use 'an' before words that start with vowel sounds."
    },
    {
      id: 8,
      sentence: "I saw ___ movie last night.",
      correctAnswers: ["a"],
      hint: "The word 'movie' starts with a consonant sound",
      explanation: "Use 'a' before words that start with consonant sounds."
    },
    {
      id: 9,
      sentence: "Can you pass me ___ salt, please?",
      correctAnswers: ["the"],
      hint: "We're talking about specific salt on the table",
      explanation: "Use 'the' when referring to something specific that both people know about."
    },
    {
      id: 10,
      sentence: "We heard ___ interesting story today.",
      correctAnswers: ["an"],
      hint: "The word 'interesting' starts with a vowel sound",
      explanation: "Use 'an' before words that start with vowel sounds."
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
    const question = articleQuizQuestions[questionIndex];
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
        setCurrentQuizFeedback(`🎉 CONGRATULATIONS! You've mastered articles with ${QUIZ_TARGET_CORRECT} correct answers! "${userAnswer}" is correct!`);
        return { correct: true, completed: true };
      } else {
        // Show progress feedback for correct answer
        setCurrentQuizFeedback(`✅ Correct! "${userAnswer}" is the right article. Progress: ${newQuizCorrectCount}/${QUIZ_TARGET_CORRECT} (${QUIZ_TARGET_CORRECT - newQuizCorrectCount} more to go!)`);
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
      setCurrentQuizFeedback(`❌ "${userAnswer}" is incorrect. ${question.explanation} Try again! Progress: ${quizCorrectCount}/${QUIZ_TARGET_CORRECT} correct`);
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
        marginBottom: '20px',          // Space below title
        fontSize: '1.5rem'               // Larger font for title
      }}>
        ✍️ Articles Typing Challenge
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
        <div>Progress: {quizCorrectCount}/{QUIZ_TARGET_CORRECT} ({Math.round((quizCorrectCount / QUIZ_TARGET_CORRECT) * 100)}%)</div>
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
          <h3>🎉 ARTICLES TYPING MASTERY ACHIEVED! 🎉</h3>
          <p>You've successfully completed {QUIZ_TARGET_CORRECT} correct article answers!</p>
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
            Fill in the blank with the correct article (a, an, or the):
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
            {articleQuizQuestions[currentQuizQuestion]?.sentence}
          </div>

          {/* Display hint for the current question */}
          <div style={{ marginBottom: '15px' }}>
            <strong>Hint:</strong> {articleQuizQuestions[currentQuizQuestion]?.hint}
          </div>

          {/* Input field for user to type their answer */}
          <input
            type="text"
            value={quizAnswers[currentQuizQuestion] || ''}
            onChange={(e) => handleQuizAnswer(currentQuizQuestion, e.target.value)}
            placeholder="Type the correct article here..."
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
                Explanation: {articleQuizQuestions[currentQuizQuestion]?.explanation}
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

export default ArticleTypingQuiz;