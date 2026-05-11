import React, { useState, useEffect } from 'react';
import { Box, Button, Progress, VStack, Heading, Text, Flex } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import MultipleChoiceGame from './multipleChoiceGame';

const MultipleChoiceWrapper = ({ questionsToPlay, nextPath }) => {
  const [gameDeck, setGameDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const history = useHistory();

  const startNewGame = () => {
    const shuffled = [...questionsToPlay].sort(() => Math.random() - 0.5).slice(0, 15);
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
    <Box maxW="1000px" mx="auto" p={6}>
      <Box mb={8} p={4} bg="white" borderRadius="xl" border="3px solid #1A1A1A" boxShadow="4px 4px 0px #1A1A1A">
        <Flex justify="space-between" mb={2}>
          <Text fontWeight="bold">Progress</Text>
          <Text fontWeight="bold">{isGameOver ? 15 : currentIndex}/15</Text>
        </Flex>
        <Progress value={progressPercent} colorScheme="green" height="15px" borderRadius="full" border="2px solid #1A1A1A" />
      </Box>

      {!isGameOver ? (
        <MultipleChoiceGame question={gameDeck[currentIndex]} onNext={handleNext} />
      ) : (
        <Box bg={mistakes === 0 ? "#00E676" : "#FF1053"} p={10} borderRadius="2xl" border="4px solid #1A1A1A" textAlign="center" color="white">
          <Heading size="2xl" mb={4}>{mistakes === 0 ? "🎉 Mastery Achieved!" : "❌ Keep Practicing"}</Heading>
          <Text fontSize="xl" fontWeight="bold" mb={8}>
            {mistakes === 0 ? "You got 15/15! You can move to the next section." : "You missed a few. You need 100% to unlock the next level."}
          </Text>
          <Button size="lg" bg="white" color="#1A1A1A" onClick={mistakes === 0 ? () => history.push(nextPath) : startNewGame}>
            {mistakes === 0 ? "Next Level ➡️" : "Try Again 🔄"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MultipleChoiceWrapper;