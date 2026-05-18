import React from 'react';
import { Box, Heading, Text, Grid, Flex, VStack, SimpleGrid, Badge } from '@chakra-ui/react';


import PluralRuleSorter from '../utils/SentenceChecker/PluralRuleSorter';
import PluralTypingGame from '../utils/SentenceChecker/PluralTypingGame';


const pluralRules = [
  { rule: "Add -s", desc: "Most regular nouns just need an 's' at the end.", examples: "cat → cats, tree → trees" },
  { rule: "Add -es", desc: "Nouns ending in s, x, z, ch, or sh.", examples: "bus → buses, box → boxes" },
  { rule: "Change 'y' to 'ies'", desc: "Ends in a consonant + y. Drop the y!", examples: "city → cities, baby → babies" },
  { rule: "Vowel + 'y'", desc: "Ends in a vowel (a,e,i,o,u) + y. Just add 's'.", examples: "boy → boys, toy → toys" },
  { rule: "Change 'f' to 'ves'", desc: "Ends in f or fe. Drop it and add 'ves'.", examples: "wolf → wolves, knife → knives" },
  { rule: "Irregular", desc: "These completely change their spelling!", examples: "child → children, mouse → mice" },
  { rule: "No Change", desc: "Some words are the same singular and plural.", examples: "deer → deer, sheep → sheep" }
];

const pluralNoun = () => {
  return (
    <Box bg="#F6D5B4" minH="100vh" p={{ base: 4, md: 8 }} fontFamily="'Inter', sans-serif">
      
  
      <Box maxW="1400px" mx="auto" mb={8} bg="#F0B784" p={4} borderRadius="xl" borderWidth="2px" borderColor="whiteAlpha.600" textAlign="center">
        <Heading color="#4A2C11" size="xl">
          🐸 Plural Nouns & Spelling Rules
        </Heading>
      </Box>

 
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8} maxW="1400px" mx="auto">
        
   
        <VStack spacing={6} align="stretch">
          
          <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
            <Heading size="lg" color="#1A0933" mb={4}>How to Make Nouns Plural</Heading>
            <Text fontSize="md" color="gray.600" mb={6}>
              A singular noun means there is only <strong>one</strong>. A plural noun means there is <strong>more than one</strong>. 
              While most nouns just need an "s", there are a few important spelling rules you must memorize!
            </Text>
            
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              {pluralRules.map((rule, idx) => (
                <Flex key={idx} bg="gray.50" p={4} borderRadius="xl" borderWidth="1px" borderColor="gray.200" direction="column">
                  <Badge colorScheme="blue" w="fit-content" mb={2} px={2} py={1} borderRadius="md">{rule.rule}</Badge>
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
              📹 Today's Lesson: Plural Rules
            </Heading>
            
            <Box position="relative" w="100%" bg="black" borderRadius="lg" overflow="hidden" borderWidth="1px" borderColor="gray.300">
              <video controls style={{ width: '100%', height: '580px', display: 'block' }}>
                <source src="/plurals1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
            
            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
             <Heading size="md" color="#00BCD4" mb={4}>Practice 1: Plural Rule Sorter</Heading>
             <PluralRuleSorter />
          </Box>

          <Box bg="white" p={6} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)">
             <Heading size="md" color="#9C27B0" mb={4}>Practice 2: Spelling Typer</Heading>
             <PluralTypingGame />
          </Box>

        </VStack>
      </Grid>

  

    </Box>
  );
};

export default pluralNoun;
