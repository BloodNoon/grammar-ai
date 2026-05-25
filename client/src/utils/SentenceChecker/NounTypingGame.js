import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const NounTypingGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  // The typing challenges
  const challenges = [
    { 
      type: "Plural Form", 
      prompt: "city", 
      answer: "cities", 
      hint: "Rule: Drop the 'y' and add 'ies'." 
    },
    { 
      type: "Plural Form", 
      prompt: "wolf", 
      answer: "wolves", 
      hint: "Rule: Change the 'f' to a 'v' and add 'es'." 
    },
    { 
      type: "Abstract Noun", 
      prompt: "brave", 
      answer: "bravery", 
      hint: "Add a suffix to make it a state of being." 
    },
    { 
      type: "Collective Noun", 
      prompt: "birds", 
      answer: "flock", 
      hint: "A _____ of birds." 
    },
    { 
      type: "Plural Form", 
      prompt: "bus", 
      answer: "buses", 
      hint: "Rule: Words ending in 's' usually take 'es'." 
    }
  ];

  const currentChallenge = challenges[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TYPO-FORGIVING UX: Trim spaces and ignore case!
    const cleanInput = inputValue.toLowerCase().replace(/\s+/g, '');
    const cleanAnswer = currentChallenge.answer.toLowerCase().replace(/\s+/g, '');

    if (cleanInput === cleanAnswer) {
      setFeedback({ isCorrect: true, text: "✅ Perfect spelling!" });
    } else {
      setFeedback({ isCorrect: false, text: "❌ Not quite. Check your spelling or use a hint!" });
    }
  };

  const nextQuestion = () => {
    setCurrentIndex((prev) => (prev + 1) % challenges.length);
    setInputValue('');
    setFeedback(null);
    setShowHint(false);
  };

  return (
    <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <Box sx={{ background: 'gray.50', padding: '25px', borderRadius: '12px', border: '2px solid #e2e8f0', textAlign: 'center' }}>
        
        <Box style={{ display: 'inline-block', background: '#e0e7ff', color: '#4338ca', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {currentChallenge.type} Challenge ({currentIndex + 1}/{challenges.length})
        </Box>

        <Text style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '10px' }}>
          Type the correct noun form for:
        </Text>
        
        <Heading as="h2" size="lg" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1e293b', margin: '0 0 25px 0', letterSpacing: '2px' }}>
          {currentChallenge.prompt}
        </Heading>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={feedback?.isCorrect}
            placeholder="Type your answer..."
            autoComplete="off"
            style={{
              flex: 1,
              padding: '12px 20px',
              fontSize: '1.2rem',
              borderRadius: '8px',
              border: `2px solid ${feedback ? (feedback.isCorrect ? '#22c55e' : '#ef4444') : '#cbd5e1'}`,
              outline: 'none',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
              transition: 'all 0.2s'
            }}
          />
          {!feedback?.isCorrect && (
            <Button 
              type="submit" 
              style={{ padding: '0 20px', background: '#3b82f6', color: 'white', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
            >
              Check
            </Button>
          )}
        </form>

        {/* Feedback & Controls Area */}
        <Box style={{ minHeight: '60px', marginTop: '20px' }}>
          
          {feedback && (
            <Box style={{ padding: '12px', borderRadius: '8px', background: feedback.isCorrect ? '#dcfce7' : '#fee2e2', color: feedback.isCorrect ? '#15803d' : '#b91c1c', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '15px' }}>
              {feedback.text}
            </Box>
          )}

          {!feedback?.isCorrect && !showHint && (
            <Button onClick={() => setShowHint(true)} style={{ background: 'transparent', border: 'none', color: '#64748b', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.95rem' }}>
              I'm stuck. Give me a hint!
            </Button>
          )}

          {showHint && !feedback?.isCorrect && (
            <Box style={{ background: '#fef3c7', color: '#b45309', padding: '10px', borderRadius: '6px', fontSize: '0.95rem', fontWeight: '500', maxWidth: '400px', margin: '0 auto', border: '1px dashed #d97706' }}>
              💡 <strong>Hint:</strong> {currentChallenge.hint}
            </Box>
          )}

          {feedback?.isCorrect && (
            <Button onClick={nextQuestion} style={{ padding: '12px 30px', background: '#22c55e', color: 'white', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(34, 197, 94, 0.2)' }}>
              Next Question ➡️
            </Button>
          )}

        </Box>
      </Box>
    </Box>
  );
};

export default NounTypingGame;