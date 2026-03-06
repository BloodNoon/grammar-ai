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
  // Filter for typing questions (Single answer)
  const typingQuestions = nounData.filter(q => {
  // 1. Must be a Single answer
  if (q.answer_count !== "Single" || q.answer.length !== 1) return false;
  
  const answerText = q.answer[0];
  
  // 2. Reject if the answer contains an arrow (Error Correction questions)
  if (answerText.includes("→")) return false;
  
  // 3. Reject if the answer is a full sentence (more than 1 or 2 words)
  if (answerText.split(" ").length > 2) return false;

  return true; // If it survives all that, it's a good typing question!
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
      </VStack>
    </Box>
  );
}
