import React, { useState } from 'react';

const AdjectiveQuiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const quizQuestions = [
    {
      question: "Identify the adjectives in: 'The tall building is impressive.'",
      options: ["tall", "building", "is", "impressive"],
      correct: ["tall", "impressive"],
      type: "multiple",
      explanation: "Both 'tall' (describes the building) and 'impressive' (describes how the building seems) are adjectives."
    },
    {
      question: "Put these adjectives in the correct order: wooden, beautiful, small",
      options: ["beautiful small wooden", "small beautiful wooden", "wooden beautiful small"],
      correct: "beautiful small wooden",
      type: "single",
      explanation: "Opinion (beautiful) comes before Size (small) which comes before Material (wooden)."
    },
    {
      question: "Which sentence follows proper adjective order?",
      options: [
        "A wooden beautiful table",
        "A beautiful wooden table",
        "A table beautiful wooden"
      ],
      correct: "A beautiful wooden table",
      type: "single",
      explanation: "Opinion adjectives (beautiful) come before Material adjectives (wooden)."
    },
    {
      question: "In 'She bought three expensive red cars', which words are adjectives?",
      options: ["three", "expensive", "red", "cars"],
      correct: ["expensive", "red"],
      type: "multiple",
      explanation: "'Three' is a number/determiner, 'expensive' is an opinion adjective, 'red' is a color adjective, and 'cars' is a noun."
    },
    {
      question: "What type of adjective is 'ancient' in 'the ancient castle'?",
      options: ["Opinion", "Age", "Size", "Color"],
      correct: "Age",
      type: "single",
      explanation: "'Ancient' describes how old something is, making it an Age adjective."
    }
  ];

  const startQuiz = () => {
    setQuizStarted(true);
    setAnswers({});
    setFeedback({});
  };

  const handleAnswer = (questionIndex, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleMultipleAnswer = (questionIndex, option, isChecked) => {
    const currentAnswers = answers[questionIndex] || [];
    if (isChecked) {
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: [...currentAnswers, option]
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: currentAnswers.filter(a => a !== option)
      }));
    }
  };

  const checkQuiz = () => {
    const newFeedback = {};
    let correctCount = 0;

    quizQuestions.forEach((q, index) => {
      const userAnswer = answers[index];
      if (q.type === 'multiple') {
        const isCorrect = Array.isArray(userAnswer) && 
          userAnswer.length === q.correct.length &&
          userAnswer.every(ans => q.correct.includes(ans));
        newFeedback[index] = { correct: isCorrect, explanation: q.explanation };
        if (isCorrect) correctCount++;
      } else {
        const isCorrect = userAnswer === q.correct;
        newFeedback[index] = { correct: isCorrect, explanation: q.explanation };
        if (isCorrect) correctCount++;
      }
    });

    setFeedback(newFeedback);
    
    // Show overall score
    setTimeout(() => {
      alert(`Quiz Complete! You scored ${correctCount} out of ${quizQuestions.length} questions correctly.`);
    }, 100);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setAnswers({});
    setFeedback({});
  };

  return (
    <div style={{
      backgroundColor: 'purple.50',
      padding: '2rem',
      borderRadius: '10px',
      border: '2px solid #9c27b0'
    }}>
      <h3 style={{ color: '#7b1fa2', marginBottom: '1rem' }}>🧠 Adjective Mastery Quiz</h3>
      
      {!quizStarted ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', marginBottom: '1rem', color: 'gray.500' }}>
            Test your knowledge of adjectives, their types, and proper ordering!
          </p>
          <button
            onClick={startQuiz}
            style={{
              backgroundColor: '#9c27b0',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Start Adjective Quiz
          </button>
        </div>
      ) : (
        <div>
          {quizQuestions.map((question, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              border: '1px solid gray.200'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                {index + 1}. {question.question}
              </div>
              
              {question.type === 'multiple' ? (
                // Multiple choice checkboxes
                question.options.map((option, optIndex) => (
                  <label key={optIndex} style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      checked={(answers[index] || []).includes(option)}
                      onChange={(e) => handleMultipleAnswer(index, option, e.target.checked)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    {option}
                  </label>
                ))
              ) : (
                // Single choice radio buttons
                question.options.map((option, optIndex) => (
                  <label key={optIndex} style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={(e) => handleAnswer(index, option)}
                      style={{ marginRight: '0.5rem' }}
                    />
                    {option}
                  </label>
                ))
              )}
              
              {feedback[index] && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: feedback[index].correct ? 'green.100' : 'red.100',
                  color: feedback[index].correct ? 'green.800' : 'red.800',
                  borderRadius: '4px',
                  border: `1px solid ${feedback[index].correct ? 'green.200' : 'red.200'}`
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {feedback[index].correct ? '✅ Correct!' : '❌ Incorrect'}
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>
                    {feedback[index].explanation}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div style={{ textAlign: 'center', marginTop: '1.5rem', gap: '1rem', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={checkQuiz}
              style={{
                backgroundColor: 'green.500',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginRight: '1rem',
                fontWeight: 'bold'
              }}
            >
              Check Answers
            </button>
            
            <button
              onClick={resetQuiz}
              style={{
                backgroundColor: 'gray.500',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Reset Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdjectiveQuiz;