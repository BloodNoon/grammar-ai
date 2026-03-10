import React, { useState, useEffect } from 'react';
import { Box, Button, Progress, VStack, Heading, Text, Flex } from '@chakra-ui/react';
import MultipleChoiceGame from './multipleChoiceGame';

const MultipleChoiceWrapper = ({ questionsToPlay }) => {
  const [gameDeck, setGameDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startNewGame = () => {
    const shuffled = [...questionsToPlay].sort(() => Math.random() - 0.5).slice(0, 3);
    setGameDeck(shuffled);
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (questionsToPlay && questionsToPlay.length > 0) {
      startNewGame();
    }
  }, [questionsToPlay]);

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  if (gameDeck.length === 0) return null;

  const isGameOver = currentIndex >= gameDeck.length;
  const progressPercent = (currentIndex / gameDeck.length) * 100;

  return (
    <Box maxW="900px" mx="auto" p={6} fontFamily="'Inter', sans-serif">
      <Box mb={8}>
         <Flex justify="space-between" mb={2}>
           <Text fontWeight="bold" color="#1A0933" fontSize="lg">Level Progress</Text>
           <Text fontWeight="bold" color="#1A0933" fontSize="lg">
             {isGameOver ? gameDeck.length : currentIndex} / {gameDeck.length}
           </Text>
         </Flex>
         <Progress 
           value={progressPercent} 
           size="lg" 
           colorScheme="purple" 
           borderRadius="md" 
           borderWidth="2px" 
           borderColor="#1A1A1A" 
           boxShadow="2px 2px 0px #1A1A1A"
           bg="white"
         />
      </Box>

      {!isGameOver ? (
        <VStack spacing={6}>
          <MultipleChoiceGame 
            key={gameDeck[currentIndex].id} 
            question={gameDeck[currentIndex]} 
            onNext={handleNext} 
          />
        </VStack>
      ) : (
        <Box 
          bg="#4361EE" // Deep Sea Blue
          p={10} 
          borderRadius="2xl" 
          textAlign="center" 
          borderWidth="4px" 
          borderColor="#1A1A1A" 
          boxShadow="8px 8px 0px #1A1A1A"
        >
          <Heading color="white" mb={4} size="2xl">🎉 Awesome Job! 🎉</Heading>
          <Text fontSize="xl" color="white" mb={8} fontWeight="bold">
            You crushed those questions!
          </Text>
          <Button 
            onClick={startNewGame} 
            bg="#00F5D4" // Laser Cyan
            color="#1A1A1A"
            size="lg"
            px={10}
            borderWidth="3px"
            borderColor="#1A1A1A"
            boxShadow="4px 4px 0px #1A1A1A"
            _hover={{ transform: "translateY(-2px)" }}
            _active={{ transform: "translateY(4px)" }}
          >
            Play Again 🔄
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MultipleChoiceWrapper;