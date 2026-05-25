import { Box, Button, Heading, Text } from '@chakra-ui/react';
// PrepositionBuilder.js
import React, { useState } from "react";
import "./PrepositionBuilder.css";

// Expanded valid compound prepositions (2-word + 3-word)
const VALID_PREPOSITIONS = [
  // 2-word
  ["according", "to"],
  ["as", "for"],
  ["as", "to"],
  ["due", "to"],
  ["instead", "of"],
  ["apart", "from"],
  ["as", "regards"],
  ["outside", "of"],
  ["regardless", "of"],
  ["aside", "from"],

  // 3-word
  ["by", "means", "of"],
  ["with", "relation", "to"],
  ["in", "line", "with"],
  ["on", "top", "of"],
  ["as", "far", "as"],
  ["in", "order", "to"],
  ["in", "receipt", "of"],
  ["with", "respect", "to"],
  ["with", "regard", "to"],
  ["with", "reference", "to"],
  ["in", "respect", "to"],   
  ["in", "relation", "to"],  
  ["in", "regard", "to"],    
  ["in", "reference", "to"],
];

// Some fake fragments to make it harder
const FAKE_PARTS = [
  "before",
  "under",
  "towards",
  "beyond",
  "since",
  "after",
  "next",
  "about",
  "between",
];

function PrepositionBuilder() {
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");

  // Word bank = all unique fragments from valid prepositions + some fakes
  const wordBank = [...new Set(VALID_PREPOSITIONS.flat().concat(FAKE_PARTS))];

  // Handle fragment click
  const handleSelect = (word) => {
    setSelected([...selected, word]);
  };

  // Check if selected sequence matches a valid preposition
  const checkPreposition = () => {
    const isValid = VALID_PREPOSITIONS.some(
      (preposition) => preposition.join(" ") === selected.join(" ")
    );

    if (isValid) {
      setMessage("✅ Correct! You built a compound preposition.");
    } else {
      setMessage("❌ Not quite. Try again!");
    }
  };

  const resetSelection = () => {
    setSelected([]);
    setMessage("");
  };

  return (
    <Box className="preposition-builder">
      <Heading as="h2" size="lg">🧩 Build-a-Preposition</Heading>
      <Text>Click the fragments in order to build a compound preposition.</Text>

      {/* Word Bank */}
      <Box className="word-bank">
        {wordBank.map((word, index) => (
          <Button
            key={index}
            className="word-button"
            onClick={() => handleSelect(word)}
          >
            {word}
          </Button>
        ))}
      </Box>

      {/* Selected Area */}
      <Box className="selected-area">
        {selected.length > 0 ? (
          selected.map((word, idx) => (
            <Text as="span" key={idx} className="selected-word">
              {word}
            </Text>
          ))
        ) : (
          <Text className="placeholder">Your preposition will appear here...</Text>
        )}
      </Box>

      {/* Controls */}
      <Box className="controls">
        <Button onClick={checkPreposition} disabled={selected.length < 2}>
          ✅ Check
        </Button>
        <Button onClick={resetSelection}>🔄 Reset</Button>
      </Box>

      {/* Feedback */}
      {message && <Text className="feedback">{message}</Text>}
    </Box>
  );
}

export default PrepositionBuilder;