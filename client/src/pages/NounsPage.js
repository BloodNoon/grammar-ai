import React from 'react';
import { Box, Heading, Text, Grid, GridItem, Flex, VStack, SimpleGrid, Badge, Divider } from '@chakra-ui/react';

const nounTypes = [
  { name: "Common", desc: "Everyday, generic names. No capital letters.", examples: "city, dog, car" },
  { name: "Proper", desc: "Specific, special names. Always capitalized.", examples: "Paris, Rover, Tuesday" },
  { name: "Concrete", desc: "Things you can physically touch or see.", examples: "apple, water, jacket" },
  { name: "Abstract", desc: "Ideas or feelings. You cannot touch them.", examples: "love, bravery, time" },
  { name: "Collective", desc: "A single word for a group of things.", examples: "flock, team, family" },
  { name: "Countable", desc: "Things you can count with numbers.", examples: "one cat, two cats" },
  { name: "Uncountable", desc: "Things you cannot easily count.", examples: "sand, knowledge, water" }
];

const NounLessonDashboard = () => {
  return (
    <Box bg="#F6D5B4" minH="100vh" p={6} fontFamily="'Inter', sans-serif">
      
  

      <Heading textAlign="center" color="#4A2C11" size="xl" mb={8}>
        Noun Types & Categorization Builder
      </Heading>

      {/* The Master 2-Column Dashboard Layout */}
      <Grid templateColumns={{ base: "1fr", xl: "400px 1fr" }} gap={6} maxW="1400px" mx="auto">
        
        {/* ========================================== */}
        {/* LEFT COLUMN: The "Cheat Sheet" Sidebar */}
        {/* ========================================== */}
        <GridItem>
          <Box bg="#FFF4CC" p={6} borderRadius="lg" borderWidth="2px" borderColor="#1A1A1A" boxShadow="4px 4px 0px rgba(0,0,0,0.1)">
            <Heading size="md" color="#1A1A1A" mb={4}>Understanding Nouns</Heading>
            <Text fontSize="sm" color="gray.800" mb={6}>
              Nouns are the building blocks of sentences. They name people, places, things, or ideas. 
              Use this quick-reference table to understand how they are categorized.
            </Text>

            {/* Compact Reference Table */}
            <Box borderWidth="2px" borderColor="#1A1A1A" borderRadius="md" bg="white" overflow="hidden" mb={8}>
              <Flex bg="#F0E6B4" borderBottomWidth="2px" borderColor="#1A1A1A" p={2}>
                <Text fontWeight="bold" flex="1" fontSize="sm">Noun Type</Text>
                <Text fontWeight="bold" flex="2" fontSize="sm">Quick Definition</Text>
              </Flex>
              {nounTypes.map((noun, idx) => (
                <Flex key={idx} borderBottomWidth={idx === nounTypes.length - 1 ? "0px" : "1px"} borderColor="gray.300" p={2} bg={idx % 2 === 0 ? "white" : "gray.50"}>
                  <Text fontWeight="bold" flex="1" fontSize="xs">{noun.name}</Text>
                  <Text flex="2" fontSize="xs">{noun.desc}</Text>
                </Flex>
              ))}
            </Box>

            {/* Mini Practice Mockup (Matches the bottom of the yellow box in screenshot) */}
            <Box>
              <Text fontWeight="bold" fontSize="sm" mb={2}>Learn your new sentence structures:</Text>
              <Text fontSize="xs" mb={4}><b>Subject Noun + Verb + Object Noun</b><br/>Try to include adjectives if the sentence requires one.</Text>
              
              <Box bg="white" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.300" mb={4}>
                <Text fontSize="sm" fontWeight="bold" mb={2}>Question 1: Choose the correct proper noun</Text>
                <VStack align="stretch" spacing={2}>
                  {['A. The big city', 'B. New York City', 'C. that tall building', 'D. a crowded street'].map((opt, i) => (
                    <Box key={i} p={2} borderWidth="1px" borderRadius="md" fontSize="xs" _hover={{ bg: "gray.100", cursor: "pointer" }}>{opt}</Box>
                  ))}
                </VStack>
              </Box>
            </Box>
          </Box>
        </GridItem>


        {/* ========================================== */}
        {/* RIGHT COLUMN: Interactive & Detailed Modules */}
        {/* ========================================== */}
        <GridItem>
          <VStack align="stretch" spacing={6}>
            
            {/* 1. Video Lesson Module */}
            <Box bg="white" p={6} borderRadius="lg" borderWidth="2px" borderColor="#1A1A1A" boxShadow="4px 4px 0px rgba(0,0,0,0.1)">
              <Heading size="sm" textAlign="center" mb={2}>📺 Today's Lesson: Nouns</Heading>
              <Text fontSize="xs" textAlign="center" mb={4} color="gray.600">Watch this lesson to understand noun types and sentence building.</Text>
              <Box bg="#1A1A1A" w="70%" borderRadius="md" display="flex" alignItems="center" justifyContent="center" p={4} ml={'15%'}>
                <video controls style={{ width: '100%', maxHeight: '480px', borderRadius: '8px' }}>
                  <source src="/lesson1.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            </Box>

            {/* 2. Compact 7-Types Detailed Grid */}
            <Box bg="white" p={6} borderRadius="lg" borderWidth="2px" borderColor="#1A1A1A" boxShadow="4px 4px 0px rgba(0,0,0,0.1)">
              <Heading size="md" mb={4} textAlign="center" color="#1A1A1A">Detailed Noun Bank</Heading>
              <Divider mb={6} />
              
              {/* This fits all 7 types compactly into a 2-column grid */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {nounTypes.map((noun, index) => (
                  <Flex key={index} bg="gray.50" p={4} borderRadius="md" borderWidth="1px" borderColor="gray.200" direction="column">
                    <Flex justify="space-between" align="center" mb={2}>
                      <Badge colorScheme="purple" fontSize="sm" px={2}>{noun.name} Nouns</Badge>
                    </Flex>
                    <Text fontSize="sm" color="gray.700" mb={3} flex="1">
                      {noun.desc}
                    </Text>
                    <Box bg="white" p={2} borderRadius="sm" borderWidth="1px" borderColor="gray.100">
                      <Text fontSize="xs" fontWeight="bold" color="gray.500">EXAMPLES:</Text>
                      <Text fontSize="sm" fontWeight="bold">{noun.examples}</Text>
                    </Box>
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>

            {/* Placeholder for the Noun Sentence Builder Game */}
            <Box bg="white" p={6} borderRadius="lg" borderWidth="2px" borderColor="#1A1A1A" boxShadow="4px 4px 0px rgba(0,0,0,0.1)" textAlign="center">
              <Heading size="sm" mb={4}>🏗️ Noun Sentence Builder</Heading>
              <Box borderStyle="dashed" borderWidth="2px" borderColor="gray.300" p={10} borderRadius="md" bg="gray.50">
                <Text color="gray.400" fontWeight="bold">Drag words here to build your sentence...</Text>
              </Box>
            </Box>

          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default NounLessonDashboard;