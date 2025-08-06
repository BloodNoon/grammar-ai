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
import VerbActionButtons from './VerbTenseComponents/VerbActionButton';
import VerbFeedbackDisplay from './VerbTenseComponents/VerbFeedbackDisplay';
import VerbTypingQuiz from './VerbTenseComponents/VerbTypingQuiz';
import VerbGrammarLegend from './VerbTenseComponents/VerbGrammarLegend';

// ===== HELPER FUNCTIONS SECTION =====
// FIXED: Use the exact same word classification as SentenceStructure.js
function getWordType(word) {
  // Define word categories for grammatical classification (SAME AS SentenceStructure.js)
  const subjects = ['i', 'he', 'she', 'it', 'you', 'we', 'they'];
  const objects = ['me', 'him', 'her', 'it', 'your', 'us', 'them'];
  const determiners = ['the', 'a', 'an', 'this', 'that', 'these', 'those'];
  const adjectives = ['big', 'small', 'red', 'blue', 'happy', 'sad', 'quick', 'slow', 'beautiful', 'ugly'];
  const nouns = ['dog', 'cat', 'house', 'car', 'book', 'tree', 'ball', 'bird', 'fish', 'apple', 'cats', 'dogs', 'children', 'dinner', 'work', 'ice', 'music', 'food'];
  
  // ALL VERB TYPES - they ALL return "Verb" (SAME AS SentenceStructure.js)
  const verbs = [
    // Present tense verbs
    'run', 'jump', 'eat', 'sleep', 'play', 'sing', 'dance', 'walk', 'fly', 'swim',
    'runs', 'jumps', 'eats', 'sleeps', 'plays', 'sings', 'dances', 'walks', 'flies', 'swims',
    // Past tense verbs
    'ran', 'jumped', 'ate', 'slept', 'played', 'sang', 'danced', 'walked', 'flew', 'swam',
    // Continuous verbs
    'running', 'jumping', 'eating', 'sleeping', 'playing', 'singing', 'dancing', 'walking', 'flying', 'swimming',
    // Auxiliary verbs
    'is', 'are', 'was', 'were', 'will', 'have', 'has', 'had', 'can', 'could', 'would', 'should', 'do', 'does', 'did',
    // Perfect verbs
    'eaten', 'slept', 'played', 'sung', 'danced', 'walked', 'flown', 'swum', 'gone', 'come', 'seen', 'made', 'taken',
    // Additional verb forms
    'chase', 'chases', 'chased', 'chasing', 'catch', 'catches', 'caught', 'catching', 
    'cook', 'cooks', 'cooked', 'cooking', 'love', 'loves', 'loved', 'loving'
  ];
  
  // Clean the word by removing punctuation and converting to lowercase
  const lowerWord = word.toLowerCase().replace(/[.,!?]/, '');
  
  // Check which category the word belongs to and return the type (SAME ORDER AS SentenceStructure.js)
  if (subjects.includes(lowerWord)) return 'Subject';
  if (objects.includes(lowerWord)) return 'Object';
  if (determiners.includes(lowerWord)) return 'Determiner';
  if (adjectives.includes(lowerWord)) return 'Adjective';
  if (nouns.includes(lowerWord)) return 'Noun';
  if (verbs.includes(lowerWord)) return 'Verb';  // ALL VERBS RETURN "Verb"
  return 'Unknown';
}

// Helper function to get specific verb subtype for display purposes only
function getVerbSubtype(word) {
  const lowerWord = word.toLowerCase().replace(/[.,!?]/, '');
  
  const auxiliaryVerbs = ['is', 'are', 'was', 'were', 'will', 'have', 'has', 'had', 'could', 'would', 'should', 'can', 'do', 'does', 'did'];
  const presentVerbs = ['walks', 'walk', 'runs', 'run', 'eats', 'eat', 'chase', 'chases', 'catch', 'catches', 'cook', 'cooks', 'sing', 'sings', 'play', 'plays'];
  const pastVerbs = ['walked', 'ran', 'ate', 'chased', 'caught', 'cooked', 'sang', 'played', 'went', 'came', 'saw', 'made'];
  const continuousVerbs = ['walking', 'running', 'eating', 'chasing', 'catching', 'cooking', 'singing', 'playing'];
  const perfectVerbs = ['eaten', 'caught', 'sung', 'gone', 'come', 'seen', 'made', 'taken', 'finished'];
  
  if (auxiliaryVerbs.includes(lowerWord)) return 'Auxiliary';
  if (presentVerbs.includes(lowerWord)) return 'Present';
  if (pastVerbs.includes(lowerWord)) return 'Past';
  if (continuousVerbs.includes(lowerWord) || lowerWord.endsWith('ing')) return 'Continuous';
  if (perfectVerbs.includes(lowerWord)) return 'Perfect';
  
  return 'Verb';
}

