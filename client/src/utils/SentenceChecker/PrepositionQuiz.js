import { Box, Button, Heading, Text } from '@chakra-ui/react';
// PrepositionQuiz.js
import React, { useState, useEffect } from 'react';
import nlp from 'compromise';
import { testCases } from './TestCases';
import './SubjectQuiz.css'; // You can reuse the same CSS

// Common prepositions to use as distractors
const PREPOSITIONS_POOL = [
  'on', 'in', 'at', 'by', 'with', 'about', 'against', 'between', 'into',
  'through', 'during', 'before', 'after', 'above', 'below', 'under', 'over',
  'near', 'inside', 'outside', 'towards', 'from', 'of', 'to', 'for', 'off'
];

// Get a question object: blank sentence + correct choice + distractors
const getPrepositionQuestion = (sentence) => {
    const doc = nlp(sentence);
    const preps = doc.prepositions().out('array');
  
    if (preps.length < 1) return null;
  
    // Pick a random preposition from the list
    const correctPrep = preps[Math.floor(Math.random() * preps.length)];
  
    // Create a sentence with the *first* matching occurrence of that preposition replaced by a blank
    let replaced = false;
    const words = sentence.split(' ');
    const blankedSentence = words
      .map((w) => {
        const cleaned = w.replace(/[^a-zA-Z]/g, '');
        if (
          !replaced &&
          cleaned.toLowerCase() === correctPrep.toLowerCase()
        ) {
          replaced = true;
          return '___';
        }
        return w;
      })
      .join(' ');
  
    // Get 3 random distractors from pool (excluding the correct one)
    const distractors = PREPOSITIONS_POOL
      .filter((p) => p.toLowerCase() !== correctPrep.toLowerCase())
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  
    // Combine and shuffle
    const choices = [...distractors, correctPrep].sort(() => 0.5 - Math.random());
  
    return {
      sentence: blankedSentence,
      correct: correctPrep,
      choices
    };
  };
  
const getMessage = (score) => {
  if (score <= 3) return 'You need more practice with prepositions!';
  if (score <= 7) return 'Good job, but you can improve!';
  return 'Excellent! You really know your prepositions!';
};

const PrepositionQuiz = () => {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState('');
  const [showNext, setShowNext] = useState(false);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [quizOver, setQuizOver] = useState(false);

  const loadNewQuestion = () => {
    let sentenceObj, data;
    do {
      sentenceObj = testCases[Math.floor(Math.random() * testCases.length)];
      data = getPrepositionQuestion(sentenceObj.sentence);
    } while (!data);

    setQuestion(data);
    setSelected('');
    setResult('');
    setShowNext(false);
  };

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const handleSelect = (word) => {
    setSelected(word);
  };

  const checkAnswer = () => {
    if (!selected) return;
    if (selected === question.correct) {
      setResult('✅ Correct!');
      setScore((prev) => prev + 1);
    } else {
      setResult(`❌ Incorrect. The correct answer is "${question.correct}".`);
    }
    setShowNext(true);
  };

  const nextQuestion = () => {
    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);
    if (nextCount >= 10) {
      setQuizOver(true);
    } else {
      loadNewQuestion();
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setQuestionCount(0);
    setQuizOver(false);
    loadNewQuestion();
  };

  if (!question) return <Text>Loading quiz...</Text>;

  return (
    <Box className="quiz-box">
      <Heading as="h2" size="lg">Which preposition fits the blank?</Heading>
      <Text className="quiz-sentence">"{question.sentence}"</Text>
      <Text className="quiz-score">Score: {score}/10</Text>

      <Box className="choices">
        {question.choices.map((word, i) => (
          <Button
            key={i}
            className={`choice-btn ${selected === word ? 'selected' : ''}`}
            onClick={() => handleSelect(word)}
            disabled={showNext || quizOver}
          >
            {word}
          </Button>
        ))}
      </Box>

      {!quizOver && !showNext && (
        <Button className="check-btn" onClick={checkAnswer} disabled={!selected}>
          Check Answer
        </Button>
      )}

      {result && <Text className="quiz-result">{result}</Text>}

      {!quizOver && showNext && (
        <Button className="next-btn" onClick={nextQuestion}>
          Next Question
        </Button>
      )}

      {quizOver && (
        <Box className="quiz-end">
          <Heading as="h3" size="md">Final Score: {score}/10</Heading>
          <Text>{getMessage(score)}</Text>
          <Button className="reset-btn" onClick={resetQuiz}>
            Restart Quiz
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PrepositionQuiz;