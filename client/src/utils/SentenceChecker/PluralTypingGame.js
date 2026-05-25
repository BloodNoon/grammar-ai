import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const PluralTypingGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const challenges = [
    { prompt: "cherry", answer: "cherries", hint: "Ends in consonant + y. Drop the y!" },
    { prompt: "watch", answer: "watches", hint: "Ends in 'ch'. Add 'es'." },
    { prompt: "leaf", answer: "leaves", hint: "Ends in 'f'. Change to 'ves'." },
    { prompt: "monkey", answer: "monkeys", hint: "Ends in vowel + y. Just add 's'." },
    { prompt: "tooth", answer: "teeth", hint: "This is completely irregular!" }
  ];

  const currentChallenge = challenges[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = inputValue.toLowerCase().replace(/\s+/g, '');
    const cleanAnswer = currentChallenge.answer.toLowerCase().replace(/\s+/g, '');

    if (cleanInput === cleanAnswer) {
      setFeedback({ isCorrect: true, text: "✅ Perfect spelling!" });
    } else {
      setFeedback({ isCorrect: false, text: "❌ Not quite. Check the rule or use a hint!" });
    }
  };

  const nextQuestion = () => {
    setCurrentIndex((prev) => (prev + 1) % challenges.length);
    setInputValue('');
    setFeedback(null);
    setShowHint(false);
  };

  return (
    <Box sx={{ background: 'gray.50', padding: '20px', borderRadius: '12px', border: '2px solid #e2e8f0', textAlign: 'center' }}>
      
      <Text style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '10px' }}>
        Type the plural form of: ({currentIndex + 1}/{challenges.length})
      </Text>
      
      <Heading as="h2" size="lg" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 20px 0' }}>
        {currentChallenge.prompt}
      </Heading>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center', maxWidth: '350px', margin: '0 auto' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={feedback?.isCorrect}
          placeholder="Type plural..."
          autoComplete="off"
          style={{
            flex: 1, padding: '12px', fontSize: '1.1rem', borderRadius: '8px',
            border: `2px solid ${feedback ? (feedback.isCorrect ? '#22c55e' : '#ef4444') : '#cbd5e1'}`, outline: 'none'
          }}
        />
        {!feedback?.isCorrect && (
          <Button type="submit" style={{ padding: '0 15px', background: '#3b82f6', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Check
          </Button>
        )}
      </form>

      <Box style={{ minHeight: '60px', marginTop: '15px' }}>
        {feedback && (
          <Box style={{ padding: '10px', borderRadius: '8px', background: feedback.isCorrect ? '#dcfce7' : '#fee2e2', color: feedback.isCorrect ? '#15803d' : '#b91c1c', fontWeight: 'bold', marginBottom: '10px' }}>
            {feedback.text}
          </Box>
        )}

        {!feedback?.isCorrect && !showHint && (
          <Button onClick={() => setShowHint(true)} style={{ background: 'transparent', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer' }}>
            I'm stuck. Give me a hint!
          </Button>
        )}

        {showHint && !feedback?.isCorrect && (
          <Box style={{ background: '#fef3c7', color: '#b45309', padding: '8px', borderRadius: '6px', fontSize: '0.95rem', maxWidth: '350px', margin: '0 auto', border: '1px dashed #d97706' }}>
            💡 <strong>Hint:</strong> {currentChallenge.hint}
          </Box>
        )}

        {feedback?.isCorrect && (
          <Button onClick={nextQuestion} style={{ padding: '10px 20px', background: '#22c55e', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Next Question ➡️
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PluralTypingGame;