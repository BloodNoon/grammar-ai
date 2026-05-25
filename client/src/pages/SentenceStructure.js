import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  VStack,
  SimpleGrid,
  Button,
  Input,
  Badge,
} from "@chakra-ui/react";
import { PageContainer, GameCard } from "../components/ui";
import nlp from "compromise";
import { testCases } from "../utils/SentenceChecker/TestCases";
import SubjectNounGame from "../utils/SentenceChecker/SubjectNounGame";
import SubjectQuiz from "../utils/SentenceChecker/SubjectQuiz";

function tagWordsWithCompromise(sentence) {
  const doc = nlp(sentence);
  const allSentences = doc.sentences().json();
  const taggedWords = [];

  const tagMap = {
    Determiner: "determiner",
    Adjective: "adjective",
    Noun: "noun",
    Pronoun: "pronoun",
    Verb: "verb",
    Preposition: "preposition",
    Conjunction: "conjunction",
  };

  for (const sentenceObj of allSentences) {
    for (const term of sentenceObj.terms) {
      const word = term.text;
      const tags = term.tags || [];

      let label = "";
      for (const [compTag, customLabel] of Object.entries(tagMap)) {
        if (tags.includes(compTag)) {
          label = customLabel;
          break;
        }
      }

      taggedWords.push(label ? `${word}[${label}]` : word);
    }
  }

  return taggedWords.join(" ");
}

