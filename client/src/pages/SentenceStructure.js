import React, { useState, useEffect } from 'react';
import { hasFullStructCheck, getFullStructCheck, getTags } from '../utils/SentenceChecker/StructureChecker';
import { testCases } from '../utils/SentenceChecker/TestCases';


function getWordType(word) {
  const subjects = ['i', 'he', 'she', 'it', 'you', 'we', 'they'];
  const objects = ['me', 'him', 'her', 'it', 'your', 'us', 'them'];
  const determiners = ['the', 'a', 'an', 'this', 'that', 'these', 'those'];
  const adjectives = ['big', 'small', 'red', 'blue', 'happy', 'sad', 'quick', 'slow', 'beautiful', 'ugly'];
  const nouns = ['dog', 'cat', 'house', 'car', 'book', 'tree', 'ball', 'bird', 'fish', 'apple'];
  const verbs = ['run', 'jump', 'eat', 'sleep', 'play', 'sing', 'dance', 'walk', 'fly', 'swim'];
  
  const lowerWord = word.toLowerCase().replace(/[.,!?]/, '');
  
  if (subjects.includes(lowerWord)) return 'Subject';
  if (objects.includes(lowerWord)) return 'Object';
  if (determiners.includes(lowerWord)) return 'Determiner';
  if (adjectives.includes(lowerWord)) return 'Adjective';
  if (nouns.includes(lowerWord)) return 'Noun';
  if (verbs.includes(lowerWord)) return 'Verb';
  return 'Unknown';
}

