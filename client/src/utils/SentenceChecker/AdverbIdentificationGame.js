import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const AdverbIdentificationGame = () => {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const sentences = [
    {
      text: "She sings beautifully in the choir.",
      words: ["She", "sings", "beautifully", "in", "the", "choir."],
      adverbs: ["beautifully"],
      explanation: "'Beautifully' is an adverb of manner that describes HOW she sings."
    },
    {
      text: "Yesterday, I worked very hard.",
      words: ["Yesterday,", "I", "worked", "very", "hard."],
      adverbs: ["Yesterday,", "very"],
      explanation: "'Yesterday' tells us WHEN, and 'very' intensifies the adverb 'hard'."
    },
    {
      text: "The cat quickly ran outside.",
      words: ["The", "cat", "quickly", "ran", "outside."],
      adverbs: ["quickly", "outside"],
      explanation: "'Quickly' describes HOW the cat ran, 'outside' describes WHERE it ran."
    },
    {
      text: "He always speaks clearly here.",
      words: ["He", "always", "speaks", "clearly", "here."],
      adverbs: ["always", "clearly", "here"],
      explanation: "'Always' (frequency), 'clearly' (manner), and 'here' (place) are all adverbs."
    },
    {
      text: "The extremely tall building stands proudly downtown.",
      words: ["The", "extremely", "tall", "building", "stands", "proudly", "downtown."],
      adverbs: ["extremely", "proudly", "downtown"],
      explanation: "'Extremely' modifies the adjective 'tall', 'proudly' describes how it stands, 'downtown' tells us where."
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    setCurrentSentence(0);
    setSelectedWords([]);
    setFeedback(null);
    setScore(0);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentSentence(0);
    setSelectedWords([]);
    setFeedback(null);
    setScore(0);
  };

  const handleWordClick = (word, index) => {
    if (feedback) return; // Don't allow changes after feedback

    const wordKey = `${word}-${index}`;
    if (selectedWords.includes(wordKey)) {
      setSelectedWords(selectedWords.filter(w => w !== wordKey));
    } else {
      setSelectedWords([...selectedWords, wordKey]);
    }
  };

  const checkAnswer = () => {
    const current = sentences[currentSentence];
    const selectedAdverbs = selectedWords.map(wordKey => wordKey.split('-')[0]);
    
    const correctAdverbs = current.adverbs;
    const isCorrect = correctAdverbs.length === selectedAdverbs.length &&
                     correctAdverbs.every(adverb => selectedAdverbs.includes(adverb));

    if (isCorrect) {
      setScore(score + 1);
      setFeedback({ correct: true, message: "Perfect! " + current.explanation });
    } else {
      setFeedback({ 
        correct: false, 
        message: `Not quite right. The adverbs are: ${correctAdverbs.join(', ')}. ${current.explanation}` 
      });
    }
  };

  const nextSentence = () => {
    if (currentSentence < sentences.length - 1) {
      setCurrentSentence(currentSentence + 1);
      setSelectedWords([]);
      setFeedback(null);
    } else {
      alert(`Game Complete! Final Score: ${score}/${sentences.length}`);
      resetGame();
    }
  };

  if (!gameStarted) {
    return (
      <Box sx={{
        marginTop: '2rem',
        padding: '2rem',
        backgroundColor: 'blue.50',
        borderRadius: '10px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        border: '2px solid blue.700'
      }}>
        <Heading as="h2" size="lg" sx={{ color: 'blue.800', marginBottom: '1rem' }}>🎯 Adverb Identification Game</Heading>
        <Text sx={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'gray.500' }}>
          Click on all the adverbs in each sentence. Test your skills with 5 different sentences!
        </Text>
        <Button
          onClick={startGame}
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
          Start Game
        </Button>
      </Box>
    );
  }

  const current = sentences[currentSentence];

  return (
    <Box sx={{
      marginTop: '2rem',
      padding: '2rem',
      backgroundColor: 'blue.50',
      borderRadius: '10px',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      border: '2px solid blue.700'
    }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Heading as="h2" size="lg" sx={{ color: 'blue.800', margin: 0 }}>🎯 Find the Adverbs</Heading>
        <Box sx={{ color: 'gray.500' }}>
          Sentence {currentSentence + 1} of {sentences.length} | Score: {score}/{sentences.length}
        </Box>
      </Box>

      <Text sx={{ fontSize: '1rem', marginBottom: '1rem', color: 'gray.500' }}>
        Click on all the adverbs in this sentence:
      </Text>

      <Box style={{
        fontSize: '1.2rem',
        lineHeight: '1.8',
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid gray.200'
      }}>
        {current.words.map((word, index) => {
          const wordKey = `${word}-${index}`;
          const isSelected = selectedWords.includes(wordKey);
          const isAdverb = current.adverbs.includes(word);
          
          let backgroundColor = 'white';
          let color = 'gray.700';
          let border = '1px solid transparent';

          if (feedback) {
            if (isAdverb) {
              backgroundColor = 'green.100';
              color = 'green.800';
              border = '2px solid green.500';
            }
            if (isSelected && !isAdverb) {
              backgroundColor = 'red.100';
              color = 'red.800';
              border = '2px solid red.500';
            }
          } else if (isSelected) {
            backgroundColor = 'yellow.100';
            color = 'yellow.800';
            border = '2px solid yellow.400';
          }

          return (
            <Text as="span"
              key={index}
              onClick={() => handleWordClick(word, index)}
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.5rem',
                margin: '0.125rem',
                backgroundColor,
                color,
                border,
                borderRadius: '4px',
                cursor: feedback ? 'default' : 'pointer',
                userSelect: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {word}
            </Text>
          );
        })}
      </Box>

      {feedback && (
        <Box style={{
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: feedback.correct ? 'green.100' : 'red.100',
          color: feedback.correct ? 'green.800' : 'red.800',
          borderRadius: '4px',
          border: `1px solid ${feedback.correct ? 'green.200' : 'red.200'}`
        }}>
          <strong>{feedback.correct ? '✅ Correct!' : '❌ Incorrect'}</strong>
          <br />
          {feedback.message}
        </Box>
      )}

      <Box style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {!feedback ? (
          <Button
            onClick={checkAnswer}
            disabled={selectedWords.length === 0}
            sx={{
              backgroundColor: selectedWords.length > 0 ? 'green.500' : 'gray.300',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: selectedWords.length > 0 ? 'pointer' : 'not-allowed',
              fontWeight: 'bold'
            }}
          >
            Check Answer
          </Button>
        ) : (
          <Button
            onClick={nextSentence}
            sx={{
              backgroundColor: 'blue.700',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {currentSentence < sentences.length - 1 ? 'Next Sentence' : 'Finish Game'}
          </Button>
        )}

        <Button
          onClick={resetGame}
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
          Reset Game
        </Button>
      </Box>
    </Box>
  );
};

export default AdverbIdentificationGame;