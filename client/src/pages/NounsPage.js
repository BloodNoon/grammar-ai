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
          title="Lesson 1: Introduction to Nouns"
          info="A noun is a word that names a person, place, thing, or animal."
        />

        <ContentBox
          title="Examples of Nouns"
          info="Here are some examples of nouns:"
        >
          <Box display="flex" justifyContent="center" mt={4}>
            <Popover>
            <Text fontSize="xl">The </Text>
              <PopoverTrigger>
                <Button>dog</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Noun</PopoverHeader>
                <PopoverBody>
                  <Text fontWeight="bold">Dog is a noun</Text>
                </PopoverBody>
              </PopoverContent>
              <Text fontSize="xl"> ran across the  </Text>
            </Popover>
               <Popover>
              <PopoverTrigger>
                <Button>yard</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Noun</PopoverHeader>
                <PopoverBody>
                  <Text fontWeight="bold">Yard is a noun</Text>
                </PopoverBody>
              </PopoverContent>
              <Text fontSize="xl">.</Text>
            </Popover>
          </Box>
        </ContentBox>


<Box backgroundColor="white" p={5} borderWidth="1px" borderRadius="lg">
<Heading as="h2" size="xl" textAlign="center" mb={6}>
  Categories of Nouns
</Heading>
<WordPile />
        <Accordion>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='center' fontSize='xx-large'>
          Person
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} textAlign="center" fontSize='xl'>
      Teacher | Doctor | Girl
    </AccordionPanel>
  </AccordionItem>
<AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='center' fontSize='xx-large'>
          Place
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} textAlign="center" fontSize='xl'>
        School | Park | City
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='center' fontSize='xx-large'>
          Thing
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} textAlign="center" fontSize='xl'>
      Chair | Apple | Book
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='center' fontSize='xx-large'>
          Animal
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} textAlign="center" fontSize='xl'>
      Dog | Cat | Horse
    </AccordionPanel>
  </AccordionItem>
  
</Accordion>
        </Box>
      </VStack>
    </Box>
  );
}