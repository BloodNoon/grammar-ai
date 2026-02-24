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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
import Carousel from './nounComponents/carousel';
import WordPile from './nounComponents/wordPile';


// Content box template
function ContentBox({ title, info, children }) {
  return (
    <Box
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      backgroundColor="white"
    >
      <Heading fontSize="2em" fontWeight="semibold" textAlign="center">
        {title}
      </Heading>
      <Text fontSize="xl" mt={4} textAlign="center">
        {info}
      </Text>
      {children}
    </Box>
  );
}






export default function NounsPage() {


  return (
    
    <Box borderWidth="1px" backgroundColor="#F0FDF4" minH="100vh">
<VStack spacing={6} p={8} align="stretch">
<ContentBox
title="Lesson 2: Common and Proper Nouns"
info=" There are two main types of nouns:common nouns and proper nouns.
"
>

</ContentBox>

<Box backgroundColor="white" p={5} borderWidth="1px" borderRadius="lg">
<Heading  size="xl" textAlign="center" fontWeight="semibold">
  Common Nouns
</Heading>
<Text fontSize="xl" textAlign="center">
  Common nouns name general people, places, or things.
</Text>
<Text FontSize="xl" textAlign="center">
    Examples of common nouns:
</Text>
<Text FontSize="xl" textAlign="center">
    teacher, school, park, city, dog, cat, horse, book, chair, apple.
</Text>


</Box>
</VStack>
    </Box>

  );



}