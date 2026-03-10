import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
import Carousel from './nounComponents/carousel';
import WordPile from './nounComponents/wordPile';
import SentenceArranger from './nounComponents/sentenceArranger';
import SortingGame from './nounComponents/sortingComponent';
import nounData from '../data/nouns_questions.json';
import TypingGameWrapper from './nounComponents/typingGameWrapper';
import MultipleChoiceWrapper from './nounComponents/multipleChoiceWrapper';

// Content box template
function ContentBox({ title, info, children }) {
  return (
    <Box
      p={5}
      borderWidth="1px"
      backgroundColor="#00C2D1"
      borderColor="#073B4C"
      borderRadius="2xl"
      boxShadow="6px 6px 0px #073B4C"
    >
      <Heading color="#073B4C" fontSize="2em" fontWeight="semibold" textAlign="center">
        {title}
      </Heading>
      <Text color="#073B4C" fontSize="xl" mt={4} textAlign="center">
        {info}
      </Text>
      {children}
    </Box>
  );
}

export default function NounComponentTest() {
  // Filter for typing questions (Single answer, no arrows, max 2 words)
  const typingQuestions = nounData.filter(q => {
    if (q.answer_count !== "Single" || q.answer.length !== 1) return false;
    const answerText = q.answer[0];
    if (answerText.includes("→")) return false;
    if (answerText.split(" ").length > 2) return false;
    return true;
  });

  // Filter for multiple choice questions (Multiple answers with 4 options)
  const multipleChoiceQuestions = nounData.filter(q => {
    if (q.answer_count !== "Single") return false;
    if (!q.options || q.options.length !== 4) return false;
    return true;
  });

  return (
    <Box borderWidth="1px" backgroundColor="#FFCEA0" minH="100vh">
      <VStack spacing={6} p={8} align="stretch">
        <ContentBox
          title="Noun Component Test Page"
          info="This is a test page for noun components."
        />

        <Box>
          <Heading mb={6} color="#073B4C" textAlign="center">Noun Typing Practice</Heading>
          <TypingGameWrapper questionsToPlay={typingQuestions} />
        </Box>

        <Box>
          <Heading mb={6} color="#073B4C" textAlign="center">Noun Multiple Choice</Heading>
          <MultipleChoiceWrapper questionsToPlay={multipleChoiceQuestions} />
        </Box>
      </VStack>
    </Box>
  );
}
