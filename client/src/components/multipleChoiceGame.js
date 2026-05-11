import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, SimpleGrid, VStack } from '@chakra-ui/react';

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
    setSelectedOptions(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const checkAnswer = () => {
    setAttempts(prev => prev + 1);
    const correctAnswers = question.answer;
    if (selectedOptions.length !== correctAnswers.length) {
      setIsCorrect(false);
      return;
    }
    const allRight = selectedOptions.every(opt => correctAnswers.includes(opt));
    setIsCorrect(allRight);
  };

  return (
    <Box bg="white" p={8} borderRadius="2xl" borderWidth="4px" borderColor="#1A1A1A" boxShadow="8px 8px 0px #1A1A1A" w="100%">
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Heading size="lg" color="#1A0933" mb={2}>{question.question_text}</Heading>
          <Text color="#9D4EDD" fontWeight="bold">(Select all that apply!)</Text>
        </Box>

        <SimpleGrid columns={[1, null, 2]} spacing={4}>
          {question.options.map(option => {
            const isSelected = selectedOptions.includes(option);
            return (
              <Button
                key={option}
                onClick={() => handleToggleOption(option)}
                bg={isSelected ? "#00F5D4" : "gray.50"}
                height="80px"
                whiteSpace="normal"
                borderRadius="xl"
                borderWidth="3px"
                borderColor="#1A1A1A"
                boxShadow={isSelected ? "none" : "4px 4px 0px #1A1A1A"}
                transform={isSelected ? "translateY(4px)" : "none"}
                isDisabled={isCorrect}
              >
                {option}
              </Button>
            );
          })}
        </SimpleGrid>

        <VStack>
          {!isCorrect && (
            <Button onClick={checkAnswer} isDisabled={selectedOptions.length === 0} bg="#FFEA00" size="lg" borderWidth="3px" borderColor="#1A1A1A">
              Check Answer
            </Button>
          )}
          {isCorrect === true && (
            <Box bg="#00E676" p={4} borderRadius="xl" border="3px solid #1A1A1A" w="100%" textAlign="center">
              <Text fontWeight="bold" mb={3}>🎉 {question.explanation}</Text>
              <Button onClick={() => onNext(attempts === 1)} bg="#FF1053" color="white">Next Question ➡️</Button>
            </Box>
          )}
          {isCorrect === false && (
            <Text color="#FF1053" fontWeight="bold">Not quite! Try adjusting your choices.</Text>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default MultipleChoiceGame;