const SentenceStructures = () => {
  const [example, setExample] = useState({ sentence: "", readable: "" });

  // New states for the lesson1-style quiz
  const [practiceAnswered, setPracticeAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [knowledgeSelected, setKnowledgeSelected] = useState(null);

  const generateRandomExample = () => {
    if (testCases.length === 0) return;
    const randomIndex = Math.floor(Math.random() * testCases.length);
    const selected = testCases[randomIndex];
    const readableStructure = tagWordsWithCompromise(selected.sentence);
    setExample({ sentence: selected.sentence, readable: readableStructure });
  };

  const [quizSentence, setQuizSentence] = useState("");
  const [userInputs, setUserInputs] = useState([]);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [progress, setProgress] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);

  const startQuiz = () => {
    if (progress >= 10) return;
    const randomIndex = Math.floor(Math.random() * testCases.length);
    const selected = testCases[randomIndex];
    const words = selected.sentence.split(" ");
    setQuizSentence(selected.sentence);
    setUserInputs(Array(words.length).fill(""));
    setQuizFeedback(null);
    setQuizStarted(true);
  };

  const resetQuiz = () => {
    setQuizSentence("");
    setUserInputs([]);
    setQuizFeedback(null);
    setProgress(0);
    setQuizStarted(false);
    setQuizEnded(false);
  };

  const handleInputChange = (index, value) => {
    const updatedInputs = [...userInputs];
    updatedInputs[index] = value;
    setUserInputs(updatedInputs);
  };

  const checkAnswers = () => {
    const tagged = tagWordsWithCompromise(quizSentence);
    const expectedTags = tagged.split(" ").map((taggedWord) => {
      const match = taggedWord.match(/\[(.*?)\]$/);
      return match ? match[1].toLowerCase() : "";
    });
    const correctness = expectedTags.map((expected, i) =>
      userInputs[i]?.toLowerCase() === expected ? "correct" : "incorrect",
    );
    setQuizFeedback(correctness);
    if (correctness.every((val) => val === "correct")) {
      if (progress < 9) setProgress((prev) => prev + 1);
      else {
        setProgress(10);
        setQuizEnded(true);
      }
    }
  };

  const selectAnswer = (answer, isCorrect) => {
    if (practiceAnswered) return;
    setPracticeAnswered(true);
    setSelectedAnswer(answer);
    if (isCorrect)
      setFeedback(
        '🎉 Correct! "The Cat" is the subject because it performs the action of running.',
      );
    else
      setFeedback(
        "❌ Incorrect. Try to identify who or what is performing the action in the sentence.",
      );
  };

  const selectKnowledgeAnswer = (option) => setKnowledgeSelected(option);
  const resetPractice = () => {
    setPracticeAnswered(false);
    setSelectedAnswer(null);
    setFeedback("");
    setKnowledgeSelected(null);
  };

  return (
    <PageContainer>
      <GameCard mb={8} textAlign="center" bg="brand.500">
        <Heading size="xl">🐸 Sentence Structure Practice</Heading>
      </GameCard>

      <Grid templateColumns={{ base: "1fr", lg: "1.5fr 1fr" }} gap={8}>
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          {/* Lesson Card */}
          <GameCard variant="game">
            <Flex align="center" gap={4} mb={6}>
              <Box
                bg="green.400"
                w="50px"
                h="50px"
                borderRadius="full"
                display="flex"
                align="center"
                justify="center"
                fontSize="2xl"
              >
                🐸
              </Box>
              <Box
                bg="yellow.400"
                px={6}
                py={2}
                borderRadius="full"
                fontWeight="bold"
              >
                Lesson 1: Subject and Objects
              </Box>
            </Flex>
            <Text fontSize="md" color="gray.600" mb={4}>
              The <Badge colorScheme="yellow">subject</Badge> of a sentence is
              the noun that performs the action, while the{" "}
              <Badge colorScheme="orange">object</Badge> is the noun that
              receives the action.
            </Text>
            <Box
              bg="gray.50"
              p={4}
              borderRadius="xl"
              border="1px dashed"
              borderColor="gray.300"
            >
              <Text fontSize="sm" color="gray.500">
                For example:
              </Text>
              <Text fontSize="lg" fontStyle="italic" my={2}>
                The chef prepared dinner.
              </Text>
              <Text fontSize="sm">
                In this sentence, <strong>"chef"</strong> is the subject and{" "}
                <strong>"dinner"</strong> is the object.
              </Text>
            </Box>
          </GameCard>

          {/* Practice Card */}
          <GameCard variant="game">
            <Heading size="md" color="orange.500" mb={6}>
              Which one is the subject?
            </Heading>
            <Box
              bg="orange.400"
              p={6}
              borderRadius="xl"
              textAlign="center"
              mb={6}
            >
              <Text
                fontSize="xl"
                fontWeight="bold"
                bg="whiteAlpha.800"
                py={4}
                borderRadius="lg"
              >
                The cat is running on the table
              </Text>
            </Box>
            <Flex wrap="wrap" gap={3} justify="center" mb={8}>
              {[
                { text: "The Cat", color: "green", correct: true },
                { text: "Running", color: "blue", correct: false },
                { text: "On", color: "purple", correct: false },
                { text: "Is", color: "pink", correct: false },
                { text: "Table", color: "yellow", correct: false },
              ].map((option, index) => (
                <Button
                  key={index}
                  onClick={() => selectAnswer(option.text, option.correct)}
                  colorScheme={
                    practiceAnswered
                      ? selectedAnswer === option.text
                        ? option.correct
                          ? "green"
                          : "red"
                        : "gray"
                      : option.color
                  }
                  variant="solid"
                  borderRadius="full"
                  size="lg"
                  isDisabled={practiceAnswered}
                >
                  {option.text}
                </Button>
              ))}
            </Flex>
            {feedback && (
              <Box
                p={4}
                borderRadius="xl"
                bg={feedback.includes("Correct") ? "green.50" : "red.50"}
                color={feedback.includes("Correct") ? "green.800" : "red.800"}
                border="1px solid"
                borderColor={
                  feedback.includes("Correct") ? "green.200" : "red.200"
                }
                textAlign="center"
                fontWeight="bold"
                mb={6}
              >
                {feedback}
              </Box>
            )}
            <Button
              w="100%"
              colorScheme="orange"
              variant="outline"
              size="lg"
              onClick={resetPractice}
            >
              🔄 Reset Practice
            </Button>
          </GameCard>

          {/* Games & Quizzes */}
          <GameCard variant="game">
            <Heading size="md" color="green.500" mb={4}>
              🎮 Subject & Noun Game
            </Heading>
            <SubjectNounGame />
          </GameCard>

          <GameCard variant="game">
            <Heading size="md" color="orange.500" mb={4}>
              📝 Subject Quiz
            </Heading>
            <SubjectQuiz />
          </GameCard>

          {/* Advanced Challenge */}
          <GameCard variant="game">
            <Heading size="md" color="blue.500" mb={4}>
              🚀 Advanced Structure Quiz
            </Heading>
            <Text mb={4}>
              <b>Progress:</b> {progress}/10
            </Text>
            <Flex gap={3} mb={6}>
              <Button
                colorScheme="green"
                onClick={startQuiz}
                isDisabled={quizStarted || quizEnded}
              >
                Start Advanced Quiz
              </Button>
              <Button colorScheme="red" variant="ghost" onClick={resetQuiz}>
                Reset Quiz
              </Button>
            </Flex>
            {quizSentence && !quizEnded && (
              <VStack spacing={6}>
                <Text fontSize="lg">
                  <b>Sentence:</b> {quizSentence}
                </Text>
                <Flex wrap="wrap" gap={4} justify="center">
                  {quizSentence.split(" ").map((word, index) => (
                    <VStack key={index} spacing={1}>
                      <Text fontWeight="bold" fontSize="xs">
                        {word}
                      </Text>
                      <Input
                        w="90px"
                        textAlign="center"
                        size="sm"
                        value={userInputs[index]}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        borderColor={
                          quizFeedback
                            ? quizFeedback[index] === "correct"
                              ? "green.400"
                              : "red.400"
                            : "gray.200"
                        }
                      />
                    </VStack>
                  ))}
                </Flex>
                <Button colorScheme="blue" onClick={checkAnswers}>
                  Check Answers
                </Button>
              </VStack>
            )}
            {quizEnded && (
              <Box
                bg="green.50"
                p={6}
                borderRadius="xl"
                color="green.800"
                fontWeight="bold"
                textAlign="center"
              >
                🎉 Congratulations! You completed the advanced quiz.
              </Box>
            )}
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">
          {/* THE VIDEO PANEL */}
          <GameCard variant="game" bg="gray.50">
            <Heading size="md" color="ink.700" mb={4}>
              📹 Video Lesson
            </Heading>
            <Box
              position="relative"
              w="100%"
              bg="black"
              borderRadius="lg"
              overflow="hidden"
              borderWidth="1px"
              borderColor="gray.300"
            >
              <video
                controls
                style={{ width: "100%", height: "580px", display: "block" }}
              >
                <source src="/lesson1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing
            </Text>
          </GameCard>

          {/* Example Explorer */}
          <GameCard variant="game" textAlign="center">
            <Text fontWeight="bold" mb={4}>
              Click to see more examples:
            </Text>
            <Box
              bg="gray.50"
              p={6}
              borderRadius="xl"
              border="2px dashed"
              borderColor="gray.300"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
              onClick={generateRandomExample}
            >
              {example.sentence ? (
                <>
                  <Text fontWeight="bold">Sentence:</Text>{" "}
                  <Text mb={2}>{example.sentence}</Text>
                  <Text fontWeight="bold">Readable:</Text>{" "}
                  <Text color="blue.600" fontFamily="monospace">
                    {example.readable}
                  </Text>
                </>
              ) : (
                <Text color="gray.400">Click to load an example...</Text>
              )}
            </Box>
          </GameCard>

          {/* Knowledge Check */}
          <GameCard variant="game">
            <Heading
              size="sm"
              bg="yellow.400"
              p={3}
              borderRadius="lg"
              mb={4}
              textAlign="center"
            >
              ⭐ Knowledge Check ⭐
            </Heading>
            <Text
              fontSize="lg"
              fontWeight="500"
              textAlign="center"
              mb={6}
              p={4}
              bg="gray.50"
              borderRadius="lg"
              border="1px dashed"
              borderColor="gray.300"
            >
              She and I flew with the sky and the cloud
            </Text>
            <SimpleGrid columns={2} spacing={3}>
              {["She", "I", "flew", "cloud"].map((option, index) => (
                <Button
                  key={index}
                  onClick={() => selectKnowledgeAnswer(option)}
                  colorScheme={knowledgeSelected === option ? "green" : "gray"}
                  variant={knowledgeSelected === option ? "solid" : "outline"}
                >
                  {option}
                </Button>
              ))}
            </SimpleGrid>
          </GameCard>
        </VStack>
      </Grid>
    </PageContainer>
  );
};

export default SentenceStructures;
