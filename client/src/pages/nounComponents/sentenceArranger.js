import React, { useState, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  VStack,
  Badge,
} from "@chakra-ui/react";

const getInitialWords = (question) => {
  if (!question || !question.answer || !question.answer[0]) return [];
  const correctString = question.answer[0];
  const wordArray = correctString.split(" ");
  let shuffled = [...wordArray].sort(() => Math.random() - 0.5);
  while (shuffled.join(" ") === correctString && wordArray.length > 1) {
    shuffled = [...wordArray].sort(() => Math.random() - 0.5);
  }
  return shuffled.map((word, index) => ({
    id: `word-${index}-${word}`,
    text: word,
  }));
};

const AdjectiveRearranger = ({ question }) => {
  const [words, setWords] = useState(() => getInitialWords(question));
  const [isCorrect, setIsCorrect] = useState(null);
  const [originalSentence, setOriginalSentence] = useState(
    () => question?.answer?.[0] || "",
  );

  const dragItemIndex = useRef();
  const dragOverItemIndex = useRef();

  const initializeGame = () => {
    if (!question || !question.answer || !question.answer[0]) return;
    const correctString = question.answer[0];
    setOriginalSentence(correctString);
    const wordArray = correctString.split(" ");
    let shuffled = [...wordArray].sort(() => Math.random() - 0.5);
    while (shuffled.join(" ") === correctString && wordArray.length > 1) {
      shuffled = [...wordArray].sort(() => Math.random() - 0.5);
    }
    setWords(
      shuffled.map((word, index) => ({
        id: `word-${index}-${word}`,
        text: word,
      })),
    );
    setIsCorrect(null);
  };

  // --- Drag and Drop Handlers (Kept exactly as you built them!) ---
  const handleDragStart = (index) => {
    dragItemIndex.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItemIndex.current = index;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = () => {
    const copyWords = [...words];
    const draggedItemContent = copyWords.splice(dragItemIndex.current, 1)[0];
    copyWords.splice(dragOverItemIndex.current, 0, draggedItemContent);

    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
    setWords(copyWords);
    setIsCorrect(null);
  };

  // --- Validation ---
  const checkAnswer = () => {
    const currentSentence = words.map((w) => w.text).join(" ");
    setIsCorrect(currentSentence === originalSentence);
  };

  if (!question) return null;

  return (
    <Box w="100%" bg="white" borderRadius="xl" p={0}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Badge
            colorScheme="purple"
            mb={3}
            px={3}
            py={1}
            borderRadius="md"
            fontSize="sm"
          >
            Adjective Order
          </Badge>
          <Heading as="h4" size="md" color="ink.700" mb={2} lineHeight="tall">
            {question.question_text}
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Drag and drop the blocks to fix the order!
          </Text>
        </Box>

        {/* Droppable Area */}
        <Flex
          wrap="wrap"
          gap={3}
          justify="center"
          p={6}
          bg="purple.100"
          borderRadius="lg"
          borderWidth="2px"
          borderColor="purple.300"
          borderStyle="dashed"
          minH="120px"
          align="center"
        >
          {words.map((word, index) => (
            <Flex
              key={word.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragOver={handleDragOver}
              onDragEnd={handleDrop}
              align="center"
              justify="center"
              bg="white"
              px={5}
              py={3}
              borderRadius="md"
              borderWidth="2px"
              borderColor="purple.500"
              boxShadow="2px 2px 0px rgba(157, 78, 221, 0.3)"
              cursor="grab"
              _active={{
                cursor: "grabbing",
                transform: "scale(1.05)",
                boxShadow: "4px 4px 0px rgba(157, 78, 221, 0.4)",
              }}
              userSelect="none"
              transition="all 0.1s"
              _hover={{
                transform: "translateY(-2px)",
                borderColor: "purple.700",
              }}
            >
              <Text fontSize="lg" fontWeight="bold" color="purple.800">
                {word.text}
              </Text>
            </Flex>
          ))}
        </Flex>

        {/* Controls and Feedback */}
        <VStack spacing={4} w="full">
          {isCorrect !== true && (
            <Flex gap={4} w="full" justify="center">
              <Button
                onClick={checkAnswer}
                bg="purple.500"
                color="white"
                _hover={{ bg: "purple.700", transform: "translateY(-2px)" }}
                _active={{ transform: "translateY(2px)" }}
                boxShadow="0px 4px 10px rgba(157, 78, 221, 0.3)"
                px={8}
              >
                Check Order
              </Button>
              <Button
                variant="outline"
                onClick={initializeGame}
                borderColor="gray.300"
              >
                Shuffle
              </Button>
            </Flex>
          )}

          {isCorrect === true && (
            <Box
              bg="green.100"
              w="100%"
              p={3}
              borderRadius="md"
              textAlign="center"
              borderWidth="1px"
              borderColor="green.500"
            >
              <Text color="green.800" fontWeight="bold">
                ✅ Perfect! {question.explanation}
              </Text>
            </Box>
          )}
          {isCorrect === false && (
            <Box
              bg="red.100"
              w="100%"
              p={3}
              borderRadius="md"
              textAlign="center"
              borderWidth="1px"
              borderColor="red.500"
            >
              <Text color="red.800" fontWeight="bold">
                Not quite! Try reading it out loud.
              </Text>
            </Box>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default AdjectiveRearranger;
