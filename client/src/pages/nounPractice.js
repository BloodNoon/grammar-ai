import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Divider
} from '@chakra-ui/react';
import nounData from '../data/nouns_questions.json';
import TypingGameWrapper from './nounComponents/typingGameWrapper';
import MultipleChoiceWrapper from './nounComponents/multipleChoiceWrapper';
import SortingGameWrapper from './nounComponents/SortingGameWrapper';

export default function NounPractice() {
  // Filter for typing questions (Single answer, no arrows, max 2 words)
  const typingQuestions = nounData.filter(q => {
    if (q.answer_count !== "Single" || q.answer.length !== 1) return false;
    const answerText = q.answer[0];
    if (answerText.includes("→")) return false;
    if (answerText.split(" ").length > 2) return false;
    return true;
  });

  // Filter for multiple choice questions (Single answer with 4 options)
  const multipleChoiceQuestions = nounData.filter(q => {
    if (q.answer_count !== "Single") return false;
    if (!q.options || q.options.length !== 4) return false;
    return true;
  });

  return (
    <Box backgroundColor="#FFCEA0" minH="100vh">
      <VStack spacing={10} p={8} align="stretch">

        {/* Page Header */}
        <Box textAlign="center" py={6}>
          <Heading
            color="#073B4C"
            fontSize="4xl"
            fontWeight="bold"
            textShadow="2px 2px 0px rgba(0,0,0,0.1)"
          >
            Noun Practice Games
          </Heading>
        </Box>

        <Divider borderColor="#073B4C" borderWidth="2px" />

        {/* Sorting Game Section */}
        <Box>
          <Heading mb={6} color="#073B4C" textAlign="center" fontSize="3xl">
            🎯 Sorting Game
          </Heading>
          <SortingGameWrapper />
        </Box>

        <Divider borderColor="#073B4C" borderWidth="2px" />

        {/* Typing Game Section */}
        <Box>
          <Heading mb={6} color="#073B4C" textAlign="center" fontSize="3xl">
            ⌨️ Typing Practice
          </Heading>
          <TypingGameWrapper questionsToPlay={typingQuestions} />
        </Box>

        <Divider borderColor="#073B4C" borderWidth="2px" />

        {/* Multiple Choice Section */}
        <Box>
          <Heading mb={6} color="#073B4C" textAlign="center" fontSize="3xl">
            ✅ Multiple Choice
          </Heading>
          <MultipleChoiceWrapper questionsToPlay={multipleChoiceQuestions} />
        </Box>

      </VStack>
    </Box>
  );
}
