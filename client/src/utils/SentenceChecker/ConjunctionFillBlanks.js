import { Box, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const ConjunctionFillBlanks = () => {
  const [answers, setAnswers] = useState({});

  const exercises = [
    {
      id: 0,
      text: "___ it was raining, we stayed inside.",
      options: ["Because", "Because,"],
      correct: "Because",
      explanation: "Correct! When front-loading a subordinating conjunction, the comma goes at the end of the dependent clause, not right after the conjunction."
    },
    {
      id: 1,
      text: "I wanted to go to the park ___ it started raining.",
      options: ["but", ", but"],
      correct: ", but",
      explanation: "Correct! 'But' is a coordinating conjunction (FANBOYS) joining two independent clauses, so it needs a comma before it."
    },
    {
      id: 2,
      text: "We will go to the beach ___ the weather is nice.",
      options: ["if", ", if"],
      correct: "if",
      explanation: "Correct! When a subordinating conjunction is in the middle of a sentence, you do NOT need a comma."
    },
    {
      id: 3,
      text: "___ the dog is playfully happy, the cat is quietly content.",
      options: ["Although", "Although,"],
      correct: "Although",
      explanation: "Correct! The comma belongs between the two independent clauses, not right after 'Although'."
    }
  ];

  const handleSelect = (exerciseId, option) => {
    setAnswers(prev => ({
      ...prev,
      [exerciseId]: option
    }));
  };

  return (
    <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {exercises.map((ex) => {
        const userAnswer = answers[ex.id];
        const isAnswered = userAnswer !== undefined;
        const isCorrect = userAnswer === ex.correct;

        // Replace the blank with the selected answer for a cool visual effect
        const displayText = isAnswered 
          ? ex.text.replace("___", userAnswer) 
          : ex.text;

        return (
          <Box key={ex.id} sx={{ background: 'gray.50', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0' }}>
            
            <Text style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#1A0933', marginBottom: '15px' }}>
              {ex.id + 1}. {displayText}
            </Text>

            <Box style={{ display: 'flex', gap: '10px', marginBottom: isAnswered ? '15px' : '0' }}>
              {ex.options.map(option => (
                <Button 
                  key={option} 
                  onClick={() => handleSelect(ex.id, option)}
                  style={{ 
                    padding: '8px 16px', 
                    fontSize: '0.95rem', 
                    fontWeight: 'bold', 
                    background: userAnswer === option ? 'blue.700' : 'blue.50', 
                    color: userAnswer === option ? 'white' : 'blue.800', 
                    border: '2px solid blue.700', 
                    borderRadius: '6px', 
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {option}
                </Button>
              ))}
            </Box>

            {/* Validation Feedback Box */}
            {isAnswered && (
              <Box style={{ 
                padding: '12px', 
                borderRadius: '6px', 
                background: isCorrect ? 'green.100' : 'red.100', 
                color: isCorrect ? 'green.800' : 'red.800',
                borderLeft: `4px solid ${isCorrect ? 'green.500' : 'red.500'}`
              }}>
                <strong>{isCorrect ? '✅ Correct: ' : '❌ Incorrect: '}</strong> 
                {isCorrect ? ex.explanation : "Check your comma rules and try the other option!"}
              </Box>
            )}
            
          </Box>
        );
      })}
      
    </Box>
  );
};

export default ConjunctionFillBlanks;