const DragDropSentenceChecker = () => {
  const [availableWords, setAvailableWords] = useState([]);
  const [sentenceArea, setSentenceArea] = useState([]);
  const [selectedStructure, setSelectedStructure] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [draggedWord, setDraggedWord] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [currentLevel, setCurrentLevel] = useState('beginner');
  
  // Progress tracking states
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [showProgress, setShowProgress] = useState(true);
  
  // Practice sentences for the top section Mini Lesson
  const [sentenceFeedback, setSentenceFeedback] = useState({});
  
  const TARGET_CORRECT = 10;

  // Define subjects and objects for practice sentences
  const practiceData = {
    1: { subject: 'boy', object: 'ball' },
    2: { subject: 'Sarah', object: 'book' },
    3: { subject: 'teacher', object: 'student' },
    4: { subject: 'cat', object: 'mouse' },
    5: { subject: 'They', object: 'house' },
    6: { subject: 'chef', object: 'meal' },
    7: { subject: 'wind', object: 'window' },
    8: { subject: 'sister', object: 'picture' },
    9: { subject: 'doctor', object: 'patient' },
    10: { subject: 'team', object: 'game' }
  };

  const handleWordClick = (sentenceNum, word) => {
    const data = practiceData[sentenceNum];
    let feedbackText = '';
    let color = '';

    if (word === data.subject) {
      feedbackText = 'Correct - Subject!';
      color = 'blue';
    } else if (word === data.object) {
      feedbackText = 'Correct - Object!';
      color = 'orange';
    } else {
      feedbackText = 'Incorrect';
      color = 'red';
    }

    setSentenceFeedback(prev => ({
      ...prev,
      [sentenceNum]: { text: feedbackText, color: color }
    }));
  };

  const renderPracticeSentence = (num, sentence) => {
    const words = sentence.split(' ');
    return (
      <li key={num}>
        {words.map((word, index) => (
          <span key={index}>
            <span
              onClick={() => handleWordClick(num, word.replace(/[.,!?]/, ''))}
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                marginRight: '4px'
              }}
            >
              {word}
            </span>
            {index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
        {sentenceFeedback[num] && (
          <div style={{ color: sentenceFeedback[num].color, marginTop: '5px', fontWeight: 'bold' }}>
            {sentenceFeedback[num].text}
          </div>
        )}
      </li>
    );
  };

  const structureExamples = [
    { 
      pattern: '#Subject #Verb', 
      example: 'I run.', 
      description: 'Simple subject-verb',
      level: 'beginner'
    },
    { 
      pattern: '#Determiner #Noun #Verb', 
      example: 'The dog barks.', 
      description: 'Article-noun-verb',
      level: 'beginner'
    },
    { 
      pattern: '#Determiner #Adjective #Noun #Verb', 
      example: 'The big dog barks.', 
      description: 'Article-adjective-noun-verb',
      level: 'intermediate'
    },
    { 
      pattern: '#Subject (and|or) #Subject #Verb', 
      example: 'He and I run.', 
      description: 'Compound subjects',
      level: 'intermediate'
    },
    { 
      pattern: '#Subject #Verb #Object', 
      example: 'I see him.', 
      description: 'Subject-verb-object',
      level: 'advanced'
    }
  ];

  const wordBank = {
    Subject: ['I', 'He', 'She', 'It', 'You', 'We', 'They'],
    Object: ['me', 'him', 'her', 'it', 'you', 'us', 'them'],
    Determiner: ['The', 'A', 'An', 'This', 'That'],
    Adjective: ['big', 'small', 'red', 'blue', 'happy', 'sad', 'quick', 'beautiful'],
    Noun: ['dog', 'cat', 'house', 'car', 'book', 'tree', 'ball', 'bird', 'fish', 'apple'],
    Verb: ['run', 'runs', 'jump', 'jumps', 'eat', 'eats', 'sleep', 'sleeps', 'play', 'plays'],
    Conjunction: ['and', 'or']
  };

  useEffect(() => {
    generateWordSetFromTestCases();
  }, [currentLevel, selectedStructure]);

  const generateWordSetFromTestCases = () => {
    let words = [];
    
    // Extract words from test cases for more realistic word sets
    const wordsFromTestCases = testCases.flatMap(tc => 
      tc.sentence.split(' ').map(word => word.replace(/[.,!?]/, ''))
    );
    
    if (selectedStructure) {
      // Generate words specifically for the selected structure
      const structure = selectedStructure;
      if (structure.includes('#Subject')) {
        words.push(...wordBank.Subject.slice(0, 3));
      }
      if (structure.includes('#Object')) {
        words.push(...wordBank.Object.slice(0, 3));
      }
      if (structure.includes('#Determiner')) {
        words.push(...wordBank.Determiner.slice(0, 3));
      }
      if (structure.includes('#Adjective')) {
        words.push(...wordBank.Adjective.slice(0, 4));
      }
      if (structure.includes('#Noun')) {
        words.push(...wordBank.Noun.slice(0, 4));
      }
      if (structure.includes('#Verb')) {
        words.push(...wordBank.Verb.slice(0, 4));
      }
      if (structure.includes('(and|or)')) {
        words.push(...wordBank.Conjunction);
      }
    } else {
      // Generate a general mix based on level
      const counts = {
        beginner: { Subject: 3, Determiner: 2, Noun: 3, Verb: 3 },
        intermediate: { Subject: 3, Determiner: 3, Adjective: 3, Noun: 4, Verb: 4, Conjunction: 2 },
        advanced: { Subject: 3, Object: 3, Determiner: 3, Adjective: 4, Noun: 4, Verb: 4, Conjunction: 2 }
      };
      
      const levelCounts = counts[currentLevel];
      Object.keys(levelCounts).forEach(type => {
        if (wordBank[type]) {
          words.push(...wordBank[type].slice(0, levelCounts[type]));
        }
      });
    }

    // Add some words from test cases for realism
    const testCaseWords = wordsFromTestCases.slice(0, 5);
    words.push(...testCaseWords);
    
    // Mix with existing word bank and shuffle
    const combinedWords = [...new Set([...words, ...Object.values(wordBank).flat().slice(0, 10)])];
    
    setAvailableWords(shuffleArray(combinedWords).map((word, index) => ({
      id: `word-${index}`,
      text: word,
      type: getWordType(word)
    })));
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleDragStart = (e, word) => {
    setDraggedWord(word);
    e.dataTransfer.setData('text/plain', JSON.stringify(word));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex = null) => {
    e.preventDefault();
    
    if (!draggedWord) return;

    const newSentenceArea = [...sentenceArea];
    
    if (targetIndex !== null) {
      newSentenceArea.splice(targetIndex, 0, draggedWord);
    } else {
      newSentenceArea.push(draggedWord);
    }
    
    setSentenceArea(newSentenceArea);
    setAvailableWords(prev => prev.filter(w => w.id !== draggedWord.id));
    setDraggedWord(null);
  };

  const removeFromSentence = (wordIndex) => {
    const word = sentenceArea[wordIndex];
    const newSentenceArea = sentenceArea.filter((_, index) => index !== wordIndex);
    setSentenceArea(newSentenceArea);
    setAvailableWords(prev => [...prev, word]);
  };

  const checkSentence = () => {
    if (sentenceArea.length === 0) {
      setFeedback('Please build a sentence first!');
      setIsValid(false);
      return;
    }

    const sentence = sentenceArea.map(w => w.text).join(' ');
    
    try {
      const matchedStructure = getFullStructCheck(sentence);
      const isStructureValid = selectedStructure ? 
        hasFullStructCheck(sentence, selectedStructure) : 
        hasFullStructCheck(sentence);

      const newTotalAttempts = totalAttempts + 1;
      setTotalAttempts(newTotalAttempts);
      
      let feedbackText = '';
      
      if (selectedStructure) {
        if (isStructureValid) {
          const newCorrectCount = correctCount + 1;
          const newStreak = streak + 1;
          
          setCorrectCount(newCorrectCount);
          setStreak(newStreak);
          
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: selectedStructure,
            correct: true,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          if (newCorrectCount >= TARGET_CORRECT) {
            setIsCompleted(true);
            feedbackText = `CONGRATULATIONS! You've successfully completed 10 correct sentences!\nFinal sentence: "${sentence}" matches the target structure: "${selectedStructure}"`;
          } else {
            feedbackText = `Excellent! Your sentence "${sentence}" matches the target structure: "${selectedStructure}"\nProgress: ${newCorrectCount}/${TARGET_CORRECT} correct (${TARGET_CORRECT - newCorrectCount} more to go!)`;
          }
        } else {
          setStreak(0);
          
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: selectedStructure,
            correct: false,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          feedbackText = `Your sentence "${sentence}" doesn't match the target structure "${selectedStructure}".`;
          if (matchedStructure) {
            feedbackText += ` It follows: "${matchedStructure}" instead.`;
          }
          feedbackText += `\nTry again! Progress: ${correctCount}/${TARGET_CORRECT} correct`;
        }
      } else {
        if (isStructureValid) {
          const newCorrectCount = correctCount + 1;
          const newStreak = streak + 1;
          
          setCorrectCount(newCorrectCount);
          setStreak(newStreak);
          
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: matchedStructure,
            correct: true,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          if (newCorrectCount >= TARGET_CORRECT) {
            setIsCompleted(true);
            feedbackText = `CONGRATULATIONS! You've successfully completed 10 correct sentences!\nFinal sentence: "${sentence}" follows a valid structure: "${matchedStructure}"`;
          } else {
            feedbackText = `Great! Your sentence "${sentence}" follows a valid structure: "${matchedStructure}"\nProgress: ${newCorrectCount}/${TARGET_CORRECT} correct (${TARGET_CORRECT - newCorrectCount} more to go!)`;
          }
        } else {
          setStreak(0);
          
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: 'Invalid',
            correct: false,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          feedbackText = `Your sentence "${sentence}" might need some adjustments to follow proper grammar structure.\nTry again! Progress: ${correctCount}/${TARGET_CORRECT} correct`;
        }
      }

      setFeedback(feedbackText);
      setIsValid(isStructureValid);
      
      if (isStructureValid && !isCompleted && correctCount + 1 < TARGET_CORRECT) {
        setTimeout(() => {
          resetSentenceOnly();
        }, 2000);
      }
      
    } catch (error) {
      setTotalAttempts(totalAttempts + 1);
      setFeedback('Error checking sentence. Please try again.');
      setIsValid(false);
    }
  };

  const resetSentence = () => {
    const allWords = [...availableWords, ...sentenceArea];
    setAvailableWords(allWords);
    setSentenceArea([]);
    setFeedback('');
    setIsValid(null);
  };

  const resetSentenceOnly = () => {
    const allWords = [...availableWords, ...sentenceArea];
    setAvailableWords(allWords);
    setSentenceArea([]);
    setFeedback('');
    setIsValid(null);
    generateWordSetFromTestCases();
  };

  const resetProgress = () => {
    setCorrectCount(0);
    setTotalAttempts(0);
    setStreak(0);
    setIsCompleted(false);
    setSessionHistory([]);
    resetSentence();
  };

  const selectStructure = (structure) => {
    setSelectedStructure(structure.pattern);
    resetSentence();
  };

  return (
    <div>
      <h1>Sentence Builder</h1>

      {/* Mini Lesson Section */}
      <div style={{ border: '2px solid black', padding: '20px', marginBottom: '20px' }}>
        <h2>Mini Lesson: Nouns, Subjects, and Objects</h2>
        
        <h3>What is a Noun?</h3>
        <p>A <strong>noun</strong> is a word that names a <strong>person, place, thing, or idea</strong>.</p>
        <p>Examples:</p>
        <ol>
          <li>Person: <strong>teacher</strong>, <strong>Maria</strong></li>
          <li>Place: <strong>school</strong>, <strong>New York</strong></li>
          <li>Thing: <strong>book</strong>, <strong>phone</strong></li>
          <li>Idea: <strong>freedom</strong>, <strong>happiness</strong></li>
        </ol>

        <h3>What is a Subject?</h3>
        <p>The <strong>subject</strong> is the <strong>doer</strong> of the action in a sentence. It answers the question:</p>
        <p><strong>Who or what is doing the action?</strong></p>
        
        <h4>Why is there a subject?</h4>
        <p>We need a subject so we know <strong>who or what</strong> the sentence is about.</p>
        <p>Example: <strong>The dog</strong> chased the cat.</p>
        <p>"The dog" is the <strong>subject</strong> because it is doing the chasing.</p>

        <h3>What is an Object?</h3>
        <p>The <strong>object</strong> receives the action of the verb. It answers the question:</p>
        <p><strong>Who or what is being acted upon?</strong></p>
        
        <h4>Why is there an object?</h4>
        <p>We need an object to complete the meaning of the action in many sentences.</p>
        <p>Example: The dog chased <strong>the cat</strong>.</p>
        <p>"The cat" is the <strong>object</strong> because it is receiving the action (being chased).</p>

        <h3>Practice – Identify the Subject and Object</h3>
        <p><strong>Instructions:</strong> For each sentence, identify:</p>
        <ol>
          <li>The <strong>subject</strong> (who or what is doing the action)</li>
          <li>The <strong>object</strong> (who or what is receiving the action)</li>
        </ol>

        <p><strong>Click on words to check if they are subjects or objects:</strong></p>
        
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

      {/* Progress Tracker */}
      <div>
        <h3>{isCompleted ? 'Challenge Completed!' : 'Progress Tracker'}</h3>
        <button onClick={() => setShowProgress(!showProgress)}>
          {showProgress ? 'Hide Details' : 'Show Details'}
        </button>

        <div>
          Progress: {correctCount}/{TARGET_CORRECT} ({Math.round((correctCount / TARGET_CORRECT) * 100)}%)
        </div>

        <div>
          <div>Correct: {correctCount}</div>
          <div>Incorrect: {totalAttempts - correctCount}</div>
          <div>Current Streak: {streak}</div>
          <div>Accuracy: {totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0}%</div>
        </div>

        {showProgress && sessionHistory.length > 0 && (
          <div>
            <h4>Recent Attempts:</h4>
            {sessionHistory.slice(-5).reverse().map((entry, index) => (
              <div key={index}>
                "{entry.sentence}" → {entry.structure} - {entry.timestamp} - {entry.correct ? 'Correct' : 'Incorrect'}
              </div>
            ))}
          </div>
        )}

        <button onClick={resetProgress}>Reset Progress</button>
      </div>

      {/* Completion Message */}
      {isCompleted && (
        <div>
          <h2>CONGRATULATIONS!</h2>
          <p>You've successfully completed 10 correct sentences!</p>
          <p>Final Stats: {correctCount} correct out of {totalAttempts} attempts ({Math.round((correctCount / totalAttempts) * 100)}% accuracy)</p>
          <button onClick={resetProgress}>Start New Challenge</button>
        </div>
      )}

      {/* Level Selection */}
      <div>
        <h3>Choose Difficulty Level:</h3>
        {['beginner', 'intermediate', 'advanced'].map(level => (
          <button
            key={level}
            onClick={() => setCurrentLevel(level)}
            disabled={currentLevel === level}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Structure Selection */}
      <div>
        <h3>Choose a Structure to Practice (Optional)</h3>
        
        {structureExamples.filter(s => s.level === currentLevel || currentLevel === 'advanced').map((structure, index) => (
          <div key={index}>
            <div>
              <strong>{structure.description}</strong>
            </div>
            <div>Pattern: {structure.pattern}</div>
            <div>Example: "{structure.example}"</div>
            <button onClick={() => selectStructure(structure)}>
              {selectedStructure === structure.pattern ? 'Selected' : 'Practice This'}
            </button>
          </div>
        ))}

        {selectedStructure && (
          <div>
            <strong>Target Structure:</strong> {selectedStructure}
            <button onClick={() => setSelectedStructure('')}>Clear Target</button>
          </div>
        )}
      </div>

      {/* Word Bank */}
      <div>
        <h3>Word Bank - Drag words to build your sentence</h3>
        
        <div 
          style={{ 
            border: '1px solid black', 
            padding: '10px',
            minHeight: '100px'
          }}
        >
          {availableWords.map((word) => (
            <span
              key={word.id}
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
              style={{
                border: '1px solid gray',
                padding: '5px',
                margin: '2px',
                display: 'inline-block',
                cursor: 'grab'
              }}
              title={`${word.text} (${word.type})`}
            >
              {word.text}
            </span>
          ))}
        </div>
      </div>

      {/* Sentence Building Area */}
      <div>
        <h3>Build Your Sentence Here</h3>
        
        <div 
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e)}
          style={{
            border: '2px dashed black',
            padding: '20px',
            minHeight: '80px'
          }}
        >
          {sentenceArea.length === 0 ? (
            <div>Drop words here to build your sentence...</div>
          ) : (
            sentenceArea.map((word, index) => (
              <span key={`sentence-${word.id}-${index}`}>
                <span
                  style={{
                    border: '1px solid gray',
                    padding: '5px',
                    margin: '2px',
                    display: 'inline-block'
                  }}
                >
                  {word.text}
                  <button onClick={() => removeFromSentence(index)}>×</button>
                </span>
                {index < sentenceArea.length - 1 && <span> </span>}
              </span>
            ))
          )}
        </div>

        {/* Sentence Preview */}
        {sentenceArea.length > 0 && (
          <div>
            <strong>Your sentence:</strong> "{sentenceArea.map(w => w.text).join(' ')}"
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div>
        <button
          onClick={checkSentence}
          disabled={sentenceArea.length === 0 || isCompleted}
        >
          Check Sentence
        </button>
        
        <button
          onClick={resetSentenceOnly}
          disabled={isCompleted}
        >
          Reset Sentence
        </button>

        <button
          onClick={generateWordSetFromTestCases}
          disabled={isCompleted}
        >
          New Words
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div style={{ border: '1px solid black', padding: '10px' }}>
          {feedback}
        </div>
      )}

      {/* Grammar Legend */}
      <div>
        <h4>Grammar Tag Types:</h4>
        <div>Subject, Object, Determiner, Noun, Verb, Adjective, Preposition</div>
      </div>
    </div>
  );
};

export default DragDropSentenceChecker;