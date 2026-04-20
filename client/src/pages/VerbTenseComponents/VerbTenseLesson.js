// This component teaches users about verb tenses, auxiliary verbs, and provides practice questions
import React from 'react';

const VerbTenseLesson = ({ sentenceFeedback, handleVerbSentenceChoice }) => {
  
  // ===== EDUCATIONAL DATA SECTION =====
  // Comprehensive tense data for the educational table showing all 9 major tenses
  const tenseData = [
    { tense: 'Present Simple', exampleVerb: 'walks', sampleSentence: 'She walks the dog.' },
    { tense: 'Past Simple', exampleVerb: 'walked', sampleSentence: 'She walked the dog.' },
    { tense: 'Future Simple', exampleVerb: 'will walk', sampleSentence: 'She will walk the dog.' },
    { tense: 'Present Continuous', exampleVerb: 'is walking', sampleSentence: 'She is walking the dog.' },
    { tense: 'Past Continuous', exampleVerb: 'was walking', sampleSentence: 'She was walking the dog.' },
    { tense: 'Future Continuous', exampleVerb: 'will be walking', sampleSentence: 'She will be walking the dog.' },
    { tense: 'Present Perfect', exampleVerb: 'has walked', sampleSentence: 'She has walked the dog.' },
    { tense: 'Past Perfect', exampleVerb: 'had walked', sampleSentence: 'She had walked the dog.' },
    { tense: 'Future Perfect', exampleVerb: 'will have walked', sampleSentence: 'She will have walked the dog.' }
  ];

  // Examples of auxiliary verbs with different tenses for student reference
  const auxiliaryExamples = [
    { sentence: 'She is cooking dinner.', tense: '(Present Continuous)' },
    { sentence: 'They have finished their work.', tense: '(Present Perfect)' },
    { sentence: 'He will be singing at the concert.', tense: '(Future Continuous)' }
  ];

  // Practice sentence options for multiple choice - tests verb tense understanding
  const practiceOptions = {
    1: [
      { text: 'Dogs chases cats.', isCorrect: false }, // Incorrect: subject-verb disagreement
      { text: 'Dogs will chase cats.', isCorrect: true }, // Correct: future tense with auxiliary
      { text: 'Dogs will chasing cats.', isCorrect: false }, // Incorrect: wrong verb form after auxiliary
      { text: 'Dogs will chased cats.', isCorrect: false } // Incorrect: past tense after future auxiliary
    ],
    2: [
      { text: 'Bill could catch ice.', isCorrect: true }, // Correct: modal auxiliary with base verb
      { text: 'Bill could catching ice.', isCorrect: false }, // Incorrect: -ing form after modal
      { text: 'Bill could caught ice.', isCorrect: false }, // Incorrect: past tense after modal
      { text: 'Bill could catches ice.', isCorrect: false } // Incorrect: present tense -s after modal
    ]
  };

  return (
    // Main container for the verb tense lesson section
    <div style={{ 
      border: '2px solid black',    // Black border around entire lesson for visual separation
      padding: '20px',              // Internal spacing for readability
      marginBottom: '20px',         // Space below lesson section
      textAlign: 'left'             // Left-align text for better readability of educational content
    }}>
      {/* ===== LESSON TITLE AND INTRODUCTION ===== */}
      <h2>Understanding Verb Tense and Auxiliary Verbs</h2>
      
      {/* Introduction paragraph explaining the purpose of verbs and tenses */}
      <p>
        Verbs tell us the action in a sentence. The form of the verb tells us when the action happens 
        (called tense) and sometimes uses a helper word (auxiliary verb) to express time or mood more clearly.
      </p>

      {/* ===== TENSE TABLE SECTION ===== */}
      <h3>Tense</h3>
      <table style={{
        width: '100%',                // Full width table for better readability
        borderCollapse: 'collapse',   // Remove spacing between cells for clean appearance
        marginBottom: '20px'          // Space below table before next section
      }}>
        {/* Table Header Row */}
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}> {/* Light gray header background for distinction */}
            <th style={{
              border: '1px solid black',  // Black border for clear cell separation
              padding: '10px',            // Internal cell spacing for readability
              textAlign: 'left',          // Left-align header text
              fontWeight: 'bold'          // Bold header text for emphasis
            }}>
              Tense
            </th>
            <th style={{
              border: '1px solid black',
              padding: '10px',
              textAlign: 'left',
              fontWeight: 'bold'
            }}>
              Example Verb
            </th>
            <th style={{
              border: '1px solid black',
              padding: '10px',
              textAlign: 'left',
              fontWeight: 'bold'
            }}>
              Sample Sentence
            </th>
          </tr>
        </thead>
        {/* Table Body with tense data - maps through all 9 tenses */}
        <tbody>
          {tenseData.map((row, index) => (
            <tr key={index}>
              <td style={{
                border: '1px solid black',  // Black border for cell separation
                padding: '10px',            // Internal cell spacing
                fontWeight: 'bold'          // Bold tense names for easy identification
              }}>
                {row.tense}
              </td>
              <td style={{
                border: '1px solid black',
                padding: '10px',
                fontStyle: 'italic'         // Italic for verb examples to distinguish from other content
              }}>
                {row.exampleVerb}
              </td>
              <td style={{
                border: '1px solid black',
                padding: '10px'
              }}>
                {row.sampleSentence}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== AUXILIARY VERB EXAMPLES SECTION ===== */}
      <h3>Auxiliary + Base Verb Examples</h3>
      <div style={{ marginBottom: '20px' }}>
        {/* Display each auxiliary verb example with its tense label */}
        {auxiliaryExamples.map((example, index) => (
          <p key={index} style={{ 
            marginBottom: '10px',       // Space between examples for readability
            fontSize: '16px'            // Standard text size for examples
          }}>
            <strong>{example.sentence}</strong> {example.tense}
          </p>
        ))}
      </div>

      {/* ===== PRACTICE SECTION ===== */}
      <h3>Learn your new sentence Structures:</h3>
      <p><strong>Subject Noun + Verb (in the correct tense) + Object Noun</strong></p>
      <p style={{ marginBottom: '15px' }}>
        Try to include an auxiliary verb if the sentence requires one
      </p>

      {/* ===== INTERACTIVE PRACTICE QUESTIONS ===== */}
      {/* Maps through each practice question to create interactive multiple choice */}
      {Object.keys(practiceOptions).map((questionNum) => (
        <div key={questionNum} style={{
          backgroundColor: '#f9f9f9',   // Light gray background to separate question blocks
          padding: '15px',              // Internal spacing for comfortable reading
          marginBottom: '20px',         // Space between different questions
          borderRadius: '8px',          // Rounded corners for modern appearance
          border: '1px solid #ddd'      // Light border for visual separation
        }}>
          <h4>Question {questionNum}: Choose the correct sentence</h4>
          
          {/* Display answer options as interactive buttons */}
          <div style={{ marginBottom: '15px' }}>
            {practiceOptions[questionNum].map((option, optionIndex) => (
              <div key={optionIndex} style={{ marginBottom: '8px' }}>
                <button
                  // Handle click to check if selected option is correct
                  onClick={() => handleVerbSentenceChoice(questionNum, option.text, option.isCorrect)}
                  style={{
                    backgroundColor: '#f0f0f0',   // Light gray background for buttons
                    border: '2px solid #ccc',     // Gray border for button definition
                    padding: '10px 15px',         // Internal button spacing
                    margin: '5px',                // Space between option buttons
                    cursor: 'pointer',            // Show clickable cursor on hover
                    borderRadius: '6px',          // Rounded corners for buttons
                    fontSize: '14px',             // Standard readable text size
                    textAlign: 'left',            // Left-align text within buttons
                    minWidth: '200px',            // Minimum width for consistent button sizing
                    display: 'block',             // Stack buttons vertically for better readability
                    marginBottom: '5px'           // Space between stacked buttons
                  }}
                  // Add hover effects for better user interaction feedback
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#e0e0e0'; // Darker gray on hover
                    e.target.style.borderColor = '#999';       // Darker border on hover
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f0f0f0'; // Return to original color
                    e.target.style.borderColor = '#ccc';       // Return to original border
                  }}
                >
                  {/* Display option letter (A, B, C, D) and the sentence text */}
                  {String.fromCharCode(65 + optionIndex)}. {option.text}
                </button>
              </div>
            ))}
          </div>

          {/* Display feedback if user has made a choice for this question */}
          {sentenceFeedback[questionNum] && (
            <div style={{
              color: sentenceFeedback[questionNum].color,     // Text color based on correctness (green/red)
              marginTop: '10px',                              // Space above feedback message
              fontWeight: 'bold',                             // Bold text for emphasis
              fontSize: '16px',                               // Larger font for visibility
              padding: '10px',                                // Internal padding for readability
              border: `2px solid ${sentenceFeedback[questionNum].color}`, // Border matching text color
              borderRadius: '6px',                            // Rounded corners for feedback box
              // Background color based on correctness - light green for correct, light red for incorrect
              backgroundColor: sentenceFeedback[questionNum].color === 'green' ? '#e8f5e8' : '#ffebee'
            }}>
              {sentenceFeedback[questionNum].text}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VerbTenseLesson;