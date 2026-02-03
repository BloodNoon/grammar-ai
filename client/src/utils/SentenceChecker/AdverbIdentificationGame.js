import React, { useState } from 'react';

const AdverbIdentificationGame = () => {
  const [currentSentence, setCurrentSentence] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const sentences = [
    {
      text: "She sings beautifully in the choir.",
      words: ["She", "sings", "beautifully", "in", "the", "choir."],
      adverbs: ["beautifully"],
      explanation: "'Beautifully' is an adverb of manner that describes HOW she sings."
    },
    {
      text: "Yesterday, I worked very hard.",
      words: ["Yesterday,", "I", "worked", "very", "hard."],
      adverbs: ["Yesterday,", "very"],
      explanation: "'Yesterday' tells us WHEN, and 'very' intensifies the adverb 'hard'."
    },
    {
      text: "The cat quickly ran outside.",
      words: ["The", "cat", "quickly", "ran", "outside."],
      adverbs: ["quickly", "outside"],
      explanation: "'Quickly' describes HOW the cat ran, 'outside' describes WHERE it ran."
    },
    {
      text: "He always speaks clearly here.",
      words: ["He", "always", "speaks", "clearly", "here."],
      adverbs: ["always", "clearly", "here"],
      explanation: "'Always' (frequency), 'clearly' (manner), and 'here' (place) are all adverbs."
    },
    {
      text: "The extremely tall building stands proudly downtown.",
      words: ["The", "extremely", "tall", "building", "stands", "proudly", "downtown."],
      adverbs: ["extremely", "proudly", "downtown"],
      explanation: "'Extremely' modifies the adjective 'tall', 'proudly' describes how it stands, 'downtown' tells us where."
    }
  ];

  const startGame = () => {
    setGameStarted(true);
    setCurrentSentence(0);
    setSelectedWords([]);
    setFeedback(null);
    setScore(0);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentSentence(0);
    setSelectedWords([]);
    setFeedback(null);
    setScore(0);
  };

  const handleWordClick = (word, index) => {
    if (feedback) return; // Don't allow changes after feedback

    const wordKey = `${word}-${index}`;
    if (selectedWords.includes(wordKey)) {
      setSelectedWords(selectedWords.filter(w => w !== wordKey));
    } else {
      setSelectedWords([...selectedWords, wordKey]);
    }
  };

  const checkAnswer = () => {
    const current = sentences[currentSentence];
    const selectedAdverbs = selectedWords.map(wordKey => wordKey.split('-')[0]);
    
    const correctAdverbs = current.adverbs;
    const isCorrect = correctAdverbs.length === selectedAdverbs.length &&
                     correctAdverbs.every(adverb => selectedAdverbs.includes(adverb));

    if (isCorrect) {
      setScore(score + 1);
      setFeedback({ correct: true, message: "Perfect! " + current.explanation });
    } else {
      setFeedback({ 
        correct: false, 
        message: `Not quite right. The adverbs are: ${correctAdverbs.join(', ')}. ${current.explanation}` 
      });
    }
  };

  const nextSentence = () => {
    if (currentSentence < sentences.length - 1) {
      setCurrentSentence(currentSentence + 1);
      setSelectedWords([]);
      setFeedback(null);
    } else {
      alert(`Game Complete! Final Score: ${score}/${sentences.length}`);
      resetGame();
    }
  };

  if (!gameStarted) {
    return (
      <div style={{
        marginTop: '2rem',
        padding: '2rem',
        backgroundColor: '#e3f2fd',
        borderRadius: '10px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        border: '2px solid #1976d2'
      }}>
        <h2 style={{ color: '#1565c0', marginBottom: '1rem' }}>🎯 Adverb Identification Game</h2>
        <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#666' }}>
          Click on all the adverbs in each sentence. Test your skills with 5 different sentences!
        </p>
        <button
          onClick={startGame}
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Start Game
        </button>
      </div>
    );
  }

  const current = sentences[currentSentence];

  return (
    <div style={{
      marginTop: '2rem',
      padding: '2rem',
      backgroundColor: '#e3f2fd',
      borderRadius: '10px',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      border: '2px solid #1976d2'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#1565c0', margin: 0 }}>🎯 Find the Adverbs</h2>
        <div style={{ color: '#666' }}>
          Sentence {currentSentence + 1} of {sentences.length} | Score: {score}/{sentences.length}
        </div>
      </div>

      <p style={{ fontSize: '1rem', marginBottom: '1rem', color: '#666' }}>
        Click on all the adverbs in this sentence:
      </p>

      <div style={{
        fontSize: '1.2rem',
        lineHeight: '1.8',
        marginBottom: '1.5rem',
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        {current.words.map((word, index) => {
          const wordKey = `${word}-${index}`;
          const isSelected = selectedWords.includes(wordKey);
          const isAdverb = current.adverbs.includes(word);
          
          let backgroundColor = '#fff';
          let color = '#333';
          let border = '1px solid transparent';

          if (feedback) {
            if (isAdverb) {
              backgroundColor = '#d4edda';
              color = '#155724';
              border = '2px solid #28a745';
            }
            if (isSelected && !isAdverb) {
              backgroundColor = '#f8d7da';
              color = '#721c24';
              border = '2px solid #dc3545';
            }
          } else if (isSelected) {
            backgroundColor = '#fff3cd';
            color = '#856404';
            border = '2px solid #ffc107';
          }

          return (
            <span
              key={index}
              onClick={() => handleWordClick(word, index)}
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.5rem',
                margin: '0.125rem',
                backgroundColor,
                color,
                border,
                borderRadius: '4px',
                cursor: feedback ? 'default' : 'pointer',
                userSelect: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {feedback && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: feedback.correct ? '#d4edda' : '#f8d7da',
          color: feedback.correct ? '#155724' : '#721c24',
          borderRadius: '4px',
          border: `1px solid ${feedback.correct ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          <strong>{feedback.correct ? '✅ Correct!' : '❌ Incorrect'}</strong>
          <br />
          {feedback.message}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {!feedback ? (
          <button
            onClick={checkAnswer}
            disabled={selectedWords.length === 0}
            style={{
              backgroundColor: selectedWords.length > 0 ? '#28a745' : '#ccc',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: selectedWords.length > 0 ? 'pointer' : 'not-allowed',
              fontWeight: 'bold'
            }}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={nextSentence}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {currentSentence < sentences.length - 1 ? 'Next Sentence' : 'Finish Game'}
          </button>
        )}

        <button
          onClick={resetGame}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default AdverbIdentificationGame;