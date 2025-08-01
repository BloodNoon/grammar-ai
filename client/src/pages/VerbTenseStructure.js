// This component manages all state and coordinates between child components
import React, { useState, useEffect } from 'react';
import { hasFullStructCheck, getFullStructCheck, getTags } from '../utils/SentenceChecker/StructureChecker';
import { testCases } from '../utils/SentenceChecker/TestCases';

// Import all verb tense component sections
import VerbTenseLesson from './VerbTenseComponents/VerbTenseLesson';
import VerbProgressTracker from './VerbTenseComponents/VerbProgressTracker';
import VerbCompletionCelebration from './VerbTenseComponents/VerbCompletionCelebration';
import VerbLevelSelection from './VerbTenseComponents/VerbLevelSelection';
import VerbStructureSelection from './VerbTenseComponents/VerbStructureSelection';
import VerbWordBank from './VerbTenseComponents/VerbWordBank';
import VerbSentenceBuilder from './VerbTenseComponents/VerbSentenceBuilder';
import VerbActionButtons from './VerbTenseComponents/VerbActionButtons';
import VerbFeedbackDisplay from './VerbTenseComponents/VerbFeedbackDisplay';
import VerbTypingQuiz from './VerbTenseComponents/VerbTypingQuiz';
import VerbGrammarLegend from './VerbTenseComponents/VerbGrammarLegend';

// ===== HELPER FUNCTIONS SECTION =====
// Helper function to classify words by grammatical type with verb focus
function getVerbWordType(word) {
  // Define word categories for verb tense classification
  const subjects = ['i', 'he', 'she', 'it', 'you', 'we', 'they', 'dogs', 'bill', 'cats'];
  const objects = ['me', 'him', 'her', 'it', 'you', 'us', 'them', 'cats', 'ice', 'dinner', 'work'];
  const determiners = ['the', 'a', 'an', 'this', 'that', 'these', 'those'];
  const adjectives = ['big', 'small', 'red', 'blue', 'happy', 'sad', 'quick', 'beautiful'];
  const nouns = ['dog', 'cat', 'house', 'car', 'book', 'tree', 'ball', 'bird', 'fish', 'apple', 'dinner', 'work', 'ice', 'concert'];
  
  // Verb tenses and forms - comprehensive for verb focus
  const presentSimple = ['walks', 'walk', 'runs', 'run', 'eats', 'eat', 'sleeps', 'sleep', 'chase', 'chases', 'catch', 'catches'];
  const pastSimple = ['walked', 'ran', 'ate', 'slept', 'chased', 'caught'];
  const auxiliaryVerbs = ['is', 'are', 'was', 'were', 'will', 'have', 'has', 'had', 'could', 'would', 'should', 'can', 'may', 'might'];
  const continuousVerbs = ['walking', 'running', 'eating', 'sleeping', 'cooking', 'singing', 'chasing', 'catching'];
  const perfectVerbs = ['walked', 'run', 'eaten', 'slept', 'finished', 'cooked', 'sung', 'chased', 'caught'];
  
  // Clean the word by removing punctuation and converting to lowercase
  const lowerWord = word.toLowerCase().replace(/[.,!?]/, '');
  
  // Return appropriate word type based on classification
  if (subjects.includes(lowerWord)) return 'Subject';
  if (objects.includes(lowerWord)) return 'Object';
  if (determiners.includes(lowerWord)) return 'Determiner';
  if (adjectives.includes(lowerWord)) return 'Adjective';
  if (nouns.includes(lowerWord)) return 'Noun';
  if (auxiliaryVerbs.includes(lowerWord)) return 'Auxiliary';
  if (continuousVerbs.includes(lowerWord)) return 'Continuous';
  if (perfectVerbs.includes(lowerWord)) return 'Perfect';
  if (presentSimple.includes(lowerWord)) return 'PresentVerb';
  if (pastSimple.includes(lowerWord)) return 'PastVerb';
  
  return 'Unknown'; // Default return for unclassified words
}

