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
import prepositionData from "../data/prepositions_questions.json";
import {
  PageContainer,
  GameCard,
  OptionButton,
  FeedbackBanner,
  QuizSidebar,
} from "../components/ui";
import useQuiz from "../hooks/useQuiz";

const PrepositionQuizPage = () => {
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
  } = useQuiz(prepositionData);

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

                  {isSubmitted && q.explanation && (
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

export default PrepositionQuizPage;
