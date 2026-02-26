import React, { useState, useRef } from 'react';
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  Heading, 
  useColorModeValue,
  VStack
} from '@chakra-ui/react';

// The scrambled starting state
const initialWords = [
  { id: 'word-1', text: 'capitalized' },
  { id: 'word-2', text: 'Proper' },
  { id: 'word-3', text: 'always' },
  { id: 'word-4', text: 'are' },
  { id: 'word-5', text: 'nouns' }
];

const SentenceRearranger = () => {
  const [words, setWords] = useState(initialWords);
  const [isCorrect, setIsCorrect] = useState(null);
  
  // Refs to keep track of the dragged item and the item it's hovering over
  const dragItemIndex = useRef();
  const dragOverItemIndex = useRef();

  // Chakra theme colors
  const containerBg = useColorModeValue("gray.50", "gray.700");
  const wordBg = useColorModeValue("white", "gray.600");
  const wordBorder = useColorModeValue("blue.200", "blue.500");

  // --- Drag and Drop Handlers ---
  const handleDragStart = (index) => {
    dragItemIndex.current = index;
  };

  const handleDragEnter = (index) => {
    dragOverItemIndex.current = index;
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Required to allow the drop action
  };

  const handleDrop = () => {
    const copyWords = [...words];
    // Remove the dragged item from its original position
    const draggedItemContent = copyWords.splice(dragItemIndex.current, 1)[0];
    // Insert it into the new position
    copyWords.splice(dragOverItemIndex.current, 0, draggedItemContent);
    
    // Reset refs and update state
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;
    setWords(copyWords);
    setIsCorrect(null); // Reset the validation feedback
  };

  // --- Validation ---
  const checkAnswer = () => {
    const currentSentence = words.map(w => w.text).join(' ');
    const correctSentence = "Proper nouns are always capitalized";
    setIsCorrect(currentSentence === correctSentence);
  };

  const resetActivity = () => {
    setWords(initialWords);
    setIsCorrect(null);
  };

  return (
    <Box maxW="600px" mx="auto" p={6} bg={containerBg} borderRadius="xl" boxShadow="md">
      <VStack spacing={6}>
        <Box textAlign="center">
          <Heading as="h2" size="lg" mb={2}>Sentence Rearranger</Heading>
          <Text color="gray.500">Drag and drop the words to form a correct grammar rule.</Text>
        </Box>

        {/* Droppable Area */}
        <Flex 
          wrap="wrap" 
          gap={3} 
          justify="center" 
          p={4} 
          bg="blackAlpha.50" 
          borderRadius="lg"
          minH="100px"
          w="full"
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
              bg={wordBg}
              px={5}
              py={3}
              borderRadius="md"
              borderWidth="2px"
              borderColor={wordBorder}
              boxShadow="sm"
              cursor="grab"
              _active={{ cursor: "grabbing", opacity: 0.7 }}
              userSelect="none"
              transition="transform 0.1s"
              _hover={{ transform: "translateY(-2px)" }}
            >
              <Text fontSize="lg" fontWeight="bold" color="blue.600">
                {word.text}
              </Text>
            </Flex>
          ))}
        </Flex>

        {/* Controls and Feedback */}
        <VStack spacing={4} w="full">
          <Flex gap={4}>
            <Button colorScheme="blue" onClick={checkAnswer}>
              Check Answer
            </Button>
            <Button variant="outline" onClick={resetActivity}>
              Reset
            </Button>
          </Flex>

          {isCorrect === true && (
            <Text color="green.500" fontWeight="bold" fontSize="lg">
              Correct! Great job.
            </Text>
          )}
          {isCorrect === false && (
            <Text color="red.500" fontWeight="bold" fontSize="lg">
              Not quite right. Try arranging them again!
            </Text>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default SentenceRearranger;