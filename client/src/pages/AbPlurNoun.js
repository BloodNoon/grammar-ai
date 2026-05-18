import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Grid,
  Badge,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export default function AbPlurNoun() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/noun-practice");
  };

  return (
    <Box
      bg="#F6D5B4"
      minH="100vh"
      p={{ base: 4, md: 8 }}
      fontFamily="'Inter', sans-serif"
    >
      {/* Page Header */}
      <Box
        maxW="1400px"
        mx="auto"
        mb={8}
        bg="#F0B784"
        p={4}
        borderRadius="xl"
        borderWidth="2px"
        borderColor="whiteAlpha.600"
        textAlign="center"
      >
        <Heading color="#4A2C11" size="xl">
          🐸 Abstract & Plural Nouns
        </Heading>
      </Box>

      <VStack spacing={8} maxW="1000px" mx="auto">
        <Box
          bg="white"
          p={8}
          borderRadius="2xl"
          borderWidth="2px"
          borderColor="#1A1A1A"
          boxShadow="6px 6px 0px rgba(0,0,0,0.1)"
          w="100%"
        >
          <Heading size="lg" color="#1A0933" mb={4}>
            Lesson 3: Abstract and Plural Nouns
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Learn about abstract nouns and how to form plural nouns.
          </Text>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} w="100%">
          <Box
            bg="white"
            p={8}
            borderRadius="2xl"
            borderWidth="2px"
            borderColor="#1A1A1A"
            boxShadow="6px 6px 0px rgba(0,0,0,0.1)"
          >
            <Badge colorScheme="blue" mb={3} fontSize="md">
              Plural Nouns
            </Badge>
            <Text fontSize="md" color="gray.600" mb={6}>
              Nouns can change form depending on meaning.{" "}
              <strong>Plural nouns</strong> mean more than one.
            </Text>
            <Box
              bg="blue.50"
              p={4}
              borderRadius="xl"
              border="1px solid"
              borderColor="blue.200"
            >
              <Text fontWeight="bold" color="blue.700" mb={2}>
                EXAMPLES:
              </Text>
              <VStack align="start" spacing={1} fontSize="lg">
                <Text>
                  dog → <strong>dogs</strong>
                </Text>
                <Text>
                  book → <strong>books</strong>
                </Text>
                <Text>
                  child → <strong>children</strong>
                </Text>
              </VStack>
            </Box>
          </Box>

          <Box
            bg="white"
            p={8}
            borderRadius="2xl"
            borderWidth="2px"
            borderColor="#1A1A1A"
            boxShadow="6px 6px 0px rgba(0,0,0,0.1)"
          >
            <Badge colorScheme="purple" mb={3} fontSize="md">
              Abstract Nouns
            </Badge>
            <Text fontSize="md" color="gray.600" mb={6}>
              <strong>Abstract nouns</strong> name ideas, feelings, or qualities
              that you cannot touch.
            </Text>
            <Box
              bg="purple.50"
              p={4}
              borderRadius="xl"
              border="1px solid"
              borderColor="purple.200"
            >
              <Text fontWeight="bold" color="purple.700" mb={2}>
                COMPARE:
              </Text>
              <VStack align="start" spacing={3} fontSize="md">
                <Box>
                  <Text color="gray.500" fontSize="xs">
                    CONCRETE:
                  </Text>
                  <Text>
                    She held a{" "}
                    <Text as="mark" bg="blue.100">
                      book
                    </Text>
                    . (You can touch it)
                  </Text>
                </Box>
                <Box>
                  <Text color="gray.500" fontSize="xs">
                    ABSTRACT:
                  </Text>
                  <Text>
                    She felt{" "}
                    <Text as="mark" bg="purple.100">
                      happiness
                    </Text>
                    . (You cannot touch it)
                  </Text>
                </Box>
              </VStack>
            </Box>
          </Box>
        </Grid>

        <Box
          bg="#e8f5e8"
          border="2px solid"
          borderColor="#28a745"
          borderRadius="2xl"
          p={6}
          w="100%"
          textAlign="center"
        >
          <Heading size="md" color="#28a745" mb={2}>
            Key Idea
          </Heading>
          <Text fontSize="lg" color="#333">
            Plural nouns show <strong>quantity</strong>. Abstract nouns show{" "}
            <strong>ideas or feelings</strong>.
          </Text>
        </Box>

        <Button colorScheme="orange" size="lg" px={10} onClick={handleClick}>
          Go to Practice Games ➡️
        </Button>
      </VStack>
    </Box>
  );
}
  
