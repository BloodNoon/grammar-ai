import React, { useState } from "react";
import {
  Box,
  Button,
  Progress,
  VStack,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import TypingGame from "./typingGame";

const TypingGameWrapper = ({ questionsToPlay, nextPath }) => {
  const [gameDeck, setGameDeck] = useState(() => {
    const shuffled = [...(questionsToPlay || [])]
      .sort(() => Math.random() - 0.5)
      .slice(0, 15);
    return shuffled;
  });
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

  const handleNext = (isPerfect) => {
    if (!isPerfect) setMistakes((prev) => prev + 1);
    setCurrentIndex((prev) => prev + 1);
  };

  if (gameDeck.length === 0) return null;
  const isGameOver = currentIndex >= gameDeck.length;
  const progressPercent = (currentIndex / gameDeck.length) * 100;

  return (
    <Box maxW="1000px" mx="auto" p={6} fontFamily="'Inter', sans-serif">
      <Box
        mb={8}
        p={4}
        bg="white"
        borderRadius="xl"
        borderWidth="3px"
        borderColor="ink.900"
        boxShadow="neu"
      >
        <Flex justify="space-between" mb={2}>
          <Text fontWeight="bold">Typing Progress</Text>
          <Text fontWeight="bold">{isGameOver ? 15 : currentIndex} / 15</Text>
        </Flex>
        <Progress
          value={progressPercent}
          size="lg"
          colorScheme="blue"
          borderRadius="full"
          borderWidth="2px"
          borderColor="ink.900"
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
          bg={mistakes === 0 ? "accent.green" : "accent.red"}
          p={10}
          borderRadius="2xl"
          textAlign="center"
          borderWidth="4px"
          borderColor="ink.900"
          boxShadow="neu-lg"
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
            onClick={
              mistakes === 0 ? () => history.push(nextPath) : startNewGame
            }
            bg="white"
            color="ink.900"
            size="lg"
            px={10}
            borderWidth="3px"
            borderColor="ink.900"
            boxShadow="neu"
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
