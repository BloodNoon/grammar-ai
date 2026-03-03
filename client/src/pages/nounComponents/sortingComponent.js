import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Text, Heading, Button, SimpleGrid, VStack } from '@chakra-ui/react';

const SortingGame = ({ question, onNext }) => {
  const [wordBank, setWordBank] = useState([]);
  const [categories, setCategories] = useState({});
  const [isCorrect, setIsCorrect] = useState(null);
  
  const dragItem = useRef(null);

  useEffect(() => {
    let initialWords = [];
    const initialCategories = {};
    
    question.options.forEach(opt => {
      initialCategories[opt] = [];
    });

    question.answer.forEach(ansString => {
      const [category, wordsStr] = ansString.split(': ');
      if (wordsStr) {
        const words = wordsStr.split(', ');
        initialWords = [...initialWords, ...words];
      }
    });

    initialWords.sort(() => Math.random() - 0.5);
    
    setWordBank(initialWords);
    setCategories(initialCategories);
    setIsCorrect(null);
  }, [question]);

  const handleDragStart = (e, word, sourceCategory) => {
    dragItem.current = { word, sourceCategory };
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = (e, targetCategory) => {
    e.preventDefault();
    const { word, sourceCategory } = dragItem.current;

    if (sourceCategory === targetCategory) return;

    if (sourceCategory === 'bank') {
      setWordBank(prev => prev.filter(w => w !== word));
    } else {
      setCategories(prev => ({
        ...prev,
        [sourceCategory]: prev[sourceCategory].filter(w => w !== word)
      }));
    }

    if (targetCategory === 'bank') {
      setWordBank(prev => [...prev, word]);
    } else {
      setCategories(prev => ({
        ...prev,
        [targetCategory]: [...prev[targetCategory], word]
      }));
    }
    
    setIsCorrect(null);
  };

  const checkAnswers = () => {
    let allCorrect = true;

    question.answer.forEach(ansString => {
      const [category, wordsStr] = ansString.split(': ');
      const correctWords = wordsStr.split(', ');
      const userWords = categories[category] || [];
      
      if (
        correctWords.length !== userWords.length || 
        !correctWords.every(w => userWords.includes(w))
      ) {
        allCorrect = false;
      }
    });

    setIsCorrect(allCorrect);
  };

  return (
    <Box 
      bg="#9D4EDD" 
      p={8} 
      borderRadius="2xl" 
      borderWidth="4px" 
      borderColor="#1A1A1A" 
      boxShadow="8px 8px 0px #1A1A1A"
      maxW="900px"
      mx="auto"
    >
      <Heading color="white" textShadow="2px 2px 0px #1A1A1A" mb={6} textAlign="center">
        {question.question_text.split(':')[0]}
      </Heading>

      <Flex 
        minH="80px" 
        bg="#1A0933" 
        p={4} 
        borderRadius="xl" 
        mb={8} 
        wrap="wrap" 
        gap={4}
        justify="center"
        align="center"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'bank')}
      >
        {wordBank.length === 0 && (
          <Text color="gray.400" fontStyle="italic">All words sorted!</Text>
        )}
        {wordBank.map((word) => (
          <Box
            key={word}
            draggable
            onDragStart={(e) => handleDragStart(e, word, 'bank')}
            bg="#FFEA00"
            color="#1A1A1A"
            px={6}
            py={2}
            borderRadius="md"
            borderWidth="3px"
            borderColor="#1A1A1A"
            fontWeight="bold"
            fontSize="lg"
            cursor="grab"
            boxShadow="4px 4px 0px #1A1A1A"
            _active={{ cursor: "grabbing", transform: "translateY(2px)", boxShadow: "2px 2px 0px #1A1A1A" }}
          >
            {word}
          </Box>
        ))}
      </Flex>

      <SimpleGrid columns={[1, null, question.options.length > 2 ? 4 : 2]} spacing={6} mb={8}>
        {question.options.map(category => (
          <Box
            key={category}
            bg="white"
            borderRadius="xl"
            borderWidth="4px"
            borderColor="#1A1A1A"
            boxShadow="4px 4px 0px #1A1A1A"
            minH="200px"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category)}
            display="flex"
            flexDirection="column"
          >
            <Box bg="#00F5D4" borderBottomWidth="4px" borderColor="#1A1A1A" p={3} borderTopRadius="lg">
              <Heading size="md" textAlign="center" color="#1A1A1A">
                {category}
              </Heading>
            </Box>
            
            <Flex flex="1" p={4} wrap="wrap" gap={3} alignContent="flex-start" justify="center">
              {categories[category]?.map(word => (
                <Box
                  key={word}
                  draggable
                  onDragStart={(e) => handleDragStart(e, word, category)}
                  bg="#FFEA00"
                  color="#1A1A1A"
                  px={4}
                  py={1}
                  borderRadius="md"
                  borderWidth="2px"
                  borderColor="#1A1A1A"
                  fontWeight="bold"
                  cursor="grab"
                >
                  {word}
                </Box>
              ))}
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      <VStack spacing={4}>
        {/* Only show "Check Answers" if they haven't gotten it right yet */}
        {isCorrect !== true && (
          <Button
            onClick={checkAnswers}
            bg="#00E676" 
            color="#062A17"
            size="lg"
            px={10}
            borderWidth="3px"
            borderColor="#1A1A1A"
            boxShadow="4px 4px 0px #1A1A1A"
            fontWeight="extrabold"
            _hover={{ transform: "translateY(-2px)", boxShadow: "6px 6px 0px #1A1A1A" }}
            _active={{ transform: "translateY(4px)", boxShadow: "0px 0px 0px #1A1A1A" }}
          >
            Check Answers!
          </Button>
        )}

        {isCorrect === true && (
          <Box bg="#00E676" px={6} py={4} borderRadius="lg" borderWidth="3px" borderColor="#1A1A1A" textAlign="center" w="100%">
            <Text color="#062A17" fontWeight="bold" fontSize="xl" mb={3}>🎉 Perfect! {question.explanation}</Text>
            <Button 
              onClick={onNext} // Calls the function from the Wrapper to advance the progress!
              bg="#FF1053" 
              color="white" 
              size="lg"
              borderWidth="2px"
              borderColor="#1A1A1A"
              boxShadow="2px 2px 0px #1A1A1A"
              _hover={{ transform: "translateY(-2px)", boxShadow: "4px 4px 0px #1A1A1A" }}
            >
              Next Question ➡️
            </Button>
          </Box>
        )}
        
        {isCorrect === false && (
          <Box bg="#FF1053" px={6} py={3} borderRadius="lg" borderWidth="3px" borderColor="#1A1A1A">
            <Text color="white" fontWeight="bold" fontSize="xl">Not quite yet! Keep trying.</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default SortingGame;