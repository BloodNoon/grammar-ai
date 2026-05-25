import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from "react";

// List of all 16 sentences (1 per compound preposition)
const SENTENCES = [
  {
    sentence: "She invited her friends in addition to the party.",
    words: ["She", "invited", "her", "friends", "in addition to", "the", "party."],
  },
  {
    sentence: "According to the teacher, the test is tomorrow.",
    words: ["According to", "the", "teacher,", "the", "test", "is", "tomorrow."],
  },
  {
    sentence: "As of yesterday, the store was closed.",
    words: ["As of", "yesterday,", "the", "store", "was", "closed."],
  },
  {
    sentence: "She sings as well as she dances.",
    words: ["She", "sings", "as well as", "she", "dances."],
  },
  {
    sentence: "Aside from math, he enjoys science.",
    words: ["Aside from", "math,", "he", "enjoys", "science."],
  },
  {
    sentence: "The game was postponed because of the rain.",
    words: ["The", "game", "was", "postponed", "because of", "the", "rain."],
  },
  {
    sentence: "Ahead of the race, he practiced daily.",
    words: ["Ahead of", "the", "race,", "he", "practiced", "daily."],
  },
  {
    sentence: "Due to traffic, we were late.",
    words: ["Due to", "traffic,", "we", "were", "late."],
  },
  {
    sentence: "She came along with her brother.",
    words: ["She", "came", "along with", "her", "brother."],
  },
  {
    sentence: "He acted out of kindness.",
    words: ["He", "acted", "out of", "kindness."],
  },
  {
    sentence: "She sat next to her best friend.",
    words: ["She", "sat", "next to", "her", "best", "friend."],
  },
  {
    sentence: "He chose pizza instead of pasta.",
    words: ["He", "chose", "pizza", "instead of", "pasta."],
  },
  {
    sentence: "Prior to the meeting, she reviewed her notes.",
    words: ["Prior to", "the", "meeting,", "she", "reviewed", "her", "notes."],
  },
  {
    sentence: "In respect to your question, the answer is yes.",
    words: ["In respect to", "your", "question,", "the", "answer", "is", "yes."],
  },
  {
    sentence: "In spite of the rain, they played soccer.",
    words: ["In spite of", "the", "rain,", "they", "played", "soccer."],
  },
  {
    sentence: "In place of John, Mary attended the meeting.",
    words: ["In place of", "John,", "Mary", "attended", "the", "meeting."],
  },
];

// Utility: shuffle array
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const SentenceScramble = () => {
  const [gameSentences, setGameSentences] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  // Function to initialize or reshuffle a batch
  const initGame = () => {
    const selected = shuffleArray(SENTENCES).slice(0, 6);
    const scrambled = selected.map((s, idx) => ({
      ...s,
      scrambled: shuffleArray(s.words),
      id: idx,
    }));
    setGameSentences(scrambled);
    setAnswers({});
    setFeedback({});
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleDrop = (sentenceId, wordIndex) => {
    setAnswers((prev) => {
      const current = prev[sentenceId] || [];
      return {
        ...prev,
        [sentenceId]: [
          ...current,
          gameSentences.find((s) => s.id === sentenceId).scrambled[wordIndex],
        ],
      };
    });

    // Remove only the clicked word by index
    setGameSentences((prev) =>
      prev.map((s) =>
        s.id === sentenceId
          ? {
              ...s,
              scrambled: s.scrambled.filter((_, i) => i !== wordIndex),
            }
          : s
      )
    );
  };

  const normalize = (str) => {
    return str
      .toLowerCase()
      .replace(/[.,]/g, "") // remove commas and periods
      .replace(/\s+/g, " ") // collapse multiple spaces
      .trim();
  };

  const handleCheck = (sentenceId, correctSentence) => {
    const userAnswer = normalize((answers[sentenceId] || []).join(" "));
    const correctAnswer = normalize(correctSentence);

    if (userAnswer === correctAnswer) {
      setFeedback((prev) => ({ ...prev, [sentenceId]: "Great job!" }));
    } else {
      setFeedback((prev) => ({
        ...prev,
        [sentenceId]: "That doesn't look correct. Try again!",
      }));
    }
  };

  const handleReset = (sentenceId, words) => {
    setAnswers((prev) => ({ ...prev, [sentenceId]: [] }));
    setGameSentences((prev) =>
      prev.map((s) =>
        s.id === sentenceId ? { ...s, scrambled: shuffleArray(words) } : s
      )
    );
    setFeedback((prev) => ({ ...prev, [sentenceId]: "" }));
  };

  return (
    <Box style={{ marginTop: "2rem" }}>
      <Heading as="h2" size="lg" style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "1rem" }}>
        Sentence Scramble (Compound Preposition Focus)
      </Heading>

      {/* 🔀 Reshuffle Button */}
      <Box style={{ marginBottom: "1.5rem" }}>
        <Button
          onClick={initGame}
          sx={{
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "blue.500",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Reshuffle 🔀
        </Button>
      </Box>

      {gameSentences.map((s) => (
        <Box
          key={s.id}
          style={{
            marginBottom: "2rem",
            padding: "1rem",
            border: "2px solid gray.300",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Heading as="h3" size="md" style={{ marginBottom: "0.5rem" }}>Scramble this sentence:</Heading>
          {/* Draggable words */}
          <Box style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {s.scrambled.map((word, i) => (
              <Button
                key={i}
                onClick={() => handleDrop(s.id, i)}
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid #007acc",
                  borderRadius: "8px",
                  backgroundColor: "#e6f2fa",
                  cursor: "pointer",
                }}
              >
                {word}
              </Button>
            ))}
          </Box>

          {/* Drop area */}
          <Box
            style={{
              marginTop: "1rem",
              minHeight: "50px",
              border: "2px dashed #aaa",
              padding: "0.5rem",
              borderRadius: "8px",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {(answers[s.id] || []).map((word, i) => (
              <Text as="span"
                key={i}
                sx={{
                  padding: "0.5rem 1rem",
                  border: "1px solid green.500",
                  borderRadius: "8px",
                  backgroundColor: "green.50",
                  fontWeight: "500",
                }}
              >
                {word}
              </Text>
            ))}
          </Box>

          {/* Buttons */}
          <Box style={{ marginTop: "1rem" }}>
            <Button
              onClick={() => handleCheck(s.id, s.sentence)}
              style={{
                marginRight: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "green.500",
                color: "white",
                cursor: "pointer",
              }}
            >
              Check
            </Button>
            <Button
              onClick={() => handleReset(s.id, s.words)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "red.500",
                color: "white",
                cursor: "pointer",
              }}
            >
              Reset
            </Button>
          </Box>

          {/* Feedback */}
          {feedback[s.id] && (
            <Text
              sx={{
                marginTop: "0.5rem",
                fontWeight: "bold",
                color: feedback[s.id] === "Great job!" ? "green.500" : "#c0392b",
              }}
            >
              {feedback[s.id]}
            </Text>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SentenceScramble;