import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, SimpleGrid, VStack } from '@chakra-ui/react';

const MultipleChoiceGame = ({ question, onNext }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);

  // Reset the selections when a new question loads
  useEffect(() => {
    setSelectedOptions([]);
    setIsCorrect(null);
  }, [question]);

  // Toggle button state (turn it on or off)
  const handleToggleOption = (option) => {
    // If they already submitted and got it right, freeze the buttons
    if (isCorrect) return;

    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option); // Remove it
      } else {
        return [...prev, option]; // Add it
      }
    });
  };

  const checkAnswer = () => {
    const correctAnswers = question.answer; // Array of correct answers from JSON
    
    // Check if they selected the exact right amount of options
    if (selectedOptions.length !== correctAnswers.length) {
      setIsCorrect(false);
      return;
    }

    // Check if every option they selected is in the correct answers array
    const allRight = selectedOptions.every(opt => correctAnswers.includes(opt));
    setIsCorrect(allRight);
  };

  return (
    <Box 
      bg="#9D4EDD" // Electric Purple background
      p={8} 
      borderRadius="2xl" 
      borderWidth="4px" 
      borderColor="#1A1A1A" 
      boxShadow="8px 8px 0px #1A1A1A"
      maxW="800px"
      mx="auto"
      textAlign="center"
    >
      <Heading color="white" textShadow="2px 2px 0px #1A1A1A" mb={2}>
        {question.question_text}
      </Heading>
      <Text color="#FFEA00" fontWeight="bold" fontSize="xl" mb={6}>
        (Select all that apply!)
      </Text>

      {/* The Grid of Options */}
      <SimpleGrid columns={[1, null, 2]} spacing={4} mb={8}>
        {question.options.map(option => {
          const isSelected = selectedOptions.includes(option);
          
          return (
            <Button
              key={option}
              onClick={() => handleToggleOption(option)}
              // If selected, turn Laser Cyan. If not, stay white.
              bg={isSelected ? "#00F5D4" : "white"} 
              color="#1A1A1A"
              fontSize="xl"
              fontWeight="extrabold"
              height="80px"
              whiteSpace="normal"
              borderRadius="xl"
              borderWidth="4px"
              borderColor="#1A1A1A"
              // If selected, push the button down into the shadow
              boxShadow={isSelected ? "0px 0px 0px #1A1A1A" : "6px 6px 0px #1A1A1A"}
              transform={isSelected ? "translateY(6px)" : "none"}
              transition="all 0.1s"
              _hover={{
                bg: isSelected ? "#00F5D4" : "#f0f0f0",
              }}
            >
              {option}
            </Button>
          );
        })}
      </SimpleGrid>

      <VStack spacing={6}>
        {isCorrect !== true && (
          <Button
            onClick={checkAnswer}
            isDisabled={selectedOptions.length === 0} // Prevent submitting an empty answer
            bg="#FFEA00" 
            color="#1A1A1A"
            size="lg"
            px={10}
            borderWidth="3px"
            borderColor="#1A1A1A"
            boxShadow="4px 4px 0px #1A1A1A"
            fontWeight="extrabold"
            _hover={{ transform: "translateY(-2px)", boxShadow: "6px 6px 0px #1A1A1A" }}
            _active={{ transform: "translateY(4px)", boxShadow: "0px 0px 0px #1A1A1A" }}
          >
            Submit Answer
          </Button>
        )}

        {isCorrect === true && (
          <Box bg="#00E676" px={6} py={4} borderRadius="lg" borderWidth="3px" borderColor="#1A1A1A" w="100%">
            <Text color="#062A17" fontWeight="bold" fontSize="xl" mb={3}>
              🎉 Spot on! {question.explanation}
            </Text>
            <Button 
              onClick={onNext}
              bg="#FF1053" 
              color="white" 
              size="lg"
              borderWidth="2px"
              borderColor="#1A1A1A"
              boxShadow="2px 2px 0px #1A1A1A"
              _hover={{ transform: "translateY(-2px)" }}
            >
              Next Question ➡️
            </Button>
          </Box>
        )}

        {isCorrect === false && (
          <Box bg="#FF1053" px={6} py={2} borderRadius="lg" borderWidth="3px" borderColor="#1A1A1A">
            <Text color="white" fontWeight="bold">Not quite! Double-check your choices.</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default MultipleChoiceGame;