const VerbTenseStructure = () => {
  
  // ===== STATE MANAGEMENT SECTION =====
  // Core sentence building states for drag & drop functionality
  const [availableWords, setAvailableWords] = useState([]); // Words available for dragging
  const [sentenceArea, setSentenceArea] = useState([]); // Words currently in the sentence
  const [selectedStructure, setSelectedStructure] = useState(''); // Currently selected target structure
  const [feedback, setFeedback] = useState(''); // Feedback message for user
  const [isValid, setIsValid] = useState(null); // Whether current sentence is valid
  const [draggedWord, setDraggedWord] = useState(null); // Word currently being dragged
  const [currentLevel, setCurrentLevel] = useState('beginner'); // Current difficulty level
  
  // Progress tracking states for drag & drop challenge (10 correct sentences)
  const [correctCount, setCorrectCount] = useState(0); // Number of correct sentences
  const [totalAttempts, setTotalAttempts] = useState(0); // Total number of attempts
  const [streak, setStreak] = useState(0); // Current streak of correct answers
  const [isCompleted, setIsCompleted] = useState(false); // Whether user completed 10 correct sentences
  const [sessionHistory, setSessionHistory] = useState([]); // History of recent attempts
  const [showProgress, setShowProgress] = useState(true); // Whether to show progress details
  
  // Verb tense lesson interaction states
  const [sentenceFeedback, setSentenceFeedback] = useState({}); // Feedback for practice sentences
  
  // Quiz section states for verb tense typing quiz (10 correct answers)
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0); // Current question index
  const [quizAnswers, setQuizAnswers] = useState({}); // User's typed quiz answers
  const [quizCompleted, setQuizCompleted] = useState(false); // Whether quiz is completed
  const [quizCorrectCount, setQuizCorrectCount] = useState(0); // Number of correct quiz answers
  const [quizTotalAttempts, setQuizTotalAttempts] = useState(0); // Total quiz attempts
  const [quizSessionHistory, setQuizSessionHistory] = useState([]); // Quiz attempt history
  const [currentQuizFeedback, setCurrentQuizFeedback] = useState(''); // Current question feedback
  
  // Constants for completion requirements
  const TARGET_CORRECT = 10; // Number of correct sentences needed to complete DRAG & DROP
  const QUIZ_TARGET_CORRECT = 10; // Number of correct quiz answers needed to complete QUIZ

  // ===== DATA STRUCTURES SECTION =====
  // Verb-focused word bank organized by grammatical type
  const verbWordBank = {
    Subject: ['I', 'He', 'She', 'It', 'You', 'We', 'They', 'Dogs', 'Bill'],
    Object: ['cats', 'ice', 'dinner', 'work', 'concert', 'him', 'her', 'them'],
    Determiner: ['The', 'A', 'An', 'This', 'That'],
    Adjective: ['big', 'small', 'red', 'blue', 'happy', 'beautiful'],
    Noun: ['dog', 'cat', 'house', 'dinner', 'work', 'ice', 'concert'],
    Auxiliary: ['is', 'are', 'was', 'were', 'will', 'have', 'has', 'had', 'could'],
    PresentVerb: ['walks', 'walk', 'chases', 'chase', 'catches', 'catch'],
    PastVerb: ['walked', 'chased', 'caught'],
    Continuous: ['walking', 'chasing', 'catching', 'cooking', 'singing'],
    Perfect: ['walked', 'chased', 'caught', 'finished', 'cooked', 'sung']
  };

  // Verb tense structure examples for sentence pattern practice
  const verbStructureExamples = [
    { 
      pattern: '#Subject #Verb', 
      example: 'Dogs chase.', 
      description: 'Simple subject-verb with present tense',
      level: 'beginner'
    },
    { 
      pattern: '#Subject #Verb #Object', 
      example: 'Dogs chase cats.', 
      description: 'Subject-verb-object with present tense',
      level: 'beginner'
    },
    { 
      pattern: '#Subject #Auxiliary #Verb #Object', 
      example: 'Dogs will chase cats.', 
      description: 'Subject with auxiliary verb and object',
      level: 'intermediate'
    },
    { 
      pattern: '#Subject #Auxiliary #Continuous #Object', 
      example: 'She is cooking dinner.', 
      description: 'Present continuous tense',
      level: 'intermediate'
    },
    { 
      pattern: '#Subject #Auxiliary #Perfect #Object', 
      example: 'They have finished work.', 
      description: 'Present perfect tense',
      level: 'advanced'
    }
  ];

  // ===== EFFECTS SECTION =====
  // Generate new word set when level or structure changes
  useEffect(() => {
    generateVerbWordSetFromTestCases();
    generateNewQuizQuestion();
  }, [currentLevel, selectedStructure]);

  // ===== UTILITY FUNCTIONS SECTION =====
  // Utility function to shuffle an array randomly
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // ===== WORD GENERATION SECTION =====
  // Generate word set focusing on verb tenses and auxiliaries
  const generateVerbWordSetFromTestCases = () => {
    let words = [];
    
    // Extract verb-focused words from test cases for realistic vocabulary
    const wordsFromTestCases = testCases.flatMap(tc => 
      tc.sentence.split(' ').map(word => word.replace(/[.,!?]/, ''))
    );
    
    if (selectedStructure) {
      // Generate words specifically for the selected verb structure pattern
      const structure = selectedStructure;
      if (structure.includes('#Subject')) words.push(...verbWordBank.Subject.slice(0, 3));
      if (structure.includes('#Object')) words.push(...verbWordBank.Object.slice(0, 3));
      if (structure.includes('#Auxiliary')) words.push(...verbWordBank.Auxiliary.slice(0, 4));
      if (structure.includes('#Continuous')) words.push(...verbWordBank.Continuous.slice(0, 3));
      if (structure.includes('#Perfect')) words.push(...verbWordBank.Perfect.slice(0, 3));
      if (structure.includes('#Verb')) words.push(...verbWordBank.PresentVerb.slice(0, 4));
    } else {
      // Generate words based on difficulty level with verb focus
      const counts = {
        beginner: { Subject: 3, PresentVerb: 4, Object: 3, Noun: 2 },
        intermediate: { Subject: 3, Auxiliary: 3, PresentVerb: 3, Continuous: 3, Object: 4 },
        advanced: { Subject: 3, Auxiliary: 4, PresentVerb: 2, Continuous: 2, Perfect: 3, Object: 4 }
      };
      
      const levelCounts = counts[currentLevel];
      Object.keys(levelCounts).forEach(type => {
        if (verbWordBank[type]) {
          words.push(...verbWordBank[type].slice(0, levelCounts[type]));
        }
      });
    }

    // Add some verb-focused words from test cases and shuffle everything
    const testCaseWords = wordsFromTestCases.slice(0, 5);
    words.push(...testCaseWords);
    const combinedWords = [...new Set([...words, ...Object.values(verbWordBank).flat().slice(0, 15)])];
    
    // Create word objects with unique IDs and verb-focused type classification
    setAvailableWords(shuffleArray(combinedWords).map((word, index) => ({
      id: `verb-word-${index}`,
      text: word,
      type: getVerbWordType(word)
    })));
  };

  // ===== DRAG AND DROP HANDLERS SECTION =====
  // Handle when user starts dragging a word from the word bank
  const handleDragStart = (e, word) => {
    setDraggedWord(word); // Store the word being dragged in state
    e.dataTransfer.setData('text/plain', JSON.stringify(word)); // Set browser drag data
  };

  // Allow dropping by preventing default browser behavior
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle when user drops a word into the sentence building area
  const handleDrop = (e, targetIndex = null) => {
    e.preventDefault();
    
    if (!draggedWord) return; // Exit if no word is being dragged

    const newSentenceArea = [...sentenceArea];
    
    // Insert word at specific position or add to end of sentence
    if (targetIndex !== null) {
      newSentenceArea.splice(targetIndex, 0, draggedWord);
    } else {
      newSentenceArea.push(draggedWord);
    }
    
    // Update sentence and remove word from available words
    setSentenceArea(newSentenceArea);
    setAvailableWords(prev => prev.filter(w => w.id !== draggedWord.id));
    setDraggedWord(null); // Clear dragged word state
  };

  // Remove a word from the sentence and return it to available words
  const removeFromSentence = (wordIndex) => {
    const word = sentenceArea[wordIndex];
    const newSentenceArea = sentenceArea.filter((_, index) => index !== wordIndex);
    setSentenceArea(newSentenceArea);
    setAvailableWords(prev => [...prev, word]); // Add word back to available pool
  };

  // ===== SENTENCE CHECKING SECTION =====
  // Main function to validate constructed sentence for verb tense correctness
  const checkSentence = () => {
    // Validate that user has built a sentence
    if (sentenceArea.length === 0) {
      setFeedback('Please build a sentence first!');
      setIsValid(false);
      return;
    }

    // Convert sentence area to string for backend analysis
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
        // Handle feedback when practicing a specific verb structure
        if (isStructureValid) {
          const newCorrectCount = correctCount + 1;
          const newStreak = streak + 1;
          
          setCorrectCount(newCorrectCount);
          setStreak(newStreak);
          
          // Record successful attempt in session history
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: selectedStructure,
            correct: true,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          // Check if user has completed the 10-sentence challenge
          if (newCorrectCount >= TARGET_CORRECT) {
            setIsCompleted(true);
            feedbackText = `🎉 CONGRATULATIONS! You've mastered verb sentence building with ${TARGET_CORRECT} correct sentences!\nFinal sentence: "${sentence}" matches the target structure: "${selectedStructure}"`;
          } else {
            feedbackText = `✅ Excellent verb usage! Your sentence "${sentence}" matches the target structure: "${selectedStructure}"\nProgress: ${newCorrectCount}/${TARGET_CORRECT} correct (${TARGET_CORRECT - newCorrectCount} more to go!)`;
          }
        } else {
          // Handle incorrect structure attempt
          setStreak(0); // Reset streak on incorrect answer
          
          // Record failed attempt in session history
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: selectedStructure,
            correct: false,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          feedbackText = `❌ Your sentence "${sentence}" doesn't match the target verb structure "${selectedStructure}".`;
          if (matchedStructure) {
            feedbackText += ` It follows: "${matchedStructure}" instead.`;
          }
          feedbackText += `\nTry again! Focus on verb tense. Progress: ${correctCount}/${TARGET_CORRECT} correct`;
        }
      } else {
        // Handle feedback when practicing freely (no specific structure selected)
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
          
          // Check completion of 10-sentence challenge
          if (newCorrectCount >= TARGET_CORRECT) {
            setIsCompleted(true);
            feedbackText = `🎉 CONGRATULATIONS! You've mastered verb sentence building with ${TARGET_CORRECT} correct sentences!\nFinal sentence: "${sentence}" follows a valid structure: "${matchedStructure}"`;
          } else {
            feedbackText = `✅ Great verb usage! Your sentence "${sentence}" follows a valid structure: "${matchedStructure}"\nProgress: ${newCorrectCount}/${TARGET_CORRECT} correct (${TARGET_CORRECT - newCorrectCount} more to go!)`;
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
          
          feedbackText = `❌ Your sentence "${sentence}" needs work on verb tense structure. Check your auxiliary verbs and tense consistency.\nTry again! Progress: ${correctCount}/${TARGET_CORRECT} correct`;
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

  // ===== RESET FUNCTIONS SECTION =====
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
    generateVerbWordSetFromTestCases(); // Generate fresh word set
  };

  // Reset all drag & drop progress and start over
  const resetProgress = () => {
    setCorrectCount(0);
    setTotalAttempts(0);
    setStreak(0);
    setIsCompleted(false);
    setSessionHistory([]);
    resetSentence();
  };

  // ===== STRUCTURE SELECTION SECTION =====
  // Select a specific verb sentence structure pattern to practice
  const selectStructure = (structure) => {
    setSelectedStructure(structure.pattern);
    resetSentence(); // Clear current sentence when changing structure
  };

  // ===== LESSON INTERACTION SECTION =====
  // Handle clicks on practice sentence options in the lesson
  const handleVerbSentenceChoice = (sentenceNum, chosenSentence, isCorrect) => {
    let feedbackText = '';
    let color = '';

    if (isCorrect) {
      feedbackText = 'Correct! Good understanding of verb tense structure.';
      color = 'green';
    } else {
      // Show correct answer when user selects wrong option
      const correctAnswers = {
        1: 'Dogs will chase cats.',
        2: 'Bill could catch ice.'
      };
      feedbackText = `Incorrect. The correct sentence is: "${correctAnswers[sentenceNum]}"`;
      color = 'red';
    }

    // Update feedback for this specific sentence choice
    setSentenceFeedback(prev => ({
      ...prev,
      [sentenceNum]: { text: feedbackText, color: color }
    }));
  };

  // ===== QUIZ FUNCTIONS SECTION =====
  // Generate new random quiz question from the available pool
  const generateNewQuizQuestion = () => {
    // Quiz questions are defined in VerbTypingQuiz component
    const totalQuestions = 15; // Total questions available
    const randomIndex = Math.floor(Math.random() * totalQuestions);
    setCurrentQuizQuestion(randomIndex);
    setCurrentQuizFeedback(''); // Clear feedback for new question
  };

  // Reset quiz to start over - clears all quiz progress
  const resetQuiz = () => {
    setCurrentQuizQuestion(0);
    setQuizAnswers({});
    setQuizCompleted(false);
    setQuizCorrectCount(0);
    setQuizTotalAttempts(0);
    setQuizSessionHistory([]);
    setCurrentQuizFeedback('');
    generateNewQuizQuestion();
  };

  // ===== RENDER SECTION =====
  return (
    <div style={{ 
      maxWidth: '800px',        // Limit content width for readability
      margin: '0 auto',         // Center the container horizontally
      padding: '20px',          // Add padding around content
      textAlign: 'center'       // Center-align text by default
    }}>
      <h1>Verb Tense & Auxiliary Verb Builder</h1>

      {/* ===== EDUCATIONAL LESSON COMPONENT ===== */}
      <VerbTenseLesson 
        sentenceFeedback={sentenceFeedback}
        handleVerbSentenceChoice={handleVerbSentenceChoice}
      />

      {/* ===== DRAG & DROP PROGRESS TRACKING COMPONENT ===== */}
      <VerbProgressTracker 
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

      {/* ===== DRAG & DROP COMPLETION CELEBRATION COMPONENT ===== */}
      <VerbCompletionCelebration 
        isCompleted={isCompleted}
        correctCount={correctCount}
        totalAttempts={totalAttempts}
        resetProgress={resetProgress}
      />

      {/* ===== DIFFICULTY LEVEL SELECTION COMPONENT ===== */}
      <VerbLevelSelection 
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
      />

      {/* ===== SENTENCE STRUCTURE PATTERN SELECTION COMPONENT ===== */}
      <VerbStructureSelection 
        verbStructureExamples={verbStructureExamples}
        currentLevel={currentLevel}
        selectedStructure={selectedStructure}
        selectStructure={selectStructure}
        setSelectedStructure={setSelectedStructure}
      />

      {/* ===== DRAGGABLE WORDS COMPONENT ===== */}
      <VerbWordBank 
        availableWords={availableWords}
        handleDragStart={handleDragStart}
      />

      {/* ===== SENTENCE BUILDING DROP ZONE COMPONENT ===== */}
      <VerbSentenceBuilder 
        sentenceArea={sentenceArea}
        removeFromSentence={removeFromSentence}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
      />

      {/* ===== ACTION BUTTONS COMPONENT ===== */}
      <VerbActionButtons 
        checkSentence={checkSentence}
        resetSentenceOnly={resetSentenceOnly}
        generateVerbWordSetFromTestCases={generateVerbWordSetFromTestCases}
        sentenceArea={sentenceArea}
        isCompleted={isCompleted}
      />

      {/* ===== FEEDBACK DISPLAY COMPONENT ===== */}
      <VerbFeedbackDisplay 
        feedback={feedback}
      />

      {/* ===== TYPING QUIZ COMPONENT (10 CORRECT ANSWERS REQUIRED) ===== */}
      <VerbTypingQuiz 
        currentQuizQuestion={currentQuizQuestion}
        quizAnswers={quizAnswers}
        setQuizAnswers={setQuizAnswers}
        quizCompleted={quizCompleted}
        setQuizCompleted={setQuizCompleted}
        quizCorrectCount={quizCorrectCount}
        setQuizCorrectCount={setQuizCorrectCount}
        quizTotalAttempts={quizTotalAttempts}
        setQuizTotalAttempts={setQuizTotalAttempts}
        quizSessionHistory={quizSessionHistory}
        setQuizSessionHistory={setQuizSessionHistory}
        currentQuizFeedback={currentQuizFeedback}
        setCurrentQuizFeedback={setCurrentQuizFeedback}
        generateNewQuizQuestion={generateNewQuizQuestion}
        resetQuiz={resetQuiz}
        QUIZ_TARGET_CORRECT={QUIZ_TARGET_CORRECT}
      />

      {/* ===== GRAMMAR REFERENCE COMPONENT ===== */}
      <VerbGrammarLegend />
    </div>
  );
};

export default VerbTenseStructure;