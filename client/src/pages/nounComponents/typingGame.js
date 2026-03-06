import React, { useState, useEffect, useRef } from 'react';
import { Box, Heading, Text, Button, Input, VStack } from '@chakra-ui/react';

const TypingGame = ({ question, onNext }) => {
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  
  // This helps us automatically focus the input box so kids can just start typing!
  const inputRef = useRef(null);

  useEffect(() => {
    // Reset everything when a new question loads
    setInputValue("");
    setIsCorrect(null);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [question]);

  const checkAnswer = () => {
const correctAnswer = question.answer[0]; //
    
    // This helper cleans up strings:
    // 1. toLowerCase() makes it all lowercase
    // 2. replace(/[.,?!]/g, "") deletes any accidental periods, commas, or question marks
    // 3. trim() removes spaces at the very beginning or end
    const sanitize = (str) => str.toLowerCase().replace(/[.,?!]/g, "").trim();

    // Now we compare the cleaned-up versions!
    if (sanitize(inputValue) === sanitize(correctAnswer)) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isCorrect !== true) {
      checkAnswer();
    }
  };

  return (
    <Box 
      bg="#4361EE" // Deep Sea Blue
      p={8} 
      borderRadius="2xl" 
      borderWidth="4px" 
      borderColor="#1A1A1A" 
      boxShadow="8px 8px 0px #1A1A1A"
      maxW="700px"
      mx="auto"
      textAlign="center"
    >
      <Heading color="white" textShadow="2px 2px 0px #1A1A1A" mb={4}>
        {question.question_text}
      </Heading>

      {/* If the question provides options as a hint, we can show them! */}
      {question.options && (
        <Text color="#FFEA00" fontWeight="bold" fontSize="xl" mb={6}>
          Word Bank: {question.options.join(" • ")}
        </Text>
      )}

      <VStack spacing={6}>
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          isDisabled={isCorrect === true}
          placeholder="Type your answer..."
          bg="white"
          color="#1A1A1A"
          fontSize="2xl"
          fontWeight="extrabold"
          textAlign="center"
          height="80px"
          borderRadius="xl"
          borderWidth="4px"
          borderColor="#1A1A1A"
          boxShadow="4px 4px 0px #1A1A1A"
          _focus={{ borderColor: "#FF1053", boxShadow: "0px 0px 0px" }}
        />

        {isCorrect !== true && (
          <Button
            onClick={checkAnswer}
            bg="#FFEA00" // Star Coin Yellow
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
              🎉 Correct! {question.explanation}
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
            <Text color="white" fontWeight="bold">Oops! Check your spelling and try again.</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default TypingGame;