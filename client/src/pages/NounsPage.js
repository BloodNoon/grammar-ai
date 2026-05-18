import React from 'react';
import { Box, Heading, Text, Grid, GridItem, Flex, VStack, SimpleGrid, Badge } from '@chakra-ui/react';

// Import our Interactive Components!
import NounPronounSorter from '../utils/SentenceChecker/NounPronounSorter';
import PronounReplacement from '../utils/SentenceChecker/PronounReplacement';
import NounSentenceBuilder from '../utils/SentenceChecker/NounSentenceBuilder';
import NounTypingGame from '../utils/SentenceChecker/NounTypingGame';


const nounTypes = [
  { name: "Common", desc: "Everyday, generic names. No capital letters.", examples: "city, dog, car" },
  { name: "Proper", desc: "Specific, special names. Always capitalized.", examples: "Paris, Rover, Tuesday" },
  { name: "Concrete", desc: "Things you can physically touch or see.", examples: "apple, water, jacket" },
  { name: "Abstract", desc: "Ideas or feelings. You cannot touch them.", examples: "love, bravery, time" },
  { name: "Collective", desc: "A single word for a group of things.", examples: "flock, team, family" },
  { name: "Countable", desc: "Things you can count with numbers.", examples: "one cat, two cats" },
  { name: "Uncountable", desc: "Things you cannot easily count.", examples: "sand, knowledge, water" },
  { name: "Compound", desc: "Two or more words together make one noun.", examples: "toothbrush, basketball, bus stop" }
];

const pronounTypes = [
  { name: "Personal", desc: "Replaces specific people or things.", examples: "he, she, it, they, we" },
  { name: "Possessive", desc: "Shows ownership of a noun.", examples: "mine, yours, his, theirs" },
  { name: "Reflexive", desc: "Reflects back to the subject.", examples: "myself, herself, themselves" },
  { name: "Demonstrative", desc: "Points to specific things.", examples: "this, that, these, those" },
  { name: "Indefinite", desc: "Refers to non-specific people/things.", examples: "someone, anything, nobody" }
];

const NounsPage = () => {
  return (
    <Box bg="#F6D5B4" minH="100vh" p={{ base: 4, md: 8 }} fontFamily="'Inter', sans-serif">
      
      {/* Page Header */}
      <Box maxW="1400px" mx="auto" mb={8} bg="#F0B784" p={4} borderRadius="xl" borderWidth="2px" borderColor="whiteAlpha.600" textAlign="center">
        <Heading color="#4A2C11" size="xl">
          🐸 Nouns & Pronouns Builder
        </Heading>
      </Box>

      {/* Main 2-Column Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} maxW="1400px" mx="auto">
        
      
        <VStack spacing={6} align="stretch">
          
          {/* Nouns Lesson Box */}
          <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="lg" color="#1A0933" mb={4}>1. Types of Nouns</Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A <strong>noun</strong> is a person, place, thing, or idea. They are the building blocks of every sentence you write!
            </Text>
            
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              {nounTypes.map((noun, idx) => (
                <Flex key={idx} bg="gray.50" p={4} borderRadius="xl" borderWidth="1px" borderColor="gray.200" direction="column">
                  <Badge colorScheme="orange" w="fit-content" mb={2} px={2} py={1} borderRadius="md">{noun.name} Nouns</Badge>
                  <Text fontSize="sm" color="gray.700" mb={3} flex="1">{noun.desc}</Text>
                  <Box bg="white" p={2} borderRadius="md" borderWidth="1px" borderColor="gray.200">
                    <Text fontSize="xs" fontWeight="bold" color="gray.500">EXAMPLES:</Text>
                    <Text fontSize="sm" fontWeight="bold" color="#4A2C11">{noun.examples}</Text>
                  </Box>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>

          {/* Pronouns Lesson Box */}
          <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="lg" color="#1A0933" mb={4}>2. Types of Pronouns</Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A <strong>pronoun</strong> takes the place of a noun. If we didn't have pronouns, we would have to say: <em>"John drove John's car to John's house."</em>
            </Text>
            
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              {pronounTypes.map((pro, idx) => (
                <Flex key={idx} bg="#F3E8FF" p={4} borderRadius="xl" borderWidth="1px" borderColor="#D8B4FE" direction="column">
                  <Badge colorScheme="purple" w="fit-content" mb={2} px={2} py={1} borderRadius="md">{pro.name}</Badge>
                  <Text fontSize="sm" color="gray.700" mb={3} flex="1">{pro.desc}</Text>
                  <Box bg="white" p={2} borderRadius="md" borderWidth="1px" borderColor="#D8B4FE">
                    <Text fontSize="xs" fontWeight="bold" color="purple.500">EXAMPLES:</Text>
                    <Text fontSize="sm" fontWeight="bold" color="#4A2C11">{pro.examples}</Text>
                  </Box>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>

             {/* THE NEW TYPING COMPONENT */}
          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
             <Heading size="md" color="#9C27B0" mb={4}>Practice 4: Spelling & Forms Typer</Heading>
             <NounTypingGame />
          </Box>
        </VStack>

        {/* ========================================== */}
        {/* RIGHT COLUMN: Video & Interactive Games */}
        {/* ========================================== */}
        <VStack spacing={6} align="stretch">
          
          {/* THE VIDEO PANEL */}
          <Box bg="#f8f9fa" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)" textAlign="center">
            <Heading size="md" color="#1A0933" mb={4}>
              📹 Today's Lesson: Nouns & Pronouns
            </Heading>
            
            <Box position="relative" w="100%" bg="black" borderRadius="lg" overflow="hidden" borderWidth="1px" borderColor="gray.300">
              <video controls style={{ width: '100%', height: '580px', display: 'block' }}>
                <source src="/Lesson1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
            
            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
             <Heading size="md" color="#00BCD4" mb={4}>Practice 1: Noun vs Pronoun Sorter</Heading>
             <NounPronounSorter />
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
             <Heading size="md" color="#4CAF50" mb={4}>Practice 2: Pronoun Replacement</Heading>
             <PronounReplacement />
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
             <Heading size="md" color="#FF5722" mb={4}>Practice 3: Sentence Builder</Heading>
             <NounSentenceBuilder />
          </Box>

       

        </VStack>
      </Grid>



    </Box>
  );
};

export default NounsPage;
