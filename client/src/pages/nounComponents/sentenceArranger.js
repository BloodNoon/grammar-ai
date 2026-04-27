import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Text, Button, Heading, VStack, Badge } from '@chakra-ui/react';

const AdjectiveRearranger = ({ question }) => {
  const [words, setWords] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [originalSentence, setOriginalSentence] = useState("");
  
  // Refs for Drag and Drop
  const dragItemIndex = useRef();
  const dragOverItemIndex = useRef();

  // 1. The Smart Scrambler
  const initializeGame = () => {
    if (!question) return;

    // Grab the correct answer string (e.g., "three small red cars")
    const correctString = question.answer[0];
    setOriginalSentence(correctString);

    // Chop it into an array of words
    const wordArray = correctString.split(' ');

    // Scramble the array
    let shuffled = [...wordArray].sort(() => Math.random() - 0.5);
    
    // Safety check: make sure it didn't accidentally shuffle into the correct order!
    while (shuffled.join(' ') === correctString && wordArray.length > 1) {
      shuffled = [...wordArray].sort(() => Math.random() - 0.5);
    }

    // Map it into the object format your Drag & Drop logic needs
    const draggableObjects = shuffled.map((word, index) => ({
      id: `word-${index}-${word}`,
      text: word
    }));

    setWords(draggableObjects);
    setIsCorrect(null);
  };

  // Run the scrambler whenever a new question is passed in
  useEffect(() => {
    initializeGame();
  }, [question]);

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
    const currentSentence = words.map(w => w.text).join(' ');
    setIsCorrect(currentSentence === originalSentence);
  };

  if (!question) return null;

  return (
    <Box w="100%" bg="white" borderRadius="xl" p={0}>
      <VStack spacing={6} align="stretch">
        
        <Box textAlign="center">
          <Badge colorScheme="purple" mb={3} px={3} py={1} borderRadius="md" fontSize="sm">
            Adjective Order
          </Badge>
          <Heading as="h4" size="md" color="#1A0933" mb={2} lineHeight="tall">
            {question.question_text}
          </Heading>
          <Text color="gray.500" fontSize="sm">Drag and drop the blocks to fix the order!</Text>
        </Box>

        {/* Droppable Area */}
        <Flex 
          wrap="wrap" 
          gap={3} 
          justify="center" 
          p={6} 
          bg="#F3E8FF" // Very soft pastel purple
          borderRadius="lg"
          borderWidth="2px"
          borderColor="#D8B4FE"
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
              borderColor="#9D4EDD" // Electric Purple border
              boxShadow="2px 2px 0px rgba(157, 78, 221, 0.3)"
              cursor="grab"
              _active={{ cursor: "grabbing", transform: "scale(1.05)", boxShadow: "4px 4px 0px rgba(157, 78, 221, 0.4)" }}
              userSelect="none"
              transition="all 0.1s"
              _hover={{ transform: "translateY(-2px)", borderColor: "#7B2CBF" }}
            >
              <Text fontSize="lg" fontWeight="bold" color="#4A00E0">
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
                bg="#9D4EDD"
                color="white"
                _hover={{ bg: "#7B2CBF", transform: "translateY(-2px)" }}
                _active={{ transform: "translateY(2px)" }}
                boxShadow="0px 4px 10px rgba(157, 78, 221, 0.3)"
                px={8}
              >
                Check Order
              </Button>
              <Button variant="outline" onClick={initializeGame} borderColor="gray.300">
                Shuffle
              </Button>
            </Flex>
          )}

          {isCorrect === true && (
            <Box bg="#D1FAE5" w="100%" p={3} borderRadius="md" textAlign="center" borderWidth="1px" borderColor="#10B981">
              <Text color="#065F46" fontWeight="bold">
                ✅ Perfect! {question.explanation}
              </Text>
            </Box>
          )}
          {isCorrect === false && (
            <Box bg="#FEE2E2" w="100%" p={3} borderRadius="md" textAlign="center" borderWidth="1px" borderColor="#EF4444">
              <Text color="#991B1B" fontWeight="bold">
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