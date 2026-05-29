import React from "react";
import { Box, Heading, Text, Grid, VStack } from "@chakra-ui/react";
import { PageContainer, GameCard, LessonIntroCard, LessonPageHeader } from "../components/ui";

const PrepositionSentenceStructures = () => {
  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Preposition Sentence Structures" />
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          {/* Learn the Lesson Box */}
          <LessonIntroCard
            title="Learn the Lesson"
            directions="Directions: Read the explanation in the boxes, take notes, and watch the video(s)."
          />

          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              Preposition Sentence Structures
            </Heading>
            <Text fontSize="md" color="gray.500" fontStyle="italic">
              Content coming soon...
            </Text>
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">
          <GameCard variant="game" bg="gray.50">
            <Heading size="md" color="ink.700" mb={4}>
              📹 Today's Lesson: Preposition Sentence Structures
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
                <source src="/preposition-sentence-structures.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </GameCard>
        </VStack>
      </Grid>
    </PageContainer>
  );
};

export default PrepositionSentenceStructures;
