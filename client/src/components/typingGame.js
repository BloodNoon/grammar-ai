import React, { useState, useEffect, useRef } from "react";
import { Box, Heading, Text, Button, Input, VStack } from "@chakra-ui/react";

const TypingGame = ({ question, onNext }) => {
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    setInputValue("");
    setIsCorrect(null);
    setAttempts(0);
    if (inputRef.current) inputRef.current.focus({ preventScroll: true });
  }, [question]);

  const checkAnswer = () => {
    setAttempts((prev) => prev + 1);
    const correctAnswer = question.answer[0];
    const sanitize = (str) =>
      str
        .toLowerCase()
        .replace(/[.,?!]/g, "")
        .trim();

    if (sanitize(inputValue) === sanitize(correctAnswer)) setIsCorrect(true);
    else setIsCorrect(false);
  };

  return (
    <Box
      bg="white"
      p={8}
      borderRadius="2xl"
      borderWidth="4px"
      borderColor="ink.900"
      boxShadow="neu-lg"
      w="100%"
      textAlign="center"
    >
      <VStack spacing={6}>
        <Heading size="lg" color="ink.700">
          {question.question_text || question.prompt_text}
        </Heading>
        {question.options && (
          <Text color="purple.500" fontWeight="bold">
            Word Bank: {question.options.join(" • ")}
          </Text>
        )}

        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !isCorrect && checkAnswer()}
          isDisabled={isCorrect}
          placeholder="Type your answer..."
          bg="gray.50"
          height="70px"
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          borderRadius="xl"
          borderWidth="3px"
          borderColor="ink.900"
          _focus={{ borderColor: "accent.teal" }}
        />

        {!isCorrect && (
          <Button
            onClick={checkAnswer}
            bg="accent.yellow"
            size="lg"
            borderWidth="3px"
            borderColor="ink.900"
            boxShadow="neu"
          >
            Submit
          </Button>
        )}
        {isCorrect && (
          <Box
            bg="accent.green"
            p={4}
            borderRadius="xl"
            borderWidth="3px"
            borderColor="ink.900"
            w="100%"
          >
            <Text fontWeight="bold" mb={3}>
              🎉 {question.explanation}
            </Text>
            <Button
              onClick={() => onNext(attempts === 1)}
              bg="accent.red"
              color="white"
            >
              Next Question ➡️
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default TypingGame;