const VerbTenseStructure = () => {
  
  // ===== STATE MANAGEMENT ===== (SAME AS SentenceStructure.js)
  const [availableWords, setAvailableWords] = useState([]);
  const [sentenceArea, setSentenceArea] = useState([]);
  const [selectedStructure, setSelectedStructure] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [draggedWord, setDraggedWord] = useState(null);
  const [currentLevel, setCurrentLevel] = useState('beginner');
  
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [showProgress, setShowProgress] = useState(true);
  
  const [sentenceFeedback, setSentenceFeedback] = useState({});
  
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [quizTotalAttempts, setQuizTotalAttempts] = useState(0);
  const [quizSessionHistory, setQuizSessionHistory] = useState([]);
  const [currentQuizFeedback, setCurrentQuizFeedback] = useState('');
  
  const TARGET_CORRECT = 10;
  const QUIZ_TARGET_CORRECT = 10;

  // ===== DATA STRUCTURES ===== (COMPATIBLE WITH BACKEND)
  const verbWordBank = {
    Subject: ['I', 'He', 'She', 'It', 'You', 'We', 'They'],
    Object: ['me', 'him', 'her', 'it', 'you', 'us', 'them'],
    Determiner: ['The', 'A', 'An', 'This', 'That'],
    Adjective: ['big', 'small', 'red', 'blue', 'happy', 'beautiful'],
    Noun: ['dog', 'cat', 'house', 'car', 'book', 'tree', 'ball', 'bird', 'fish', 'apple', 'cats', 'dogs', 'children'],
    Conjunction: ['and', 'or'],
    
    // ALL VERBS - they will all be classified as "Verb" type for backend compatibility
    Verb: [
      // Present verbs
      'run', 'runs', 'jump', 'jumps', 'eat', 'eats', 'sleep', 'sleeps', 'play', 'plays', 'sing', 'sings', 'walk', 'walks',
      // Past verbs  
      'ran', 'jumped', 'ate', 'slept', 'played', 'sang', 'walked',
      // Continuous verbs
      'running', 'jumping', 'eating', 'sleeping', 'playing', 'singing', 'walking',
      // Auxiliary verbs
      'is', 'are', 'was', 'were', 'will', 'have', 'has', 'had', 'can', 'could', 'would', 'should', 'do', 'does', 'did',
      // Perfect verbs
      'eaten', 'slept', 'played', 'sung', 'walked', 'gone', 'come', 'seen', 'made',
      // Additional verbs for variety
      'chase', 'chases', 'chased', 'catch', 'catches', 'caught', 'cook', 'cooks', 'cooked', 'love', 'loves', 'loved'
    ]
  };

  // Structure examples that match backend patterns
  const verbStructureExamples = [
    { 
      pattern: '#Subject #Verb', 
      example: 'I run.', 
      description: 'Simple subject-verb',
      level: 'beginner'
    },
    { 
      pattern: '#Determiner #Noun #Verb', 
      example: 'The dog runs.', 
      description: 'Article-noun-verb',
      level: 'beginner'
    },
    { 
      pattern: '#Subject #Verb #Object', 
      example: 'I see him.', 
      description: 'Subject-verb-object',
      level: 'intermediate'
    },
    { 
      pattern: '#Determiner #Adjective #Noun #Verb', 
      example: 'The big dog runs.', 
      description: 'Article-adjective-noun-verb',
      level: 'advanced'
    }
  ];

  // ===== EFFECTS =====
  useEffect(() => {
    generateVerbWordSetFromTestCases();
    generateNewQuizQuestion();
  }, [currentLevel, selectedStructure]);

  // ===== UTILITY FUNCTIONS ===== (SAME AS SentenceStructure.js)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // ===== WORD GENERATION ===== (SIMILAR TO SentenceStructure.js)
  const generateVerbWordSetFromTestCases = () => {
    let words = [];
    
    // Extract realistic words from test cases
    const wordsFromTestCases = testCases.flatMap(tc => 
      tc.sentence.split(' ').map(word => word.replace(/[.,!?]/, ''))
    );
    
    if (selectedStructure) {
      // Generate words for selected structure
      const structure = selectedStructure;
      if (structure.includes('#Subject')) {
        words.push(...verbWordBank.Subject.slice(0, 3));
      }
      if (structure.includes('#Object')) {
        words.push(...verbWordBank.Object.slice(0, 3));
      }
      if (structure.includes('#Determiner')) {
        words.push(...verbWordBank.Determiner.slice(0, 3));
      }
      if (structure.includes('#Adjective')) {
        words.push(...verbWordBank.Adjective.slice(0, 4));
      }
      if (structure.includes('#Noun')) {
        words.push(...verbWordBank.Noun.slice(0, 4));
      }
      if (structure.includes('#Verb')) {
        words.push(...verbWordBank.Verb.slice(0, 6));
      }
      if (structure.includes('(and|or)')) {
        words.push(...verbWordBank.Conjunction);
      }
    } else {
      // Generate words based on difficulty level
      const counts = {
        beginner: { Subject: 3, Determiner: 2, Noun: 3, Verb: 5 },
        intermediate: { Subject: 3, Determiner: 3, Adjective: 3, Noun: 4, Verb: 6, Conjunction: 2 },
        advanced: { Subject: 3, Object: 3, Determiner: 3, Adjective: 4, Noun: 4, Verb: 8, Conjunction: 2 }
      };
      
      const levelCounts = counts[currentLevel];
      Object.keys(levelCounts).forEach(type => {
        if (verbWordBank[type]) {
          words.push(...verbWordBank[type].slice(0, levelCounts[type]));
        }
      });
    }

    // Add some words from test cases
    const testCaseWords = wordsFromTestCases.slice(0, 5);
    words.push(...testCaseWords);
    
    // Combine and shuffle words, removing duplicates
    const combinedWords = [...new Set([...words, ...Object.values(verbWordBank).flat().slice(0, 10)])];
    
    setAvailableWords(shuffleArray(combinedWords).map((word, index) => ({
      id: `verb-word-${index}`,
      text: word,
      type: getWordType(word),  // Use backend-compatible word type
      subtype: getVerbSubtype(word) // Add subtype for display
    })));
  };

  // ===== DRAG AND DROP HANDLERS ===== (SAME AS SentenceStructure.js)
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

  // ===== SENTENCE CHECKING ===== (SAME LOGIC AS SentenceStructure.js)
  const checkSentence = () => {
    if (sentenceArea.length === 0) {
      setFeedback('Please build a sentence first!');
      setIsValid(false);
      return;
    }

    const sentence = sentenceArea.map(w => w.text).join(' ');
    
    console.log('Checking sentence:', sentence);
    console.log('Word types:', sentenceArea.map(w => `${w.text}(${w.type})`));
    
    try {
      // Use backend functions to analyze sentence structure (SAME AS SentenceStructure.js)
      const matchedStructure = getFullStructCheck(sentence);
      const isStructureValid = selectedStructure ? 
        hasFullStructCheck(sentence, selectedStructure) : 
        hasFullStructCheck(sentence);

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
          
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: selectedStructure,
            correct: true,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          if (newCorrectCount >= TARGET_CORRECT) {
            setIsCompleted(true);
            feedbackText = `🎉 CONGRATULATIONS! You've successfully completed ${TARGET_CORRECT} correct sentences!\nFinal sentence: "${sentence}" matches the target structure: "${selectedStructure}"`;
          } else {
            feedbackText = `✅ Excellent! Your sentence "${sentence}" matches the target structure: "${selectedStructure}"\nProgress: ${newCorrectCount}/${TARGET_CORRECT} correct (${TARGET_CORRECT - newCorrectCount} more to go!)`;
          }
        } else {
          setStreak(0);
          
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: selectedStructure,
            correct: false,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          feedbackText = `❌ Your sentence "${sentence}" doesn't match the target structure "${selectedStructure}".`;
          if (matchedStructure) {
            feedbackText += ` It follows: "${matchedStructure}" instead.`;
          }
          feedbackText += `\nTry again! Progress: ${correctCount}/${TARGET_CORRECT} correct`;
        }
      } else {
        // Handle feedback when practicing freely
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
            feedbackText = `🎉 CONGRATULATIONS! You've successfully completed ${TARGET_CORRECT} correct sentences!\nFinal sentence: "${sentence}" follows a valid structure: "${matchedStructure}"`;
          } else {
            feedbackText = `✅ Great! Your sentence "${sentence}" follows a valid structure: "${matchedStructure}"\nProgress: ${newCorrectCount}/${TARGET_CORRECT} correct (${TARGET_CORRECT - newCorrectCount} more to go!)`;
          }
        } else {
          setStreak(0);
          
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: 'Invalid',
            correct: false,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          feedbackText = `❌ Your sentence "${sentence}" needs some adjustments to follow proper grammar structure.\nTry again! Progress: ${correctCount}/${TARGET_CORRECT} correct`;
        }
      }

      setFeedback(feedbackText);
      setIsValid(isStructureValid);
      
      // Auto-reset after successful attempt
      if (isStructureValid && !isCompleted && correctCount + 1 < TARGET_CORRECT) {
        setTimeout(() => {
          resetSentenceOnly();
        }, 2000);
      }
      
    } catch (error) {
      console.error('Sentence checking error:', error);
      setTotalAttempts(totalAttempts + 1);
      setFeedback('Error checking sentence. Please try again.');
      setIsValid(false);
    }
  };

  // ===== RESET FUNCTIONS ===== (SAME AS SentenceStructure.js)
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
    generateVerbWordSetFromTestCases();
  };

  const resetProgress = () => {
    setCorrectCount(0);
    setTotalAttempts(0);
    setStreak(0);
    setIsCompleted(false);
    setSessionHistory([]);
    resetSentence();
  };

  // ===== STRUCTURE SELECTION =====
  const selectStructure = (structure) => {
    setSelectedStructure(structure.pattern);
    resetSentence();
  };

  // ===== LESSON INTERACTION =====
  const handleVerbSentenceChoice = (sentenceNum, chosenSentence, isCorrect) => {
    let feedbackText = '';
    let color = '';

    if (isCorrect) {
      feedbackText = 'Correct! Good understanding of verb tense structure.';
      color = 'green';
    } else {
      const correctAnswers = {
        1: 'Dogs will chase cats.',
        2: 'Bill could catch ice.'
      };
      feedbackText = `Incorrect. The correct sentence is: "${correctAnswers[sentenceNum]}"`;
      color = 'red';
    }

    setSentenceFeedback(prev => ({
      ...prev,
      [sentenceNum]: { text: feedbackText, color: color }
    }));
  };

  // ===== QUIZ FUNCTIONS =====
  const generateNewQuizQuestion = () => {
    const totalQuestions = 15;
    const randomIndex = Math.floor(Math.random() * totalQuestions);
    setCurrentQuizQuestion(randomIndex);
    setCurrentQuizFeedback('');
  };

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

  // ===== RENDER =====
  return (
    <div style={{ 
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>Verb Tense & Auxiliary Verb Builder</h1>

      <VerbTenseLesson 
        sentenceFeedback={sentenceFeedback}
        handleVerbSentenceChoice={handleVerbSentenceChoice}
      />

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

      <VerbCompletionCelebration 
        isCompleted={isCompleted}
        correctCount={correctCount}
        totalAttempts={totalAttempts}
        resetProgress={resetProgress}
      />

      <VerbLevelSelection 
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
      />

      <VerbStructureSelection 
        verbStructureExamples={verbStructureExamples}
        currentLevel={currentLevel}
        selectedStructure={selectedStructure}
        selectStructure={selectStructure}
        setSelectedStructure={setSelectedStructure}
      />

      <VerbWordBank 
        availableWords={availableWords}
        handleDragStart={handleDragStart}
      />

      <VerbSentenceBuilder 
        sentenceArea={sentenceArea}
        removeFromSentence={removeFromSentence}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
      />

      <VerbActionButtons 
        checkSentence={checkSentence}
        resetSentenceOnly={resetSentenceOnly}
        generateVerbWordSetFromTestCases={generateVerbWordSetFromTestCases}
        sentenceArea={sentenceArea}
        isCompleted={isCompleted}
      />

      <VerbFeedbackDisplay 
        feedback={feedback}
      />

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

      <VerbGrammarLegend />
    </div>
  );
};

export default VerbTenseStructure;