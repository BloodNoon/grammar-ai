import { Box, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const ConjunctionStructureGame = () => {
  // Track the built sentence for each of the 3 challenges
  const [userSentences, setUserSentences] = useState({ 0: [], 1: [], 2: [] });

  const challenges = [
    {
      id: 0,
      goal: "Build a front-loaded complex sentence (Don't forget the comma!)",
      options: ["Because", "the dog is playful", ",", "the cat is quiet", "."],
      target: "Because the dog is playful , the cat is quiet ."
    },
    {
      id: 1,
      goal: "Build a sentence with a FANBOYS conjunction in the middle.",
      options: ["I wanted to play outside", ",", "but", "it started to rain", "."],
      target: "I wanted to play outside , but it started to rain ."
    },
    {
      id: 2,
      goal: "Build a complex sentence with an AWUBIS in the middle.",
      options: ["We stayed inside", "since", "the storm was bad", "."],
      target: "We stayed inside since the storm was bad ."
    }
  ];

  const addPart = (challengeId, part) => {
    // Prevent adding if they've already used all blocks
    if (userSentences[challengeId].length >= challenges[challengeId].options.length) return;
    
    setUserSentences(prev => ({
      ...prev,
      [challengeId]: [...prev[challengeId], part]
    }));
  };

  const clearParts = (challengeId) => {
    setUserSentences(prev => ({
      ...prev,
      [challengeId]: []
    }));
  };

  return (
    <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {challenges.map((challenge) => {
        const currentParts = userSentences[challenge.id];
        const currentSentenceString = currentParts.join(" ").replace(" ,", ",").replace(" .", ".");
        
        // Validation Logic
        const isComplete = currentParts.length === challenge.options.length;
        const isPerfect = currentSentenceString === challenge.target;
        const isWrong = isComplete && !isPerfect;

        return (
          <Box key={challenge.id} sx={{ background: 'gray.50', padding: '20px', borderRadius: '10px', border: '2px solid #e2e8f0' }}>
            
            <Text style={{ color: '#0f172a', marginBottom: '15px', fontSize: '1.05rem', fontWeight: 'bold' }}>
              🎯 {challenge.goal}
            </Text>

            {/* Word Bank */}
            <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
              {challenge.options.map((opt, i) => (
                <Button
                  key={i}
                  onClick={() => addPart(challenge.id, opt)}
                  style={{ 
                    padding: '8px 12px', 
                    background: 'white', 
                    border: '2px solid #cbd5e1', 
                    borderRadius: '6px', 
                    cursor: 'pointer', 
                    fontWeight: '600',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  {opt}
                </Button>
              ))}
            </Box>

            {/* Drop Zone / Build Area */}
            <Box style={{ 
              minHeight: '60px', 
              padding: '15px', 
              background: 'white', 
              border: `2px dashed ${isPerfect ? '#22c55e' : isWrong ? '#ef4444' : '#94a3b8'}`, 
              borderRadius: '8px', 
              fontSize: '1.15rem', 
              fontWeight: 'bold', 
              color: isPerfect ? '#15803d' : isWrong ? '#b91c1c' : '#1e293b',
              display: 'flex', 
              alignItems: 'center'
            }}>
              {currentSentenceString || <Text as="span" style={{ color: '#94a3b8', fontWeight: 'normal' }}>Click words above to build...</Text>}
            </Box>

            {/* Controls & Validation Feedback */}
            <Box style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button 
                onClick={() => clearParts(challenge.id)} 
                style={{ padding: '8px 16px', background: '#e2e8f0', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Clear Words
              </Button>

              {isPerfect && (
                <Text as="span" style={{ color: '#15803d', fontWeight: 'bold', background: '#dcfce7', padding: '6px 12px', borderRadius: '6px' }}>
                  ✅ Perfect Structure!
                </Text>
              )}

              {isWrong && (
                <Text as="span" style={{ color: '#b91c1c', fontWeight: 'bold', background: '#fee2e2', padding: '6px 12px', borderRadius: '6px' }}>
                  ❌ Incorrect order. Clear and try again!
                </Text>
              )}
            </Box>

          </Box>
        );
      })}

    </Box>
  );
};

export default ConjunctionStructureGame;