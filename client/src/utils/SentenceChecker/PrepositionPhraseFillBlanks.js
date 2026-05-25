import React from 'react';

const PrepositionPhraseFillBlanks = () => {
  const questions = [
    { sentence: "_____ the park, children were playing.", options: ["In", "On", "Under"], correct: "In" },
    { sentence: "The book is _____ the shelf.", options: ["in", "on", "under"], correct: "on" },
    { sentence: "We walked _____ the bridge.", options: ["over", "in", "at"], correct: "over" },
    { sentence: "_____ the meeting, everyone was quiet.", options: ["During", "After", "Before"], correct: "During" }
  ];

  return (
    <div
      style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem', color: 'gray.700' }}>
          Practice Makes Perfect: Fill in the Prepositional Phrases
      </h2>

      <div style={{ textAlign: 'left' }}>
        {questions.map((question, index) => (
          <div key={index} style={{ 
            margin: '1rem 0', 
            padding: '1rem', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            border: '1px solid gray.200'
          }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              <strong>{index + 1}.</strong> {question.sentence}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {question.options.map((option, optIndex) => (
                <button
                  key={optIndex}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'gray.100',
                    border: '1px solid gray.200',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    if (option === question.correct) {
                      e.target.style.backgroundColor = 'green.100';
                      e.target.style.color = 'green.800';
                      e.target.textContent = option + ' ✓';
                    } else {
                      e.target.style.backgroundColor = 'red.100';
                      e.target.style.color = 'red.800';
                      e.target.textContent = option + ' ✗';
                    }
                    // Disable all buttons in this question
                    const buttons = e.target.parentNode.querySelectorAll('button');
                    buttons.forEach(btn => btn.disabled = true);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrepositionPhraseFillBlanks;