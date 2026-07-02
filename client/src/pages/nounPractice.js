import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { PageContainer, GameCard, LessonPageHeader } from "../components/ui";

// Import the refactored wrappers
import SortingGameWrapper from "../components/SortingGameWrapper";
import TypingGameWrapper from "../components/typingGameWrapper";
import MultipleChoiceWrapper from "../components/multipleChoiceWrapper";

// Import Noun Hunt Game
import NounHuntGame from "./nounComponents/NounHuntGame";

// Import your 150-item JSON file
import nounData from "../data/nouns_questions.json";

const NounPractice = () => {
  const sortingQuestions = nounData.filter((q) => q.practice_type === "sorting");
  const typingQuestions = nounData.filter((q) => q.practice_type === "typing");
  const mcQuestions = nounData.filter((q) => q.practice_type === "multiple_choice");

  const games = [
    {
      id: "mc",
      title: "📝 Noun Identification Challenge",
      color: "green.500",
      component: <MultipleChoiceWrapper questionsToPlay={mcQuestions} nextPath="/propcom-nouns" />,
    },
    {
      id: "typing",
      title: "✍️ Typing Challenge",
      color: "purple.500",
      component: <TypingGameWrapper questionsToPlay={typingQuestions} nextPath="/propcom-nouns" />,
    },
    {
      id: "sorting",
      title: "🔀 Noun Category Sorting",
      color: "#FF5722",
      component: <SortingGameWrapper questionsToPlay={sortingQuestions} nextPath="/propcom-nouns" />,
    },
    {
      id: "hunt",
      title: "🔍 Noun Hunt",
      color: "yellow.500",
      component: <NounHuntGame />,
    },
  ];

  const [activeGame, setActiveGame] = useState(0);
  const [completed, setCompleted] = useState(false);

  const current = games[activeGame];
  const isLast = activeGame === games.length - 1;

  const handleNext = () => {
    if (isLast) {
      setCompleted(true);
    } else {
      setActiveGame((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setActiveGame(0);
    setCompleted(false);
  };

  return (
    <PageContainer>
      <LessonPageHeader icon="🎯" title="Noun Practice Games" />

      <Box maxW="800px" mx="auto">
        {completed ? (
          <GameCard variant="game" textAlign="center" py={12}>
            <Text fontSize="4xl" mb={3}>🏆</Text>
            <Heading size="lg" color="ink.700" mb={3}>
              You've completed all the Noun games!
            </Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              Great work mastering nouns through Multiple Choice, Typing,
              Sorting, and Noun Hunt.
            </Text>
            <Box
              as="button"
              onClick={handleRestart}
              bg="brand.500"
              color="ink.900"
              px={6}
              py={3}
              borderRadius="xl"
              fontWeight="700"
              border="2px solid"
              borderColor="ink.900"
              boxShadow="2px 2px 0px rgba(0,0,0,0.1)"
              _hover={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.15)" }}
            >
              ↺ Restart All Games
            </Box>
          </GameCard>
        ) : (
          <GameCard variant="game">
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color={current.color}>
                {current.title}
              </Heading>
              <Flex gap={1.5} align="center">
                {games.map((g, idx) => (
                  <Box
                    key={g.id}
                    w={2}
                    h={2}
                    borderRadius="full"
                    bg={
                      idx === activeGame
                        ? "brand.500"
                        : idx < activeGame
                          ? "green.400"
                          : "gray.300"
                    }
                    transition="background 0.3s"
                  />
                ))}
              </Flex>
            </Flex>

            <Text fontSize="xs" color="gray.500" mb={4}>
              Game {activeGame + 1} of {games.length}
            </Text>

            {current.component}

            <Flex justify="flex-end" mt={6}>
              <Box
                as="button"
                onClick={handleNext}
                bg={isLast ? "green.500" : current.color}
                color="white"
                px={6}
                py={2.5}
                borderRadius="xl"
                fontWeight="600"
                border="2px solid"
                borderColor="ink.900"
                boxShadow="2px 2px 0px rgba(0,0,0,0.1)"
                _hover={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.15)" }}
              >
                {isLast ? "Finish ✓" : "Next Game →"}
              </Box>
            </Flex>
          </GameCard>
        )}
      </Box>
    </PageContainer>
  );
};

export default NounPractice;
