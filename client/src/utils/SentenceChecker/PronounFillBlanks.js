import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const PronounFillBlanks = () => {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const questions = [
    { 
      sentence: "___ dress had a stain on it.", 
      options: ["Her", "Them", "We"], 
      correct: "Her",
      explanation: "It is referring to a single person's dress. 'Her' is singular and possessive it is the only one that fits."
    },
    { 
      sentence: "If you have any questions, feel free to ask ___.", 
      options: ["they", "himself", "me"], 
      correct: "me",
      explanation: "'me' is the object pronoun that receives the action"
    },
    { 
      sentence: "He took ___ own bag and left the room.", 
      options: ["us", "his", "who"], 
      correct: "his",
      explanation: "He owns the bag and 'his' is a possessive pronoun that shows that"
    },
    { 
      sentence: "I cooked some food for ______.", 
      options: ["myself", "they", "we"], 
      correct: "myself",
      explanation: "The object and the person are the same thing whih means you use a reflexive pronoun. In this case that's 'myself'"
    },
    { 
      sentence: "After the bell rings, please turn in ___ work", 
      options: ["your","myself", "whom"], 
      correct: "your",
      explanation: "The question is asking for someone's possession and the word 'your' is a possessive pronoun"
    }
  ];

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));

    // Provide immediate feedback
    const question = questions[questionIndex];
    const isCorrect = answer === question.correct;
    setFeedback(prev => ({
      ...prev,
      [questionIndex]: {
        correct: isCorrect,
        explanation: question.explanation
      }
    }));
  };

  const resetExercise = () => {
    setAnswers({});
    setFeedback({});
  };

  const getScore = () => {
    const correctAnswers = Object.values(feedback).filter(f => f.correct).length;
    return correctAnswers;
  };

  return (
    <Box style={{
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    }}>
      <Heading as="h2" size="lg" sx={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem', color: 'gray.700' }}>
        ✏️ Practice: Fill in the Pronouns
      </Heading>

      <Text sx={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'gray.500' }}>
        Choose the correct Pronoun for each sentence:
      </Text>

      <Box style={{ textAlign: 'left' }}>
        {questions.map((question, index) => (
          <Box key={index} style={{ 
            margin: '1rem 0', 
            padding: '1.5rem', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            border: '1px solid gray.200'
          }}>
            <Text style={{ fontSize: '1.1rem', marginBottom: '1rem', lineHeight: '1.5' }}>
              <strong>{index + 1}.</strong> {question.sentence}
            </Text>
            
            <Box style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {question.options.map((option, optIndex) => (
                <Button
                  key={optIndex}
                  onClick={() => handleAnswerSelect(index, option)}
                  disabled={feedback[index] !== undefined}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 
                      answers[index] === option 
                        ? (feedback[index]?.correct ? 'green.100' : 'red.100')
                        : 'gray.100',
                    border: '1px solid gray.200',
                    borderRadius: '4px',
                    cursor: feedback[index] ? 'default' : 'pointer',
                    color: 
                      answers[index] === option 
                        ? (feedback[index]?.correct ? 'green.800' : 'red.800')
                        : 'gray.600',
                    fontWeight: answers[index] === option ? 'bold' : 'normal',
                    opacity: feedback[index] && answers[index] !== option ? 0.6 : 1
                  }}
                >
                  {option}
                  {answers[index] === option && feedback[index] && (
                    feedback[index].correct ? ' ✅' : ' ❌'
                  )}
                </Button>
              ))}
            </Box>

            {feedback[index] && (
              <Box sx={{
                padding: '1rem',
                backgroundColor: feedback[index].correct ? 'cyan.100' : 'red.100',
                color: feedback[index].correct ? 'cyan.800' : 'red.800',
                borderRadius: '4px',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                <strong>
                  {feedback[index].correct ? '✅ Correct!' : '❌ Incorrect.'} 
                </strong>
                <br />
                {feedback[index].explanation}
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Score and Reset */}
      <Box sx={{ 
        textAlign: 'center', 
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: 'blue.50',
        borderRadius: '8px'
      }}>
        {Object.keys(feedback).length > 0 && (
          <Text sx={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'blue.800' }}>
            <strong>Score: {getScore()} out of {questions.length}</strong>
            {getScore() === questions.length && " 🎉 Perfect!"}
          </Text>
        )}
        
        <Button
          onClick={resetExercise}
          sx={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'gray.500',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Reset Exercise
        </Button>
      </Box>
    </Box>
  );
};

export default PronounFillBlanks;