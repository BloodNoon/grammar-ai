import React, { useState } from "react";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { PageContainer, GameCard, LessonPageHeader } from "../components/ui";
import SortingGameWrapper from "../components/SortingGameWrapper";
import TypingGameWrapper from "../components/typingGameWrapper";
import MultipleChoiceWrapper from "../components/multipleChoiceWrapper";
import GrammarAIPractice from "../components/GrammarAIPractice";
import prepositionData from "../data/prepositions_questions.json";

const PrepositionPractice = () => {
  const sortingQuestions = prepositionData.filter((q) => q.practice_type === "sorting");
  const typingQuestions = prepositionData.filter((q) => q.practice_type === "typing");
  const mcQuestions = prepositionData.filter((q) => q.practice_type === "multiple_choice");

  const games = [
    { id: "mc", title: "📝 Preposition Identification Challenge", color: "green.500", component: <MultipleChoiceWrapper questionsToPlay={mcQuestions} nextPath="/prep1-structure" /> },
    { id: "typing", title: "✍️ Typing Challenge", color: "purple.500", component: <TypingGameWrapper questionsToPlay={typingQuestions} nextPath="/prep1-structure" /> },
    { id: "sorting", title: "🔀 Preposition Sorting", color: "#FF5722", component: <SortingGameWrapper questionsToPlay={sortingQuestions} nextPath="/prep1-structure" /> },
    { id: "ai-practice", title: "🤖 AI Scored Practice Test", color: "orange.500", component: null },
  ];

  const [activeGame, setActiveGame] = useState(0);
  const [completed, setCompleted] = useState(false);
  const current = games[activeGame];
  const isLast = activeGame === games.length - 1;
  const isAI = current.id === "ai-practice";

  const handleNext = () => { if (isLast) setCompleted(true); else setActiveGame((p) => p + 1); };
  const handleRestart = () => { setActiveGame(0); setCompleted(false); };

  return (
    <PageContainer>
      <LessonPageHeader icon="🎯" title="Preposition Practice Games" />
      <Box maxW="800px" mx="auto">
        {completed ? (
          <GameCard variant="game" textAlign="center" py={12}>
            <Text fontSize="4xl" mb={3}>🏆</Text>
            <Heading size="lg" color="ink.700" mb={3}>You've completed all the Preposition games!</Heading>
            <Text fontSize="md" color="gray.600" mb={6}>Great work mastering prepositions through Multiple Choice, Typing, Sorting, and AI Practice.</Text>
            <Box as="button" onClick={handleRestart} bg="brand.500" color="ink.900" px={6} py={3} borderRadius="xl" fontWeight="700" border="2px solid" borderColor="ink.900" boxShadow="2px 2px 0px rgba(0,0,0,0.1)" _hover={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.15)" }}>↺ Restart All Games</Box>
          </GameCard>
        ) : (
          <GameCard variant="game">
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md" color={current.color}>{current.title}</Heading>
              <Flex gap={1.5} align="center">{games.map((g, idx) => (<Box key={g.id} w={2} h={2} borderRadius="full" bg={idx === activeGame ? "brand.500" : idx < activeGame ? "green.400" : "gray.300"} transition="background 0.3s" />))}</Flex>
            </Flex>
            <Text fontSize="xs" color="gray.500" mb={4}>Game {activeGame + 1} of {games.length}</Text>
            {isAI ? (
              <GrammarAIPractice topic="prepositions" onComplete={handleNext} />
            ) : (
              <>
                {current.component}
                <Flex justify="flex-end" mt={6}>
                  <Box as="button" onClick={handleNext} bg={isLast ? "green.500" : current.color} color="white" px={6} py={2.5} borderRadius="xl" fontWeight="600" border="2px solid" borderColor="ink.900" boxShadow="2px 2px 0px rgba(0,0,0,0.1)" _hover={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.15)" }}>{isLast ? "Finish ✓" : "Next Game →"}</Box>
                </Flex>
              </>
            )}
          </GameCard>
        )}
      </Box>
    </PageContainer>
  );
};
export default PrepositionPractice;
