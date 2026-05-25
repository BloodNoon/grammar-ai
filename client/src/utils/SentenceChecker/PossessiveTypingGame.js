import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const PossessiveTypingGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const challenges = [
    { prompt: "the toy belonging to the dog", answer: "the dog's toy", hint: "Dog is singular. Add 's." },
    { prompt: "the lounge for the teachers", answer: "the teachers' lounge", hint: "Teachers is plural and ends in 's'. Just add an apostrophe!" },
    { prompt: "the playground for the children", answer: "the children's playground", hint: "Children is plural but doesn't end in 's'. Add 's." },
    { prompt: "the desk belonging to the boss", answer: "the boss's desk", hint: "Boss is singular. Even though it ends in 's', usually we add 's." }
  ];

  const currentChallenge = challenges[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Forgiving on spaces and case, but strictly checks apostrophe placement!
    const cleanInput = inputValue.toLowerCase().replace(/\s+/g, '');
    const cleanAnswer = currentChallenge.answer.toLowerCase().replace(/\s+/g, '');

    if (cleanInput === cleanAnswer) {
      setFeedback({ isCorrect: true, text: "✅ Perfect punctuation!" });
    } else {
      setFeedback({ isCorrect: false, text: "❌ Not quite. Check your apostrophe placement!" });
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
        Rewrite this phrase using a possessive noun: ({currentIndex + 1}/{challenges.length})
      </Text>
      
      <Heading as="h2" size="lg" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 20px 0' }}>
        "{currentChallenge.prompt}"
      </Heading>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={feedback?.isCorrect}
          placeholder="e.g. the dog's toy"
          autoComplete="off"
          style={{
            flex: 1, padding: '12px', fontSize: '1.1rem', borderRadius: '8px',
            border: `2px solid ${feedback ? (feedback.isCorrect ? '#22c55e' : '#ef4444') : '#cbd5e1'}`, outline: 'none'
          }}
        />
        {!feedback?.isCorrect && (
          <Button type="submit" style={{ padding: '0 15px', background: '#f97316', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
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

export default PossessiveTypingGame;