import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Box, Text, Flex, HStack, Badge, Spinner, VStack,
} from "@chakra-ui/react";

const API = "http://localhost:8000/api";

const TOPIC_LABELS = {
  nouns: "Nouns", verb_tenses: "Verb Tenses", articles: "Articles",
  prepositions: "Prepositions", adjectives: "Adjectives",
  adverbs: "Adverbs", conjunctions: "Conjunctions",
};

const BASE_PTS  = 5;
const WRONG_PTS = 3;
const MAX_PTS   = 100;
const LETTERS   = ["A", "B", "C", "D"];

export default function SATSHSATPractice() {
  const { topic } = useParams();
  const abortRef = useRef(null);

  const [score,   setScore]   = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong,   setWrong]   = useState(0);
  const [streak,  setStreak]  = useState(0);
  const [count,   setCount]   = useState(0);

  const [question, setQuestion] = useState(null);
  const [result,   setResult]   = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [selected, setSelected] = useState(null);
  const [popup,    setPopup]    = useState(null);

  const barPct = Math.round(score / MAX_PTS * 100);

  const loadQuestion = useCallback(async () => {
    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setResult(null);
    setSelected(null);
    setQuestion(null);
    try {
      const res = await fetch(`${API}/mc/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
        signal: controller.signal,
      });
      const data = await res.json();
      if (data.error) { alert(data.error); return; }
      setQuestion(data);
    } catch (e) {
      if (e.name !== "AbortError") alert("Could not reach grammar server.");
    } finally {
      setLoading(false);
    }
  }, [topic]);

  useEffect(() => {
    loadQuestion();
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, [loadQuestion]);

  const selectOption = async (idx) => {
    if (result || selected !== null || !question) return;
    setSelected(idx);
    try {
      const res = await fetch(`${API}/mc/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qid: question.qid, selected_index: idx }),
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
      setCount(c => c + 1);
      const pid = Date.now();
      setPopup({ pts, id: pid });
      setTimeout(() => setPopup(p => p?.id === pid ? null : p), 900);
      setResult({ isCorrect, pts, ...data });
    } catch {
      alert("Error checking answer.");
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (!question || loading) return;
      if (!result) {
        const idx = ["a","b","c","d"].indexOf(e.key.toLowerCase());
        if (idx >= 0 && idx < (question.options?.length || 0)) selectOption(idx);
      } else if (e.key === "Enter") {
        loadQuestion();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [result, question, loading, streak, loadQuestion]);

  // Blank-based renderer — splits on "______" and inserts a styled blank
  const renderBlankSentence = (sentenceBlank) => {
    if (!sentenceBlank) return null;
    const parts = sentenceBlank.split("______");
    return parts.map((part, i) => (
      <React.Fragment key={i}>
        <Text as="span">{part}</Text>
        {i < parts.length - 1 && (
          <Text
            as="span"
            display="inline-block"
            minW="80px"
            borderBottom="2px solid"
            borderColor="orange.500"
            mx={1}
            verticalAlign="bottom"
            lineHeight="1.2"
          >
            &nbsp;
          </Text>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Box p="2rem" position="relative">
      {popup && (
        <Box position="fixed" top="40%" left="50%" transform="translateX(-50%)"
          fontFamily="mono" fontSize="2xl" fontWeight="700"
          color={popup.pts > 0 ? "green.500" : "red.500"}
          pointerEvents="none" zIndex={999}>
          {popup.pts > 0 ? `+${popup.pts}` : popup.pts}
        </Box>
      )}

      <Flex bg="white" borderRadius="xl" boxShadow="sm" px={5} py={3}
        mb={5} align="center" gap={4} flexWrap="wrap"
        border="1px solid" borderColor="orange.100">
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
          <Text color="gray.400">{count} answered</Text>
        </HStack>
      </Flex>

      <Box bg="white" borderRadius="xl" boxShadow="sm" p={6}
        border="1px solid" borderColor="orange.100" maxW="800px" mx="auto">

        <HStack mb={4} spacing={2}>
          <Badge bg="orange.100" color="orange.700" borderRadius="full"
            px={3} py={1} fontSize="xs" fontWeight="700">
            {TOPIC_LABELS[topic]?.toUpperCase()} · SAT/SHSAT
          </Badge>
          <Badge bg="gray.100" color="gray.500" borderRadius="full"
            px={2} py={1} fontSize="xs">
            Standard English Conventions
          </Badge>
        </HStack>

        <Text fontSize="sm" color="gray.600" mb={4}>
          Which choice completes the text so that it conforms to the conventions of Standard English?
        </Text>

        {loading ? (
          <Flex justify="center" py={8}><Spinner color="orange.400" size="lg" /></Flex>
        ) : question ? (
          <>
            <Box p={4} bg="orange.50" borderRadius="lg" mb={6}
              border="1px solid" borderColor="orange.200"
              fontSize="md" fontFamily="mono" lineHeight="1.9">
              {renderBlankSentence(question.sentence_blank)}
            </Box>

            <VStack spacing={3} align="stretch">
              {question.options?.map((opt, idx) => {
                let bg = "white";
                let borderColor = "gray.200";
                let color = "ink.700";
                if (result) {
                  if (idx === result.correct_index) { bg = "green.50"; borderColor = "green.400"; color = "green.700"; }
                  else if (idx === selected && !result.isCorrect) { bg = "red.50"; borderColor = "red.400"; color = "red.700"; }
                } else if (idx === selected) { bg = "orange.50"; borderColor = "orange.400"; }

                return (
                  <Flex key={idx} as="button" onClick={() => selectOption(idx)}
                    align="center" gap={4} p={4} borderRadius="xl"
                    border="2px solid" borderColor={borderColor}
                    bg={bg} cursor={result ? "default" : "pointer"}
                    _hover={!result ? { borderColor: "orange.300", bg: "orange.50" } : {}}
                    transition="all 0.15s" textAlign="left" w="100%">
                    <Box w="32px" h="32px" borderRadius="full" flexShrink={0}
                      bg={result && idx === result.correct_index ? "green.400"
                        : result && idx === selected && !result.isCorrect ? "red.400"
                        : "orange.100"}
                      color={result && (idx === result.correct_index || (idx === selected && !result.isCorrect)) ? "white" : "orange.700"}
                      display="flex" alignItems="center" justifyContent="center"
                      fontWeight="700" fontSize="sm">
                      {LETTERS[idx]}
                    </Box>
                    <Text fontFamily="mono" fontSize="md" color={color}
                      fontWeight={result && idx === result.correct_index ? "700" : "400"}>
                      {opt}
                    </Text>
                    {result && idx === result.correct_index && <Text ml="auto" color="green.500" fontWeight="700">✓</Text>}
                    {result && idx === selected && !result.isCorrect && idx !== result.correct_index && <Text ml="auto" color="red.500" fontWeight="700">✗</Text>}
                  </Flex>
                );
              })}
            </VStack>

            {result && (
              <Box mt={5}>
                <Box p={3} borderRadius="lg" mb={3}
                  bg={result.isCorrect ? "green.50" : "red.50"}
                  borderLeft="4px solid"
                  borderColor={result.isCorrect ? "green.400" : "red.400"}>
                  <Text fontWeight="700" fontSize="sm"
                    color={result.isCorrect ? "green.600" : "red.600"}>
                    {result.isCorrect
                      ? `✅ Correct! +${result.pts} pts${streak > 1 ? ` (🔥 ${streak} streak)` : ""}`
                      : `❌ Incorrect · -${WRONG_PTS} pts · Answer: "${result.correct_word}"`}
                  </Text>
                </Box>
                {result.explanation && (
                  <Box p={3} bg="gray.50" borderRadius="lg" mb={3}>
                    <Text fontSize="sm" color="gray.700" lineHeight="1.7">{result.explanation}</Text>
                  </Box>
                )}
                {!result.isCorrect && result.ai_summary && (
                  <Box p={4} bg="orange.50" borderRadius="lg"
                    border="1px solid" borderColor="orange.200" mb={3}>
                    <Text fontSize="xs" color="orange.600" fontWeight="700" mb={1}>💡 AI Explanation</Text>
                    <Text fontSize="sm" color="gray.700" lineHeight="1.7">{result.ai_summary}</Text>
                  </Box>
                )}
                <Text fontSize="xs" color="gray.400" mb={2}>Press Enter for next question</Text>
                <Box as="button" onClick={loadQuestion}
                  bg="orange.400" color="white" px={6} py={2.5}
                  borderRadius="xl" fontWeight="600"
                  border="2px solid" borderColor="ink.900"
                  boxShadow="2px 2px 0px rgba(0,0,0,0.1)"
                  _hover={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.15)" }}>
                  Next Question →
                </Box>
              </Box>
            )}

            {!result && (
              <Text fontSize="xs" color="gray.400" mt={4}>Press A, B, C, or D to select</Text>
            )}
          </>
        ) : null}
      </Box>
    </Box>
  );
}
