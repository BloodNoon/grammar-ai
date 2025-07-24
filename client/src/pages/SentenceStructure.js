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
  
  // Practice sentence feedback states
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
      <li key={num} style={{ marginBottom: '15px', lineHeight: '2' }}>
        {words.map((word, index) => (
          <span key={index}>
            <button
              onClick={() => handleWordClick(num, word.replace(/[.,!?]/, ''))}
              style={{
                backgroundColor: '#f0f0f0',
                border: '2px solid #ccc',
                padding: '4px 8px',
                margin: '2px',
                cursor: 'pointer',
                borderRadius: '4px',
                fontSize: '14px'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#e0e0e0';
                e.target.style.borderColor = '#999';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.borderColor = '#ccc';
              }}
            >
              {word}
            </button>
            {index < words.length - 1 ? ' ' : ''}
          </span>
        ))}
        {sentenceFeedback[num] && (
          <div style={{ 
            color: sentenceFeedback[num].color, 
            marginTop: '8px', 
            fontWeight: 'bold',
            fontSize: '16px',
            padding: '5px',
            border: `2px solid ${sentenceFeedback[num].color}`,
            borderRadius: '4px',
            backgroundColor: sentenceFeedback[num].color === 'blue' ? '#e3f2fd' : 
                            sentenceFeedback[num].color === 'orange' ? '#fff3e0' : '#ffebee'
          }}>
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

        <h3>Practice - Identify the Subject and Object</h3>
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
        <button 
          onClick={() => setShowProgress(!showProgress)}
          style={{
            backgroundColor: '#f0f0f0',
            border: '2px solid #ccc',
            padding: '6px 12px',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '12px'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#e0e0e0';
            e.target.style.borderColor = '#999';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#f0f0f0';
            e.target.style.borderColor = '#ccc';
          }}
        >
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

        <button 
          onClick={resetProgress}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            border: '2px solid #d32f2f',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#d32f2f';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#f44336';
          }}
        >
          Reset Progress
        </button>
      </div>

      {/* Completion Message */}
      {isCompleted && (
        <div>
          <h2>CONGRATULATIONS!</h2>
          <p>You've successfully completed 10 correct sentences!</p>
          <p>Final Stats: {correctCount} correct out of {totalAttempts} attempts ({Math.round((correctCount / totalAttempts) * 100)}% accuracy)</p>
          <button 
            onClick={resetProgress}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: '2px solid #45a049',
              padding: '12px 24px',
              cursor: 'pointer',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#45a049';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#4CAF50';
            }}
          >
            Start New Challenge
          </button>
        </div>
      )}

      {/* Level Selection */}
      <div>
        <h3>Choose Difficulty Level:</h3>
        {['beginner', 'intermediate', 'advanced'].map(level => (
          <button
            key={level}
            onClick={() => setCurrentLevel(level)}
            style={{
              backgroundColor: currentLevel === level ? '#4CAF50' : '#f0f0f0',
              color: currentLevel === level ? 'white' : 'black',
              border: '2px solid #ccc',
              padding: '8px 16px',
              margin: '4px',
              cursor: 'pointer',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: currentLevel === level ? 'bold' : 'normal'
            }}
            onMouseOver={(e) => {
              if (currentLevel !== level) {
                e.target.style.backgroundColor = '#e0e0e0';
                e.target.style.borderColor = '#999';
              }
            }}
            onMouseOut={(e) => {
              if (currentLevel !== level) {
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.borderColor = '#ccc';
              }
            }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Structure Selection */}
      <div>
        <h3>Choose a Structure to Practice (Optional)</h3>
        
        {structureExamples.filter(s => s.level === currentLevel || currentLevel === 'advanced').map((structure, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
            <div>
              <strong>{structure.description}</strong>
            </div>
            <div>Pattern: {structure.pattern}</div>
            <div>Example: "{structure.example}"</div>
            <button 
              onClick={() => selectStructure(structure)}
              style={{
                backgroundColor: selectedStructure === structure.pattern ? '#2196F3' : '#f0f0f0',
                color: selectedStructure === structure.pattern ? 'white' : 'black',
                border: '2px solid #ccc',
                padding: '6px 12px',
                margin: '5px 0',
                cursor: 'pointer',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: selectedStructure === structure.pattern ? 'bold' : 'normal'
              }}
              onMouseOver={(e) => {
                if (selectedStructure !== structure.pattern) {
                  e.target.style.backgroundColor = '#e0e0e0';
                  e.target.style.borderColor = '#999';
                }
              }}
              onMouseOut={(e) => {
                if (selectedStructure !== structure.pattern) {
                  e.target.style.backgroundColor = '#f0f0f0';
                  e.target.style.borderColor = '#ccc';
                }
              }}
            >
              {selectedStructure === structure.pattern ? 'Selected' : 'Practice This'}
            </button>
          </div>
        ))}

        {selectedStructure && (
          <div style={{ border: '2px solid #2196F3', padding: '10px', margin: '10px 0' }}>
            <strong>Target Structure:</strong> {selectedStructure}
            <button 
              onClick={() => setSelectedStructure('')}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                border: '2px solid #d32f2f',
                padding: '4px 8px',
                marginLeft: '10px',
                cursor: 'pointer',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#d32f2f';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f44336';
              }}
            >
              Clear Target
            </button>
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
            <button
              key={word.id}
              draggable
              onDragStart={(e) => handleDragStart(e, word)}
              style={{
                backgroundColor: '#f0f0f0',
                border: '2px solid #ccc',
                padding: '8px 12px',
                margin: '4px',
                cursor: 'grab',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#e0e0e0';
                e.target.style.borderColor = '#999';
                e.target.style.cursor = 'grab';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.borderColor = '#ccc';
              }}
              title={`${word.text} (${word.type})`}
            >
              {word.text}
            </button>
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
                <button
                  style={{
                    backgroundColor: '#e8f5e8',
                    border: '2px solid #4CAF50',
                    padding: '8px 12px',
                    margin: '4px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    position: 'relative'
                  }}
                >
                  {word.text}
                  <button
                    onClick={() => removeFromSentence(index)}
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#d32f2f';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#f44336';
                    }}
                  >
                    ×
                  </button>
                </button>
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
          style={{
            backgroundColor: (sentenceArea.length === 0 || isCompleted) ? '#ccc' : '#4CAF50',
            color: 'white',
            border: '2px solid #45a049',
            padding: '12px 24px',
            margin: '8px',
            cursor: (sentenceArea.length === 0 || isCompleted) ? 'not-allowed' : 'pointer',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => {
            if (!(sentenceArea.length === 0 || isCompleted)) {
              e.target.style.backgroundColor = '#45a049';
            }
          }}
          onMouseOut={(e) => {
            if (!(sentenceArea.length === 0 || isCompleted)) {
              e.target.style.backgroundColor = '#4CAF50';
            }
          }}
        >
          Check Sentence
        </button>
        
        <button
          onClick={resetSentenceOnly}
          disabled={isCompleted}
          style={{
            backgroundColor: isCompleted ? '#ccc' : '#ff9800',
            color: 'white',
            border: '2px solid #f57c00',
            padding: '12px 24px',
            margin: '8px',
            cursor: isCompleted ? 'not-allowed' : 'pointer',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => {
            if (!isCompleted) {
              e.target.style.backgroundColor = '#f57c00';
            }
          }}
          onMouseOut={(e) => {
            if (!isCompleted) {
              e.target.style.backgroundColor = '#ff9800';
            }
          }}
        >
          Reset Sentence
        </button>

        <button
          onClick={generateWordSetFromTestCases}
          disabled={isCompleted}
          style={{
            backgroundColor: isCompleted ? '#ccc' : '#9C27B0',
            color: 'white',
            border: '2px solid #7B1FA2',
            padding: '12px 24px',
            margin: '8px',
            cursor: isCompleted ? 'not-allowed' : 'pointer',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
          onMouseOver={(e) => {
            if (!isCompleted) {
              e.target.style.backgroundColor = '#7B1FA2';
            }
          }}
          onMouseOut={(e) => {
            if (!isCompleted) {
              e.target.style.backgroundColor = '#9C27B0';
            }
          }}
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