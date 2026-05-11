import React, { useState, useEffect } from 'react';
import { Box, Button, Progress, VStack, Heading, Text, Flex } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import TypingGame from './typingGame';

const TypingGameWrapper = ({ questionsToPlay, nextPath }) => {
  const [gameDeck, setGameDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const history = useHistory();

  const startNewGame = () => {
    const shuffled = [...questionsToPlay]
      .sort(() => Math.random() - 0.5)
      .slice(0, 15);
    setGameDeck(shuffled);
    setCurrentIndex(0);
    setMistakes(0);
  };

  useEffect(() => {
    if (questionsToPlay?.length > 0) startNewGame();
  }, [questionsToPlay]);

  const handleNext = (isPerfect) => {
    if (!isPerfect) setMistakes(prev => prev + 1);
    setCurrentIndex(prev => prev + 1);
  };

  if (gameDeck.length === 0) return null;
  const isGameOver = currentIndex >= gameDeck.length;
  const progressPercent = (currentIndex / gameDeck.length) * 100;

  return (
    <Box maxW="1000px" mx="auto" p={6} fontFamily="'Inter', sans-serif">
      <Box mb={8} p={4} bg="white" borderRadius="xl" border="3px solid #1A1A1A" boxShadow="4px 4px 0px #1A1A1A">
        <Flex justify="space-between" mb={2}>
          <Text fontWeight="bold">Typing Progress</Text>
          <Text fontWeight="bold">{isGameOver ? 15 : currentIndex} / 15</Text>
        </Flex>
        <Progress 
          value={progressPercent} 
          size="lg" 
          colorScheme="blue" 
          borderRadius="full" 
          border="2px solid #1A1A1A" 
          bg="gray.100"
        />
      </Box>

      {!isGameOver ? (
        <VStack spacing={6}>
          <TypingGame 
            key={gameDeck[currentIndex].id} 
            question={gameDeck[currentIndex]} 
            onNext={handleNext} 
          />
        </VStack>
      ) : (
        <Box 
          bg={mistakes === 0 ? "#00E676" : "#FF1053"} 
          p={10} 
          borderRadius="2xl" 
          textAlign="center" 
          borderWidth="4px" 
          borderColor="#1A1A1A" 
          boxShadow="8px 8px 0px #1A1A1A"
          color="white"
        >
          <Heading mb={4} size="2xl">
            {mistakes === 0 ? "🎉 Mastery Achieved!" : "❌ Try Again"}
          </Heading>
          <Text fontSize="xl" mb={8} fontWeight="bold">
            {mistakes === 0 
              ? "You've successfully typed all 15 answers correctly!" 
              : "Keep practicing! You need 100% to move forward."}
          </Text>
          <Button 
            onClick={mistakes === 0 ? () => history.push(nextPath) : startNewGame} 
            bg="white" 
            color="#1A1A1A"
            size="lg"
            px={10}
            borderWidth="3px"
            borderColor="#1A1A1A"
            boxShadow="4px 4px 0px #1A1A1A"
            _hover={{ transform: "translateY(-2px)" }}
          >
            {mistakes === 0 ? "Next Lesson ➡️" : "Retry Practice 🔄"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TypingGameWrapper;