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
function getVerbWordType(word) {
  const lowerWord = word.toLowerCase().replace(/[.,!?]/, '');
  
  // Word categories
  const subjects = ['i', 'he', 'she', 'it', 'you', 'we', 'they', 'dogs', 'bill', 'cats', 'children'];
  const objects = ['me', 'him', 'her', 'it', 'you', 'us', 'them', 'cats', 'ice', 'dinner', 'work', 'food', 'music'];
  const determiners = ['the', 'a', 'an', 'this', 'that', 'these', 'those'];
  const adjectives = ['big', 'small', 'red', 'blue', 'happy', 'sad', 'quick', 'beautiful', 'loud', 'quiet'];
  const nouns = ['dog', 'cat', 'house', 'car', 'book', 'tree', 'ball', 'bird', 'fish', 'apple', 'dinner', 'work', 'ice', 'music', 'food'];
  
  // ALL VERB TYPES - they ALL return "Verb" as the primary type
  const auxiliaryVerbs = ['is', 'are', 'was', 'were', 'will', 'have', 'has', 'had', 'could', 'would', 'should', 'can', 'do', 'does', 'did'];
  const presentVerbs = ['walks', 'walk', 'runs', 'run', 'eats', 'eat', 'chase', 'chases', 'catch', 'catches', 'cook', 'cooks', 'sing', 'sings', 'play', 'plays'];
  const pastVerbs = ['walked', 'ran', 'ate', 'chased', 'caught', 'cooked', 'sang', 'played', 'went', 'came', 'saw', 'made'];
  const continuousVerbs = ['walking', 'running', 'eating', 'chasing', 'catching', 'cooking', 'singing', 'playing'];
  const perfectVerbs = ['eaten', 'caught', 'sung', 'gone', 'come', 'seen', 'made', 'taken', 'finished'];
  
  // FIXED: All verb types return "Verb" - just like SentenceStructure.js
  if (auxiliaryVerbs.includes(lowerWord) || 
      presentVerbs.includes(lowerWord) || 
      pastVerbs.includes(lowerWord) || 
      continuousVerbs.includes(lowerWord) || 
      perfectVerbs.includes(lowerWord) || 
      lowerWord.endsWith('ing')) {
    return 'Verb';
  }
  
  // Check other word types
  if (subjects.includes(lowerWord)) return 'Subject';
  if (objects.includes(lowerWord)) return 'Object';
  if (determiners.includes(lowerWord)) return 'Determiner';
  if (adjectives.includes(lowerWord)) return 'Adjective';
  if (nouns.includes(lowerWord)) return 'Noun';
  
  return 'Unknown';
}

// Helper function to get specific verb subtype for display purposes
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

// Helper to check if word is a verb (simplified since all verb types return "Verb")
function isVerb(wordType) {
  return wordType === 'Verb';
}

