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
import { useHistory } from 'react-router-dom';
import Carousel from './nounComponents/carousel';
import WordPile from './nounComponents/wordPile';



// Content box template
function ContentBox({ title, info, children }) {
  return (
    <Box
      p={5}
      borderWidth="1px"
      backgroundColor="#9D4EDD"
      borderColor="#073B4C"
      borderRadius="2xl"
      boxShadow="6px 6px 0px #073B4C"
    >
      <Heading color="#1A0933" fontSize="2em" fontWeight="semibold" textAlign="center">
        {title}
      </Heading>
      <Text color="#1A0933" fontSize="xl" mt={4} textAlign="center">
        {info}
      </Text>
      {children}
    </Box>
  );
}






export default function PropComNoun() {
  const history = useHistory();

  const handleNextLesson = () => {
    history.push('/abplur-nouns');
  };

  return (

    <Box borderWidth="1px" backgroundColor="#FFCEA0" minH="100vh">
<VStack spacing={6} p={8} align="stretch">
<ContentBox
title="Lesson 2: Common and Proper Nouns"
info=" There are two main types of nouns: common nouns and proper nouns.
"
>

</ContentBox>

<Box backgroundColor="#9D4EDD" borderColor="#073B4C" p={5} borderWidth="1px" borderRadius="2xl" boxShadow="6px 6px 0px #073B4C">
<Heading color="#1A0933" size="xl" textAlign="center" fontWeight="semibold">
  Common Nouns
</Heading>
<Text color="#1A0933" fontSize="xl" textAlign="center">
  Common nouns name general people, places, or things.
</Text>
<Text color="#1A0933" fontSize="xl" textAlign="center">
    Examples of common nouns:
</Text>
<Text color="#1A0933" fontSize="xl" textAlign="center">
    teacher, school, park, city, dog, cat, horse, book, chair, apple.
</Text>



</Box>
<ContentBox
title="Proper Nouns"
info=" Proper nouns are specific names of people, places, or things.">
  <Text color="#1A0933" fontSize="xl" textAlign="center">Proper Nouns always start with a capital letter.</Text>
  <Text color="#1A0933" fontSize="xl" textAlign="center">Examples off proper nouns:</Text>
  <Text color="#1A0933" fontSize="xl" textAlign="center">
    John, Paris, New York, Bill Gates, Apple, Microsoft.</Text>
</ContentBox>
<ContentBox
title="Comparison of Common and Proper Nouns"
info="Here is a comparison of common and proper nouns:">
<Text color="#1A0933" fontSize="2xl" textAlign="center">
  Common Noun Sentence:
</Text>
<Text color="#1A0933" fontSize="xl" textAlign="center">
  I visited <Text as="mark">the city.</Text>
</Text>
<Text color="#1A0933" fontSize="2xl" textAlign="center">
  Proper Noun Sentence:
</Text>
<Text color="#1A0933" fontSize="xl" textAlign="center">
  I visited <Text as="mark">London.</Text>
</Text>
<Text color="#1A0933" fontSize="xl"  textAlign="center">
  <Text as="em" color="#FF758F">Key Idea: If the noun is a specific name and capitalized, it is a proper noun.</Text>
</Text>
</ContentBox>
<ContentBox
title="Sentence Structure Focus"
info="Proper nouns follow the same sentence patterns as common nouns but use capitalization">
  <Text color="#1A0933" fontSize="2xl" textAlign="center">
    Example: </Text>
    <Box display="flex" justifyContent="center" mt={4}>
    <Popover>

                  <PopoverTrigger>
                    <Button color="#1A1A1A" backgroundColor="#00F5D4" fontSize="xl">James</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Proper Noun</PopoverHeader>
                    <PopoverBody>
                      <Text color="#1A0933" fontWeight="bold">James is a name, which makes it a proper noun.</Text>
                    </PopoverBody>
                  </PopoverContent>
                  <Text color="#1A0933" fontSize="xl"> visited  </Text>
                </Popover>


                               <Popover>
                              <PopoverTrigger>
                                <Button color="#1A1A1A" backgroundColor="#00F5D4" fontSize="xl">New York</Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Proper Noun</PopoverHeader>
                                <PopoverBody>
                                  <Text color="#1A0933" fontWeight="bold">New York is a named place, which makes it a proper noun.</Text>
                                </PopoverBody>
                              </PopoverContent>
                              <Text color="#1A0933" fontSize="xl">.</Text>
                            </Popover>
                   </Box>
                   <Divider size="sm" my={4} />
                   <Box display="flex" justifyContent="center" mt={4}>
    <Popover>
                <Text color="#1A0933" fontSize="xl">The </Text>
                  <PopoverTrigger>
                    <Button color="#1A1A1A" backgroundColor="#00F5D4" fontSize="xl">teacher</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Common Noun</PopoverHeader>
                    <PopoverBody>
                      <Text color="#1A0933" fontWeight="bold">Teacher isn't a name, which makes it a common noun.</Text>
                    </PopoverBody>
                  </PopoverContent>
                  <Text color="#1A0933" fontSize="xl"> visited  </Text>
                </Popover>


                               <Popover>
                              <PopoverTrigger>
                                <Button color="#1A1A1A" backgroundColor="#00F5D4" fontSize="xl">a city</Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                <PopoverHeader>Common Noun</PopoverHeader>
                                <PopoverBody>
                                  <Text color="#1A0933" fontWeight="bold">the city isn't a named place, which makes it a common noun.</Text>
                                </PopoverBody>
                              </PopoverContent>
                              <Text color="#1A0933" fontSize="xl">.</Text>
                            </Popover>
                   </Box>
</ContentBox>
<Button ml="45%" colorScheme="teal" variant="outline" size="lg" onClick={handleNextLesson}>Next Lesson</Button>
</VStack>
    </Box>

  );



}