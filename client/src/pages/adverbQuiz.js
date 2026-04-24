import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, SimpleGrid, VStack, Flex, Grid, GridItem, Progress } from '@chakra-ui/react';
import adverbData from '../data/adverbs_questions.json';

// Array of soft, vibrant colors to cycle through for the question tabs (matching your image)
const tabColors = ["#4361EE", "#4CC9F0", "#4ADE80", "#9D4EDD", "#F72585", "#F8961E"];

const AdverbQuizPage = () => {
  const quizData = adverbData;
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const generateQuiz = () => {
    // Filter and shuffle single-answer questions
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
    // The soft peach background from your screenshot
    <Box bg="#FADCB9" minH="100vh" p={6} fontFamily="'Inter', sans-serif">
      
      {/* 2-Column Grid: Main Content (Left) & Sidebar (Right) */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 350px" }} gap={8} maxW="1400px" mx="auto">
        
        {/* ========================================== */}
        {/* LEFT COLUMN: The Tabbed Question Modules */}
        {/* ========================================== */}
        <GridItem>
          <VStack spacing={8} align="stretch">
            {activeQuestions.map((q, index) => {
              const userAnswer = answers[q.id];
              const correctAnswer = q.answer[0];
              // Pick a color from our array based on the question index
              const currentColor = tabColors[index % tabColors.length]; 

              return (
                <Box 
                  key={q.id} 
                  bg="white" 
                  borderRadius="xl" 
                  borderWidth="3px" 
                  borderColor={`${currentColor}40`} // Adds 40% transparency to the border color
                  boxShadow="0px 4px 10px rgba(0,0,0,0.05)"
                  position="relative"
                  overflow="hidden"
                >
                  {/* The Colored Tab Header */}
                  <Box 
                    bg={currentColor} 
                    color="white" 
                    display="inline-block"
                    px={6} 
                    py={2} 
                    borderBottomRightRadius="xl"
                    fontWeight="bold"
                    fontSize="lg"
                    boxShadow="2px 2px 0px rgba(0,0,0,0.1)"
                  >
                    📝 Question {index + 1}
                  </Box>

                  <Box p={6} pt={8}>
                    <Heading size="md" color="#1A0933" mb={6} lineHeight="tall">
                      {q.question_text}
                    </Heading>

                    <SimpleGrid columns={[1, null, 2]} spacing={4}>
                      {q.options.map((option) => {
                        let bgColor = "gray.50";
                        let borderColor = "gray.200";
                        let textColor = "#1A1A1A";

                        if (isSubmitted) {
                          if (option === correctAnswer) {
                            bgColor = "#D1FAE5"; // Soft Emerald
                            borderColor = "#10B981";
                          } else if (option === userAnswer) {
                            bgColor = "#FEE2E2"; // Soft Rose
                            borderColor = "#EF4444";
                          }
                        } else if (option === userAnswer) {
                          bgColor = `${currentColor}20`; // Very light version of the tab color
                          borderColor = currentColor;
                          textColor = currentColor;
                        }

                        return (
                          <Button
                            key={option}
                            onClick={() => handleSelect(q.id, option)}
                            bg={bgColor}
                            color={textColor}
                            fontSize="md"
                            fontWeight={option === userAnswer ? "bold" : "medium"}
                            height="auto"
                            py={4}
                            whiteSpace="normal"
                            borderRadius="lg"
                            borderWidth="2px"
                            borderColor={borderColor}
                            justifyContent="flex-start"
                            px={5}
                            transition="all 0.2s"
                            _hover={!isSubmitted ? { bg: `${currentColor}10`, borderColor: currentColor } : {}}
                            isDisabled={isSubmitted}
                          >
                            {option}
                          </Button>
                        );
                      })}
                    </SimpleGrid>

                    {/* Feedback Box (Only shows after submitting) */}
                    {isSubmitted && (
                      <Box mt={6} bg={userAnswer === correctAnswer ? "#D1FAE5" : "#FEE2E2"} p={4} borderRadius="lg" borderWidth="2px" borderColor={userAnswer === correctAnswer ? "#10B981" : "#EF4444"}>
                        <Text fontWeight="bold" color={userAnswer === correctAnswer ? "#065F46" : "#991B1B"}>
                          {userAnswer === correctAnswer ? "✅ Correct:" : "❌ Incorrect:"} {q.explanation}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            })}
          </VStack>
        </GridItem>

        {/* ========================================== */}
        {/* RIGHT COLUMN: The Sticky Status Sidebar */}
        {/* ========================================== */}
        <GridItem>
          <Box 
            bg="#FFEBD6" // Soft cream color from your sidebar
            p={6} 
            borderRadius="xl" 
            borderWidth="2px" 
            borderColor="#F8B47E" 
            boxShadow="0px 4px 10px rgba(0,0,0,0.05)"
            position="sticky" 
            top="24px" // Sticks it to the top as they scroll!
          >
            <Heading size="md" color="#4A2C11" mb={6} textAlign="center">
              📊 Quiz Progress
            </Heading>
            
            {!isSubmitted ? (
              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text fontWeight="bold" color="gray.700" fontSize="sm">Completed</Text>
                  <Text fontWeight="bold" color="#4A2C11" fontSize="sm">
                    {totalAnswered} / {activeQuestions.length}
                  </Text>
                </Flex>
                
                <Progress 
                  value={progressPercent} 
                  colorScheme="orange" 
                  bg="white"
                  borderRadius="full" 
                  h="10px"
                  mb={8} 
                  borderWidth="1px" 
                  borderColor="gray.300"
                />
                
                <Box bg="white" p={4} borderRadius="lg" mb={6} borderWidth="1px" borderColor="gray.200">
                   <Text fontSize="sm" color="gray.600" textAlign="center">
                     Make sure to answer all {activeQuestions.length} questions before submitting!
                   </Text>
                </Box>

                <Button
                  onClick={handleSubmit}
                  isDisabled={!isReadyToSubmit}
                  w="100%"
                  bg="#4A2C11"
                  color="white"
                  size="lg"
                  borderRadius="xl"
                  _hover={{ bg: "#2E1B0A", transform: "translateY(-2px)" }}
                  _active={{ transform: "translateY(2px)" }}
                >
                  Submit Answers
                </Button>
              </Box>
            ) : (
              <Box textAlign="center" py={2}>
                <Text fontWeight="bold" color="gray.700" mb={2} textTransform="uppercase" letterSpacing="wide">Final Score</Text>
                <Heading size="4xl" color="#4A2C11" mb={6}>{score}<Text as="span" fontSize="2xl" color="gray.500">/{activeQuestions.length}</Text></Heading>
                
                <Button 
                  onClick={generateQuiz} 
                  w="100%"
                  bg="#F8961E" 
                  color="white" 
                  size="lg" 
                  borderRadius="xl"
                  _hover={{ bg: "#E88310", transform: "translateY(-2px)" }}
                >
                  Try Again 🔄
                </Button>
              </Box>
            )}
          </Box>
        </GridItem>

      </Grid>
    </Box>
  );
};

export default AdverbQuizPage;
