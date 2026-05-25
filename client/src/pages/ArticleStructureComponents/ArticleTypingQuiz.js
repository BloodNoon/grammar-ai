import { Box, Button, Heading, Text } from '@chakra-ui/react';
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
    <Box style={{
      border: '2px solid blue.500',    // Blue border to distinguish quiz section
      padding: '20px',                // Internal spacing
      marginTop: '30px',              // Space above quiz section
      marginBottom: '20px',           // Space below quiz section
      textAlign: 'left',              // Left-align content for readability
      borderRadius: '8px'             // Rounded corners for modern appearance
    }}>
      {/* ===== QUIZ TITLE ===== */}
      <Heading as="h2" size="lg" sx={{ 
        color: 'blue.500',             // Blue color to match border
        textAlign: 'center',          // Center the title
        marginBottom: '20px'          // Space below title
      }}>
        ✍️ Articles Typing Challenge
      </Heading>

      {/* ===== QUIZ PROGRESS TRACKER ===== */}
      <Box sx={{
        backgroundColor: 'blue.50',   // Light blue background
        padding: '15px',              // Internal spacing
        borderRadius: '6px',          // Rounded corners
        marginBottom: '20px',         // Space below progress section
        border: '1px solid blue.500'   // Blue border
      }}>
        <Heading as="h4" size="sm">{quizCompleted ? 'Typing Challenge Completed!' : 'Typing Challenge Progress'}</Heading>
        {/* Progress bar showing completion percentage */}
        <Box>Progress: {quizCorrectCount}/{QUIZ_TARGET_CORRECT} ({Math.round((quizCorrectCount / QUIZ_TARGET_CORRECT) * 100)}%)</Box>
        {/* Statistics display */}
        <Box>
          <Box>Correct: {quizCorrectCount}</Box>
          <Box>Incorrect: {quizTotalAttempts - quizCorrectCount}</Box>
          <Box>Accuracy: {quizTotalAttempts > 0 ? Math.round((quizCorrectCount / quizTotalAttempts) * 100) : 0}%</Box>
        </Box>
      </Box>

      {/* ===== QUIZ COMPLETION CELEBRATION ===== */}
      {quizCompleted && (
        <Box sx={{
          backgroundColor: 'green.500',  // Green background for success
          color: 'white',              // White text for contrast
          padding: '25px',             // Generous padding for celebration
          borderRadius: '8px',         // Rounded corners
          textAlign: 'center',         // Center-align celebration content
          marginBottom: '20px'         // Space below celebration
        }}>
          <Heading as="h3" size="md">🎉 ARTICLES TYPING MASTERY ACHIEVED! 🎉</Heading>
          <Text>You've successfully completed {QUIZ_TARGET_CORRECT} correct article answers!</Text>
          <Text>Final Stats: {quizCorrectCount} correct out of {quizTotalAttempts} attempts ({Math.round((quizCorrectCount / quizTotalAttempts) * 100)}% accuracy)</Text>
          <Button
            onClick={resetQuiz}
            sx={{
              backgroundColor: 'white', // White background for contrast
              color: 'green.500',        // Green text to match theme
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
          </Button>
        </Box>
      )}

      {/* ===== CURRENT QUIZ QUESTION ===== */}
      {!quizCompleted && (
        <Box style={{
          backgroundColor: '#f9f9f9', // Light gray background for question area
          padding: '25px',            // Internal spacing
          borderRadius: '8px',        // Rounded corners
          border: '1px solid gray.200',   // Light border
          marginBottom: '20px'        // Space below question area
        }}>
          <Heading as="h4" size="sm" sx={{ color: 'gray.700', marginBottom: '15px' }}>
            Fill in the blank with the correct article (a, an, or the):
          </Heading>

          {/* Display current question sentence with blank to fill in */}
          <Box style={{ 
            fontSize: '18px',          // Large text for readability
            marginBottom: '20px',      // Space below question
            padding: '15px',           // Internal spacing
            backgroundColor: 'white',  // White background for emphasis
            borderRadius: '6px',       // Rounded corners
            border: '2px solid blue.500' // Blue border to highlight question
          }}>
            {articleQuizQuestions[currentQuizQuestion]?.sentence}
          </Box>

          {/* Display hint for the current question */}
          <Box style={{ marginBottom: '15px' }}>
            <strong>Hint:</strong> {articleQuizQuestions[currentQuizQuestion]?.hint}
          </Box>

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
              border: '2px solid gray.300', // Gray border
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
          <Button
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
              backgroundColor: 'green.500', // Green background for primary action
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
          </Button>

          {/* Skip Question Button */}
          <Button
            onClick={generateNewQuizQuestion}
            sx={{
              backgroundColor: 'orange.500', // Orange background for secondary action
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
          </Button>

          {/* Display current question feedback */}
          {currentQuizFeedback && (
            <Box sx={{
              marginTop: '15px',         // Space above feedback
              padding: '10px',           // Internal spacing
              borderRadius: '6px',       // Rounded corners
              border: '2px solid gray.200',  // Light border
              // Background color based on feedback type (green for correct, red for incorrect)
              backgroundColor: currentQuizFeedback.includes('✅') ? 'green.50' : 'red.50'
            }}>
              <Box style={{ fontWeight: 'bold' }}>
                {currentQuizFeedback}
              </Box>
              {/* Show explanation for the current question */}
              <Box style={{ marginTop: '10px', fontStyle: 'italic' }}>
                Explanation: {articleQuizQuestions[currentQuizQuestion]?.explanation}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* ===== QUIZ SESSION HISTORY ===== */}
      {quizSessionHistory.length > 0 && (
        <Box style={{
          backgroundColor: '#fafafa', // Very light gray background
          padding: '15px',            // Internal spacing
          borderRadius: '6px',        // Rounded corners
          marginTop: '20px'           // Space above history section
        }}>
          <Heading as="h4" size="sm">Recent Typing Attempts:</Heading>
          {/* Display last 5 attempts in reverse chronological order */}
          {quizSessionHistory.slice(-5).reverse().map((entry, index) => (
            <Box key={index} sx={{
              padding: '8px',                                        // Internal spacing
              marginBottom: '5px',                                   // Space between entries
              backgroundColor: entry.correct ? 'green.50' : 'red.50', // Green for correct, red for incorrect
              borderRadius: '4px',                                   // Rounded corners
              fontSize: '14px'                                       // Smaller text for history
            }}>
              <strong>"{entry.userAnswer}"</strong> for "{entry.question.replace('_____', '___')}" - 
              {entry.correct ? ' ✅ Correct' : ' ❌ Incorrect'} - {entry.timestamp}
            </Box>
          ))}
        </Box>
      )}

      {/* ===== RESET QUIZ BUTTON ===== */}
      <Button
        onClick={resetQuiz}
        sx={{
          backgroundColor: 'red.500', // Red background for reset action
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
      </Button>
    </Box>
  );
};

export default ArticleTypingQuiz;