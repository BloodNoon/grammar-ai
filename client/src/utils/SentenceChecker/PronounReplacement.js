import { Box, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const PronounReplacement = () => {
  const [answers, setAnswers] = useState({});

  const exercises = [
    {
      id: 0,
      sentence: "Maria gave the book to John.",
      highlight: "Maria",
      options: ["He", "She", "They"],
      correct: "She",
      explanation: "Since Maria is the subject acting in the sentence, we use the subject pronoun 'She'."
    },
    {
      id: 1,
      sentence: "The dog chased the ball.",
      highlight: "the ball",
      options: ["it", "them", "him"],
      correct: "it",
      explanation: "'The ball' is an object and a thing, so we replace it with 'it'."
    },
    {
      id: 2,
      sentence: "Those shoes belong to me and my brother.",
      highlight: "me and my brother",
      options: ["us", "we", "them"],
      correct: "us",
      explanation: "Since 'me and my brother' are receiving the action (object), we use 'us', not 'we'."
    }
  ];

  const handleSelect = (exerciseId, option) => {
    setAnswers(prev => ({ ...prev, [exerciseId]: option }));
  };

  return (
    <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {exercises.map((ex) => {
        const userAnswer = answers[ex.id];
        const isAnswered = userAnswer !== undefined;
        const isCorrect = userAnswer === ex.correct;

        return (
          <Box key={ex.id} sx={{ background: 'gray.50', padding: '15px', borderRadius: '10px', border: '2px solid #e2e8f0' }}>
            <Text style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '10px' }}>
              Replace the bolded noun(s): <br/>
              <Text as="span" style={{fontWeight: 'bold', fontSize: '1.2rem'}}>
                {ex.sentence.replace(ex.highlight, '')}
                <Text as="span" style={{ color: isAnswered ? '#16a34a' : '#d97706', background: isAnswered ? '#dcfce7' : '#fef3c7', padding: '2px 6px', borderRadius: '4px' }}>
                  {isAnswered ? userAnswer : ex.highlight}
                </Text>
              </Text>
            </Text>

            <Box style={{ display: 'flex', gap: '8px', marginBottom: isAnswered ? '10px' : '0' }}>
              {ex.options.map(opt => (
                <Button 
                  key={opt} 
                  onClick={() => handleSelect(ex.id, opt)}
                  style={{ padding: '6px 12px', fontWeight: 'bold', background: userAnswer === opt ? 'blue.700' : 'blue.50', color: userAnswer === opt ? 'white' : 'blue.800', border: '2px solid blue.700', borderRadius: '6px', cursor: 'pointer' }}
                >
                  {opt}
                </Button>
              ))}
            </Box>

            {isAnswered && (
              <Box style={{ padding: '10px', borderRadius: '6px', background: isCorrect ? '#dcfce7' : '#fee2e2', color: isCorrect ? '#15803d' : '#b91c1c', fontSize: '0.9rem' }}>
                <strong>{isCorrect ? '✅ ' : '❌ '}</strong> {isCorrect ? ex.explanation : "Try a different pronoun!"}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default PronounReplacement;