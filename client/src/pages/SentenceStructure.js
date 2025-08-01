// SentenceStructure.js - Main component that orchestrates all sentence building functionality
import React, { useState, useEffect } from 'react';
import { hasFullStructCheck, getFullStructCheck, getTags } from '../utils/SentenceChecker/StructureChecker';
import { testCases } from '../utils/SentenceChecker/TestCases';

// Import all component sections
import MiniLesson from './SentenceStructuresComponents/mini-lesson-component';
import ProgressTracker from './SentenceStructuresComponents/progress-tracker-component';
import CompletionCelebration from './SentenceStructuresComponents/completion-celebration-component';
import LevelSelection from './SentenceStructuresComponents/level-selection-component';
import StructureSelection from './SentenceStructuresComponents/structure-selection-component';
import WordBank from './SentenceStructuresComponents/word-bank-component';
import SentenceBuilder from './SentenceStructuresComponents/sentence-builder-component';
import ActionButtons from './SentenceStructuresComponents/action-buttons-component';
import FeedbackDisplay from './SentenceStructuresComponents/feedback-display-component';
import GrammarLegend from './SentenceStructuresComponents/grammar-legend-component';

// Helper function to determine word type based on predefined categories
function getWordType(word) {
  // Define word categories for grammatical classification
  const subjects = ['i', 'he', 'she', 'it', 'you', 'we', 'they'];
  const objects = ['me', 'him', 'her', 'it', 'your', 'us', 'them'];
  const determiners = ['the', 'a', 'an', 'this', 'that', 'these', 'those'];
  const adjectives = ['big', 'small', 'red', 'blue', 'happy', 'sad', 'quick', 'slow', 'beautiful', 'ugly'];
  const nouns = ['dog', 'cat', 'house', 'car', 'book', 'tree', 'ball', 'bird', 'fish', 'apple'];
  const verbs = ['run', 'jump', 'eat', 'sleep', 'play', 'sing', 'dance', 'walk', 'fly', 'swim'];
  
  // Clean the word by removing punctuation and converting to lowercase
  const lowerWord = word.toLowerCase().replace(/[.,!?]/, '');
  
  // Check which category the word belongs to and return the type
  if (subjects.includes(lowerWord)) return 'Subject';
  if (objects.includes(lowerWord)) return 'Object';
  if (determiners.includes(lowerWord)) return 'Determiner';
  if (adjectives.includes(lowerWord)) return 'Adjective';
  if (nouns.includes(lowerWord)) return 'Noun';
  if (verbs.includes(lowerWord)) return 'Verb';
  return 'Unknown'; // Return 'Unknown' if word doesn't match any category
}

