// MiniLesson.js - Component that displays educational content about nouns, subjects, and objects
import React from 'react';

const MiniLesson = ({ practiceData, sentenceFeedback, handleWordClick }) => {
  
  // Function to render individual practice sentences with clickable words
  const renderPracticeSentence = (num, sentence) => {
    // Split sentence into individual words for button creation
    const words = sentence.split(' ');
    
    return (
      <li key={num} style={{ 
        marginBottom: '15px',  // Space between practice sentences
        lineHeight: '2'        // Increase line height for better button spacing
      }}>
        {/* Map through each word to create clickable buttons */}
        {words.map((word, index) => (
          <span key={index}>
            <button
              // Handle click by calling parent function with sentence number and cleaned word
              onClick={() => handleWordClick(num, word.replace(/[.,!?]/, ''))}
              style={{
                backgroundColor: '#f0f0f0',  // Light gray background
                border: '2px solid #ccc',    // Gray border
                padding: '4px 8px',          // Internal spacing
                margin: '2px',               // Space between word buttons
                cursor: 'pointer',           // Show clickable cursor
                borderRadius: '4px',         // Rounded corners
                fontSize: '14px'             // Text size
              }}
              // Add hover effects for better interactivity
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#e0e0e0';  // Darker on hover
                e.target.style.borderColor = '#999';        // Darker border on hover
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';  // Return to original color
                e.target.style.borderColor = '#ccc';        // Return to original border
              }}
            >
              {word}
            </button>
            {/* Add space between words except after the last word */}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
        
        {/* Display feedback if user has clicked on any word in this sentence */}
        {sentenceFeedback[num] && (
          <div style={{ 
            color: sentenceFeedback[num].color,         // Text color based on correctness
            marginTop: '8px',                           // Space above feedback
            fontWeight: 'bold',                         // Bold text for emphasis
            fontSize: '16px',                           // Larger font for visibility
            padding: '5px',                             // Internal padding
            border: `2px solid ${sentenceFeedback[num].color}`,  // Border matching text color
            borderRadius: '4px',                        // Rounded corners
            // Background color based on feedback type
            backgroundColor: sentenceFeedback[num].color === 'blue' ? '#e3f2fd' :      // Light blue for subjects
                            sentenceFeedback[num].color === 'orange' ? '#fff3e0' :     // Light orange for objects
                            '#ffebee'  // Light red for incorrect answers
          }}>
            {sentenceFeedback[num].text}
          </div>
        )}
      </li>
    );
  };

  return (
    // Main container for the mini lesson section
    <div style={{ 
      border: '2px solid black',    // Black border around entire lesson
      padding: '20px',              // Internal spacing
      marginBottom: '20px',         // Space below lesson section
      textAlign: 'left'             // Left-align text for better readability
    }}>
      <h2>Mini Lesson: Nouns, Subjects, and Objects</h2>
      
      {/* Section explaining what nouns are */}
      <h3>What is a Noun?</h3>
      <p>A <strong>noun</strong> is a word that names a <strong>person, place, thing, or idea</strong>.</p>
      <p>Examples:</p>
      <ol>
        <li>Person: <strong>teacher</strong>, <strong>Maria</strong></li>
        <li>Place: <strong>school</strong>, <strong>New York</strong></li>
        <li>Thing: <strong>book</strong>, <strong>phone</strong></li>
        <li>Idea: <strong>freedom</strong>, <strong>happiness</strong></li>
      </ol>

      {/* Section explaining what subjects are */}
      <h3>What is a Subject?</h3>
      <p>The <strong>subject</strong> is the <strong>doer</strong> of the action in a sentence. It answers the question:</p>
      <p><strong>Who or what is doing the action?</strong></p>
      
      <h4>Why is there a subject?</h4>
      <p>We need a subject so we know <strong>who or what</strong> the sentence is about.</p>
      <p>Example: <strong>The dog</strong> chased the cat.</p>
      <p>"The dog" is the <strong>subject</strong> because it is doing the chasing.</p>

      {/* Section explaining what objects are */}
      <h3>What is an Object?</h3>
      <p>The <strong>object</strong> receives the action of the verb. It answers the question:</p>
      <p><strong>Who or what is being acted upon?</strong></p>
      
      <h4>Why is there an object?</h4>
      <p>We need an object to complete the meaning of the action in many sentences.</p>
      <p>Example: The dog chased <strong>the cat</strong>.</p>
      <p>"The cat" is the <strong>object</strong> because it is receiving the action (being chased).</p>

      {/* Interactive practice section */}
      <h3>Practice – Identify the Subject and Object</h3>
      <p><strong>Instructions:</strong> For each sentence, identify:</p>
      <ol>
        <li>The <strong>subject</strong> (who or what is doing the action)</li>
        <li>The <strong>object</strong> (who or what is receiving the action)</li>
      </ol>

      <p><strong>Click on words to check if they are subjects or objects:</strong></p>
      
      {/* List of practice sentences with interactive word buttons */}
      <ol>
        {renderPracticeSentence(1, "The boy kicked the ball.")}
        {renderPracticeSentence(2, "Sarah reads a book.")}
        {renderPracticeSentence(3, "The teacher praised the student.")}
        {renderPracticeSentence(4, "A cat caught a mouse.")}
        {renderPracticeSentence(5, "They built a house.")}
        {renderPracticeSentence(6, "The chef cooked a meal.")}
        {renderPracticeSentence(7, "The wind broke the window.")}
        {renderPracticeSentence(8, "My sister painted a picture.")}
        {renderPracticeSentence(9, "The doctor examined the patient.")}
        {renderPracticeSentence(10, "The team won the game.")}
      </ol>
    </div>
  );
};

export default MiniLesson;