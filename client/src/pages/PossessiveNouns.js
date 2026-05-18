import React from 'react';
import { Box, Heading, Text, Grid, Flex, VStack, SimpleGrid, Badge } from '@chakra-ui/react';


import PossessiveSorter from '../utils/SentenceChecker/PossessiveSorter';
import PossessiveTypingGame from '../utils/SentenceChecker/PossessiveTypingGame';


const possessiveRules = [
  { rule: "Singular Nouns", desc: "Add an apostrophe + s ('s) to show ownership for one person/thing.", examples: "the dog's bone, Sarah's car" },
  { rule: "Plural Nouns (ending in s)", desc: "Just add an apostrophe (') after the 's'. Do NOT add another 's'.", examples: "the dogs' bones, the teachers' lounge" },
  { rule: "Irregular Plurals", desc: "If the plural word doesn't end in 's', treat it like a singular word and add ('s).", examples: "the children's toys, the men's shoes" },
  { rule: "Singular ending in 's'", desc: "Usually, you still add ('s), though just (') is sometimes accepted in older styles.", examples: "the boss's desk, James's book" }
];

const PossessiveNouns = () => {
  return (
      <Box bg="#F6D5B4" minH="100vh" p={{ base: 4, md: 8 }} fontFamily="'Inter', sans-serif">
        
      
        <Box maxW="1400px" mx="auto" mb={8} bg="#F0B784" p={4} borderRadius="xl" borderWidth="2px" borderColor="whiteAlpha.600" textAlign="center">
          <Heading color="#4A2C11" size="xl">
            🐸 Possessive Nouns & Apostrophes
          </Heading>
        </Box>

        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} maxW="1400px" mx="auto">
          
          
          <VStack spacing={6} align="stretch">
            
            <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
              <Heading size="lg" color="#1A0933" mb={4}>Showing Ownership</Heading>
              <Text fontSize="md" color="gray.600" mb={6}>
                A <strong>possessive noun</strong> shows that someone or something owns something else. 
                We use <strong>apostrophes</strong> to show this ownership, but the placement depends on whether the noun is singular or plural!
              </Text>
              
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                {possessiveRules.map((rule, idx) => (
                  <Flex key={idx} bg="gray.50" p={4} borderRadius="xl" borderWidth="1px" borderColor="gray.200" direction="column">
                    <Badge colorScheme="purple" w="fit-content" mb={2} px={2} py={1} borderRadius="md">{rule.rule}</Badge>
                    <Text fontSize="sm" color="gray.700" mb={3} flex="1">{rule.desc}</Text>
                    <Box bg="white" p={2} borderRadius="md" borderWidth="1px" borderColor="gray.200">
                      <Text fontSize="xs" fontWeight="bold" color="gray.500">EXAMPLES:</Text>
                      <Text fontSize="sm" fontWeight="bold" color="#4A2C11">{rule.examples}</Text>
                    </Box>
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>

    
          <VStack spacing={6} align="stretch">
            
            
            <Box bg="#f8f9fa" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)" textAlign="center">
              <Heading size="md" color="#1A0933" mb={4}>
                📹 Today's Lesson: Possessive Nouns
              </Heading>
              
              <Box position="relative" w="100%" bg="black" borderRadius="lg" overflow="hidden" borderWidth="1px" borderColor="gray.300">
                <video controls style={{ width: '100%', height: '580px', display: 'block' }}>
                  <source src="/possessives1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
              
              <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
                💡 Watch the lesson before practicing with the exercises below
              </Text>
            </Box>

            <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
              <Heading size="md" color="#00BCD4" mb={4}>Practice 1: Apostrophe Sorter</Heading>
              <PossessiveSorter />
            </Box>

            <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
              <Heading size="md" color="#FF5722" mb={4}>Practice 2: Ownership Typer</Heading>
              <PossessiveTypingGame />
            </Box>

          </VStack>
        </Grid>



      </Box>
    );
  };

  export default PossessiveNouns;
