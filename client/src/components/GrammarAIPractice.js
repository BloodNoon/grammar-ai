import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  HStack,
  Badge,
  Spinner,
  VStack,
} from "@chakra-ui/react";

const API = 'http://localhost:8000/api';

const TOPIC_LABELS = {
  nouns: "Nouns",
  verb_tenses: "Verb Tenses",
  articles: "Articles",
  prepositions: "Prepositions",
  adjectives: "Adjectives",
  adverbs: "Adverbs",
  conjunctions: "Conjunctions",
};

const BASE_PTS  = 5;
const WRONG_PTS = 3;
const MAX_PTS   = 100;
const QUESTIONS_PER_LEVEL = 3;
const PASS_THRESHOLD = 2;

/**
 * GrammarAIPractice
 * Drop-in component for the end of each lesson's practice page.
 * Props:
 *   topic      — one of the 7 topic keys (e.g. "nouns")
 *   onComplete — called when the student finishes all 9 questions (L1→L3)
 */
export default function GrammarAIPractice({ topic, onComplete }) {
  const [score,   setScore]   = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong,   setWrong]   = useState(0);
  const [streak,  setStreak]  = useState(0);

  const [level,            setLevel]            = useState(1);
  const [questionsAtLevel, setQuestionsAtLevel] = useState(0);
  const [correctAtLevel,   setCorrectAtLevel]   = useState(0);

  const [question, setQuestion] = useState(null);
  const [result,   setResult]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [checking, setChecking] = useState(false);
  const [done,     setDone]     = useState(false);
  const [popup,    setPopup]    = useState(null);

  const editorRef = useRef(null);

  const totalDone = (level - 1) * QUESTIONS_PER_LEVEL + questionsAtLevel;
  const progressPct = Math.round(totalDone / (3 * QUESTIONS_PER_LEVEL) * 100);
  const barPct = Math.round(score / MAX_PTS * 100);

  const loadQuestion = useCallback(async (lvl) => {
    setLoading(true);
    setResult(null);
    setQuestion(null);
    try {
      const res  = await fetch(`${API}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level: lvl }),
      });
      const data = await res.json();
      if (data.error) { alert(data.error); return; }
      setQuestion(data);
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerText = data.sentence;
          editorRef.current.focus();
        }
      }, 100);
    } catch {
      alert("Could not reach grammar server.");
    } finally {
      setLoading(false);
    }
  }, [topic]);

  // Load first question on mount
  useEffect(() => {
    loadQuestion(1);
  }, [loadQuestion]);

  const checkAnswer = async () => {
    if (!question || result || checking) return;
    const ans = editorRef.current?.innerText?.trim();
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

      const pid = Date.now();
      setPopup({ pts, id: pid });
      setTimeout(() => setPopup(p => p?.id === pid ? null : p), 900);

      // Advance level state
      const newQAL = questionsAtLevel + 1;
      const newCAL = isCorrect ? correctAtLevel + 1 : correctAtLevel;
      setQuestionsAtLevel(newQAL);
      if (isCorrect) setCorrectAtLevel(newCAL);

      if (newQAL >= QUESTIONS_PER_LEVEL) {
        const passed = newCAL >= PASS_THRESHOLD;
        if (passed && level < 3) {
          setLevel(l => l + 1);
          setQuestionsAtLevel(0);
          setCorrectAtLevel(0);
        } else if (passed && level === 3) {
          setDone(true);
        } else {
          setQuestionsAtLevel(0);
          setCorrectAtLevel(0);
        }
      }

      setResult({ isCorrect, pts, ...data });
    } catch {
      alert("Error checking answer.");
    } finally {
      setChecking(false);
    }
  };

  const handleNext = () => {
    if (done) {
      if (onComplete) onComplete(score);
    } else {
      const nextLevel = questionsAtLevel === 0 ? level : level;
      loadQuestion(nextLevel);
      setResult(null);
    }
  };

  // Enter key
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
  }, [result, question, done, level, questionsAtLevel, correctAtLevel, streak]);

  if (done) {
    return (
      <VStack spacing={4} textAlign="center" py={8}>
        <Text fontSize="4xl">🎉</Text>
        <Heading size="md" color="ink.700">
          {TOPIC_LABELS[topic]} AI Practice Complete!
        </Heading>
        <Text color="gray.500" fontSize="sm">
          You scored <b>{score}</b> out of {MAX_PTS} points
        </Text>
        <HStack fontFamily="mono" fontSize="sm" spacing={4}>
          <Text>✅ <b style={{color:"#2e9e5b"}}>{correct}</b> correct</Text>
          <Text>❌ <b style={{color:"#c0392b"}}>{wrong}</b> wrong</Text>
        </HStack>
        <Box
          as="button"
          onClick={() => onComplete && onComplete(score)}
          bg="green.500"
          color="white"
          px={6} py={2.5}
          borderRadius="xl"
          fontWeight="600"
          border="2px solid"
          borderColor="ink.900"
          boxShadow="2px 2px 0px rgba(0,0,0,0.1)"
          _hover={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.15)" }}
        >
          Finish ✓
        </Box>
      </VStack>
    );
  }

  return (
    <Box position="relative">
      {/* Points popup */}
      {popup && (
        <Box
          position="fixed" top="40%" left="50%" transform="translateX(-50%)"
          fontFamily="mono" fontSize="2xl" fontWeight="700"
          color={popup.pts > 0 ? "green.500" : "red.500"}
          pointerEvents="none" zIndex={999}
        >
          {popup.pts > 0 ? `+${popup.pts}` : popup.pts}
        </Box>
      )}

      {/* Score HUD */}
      <Flex
        bg="white" borderRadius="xl" px={4} py={2.5} mb={4}
        align="center" gap={3} flexWrap="wrap"
        border="1px solid" borderColor="orange.100"
        boxShadow="sm"
      >
        <Text fontWeight="700" color="orange.500" fontFamily="mono">
          {score}<Text as="span" color="gray.400" fontWeight="400" fontSize="xs">/100</Text>
        </Text>
        <Box flex="1" minW="60px" h="5px" bg="gray.100" borderRadius="full" overflow="hidden">
          <Box h="100%" w={`${barPct}%`}
            bg="linear-gradient(90deg,#e07b20,#2e9e5b)"
            borderRadius="full" transition="width 0.4s" />
        </Box>
        <HStack spacing={3} fontFamily="mono" fontSize="xs">
          <Text>✅ <b style={{color:"#2e9e5b"}}>{correct}</b></Text>
          <Text>❌ <b style={{color:"#c0392b"}}>{wrong}</b></Text>
          <Text>🔥 <b style={{color:"#d4a017"}}>{streak}</b></Text>
        </HStack>
      </Flex>

      {/* Level progress */}
      <Flex align="center" gap={2} mb={4}>
        <Text fontFamily="mono" fontSize="xs" color="gray.400" whiteSpace="nowrap">
          L{level} · {questionsAtLevel}/{QUESTIONS_PER_LEVEL}
        </Text>
        <Box flex="1" h="4px" bg="gray.100" borderRadius="full" overflow="hidden">
          <Box h="100%" w={`${progressPct}%`} bg="orange.400"
            borderRadius="full" transition="width 0.3s" />
        </Box>
      </Flex>

      {/* Question */}
      <Box
        bg="orange.50" borderRadius="xl" p={4}
        border="1px solid" borderColor="orange.200"
      >
        <HStack mb={3} spacing={2}>
          <Badge bg="orange.100" color="orange.700" borderRadius="full"
            px={3} py={1} fontSize="xs" fontWeight="700">
            {TOPIC_LABELS[topic]?.toUpperCase()} · AI PRACTICE
          </Badge>
          {question && (
            <Badge bg="gray.100" color="gray.600" borderRadius="full"
              px={2} py={1} fontSize="xs">
              Level {question.level} · {question.num_errors} error{question.num_errors > 1 ? "s" : ""}
            </Badge>
          )}
        </HStack>

        <Text fontSize="sm" color="gray.500" mb={3}>
          Find and fix the error{question?.num_errors > 1 ? "s" : ""} in this sentence:
        </Text>

        {loading ? (
          <Flex justify="center" py={6}><Spinner color="orange.400" /></Flex>
        ) : (
          <>
            {/* Editable sentence */}
            <Box
              ref={editorRef}
              contentEditable={!result}
              suppressContentEditableWarning
              spellCheck={false}
              p={3} borderRadius="lg" border="2px solid"
              borderColor={result
                ? (result.isCorrect ? "green.300" : "red.300")
                : "orange.300"}
              bg={result
                ? (result.isCorrect ? "green.50" : "red.50")
                : "white"}
              fontSize="md" fontFamily="mono" lineHeight="1.8"
              minH="50px" outline="none"
              cursor={result ? "default" : "text"}
              _focus={{ borderColor: "orange.400" }}
            />

            {/* Result */}
            {result && (
              <Box mt={3}>
                <Box p={2.5} borderRadius="lg" mb={2}
                  bg={result.isCorrect ? "green.50" : "red.50"}
                  borderLeft="3px solid"
                  borderColor={result.isCorrect ? "green.400" : "red.400"}
                >
                  <Text fontWeight="700" fontSize="sm"
                    color={result.isCorrect ? "green.600" : "red.600"}>
                    {result.isCorrect
                      ? `✅ Correct! +${result.pts} pts${streak > 1 ? ` (🔥 ${streak} streak)` : ""}`
                      : `❌ Incorrect · -${WRONG_PTS} pts`}
                  </Text>
                </Box>

                {result.feedback?.map((line, i) => (
                  <Text key={i} fontSize="sm" color="gray.600" mb={1}>{line}</Text>
                ))}

                {result.corrected && (
                  <Box mt={2} p={3} bg="gray.50" borderRadius="lg">
                    <Text fontSize="xs" color="gray.400" fontWeight="600" mb={1}>CORRECT ANSWER</Text>
                    <Text fontSize="sm" fontFamily="mono" color="gray.700">{result.corrected}</Text>
                  </Box>
                )}

                {!result.isCorrect && result.ai_summary && (
                  <Box mt={2} p={3} bg="orange.50" borderRadius="lg"
                    border="1px solid" borderColor="orange.200">
                    <Text fontSize="xs" color="orange.600" fontWeight="700" mb={1}>💡 Explanation</Text>
                    <Text fontSize="sm" color="gray.700" lineHeight="1.7">{result.ai_summary}</Text>
                  </Box>
                )}

                <Box
                  as="button" mt={3}
                  onClick={handleNext}
                  bg="orange.400" color="white"
                  px={6} py={2} borderRadius="xl" fontWeight="600"
                  border="2px solid" borderColor="ink.900"
                  boxShadow="2px 2px 0px rgba(0,0,0,0.1)"
                  _hover={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.15)" }}
                >
                  {done ? "Finish ✓" : "Next →"} <Text as="span" fontSize="xs" opacity={0.7} ml={1}>Enter</Text>
                </Box>
              </Box>
            )}

            {!result && (
              <Flex justify="flex-end" mt={3} align="center" gap={3}>
                <Text fontSize="xs" color="gray.400">
                  Fix <b>{question?.num_errors}</b> error{question?.num_errors > 1 ? "s" : ""} · Enter to check
                </Text>
                <Box
                  as="button"
                  onClick={checkAnswer}
                  bg={checking ? "gray.300" : "orange.400"}
                  color="white"
                  px={5} py={2} borderRadius="xl" fontWeight="600"
                  border="2px solid" borderColor="ink.900"
                  boxShadow="2px 2px 0px rgba(0,0,0,0.1)"
                  _hover={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.15)" }}
                  disabled={checking}
                >
                  {checking ? "Checking..." : "Check Answer"}
                </Box>
              </Flex>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
