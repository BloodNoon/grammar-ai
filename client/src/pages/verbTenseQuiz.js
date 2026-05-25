import React from "react";
import {
  Heading,
  SimpleGrid,
  VStack,
  Flex,
  Grid,
  GridItem,
  Badge,
} from "@chakra-ui/react";
import verbData from "../data/verbs_questions.json";
import {
  PageContainer,
  GameCard,
  OptionButton,
  FeedbackBanner,
  QuizSidebar,
} from "../components/ui";
import useQuiz from "../hooks/useQuiz";

const distractors = [
  "run",
  "ran",
  "running",
  "runs",
  "walked",
  "walks",
  "walking",
  "will walk",
  "eat",
  "ate",
  "eating",
  "eats",
  "play",
  "played",
  "playing",
  "plays",
  "go",
  "went",
  "going",
  "goes",
  "have gone",
  "had gone",
  "will go",
];

const generateQuizData = (data) => {
  const validQuestions = data
    .filter((q) => q.answer && q.answer.length > 0)
    .map((q) => {
      if (q.options && q.options.length > 0) {
        return q;
      }

      const correctAnswers = q.answer;
      const options = [correctAnswers[0]];
      const filteredDistractors = distractors.filter(
        (d) => !correctAnswers.includes(d),
      );

      while (options.length < 4 && filteredDistractors.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * filteredDistractors.length,
        );
        options.push(filteredDistractors[randomIndex]);
        filteredDistractors.splice(randomIndex, 1);
      }

      return {
        ...q,
        options: options.sort(() => Math.random() - 0.5),
      };
    });

  return [...validQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
};

const VerbTenseQuizPage = () => {
  const {
    activeQuestions,
    answers,
    isSubmitted,
    score,
    handleSelect,
    handleSubmit,
    generateQuiz,
    totalAnswered,
    progressPercent,
  } = useQuiz(verbData, generateQuizData);

  return (
    <PageContainer>
      <GameCard mb={8} textAlign="center" bg="brand.500">
        <Heading size="lg">📝 Final Knowledge Check</Heading>
      </GameCard>

      <Grid templateColumns={{ base: "1fr", lg: "320px 1fr" }} gap={8}>
        <GridItem>
          <QuizSidebar
            answered={totalAnswered}
            total={activeQuestions.length}
            progress={progressPercent}
            isSubmitted={isSubmitted}
            score={score}
            onSubmit={handleSubmit}
            onRetake={generateQuiz}
          />
        </GridItem>

        <GridItem>
          <VStack spacing={6} align="stretch">
            {activeQuestions.map((q, index) => {
              const userAnswer = answers[q.id];
              const correctAnswer = q.answer[0];

              return (
                <GameCard key={q.id}>
                  <Flex align="flex-start" gap={4} mb={6}>
                    <Badge
                      colorScheme="orange"
                      fontSize="lg"
                      px={3}
                      py={1}
                      borderRadius="md"
                    >
                      Q{index + 1}
                    </Badge>
                    <Heading size="md" color="ink.700" pt={1}>
                      {q.question_text}
                    </Heading>
                  </Flex>

                  <SimpleGrid columns={[1, null, 2]} spacing={4}>
                    {q.options.map((option) => {
                      let isSelected = false;
                      let isCorrect = null;

                      if (isSubmitted) {
                        if (option === correctAnswer) {
                          isCorrect = true;
                        } else if (option === userAnswer) {
                          isCorrect = false;
                        }
                      } else if (option === userAnswer) {
                        isSelected = true;
                      }

                      return (
                        <OptionButton
                          key={option}
                          isSelected={isSelected}
                          isCorrect={isCorrect}
                          onClick={() => handleSelect(q.id, option)}
                          isDisabled={isSubmitted}
                        >
                          {option}
                        </OptionButton>
                      );
                    })}
                  </SimpleGrid>

                  {isSubmitted && (
                    <FeedbackBanner
                      mt={6}
                      type={userAnswer === correctAnswer ? "success" : "error"}
                    >
                      {userAnswer === correctAnswer
                        ? "✅ Correct:"
                        : "❌ Incorrect:"}{" "}
                      {q.explanation}
                    </FeedbackBanner>
                  )}
                </GameCard>
              );
            })}
          </VStack>
        </GridItem>
      </Grid>
    </PageContainer>
  );
};

export default VerbTenseQuizPage;
