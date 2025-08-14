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

  if (!question) return <p>Loading quiz...</p>;

  return (
    <div className="quiz-box">
      <h2>Which preposition fits the blank?</h2>
      <p className="quiz-sentence">"{question.sentence}"</p>
      <p className="quiz-score">Score: {score}/10</p>

      <div className="choices">
        {question.choices.map((word, i) => (
          <button
            key={i}
            className={`choice-btn ${selected === word ? 'selected' : ''}`}
            onClick={() => handleSelect(word)}
            disabled={showNext || quizOver}
          >
            {word}
          </button>
        ))}
      </div>

      {!quizOver && !showNext && (
        <button className="check-btn" onClick={checkAnswer} disabled={!selected}>
          Check Answer
        </button>
      )}

      {result && <p className="quiz-result">{result}</p>}

      {!quizOver && showNext && (
        <button className="next-btn" onClick={nextQuestion}>
          Next Question
        </button>
      )}

      {quizOver && (
        <div className="quiz-end">
          <h3>Final Score: {score}/10</h3>
          <p>{getMessage(score)}</p>
          <button className="reset-btn" onClick={resetQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default PrepositionQuiz;