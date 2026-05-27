//Main webpage of the Article Structure with lesson2 styling
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Heading, Text, Grid, VStack, Divider } from "@chakra-ui/react";
import { PageContainer, GameCard, LessonIntroCard, LessonPageHeader } from "../components/ui";
import {
  hasFullStructCheck,
  getFullStructCheck,
} from "../utils/SentenceChecker/StructureChecker";
import { testCases } from "../utils/SentenceChecker/TestCases";

// Import all article component sections
import ArticleLesson from "./ArticleStructureComponents/ArticleLesson";
import ArticleProgressTracker from "./ArticleStructureComponents/ArticleProgressTracker";
import ArticleCompletionCelebration from "./ArticleStructureComponents/ArticleCompletionCelebration";
import ArticleLevelSelection from "./ArticleStructureComponents/ArticleLevelSelection";
import ArticleStructureSelection from "./ArticleStructureComponents/ArticleStructureSelection";
import ArticleWordBank from "./ArticleStructureComponents/ArticleWordbank";
import ArticleSentenceBuilder from "./ArticleStructureComponents/ArticleSentenceBuilder";
import ArticleActionButtons from "./ArticleStructureComponents/ArticleActionButtons";
import ArticleFeedbackDisplay from "./ArticleStructureComponents/ArticleFeedbackDisplay";
import ArticleTypingQuiz from "./ArticleStructureComponents/ArticleTypingQuiz";
import ArticleGrammarLegend from "./ArticleStructureComponents/ArticleGrammarLegend";

// ===== HELPER FUNCTIONS SECTION =====
// Use the same word classification system as VerbTenseStructure.js but focused on articles
function getWordType(word) {
  // Define word categories for grammatical classification (SAME AS VerbTenseStructure.js)
  const subjects = ["i", "he", "she", "it", "you", "we", "they"];
  const objects = ["me", "him", "her", "it", "your", "us", "them"];
  const determiners = ["the", "a", "an", "this", "that", "these", "those"];
  const adjectives = [
    "big",
    "small",
    "red",
    "blue",
    "happy",
    "sad",
    "quick",
    "slow",
    "beautiful",
    "ugly",
    "old",
    "new",
    "tall",
    "short",
    "fast",
    "interesting",
  ];
  const nouns = [
    "dog",
    "cat",
    "house",
    "car",
    "book",
    "tree",
    "ball",
    "bird",
    "fish",
    "apple",
    "cats",
    "dogs",
    "children",
    "dinner",
    "work",
    "ice",
    "music",
    "food",
    "elephant",
    "umbrella",
    "orange",
    "university",
    "room",
    "table",
    "chair",
    "window",
    "door",
    "garden",
    "flower",
    "student",
    "teacher",
    "computer",
  ];
  const verbs = [
    "cleaned",
    "saw",
    "bought",
    "found",
    "read",
    "opened",
    "closed",
    "watched",
    "heard",
    "ate",
    "drank",
    "painted",
    "fixed",
    "built",
    "run",
    "jump",
    "eat",
    "sleep",
    "play",
    "sing",
    "dance",
    "walk",
    "fly",
    "swim",
  ];

  // Clean the word by removing punctuation and converting to lowercase
  const lowerWord = word.toLowerCase().replace(/[.,!?]/, "");

  // Check which category the word belongs to and return the type (SAME ORDER AS VerbTenseStructure.js)
  if (subjects.includes(lowerWord)) return "Subject";
  if (objects.includes(lowerWord)) return "Object";
  if (determiners.includes(lowerWord)) return "Determiner";
  if (adjectives.includes(lowerWord)) return "Adjective";
  if (nouns.includes(lowerWord)) return "Noun";
  if (verbs.includes(lowerWord)) return "Verb";
  return "Unknown";
}

