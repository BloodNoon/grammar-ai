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
import { useHistory } from 'react-router-dom';

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

export default function AbPlurNoun() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/noun-practice');
  };
  return (
    <Box borderWidth="1px" backgroundColor="#FFCEA0" minH="100vh">
      <VStack spacing={6} p={8} align="stretch">
        <ContentBox
          title="Lesson 3: Abstract and Plural Nouns"
          info="Learn about abstract nouns and how to form plural nouns."
        ></ContentBox>

        <ContentBox
        title={"Plural Nouns"}
        info="Nouns can change form depending on meaning.
Plural nouns mean more than one.">
        <Text color="#073B4C" fontSize="3xl" textAlign="center">Examples:</Text>
        <Text color="#073B4C" fontSize="2xl" textAlign="center">
          <ul style={{ listStyleType: 'none' }}>
            <li>dog → dogs</li>
            <li>book → books</li>
            <li>child → children</li>
          </ul>
        </Text>

</ContentBox>

<ContentBox
title="Abstract Nouns"
info="Abstract nouns name ideas, feelings, or qualities that you cannot touch.">
    <Text color="#073B4C" fontSize="3xl" textAlign="center">Compare:</Text>
    <Text color="#073B4C" fontSize="2xl" textAlign="center">
    <ul style={{ listStyleType: 'none' }}>
      <li>She held a <Text color="#073B4C" as="mark">book</Text>. (concrete noun — you can touch it)</li>
      <li>She felt <Text color="#073B4C" as="mark">happiness</Text>. (abstract noun — you cannot touch it)</li>
    </ul></Text>
</ContentBox>
<ContentBox
title="Key Idea"
info="Plural nouns show quantity.
Abstract nouns show ideas or feelings.">

</ContentBox>
        <Button ml="45%" colorScheme="teal" variant="outline" size="lg" onClick={handleClick}>Go to Practice</Button>
      </VStack>
    </Box>
  );
}
