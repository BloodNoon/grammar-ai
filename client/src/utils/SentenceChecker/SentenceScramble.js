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
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "1rem" }}>
        Sentence Scramble (Compound Preposition Focus)
      </h2>

      {/* 🔀 Reshuffle Button */}
      <div style={{ marginBottom: "1.5rem" }}>
        <button
          onClick={initGame}
          style={{
            padding: "0.6rem 1.2rem",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Reshuffle 🔀
        </button>
      </div>

      {gameSentences.map((s) => (
        <div
          key={s.id}
          style={{
            marginBottom: "2rem",
            padding: "1rem",
            border: "2px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3 style={{ marginBottom: "0.5rem" }}>Scramble this sentence:</h3>
          {/* Draggable words */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {s.scrambled.map((word, i) => (
              <button
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
              </button>
            ))}
          </div>

          {/* Drop area */}
          <div
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
              <span
                key={i}
                style={{
                  padding: "0.5rem 1rem",
                  border: "1px solid #28a745",
                  borderRadius: "8px",
                  backgroundColor: "#e8f5e8",
                  fontWeight: "500",
                }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() => handleCheck(s.id, s.sentence)}
              style={{
                marginRight: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#28a745",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Check
            </button>
            <button
              onClick={() => handleReset(s.id, s.words)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#dc3545",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </div>

          {/* Feedback */}
          {feedback[s.id] && (
            <p
              style={{
                marginTop: "0.5rem",
                fontWeight: "bold",
                color: feedback[s.id] === "Great job!" ? "#28a745" : "#c0392b",
              }}
            >
              {feedback[s.id]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SentenceScramble;