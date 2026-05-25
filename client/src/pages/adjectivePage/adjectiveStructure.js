import React from "react";
import { Box, Heading, Text, Grid, VStack, Divider } from "@chakra-ui/react";
import { PageContainer, GameCard } from "../../components/ui";

// ADJECTIVE COMPONENTS
import AdjectiveLesson from "../../utils/SentenceChecker/AdjectiveLesson";
import AdjectiveRoyalOrder from "../../utils/SentenceChecker/AdjectiveRoyalOrder";
import AdjectiveSentenceStructures from "../../utils/SentenceChecker/AdjectiveSentenceStructures";
import AdjectiveFillBlanks from "../../utils/SentenceChecker/AdjectiveFillBlanks";
import AdjectiveSortingGame from "../../utils/SentenceChecker/AdjectiveSortingGame";
import AdjectiveQuiz from "../../utils/SentenceChecker/AdjectiveQuiz";
import adjectivesData from "../../data/adjectives_questions.json";
import WordHunterGame from "../../components/wordHunter";

const AdjectivePage = () => {
  return (
    <PageContainer>
      <GameCard mb={8} textAlign="center" bg="brand.500">
        <Heading size="xl">🐸 Adjective Lessons</Heading>
      </GameCard>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          <GameCard variant="game">
            <AdjectiveLesson />
          </GameCard>

          <GameCard variant="game">
            <Heading size="md" color="blue.700" mb={4}>
              ✍️ Adjective Fill-in-the-Blank
            </Heading>
            <AdjectiveFillBlanks />
          </GameCard>

          <GameCard variant="game" bg="purple.50">
            <WordHunterGame
              questions={adjectivesData.filter(
                (q) => q.exercise === "identifying",
              )}
            />
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">
          {/* THE VIDEO PANEL */}
          <GameCard variant="game" bg="gray.50">
            <Heading size="md" color="ink.700" mb={4}>
              📹 Today's Lesson: Adjectives
            </Heading>

            <Box
              position="relative"
              w="100%"
              bg="black"
              borderRadius="lg"
              overflow="hidden"
              borderWidth="1px"
              borderColor="gray.300"
            >
              <video
                controls
                style={{ width: "100%", height: "580px", display: "block" }}
              >
                <source src="/lesson4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>

            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </GameCard>

          <GameCard variant="game">
            <Heading size="lg" textAlign="center" mb={6}>
              Interactive Practice
            </Heading>
            <AdjectiveRoyalOrder />
            <Divider my={6} />
            <AdjectiveSentenceStructures />
            <Divider my={6} />
            <AdjectiveSortingGame />
          </GameCard>
        </VStack>
      </Grid>

      <GameCard variant="game" mt={8}>
        <Heading size="xl" textAlign="center" mb={6} color="gray.700">
          🏆 Final Adjective Quiz
        </Heading>
        <AdjectiveQuiz />
      </GameCard>
    </PageContainer>
  );
};

export default AdjectivePage;
