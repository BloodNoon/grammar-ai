import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Grid, Flex, VStack, SimpleGrid, Badge, Table, Tbody, Tr, Td, Th, Thead, Divider } from '@chakra-ui/react';
 
// PREP1 COMPONENTS
import PrepositionSorter from '../../utils/SentenceChecker/PrepositionSorter';
import PrepositionStructureGame from '../../utils/SentenceChecker/PrepositionStructureGame';
import PrepositionQuiz from '../../utils/SentenceChecker/PrepositionQuiz';
import PrepositionFillBlanks from '../../utils/SentenceChecker/PrepositionFillBlanks';

const Prep1Structure = () => {
  const [showCongrats, setShowCongrats] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCongrats(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const formulas = [
    { pattern: "#Pronoun #Verb #Preposition #Article #Noun", example: "She walked to the store." },
    { pattern: "#Article #Noun #Verb #Preposition #Article #Noun", example: "The dog ran through the yard." },
    { pattern: "#Article #Noun #Verb #Preposition #Article #Noun #Preposition #Article #Noun", example: "Mark gave the book to Sarah." },
    { pattern: "#Pronoun #Verb #Preposition #Article #Noun", example: "They talked about eating lunch." },
    { pattern: "#Preposition #Article #Noun, #Noun #Verb #Article #Noun", example: "After the movie, Jack ate the pizza." }
  ];

  return (
    <Box bg="#F6D5B4" minH="100vh" p={{ base: 4, md: 8 }} fontFamily="'Inter', sans-serif">
      
      {/* Page Header */}
      <Box maxW="1400px" mx="auto" mb={8} bg="#F0B784" p={4} borderRadius="xl" borderWidth="2px" borderColor="whiteAlpha.600" textAlign="center">
        <Heading color="#4A2C11" size="xl">
          🐸 Preposition Lessons
        </Heading>
      </Box>

      {showCongrats && (
        <Box maxW="800px" mx="auto" mb={8} bg="#e8f5e8" border="2px solid" borderColor="#28a745" borderRadius="10px" p={6}>
          <Heading size="md" color="#28a745" mb={4}>🎉 Almost there!</Heading>
          <Text fontSize="lg" color="#333">
            You are making great progress! You've learned about subjects, objects, verb tenses, and articles. Let's master prepositions!
          </Text>
        </Box>
      )}

      {/* Main 2-Column Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} maxW="1400px" mx="auto">
        
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          
          <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="lg" color="#1A0933" mb={4}>1. Understanding Prepositions</Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A <strong>preposition</strong> is a word that indicates the relationship between a noun or pronoun and other words in a sentence. They often express relationships of time, place, direction, or situation.
            </Text>

            <Table size="sm" variant="simple" border="1px solid" borderColor="gray.200">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Type</Th>
                  <Th>Examples</Th>
                  <Th>Sample Phrase</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr><Td fontWeight="bold">Time</Td><Td>before, during, after</Td><Td>...<em>during</em> the movie.</Td></Tr>
                <Tr><Td fontWeight="bold">Place</Td><Td>in, on, under</Td><Td>...<em>under</em> the bed.</Td></Tr>
                <Tr><Td fontWeight="bold">Direction</Td><Td>to, through, around</Td><Td>...<em>through</em> the door.</Td></Tr>
                <Tr><Td fontWeight="bold">Situation</Td><Td>with, for, about</Td><Td>...<em>about</em> the test.</Td></Tr>
                <Tr><Td fontWeight="bold">Comparison</Td><Td>like, as, than</Td><Td>...<em>like</em> a tiger.</Td></Tr>
              </Tbody>
            </Table>
          </Box>

          <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="md" color="#1A0933" mb={4}>2. Sentence Patterns</Heading>
            <Text fontSize="sm" color="gray.600" mb={6}>Learn your new sentence structures:</Text>
            
            <VStack spacing={4} align="stretch">
              {formulas.map((item, index) => (
                <Box key={index} p={4} bg="gray.50" borderRadius="xl" borderWidth="1px" borderColor="gray.200">
                  <Text fontSize="xs" fontFamily="monospace" color="gray.600" mb={2}>{item.pattern}</Text>
                  <Box bg="white" p={3} borderRadius="md" border="1px dashed" borderColor="gray.300">
                    <Text fontSize="sm"><strong>Example:</strong> "{item.example}"</Text>
                  </Box>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">
          
          {/* THE VIDEO PANEL */}
          <Box bg="#f8f9fa" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)" textAlign="center">
            <Heading size="md" color="#1A0933" mb={4}>
              📹 Today's Lesson: Prepositions
            </Heading>
            
            <Box position="relative" w="100%" bg="black" borderRadius="lg" overflow="hidden" borderWidth="1px" borderColor="gray.300">
              <video controls style={{ width: '100%', height: '480px', display: 'block' }}> 
                <source src="/Lesson6.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
            
            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
             <Heading size="md" color="#00BCD4" mb={4} textAlign="center">Practice 1: Prepositions Sorter</Heading>
             <PrepositionSorter />
             
             <Divider my={8} />
             
             <Heading size="md" color="#4CAF50" mb={4} textAlign="center">Practice 2: Fill-in-the-Blanks</Heading>
             <Box bg="gray.50" p={6} borderRadius="xl" border="1px solid" borderColor="gray.200" textAlign="center">
               <Text fontSize="lg" fontWeight="bold" color="#333" mb={4}>The boy is sitting ______ a chair.</Text>
               <PrepositionFillBlanks />
             </Box>
             
             <Divider my={8} />
             
             <Heading size="md" color="#FF5722" mb={4} textAlign="center">Practice 3: Structure Game</Heading>
             <PrepositionStructureGame />
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
};

export default Prep1Structure;
