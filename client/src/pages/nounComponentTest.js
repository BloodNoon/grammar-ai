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
  return (
    <Box borderWidth="1px" backgroundColor="#FFCEA0" minH="100vh">
      <VStack spacing={6} p={8} align="stretch">
        <ContentBox
          title="Noun Component Test Page"
          info="This is a test page for noun components."
        >
          <Text color="#073B4C" fontSize="xl" textAlign="center" mt={4}>
            
          </Text>
        </ContentBox>

        <SortingGame />

      </VStack>
    </Box>
  );
}
