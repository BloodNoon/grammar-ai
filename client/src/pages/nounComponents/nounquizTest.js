import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, SimpleGrid, VStack, Flex, Progress } from '@chakra-ui/react';

const GrammarQuiz = ({ quizData }) => {
  // Game State
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  // Question Interaction State
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // 1. Initialize the Quiz Engine
  const generateQuiz = () => {
    // Filter for Single answer questions that actually have options
    const validQuestions = quizData.filter(
      q => q.answer_count === "Single" && q.options && q.options.length > 0
    );

    // Shuffle and grab exactly 10 (or less, if the JSON has fewer than 10!)
    const shuffled = [...validQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    
    setActiveQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    resetQuestionState();
  };

  // Run the generator when the component mounts or the data changes
  useEffect(() => {
    if (quizData && quizData.length > 0) {
      generateQuiz();
    }
  }, [quizData]);

  // 2. Interaction Handlers
  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleSelect = (option) => {
    if (!isAnswered) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    const currentQuestion = activeQuestions[currentIndex];
    const correctAnswer = currentQuestion.answer[0]; //

    if (selectedAnswer === correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setIsAnswered(true);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
    resetQuestionState();
  };

  // Safety check while loading
  if (activeQuestions.length === 0) return null;

  const isGameOver = currentIndex >= activeQuestions.length;
  const progressPercent = (currentIndex / activeQuestions.length) * 100;

  // --- RENDER THE FINAL SCORE SCREEN ---
  if (isGameOver) {
    return (
      <Box bg="#9D4EDD" p={10} borderRadius="2xl" textAlign="center" borderWidth="4px" borderColor="#1A1A1A" boxShadow="8px 8px 0px #1A1A1A" maxW="800px" mx="auto">
        <Heading color="#FFEA00" mb={4} size="2xl" textShadow="3px 3px 0px #1A1A1A">Quiz Complete!</Heading>
        <Text fontSize="2xl" color="white" mb={8} fontWeight="bold">
          You scored {score} out of {activeQuestions.length}!
        </Text>
        
        {score === activeQuestions.length ? (
          <Text fontSize="xl" color="#00E676" mb={8} fontWeight="extrabold" bg="#1A1A1A" display="inline-block" px={4} py={2} borderRadius="md">Flawless Victory! 🎉</Text>
        ) : (
          <Text fontSize="xl" color="white" mb={8}>Great effort! Let's try to beat that score.</Text>
        )}

        <Button onClick={generateQuiz} bg="#FFEA00" color="#1A1A1A" size="lg" px={10} borderWidth="3px" borderColor="#1A1A1A" boxShadow="4px 4px 0px #1A1A1A" _hover={{ transform: "translateY(-2px)" }} _active={{ transform: "translateY(4px)" }}>
          Retake Quiz 🔄
        </Button>
      </Box>
    );
  }

  // --- RENDER THE ACTIVE QUESTION ---
  const currentQuestion = activeQuestions[currentIndex];
  const correctAnswer = currentQuestion.answer[0];

  return (
    <Box bg="#4361EE" p={8} borderRadius="2xl" borderWidth="4px" borderColor="#1A1A1A" boxShadow="8px 8px 0px #1A1A1A" maxW="800px" mx="auto" fontFamily="'Inter', sans-serif">
      
      {/* Progress Bar Header */}
      <Box mb={8}>
         <Flex justify="space-between" mb={2}>
           <Text fontWeight="extrabold" color="white" fontSize="lg" textShadow="1px 1px 0px #1A1A1A">Question {currentIndex + 1} of {activeQuestions.length}</Text>
           <Text fontWeight="extrabold" color="white" fontSize="lg" textShadow="1px 1px 0px #1A1A1A">Score: {score}</Text>
         </Flex>
         <Progress value={progressPercent} size="lg" colorScheme="yellow" borderRadius="md" borderWidth="2px" borderColor="#1A1A1A" boxShadow="2px 2px 0px #1A1A1A" bg="white" />
      </Box>

      {/* The Question */}
      <Heading color="white" textShadow="2px 2px 0px #1A1A1A" mb={6} textAlign="center" size="lg">
        {currentQuestion.question_text}
      </Heading>

      {/* The Options Grid */}
      <SimpleGrid columns={[1, null, 2]} spacing={4} mb={8}>
        {currentQuestion.options.map((option) => {
          // Determine the color logic for the buttons!
          let bgColor = "white";
          let textColor = "#1A1A1A";
          let shadow = "6px 6px 0px #1A1A1A";
          let transform = "none";

          if (isAnswered) {
            // After submitting, show what was right and wrong
            if (option === correctAnswer) {
              bgColor = "#00E676"; // Green for the right answer
              textColor = "#062A17";
            } else if (option === selectedAnswer) {
              bgColor = "#FF1053"; // Red if they picked this and it's wrong
              textColor = "white";
            }
            // Push the unselected/wrong buttons down slightly
            if (option !== correctAnswer) {
              shadow = "2px 2px 0px #1A1A1A";
              transform = "translateY(4px)";
            }
          } else if (option === selectedAnswer) {
            // Just highlighted (before submitting)
            bgColor = "#00F5D4"; // Laser Cyan
            shadow = "0px 0px 0px #1A1A1A";
            transform = "translateY(6px)";
          }

          return (
            <Button
              key={option}
              onClick={() => handleSelect(option)}
              bg={bgColor}
              color={textColor}
              fontSize="xl"
              fontWeight="extrabold"
              height="80px"
              whiteSpace="normal"
              borderRadius="xl"
              borderWidth="4px"
              borderColor="#1A1A1A"
              boxShadow={shadow}
              transform={transform}
              transition="all 0.1s"
              _hover={!isAnswered ? { bg: option === selectedAnswer ? "#00F5D4" : "#f0f0f0" } : {}}
              _active={!isAnswered ? { transform: "translateY(6px)", boxShadow: "0px 0px 0px #1A1A1A" } : {}}
              isDisabled={isAnswered}
            >
              {option}
            </Button>
          );
        })}
      </SimpleGrid>

      {/* Submit / Next Controls */}
      <VStack spacing={4}>
        {!isAnswered ? (
          <Button
            onClick={handleSubmit}
            isDisabled={!selectedAnswer}
            bg="#FFEA00"
            color="#1A1A1A"
            size="lg"
            px={12}
            borderWidth="3px"
            borderColor="#1A1A1A"
            boxShadow="4px 4px 0px #1A1A1A"
            fontWeight="extrabold"
            _hover={{ transform: "translateY(-2px)" }}
            _active={{ transform: "translateY(4px)", boxShadow: "0px 0px 0px #1A1A1A" }}
          >
            Submit Answer
          </Button>
        ) : (
          <Box bg={selectedAnswer === correctAnswer ? "#00E676" : "#FF1053"} px={6} py={4} borderRadius="lg" borderWidth="3px" borderColor="#1A1A1A" w="100%" textAlign="center">
            <Text color={selectedAnswer === correctAnswer ? "#062A17" : "white"} fontWeight="bold" fontSize="xl" mb={4}>
              {selectedAnswer === correctAnswer ? "🎉 Correct!" : "Not quite!"} {currentQuestion.explanation}
            </Text>
            <Button onClick={handleNext} bg="white" color="#1A1A1A" size="lg" px={8} borderWidth="2px" borderColor="#1A1A1A" boxShadow="4px 4px 0px #1A1A1A" _hover={{ transform: "translateY(-2px)" }}>
              {currentIndex === activeQuestions.length - 1 ? "See Final Score ➡️" : "Next Question ➡️"}
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default GrammarQuiz;