const VerbTenseStructure = () => {
  
  // ===== STATE MANAGEMENT =====
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

  // ===== DATA STRUCTURES =====
  const verbWordBank = {
    Subject: ['I', 'He', 'She', 'It', 'You', 'We', 'They', 'Dogs', 'Cats', 'Children'],
    Object: ['cats', 'ice', 'dinner', 'work', 'him', 'her', 'them', 'food', 'music'],
    Determiner: ['The', 'A', 'An', 'This', 'That'],
    Adjective: ['big', 'small', 'red', 'blue', 'happy', 'beautiful'],
    Noun: ['dog', 'cat', 'house', 'dinner', 'work', 'ice', 'music', 'food'],
    
    // ALL VERBS - they will all be classified as "Verb" type
    Verb: [
      // Auxiliary verbs
      'is', 'are', 'was', 'were', 'will', 'have', 'has', 'had', 'can', 'do',
      // Present verbs
      'walk', 'walks', 'run', 'runs', 'eat', 'eats', 'chase', 'play', 'sing',
      // Past verbs
      'walked', 'ran', 'ate', 'chased', 'played', 'went', 'came', 'saw',
      // Continuous verbs
      'walking', 'running', 'eating', 'chasing', 'playing',
      // Perfect verbs
      'eaten', 'caught', 'sung', 'gone', 'come', 'seen', 'made'
    ]
  };

  // Structure examples
  const verbStructureExamples = [
    { 
      pattern: '#Subject #Verb', 
      example: 'I walk.', 
      description: 'Simple subject-verb',
      level: 'beginner'
    },
    { 
      pattern: '#Subject #Verb #Object', 
      example: 'I eat food.', 
      description: 'Subject-verb-object',
      level: 'beginner'
    },
    { 
      pattern: '#Subject #Auxiliary #Verb #Object', 
      example: 'I will eat food.', 
      description: 'Subject with auxiliary verb',
      level: 'intermediate'
    }
  ];

  // ===== EFFECTS =====
  useEffect(() => {
    generateVerbWordSetFromTestCases();
    generateNewQuizQuestion();
  }, [currentLevel, selectedStructure]);

  // ===== UTILITY FUNCTIONS =====
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // ===== WORD GENERATION =====
  const generateVerbWordSetFromTestCases = () => {
    let words = [];
    
    const counts = {
      beginner: { Subject: 3, Verb: 5, Noun: 3, Determiner: 2 },
      intermediate: { Subject: 3, Verb: 6, Noun: 3, Determiner: 2, Adjective: 2 },
      advanced: { Subject: 2, Verb: 8, Noun: 3, Determiner: 2, Adjective: 2, Object: 2 }
    };
    
    const levelCounts = counts[currentLevel];
    Object.keys(levelCounts).forEach(type => {
      if (verbWordBank[type]) {
        words.push(...verbWordBank[type].slice(0, levelCounts[type]));
      }
    });

    const combinedWords = [...new Set(words)].slice(0, 15);
    
    setAvailableWords(shuffleArray(combinedWords).map((word, index) => ({
      id: `verb-word-${index}`,
      text: word,
      type: getVerbWordType(word),
      subtype: getVerbSubtype(word) // Add subtype for display on buttons
    })));
  };

  // ===== DRAG AND DROP HANDLERS =====
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

  // ===== SENTENCE CHECKING (SIMPLIFIED WITH UNIFIED VERB TYPE) =====
  const checkSentence = () => {
    if (sentenceArea.length === 0) {
      setFeedback('Please build a sentence first!');
      setIsValid(false);
      return;
    }

    const sentence = sentenceArea.map(w => w.text).join(' ');
    
    console.log('Checking sentence:', sentence);
    console.log('Word types:', sentenceArea.map(w => `${w.text}(${w.type})`));
    
    let isStructureValid = false;
    let matchedStructure = '';
    
    try {
      // Try backend validation first
      matchedStructure = getFullStructCheck(sentence);
      isStructureValid = hasFullStructCheck(sentence);
      console.log('Backend validation:', isStructureValid, matchedStructure);
    } catch (error) {
      console.log('Backend failed, using simple validation');
      
      // SIMPLIFIED: just check for Subject + Verb (much cleaner now!)
      const hasSubject = sentenceArea.some(w => ['Subject', 'Noun'].includes(w.type));
      const hasVerb = sentenceArea.some(w => w.type === 'Verb');
      
      isStructureValid = hasSubject && hasVerb;
      
      if (isStructureValid) {
        // Get verb subtypes for detailed feedback
        const verbWords = sentenceArea.filter(w => w.type === 'Verb');
        const verbSubtypes = verbWords.map(v => getVerbSubtype(v.text));
        matchedStructure = `Subject-Verb structure (${verbSubtypes.join(', ')} tense)`;
      } else {
        matchedStructure = 'Invalid structure - needs Subject + Verb';
      }
      
      console.log('Simple validation - hasSubject:', hasSubject, 'hasVerb:', hasVerb);
    }

    const newTotalAttempts = totalAttempts + 1;
    setTotalAttempts(newTotalAttempts);
    
    let feedbackText = '';
    
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
        feedbackText = `🎉 CONGRATULATIONS! You've completed ${TARGET_CORRECT} correct sentences!\nFinal sentence: "${sentence}"`;
      } else {
        feedbackText = `✅ Great! "${sentence}" is correct!\nStructure: ${matchedStructure}\nProgress: ${newCorrectCount}/${TARGET_CORRECT} (${TARGET_CORRECT - newCorrectCount} more to go!)`;
      }
    } else {
      setStreak(0);
      
      setSessionHistory(prev => [...prev, {
        sentence,
        structure: 'Invalid',
        correct: false,
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      feedbackText = `❌ "${sentence}" needs a subject and a verb.\nTry patterns like "I walk" or "Cats ran".\nProgress: ${correctCount}/${TARGET_CORRECT} correct`;
    }

    setFeedback(feedbackText);
    setIsValid(isStructureValid);
    
    if (isStructureValid && !isCompleted && correctCount + 1 < TARGET_CORRECT) {
      setTimeout(() => {
        resetSentenceOnly();
      }, 2000);
    }
  };

  // ===== RESET FUNCTIONS =====
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