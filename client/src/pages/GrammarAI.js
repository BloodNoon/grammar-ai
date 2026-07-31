import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Flex,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";

const API = "/api/grammar";

const TOPICS = ["nouns","verb_tenses","articles","prepositions","adjectives","adverbs","conjunctions"];
const TOPIC_LABELS = {
  nouns: "Nouns", verb_tenses: "Verb Tenses", articles: "Articles",
  prepositions: "Prepositions", adjectives: "Adjectives",
  adverbs: "Adverbs", conjunctions: "Conjunctions",
};

const BASE_PTS   = 5;
const WRONG_PTS  = 3;
const MAX_PTS    = 100;
const QUESTIONS_PER_LEVEL = 3;
const PASS_THRESHOLD = 2;

export default function GrammarAI() {
  // ── View state ──────────────────────────────────────
  const [view, setView]         = useState("topics"); // "topics" | "question" | "complete"
  const [activeTopic, setActiveTopic] = useState(null);

  // ── Global score ────────────────────────────────────
  const [score,   setScore]   = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong,   setWrong]   = useState(0);
  const [streak,  setStreak]  = useState(0);

  // ── Per-topic progression ────────────────────────────
  const [topicState, setTopicState] = useState(() =>
    Object.fromEntries(TOPICS.map(t => [t, {
      currentLevel: 1, questionsAtLevel: 0, correctAtLevel: 0, done: false
    }]))
  );

  // ── Question state ───────────────────────────────────
  const [question,    setQuestion]    = useState(null);
  const [userAnswer,  setUserAnswer]  = useState("");
  const [result,      setResult]      = useState(null); // null | { isCorrect, feedback, corrected, ai_summary, pts }
  const [loading,     setLoading]     = useState(false);
  const [checking,    setChecking]    = useState(false);
  const [pointsPopup, setPointsPopup] = useState(null); // { pts, id }

  const editorRef = useRef(null);

  // ── Load question ────────────────────────────────────
  const loadQuestion = useCallback(async (topic, level) => {
    setLoading(true);
    setResult(null);
    setQuestion(null);
    setUserAnswer("");
    try {
      const res  = await fetch(`${API}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level }),
      });
      const data = await res.json();
      if (data.error) { alert(data.error); return; }
      setQuestion(data);
      setTimeout(() => editorRef.current?.focus(), 100);
    } catch {
      alert("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  }, []);

  const startTopic = (topic) => {
    setActiveTopic(topic);
    const s = topicState[topic];
    setView("question");
    loadQuestion(topic, s.currentLevel);
  };

  // ── Check answer ─────────────────────────────────────
  const checkAnswer = async () => {
    if (!question || result || checking) return;
    const ans = editorRef.current?.innerText?.trim() || userAnswer.trim();
    if (!ans) return;

    setChecking(true);
    try {
      const res  = await fetch(`${API}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qid: question.qid, answer: ans }),
      });
      const data = await res.json();
      if (data.error) { alert(data.error); return; }

      const isCorrect = data.result === "correct";
      let pts;

      // Apply score
      if (isCorrect) {
        pts = BASE_PTS + streak;
        setScore(s => Math.min(MAX_PTS, s + pts));
        setStreak(s => s + 1);
        setCorrect(s => s + 1);
      } else {
        pts = -WRONG_PTS;
        setScore(s => Math.max(0, s - WRONG_PTS));
        setStreak(0);
        setWrong(s => s + 1);
      }

      // Show points popup
      const pid = Date.now();
      setPointsPopup({ pts, id: pid });
      setTimeout(() => setPointsPopup(p => p?.id === pid ? null : p), 1000);

      // Advance topic state
      setTopicState(prev => {
        const s = { ...prev[activeTopic] };
        s.questionsAtLevel++;
        if (isCorrect) s.correctAtLevel++;
        if (s.questionsAtLevel >= QUESTIONS_PER_LEVEL) {
          const passed = s.correctAtLevel >= PASS_THRESHOLD;
          if (passed && s.currentLevel < 3) {
            s.currentLevel++; s.questionsAtLevel = 0; s.correctAtLevel = 0;
          } else if (passed && s.currentLevel === 3) {
            s.done = true;
          } else {
            s.questionsAtLevel = 0; s.correctAtLevel = 0;
          }
        }
        return { ...prev, [activeTopic]: s };
      });

      setResult({ isCorrect, pts, ...data });
    } catch {
      alert("Error checking answer.");
    } finally {
      setChecking(false);
    }
  };

  const handleNext = () => {
    const s = topicState[activeTopic];
    if (s.done) {
      setView("complete");
    } else {
      loadQuestion(activeTopic, s.currentLevel);
      setResult(null);
    }
  };

  // ── Enter key ────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!result) checkAnswer();
        else handleNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [result, question, activeTopic, topicState, streak]);

  // ── Score bar pct ─────────────────────────────────────
  const barPct = Math.round(score / MAX_PTS * 100);

  // ── TOPIC GRID VIEW ──────────────────────────────────
  if (view === "topics") {
    return (
      <Box p="2rem" position="relative">
        {/* Header */}
        <Heading textAlign="center" mb="0.5rem" color="brand.700">
          Grammar Practice
        </Heading>
        <Text textAlign="center" color="gray.500" mb="1.5rem" fontSize="sm">
          Fix errors in real sentences. Pick a topic to start.
        </Text>

        {/* Score HUD */}
        <Flex
          bg="white" borderRadius="xl" boxShadow="sm" px={5} py={3}
          mb={6} align="center" gap={4} flexWrap="wrap"
          border="1px solid" borderColor="orange.100"
        >
          <Text fontWeight="700" color="orange.500" fontFamily="mono" fontSize="lg">
            {score}<Text as="span" color="gray.400" fontWeight="400" fontSize="sm">/100</Text>
          </Text>
          <Box flex="1" minW="80px" h="6px" bg="gray.100" borderRadius="full" overflow="hidden">
            <Box h="100%" w={`${barPct}%`} bg="linear-gradient(90deg,#e07b20,#2e9e5b)" borderRadius="full" transition="width 0.4s" />
          </Box>
          <HStack spacing={4} fontFamily="mono" fontSize="sm">
            <Text>✅ <b style={{color:"#2e9e5b"}}>{correct}</b></Text>
            <Text>❌ <b style={{color:"#c0392b"}}>{wrong}</b></Text>
            <Text>🔥 <b style={{color:"#d4a017"}}>{streak}</b></Text>
          </HStack>
        </Flex>

        {/* Topic grid */}
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
          {TOPICS.map(topic => {
            const s = topicState[topic];
            const pct = s.done ? 100 : ((s.currentLevel - 1) * QUESTIONS_PER_LEVEL + s.questionsAtLevel) / (3 * QUESTIONS_PER_LEVEL) * 100;
            return (
              <VStack
                key={topic}
                bg="white" borderRadius="xl" boxShadow="sm" p={5} spacing={2}
                border="2px solid" borderColor={s.done ? "green.300" : "orange.100"}
                cursor={s.done ? "default" : "pointer"}
                _hover={s.done ? {} : { borderColor: "orange.400", boxShadow: "md" }}
                onClick={() => !s.done && startTopic(topic)}
                position="relative" overflow="hidden" textAlign="center"
              >
                <Text fontWeight="700" fontSize="sm" color="ink.700" textTransform="capitalize">
                  {TOPIC_LABELS[topic]}
                </Text>
                <Text fontFamily="mono" fontSize="xs" color="gray.400">
                  {s.done ? "✓ Complete" : `L${s.currentLevel} · ${s.questionsAtLevel}/${QUESTIONS_PER_LEVEL}`}
                </Text>
                {/* Progress bar at bottom */}
                <Box position="absolute" bottom="0" left="0" h="3px" w={`${pct}%`}
                  bg={s.done ? "green.400" : "orange.400"} transition="width 0.3s" />
              </VStack>
            );
          })}
        </SimpleGrid>
      </Box>
    );
  }

  // ── TOPIC COMPLETE VIEW ───────────────────────────────
  if (view === "complete") {
    return (
      <Box p="2rem" textAlign="center">
        <Heading color="green.500" mb={2}>🎉 Topic Complete!</Heading>
        <Text color="gray.500" mb={2}>{TOPIC_LABELS[activeTopic]}</Text>
        <Text fontFamily="mono" fontSize="4xl" fontWeight="700" color="orange.500" mb={6}>
          {score} <Text as="span" fontSize="lg" color="gray.400">/ {MAX_PTS}</Text>
        </Text>
        <Button bg="orange.400" color="white" _hover={{ bg: "orange.500" }}
          borderRadius="full" px={8} onClick={() => setView("topics")}>
          Back to Topics
        </Button>
      </Box>
    );
  }

  // ── QUESTION VIEW ─────────────────────────────────────
  const ts = topicState[activeTopic];
  const totalDone = (ts.currentLevel - 1) * QUESTIONS_PER_LEVEL + ts.questionsAtLevel;
  const progressPct = Math.round(totalDone / (3 * QUESTIONS_PER_LEVEL) * 100);

  return (
    <Box p="2rem" position="relative">
      {/* Points popup */}
      {pointsPopup && (
        <Box
          position="fixed" top="40%" left="50%" transform="translateX(-50%)"
          fontFamily="mono" fontSize="2xl" fontWeight="700" pointerEvents="none"
          color={pointsPopup.pts > 0 ? "green.500" : "red.500"}
          animation="fadeUp 0.8s ease-out forwards"
          zIndex={999}
        >
          {pointsPopup.pts > 0 ? `+${pointsPopup.pts}` : pointsPopup.pts}
        </Box>
      )}

      {/* Score HUD */}
      <Flex
        bg="white" borderRadius="xl" boxShadow="sm" px={5} py={3}
        mb={5} align="center" gap={4} flexWrap="wrap"
        border="1px solid" borderColor="orange.100"
      >
        <Text fontWeight="700" color="orange.500" fontFamily="mono" fontSize="lg">
          {score}<Text as="span" color="gray.400" fontWeight="400" fontSize="sm">/100</Text>
        </Text>
        <Box flex="1" minW="80px" h="6px" bg="gray.100" borderRadius="full" overflow="hidden">
          <Box h="100%" w={`${barPct}%`} bg="linear-gradient(90deg,#e07b20,#2e9e5b)" borderRadius="full" transition="width 0.4s" />
        </Box>
        <HStack spacing={4} fontFamily="mono" fontSize="sm">
          <Text>✅ <b style={{color:"#2e9e5b"}}>{correct}</b></Text>
          <Text>❌ <b style={{color:"#c0392b"}}>{wrong}</b></Text>
          <Text>🔥 <b style={{color:"#d4a017"}}>{streak}</b></Text>
        </HStack>
      </Flex>

      {/* Level progress bar */}
      <Flex align="center" gap={3} mb={5}>
        <Text fontFamily="mono" fontSize="xs" color="gray.400" whiteSpace="nowrap">
          L{ts.currentLevel} · {ts.questionsAtLevel}/{QUESTIONS_PER_LEVEL}
        </Text>
        <Box flex="1" h="6px" bg="gray.100" borderRadius="full" overflow="hidden">
          <Box h="100%" w={`${progressPct}%`} bg="orange.400" borderRadius="full" transition="width 0.3s" />
        </Box>
        <Button size="xs" variant="ghost" color="gray.400" onClick={() => setView("topics")}>
          ← Topics
        </Button>
      </Flex>

      {/* Question card */}
      <Box bg="white" borderRadius="xl" boxShadow="sm" p={6} border="1px solid" borderColor="orange.100">
        {/* Badges */}
        <HStack mb={4} spacing={2}>
          <Badge bg="orange.100" color="orange.700" borderRadius="full" px={3} py={1} fontSize="xs" fontWeight="700">
            {TOPIC_LABELS[activeTopic]?.toUpperCase()}
          </Badge>
          {question && (
            <Badge bg="gray.100" color="gray.600" borderRadius="full" px={3} py={1} fontSize="xs">
              Level {question.level}, {question.num_errors} error{question.num_errors > 1 ? "s" : ""}
            </Badge>
          )}
        </HStack>

        <Text fontSize="sm" color="gray.500" mb={3}>
          Find and fix the error{question?.num_errors > 1 ? "s" : ""} in this sentence:
        </Text>

        {loading ? (
          <Flex justify="center" py={8}><Spinner color="orange.400" size="lg" /></Flex>
        ) : (
          <>
            {/* Editable sentence */}
            <Box
              ref={editorRef}
              contentEditable={!result}
              suppressContentEditableWarning
              onInput={e => setUserAnswer(e.currentTarget.innerText)}
              p={4} borderRadius="lg" border="2px solid"
              borderColor={result ? (result.isCorrect ? "green.300" : "red.300") : "orange.200"}
              bg={result ? (result.isCorrect ? "green.50" : "red.50") : "orange.50"}
              fontSize="md" fontFamily="mono" lineHeight="1.8"
              minH="60px" outline="none" cursor={result ? "default" : "text"}
              _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 1px #e07b20" }}
              dangerouslySetInnerHTML={question && !result ? { __html: question.sentence } : undefined}
            />

            {/* Result feedback */}
            {result && (
              <Box mt={4}>
                <Box
                  p={3} borderRadius="lg" mb={3}
                  bg={result.isCorrect ? "green.50" : "red.50"}
                  borderLeft="4px solid"
                  borderColor={result.isCorrect ? "green.400" : "red.400"}
                >
                  <Text fontWeight="700" color={result.isCorrect ? "green.600" : "red.600"} fontSize="sm">
                    {result.isCorrect
                      ? `✅ Correct! +${result.pts} pts${streak > 1 ? ` (🔥 ${streak} streak)` : ""}`
                      : `❌ Incorrect · -${WRONG_PTS} pts`}
                  </Text>
                </Box>

                {/* Feedback lines */}
                {result.feedback?.map((line, i) => (
                  <Text key={i} fontSize="sm" color="gray.600" mb={1}>{line}</Text>
                ))}

                {/* Corrected sentence */}
                {result.corrected && (
                  <Box mt={3} p={3} bg="gray.50" borderRadius="lg">
                    <Text fontSize="xs" color="gray.400" fontWeight="600" mb={1}>CORRECT ANSWER</Text>
                    <Text fontSize="sm" fontFamily="mono" color="gray.700">{result.corrected}</Text>
                  </Box>
                )}

                {/* AI explanation */}
                {!result.isCorrect && result.ai_summary && (
                  <Box mt={3} p={4} bg="orange.50" borderRadius="lg" border="1px solid" borderColor="orange.200">
                    <Text fontSize="xs" color="orange.600" fontWeight="700" mb={2}>💡 Explanation</Text>
                    <Text fontSize="sm" color="gray.700" lineHeight="1.7">{result.ai_summary}</Text>
                  </Box>
                )}

                {/* Next button */}
                <Button
                  mt={4} bg="orange.400" color="white" _hover={{ bg: "orange.500" }}
                  borderRadius="full" px={8} onClick={handleNext}
                >
                  {ts.done ? "See Results" : "Next Question"} <Text as="span" ml={2} fontSize="xs" opacity={0.7}>Enter</Text>
                </Button>
              </Box>
            )}

            {/* Check button */}
            {!result && (
              <Flex justify="flex-end" mt={4}>
                <Text fontSize="xs" color="gray.400" mr={3} alignSelf="center">
                  Find <b>{question?.num_errors}</b> error{question?.num_errors > 1 ? "s" : ""} · <kbd>Enter</kbd> to check
                </Text>
                <Button
                  bg="orange.400" color="white" _hover={{ bg: "orange.500" }}
                  borderRadius="full" px={6} onClick={checkAnswer}
                  isLoading={checking} isDisabled={checking}
                >
                  Check Answer
                </Button>
              </Flex>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