const ArticleStructure = () => {
  // ===== STATE MANAGEMENT ===== (SAME AS VerbTenseStructure.js)
  const [availableWords, setAvailableWords] = useState([]);
  const [sentenceArea, setSentenceArea] = useState([]);
  const [selectedStructure, setSelectedStructure] = useState("");
  const [feedback, setFeedback] = useState("");
  const [draggedWord, setDraggedWord] = useState(null);
  const [currentLevel, setCurrentLevel] = useState("beginner");

  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [showProgress, setShowProgress] = useState(true);

  const [sentenceFeedback, setSentenceFeedback] = useState({});

  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [quizTotalAttempts, setQuizTotalAttempts] = useState(0);
  const [quizSessionHistory, setQuizSessionHistory] = useState([]);
  const [currentQuizFeedback, setCurrentQuizFeedback] = useState("");

  const TARGET_CORRECT = 10;
  const QUIZ_TARGET_CORRECT = 10;

  // ===== DATA STRUCTURES ===== (COMPATIBLE WITH BACKEND)
  const articleWordBank = useMemo(
    () => ({
      Subject: ["I", "He", "She", "It", "You", "We", "They"],
      Object: ["me", "him", "her", "it", "you", "us", "them"],
      Determiner: ["The", "A", "An", "This", "That"],
      Adjective: [
        "big",
        "small",
        "red",
        "blue",
        "happy",
        "beautiful",
        "old",
        "new",
        "tall",
        "short",
        "fast",
        "interesting",
      ],
      Noun: [
        "dog",
        "cat",
        "house",
        "car",
        "book",
        "tree",
        "ball",
        "bird",
        "fish",
        "apple",
        "cats",
        "dogs",
        "children",
        "room",
        "table",
        "chair",
        "window",
        "door",
        "garden",
        "flower",
        "student",
        "teacher",
        "computer",
        "elephant",
        "umbrella",
        "orange",
        "university",
      ],
      Verb: [
        "cleaned",
        "saw",
        "bought",
        "found",
        "read",
        "opened",
        "closed",
        "watched",
        "heard",
        "ate",
        "drank",
        "painted",
        "fixed",
        "built",
      ],
      Conjunction: ["and", "or"],
    }),
    [],
  );

  // Structure examples that focus on articles
  const articleStructureExamples = [
    {
      pattern: "#Subject #Verb #Article #Noun ",
      example: "She pet the cat .",
      description: "Pronoun + verb + article + noun",
      level: "beginner",
    },
    {
      pattern: "#Article #Noun #Verb #Article #Noun",
      example: "The bus transports the students.",
      description: "Article + subject noun + verb + article + object noun",
      level: "beginner",
    },
    {
      pattern: "#Determiner #Adjective #Noun #Verb",
      example: "The big dog runs.",
      description: "Article-adjective-noun-verb",
      level: "intermediate",
    },
    {
      pattern: "#Subject #Verb #Determiner #Adjective #Noun",
      example: "I cleaned the small room.",
      description: "Subject-verb-article-adjective-noun",
      level: "advanced",
    },
  ];

  // ===== UTILITY FUNCTIONS ===== (SAME AS VerbTenseStructure.js)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // ===== WORD GENERATION ===== (SIMILAR TO VerbTenseStructure.js)
  const generateArticleWordSetFromTestCases = useCallback(() => {
    let words = [];

    // Extract realistic words from test cases
    const wordsFromTestCases = testCases.flatMap((tc) =>
      tc.sentence.split(" ").map((word) => word.replace(/[.,!?]/, "")),
    );

    if (selectedStructure) {
      // Generate words for selected structure
      const structure = selectedStructure;
      if (structure.includes("#Subject"))
        words.push(...articleWordBank.Subject.slice(0, 3));
      if (structure.includes("#Object"))
        words.push(...articleWordBank.Object.slice(0, 3));
      if (structure.includes("#Determiner"))
        words.push(...articleWordBank.Determiner.slice(0, 3));
      if (structure.includes("#Adjective"))
        words.push(...articleWordBank.Adjective.slice(0, 4));
      if (structure.includes("#Noun"))
        words.push(...articleWordBank.Noun.slice(0, 4));
      if (structure.includes("#Verb"))
        words.push(...articleWordBank.Verb.slice(0, 6));
      if (structure.includes("(and|or)"))
        words.push(...articleWordBank.Conjunction);
    } else {
      // Generate words based on difficulty level - always include articles
      const counts = {
        beginner: { Subject: 3, Determiner: 3, Noun: 3, Verb: 5 },
        intermediate: {
          Subject: 3,
          Determiner: 3,
          Adjective: 3,
          Noun: 4,
          Verb: 6,
          Conjunction: 2,
        },
        advanced: {
          Subject: 3,
          Object: 3,
          Determiner: 3,
          Adjective: 4,
          Noun: 4,
          Verb: 8,
          Conjunction: 2,
        },
      };

      const levelCounts = counts[currentLevel];
      Object.keys(levelCounts).forEach((type) => {
        if (articleWordBank[type]) {
          words.push(...articleWordBank[type].slice(0, levelCounts[type]));
        }
      });
    }

    // Add some words from test cases
    const testCaseWords = wordsFromTestCases.slice(0, 5);
    words.push(...testCaseWords);

    // Combine and shuffle words, removing duplicates
    const combinedWords = [
      ...new Set([
        ...words,
        ...Object.values(articleWordBank).flat().slice(0, 10),
      ]),
    ];

    setAvailableWords(
      shuffleArray(combinedWords).map((word, index) => ({
        id: `article-word-${index}`,
        text: word,
        type: getWordType(word),
      })),
    );
  }, [articleWordBank, currentLevel, selectedStructure]);

  // ===== DRAG AND DROP HANDLERS ===== (SAME AS VerbTenseStructure.js)
  const handleDragStart = (e, word) => {
    setDraggedWord(word);
    e.dataTransfer.setData("text/plain", JSON.stringify(word));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex = null) => {
    e.preventDefault();
    if (!draggedWord) return;
    const newSentenceArea = [...sentenceArea];
    if (targetIndex !== null)
      newSentenceArea.splice(targetIndex, 0, draggedWord);
    else newSentenceArea.push(draggedWord);
    setSentenceArea(newSentenceArea);
    setAvailableWords((prev) => prev.filter((w) => w.id !== draggedWord.id));
    setDraggedWord(null);
  };

  const removeFromSentence = (wordIndex) => {
    const word = sentenceArea[wordIndex];
    const newSentenceArea = sentenceArea.filter(
      (_, index) => index !== wordIndex,
    );
    setSentenceArea(newSentenceArea);
    setAvailableWords((prev) => [...prev, word]);
  };

  // ===== SENTENCE CHECKING ===== (SAME LOGIC AS VerbTenseStructure.js but focused on articles)
  const checkSentence = () => {
    if (sentenceArea.length === 0) {
      setFeedback("Please build a sentence first!");
      return;
    }

    const sentence = sentenceArea.map((w) => w.text).join(" ");

    console.log("Checking sentence:", sentence);
    console.log(
      "Word types:",
      sentenceArea.map((w) => `${w.text}(${w.type})`),
    );

    try {
      // Use backend functions to analyze sentence structure (SAME AS VerbTenseStructure.js)
      const matchedStructure = getFullStructCheck(sentence);
      let isStructureValid = selectedStructure
        ? hasFullStructCheck(sentence, selectedStructure)
        : hasFullStructCheck(sentence);

      // Additional article-specific validation
      const hasArticles = sentenceArea.some((w) => w.type === "Determiner");
      // Check for proper article usage
      if (isStructureValid && hasArticles) {
        for (let i = 0; i < sentenceArea.length - 1; i++) {
          const currentWord = sentenceArea[i];
          const nextWord = sentenceArea[i + 1];
          if (currentWord.type === "Determiner") {
            // Check a/an usage
            if (
              currentWord.text.toLowerCase() === "a" &&
              nextWord.text.match(/^[aeiou]/i)
            ) {
              isStructureValid = false;
              break;
            }
            if (
              currentWord.text.toLowerCase() === "an" &&
              !nextWord.text.match(/^[aeiou]/i)
            ) {
              isStructureValid = false;
              break;
            }
          }
        }
      }

      const newTotalAttempts = totalAttempts + 1;
      setTotalAttempts(newTotalAttempts);

      let feedbackText = "";

      if (selectedStructure) {
        // Handle feedback when practicing a specific structure
        if (isStructureValid) {
          const newCorrectCount = correctCount + 1;
          const newStreak = streak + 1;
          setCorrectCount(newCorrectCount);
          setStreak(newStreak);
          setSessionHistory((prev) => [
            ...prev,
            {
              sentence,
              structure: selectedStructure,
              correct: true,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
          if (newCorrectCount >= TARGET_CORRECT) {
            setIsCompleted(true);
            feedbackText = `🎉 CONGRATULATIONS! You've successfully completed ${TARGET_CORRECT} correct sentences!\nFinal sentence: "${sentence}" matches the target structure: "${selectedStructure}"`;
          } else {
            feedbackText = `✅ Excellent! Your sentence "${sentence}" matches the target structure: "${selectedStructure}"\nProgress: ${newCorrectCount}/${TARGET_CORRECT} correct (${TARGET_CORRECT - newCorrectCount} more to go!)`;
          }
        } else {
          setStreak(0);
          setSessionHistory((prev) => [
            ...prev,
            {
              sentence,
              structure: selectedStructure,
              correct: false,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
          feedbackText = `❌ Your sentence "${sentence}" doesn't match the target structure "${selectedStructure}".`;
          if (matchedStructure)
            feedbackText += ` It follows: "${matchedStructure}" instead.`;
          feedbackText += `\nRemember: Check article usage (a/an/the). Try again! Progress: ${correctCount}/${TARGET_CORRECT} correct`;
        }
      } else {
        // Handle feedback when practicing freely
        if (isStructureValid) {
          const newCorrectCount = correctCount + 1;
          const newStreak = streak + 1;
          setCorrectCount(newCorrectCount);
          setStreak(newStreak);
          setSessionHistory((prev) => [
            ...prev,
            {
              sentence,
              structure: matchedStructure,
              correct: true,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
          if (newCorrectCount >= TARGET_CORRECT) {
            setIsCompleted(true);
            feedbackText = `🎉 CONGRATULATIONS! You've successfully completed ${TARGET_CORRECT} correct sentences!\nFinal sentence: "${sentence}" follows a valid structure with proper article usage: "${matchedStructure}"`;
          } else {
            feedbackText = `✅ Great! Your sentence "${sentence}" follows a valid structure with proper articles: "${matchedStructure}"\nProgress: ${newCorrectCount}/${TARGET_CORRECT} correct (${TARGET_CORRECT - newCorrectCount} more to go!)`;
          }
        } else {
          setStreak(0);
          setSessionHistory((prev) => [
            ...prev,
            {
              sentence,
              structure: "Invalid",
              correct: false,
              timestamp: new Date().toLocaleTimeString(),
            },
          ]);
          feedbackText = `❌ Your sentence "${sentence}" needs better article usage.\nRemember: Use 'a' before consonants, 'an' before vowels, 'the' for specific things.\nTry again! Progress: ${correctCount}/${TARGET_CORRECT} correct`;
        }
      }

      setFeedback(feedbackText);
      if (
        isStructureValid &&
        !isCompleted &&
        correctCount + 1 < TARGET_CORRECT
      ) {
        setTimeout(() => {
          resetSentenceOnly();
        }, 2000);
      }
    } catch (error) {
      setFeedback("Error checking sentence. Please try again.");
    }
  };

  // ===== RESET FUNCTIONS ===== (SAME AS VerbTenseStructure.js)
  const resetSentenceOnly = () => {
    setAvailableWords([...availableWords, ...sentenceArea]);
    setSentenceArea([]);
    setFeedback("");
    generateArticleWordSetFromTestCases();
  };

  const resetProgress = () => {
    setCorrectCount(0);
    setTotalAttempts(0);
    setStreak(0);
    setIsCompleted(false);
    setSessionHistory([]);
    resetSentenceOnly();
  };

  // ===== STRUCTURE SELECTION =====
  const selectStructure = (structure) => {
    setSelectedStructure(structure.pattern);
    resetSentenceOnly();
  };

  // ===== LESSON INTERACTION =====
  const handleArticleSentenceChoice = (
    sentenceNum,
    chosenSentence,
    isCorrect,
  ) => {
    let feedbackText = "";
    let color = "";
    if (isCorrect) {
      feedbackText = "Correct! Good understanding of article usage.";
      color = "green";
    } else {
      const correctAnswers = {
        1: "You cleaned the room.",
        2: "The cat drank a bowl of milk.",
      };
      feedbackText = `Incorrect. The correct sentence is: "${correctAnswers[sentenceNum]}"`;
      color = "red";
    }
    setSentenceFeedback((prev) => ({
      ...prev,
      [sentenceNum]: { text: feedbackText, color: color },
    }));
  };

  // ===== QUIZ FUNCTIONS =====
  const generateNewQuizQuestion = useCallback(() => {
    const totalQuestions = 10;
    const randomIndex = Math.floor(Math.random() * totalQuestions);
    setCurrentQuizQuestion(randomIndex);
    setCurrentQuizFeedback("");
  }, []);

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizCompleted(false);
    setQuizCorrectCount(0);
    setQuizTotalAttempts(0);
    setQuizSessionHistory([]);
    setCurrentQuizFeedback("");
    generateNewQuizQuestion();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    generateArticleWordSetFromTestCases();
    generateNewQuizQuestion();
  }, [
    currentLevel,
    selectedStructure,
    generateArticleWordSetFromTestCases,
    generateNewQuizQuestion,
  ]);

  return (
    <PageContainer>
      <LessonPageHeader icon="🐸" title="Definite and Indefinite Articles Builder" />
      <LessonIntroCard />

      {/* Main 2-Column Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
        {/* LEFT COLUMN */}
        <VStack spacing={6} align="stretch">
          <GameCard variant="game">
            <ArticleLesson
              sentenceFeedback={sentenceFeedback}
              handleArticleSentenceChoice={handleArticleSentenceChoice}
            />
          </GameCard>

          <GameCard variant="game">
            <ArticleTypingQuiz
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

        {/* RIGHT COLUMN */}
        <VStack spacing={6} align="stretch">
          {/* THE VIDEO PANEL */}
          <GameCard variant="game" bg="gray.50">
            <Heading size="md" color="ink.700" mb={4}>
              📹 Today's Lesson: Articles
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
                <source src="/Lesson3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>

            <Text mt={3} fontSize="sm" color="gray.500" fontStyle="italic">
              💡 Watch the lesson before practicing with the exercises below
            </Text>
            <Text mt={2} fontSize="sm" textAlign="center">
              <a href="/Lesson3.mp4" download style={{ color: "blue.500" }}>
                Click here to download the video
              </a>
            </Text>
          </GameCard>

          <LessonIntroCard 
            title="Practice Makes Perfect" 
            directions="Directions: Complete each of the practice exercises to improve your grammar" 
          />
          <GameCard variant="game">
            <ArticleProgressTracker
              correctCount={correctCount}
              totalAttempts={totalAttempts}
              streak={streak}
              isCompleted={isCompleted}
              sessionHistory={sessionHistory}
              showProgress={showProgress}
              setShowProgress={setShowProgress}
              resetProgress={resetProgress}
              TARGET_CORRECT={TARGET_CORRECT}
            />
            <ArticleCompletionCelebration
              isCompleted={isCompleted}
              correctCount={correctCount}
              totalAttempts={totalAttempts}
              resetProgress={resetProgress}
            />
            <Divider my={6} />
            <ArticleLevelSelection
              currentLevel={currentLevel}
              setCurrentLevel={setCurrentLevel}
            />
            <Divider my={6} />
            <ArticleStructureSelection
              articleStructureExamples={articleStructureExamples}
              currentLevel={currentLevel}
              selectedStructure={selectedStructure}
              selectStructure={selectStructure}
              setSelectedStructure={setSelectedStructure}
            />
            <Divider my={6} />
            <ArticleWordBank
              availableWords={availableWords}
              handleDragStart={handleDragStart}
            />
            <ArticleSentenceBuilder
              sentenceArea={sentenceArea}
              removeFromSentence={removeFromSentence}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
            />
            <ArticleActionButtons
              checkSentence={checkSentence}
              resetSentenceOnly={resetSentenceOnly}
              generateArticleWordSetFromTestCases={
                generateArticleWordSetFromTestCases
              }
              sentenceArea={sentenceArea}
              isCompleted={isCompleted}
            />
            <ArticleFeedbackDisplay feedback={feedback} />
          </GameCard>
        </VStack>
      </Grid>

      {/* Grammar Reference Section */}
      <GameCard variant="game" mt={8}>
        <ArticleGrammarLegend />
      </GameCard>
    </PageContainer>
  );
};

export default ArticleStructure;
