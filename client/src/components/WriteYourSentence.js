import React, { useState } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
  Flex,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export default function WriteYourSentence() {
  const [sentence, setSentence] = useState("");

  const handleClear = () => {
    setSentence("");
  };

  const handleSubmit = () => {
    // Like I said, the AI sentence checker will be added later on 
  };

  return (
    <MotionBox
      w="100vw"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Box bgGradient="linear(to-r, yellow.400, red.300)" w="100vw">
        <Center>
          <VStack py="4rem" spacing="2rem">
            <Flex
              w={["90vw", "75vw", "60vw"]}
              direction="column"
              justify="center"
              align="center"
              textAlign="center"
            >
              <Heading
                mb="1rem"
                bgGradient="linear(to-l, teal.400, yellow.700)"
                bgClip="text"
                fontSize={["3xl", "4xl", "5xl"]}
              >
                Write Your Own Sentence
              </Heading>
              <Text fontSize={["lg", "xl", "2xl"]} color="white" mb="2rem">
                Type a sentence below.
                Try a <strong>short</strong>, <strong>medium</strong>, or{" "}
                <strong>long</strong> sentence. Do your very best.
              </Text>

              <Box
                w="100%"
                bg="whiteAlpha.900"
                borderRadius="2xl"
                p={["1.5rem", "2rem"]}
                boxShadow="lg"
              >
                <Input
                  value={sentence}
                  onChange={(e) => setSentence(e.target.value)}
                  placeholder="Type your sentence here..."
                  size="lg"
                  fontSize={["md", "lg", "xl"]}
                  borderColor="gray.300"
                  borderRadius="xl"
                  focusBorderColor="yellow.400"
                  mb="1.5rem"
                  bg="white"
                  _placeholder={{ color: "gray.400" }}
                />
                <HStack spacing="1rem" justify="center">
                  <Button
                    onClick={handleClear}
                    size="lg"
                    fontSize={["md", "lg"]}
                    variant="outline"
                    borderColor="gray.400"
                    color="gray.600"
                    borderRadius="xl"
                    px="2rem"
                    _hover={{ bg: "gray.100" }}
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    fontSize={["md", "lg"]}
                    bgGradient="linear(to-r, red.400, yellow.400)"
                    color="white"
                    borderRadius="xl"
                    px="2rem"
                    _hover={{
                      bgGradient: "linear(to-r, red.500, yellow.500)",
                    }}
                  >
                    Submit
                  </Button>
                </HStack>
              </Box>
            </Flex>
          </VStack>
        </Center>
      </Box>
    </MotionBox>
  );
}
