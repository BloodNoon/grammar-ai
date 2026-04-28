import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, SimpleGrid, VStack, Flex, Grid, GridItem, Progress, Badge } from '@chakra-ui/react';
import conjunctionData from '../data/conjunctions_questions.json';

const ConjunctionQuiz = () => {
  const quizData = conjunctionData;
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const generateQuiz = () => {
   
    const validQuestions = quizData.filter(
      q => q.answer_count === "Single" && q.options && q.options.length > 0
    );
   
    const shuffled = [...validQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
    
    setActiveQuestions(shuffled);
    setAnswers({});
    setIsSubmitted(false);
    setScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (quizData && quizData.length > 0) {
      generateQuiz();
    }
  }, [quizData]);

  const handleSelect = (questionId, option) => {
    if (isSubmitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    activeQuestions.forEach(q => {
      if (answers[q.id] === q.answer[0]) newScore += 1;
    });
    setScore(newScore);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeQuestions.length === 0) return null;

  const totalAnswered = Object.keys(answers).length;
  const isReadyToSubmit = totalAnswered === activeQuestions.length;
  const progressPercent = (totalAnswered / activeQuestions.length) * 100;

  return (
    <Box bg="#F6D5B4" minH="100vh" p={6} fontFamily="'Inter', sans-serif">
      
   
      <Box bg="#F0B784" maxW="1200px" mx="auto" p={4} borderRadius="lg" mb={8} textAlign="center" borderWidth="2px" borderColor="whiteAlpha.600">
        <Heading size="lg" color="#4A2C11">📝 Final Knowledge Check</Heading>
      </Box>

   
      <Grid templateColumns={{ base: "1fr", lg: "320px 1fr" }} gap={8} maxW="1200px" mx="auto">
        
     
        <GridItem>
          <Box 
            bg="#FFF4CC" 
            p={6} 
            borderRadius="lg" 
            borderWidth="2px" 
            borderColor="#1A1A1A" 
            boxShadow="4px 4px 0px rgba(0,0,0,0.1)"
            position="sticky" 
            top="24px"
          >
            <Heading size="md" color="#1A1A1A" mb={6}>Quiz Status</Heading>
            
            {!isSubmitted ? (
              <Box>
                <Text fontWeight="bold" color="gray.700" mb={2}>
                  Answered: {totalAnswered} / {activeQuestions.length}
                </Text>
                <Progress 
                  value={progressPercent} 
                  colorScheme="orange" 
                  bg="white"
                  borderRadius="full" 
                  mb={8} 
                  borderWidth="1px" 
                  borderColor="gray.300"
                />
                
                <Text fontSize="sm" color="gray.600" mb={4}>
                  Answer all questions before submitting your quiz for grading.
                </Text>

                <Button
                  onClick={handleSubmit}
                  isDisabled={!isReadyToSubmit}
                  w="100%"
                  bg="#4A2C11"
                  color="white"
                  size="lg"
                  borderWidth="2px"
                  borderColor="#1A1A1A"
                  _hover={{ bg: "#2E1B0A", transform: "translateY(-2px)" }}
                  _active={{ transform: "translateY(2px)" }}
                >
                  Submit Quiz
                </Button>
              </Box>
            ) : (
              <Box textAlign="center" py={4}>
                <Heading size="3xl" color="#4A2C11" mb={2}>{score}/{activeQuestions.length}</Heading>
                <Text fontWeight="bold" color="gray.700" mb={6}>Final Score</Text>
                
                <Button 
                  onClick={generateQuiz} 
                  w="100%"
                  bg="#F0B784" 
                  color="#4A2C11" 
                  size="lg" 
                  borderWidth="2px" 
                  borderColor="#1A1A1A"
                  _hover={{ bg: "#E5A872" }}
                >
                  Retake Quiz 🔄
                </Button>
              </Box>
            )}
          </Box>
        </GridItem>

     
        <GridItem>
          <VStack spacing={6} align="stretch">
            {activeQuestions.map((q, index) => {
              const userAnswer = answers[q.id];
              const correctAnswer = q.answer[0];

              return (
                <Box 
                  key={q.id} 
                  bg="white" 
                  p={6} 
                  borderRadius="lg" 
                  borderWidth="2px" 
                  borderColor="#1A1A1A" 
                  boxShadow="4px 4px 0px rgba(0,0,0,0.1)"
                >
                  <Flex align="flex-start" gap={4} mb={6}>
                    <Badge colorScheme="orange" fontSize="lg" px={3} py={1} borderRadius="md" borderWidth="1px" borderColor="gray.300">
                      Q{index + 1}
                    </Badge>
                    <Heading size="md" color="#1A0933" pt={1}>{q.question_text}</Heading>
                  </Flex>

                  <SimpleGrid columns={[1, null, 2]} spacing={4}>
                    {q.options.map((option) => {
                      let bgColor = "gray.50";
                      let borderColor = "gray.300";
                      let textColor = "#1A1A1A";

                      if (isSubmitted) {
                        if (option === correctAnswer) {
                          bgColor = "#CAFFBF"; borderColor = "#2B7A0B";
                        } else if (option === userAnswer) {
                          bgColor = "#FFADAD"; borderColor = "#A11212";
                        }
                      } else if (option === userAnswer) {
                        bgColor = "#F0B784"; borderColor = "#4A2C11"; textColor = "#4A2C11";
                      }

                      return (
                        <Button
                          key={option}
                          onClick={() => handleSelect(q.id, option)}
                          bg={bgColor}
                          color={textColor}
                          fontSize="md"
                          fontWeight="bold"
                          height="auto"
                          py={3}
                          whiteSpace="normal"
                          borderRadius="md"
                          borderWidth="2px"
                          borderColor={borderColor}
                          justifyContent="flex-start"
                          px={4}
                          transition="all 0.1s"
                          _hover={!isSubmitted ? { bg: option === userAnswer ? "#F0B784" : "gray.100" } : {}}
                          isDisabled={isSubmitted}
                        >
                          {option}
                        </Button>
                      );
                    })}
                  </SimpleGrid>

                  {isSubmitted && q.explanation && (
                    <Box mt={6} bg={userAnswer === correctAnswer ? "green.50" : "red.50"} p={4} borderRadius="md" borderWidth="1px" borderColor={userAnswer === correctAnswer ? "green.400" : "red.400"}>
                      <Text fontWeight="bold" color={userAnswer === correctAnswer ? "green.800" : "red.800"}>
                        {userAnswer === correctAnswer ? "✅ Correct:" : "❌ Incorrect:"} {q.explanation}
                      </Text>
                    </Box>
                  )}
                </Box>
              );
            })}
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ConjunctionQuiz;