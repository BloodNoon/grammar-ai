import React, { useState, useEffect } from "react";
import { Box, Heading, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import { GameCard, OptionButton, ActionButton, FeedbackBanner } from "./ui";

const MultipleChoiceGame = ({ question, onNext }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setSelectedOptions([]);
    setIsCorrect(null);
    setAttempts(0);
  }, [question]);

  const handleToggleOption = (option) => {
    if (isCorrect) return;
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  const checkAnswer = () => {
    setAttempts((prev) => prev + 1);
    const correctAnswers = question.answer;
    if (selectedOptions.length !== correctAnswers.length) {
      setIsCorrect(false);
      return;
    }
    const allRight = selectedOptions.every((opt) =>
      correctAnswers.includes(opt),
    );
    setIsCorrect(allRight);
  };

  return (
    <GameCard variant="game">
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" color="ink.700" mb={2}>
            {question.question_text}
          </Heading>
          <Text color="purple.500" fontWeight="bold">
            (Select all that apply!)
          </Text>
        </Box>

        <SimpleGrid columns={[1, null, 2]} spacing={4}>
          {question.options.map((option) => {
            const isSelected = selectedOptions.includes(option);
            return (
              <OptionButton
                key={option}
                isSelected={isSelected}
                onClick={() => handleToggleOption(option)}
                isDisabled={isCorrect}
                height="80px"
                borderRadius="xl"
                borderWidth="3px"
                justifyContent="center"
              >
                {option}
              </OptionButton>
            );
          })}
        </SimpleGrid>

        <VStack>
          {!isCorrect && (
            <ActionButton
              variant="check"
              onClick={checkAnswer}
              isDisabled={selectedOptions.length === 0}
              size="lg"
            >
              Check Answer
            </ActionButton>
          )}
          {isCorrect === true && (
            <FeedbackBanner type="success" w="100%">
              <Text fontWeight="bold" mb={3}>
                🎉 {question.explanation}
              </Text>
              <ActionButton
                variant="danger"
                onClick={() => onNext(attempts === 1)}
              >
                Next Question ➡️
              </ActionButton>
            </FeedbackBanner>
          )}
          {isCorrect === false && (
            <Text color="accent.red" fontWeight="bold">
              Not quite! Try adjusting your choices.
            </Text>
          )}
        </VStack>
      </VStack>
    </GameCard>
  );
};

export default MultipleChoiceGame;
