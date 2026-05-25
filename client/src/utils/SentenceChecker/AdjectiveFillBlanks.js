import React, { useState } from 'react';

const AdjectiveFillBlanks = () => {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const questions = [
    { 
      sentence: "The _____ cat sat on the warm mat.", 
      options: ["fluffy", "table", "running"], 
      correct: "fluffy",
      explanation: "We need an adjective to describe the cat. 'Fluffy' describes what the cat looks/feels like."
    },
    { 
      sentence: "She wore a _____ _____ dress to the party.", 
      options: ["beautiful red", "red beautiful", "dress beautiful"], 
      correct: "beautiful red",
      explanation: "Opinion adjectives (beautiful) come before color adjectives (red) in English."
    },
    { 
      sentence: "The movie was very _____.", 
      options: ["excitement", "exciting", "excite"], 
      correct: "exciting",
      explanation: "'Exciting' is an adjective that describes what the movie was like. 'Excitement' is a noun."
    },
    { 
      sentence: "I bought _____ _____ _____ apples.", 
      options: ["red three small", "three small red", "small red three"], 
      correct: "three small red",
      explanation: "Correct order: Number (three) → Size (small) → Color (red). Remember the Royal Order!"
    },
    { 
      sentence: "The _____ building downtown is _____.", 
      options: ["old, impressive", "impressively, old", "older, impression"], 
      correct: "old, impressive",
      explanation: "Both blanks need adjectives. 'Old' describes the building, 'impressive' describes how it seems."
    }
  ];

  const handleAnswerSelect = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));

    // Provide immediate feedback
    const question = questions[questionIndex];
    const isCorrect = answer === question.correct;
    setFeedback(prev => ({
      ...prev,
      [questionIndex]: {
        correct: isCorrect,
        explanation: question.explanation
      }
    }));
  };

  const resetExercise = () => {
    setAnswers({});
    setFeedback({});
  };

  const getScore = () => {
    const correctAnswers = Object.values(feedback).filter(f => f.correct).length;
    return correctAnswers;
  };

  return (
    <div style={{
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem', color: 'gray.700' }}>
        ✏️ Practice: Fill in the Adjectives
      </h2>

      <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: 'gray.500' }}>
        Choose the correct adjective or adjective phrase for each sentence:
      </p>

      <div style={{ textAlign: 'left' }}>
        {questions.map((question, index) => (
          <div key={index} style={{ 
            margin: '1rem 0', 
            padding: '1.5rem', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            border: '1px solid gray.200'
          }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem', lineHeight: '1.5' }}>
              <strong>{index + 1}.</strong> {question.sentence}
            </p>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {question.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  onClick={() => handleAnswerSelect(index, option)}
                  disabled={feedback[index] !== undefined}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 
                      answers[index] === option 
                        ? (feedback[index]?.correct ? 'green.100' : 'red.100')
                        : 'gray.100',
                    border: '1px solid gray.200',
                    borderRadius: '4px',
                    cursor: feedback[index] ? 'default' : 'pointer',
                    color: 
                      answers[index] === option 
                        ? (feedback[index]?.correct ? 'green.800' : 'red.800')
                        : 'gray.600',
                    fontWeight: answers[index] === option ? 'bold' : 'normal',
                    opacity: feedback[index] && answers[index] !== option ? 0.6 : 1
                  }}
                >
                  {option}
                  {answers[index] === option && feedback[index] && (
                    feedback[index].correct ? ' ✅' : ' ❌'
                  )}
                </button>
              ))}
            </div>

            {feedback[index] && (
              <div style={{
                padding: '1rem',
                backgroundColor: feedback[index].correct ? 'cyan.100' : 'red.100',
                color: feedback[index].correct ? 'cyan.800' : 'red.800',
                borderRadius: '4px',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                <strong>
                  {feedback[index].correct ? '✅ Correct!' : '❌ Incorrect.'} 
                </strong>
                <br />
                {feedback[index].explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Score and Reset */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: 'blue.50',
        borderRadius: '8px'
      }}>
        {Object.keys(feedback).length > 0 && (
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'blue.800' }}>
            <strong>Score: {getScore()} out of {questions.length}</strong>
            {getScore() === questions.length && " 🎉 Perfect!"}
          </p>
        )}
        
        <button
          onClick={resetExercise}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'gray.500',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Reset Exercise
        </button>
      </div>
    </div>
  );
};

export default AdjectiveFillBlanks;