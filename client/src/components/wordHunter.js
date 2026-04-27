import React, { useState, useEffect } from 'react';
import { Box, Flex, Text, Button, Heading, VStack, Badge, Divider } from '@chakra-ui/react';


const HunterCard = ({ question, questionNumber, resetTrigger }) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPerfect, setIsPerfect] = useState(null);

  useEffect(() => {
    setSelectedWords([]);
    setIsSubmitted(false);
    setIsPerfect(null);
  }, [question, resetTrigger]);

  const toggleWord = (word) => {
    if (isSubmitted) return; 

    setSelectedWords(prev => {
      if (prev.includes(word)) return prev.filter(w => w !== word); 
      return [...prev, word]; 
    });
  };

  const checkAnswers = () => {
    if (selectedWords.length === 0) return; 

    const correctAnswers = question.answer;
    const foundAllCorrect = correctAnswers.every(word => selectedWords.includes(word));
    const noWrongGuesses = selectedWords.every(word => correctAnswers.includes(word));

    setIsPerfect(foundAllCorrect && noWrongGuesses);
    setIsSubmitted(true);
  };

  if (!question) return null;

  return (
    <Box bg="white" p={6} borderRadius="xl" borderWidth="3px" borderColor="gray.100" boxShadow="sm">
      <Flex justify="space-between" align="flex-start" mb={4}>
        <Box>
          <Badge colorScheme="blue" mb={2} borderRadius="md">Question {questionNumber}</Badge>
          <Heading size="md" color="#1A0933" lineHeight="tall">{question.question_text}</Heading>
        </Box>
      </Flex>

     
      <Box bg="#F8F9FA" p={4} borderRadius="lg" borderWidth="2px" borderColor="gray.200" mb={4}>
        <Flex wrap="wrap" gap={2} justify="flex-start" align="center">
          {question.options.map((word, index) => {
            const isSelected = selectedWords.includes(word);
            const isCorrectAnswer = question.answer.includes(word);
            
            let bg = "white";
            let borderColor = "gray.300";
            let color = "#1A1A1A";

            if (!isSubmitted) {
              if (isSelected) {
                bg = "#DBEAFE"; borderColor = "#3B82F6"; color = "#1E3A8A";
              }
            } else {
              if (isSelected && isCorrectAnswer) {
                bg = "#D1FAE5"; borderColor = "#10B981"; color = "#065F46";
              } else if (isSelected && !isCorrectAnswer) {
                bg = "#FEE2E2"; borderColor = "#EF4444"; color = "#991B1B";
              } else if (!isSelected && isCorrectAnswer) {
                bg = "#FEF3C7"; borderColor = "#F59E0B"; color = "#92400E";
              } else {
                bg = "gray.50"; borderColor = "gray.200"; color = "gray.400";
              }
            }

            return (
              <Button
                key={`${word}-${index}`}
                onClick={() => toggleWord(word)}
                bg={bg} color={color} fontSize="md" fontWeight="bold" px={4} py={2}
                borderRadius="md" borderWidth="2px" borderColor={borderColor}
                transition="all 0.1s"
                _hover={!isSubmitted ? { borderColor: "#3B82F6", bg: isSelected ? "#DBEAFE" : "gray.50" } : {}}
              >
                {word}
              </Button>
            );
          })}
        </Flex>
      </Box>

  
      <Box>
        {!isSubmitted ? (
          <Button 
            onClick={checkAnswers} isDisabled={selectedWords.length === 0}
            bg="#3B82F6" color="white" size="sm" px={6} borderRadius="lg"
            _hover={{ bg: "#2563EB" }}
          >
            Check Answer
          </Button>
        ) : (
          <Flex justify="space-between" align="center" bg={isPerfect ? "#D1FAE5" : "#FEE2E2"} p={3} borderRadius="md" borderWidth="1px" borderColor={isPerfect ? "#10B981" : "#EF4444"}>
            <Text color={isPerfect ? "#065F46" : "#991B1B"} fontWeight="bold" fontSize="sm">
              {isPerfect ? "✅ Flawless!" : `❌ Not quite. ${question.explanation}`}
            </Text>
            {!isPerfect && (
              <Button size="xs" variant="outline" onClick={() => { setSelectedWords([]); setIsSubmitted(false); setIsPerfect(null); }} borderColor="gray.400">
                Retry
              </Button>
            )}
          </Flex>
        )}
      </Box>
    </Box>
  );
};



const WordHunterWorksheet = ({ questions }) => {
  const [resetTrigger, setResetTrigger] = useState(0);

  if (!questions || questions.length === 0) return null;

  const topicTitle = questions[0].topic || "Word Hunter Challenge";

  const handleReset = () => {
    setResetTrigger(prev => prev + 1);
  };

  return (
    <Box w="100%" bg="transparent" fontFamily="'Inter', sans-serif">

      {/* Header Section */}
      <Box textAlign="center" mb={6}>
        <Badge colorScheme="blue" mb={3} px={4} py={1} borderRadius="full" fontSize="sm">
          {topicTitle}
        </Badge>
        <Heading as="h3" size="lg" color="#1A0933" mb={2}>
          Find the targets!
        </Heading>
        <Text color="gray.600" fontSize="md">
          Read each sentence carefully and click the correct words.
        </Text>

        {/* Reset Button */}
        <Button
          onClick={handleReset}
          mt={4}
          colorScheme="purple"
          size="sm"
          leftIcon={<Text>🔄</Text>}
          borderRadius="lg"
          _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
          transition="all 0.2s"
        >
          Reset All Questions
        </Button>
      </Box>

      {/* Questions List */}
      <VStack spacing={6} align="stretch">
        {questions.map((q, index) => (
          <HunterCard
            key={q.id}
            question={q}
            questionNumber={index + 1}
            resetTrigger={resetTrigger}
          />
        ))}
      </VStack>

    </Box>
  );
};

export default WordHunterWorksheet;