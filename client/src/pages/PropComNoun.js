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
  Grid,
  Flex
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

export default function PropComNoun() {
  const history = useHistory();

  const handleNextLesson = () => {
    history.push('/abplur-nouns');
  };

  return (
    <Box bg="#F6D5B4" minH="100vh" p={{ base: 4, md: 8 }} fontFamily="'Inter', sans-serif">
      
      {/* Page Header */}
      <Box maxW="1400px" mx="auto" mb={8} bg="#F0B784" p={4} borderRadius="xl" borderWidth="2px" borderColor="whiteAlpha.600" textAlign="center">
        <Heading color="#4A2C11" size="xl">
          🐸 Common & Proper Nouns
        </Heading>
      </Box>

      <VStack spacing={8} maxW="1000px" mx="auto">
        
        <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)" w="100%">
          <Heading size="lg" color="#1A0933" mb={4}>Lesson 2: Common and Proper Nouns</Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            There are two main types of nouns: <strong>common nouns</strong> and <strong>proper nouns</strong>.
          </Text>
          
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            <Box p={5} bg="blue.50" borderRadius="xl" border="1px solid" borderColor="blue.200">
              <Heading size="md" color="blue.700" mb={3}>Common Nouns</Heading>
              <Text fontSize="sm" color="gray.700" mb={3}>Common nouns name general people, places, or things. They do not start with a capital letter.</Text>
              <Box bg="white" p={2} borderRadius="md">
                <Text fontSize="xs" fontWeight="bold" color="blue.500">EXAMPLES:</Text>
                <Text fontSize="sm">teacher, school, park, city, dog, cat, horse, book, chair, apple.</Text>
              </Box>
            </Box>

            <Box p={5} bg="purple.50" borderRadius="xl" border="1px solid" borderColor="purple.200">
              <Heading size="md" color="purple.700" mb={3}>Proper Nouns</Heading>
              <Text fontSize="sm" color="gray.700" mb={3}>Proper nouns are specific names of people, places, or things. They always start with a capital letter.</Text>
              <Box bg="white" p={2} borderRadius="md">
                <Text fontSize="xs" fontWeight="bold" color="purple.500">EXAMPLES:</Text>
                <Text fontSize="sm">John, Paris, New York, Bill Gates, Apple, Microsoft.</Text>
              </Box>
            </Box>
          </Grid>
        </Box>

        <Box bg="white" p={8} borderRadius="2xl" borderWidth="2px" borderColor="#1A1A1A" boxShadow="6px 6px 0px rgba(0,0,0,0.1)" w="100%">
          <Heading size="lg" color="#1A0933" mb={6}>Comparison & Structure</Heading>
          
          <VStack spacing={6} align="stretch">
            <Box p={4} bg="gray.50" borderRadius="xl">
              <Text fontSize="md" fontWeight="bold" color="gray.500" mb={2}>COMMON NOUN SENTENCE:</Text>
              <Text fontSize="xl">I visited <Text as="mark" bg="blue.100">the city.</Text></Text>
            </Box>

            <Box p={4} bg="gray.50" borderRadius="xl">
              <Text fontSize="md" fontWeight="bold" color="gray.500" mb={2}>PROPER NOUN SENTENCE:</Text>
              <Text fontSize="xl">I visited <Text as="mark" bg="purple.100">London.</Text></Text>
            </Box>

            <Box bg="orange.50" p={4} borderRadius="xl" border="1px dashed" borderColor="orange.300">
              <Text as="em" color="orange.800">Key Idea: If the noun is a specific name and capitalized, it is a proper noun.</Text>
            </Box>

            <Divider />

            <Box>
              <Text fontWeight="bold" mb={4}>Interactive Examples (Click words for tips):</Text>
              <Flex justify="center" gap={4} wrap="wrap">
                <Popover>
                  <PopoverTrigger>
                    <Button colorScheme="teal" size="lg">James</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontWeight="bold">Proper Noun</PopoverHeader>
                    <PopoverBody>
                      <Text color="#1A0933" fontWeight="bold">James is a name, which makes it a proper noun.</Text>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
                
                <Text fontSize="2xl" py={2}>visited</Text>
                
                <Popover>
                  <PopoverTrigger>
                    <Button colorScheme="teal" size="lg">New York</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontWeight="bold">Proper Noun</PopoverHeader>
                    <PopoverBody>
                      <Text color="#1A0933" fontWeight="bold">New York is a named place, which makes it a proper noun.</Text>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
            </Box>
          </VStack>
        </Box>

        <Button colorScheme="orange" size="lg" px={10} onClick={handleNextLesson}>Next Lesson: Abstract & Plural Nouns ➡️</Button>
      </VStack>
    </Box>
  );
}
