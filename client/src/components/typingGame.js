import React, { useState, useEffect, useRef } from 'react';
import { Box, Heading, Text, Button, Input, VStack } from '@chakra-ui/react';

const TypingGame = ({ question, onNext }) => {
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue("");
    setIsCorrect(null);
    setAttempts(0);
    if (inputRef.current) inputRef.current.focus();
  }, [question]);

  const checkAnswer = () => {
    setAttempts(prev => prev + 1);
    const correctAnswer = question.answer[0];
    const sanitize = (str) => str.toLowerCase().replace(/[.,?!]/g, "").trim();

    if (sanitize(inputValue) === sanitize(correctAnswer)) setIsCorrect(true);
    else setIsCorrect(false);
  };

  return (
    <Box bg="white" p={8} borderRadius="2xl" borderWidth="4px" borderColor="#1A1A1A" boxShadow="8px 8px 0px #1A1A1A" w="100%" textAlign="center">
      <VStack spacing={6}>
        <Heading size="lg" color="#1A0933">{question.question_text || question.prompt_text}</Heading>
        {question.options && <Text color="#9D4EDD" fontWeight="bold">Word Bank: {question.options.join(" • ")}</Text>}
        
        <Input ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !isCorrect && checkAnswer()} isDisabled={isCorrect} placeholder="Type your answer..." bg="gray.50" height="70px" fontSize="2xl" fontWeight="bold" textAlign="center" borderRadius="xl" border="3px solid #1A1A1A" _focus={{ borderColor: "#00F5D4" }} />

        {!isCorrect && <Button onClick={checkAnswer} bg="#FFEA00" size="lg" borderWidth="3px" borderColor="#1A1A1A" boxShadow="4px 4px 0px #1A1A1A">Submit</Button>}
        {isCorrect && (
          <Box bg="#00E676" p={4} borderRadius="xl" border="3px solid #1A1A1A" w="100%">
            <Text fontWeight="bold" mb={3}>🎉 {question.explanation}</Text>
            <Button onClick={() => onNext(attempts === 1)} bg="#FF1053" color="white">Next Question ➡️</Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default TypingGame;