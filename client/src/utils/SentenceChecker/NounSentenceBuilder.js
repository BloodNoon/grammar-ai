import { Box, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const NounSentenceBuilder = () => {
  const [userSentences, setUserSentences] = useState({ 0: [], 1: [] });

  const challenges = [
    {
      id: 0,
      goal: "Build a sentence with an Abstract Noun and a Proper Noun.",
      options: ["John", "has", "a lot of", "courage", "today", "."],
      target: "John has a lot of courage today ."
    },
    {
      id: 1,
      goal: "Build a sentence using a Subject Pronoun and a Possessive Pronoun.",
      options: ["She", "told", "me", "that", "the book", "is", "hers", "."],
      target: "She told me that the book is hers ."
    }
  ];

  const addPart = (challengeId, part) => {
    if (userSentences[challengeId].length >= challenges[challengeId].options.length) return;
    setUserSentences(prev => ({ ...prev, [challengeId]: [...prev[challengeId], part] }));
  };

  const clearParts = (challengeId) => {
    setUserSentences(prev => ({ ...prev, [challengeId]: [] }));
  };

  return (
    <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '25px' }}>
      {challenges.map((challenge) => {
        const currentParts = userSentences[challenge.id];
        const currentString = currentParts.join(" ").replace(" .", ".");
        const isComplete = currentParts.length === challenge.options.length;
        const isPerfect = currentString === challenge.target;
        const isWrong = isComplete && !isPerfect;

        return (
          <Box key={challenge.id} sx={{ background: 'gray.50', padding: '15px', borderRadius: '10px', border: '2px solid #e2e8f0' }}>
            <Text style={{ color: '#0f172a', marginBottom: '10px', fontWeight: 'bold' }}>🎯 {challenge.goal}</Text>
            
            <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
              {challenge.options.map((opt, i) => (
                <Button key={i} onClick={() => addPart(challenge.id, opt)} style={{ padding: '6px 12px', background: 'white', border: '2px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                  {opt}
                </Button>
              ))}
            </Box>

            <Box style={{ minHeight: '50px', padding: '10px', background: 'white', border: `2px dashed ${isPerfect ? '#22c55e' : isWrong ? '#ef4444' : '#94a3b8'}`, borderRadius: '8px', fontWeight: 'bold', color: isPerfect ? '#15803d' : '#1e293b', display: 'flex', alignItems: 'center' }}>
              {currentString || <Text as="span" style={{ color: '#94a3b8', fontWeight: 'normal' }}>Click words above...</Text>}
            </Box>

            <Box style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button onClick={() => clearParts(challenge.id)} style={{ padding: '6px 12px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Clear</Button>
              {isPerfect && <Text as="span" style={{ color: '#15803d', fontWeight: 'bold' }}>✅ Perfect!</Text>}
              {isWrong && <Text as="span" style={{ color: '#b91c1c', fontWeight: 'bold' }}>❌ Try again!</Text>}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default NounSentenceBuilder;