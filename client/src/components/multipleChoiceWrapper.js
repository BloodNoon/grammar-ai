import React, { useState } from "react";
import { Box, Button, Progress, Heading, Text, Flex } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import MultipleChoiceGame from "./multipleChoiceGame";

const MultipleChoiceWrapper = ({ questionsToPlay, nextPath }) => {
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
    <Box maxW="1000px" mx="auto" p={6}>
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
          <Text fontWeight="bold">Progress</Text>
          <Text fontWeight="bold">{isGameOver ? 15 : currentIndex}/15</Text>
        </Flex>
        <Progress
          value={progressPercent}
          colorScheme="green"
          height="15px"
          borderRadius="full"
          borderWidth="2px"
          borderColor="ink.900"
        />
      </Box>

      {!isGameOver ? (
        <MultipleChoiceGame
          question={gameDeck[currentIndex]}
          onNext={handleNext}
        />
      ) : (
        <Box
          bg={mistakes === 0 ? "#00E676" : "#FF1053"}
          p={10}
          borderRadius="2xl"
          borderWidth="4px"
          borderColor="ink.900"
          textAlign="center"
          color="white"
        >
          <Heading size="2xl" mb={4}>
            {mistakes === 0 ? "🎉 Mastery Achieved!" : "❌ Keep Practicing"}
          </Heading>
          <Text fontSize="xl" fontWeight="bold" mb={8}>
            {mistakes === 0
              ? "You got 15/15! You can move to the next section."
              : "You missed a few. You need 100% to unlock the next level."}
          </Text>
          <Button
            size="lg"
            bg="white"
            color="ink.900"
            onClick={
              mistakes === 0 ? () => history.push(nextPath) : startNewGame
            }
          >
            {mistakes === 0 ? "Next Level ➡️" : "Try Again 🔄"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MultipleChoiceWrapper;
