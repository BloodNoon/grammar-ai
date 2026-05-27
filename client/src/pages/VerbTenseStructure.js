import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Flex, VStack, Grid } from "@chakra-ui/react";
import { PageContainer, GameCard, LessonIntroCard, LessonPageHeader } from "../components/ui";
import { hasFullStructCheck } from "../utils/SentenceChecker/StructureChecker";

// Import essential verb components
import VerbTenseLesson from "./VerbTenseComponents/VerbTenseLesson";
import VerbProgressTracker from "./VerbTenseComponents/VerbProgressTracker";
import VerbCompletionCelebration from "./VerbTenseComponents/VerbCompletionCelebration";
import VerbLevelSelection from "./VerbTenseComponents/VerbLevelSelection";
import VerbWordBank from "./VerbTenseComponents/VerbWordBank";
import VerbSentenceBuilder from "./VerbTenseComponents/VerbSentenceBuilder";
import VerbActionButtons from "./VerbTenseComponents/VerbActionButton";
import VerbFeedbackDisplay from "./VerbTenseComponents/VerbFeedbackDisplay";
import VerbTypingQuiz from "./VerbTenseComponents/VerbTypingQuiz";

const VerbTenseStructure = () => {
  // ===== STATE MANAGEMENT =====
  const [availableWords, setAvailableWords] = useState([]);
  const [sentenceArea, setSentenceArea] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [draggedWord, setDraggedWord] = useState(null);
  const [currentLevel, setCurrentLevel] = useState("beginner");
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sentenceFeedback, setSentenceFeedback] = useState({});
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizTotalAttempts, setQuizTotalAttempts] = useState(0);
  const [quizSessionHistory, setQuizSessionHistory] = useState([]);
  const [currentQuizFeedback, setCurrentQuizFeedback] = useState("");

  const TARGET_CORRECT = 10;
  const QUIZ_TARGET_CORRECT = 10;

  // Word Bank Data
  const verbWordBank = {
    Pronoun: ["I", "He", "She", "It", "You", "We", "They"],
    Object: ["me", "him", "her", "it", "you", "us", "them"],
    Determiner: ["The", "A", "An", "This", "That", "My", "Your"],
    Adjective: ["big", "small", "happy", "fast", "slow", "new", "old"],
    Noun: ["dog", "cat", "house", "car", "book", "tree", "pizza", "computer"],
    Auxiliary: ["is", "are", "was", "were", "will", "have", "has", "am"],
    Present: ["run", "runs", "eat", "eats", "walk", "walks", "play", "plays"],
    Past: ["ran", "ate", "walked", "played", "went", "saw", "made"],
    Continuous: ["running", "eating", "walking", "playing", "making"],
    Perfect: ["eaten", "walked", "played", "gone", "seen", "made"],
  };

  // ===== HELPERS & LOGIC =====
  const getWordType = (word) => {
    const lowerWord = word.toLowerCase();
    if (verbWordBank.Pronoun.includes(word)) return "Pronoun";
    if (verbWordBank.Object.includes(lowerWord)) return "Object";
    if (verbWordBank.Determiner.includes(word)) return "Determiner";
    if (verbWordBank.Adjective.includes(lowerWord)) return "Adjective";
    if (verbWordBank.Noun.includes(lowerWord)) return "Noun";
    if (verbWordBank.Auxiliary.includes(lowerWord)) return "Auxiliary";
    if (verbWordBank.Present.includes(lowerWord)) return "Verb";
    if (verbWordBank.Past.includes(lowerWord)) return "Verb";
    if (verbWordBank.Continuous.includes(lowerWord)) return "Verb";
    if (verbWordBank.Perfect.includes(lowerWord)) return "Verb";
    return "Unknown";
  };

  const getVerbSubtype = (word) => {
    const lowerWord = word.toLowerCase();
    if (verbWordBank.Present.includes(lowerWord)) return "Present";
    if (verbWordBank.Past.includes(lowerWord)) return "Past";
    if (verbWordBank.Continuous.includes(lowerWord)) return "Continuous";
    if (verbWordBank.Perfect.includes(lowerWord)) return "Perfect";
    if (verbWordBank.Auxiliary.includes(lowerWord)) return "Auxiliary";
    return null;
  };

  const analyzeVerbTenses = (words) => {
    const auxiliaries = words.filter((w) => w.subtype === "Auxiliary");
    const mainVerbs = words.filter(
      (w) => w.type === "Verb" && w.subtype !== "Auxiliary",
    );

    if (mainVerbs.length === 0) {
      return {
        isValidCombination: false,
        feedback: "No main verb found. Add an action word!",
      };
    }

    if (auxiliaries.length > 0 && mainVerbs.length > 0) {
      const aux = auxiliaries[0].text.toLowerCase();
      const mainVerb = mainVerbs[0];

      if (
        (aux === "is" || aux === "are" || aux === "was" || aux === "were") &&
        mainVerb.subtype === "Continuous"
      ) {
        return {
          isValidCombination: true,
          feedback: "Perfect! This is a continuous tense.",
        };
      }
      if ((aux === "have" || aux === "has") && mainVerb.subtype === "Perfect") {
        return {
          isValidCombination: true,
          feedback: "Excellent! This is a perfect tense.",
        };
      }
      if (aux === "will") {
        return {
          isValidCombination: true,
          feedback: "Great! This is a future tense.",
        };
      }
    }

    if (mainVerbs.length > 0 && auxiliaries.length === 0) {
      return {
        isValidCombination: true,
        feedback: "Good! Simple present or past tense.",
      };
    }

    return {
      isValidCombination: false,
      feedback: "The verb combination doesn't match a standard tense pattern.",
    };
  };

  const generateVerbWordSet = () => {
    let words = [];
    const levelCounts = { beginner: 5, intermediate: 8, advanced: 12 };
    const count = levelCounts[currentLevel];

    Object.keys(verbWordBank).forEach((type) => {
      words.push(...verbWordBank[type].slice(0, count));
    });

    setAvailableWords(
      [...new Set(words)]
        .sort(() => Math.random() - 0.5)
        .map((word, i) => ({
          id: `v-word-${i}`,
          text: word,
          type: getWordType(word),
          subtype: getVerbSubtype(word),
        })),
    );
  };

  useEffect(() => {
    generateVerbWordSet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel]);

  // Drag and Drop Logic
  const handleDragStart = (e, word) => {
    setDraggedWord(word);
  };
  const handleDrop = (e) => {
    if (!draggedWord) return;
    setSentenceArea([...sentenceArea, draggedWord]);
    setAvailableWords((prev) => prev.filter((w) => w.id !== draggedWord.id));
    setDraggedWord(null);
  };

  const checkSentence = () => {
    const sentence = sentenceArea.map((w) => w.text).join(" ");
    const verbAnalysis = analyzeVerbTenses(sentenceArea);
    const isStructureValid = hasFullStructCheck(sentence); // General check without specific pattern

    const overallValid = isStructureValid && verbAnalysis.isValidCombination;
    setTotalAttempts((prev) => prev + 1);

    if (overallValid) {
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setFeedback(`✅ ${verbAnalysis.feedback}`);
      if (correctCount + 1 >= TARGET_CORRECT) setIsCompleted(true);
    } else {
      setStreak(0);
      setFeedback(`❌ ${verbAnalysis.feedback}`);
    }
  };

  const resetSentenceOnly = () => {
    setAvailableWords([...availableWords, ...sentenceArea]);
    setSentenceArea([]);
    setFeedback("");
  };

  const removeFromSentence = (index) => {
    const wordToRemove = sentenceArea[index];
    setAvailableWords([...availableWords, wordToRemove]);
    setSentenceArea(sentenceArea.filter((_, i) => i !== index));
  };

  const generateNewQuizQuestion = () => {
    const newQuestionIndex = Math.floor(Math.random() * 15);
    setCurrentQuizQuestion(newQuestionIndex);
    setCurrentQuizFeedback("");
  };

  const resetQuiz = () => {
    setQuizCorrectCount(0);
    setQuizTotalAttempts(0);
    setQuizCompleted(false);
    setQuizAnswers({});
    setQuizSessionHistory([]);
    setCurrentQuizFeedback("");
    generateNewQuizQuestion();
  };

  return (
    <PageContainer>
      <LessonPageHeader icon="🎬" title="Verb Forms and Usage" />
      <LessonIntroCard />

      {/* Main 2-Column Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* LEFT COLUMN: Lesson & Quiz */}
        <VStack align="stretch" spacing={6}>
          {/* Verb Education Section */}
          <GameCard variant="game">
            <Heading size="lg" color="ink.700" mb={4}>
              🎬 What is a Verb?
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              Verbs are <strong>action</strong> words or{" "}
              <strong>states of being</strong>. Every sentence needs a verb!
            </Text>
            <Flex gap={4} wrap="wrap">
              <Box
                p={3}
                bg="blue.50"
                borderRadius="md"
                border="1px solid"
                borderColor="blue.300"
              >
                <Text fontWeight="bold" color="blue.700">
                  Action
                </Text>
                <Text fontSize="sm">run, eat</Text>
              </Box>
              <Box
                p={3}
                bg="green.50"
                borderRadius="md"
                border="1px solid"
                borderColor="green.300"
              >
                <Text fontWeight="bold" color="green.700">
                  Linking
                </Text>
                <Text fontSize="sm">is, am</Text>
              </Box>
              <Box
                p={3}
                bg="purple.50"
                borderRadius="md"
                border="1px solid"
                borderColor="purple.300"
              >
                <Text fontWeight="bold" color="purple.700">
                  Helping
                </Text>
                <Text fontSize="sm">will, have</Text>
              </Box>
            </Flex>
          </GameCard>

          {/* Verb Tense Lesson */}
          <GameCard variant="game">
            <Heading size="md" color="orange.500" mb={4}>
              📚 Verb Lesson
            </Heading>
            <VerbTenseLesson
              sentenceFeedback={sentenceFeedback}
              handleVerbSentenceChoice={(n, s, c) =>
                setSentenceFeedback({
                  ...sentenceFeedback,
                  [n]: {
                    text: c ? "Correct!" : "Try again",
                    color: c ? "green" : "red",
                  },
                })
              }
            />
          </GameCard>

          {/* Typing Quiz */}
          <GameCard variant="game">
            <VerbTypingQuiz
              currentQuizQuestion={currentQuizQuestion}
              quizAnswers={quizAnswers}
              setQuizAnswers={setQuizAnswers}
              quizCompleted={quizCompleted}
              setQuizCompleted={setQuizCompleted}
              quizCorrectCount={quizCorrectCount}
              setQuizCorrectCount={setQuizCorrectCount}
              quizTotalAttempts={quizTotalAttempts}
              setQuizTotalAttempts={setQuizTotalAttempts}
              quizSessionHistory={quizSessionHistory}
              setQuizSessionHistory={setQuizSessionHistory}
              currentQuizFeedback={currentQuizFeedback}
              setCurrentQuizFeedback={setCurrentQuizFeedback}
              generateNewQuizQuestion={generateNewQuizQuestion}
              resetQuiz={resetQuiz}
              QUIZ_TARGET_CORRECT={QUIZ_TARGET_CORRECT}
            />
          </GameCard>
        </VStack>

        {/* RIGHT COLUMN: Video & Builder */}
        <VStack align="stretch" spacing={6}>
          {/* Video Panel */}
          <GameCard variant="game" bg="gray.50">
            <Heading size="md" color="ink.700" mb={4}>
              📹 Today's Lesson: Verb Tenses
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
                <source src="/lesson2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>

            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
          </GameCard>

          {/* Interactive Builder */}
          <LessonIntroCard 
            title="Practice Makes Perfect" 
            directions="Directions: Complete each of the practice exercises to improve your grammar" 
          />
          <GameCard variant="game">
            <Heading size="md" color="blue.500" mb={4}>
              🎮 Sentence Builder
            </Heading>

            <VerbProgressTracker
              correctCount={correctCount}
              totalAttempts={totalAttempts}
              streak={streak}
              TARGET_CORRECT={TARGET_CORRECT}
            />
            <VerbCompletionCelebration
              isCompleted={isCompleted}
              resetProgress={() => setCorrectCount(0)}
            />
            <VerbLevelSelection
              currentLevel={currentLevel}
              setCurrentLevel={setCurrentLevel}
            />

            <Text fontWeight="bold" my={4} color="blue.600">
              Drag words to build a perfect sentence:
            </Text>

            <VerbWordBank
              availableWords={availableWords}
              handleDragStart={handleDragStart}
            />
            <VerbSentenceBuilder
              sentenceArea={sentenceArea}
              handleDragOver={(e) => e.preventDefault()}
              handleDrop={handleDrop}
              removeFromSentence={(i) => removeFromSentence(i)}
            />

            <VerbActionButtons
              checkSentence={checkSentence}
              resetSentenceOnly={resetSentenceOnly}
              sentenceArea={sentenceArea}
              isCompleted={isCompleted}
            />
            <VerbFeedbackDisplay feedback={feedback} />
          </GameCard>
        </VStack>
      </Grid>
    </PageContainer>
  );
};

export default VerbTenseStructure;
