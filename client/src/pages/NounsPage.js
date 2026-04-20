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
import { useHistory } from 'react-router-dom';
import Carousel from './nounComponents/carousel';
import WordPile from './nounComponents/wordPile';


// Content box template
function ContentBox({ title, info, children }) {
  return (
    <Box
      p={5}
      borderWidth="1px"
      backgroundColor="#00E676"
      borderColor="#062A17"
      borderRadius="2xl"
      boxShadow="6px 6px 0px #062A17"
    >
      <Heading color="#062A17" fontSize="2em" fontWeight="semibold" textAlign="center">
        {title}
      </Heading>
      <Text color="#062A17" fontSize="xl" mt={4} textAlign="center">
        {info}
      </Text>
      {children}
    </Box>
  );
}






export default function NounsPage() {
  const history = useHistory();

  const handleNextLesson = () => {
    history.push('/propcom-nouns');
  };

  return (
    <Box borderWidth="1px" backgroundColor="#FFCEA0" minH="100vh">
      <VStack spacing={6} p={8} align="stretch">
    
    
    
        <ContentBox
          title="Lesson 1: Introduction to Nouns"
          info="A noun is a word that names a person, place, thing (animal,objects, etc...), and ideas."
        />
        <ContentBox>
          <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
            <video width="420" height="480" controls>
              <source src="/lesson1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        </ContentBox>
        <ContentBox
          title="Examples of Nouns"
          info="Here are some examples of nouns:"
        >
          <Box display="flex" justifyContent="center" mt={4}>
            <Popover>
            <Text color="#062A17" fontSize="xl">The </Text>
              <PopoverTrigger>
                <Button color="#062A17" backgroundColor="#FFFFFF" fontSize="xl">dog</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Noun</PopoverHeader>
                <PopoverBody>
                  <Text color="#062A17" fontWeight="bold">Dog is a noun</Text>
                </PopoverBody>
              </PopoverContent>
              <Text color="#062A17" fontSize="xl"> ran across the  </Text>
            </Popover>
               <Popover>
              <PopoverTrigger>
                <Button color="#062A17" backgroundColor="#FFFFFF" fontSize="xl">yard</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Noun</PopoverHeader>
                <PopoverBody>
                  <Text color="#062A17" fontWeight="bold">Yard is a noun</Text>
                </PopoverBody>
              </PopoverContent>
              <Text color="#062A17" fontSize="xl">.</Text>
            </Popover>
          </Box>
        </ContentBox>


<Box backgroundColor="#00E676" borderColor="#062A17" p={5} borderWidth="1px" borderRadius="2xl" boxShadow="6px 6px 0px #062A17">
<Heading color="#062A17" as="h2" size="xl" textAlign="center" mb={6} fontWeight="semibold">
  Categories of Nouns
</Heading>
<WordPile />
<Text color="#062A17" fontSize="lg" textAlign="center">
  Nouns have categories. They aren't just random words. They have a category that describes what they are. For example, the word "dog" belongs to the category of "animals". The word "chair" belongs to the category of "things". The word "school" belongs to the category of "places" and the word "teacher" belongs to the category of "people".
</Text>
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
          Idea
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
       <ContentBox
          title="Sentence Structure Focus"
          info="Nouns often appear as the subject or the object in a sentence"
        >
          
                      <Box display="flex" justifyContent="center" mt={4}>
            <Popover>
            <Text color="#062A17" fontSize="xl">The </Text>
              <PopoverTrigger>
                <Button color="#062A17" backgroundColor="#FFFFFF" fontSize="xl">teacher</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Subject Noun</PopoverHeader>
                <PopoverBody>
                  <Text color="#062A17" fontWeight="bold">Teacher is a subject noun</Text>
                </PopoverBody>
              </PopoverContent>
              <Text color="#062A17" fontSize="xl"> carried a  </Text>
            </Popover>
               <Popover>
              <PopoverTrigger>
                <Button color="#062A17" backgroundColor="#FFFFFF" fontSize="xl">book</Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Object Noun</PopoverHeader>
                <PopoverBody>
                  <Text color="#062A17" fontWeight="bold">Book is an object noun</Text>
                </PopoverBody>
              </PopoverContent>
              <Text color="#062A17" fontSize="xl">.</Text>
            </Popover>
          </Box>
        </ContentBox>
        <Box>
          <Button ml="45%" colorScheme="teal" variant="outline" size="lg" onClick={handleNextLesson}>Next Lesson</Button>
        </Box>
      </VStack>
    </Box>
  );
}
