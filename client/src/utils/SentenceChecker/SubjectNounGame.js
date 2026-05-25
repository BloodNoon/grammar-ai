import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from "react";

// Sentence dataset: subject + object nouns marked
const SENTENCES = [
  { sentence: "The chef prepared dinner.", subject: "chef", object: "dinner" },
  { sentence: "The dog chased the ball.", subject: "dog", object: "ball" },
  { sentence: "The teacher helped the student.", subject: "teacher", object: "student" },
  { sentence: "The cat caught the mouse.", subject: "cat", object: "mouse" },
  { sentence: "The doctor treated the patient.", subject: "doctor", object: "patient" },
  { sentence: "The artist painted a portrait.", subject: "artist", object: "portrait" },
  { sentence: "The farmer planted seeds.", subject: "farmer", object: "seeds" },
  { sentence: "The player scored a goal.", subject: "player", object: "goal" },
  { sentence: "The mother hugged her child.", subject: "mother", object: "child" },
  { sentence: "The writer finished the book.", subject: "writer", object: "book" },
  { sentence: "The mechanic fixed the car.", subject: "mechanic", object: "car" },
  { sentence: "The bird built a nest.", subject: "bird", object: "nest" },
  { sentence: "The student solved the problem.", subject: "student", object: "problem" },
  { sentence: "The fisherman caught a fish.", subject: "fisherman", object: "fish" },
  { sentence: "The singer sang a song.", subject: "singer", object: "song" },
  { sentence: "The gamer played a match.", subject: "gamer", object: "match" },
  { sentence: "The baker baked bread.", subject: "baker", object: "bread" },
  { sentence: "The soldier protected the village.", subject: "soldier", object: "village" },
  { sentence: "The scientist discovered a cure.", subject: "scientist", object: "cure" },
  { sentence: "The actor performed a role.", subject: "actor", object: "role" },
];

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function SubjectNounGame() {
  const [gameSentences, setGameSentences] = useState([]);
  const [draggables, setDraggables] = useState([]);
  const [buckets, setBuckets] = useState({ subjects: [], objects: [] });
  const [feedback, setFeedback] = useState(null);
  const [history, setHistory] = useState([]); // store moves for undo

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const selected = shuffleArray(SENTENCES).slice(0, 6);
    setGameSentences(selected);

    // Pick either subject or object as draggable
    const draggablesList = selected.map((s) => {
      const pickSubject = Math.random() > 0.5;
      return {
        id: `${s.sentence}-${pickSubject ? "subj" : "obj"}`,
        word: pickSubject ? s.subject : s.object,
        type: pickSubject ? "subject" : "object",
      };
    });
    setDraggables(draggablesList);
    setBuckets({ subjects: [], objects: [] });
    setFeedback(null);
    setHistory([]);
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  const handleDrop = (e, bucketType) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));

    // avoid duplicates
    if (
      !buckets[bucketType].some((i) => i.id === data.id) &&
      draggables.some((i) => i.id === data.id)
    ) {
      setBuckets((prev) => ({
        ...prev,
        [bucketType]: [...prev[bucketType], data],
      }));
      setDraggables((prev) => prev.filter((i) => i.id !== data.id));
      setHistory((prev) => [...prev, { item: data, from: "pool", to: bucketType }]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const undoLastMove = () => {
    const lastMove = history[history.length - 1];
    if (!lastMove) return;

    setBuckets((prev) => ({
      ...prev,
      [lastMove.to]: prev[lastMove.to].filter((i) => i.id !== lastMove.item.id),
    }));
    setDraggables((prev) => [...prev, lastMove.item]);
    setHistory((prev) => prev.slice(0, -1));
  };

  const checkAnswers = () => {
    let total = 0;
    let correct = 0;

    buckets.subjects.forEach((i) => {
      total++;
      if (i.type === "subject") correct++;
    });
    buckets.objects.forEach((i) => {
      total++;
      if (i.type === "object") correct++;
    });

    setFeedback(`You got ${correct} out of ${total} correct!`);
  };

  const allPlaced = draggables.length === 0;

  return (
    <Box style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#2c3e50" }}>
        Subject vs Object Noun Game
      </h1>
      <Text style={{ marginBottom: "2rem", fontSize: "1.1rem" }}>
        Drag the highlighted nouns into the correct box.
      </Text>

      {/* Sentences */}
      <Box style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <Box style={{ textAlign: "left", width: "45%" }}>
          {gameSentences.slice(0, 3).map((s, idx) => (
            <Text
              key={idx}
              style={{
                background: "#f9f9f9",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                marginBottom: "0.5rem",
                border: "1px solid gray.200",
              }}
            >
              {s.sentence}
            </Text>
          ))}
        </Box>
        <Box style={{ textAlign: "left", width: "45%" }}>
          {gameSentences.slice(3, 6).map((s, idx) => (
            <Text
              key={idx}
              style={{
                background: "#f9f9f9",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                marginBottom: "0.5rem",
                border: "1px solid gray.200",
              }}
            >
              {s.sentence}
            </Text>
          ))}
        </Box>
      </Box>

      {/* Pool of draggables */}
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          padding: "1rem",
          border: "2px dashed gray.300",
          marginBottom: "2rem",
          minHeight: "60px",
          justifyContent: "center",
        }}
      >
        {draggables.map((item) => (
          <Box
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            style={{
              padding: "0.5rem 1rem",
              background: "#e0f7fa",
              borderRadius: "5px",
              cursor: "grab",
              fontWeight: "bold",
            }}
          >
            {item.word}
          </Box>
        ))}
      </Box>

      {/* Buckets */}
      <Box style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
        {["subjects", "objects"].map((bucket) => (
          <Box
            key={bucket}
            onDrop={(e) => handleDrop(e, bucket)}
            onDragOver={handleDragOver}
            style={{
              flex: 1,
              minHeight: "120px",
              padding: "1rem",
              border: "2px solid gray.700",
              borderRadius: "8px",
              backgroundColor: "#fafafa",
              maxWidth: "300px",
            }}
          >
            <Heading as="h3" size="md">{bucket === "subjects" ? "Subject Nouns" : "Object Nouns"}</Heading>
            {buckets[bucket].map((item) => (
              <Box
                key={item.id}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#dcedc8",
                  borderRadius: "5px",
                  marginBottom: "0.5rem",
                  fontWeight: "bold",
                }}
              >
                {item.word}
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      {/* Controls */}
      <Box style={{ marginTop: "2rem" }}>
        <Button
          onClick={undoLastMove}
          disabled={history.length === 0 || feedback}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#f39c12",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: history.length === 0 || feedback ? "not-allowed" : "pointer",
          }}
        >
          Undo
        </Button>

        <Button
          onClick={checkAnswers}
          disabled={!allPlaced || feedback}
          sx={{
            padding: "0.5rem 1rem",
            backgroundColor: allPlaced ? "green.500" : "#95a5a6",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: allPlaced && !feedback ? "pointer" : "not-allowed",
          }}
        >
          Check Answers
        </Button>

        {feedback && (
          <Button
            onClick={resetGame}
            style={{
              marginLeft: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Reset Game
          </Button>
        )}
      </Box>

      {feedback && (
        <Text style={{ marginTop: "1rem", fontWeight: "bold", fontSize: "1.2rem" }}>{feedback}</Text>
      )}
    </Box>
  );
}

export default SubjectNounGame;