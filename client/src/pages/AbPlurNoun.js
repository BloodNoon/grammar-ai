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
import { PageContainer, GameCard } from "../components/ui";

export default function AbPlurNoun() {
  const history = useHistory();

  const handleClick = () => {
    history.push("/noun-practice");
  };

  return (
    <PageContainer>
      <GameCard mb={8} textAlign="center" bg="brand.500">
        <Heading size="xl">🐸 Abstract & Plural Nouns</Heading>
      </GameCard>

      <VStack spacing={8} maxW="1000px" mx="auto">
        <GameCard variant="game">
          <Heading size="lg" color="ink.700" mb={4}>
            Lesson 3: Abstract and Plural Nouns
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Learn about abstract nouns and how to form plural nouns.
          </Text>
        </GameCard>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} w="100%">
          <GameCard variant="game">
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
          </GameCard>

          <GameCard variant="game">
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
          </GameCard>
        </Grid>

        <GameCard variant="game" bg="green.50" borderColor="green.500">
          <Heading size="md" color="green.500" mb={2}>
            Key Idea
          </Heading>
          <Text fontSize="lg" color="gray.700">
            Plural nouns show <strong>quantity</strong>. Abstract nouns show{" "}
            <strong>ideas or feelings</strong>.
          </Text>
        </GameCard>

        <Button colorScheme="orange" size="lg" px={10} onClick={handleClick}>
          Go to Practice Games ➡️
        </Button>
      </VStack>
    </PageContainer>
  );
}
