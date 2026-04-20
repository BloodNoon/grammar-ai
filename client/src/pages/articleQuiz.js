import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, SimpleGrid, VStack, Flex } from '@chakra-ui/react';
import articleData from '../data/articles_questions.json';

const ArticleQuizPage = () => {
  const quizData = articleData;
  const [activeQuestions, setActiveQuestions] = useState([]);

  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const generateQuiz = () => {
    // For article questions, we need to create options from the answers
    const validQuestions = quizData.filter(q => q.answer && q.answer.length > 0).map(q => {
      // If the question already has options, use them
      if (q.options && q.options.length > 0) {
        return q;
      }

      // Otherwise, create options for articles (a, an, the, or no article)
      const correctAnswer = q.answer[0];
      const allArticles = ['a', 'an', 'the', 'no article'];

      // If correct answer is already in the list, use it; otherwise add it
      let options = [...allArticles];
      if (!allArticles.includes(correctAnswer)) {
        options = [correctAnswer, ...allArticles.slice(0, 3)];
      }

      // Shuffle options
      const shuffledOptions = options.sort(() => Math.random() - 0.5);

      return {
        ...q,
        options: shuffledOptions
      };
    });

    // Shuffle and grab 10
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

    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = () => {
    let newScore = 0;

    activeQuestions.forEach(q => {
      const correctAnswer = q.answer[0];
      const userAnswer = answers[q.id];

      if (userAnswer === correctAnswer) {
        newScore += 1;
      }
    });

    setScore(newScore);
    setIsSubmitted(true);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeQuestions.length === 0) return null;

  const totalAnswered = Object.keys(answers).length;
  const isReadyToSubmit = totalAnswered === activeQuestions.length;

  return (
    <Box backgroundColor="#FFCEA0" minH="100vh" p={6}>
      <Box maxW="900px" mx="auto" fontFamily="'Inter', sans-serif">

      {/* --- HEADER & SCORE SCREEN --- */}
      {!isSubmitted ? (
        <Heading color="#1A0933" mb={8} size="2xl" textAlign="center">
          Article Knowledge Check
        </Heading>
      ) : (
        <Box bg="#9D4EDD" p={10} borderRadius="2xl" textAlign="center" borderWidth="4px" borderColor="#1A1A1A" boxShadow="8px 8px 0px #1A1A1A" mb={10}>
          <Heading color="#FFEA00" mb={4} size="2xl" textShadow="3px 3px 0px #1A1A1A">Quiz Complete!</Heading>
          <Text fontSize="2xl" color="white" mb={6} fontWeight="bold">
            You scored {score} out of {activeQuestions.length}!
          </Text>
          <Button onClick={generateQuiz} bg="#00F5D4" color="#1A1A1A" size="lg" px={10} borderWidth="3px" borderColor="#1A1A1A" boxShadow="4px 4px 0px #1A1A1A" _hover={{ transform: "translateY(-2px)" }}>
            Retake Quiz 🔄
          </Button>
        </Box>
      )}

      {/* --- THE 10 QUESTIONS LIST --- */}
      <VStack spacing={10} align="stretch">
        {activeQuestions.map((q, index) => {
          const userAnswer = answers[q.id];
          const correctAnswer = q.answer[0];

          return (
            <Box
              key={q.id}
              bg="white"
              p={8}
              borderRadius="2xl"
              borderWidth="4px"
              borderColor="#1A1A1A"
              boxShadow="8px 8px 0px rgba(0,0,0,0.1)"
            >
              <Flex gap={4} mb={6}>
                <Flex align="center" justify="center" bg="#FF1053" color="white" minW="50px" h="50px" borderRadius="full" fontWeight="extrabold" fontSize="xl" borderWidth="3px" borderColor="#1A1A1A">
                  {index + 1}
                </Flex>
                <Heading size="lg" color="#1A0933" pt={2}>{q.question_text}</Heading>
              </Flex>

              <SimpleGrid columns={[1, null, 2]} spacing={4} mb={isSubmitted ? 6 : 0}>
                {q.options.map((option) => {

                  let bgColor = "#f4f4f4";
                  let textColor = "#1A1A1A";
                  let shadow = "4px 4px 0px #1A1A1A";
                  let transform = "none";

                  if (isSubmitted) {
                    if (option === correctAnswer) {
                      bgColor = "#00E676";
                      textColor = "#062A17";
                    } else if (option === userAnswer) {
                      bgColor = "#FF1053";
                      textColor = "white";
                    }
                    if (option !== correctAnswer) {
                      shadow = "0px 0px 0px #1A1A1A";
                      transform = "translateY(4px)";
                    }
                  } else if (option === userAnswer) {
                    bgColor = "#00F5D4";
                    shadow = "0px 0px 0px #1A1A1A";
                    transform = "translateY(4px)";
                  }

                  return (
                    <Button
                      key={option}
                      onClick={() => handleSelect(q.id, option)}
                      bg={bgColor}
                      color={textColor}
                      fontSize="lg"
                      fontWeight="bold"
                      height="auto"
                      py={4}
                      whiteSpace="normal"
                      borderRadius="xl"
                      borderWidth="3px"
                      borderColor="#1A1A1A"
                      boxShadow={shadow}
                      transform={transform}
                      transition="all 0.1s"
                      _hover={!isSubmitted ? { bg: option === userAnswer ? "#00F5D4" : "#e0e0e0" } : {}}
                      _active={!isSubmitted ? { transform: "translateY(4px)", boxShadow: "0px 0px 0px #1A1A1A" } : {}}
                      isDisabled={isSubmitted}
                    >
                      {option}
                    </Button>
                  );
                })}
              </SimpleGrid>

              {isSubmitted && (
                <Box bg={userAnswer === correctAnswer ? "#E8FBF0" : "#FFE5EB"} p={4} borderRadius="lg" borderWidth="2px" borderColor={userAnswer === correctAnswer ? "#00E676" : "#FF1053"}>
                  <Text fontWeight="bold" color={userAnswer === correctAnswer ? "#062A17" : "#8A0021"}>
                    {userAnswer === correctAnswer ? "✅ Correct!" : "❌ Incorrect."} {q.explanation}
                  </Text>
                </Box>
              )}
            </Box>
          );
        })}
      </VStack>

      {/* --- BOTTOM SUBMIT BUTTON --- */}
      {!isSubmitted && (
        <Box mt={10} textAlign="center">
          <Text mb={4} fontWeight="bold" color="gray.600">
            {totalAnswered} of {activeQuestions.length} answered
          </Text>
          <Button
            onClick={handleSubmit}
            isDisabled={!isReadyToSubmit}
            bg="#FFEA00"
            color="#1A1A1A"
            size="lg"
            px={16}
            py={8}
            fontSize="2xl"
            borderWidth="4px"
            borderColor="#1A1A1A"
            boxShadow="6px 6px 0px #1A1A1A"
            fontWeight="extrabold"
            _hover={{ transform: "translateY(-2px)" }}
            _active={{ transform: "translateY(6px)", boxShadow: "0px 0px 0px #1A1A1A" }}
          >
            Submit Quiz
          </Button>
        </Box>
      )}
      </Box>
    </Box>
  );
};

export default ArticleQuizPage;