const SentenceStructure = () => {
  // ===== STATE MANAGEMENT =====
  
  // Core sentence building states
  const [availableWords, setAvailableWords] = useState([]); // Words available for dragging
  const [sentenceArea, setSentenceArea] = useState([]); // Words currently in the sentence
  const [selectedStructure, setSelectedStructure] = useState(''); // Currently selected target structure
  const [feedback, setFeedback] = useState(''); // Feedback message for user
  const [isValid, setIsValid] = useState(null); // Whether current sentence is valid
  const [draggedWord, setDraggedWord] = useState(null); // Word currently being dragged
  const [currentLevel, setCurrentLevel] = useState('beginner'); // Current difficulty level
  
  // Progress tracking states
  const [correctCount, setCorrectCount] = useState(0); // Number of correct sentences
  const [totalAttempts, setTotalAttempts] = useState(0); // Total number of attempts
  const [streak, setStreak] = useState(0); // Current streak of correct answers
  const [isCompleted, setIsCompleted] = useState(false); // Whether user completed 10 correct sentences
  const [sessionHistory, setSessionHistory] = useState([]); // History of recent attempts
  const [showProgress, setShowProgress] = useState(true); // Whether to show progress details
  
  // Mini lesson interaction states
  const [sentenceFeedback, setSentenceFeedback] = useState({}); // Feedback for practice sentences
  
  // Constants
  const TARGET_CORRECT = 10; // Number of correct sentences needed to complete

  // ===== SENTENCE STRUCTURE EXAMPLES =====
  // Define different sentence patterns for practice
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

  // ===== WORD BANK DEFINITIONS =====
  // Organized collection of words by grammatical type
  const wordBank = {
    Subject: ['I', 'He', 'She', 'It', 'You', 'We', 'They'],
    Object: ['me', 'him', 'her', 'it', 'you', 'us', 'them'],
    Determiner: ['The', 'A', 'An', 'This', 'That'],
    Adjective: ['big', 'small', 'red', 'blue', 'happy', 'sad', 'quick', 'beautiful'],
    Noun: ['dog', 'cat', 'house', 'car', 'book', 'tree', 'ball', 'bird', 'fish', 'apple'],
    Verb: ['run', 'runs', 'jump', 'jumps', 'eat', 'eats', 'sleep', 'sleeps', 'play', 'plays'],
    Conjunction: ['and', 'or']
  };

  // ===== EFFECTS =====
  // Generate new word set when level or structure changes
  useEffect(() => {
    generateWordSetFromTestCases();
  }, [currentLevel, selectedStructure]);

  // ===== WORD GENERATION FUNCTIONS =====
  
  // Generate word set combining test cases and word bank based on current settings
  const generateWordSetFromTestCases = () => {
    let words = [];
    
    // Extract realistic words from test cases for more authentic vocabulary
    const wordsFromTestCases = testCases.flatMap(tc => 
      tc.sentence.split(' ').map(word => word.replace(/[.,!?]/, ''))
    );
    
    if (selectedStructure) {
      // If a specific structure is selected, generate words that fit that pattern
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
      // Generate words based on difficulty level if no specific structure selected
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
    
    // Combine and shuffle words, removing duplicates
    const combinedWords = [...new Set([...words, ...Object.values(wordBank).flat().slice(0, 10)])];
    
    // Create word objects with unique IDs and type classification
    setAvailableWords(shuffleArray(combinedWords).map((word, index) => ({
      id: `word-${index}`,
      text: word,
      type: getWordType(word)
    })));
  };

  // Utility function to shuffle an array randomly
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // ===== DRAG AND DROP HANDLERS =====
  
  // Handle when user starts dragging a word
  const handleDragStart = (e, word) => {
    setDraggedWord(word); // Store the word being dragged
    e.dataTransfer.setData('text/plain', JSON.stringify(word)); // Set drag data
  };

  // Allow dropping by preventing default behavior
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle when user drops a word into the sentence area
  const handleDrop = (e, targetIndex = null) => {
    e.preventDefault();
    
    if (!draggedWord) return; // Exit if no word is being dragged

    const newSentenceArea = [...sentenceArea];
    
    // Insert word at specific position or add to end
    if (targetIndex !== null) {
      newSentenceArea.splice(targetIndex, 0, draggedWord);
    } else {
      newSentenceArea.push(draggedWord);
    }
    
    // Update sentence and remove word from available words
    setSentenceArea(newSentenceArea);
    setAvailableWords(prev => prev.filter(w => w.id !== draggedWord.id));
    setDraggedWord(null); // Clear dragged word
  };

  // Remove a word from the sentence and return it to available words
  const removeFromSentence = (wordIndex) => {
    const word = sentenceArea[wordIndex];
    const newSentenceArea = sentenceArea.filter((_, index) => index !== wordIndex);
    setSentenceArea(newSentenceArea);
    setAvailableWords(prev => [...prev, word]); // Add word back to available words
  };

  // ===== SENTENCE CHECKING LOGIC =====
  
  // Main function to check if constructed sentence is valid
  const checkSentence = () => {
    // Validate that user has built a sentence
    if (sentenceArea.length === 0) {
      setFeedback('Please build a sentence first!');
      setIsValid(false);
      return;
    }

    // Convert sentence area to string for analysis
    const sentence = sentenceArea.map(w => w.text).join(' ');
    
    try {
      // Use backend functions to analyze sentence structure
      const matchedStructure = getFullStructCheck(sentence);
      const isStructureValid = selectedStructure ? 
        hasFullStructCheck(sentence, selectedStructure) : 
        hasFullStructCheck(sentence);

      // Update attempt tracking
      const newTotalAttempts = totalAttempts + 1;
      setTotalAttempts(newTotalAttempts);
      
      let feedbackText = '';
      
      if (selectedStructure) {
        // Handle feedback when practicing a specific structure
        if (isStructureValid) {
          const newCorrectCount = correctCount + 1;
          const newStreak = streak + 1;
          
          setCorrectCount(newCorrectCount);
          setStreak(newStreak);
          
          // Record successful attempt
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: selectedStructure,
            correct: true,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          // Check if user has completed the challenge
          if (newCorrectCount >= TARGET_CORRECT) {
            setIsCompleted(true);
            feedbackText = `CONGRATULATIONS! You've successfully completed 10 correct sentences!\nFinal sentence: "${sentence}" matches the target structure: "${selectedStructure}"`;
          } else {
            feedbackText = `Excellent! Your sentence "${sentence}" matches the target structure: "${selectedStructure}"\nProgress: ${newCorrectCount}/${TARGET_CORRECT} correct (${TARGET_CORRECT - newCorrectCount} more to go!)`;
          }
        } else {
          // Handle incorrect structure attempt
          setStreak(0); // Reset streak on incorrect answer
          
          // Record failed attempt
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
        // Handle feedback when practicing freely (no specific structure)
        if (isStructureValid) {
          const newCorrectCount = correctCount + 1;
          const newStreak = streak + 1;
          
          setCorrectCount(newCorrectCount);
          setStreak(newStreak);
          
          // Record successful attempt
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: matchedStructure,
            correct: true,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          // Check completion
          if (newCorrectCount >= TARGET_CORRECT) {
            setIsCompleted(true);
            feedbackText = `CONGRATULATIONS! You've successfully completed 10 correct sentences!\nFinal sentence: "${sentence}" follows a valid structure: "${matchedStructure}"`;
          } else {
            feedbackText = `Great! Your sentence "${sentence}" follows a valid structure: "${matchedStructure}"\nProgress: ${newCorrectCount}/${TARGET_CORRECT} correct (${TARGET_CORRECT - newCorrectCount} more to go!)`;
          }
        } else {
          // Handle invalid sentence structure
          setStreak(0);
          
          // Record failed attempt
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: 'Invalid',
            correct: false,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          feedbackText = `Your sentence "${sentence}" might need some adjustments to follow proper grammar structure.\nTry again! Progress: ${correctCount}/${TARGET_CORRECT} correct`;
        }
      }

      // Update UI with feedback
      setFeedback(feedbackText);
      setIsValid(isStructureValid);
      
      // Auto-reset after successful attempt (but not when challenge is completed)
      if (isStructureValid && !isCompleted && correctCount + 1 < TARGET_CORRECT) {
        setTimeout(() => {
          resetSentenceOnly();
        }, 2000);
      }
      
    } catch (error) {
      // Handle any errors in sentence checking
      setTotalAttempts(totalAttempts + 1);
      setFeedback('Error checking sentence. Please try again.');
      setIsValid(false);
    }
  };

  // ===== RESET FUNCTIONS =====
  
  // Reset sentence area and return words to available pool
  const resetSentence = () => {
    const allWords = [...availableWords, ...sentenceArea];
    setAvailableWords(allWords);
    setSentenceArea([]);
    setFeedback('');
    setIsValid(null);
  };

  // Reset only the sentence (keep progress) and generate new words
  const resetSentenceOnly = () => {
    const allWords = [...availableWords, ...sentenceArea];
    setAvailableWords(allWords);
    setSentenceArea([]);
    setFeedback('');
    setIsValid(null);
    generateWordSetFromTestCases(); // Generate fresh word set
  };

  // Reset all progress and start over
  const resetProgress = () => {
    setCorrectCount(0);
    setTotalAttempts(0);
    setStreak(0);
    setIsCompleted(false);
    setSessionHistory([]);
    resetSentence();
  };

  // ===== STRUCTURE SELECTION =====
  
  // Select a specific sentence structure to practice
  const selectStructure = (structure) => {
    setSelectedStructure(structure.pattern);
    resetSentence(); // Clear current sentence when changing structure
  };

  // ===== MINI LESSON INTERACTION =====
  
  // Define correct answers for practice sentences in mini lesson
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

  // Handle clicks on words in practice sentences
  const handleWordClick = (sentenceNum, word) => {
    const data = practiceData[sentenceNum];
    let feedbackText = '';
    let color = '';

    // Determine if clicked word is subject, object, or incorrect
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

    // Update feedback for this specific sentence
    setSentenceFeedback(prev => ({
      ...prev,
      [sentenceNum]: { text: feedbackText, color: color }
    }));
  };

  // ===== RENDER =====
  return (
    <div style={{ 
      maxWidth: '800px',        // Limit content width for readability
      margin: '0 auto',         // Center the container horizontally
      padding: '20px',          // Add padding around content
      textAlign: 'center'       // Center-align text by default
    }}>
      <h1>Lesson 1</h1>

      {/* Render all component sections with necessary props */}
      <MiniLesson 
        practiceData={practiceData}
        sentenceFeedback={sentenceFeedback}
        handleWordClick={handleWordClick}
      />
      
      <ProgressTracker 
        correctCount={correctCount}
        totalAttempts={totalAttempts}
        streak={streak}
        isCompleted={isCompleted}
        sessionHistory={sessionHistory}
        showProgress={showProgress}
        setShowProgress={setShowProgress}
        resetProgress={resetProgress}
        TARGET_CORRECT={TARGET_CORRECT}
      />
      
      <CompletionCelebration 
        isCompleted={isCompleted}
        correctCount={correctCount}
        totalAttempts={totalAttempts}
        resetProgress={resetProgress}
      />
      
      <LevelSelection 
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
      />
      
      <StructureSelection 
        structureExamples={structureExamples}
        currentLevel={currentLevel}
        selectedStructure={selectedStructure}
        selectStructure={selectStructure}
        setSelectedStructure={setSelectedStructure}
      />
      
      <WordBank 
        availableWords={availableWords}
        handleDragStart={handleDragStart}
      />
      
      <SentenceBuilder 
        sentenceArea={sentenceArea}
        removeFromSentence={removeFromSentence}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
      />
      
      <ActionButtons 
        checkSentence={checkSentence}
        resetSentenceOnly={resetSentenceOnly}
        generateWordSetFromTestCases={generateWordSetFromTestCases}
        sentenceArea={sentenceArea}
        isCompleted={isCompleted}
      />
      
      <FeedbackDisplay 
        feedback={feedback}
      />
      
      <GrammarLegend />
    </div>
  );
};

export default SentenceStructure;