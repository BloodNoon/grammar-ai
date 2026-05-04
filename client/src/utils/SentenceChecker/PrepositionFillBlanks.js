import React, { useState } from 'react';

const PrepositionFillBlanks = () => {
  const [answers, setAnswers] = useState({});

  const exercises = [
    {
      id: 0,
      text: "The boy is sitting ___ a chair.",
      options: ["on", "in", "above", "through"],
      correct: "on",
      explanation: "'on' is used when resting upon a surface."
    },
    {
      id: 1,
      text: "We always eat lunch ___ noon.",
      options: ["on", "in", "at"],
      correct: "at",
      explanation: "'at' is used for specific times on the clock."
    },
    {
      id: 2,
      text: "The cat quickly hid ___ the bed.",
      options: ["over", "under", "between"],
      correct: "under",
      explanation: "'under' shows position directly below."
    },
    {
      id: 3,
      text: "My birthday is ___ October.",
      options: ["in", "on", "at"],
      correct: "in",
      explanation: "'in' is used for longer periods like months."
    }
  ];

  const handleSelect = (exerciseId, option) => {
    setAnswers(prev => ({ ...prev, [exerciseId]: option }));
  };

  return (
    // This Grid layout completely eliminates the need to scroll!
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '15px', 
      width: '100%' 
    }}>
      
      {exercises.map((ex) => {
        const userAnswer = answers[ex.id];
        const isAnswered = userAnswer !== undefined;
        const isCorrect = userAnswer === ex.correct;

        const displayText = isAnswered 
          ? ex.text.replace("___", userAnswer) 
          : ex.text;

        return (
          <div key={ex.id} style={{ 
            background: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '10px', 
            border: '2px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            
            <div>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1A0933', marginBottom: '12px' }}>
                {ex.id + 1}. {displayText}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: isAnswered ? '12px' : '0' }}>
                {ex.options.map(option => (
                  <button 
                    key={option} 
                    onClick={() => handleSelect(ex.id, option)}
                    style={{ 
                      padding: '6px 12px', 
                      fontSize: '0.9rem', 
                      fontWeight: 'bold', 
                      background: userAnswer === option ? '#1976d2' : '#e3f2fd', 
                      color: userAnswer === option ? 'white' : '#1565c0', 
                      border: '2px solid #1976d2', 
                      borderRadius: '6px', 
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Compact Validation Feedback */}
            {isAnswered && (
              <div style={{ 
                padding: '10px', 
                borderRadius: '6px', 
                fontSize: '0.85rem',
                lineHeight: '1.4',
                background: isCorrect ? '#d4edda' : '#f8d7da', 
                color: isCorrect ? '#155724' : '#721c24',
                borderLeft: `4px solid ${isCorrect ? '#28a745' : '#dc3545'}`,
                marginTop: 'auto' // Pushes feedback to the bottom to keep cards even
              }}>
                <strong>{isCorrect ? '✅ Correct: ' : '❌ Incorrect: '}</strong> 
                {isCorrect ? ex.explanation : "Try a different preposition!"}
              </div>
            )}
            
          </div>
        );
      })}
      
    </div>
  );
};

export default PrepositionFillBlanks;