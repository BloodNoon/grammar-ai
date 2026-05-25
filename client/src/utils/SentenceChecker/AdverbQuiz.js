import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const AdverbQuiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const quizQuestions = [
    {
      question: "Identify the adverbs in: 'She quickly ran outside yesterday.'",
      options: ["quickly", "ran", "outside", "yesterday"],
      correct: ["quickly", "outside", "yesterday"],
      type: "multiple",
      explanation: "'Quickly' (manner), 'outside' (place), and 'yesterday' (time) are all adverbs modifying the verb 'ran'."
    },
    {
      question: "What type of adverb is 'very' in 'The movie was very exciting'?",
      options: ["Manner", "Time", "Degree", "Frequency"],
      correct: "Degree",
      type: "single",
      explanation: "'Very' is a degree adverb that intensifies the adjective 'exciting'."
    },
    {
      question: "Put these adverbs in the correct Royal Order: 'last week', 'carefully', 'in the garden'",
      options: [
        "carefully, in the garden, last week",
        "in the garden, carefully, last week", 
        "last week, carefully, in the garden"
      ],
      correct: "carefully, in the garden, last week",
      type: "single",
      explanation: "Royal Order: Manner (carefully) → Place (in the garden) → Time (last week)."
    },
    {
      question: "Which words are adverbs in: 'He always speaks extremely clearly here.'?",
      options: ["always", "speaks", "extremely", "clearly", "here"],
      correct: ["always", "extremely", "clearly", "here"],
      type: "multiple",
      explanation: "'Always' (frequency), 'extremely' (degree), 'clearly' (manner), and 'here' (place) are adverbs."
    },
    {
      question: "What does the adverb 'beautifully' modify in: 'She sings beautifully'?",
      options: ["She", "sings", "the whole sentence", "nothing"],
      correct: "sings",
      type: "single",
      explanation: "'Beautifully' is an adverb of manner that modifies the verb 'sings', describing HOW she sings."
    },
    {
      question: "Which sentence uses adverbs correctly?",
      options: [
        "He worked hardly yesterday in the office.",
        "He worked hard yesterday in the office.",
        "He worked hardly in the office yesterday."
      ],
      correct: "He worked hard yesterday in the office.",
      type: "single",
      explanation: "'Hard' (not 'hardly') is the correct adverb for effort. The order follows: Manner → Time → Place."
    },
    {
      question: "In 'Tomorrow, we will carefully review the documents', what types of adverbs are used?",
      options: ["Time and Manner", "Place and Frequency", "Degree and Time", "Manner and Place"],
      correct: "Time and Manner",
      type: "single",
      explanation: "'Tomorrow' is a time adverb and 'carefully' is a manner adverb."
    },
    {
      question: "Which of these are adverb phrases?",
      options: ["in the morning", "with great care", "very quickly", "to a large extent"],
      correct: ["in the morning", "with great care", "to a large extent"],
      type: "multiple",
      explanation: "These are all adverb phrases. 'Very quickly' contains adverbs but 'very' modifies 'quickly' - it's not a phrase."
    }
  ];

  const startQuiz = () => {
    setQuizStarted(true);
    setAnswers({});
    setFeedback({});
  };

  const handleAnswer = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleMultipleAnswer = (questionIndex, option, isChecked) => {
    const currentAnswers = answers[questionIndex] || [];
    if (isChecked) {
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: [...currentAnswers, option]
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: currentAnswers.filter(a => a !== option)
      }));
    }
  };

  const checkQuiz = () => {
    const newFeedback = {};
    let correctCount = 0;

    quizQuestions.forEach((q, index) => {
      const userAnswer = answers[index];
      if (q.type === 'multiple') {
        const isCorrect = Array.isArray(userAnswer) && 
          userAnswer.length === q.correct.length &&
          userAnswer.every(ans => q.correct.includes(ans));
        newFeedback[index] = { correct: isCorrect, explanation: q.explanation };
        if (isCorrect) correctCount++;
      } else {
        const isCorrect = userAnswer === q.correct;
        newFeedback[index] = { correct: isCorrect, explanation: q.explanation };
        if (isCorrect) correctCount++;
      }
    });

    setFeedback(newFeedback);
    
    // Show overall score
    setTimeout(() => {
      const percentage = Math.round((correctCount / quizQuestions.length) * 100);
      let message = `Quiz Complete! You scored ${correctCount} out of ${quizQuestions.length} questions correctly (${percentage}%).`;
      
      if (percentage >= 90) {
        message += " 🌟 Outstanding! You're an adverb expert!";
      } else if (percentage >= 80) {
        message += " 🎉 Great job! You have a strong understanding of adverbs!";
      } else if (percentage >= 70) {
        message += " 👍 Good work! Review the explanations to strengthen your knowledge.";
      } else {
        message += " 📚 Keep practicing! Review the lesson materials and try again.";
      }
      
      alert(message);
    }, 100);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setAnswers({});
    setFeedback({});
  };

  return (
    <Box style={{
      backgroundColor: '#e8f4fd',
      padding: '2rem',
      borderRadius: '10px',
      border: '2px solid blue.700',
      marginTop: '2rem'
    }}>
      <Heading as="h3" size="md" sx={{ color: 'blue.800', marginBottom: '1rem' }}>🧠 Adverb Mastery Quiz</Heading>
      
      {!quizStarted ? (
        <Box style={{ textAlign: 'center' }}>
          <Text sx={{ fontSize: '1rem', marginBottom: '1rem', color: 'gray.500' }}>
            Test your comprehensive knowledge of adverbs! This quiz covers types, placement, Royal Order, and usage.
          </Text>
          <Box style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #90caf9'
          }}>
            <Heading as="h4" size="sm" sx={{ color: 'blue.800', marginBottom: '0.5rem' }}>Quiz Topics:</Heading>
            <ul style={{ textAlign: 'left', color: 'gray.500', fontSize: '0.9rem' }}>
              <li>• Identifying adverbs in sentences</li>
              <li>• Types of adverbs (manner, time, place, frequency, degree)</li>
              <li>• Royal Order of Adverbs</li>
              <li>• What adverbs modify (verbs, adjectives, other adverbs)</li>
              <li>• Adverb phrases and proper usage</li>
            </ul>
          </Box>
          <Button
            onClick={startQuiz}
            sx={{
              backgroundColor: 'blue.700',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Start Adverb Quiz ({quizQuestions.length} Questions)
          </Button>
        </Box>
      ) : (
        <Box>
          <Box style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <Text sx={{ color: 'blue.800', fontWeight: 'bold' }}>
              Progress: {Object.keys(answers).length}/{quizQuestions.length} answered
            </Text>
          </Box>

          {quizQuestions.map((question, index) => (
            <Box key={index} style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              border: '1px solid gray.200'
            }}>
              <Box style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '1rem' }}>
                {index + 1}. {question.question}
              </Box>
              
              {question.type === 'multiple' ? (
                // Multiple choice checkboxes
                <Box style={{ marginBottom: '1rem' }}>
                  <Text sx={{ fontSize: '0.9rem', color: 'gray.500', marginBottom: '0.5rem' }}>
                    (Select all that apply)
                  </Text>
                  {question.options.map((option, optIndex) => (
                    <label key={optIndex} style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      cursor: 'pointer',
                      padding: '0.25rem'
                    }}>
                      <input
                        type="checkbox"
                        checked={(answers[index] || []).includes(option)}
                        onChange={(e) => handleMultipleAnswer(index, option, e.target.checked)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      {option}
                    </label>
                  ))}
                </Box>
              ) : (
                // Single choice radio buttons
                <Box style={{ marginBottom: '1rem' }}>
                  {question.options.map((option, optIndex) => (
                    <label key={optIndex} style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      cursor: 'pointer',
                      padding: '0.25rem'
                    }}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={answers[index] === option}
                        onChange={(e) => handleAnswer(index, option)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      {option}
                    </label>
                  ))}
                </Box>
              )}
              
              {feedback[index] && (
                <Box style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: feedback[index].correct ? 'green.100' : 'red.100',
                  color: feedback[index].correct ? 'green.800' : 'red.800',
                  borderRadius: '4px',
                  border: `1px solid ${feedback[index].correct ? 'green.200' : 'red.200'}`
                }}>
                  <Box style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {feedback[index].correct ? '✅ Correct!' : '❌ Incorrect'}
                  </Box>
                  <Box style={{ fontSize: '0.9rem' }}>
                    {feedback[index].explanation}
                  </Box>
                </Box>
              )}
            </Box>
          ))}
          
          <Box style={{ textAlign: 'center', marginTop: '1.5rem', gap: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={checkQuiz}
              disabled={Object.keys(answers).length < quizQuestions.length}
              sx={{
                backgroundColor: Object.keys(answers).length === quizQuestions.length ? 'green.500' : 'gray.300',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: Object.keys(answers).length === quizQuestions.length ? 'pointer' : 'not-allowed',
                marginRight: '1rem',
                fontWeight: 'bold'
              }}
            >
              Check All Answers
            </Button>
            
            <Button
              onClick={resetQuiz}
              sx={{
                backgroundColor: 'gray.500',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Reset Quiz
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AdverbQuiz;