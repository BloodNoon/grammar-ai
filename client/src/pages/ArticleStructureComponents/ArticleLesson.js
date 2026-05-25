import { Box, Button, Heading, Text } from '@chakra-ui/react';
// This component teaches users about definite and indefinite articles and provides practice questions
import React from 'react';

const ArticleLesson = ({ sentenceFeedback, handleArticleSentenceChoice }) => {
  
  // ===== EDUCATIONAL DATA SECTION =====
  // Article rules for the educational table
  const articleData = [
    { article: '"a"', whenToUse: 'Before words starting with consonant sounds', example: 'a cat, a book, a house' },
    { article: '"an"', whenToUse: 'Before words starting with vowel sounds (a, e, i, o, u)', example: 'an apple, an elephant, an umbrella' },
    { article: '"the"', whenToUse: 'For specific things both speaker and listener know', example: 'the sun, the door, the book on the table' }
  ];

  // Practice sentence options for multiple choice - tests article understanding
  const practiceOptions = {
    1: [
      { text: 'You cleaned a room.', isCorrect: false }, // Incorrect: not specific
      { text: 'You cleaned the room.', isCorrect: true }, // Correct: specific room
      { text: 'You cleaned an room.', isCorrect: false }, // Incorrect: 'an' before consonant
      { text: 'You cleaned room.', isCorrect: false } // Incorrect: missing article
    ],
    2: [
      { text: 'A cat drank the bowl of milk.', isCorrect: false }, // Incorrect: indefinite article for cat
      { text: 'The cat drank a bowl of milk.', isCorrect: true }, // Correct: specific cat, indefinite bowl
      { text: 'An cat drank a bowl of milk.', isCorrect: false }, // Incorrect: 'an' before consonant
      { text: 'Cat drank bowl of milk.', isCorrect: false } // Incorrect: missing articles
    ]
  };

  return (
    // Main container for the article lesson section
    <Box style={{ 
      border: '2px solid black',    // Black border around entire lesson for visual separation
      padding: '25px',              // Internal spacing for readability
      marginBottom: '20px',         // Space below lesson section
      textAlign: 'left'             // Left-align text for better readability of educational content
    }}>
      {/* ===== LESSON TITLE AND INTRODUCTION ===== */}
      <h1>Understanding Definite and Indefinite Articles</h1>
      
      {/* Introduction paragraphs explaining articles */}
      <Text>
        <b>Articles are a part of speech that help us identify words in a sentence.</b>
      </Text>
      <Text>
        <b>There are three articles in the English language:</b>
      </Text>

      <h1>Articles in a Sentence</h1>
      <Text><strong>Articles: a, an, the</strong></Text>

      {/* ===== EXAMPLES SECTION ===== */}
      <Box style={{ 
        backgroundColor: '#f9f9f9',   // Light gray background to separate examples
        padding: '15px',              // Internal spacing
        marginBottom: '20px',         // Space below examples
        borderRadius: '6px',          // Rounded corners for modern appearance
        border: '1px solid gray.200'      // Light border for visual separation
      }}>
        <Box style={{ 
          marginBottom: '10px',       // Space between examples
          fontSize: '16px'            // Standard readable font size
        }}>
          <strong>Example 1:</strong> You cleaned + article + noun<br />
          <strong>Example 1:</strong> You cleaned the room.
        </Box>
        <Box style={{ 
          marginBottom: '10px',       // Space after second example
          fontSize: '16px'            // Standard readable font size
        }}>
          <strong>Example 2:</strong> Article + noun + verb + article + noun<br />
          <strong>Example 2:</strong> The cat drank a bowl of milk.
        </Box>
      </Box>

      {/* ===== ARTICLE RULES TABLE ===== */}
      <Heading as="h3" size="md">Article Rules</Heading>
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
              Article
            </th>
            <th style={{
              border: '1px solid black',
              padding: '10px',
              textAlign: 'left',
              fontWeight: 'bold'
            }}>
              When to Use
            </th>
            <th style={{
              border: '1px solid black',
              padding: '10px',
              textAlign: 'left',
              fontWeight: 'bold'
            }}>
              Example
            </th>
          </tr>
        </thead>
        
        {/* Table Body with article data - maps through all 3 articles */}
        <tbody>
          {articleData.map((row, index) => (
            <tr key={index}>
              <td style={{
                border: '1px solid black',  // Black border for cell separation
                padding: '10px',            // Internal cell spacing
                fontWeight: 'bold'          // Bold article names for easy identification
              }}>
                {row.article}
              </td>
              <td style={{
                border: '1px solid black',
                padding: '10px'
              }}>
                {row.whenToUse}
              </td>
              <td style={{
                border: '1px solid black',
                padding: '10px',
                fontStyle: 'italic'         // Italic for examples to distinguish from other content
              }}>
                {row.example}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== PRACTICE SECTION ===== */}
      <h1>Learn your new sentence structures:</h1>
      <Text><strong>Article + Noun + Verb + Article + Noun</strong></Text>
      <Text style={{ marginBottom: '15px' }}>
        Choose the sentence with correct article usage
      </Text>

      {/* ===== INTERACTIVE PRACTICE QUESTIONS ===== */}
      {/* Maps through each practice question to create interactive multiple choice */}
      {Object.keys(practiceOptions).map((questionNum) => (
        <Box key={questionNum} style={{
          backgroundColor: '#f9f9f9',   // Light gray background to separate question blocks
          padding: '15px',              // Internal spacing for comfortable reading
          marginBottom: '20px',         // Space between different questions
          borderRadius: '8px',          // Rounded corners for modern appearance
          border: '1px solid gray.200'      // Light border for visual separation
        }}>
          <Heading as="h4" size="sm">Question {questionNum}: Choose the correct sentence</Heading>
          
          {/* Display answer options as interactive buttons */}
          <Box style={{ marginBottom: '15px' }}>
            {practiceOptions[questionNum].map((option, optionIndex) => (
              <Box key={optionIndex} style={{ marginBottom: '8px' }}>
                <Button
                  // Handle click to check if selected option is correct
                  onClick={() => handleArticleSentenceChoice(questionNum, option.text, option.isCorrect)}
                  style={{
                    backgroundColor: '#f0f0f0',   // Light gray background for buttons
                    border: '2px solid gray.300',     // Gray border for button definition
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
                    e.target.style.borderColor = 'gray.400';       // Darker border on hover
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#f0f0f0'; // Return to original color
                    e.target.style.borderColor = 'gray.300';       // Return to original border
                  }}
                >
                  {/* Display option letter (A, B, C, D) and the sentence text */}
                  {String.fromCharCode(65 + optionIndex)}. {option.text}
                </Button>
              </Box>
            ))}
          </Box>

          {/* Display feedback if user has made a choice for this question */}
          {sentenceFeedback[questionNum] && (
            <Box style={{
              color: sentenceFeedback[questionNum].color,     // Text color based on correctness (green/red)
              marginTop: '10px',                              // Space above feedback message
              fontWeight: 'bold',                             // Bold text for emphasis
              fontSize: '16px',                               // Larger font for visibility
              padding: '10px',                                // Internal padding for readability
              border: `2px solid ${sentenceFeedback[questionNum].color}`, // Border matching text color
              borderRadius: '6px',                            // Rounded corners for feedback box
              // Background color based on correctness - light green for correct, light red for incorrect
              backgroundColor: sentenceFeedback[questionNum].color === 'green' ? 'green.50' : 'red.50'
            }}>
              {sentenceFeedback[questionNum].text}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ArticleLesson;
