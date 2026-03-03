import React, { useState, useEffect } from 'react';
import { Box, Button, Progress, VStack, Heading, Text, Flex } from '@chakra-ui/react';
import SortingGame from './sortingComponent';
import allQuestions from './nouns_questions.json'; // Make sure this path is correct for your project

const SortingGameWrapper = () => {
  const [gameDeck, setGameDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startNewGame = () => {
    // 1. Filter for sorting questions
    const sortingQuestions = allQuestions.filter(q => q.topic === "Sorting Nouns");
    
    // 2. Shuffle and cap at 3
    const shuffled = [...sortingQuestions].sort(() => Math.random() - 0.5).slice(0, 3);
    
    setGameDeck(shuffled);
    setCurrentIndex(0);
  };

  useEffect(() => {
    startNewGame();
  }, []);

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
          <SortingGame 
            key={gameDeck[currentIndex].id} 
            question={gameDeck[currentIndex]} 
            onNext={handleNext} // Passing the "next" function down to the game board
          />
        </VStack>
      ) : (
        <Box 
          bg="#00E676" 
          p={10} 
          borderRadius="2xl" 
          textAlign="center" 
          borderWidth="4px" 
          borderColor="#1A1A1A" 
          boxShadow="8px 8px 0px #1A1A1A"
        >
          <Heading color="#062A17" mb={4} size="2xl">🎉 Level Complete! 🎉</Heading>
          <Text fontSize="xl" color="#062A17" mb={8} fontWeight="bold">
            You are a sorting master!
          </Text>
          <Button 
            onClick={startNewGame} 
            bg="#FFEA00" 
            color="#1A1A1A"
            size="lg"
            px={10}
            borderWidth="3px"
            borderColor="#1A1A1A"
            boxShadow="4px 4px 0px #1A1A1A"
            _hover={{ transform: "translateY(-2px)", boxShadow: "6px 6px 0px #1A1A1A" }}
            _active={{ transform: "translateY(4px)", boxShadow: "0px 0px 0px #1A1A1A" }}
          >
            Play Again 🔄
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SortingGameWrapper;