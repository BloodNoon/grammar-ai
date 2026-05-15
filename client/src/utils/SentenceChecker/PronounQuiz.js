import React, { useState } from 'react';

const PronounQuiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const quizQuestions = [
    {
      id: 1,
      question: "Sort the words into the correct category: she, dog, they, teacher, it, students",
      options: ["Pronoun","Noun"],
      correct:["Pronoun: she","Pronoun: they","Pronoun: it","Noun: dog","Noun: teacher","Noun: students"],
      type: "multiple",
      explanation: "She, they, and it are pronouns because they replace nouns; dog, teacher, and students are nouns."
    },

    {
      id: 2,
      question: "Sort the words into categories: he, quickly, book, we, city, them",
      options: ["Can Replace a Noun","Cannot Replace a Noun"],
      correct: ["Can Replace a Noun: he","Can Replace a Noun: we","Can Replace a Noun: them","Cannot Replace a Noun: quickly","Cannot Replace a Noun: book","Cannot Replace a Noun: city"],
      type: "Multiple",
      explanation: "He, we, and them are pronouns that replace nouns; quickly, book, and city cannot replace nouns."
    },

    {
      id: 3,
      question: "Which word is the pronoun? The girl said she would call later.",
      options: ["The","girl","she","later"],
      correct: ["she"],
      type: "single",
      explanation: "She is the pronoun because it replaces 'the girl' in the sentence.",
    },

    {
      id: 4,
      question: "What does 'they' replace? The students finished their work, and they left early.",
      options: ["work","students","early"],
      correct: ["students"],
      type: "Single",
      explanation: "'They' replaces 'the students' in the sentence."
    },

    {
      id: 5,
      question: "Rewrite the sentence using a pronoun: Marcus is my best friend. Marcus plays soccer.",
      options: null,
      correct: ["He is my best friend. He plays soccer."],
      type: "Single",
      explanation: "'Marcus' is replaced by 'He' because he is male and singular."
    },

    {
      id: 6,
      question: "The cat was hungry, so ___ ate quickly.",
      options:["it","them"],
      correct:["it"],
      type: "Single",
      explanation: "'It' is the correct pronoun referring to 'the cat'."
    },

    {
      id: 7,
      question: "Sort the words into Subject vs Object Pronouns: I, them, she, us, he, me",
      options: ["Subject Pronouns","Object Pronouns"],
      correct: ["Subject Pronouns: I","Subject Pronouns: she","Subject Pronouns: he","Object Pronouns: them","Object Pronouns: us","Object Pronouns: me"],
      type: "Multiple",
      explanation: "I, she, he are subjects; them, us, me are objects."
    },
    
    {
      id: 8,
      question: "Sort the words into Possessive vs Not Possessive: mine, they, hers, us, ours, him",
      options: ["Possessive Pronouns","Not Possessive Pronouns"],
      correct: ["Possessive Pronouns: mine","Possessive Pronouns: hers","Possessive Pronouns: ours","Not Possessive Pronouns: they","Not Possessive Pronouns: us","Not Possessive Pronouns: him"],
      type: "Multiple",
      explanation: "Mine, hers, ours show ownership; they, us, him do not."
    },

    {
      id: 9,
      question: "What type of pronoun is 'him' in: I called him yesterday.",
      options: ["Subject","Object","Possessive"],
      correct: ["Object"],
      type: "Single",
      explanation: "'Him' is an object pronoun because it receives the action 'called'."
    },

    {
      id: 10,
      question: "What type of pronoun is 'ours' in: That victory was ours.",
      options: ["Subject","Object","Possessive"],
      correct: ["Possessive"],
      type: "Single",
      explanation:"'Ours' is a possessive pronoun because it indicates ownership of the victory."
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
      const percentage = Math.round((correctCount / quizQuestions.length) * 100);
      let message = `Quiz Complete! You scored ${correctCount} out of ${quizQuestions.length} questions correctly (${percentage}%).`;
      
      if (percentage >= 90) {
        message += " 🌟 Outstanding! You're a pronoun expert!";
      } else if (percentage >= 80) {
        message += " 🎉 Great job! You have a strong understanding of pronouns!";
      } else if (percentage >= 70) {
        message += " 👍 Good work! Review the explanations to strengthen your knowledge.";
      } else {
        message += " 📚 Keep practicing! Review the lesson materials and try again.";
      }
      
      alert(message);
    }, 100);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setAnswers({});
    setFeedback({});
  };

  return (
    <div style={{
      backgroundColor: '#e8f4fd',
      padding: '2rem',
      borderRadius: '10px',
      border: '2px solid #1976d2',
      marginTop: '2rem'
    }}>
      <h3 style={{ color: '#1565c0', marginBottom: '1rem' }}>🧠 Adverb Mastery Quiz</h3>
      
      {!quizStarted ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1rem', marginBottom: '1rem', color: '#666' }}>
            Test your comprehensive knowledge of pronouns!
          </p>
          <div style={{
            backgroundColor: '#fff',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #90caf9'
          }}>
            <h4 style={{ color: '#1565c0', marginBottom: '0.5rem' }}>Quiz Topics:</h4>
            <ul style={{ textAlign: 'left', color: '#666', fontSize: '0.9rem' }}>
              <li>• Identifying prononus in sentences</li>
              <li>• Types of pronouns</li>
              <li>• Proper usage of pronouns</li>
            </ul>
          </div>
          <button
            onClick={startQuiz}
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
            Start Adverb Quiz ({quizQuestions.length} Questions)
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <p style={{ color: '#1565c0', fontWeight: 'bold' }}>
              Progress: {Object.keys(answers).length}/{quizQuestions.length} answered
            </p>
          </div>

          {quizQuestions.map((question, index) => (
            <div key={index} style={{
              backgroundColor: '#fff',
              padding: '1.5rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              border: '1px solid #ddd'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '1rem' }}>
                {index + 1}. {question.question}
              </div>
              
              {question.type === 'multiple' ? (
                // Multiple choice checkboxes
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                    (Select all that apply)
                  </p>
                  {question.options.map((option, optIndex) => (
                    <label key={optIndex} style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      cursor: 'pointer',
                      padding: '0.25rem'
                    }}>
                      <input
                        type="checkbox"
                        checked={(answers[index] || []).includes(option)}
                        onChange={(e) => handleMultipleAnswer(index, option, e.target.checked)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : (
                // Single choice radio buttons
                <div style={{ marginBottom: '1rem' }}>
                  {question.options.map((option, optIndex) => (
                    <label key={optIndex} style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      cursor: 'pointer',
                      padding: '0.25rem'
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
                  ))}
                </div>
              )}
              
              {feedback[index] && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: feedback[index].correct ? '#d4edda' : '#f8d7da',
                  color: feedback[index].correct ? '#155724' : '#721c24',
                  borderRadius: '4px',
                  border: `1px solid ${feedback[index].correct ? '#c3e6cb' : '#f5c6cb'}`
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
              disabled={Object.keys(answers).length < quizQuestions.length}
              style={{
                backgroundColor: Object.keys(answers).length === quizQuestions.length ? '#28a745' : '#ccc',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: Object.keys(answers).length === quizQuestions.length ? 'pointer' : 'not-allowed',
                marginRight: '1rem',
                fontWeight: 'bold'
              }}
            >
              Check All Answers
            </button>
            
            <button
              onClick={resetQuiz}
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
              Reset Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PronounQuiz;