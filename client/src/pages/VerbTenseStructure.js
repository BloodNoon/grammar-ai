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
// FIXED: Use word classification that matches backend patterns
function getWordType(word) {
  // Define word categories for grammatical classification (MATCHES BACKEND)
  const subjects = ['i', 'he', 'she', 'it', 'you', 'we', 'they'];
  const objects = ['me', 'him', 'her', 'it', 'your', 'us', 'them'];
  const determiners = ['the', 'a', 'an', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'our', 'their'];
  const adjectives = ['big', 'small', 'red', 'blue', 'happy', 'sad', 'quick', 'slow', 'beautiful', 'ugly', 'fast', 'tall', 'short', 'new', 'old', 'green', 'yellow', 'black', 'white', 'hot', 'cold', 'bright', 'dark', 'loud', 'quiet', 'soft', 'hard'];
  const nouns = ['dog', 'cat', 'house', 'car', 'book', 'tree', 'ball', 'bird', 'fish', 'apple', 'cats', 'dogs', 'children', 'dinner', 'work', 'ice', 'music', 'food', 'door', 'window', 'box', 'phone', 'computer', 'garden', 'flower', 'table', 'chair', 'pen', 'paper', 'water', 'movie', 'game', 'pizza', 'cake', 'cookies', 'shoes', 'clothes', 'money', 'time'];
  const adverbs = ['quickly', 'slowly', 'carefully', 'loudly', 'quietly', 'happily', 'sadly', 'well', 'badly', 'fast', 'hard', 'early', 'late', 'now', 'today', 'yesterday', 'tomorrow'];
  
  // EXPANDED VERB TYPES - they ALL return "Verb"
  const verbs = [
    // Present tense verbs
    'run', 'jump', 'eat', 'sleep', 'play', 'sing', 'dance', 'walk', 'fly', 'swim',
    'runs', 'jumps', 'eats', 'sleeps', 'plays', 'sings', 'dances', 'walks', 'flies', 'swims',
    'pet', 'pets', 'open', 'opens', 'close', 'closes', 'watch', 'watches', 'read', 'reads', 'write', 'writes',
    'drive', 'drives', 'cook', 'cooks', 'clean', 'cleans', 'study', 'studies', 'work', 'works', 'wake', 'wakes',
    'talk', 'talks', 'listen', 'listens', 'build', 'builds', 'draw', 'draws', 'paint', 'paints', 'fix', 'fixes',
    'break', 'breaks', 'make', 'makes',
    // Past tense verbs
    'ran', 'jumped', 'ate', 'slept', 'played', 'sang', 'danced', 'walked', 'flew', 'swam',
    'petted', 'opened', 'closed', 'watched', 'read', 'wrote', 'bought', 'sold', 'found', 'lost',
    'drove', 'cooked', 'cleaned', 'studied', 'worked', 'woke', 'talked', 'listened', 'built', 'drew',
    'painted', 'fixed', 'broke', 'made', 'taught', 'learned', 'helped',
    // Continuous verbs
    'running', 'jumping', 'eating', 'sleeping', 'playing', 'singing', 'dancing', 'walking', 'flying', 'swimming',
    'petting', 'opening', 'closing', 'watching', 'reading', 'writing', 'buying', 'selling', 'finding', 'losing',
    'driving', 'cooking', 'cleaning', 'studying', 'working', 'waking', 'talking', 'listening', 'building', 'drawing',
    'painting', 'fixing', 'breaking', 'making', 'teaching', 'learning', 'helping',
    // Auxiliary verbs
    'is', 'are', 'was', 'were', 'will', 'have', 'has', 'had', 'can', 'could', 'would', 'should', 'do', 'does', 'did', 'am',
    // Perfect verbs
    'eaten', 'slept', 'played', 'sung', 'danced', 'walked', 'flown', 'swum', 'gone', 'come', 'seen', 'made', 'taken',
    'written', 'bought', 'sold', 'found', 'lost', 'finished', 'driven', 'cooked', 'cleaned', 'studied', 'worked',
    'woken', 'talked', 'listened', 'built', 'drawn', 'painted', 'fixed', 'broken', 'taught', 'learned', 'helped',
    // Additional verb forms
    'chase', 'chases', 'chased', 'chasing', 'catch', 'catches', 'caught', 'catching', 
    'cook', 'cooks', 'cooked', 'cooking', 'love', 'loves', 'loved', 'loving'
  ];
  
  // Clean the word by removing punctuation and converting to lowercase
  const lowerWord = word.toLowerCase().replace(/[.,!?]/, '');
  
  // Check which category the word belongs to and return the type
  // Return 'Pronoun' for subject pronouns to match backend patterns
  if (subjects.includes(lowerWord)) return 'Pronoun'; // Changed from 'Subject' to 'Pronoun'
  if (objects.includes(lowerWord)) return 'Object';
  if (determiners.includes(lowerWord)) return 'Determiner';
  if (adjectives.includes(lowerWord)) return 'Adjective';
  if (nouns.includes(lowerWord)) return 'Noun';
  if (adverbs.includes(lowerWord)) return 'Adverb';
  if (verbs.includes(lowerWord)) return 'Verb';  // ALL VERBS RETURN "Verb"
  return 'Unknown';
}

// Helper function to get specific verb subtype for display purposes only
function getVerbSubtype(word) {
  const lowerWord = word.toLowerCase().replace(/[.,!?]/, '');
  
  const auxiliaryVerbs = ['is', 'are', 'was', 'were', 'will', 'have', 'has', 'had', 'could', 'would', 'should', 'can', 'do', 'does', 'did', 'am'];
  const presentVerbs = [
    'walks', 'walk', 'runs', 'run', 'eats', 'eat', 'chase', 'chases', 'catch', 'catches', 'cook', 'cooks', 
    'sing', 'sings', 'play', 'plays', 'pet', 'pets', 'open', 'opens', 'close', 'closes', 'watch', 'watches', 
    'read', 'reads', 'write', 'writes', 'drive', 'drives', 'fly', 'flies', 'swim', 'swims', 'dance', 'dances',
    'clean', 'cleans', 'study', 'studies', 'work', 'works', 'sleep', 'sleeps', 'wake', 'wakes', 'talk', 'talks',
    'listen', 'listens', 'build', 'builds', 'draw', 'draws', 'paint', 'paints', 'fix', 'fixes', 'break', 'breaks',
    'make', 'makes', 'jump', 'jumps'
  ];
  const pastVerbs = [
    'walked', 'ran', 'ate', 'chased', 'caught', 'cooked', 'sang', 'played', 'went', 'came', 'saw', 'made', 
    'petted', 'opened', 'closed', 'watched', 'read', 'wrote', 'bought', 'sold', 'found', 'lost', 'drove',
    'flew', 'swam', 'danced', 'cleaned', 'studied', 'worked', 'slept', 'woke', 'talked', 'listened', 'built',
    'drew', 'painted', 'fixed', 'broke', 'taught', 'learned', 'helped', 'jumped'
  ];
  const continuousVerbs = [
    'walking', 'running', 'eating', 'chasing', 'catching', 'cooking', 'singing', 'playing', 'petting', 
    'opening', 'closing', 'watching', 'reading', 'writing', 'buying', 'selling', 'finding', 'losing',
    'driving', 'flying', 'swimming', 'dancing', 'cleaning', 'studying', 'working', 'sleeping', 'waking',
    'talking', 'listening', 'building', 'drawing', 'painting', 'fixing', 'breaking', 'teaching', 'learning',
    'helping', 'jumping'
  ];
  const perfectVerbs = [
    'eaten', 'caught', 'sung', 'gone', 'come', 'seen', 'made', 'taken', 'finished', 'petted', 'opened', 
    'closed', 'watched', 'read', 'written', 'bought', 'sold', 'found', 'lost', 'driven', 'flown', 'swum',
    'danced', 'cooked', 'cleaned', 'studied', 'worked', 'slept', 'woken', 'talked', 'listened', 'built',
    'drawn', 'painted', 'fixed', 'broken', 'taught', 'learned', 'helped', 'jumped'
  ];
  
  if (auxiliaryVerbs.includes(lowerWord)) return 'Auxiliary';
  if (presentVerbs.includes(lowerWord)) return 'Present';
  if (pastVerbs.includes(lowerWord)) return 'Past';
  if (continuousVerbs.includes(lowerWord) || lowerWord.endsWith('ing')) return 'Continuous';
  if (perfectVerbs.includes(lowerWord)) return 'Perfect';
  
  return 'Verb';
}

// helper function to check if a sentence contains proper verb tense combinations
function analyzeVerbTenses(sentenceWords) {
  const verbAnalysis = {
    hasAuxiliary: false,
    hasMainVerb: false,
    auxiliaryType: null,
    mainVerbType: null,
    isValidCombination: false,
    feedback: ''
  };

  const auxiliaries = sentenceWords.filter(word => getVerbSubtype(word.text) === 'Auxiliary');
  const mainVerbs = sentenceWords.filter(word => {
    const subtype = getVerbSubtype(word.text);
    return ['Present', 'Past', 'Continuous', 'Perfect'].includes(subtype);
  });

  verbAnalysis.hasAuxiliary = auxiliaries.length > 0;
  verbAnalysis.hasMainVerb = mainVerbs.length > 0;

  if (auxiliaries.length > 0) {
    verbAnalysis.auxiliaryType = getVerbSubtype(auxiliaries[0].text);
  }
  if (mainVerbs.length > 0) {
    verbAnalysis.mainVerbType = getVerbSubtype(mainVerbs[0].text);
  }

  // validation logic
  if (verbAnalysis.hasAuxiliary && verbAnalysis.hasMainVerb) {
    const aux = auxiliaries[0].text.toLowerCase();
    const mainVerbSubtype = verbAnalysis.mainVerbType;

    // Valid combinations with better logic
    const validCombinations = {
      'am': ['Continuous', 'Present'], // "am running", "am happy"
      'is': ['Continuous', 'Perfect', 'Present'], // "is walking", "is eaten", "is good"
      'are': ['Continuous', 'Perfect', 'Present'], // "are running", "are made", "are nice"
      'was': ['Continuous', 'Perfect', 'Present'], // "was walking", "was eaten", "was happy"
      'were': ['Continuous', 'Perfect', 'Present'], // "were running", "were made", "were good"
      'will': ['Present'], // "will walk" (not continuous form)
      'have': ['Perfect', 'Present'], // "have eaten", "have time"
      'has': ['Perfect', 'Present'], // "has eaten", "has money"
      'had': ['Perfect', 'Present'], // "had eaten", "had fun"
      'can': ['Present'], // "can walk"
      'could': ['Present'], // "could walk"
      'would': ['Present'], // "would walk"
      'should': ['Present'], // "should walk"
      'do': ['Present'], // "do walk"
      'does': ['Present'], // "does walk"
      'did': ['Present'] // "did walk"
    };

    if (validCombinations[aux] && validCombinations[aux].includes(mainVerbSubtype)) {
      verbAnalysis.isValidCombination = true;
      verbAnalysis.feedback = `✅ Excellent verb tense combination: "${aux} ${mainVerbs[0].text}"`;
    } else {
      verbAnalysis.isValidCombination = false;
      verbAnalysis.feedback = `❌ Invalid verb combination: "${aux}" should not be used with "${mainVerbSubtype.toLowerCase()}" verbs like "${mainVerbs[0].text}". Try: ${validCombinations[aux] ? validCombinations[aux].join(' or ') : 'a different auxiliary'} verbs.`;
    }
  } else if (verbAnalysis.hasMainVerb && !verbAnalysis.hasAuxiliary) {
    // Simple tenses without auxiliaries - check for problematic cases
    const mainVerb = mainVerbs[0];
    const pronounSubjects = sentenceWords.filter(word => word.type === 'Pronoun'); // Changed from 'Subject' to 'Pronoun'
    
    if (pronounSubjects.length > 0 && verbAnalysis.mainVerbType === 'Continuous') {
      const pronoun = pronounSubjects[0].text.toLowerCase();
      // "I running" is wrong, should be "I am running" or "I run"
      verbAnalysis.isValidCombination = false;
      verbAnalysis.feedback = `❌ "${pronoun} ${mainVerb.text}" is incorrect. Use "${pronoun} am/is/are ${mainVerb.text}" for continuous tense, or use a simple present/past verb instead.`;
    } else {
      verbAnalysis.isValidCombination = true;
      verbAnalysis.feedback = `✅ Good simple ${verbAnalysis.mainVerbType.toLowerCase()} tense usage!`;
    }
  } else if (verbAnalysis.hasAuxiliary && !verbAnalysis.hasMainVerb) {
    verbAnalysis.isValidCombination = false;
    verbAnalysis.feedback = `❌ You have an auxiliary verb "${auxiliaries[0].text}" but no main verb. Add a main verb to complete the tense.`;
  } else {
    verbAnalysis.isValidCombination = false;
    verbAnalysis.feedback = `❌ Your sentence needs a verb to be complete.`;
  }

  return verbAnalysis;
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

  // ===== GREATLY EXPANDED VERB WORD BANK =====
  const verbWordBank = {
    Subject: ['I', 'He', 'She', 'It', 'You', 'We', 'They'], // Keep for internal reference
    Pronoun: ['I', 'He', 'She', 'It', 'You', 'We', 'They'], // Add Pronoun category for backend compatibility
    Object: ['me', 'him', 'her', 'it', 'you', 'us', 'them'],
    Determiner: ['The', 'A', 'An', 'This', 'That', 'My', 'Your', 'His', 'Her', 'Our', 'Their'],
    Adjective: ['big', 'small', 'red', 'blue', 'happy', 'beautiful', 'fast', 'slow', 'tall', 'short', 'new', 'old', 'green', 'yellow', 'black', 'white', 'hot', 'cold', 'bright', 'dark', 'loud', 'quiet', 'soft', 'hard'],
    Noun: ['dog', 'cat', 'house', 'car', 'book', 'tree', 'ball', 'bird', 'fish', 'apple', 'cats', 'dogs', 'children', 'door', 'window', 'box', 'phone', 'computer', 'garden', 'flower', 'table', 'chair', 'pen', 'paper', 'water', 'food', 'music', 'movie', 'game', 'pizza', 'cake', 'cookies', 'shoes', 'clothes', 'money', 'time'],
    Conjunction: ['and', 'or'],
    Adverb: ['quickly', 'slowly', 'carefully', 'loudly', 'quietly', 'happily', 'sadly', 'well', 'badly', 'fast', 'hard', 'early', 'late', 'now', 'today', 'yesterday', 'tomorrow'],
    
    // GREATLY EXPANDED VERB TYPES for better learning
    Auxiliary: ['is', 'are', 'was', 'were', 'will', 'have', 'has', 'had', 'can', 'could', 'would', 'should', 'do', 'does', 'did', 'am'],
    Present: [
      'run', 'runs', 'jump', 'jumps', 'eat', 'eats', 'walk', 'walks', 'play', 'plays', 'sing', 'sings', 
      'pet', 'pets', 'open', 'opens', 'close', 'closes', 'watch', 'watches', 'read', 'reads', 'write', 'writes',
      'drive', 'drives', 'fly', 'flies', 'swim', 'swims', 'dance', 'dances', 'cook', 'cooks', 'clean', 'cleans',
      'study', 'studies', 'work', 'works', 'sleep', 'sleeps', 'wake', 'wakes', 'talk', 'talks', 'listen', 'listens',
      'build', 'builds', 'draw', 'draws', 'paint', 'paints', 'fix', 'fixes', 'break', 'breaks', 'make', 'makes'
    ],
    Past: [
      'ran', 'jumped', 'ate', 'walked', 'played', 'sang', 'went', 'came', 'saw', 'made', 
      'petted', 'opened', 'closed', 'watched', 'read', 'wrote', 'bought', 'sold', 'found', 'lost',
      'drove', 'flew', 'swam', 'danced', 'cooked', 'cleaned', 'studied', 'worked', 'slept', 'woke',
      'talked', 'listened', 'built', 'drew', 'painted', 'fixed', 'broke', 'taught', 'learned', 'helped'
    ],
    Continuous: [
      'running', 'jumping', 'eating', 'walking', 'playing', 'singing', 'going', 'coming', 'seeing', 'making', 
      'petting', 'opening', 'closing', 'watching', 'reading', 'writing', 'buying', 'selling', 'finding', 'losing',
      'driving', 'flying', 'swimming', 'dancing', 'cooking', 'cleaning', 'studying', 'working', 'sleeping', 'waking',
      'talking', 'listening', 'building', 'drawing', 'painting', 'fixing', 'breaking', 'teaching', 'learning', 'helping'
    ],
    Perfect: [
      'run', 'jumped', 'eaten', 'walked', 'played', 'sung', 'gone', 'come', 'seen', 'made', 'taken', 'finished', 
      'petted', 'opened', 'closed', 'watched', 'read', 'written', 'bought', 'sold', 'found', 'lost',
      'driven', 'flown', 'swum', 'danced', 'cooked', 'cleaned', 'studied', 'worked', 'slept', 'woken',
      'talked', 'listened', 'built', 'drawn', 'painted', 'fixed', 'broken', 'taught', 'learned', 'helped'
    ]
  };

  // Updated structure examples with better descriptions matching the patterns
  const verbStructureExamples = [
    { 
      pattern: '#Pronoun #Verb', 
      example: 'She runs.', 
      description: '#Pronoun #Verb',
      level: 'beginner'
    },
    { 
      pattern: '#Determiner #Noun #Verb', 
      example: 'The dog runs.', 
      description: '#Determiner #Noun #Verb',
      level: 'beginner'
    },
    { 
      pattern: '#Pronoun #Verb #Determiner #Noun', 
      example: 'I see the cat.', 
      description: '#Pronoun #Verb #Determiner #Noun',
      level: 'intermediate'
    },
    { 
      pattern: '#Pronoun #Verb (#Adjective|#Noun|#Adverb)', 
      example: 'He was running.', 
      description: '#Pronoun #Verb (#Adjective|#Noun|#Adverb)',
      level: 'intermediate'
    },
    { 
      pattern: '#Determiner #Adjective #Noun #Verb', 
      example: 'The big dog runs.', 
      description: '#Determiner #Adjective #Noun #Verb',
      level: 'advanced'
    },
    { 
      pattern: '#Pronoun #Verb #Determiner #Adjective #Noun', 
      example: 'I have eaten the red apple.', 
      description: '#Pronoun #Verb #Determiner #Adjective #Noun',
      level: 'advanced'
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
    
    // Extract realistic words from test cases
    const wordsFromTestCases = testCases.flatMap(tc => 
      tc.sentence.split(' ').map(word => word.replace(/[.,!?]/, ''))
    );
    
    if (selectedStructure) {
      // Generate words for selected structure
      const structure = selectedStructure;
      if (structure.includes('#Subject') || structure.includes('#Pronoun')) {
        words.push(...verbWordBank.Pronoun.slice(0, 3)); // Use Pronoun array for both
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
      if (structure.includes('#Verb') || structure.includes('#Auxiliary')) {
        // Include all verb types when structure asks for verbs
        words.push(...verbWordBank.Auxiliary.slice(0, 3));
        words.push(...verbWordBank.Present.slice(0, 3));
        words.push(...verbWordBank.Past.slice(0, 2));
        words.push(...verbWordBank.Continuous.slice(0, 2));
        words.push(...verbWordBank.Perfect.slice(0, 2));
      }
      if (structure.includes('(and|or)')) {
        words.push(...verbWordBank.Conjunction);
      }
    } else {
      // Generate words based on difficulty level with separated verb types
      const counts = {
        beginner: { 
          Pronoun: 4, Determiner: 4, Noun: 6, // Use Pronoun instead of Subject
          // Include verb types that beginners need
          Auxiliary: 3, Present: 5, Past: 3
        },
        intermediate: { 
          Pronoun: 4, Determiner: 5, Adjective: 6, Noun: 8, // Use Pronoun instead of Subject
          Auxiliary: 5, Present: 6, Past: 5, Continuous: 4, Conjunction: 2, Adverb: 3
        },
        advanced: { 
          Pronoun: 4, Object: 4, Determiner: 6, Adjective: 8, Noun: 10, // Use Pronoun instead of Subject
          Auxiliary: 6, Present: 8, Past: 6, Continuous: 6, Perfect: 5, Conjunction: 2, Adverb: 5
        }
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
    const combinedWords = [...new Set([...words])];
    
    setAvailableWords(shuffleArray(combinedWords).map((word, index) => ({
      id: `verb-word-${index}`,
      text: word,
      type: getWordType(word),  // Use backend-compatible word type (returns "Subject" for pronouns)
      subtype: getVerbSubtype(word) // Add subtype for display colors
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

  // ===== ENHANCED SENTENCE CHECKING WITH VERB ANALYSIS =====
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
      // Analyze verb tenses first
      const verbAnalysis = analyzeVerbTenses(sentenceArea);
      
      // Use backend functions to analyze sentence structure
      const matchedStructure = getFullStructCheck(sentence);
      const isStructureValid = selectedStructure ? 
        hasFullStructCheck(sentence, selectedStructure) : 
        hasFullStructCheck(sentence);

      const newTotalAttempts = totalAttempts + 1;
      setTotalAttempts(newTotalAttempts);
      
      let feedbackText = '';
      
      // Check both structure validity and verb tense validity
      const isVerbTenseValid = verbAnalysis.isValidCombination;
      const overallValid = isStructureValid && isVerbTenseValid;
      
      if (selectedStructure) {
        // Handle feedback when practicing a specific structure
        if (overallValid) {
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
            feedbackText = `🎉 CONGRATULATIONS! You've successfully completed ${TARGET_CORRECT} correct sentences!\nFinal sentence: "${sentence}" matches the target structure: "${selectedStructure}"\n${verbAnalysis.feedback}`;
          } else {
            feedbackText = `✅ Excellent! Your sentence "${sentence}" matches the target structure: "${selectedStructure}"\n${verbAnalysis.feedback}\nProgress: ${newCorrectCount}/${TARGET_CORRECT} correct (${TARGET_CORRECT - newCorrectCount} more to go!)`;
          }
        } else {
          setStreak(0);
          
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: selectedStructure,
            correct: false,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          feedbackText = `❌ Your sentence "${sentence}" has issues:\n`;
          
          if (!isStructureValid) {
            feedbackText += `• Structure: doesn't match target "${selectedStructure}".`;
            if (matchedStructure) {
              feedbackText += ` It follows: "${matchedStructure}" instead.`;
            }
            feedbackText += '\n';
          }
          
          if (!isVerbTenseValid) {
            feedbackText += `• Verb Tense: ${verbAnalysis.feedback}\n`;
          }
          
          feedbackText += `Try again! Progress: ${correctCount}/${TARGET_CORRECT} correct`;
        }
      } else {
        // Handle feedback when practicing freely
        if (overallValid) {
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
            feedbackText = `🎉 CONGRATULATIONS! You've successfully completed ${TARGET_CORRECT} correct sentences!\nFinal sentence: "${sentence}" follows a valid structure: "${matchedStructure}"\n${verbAnalysis.feedback}`;
          } else {
            feedbackText = `✅ Great! Your sentence "${sentence}" follows a valid structure: "${matchedStructure}"\n${verbAnalysis.feedback}\nProgress: ${newCorrectCount}/${TARGET_CORRECT} correct (${TARGET_CORRECT - newCorrectCount} more to go!)`;
          }
        } else {
          setStreak(0);
          
          setSessionHistory(prev => [...prev, {
            sentence,
            structure: 'Invalid',
            correct: false,
            timestamp: new Date().toLocaleTimeString()
          }]);
          
          feedbackText = `❌ Your sentence "${sentence}" needs improvements:\n`;
          
          if (!isStructureValid) {
            feedbackText += `• Structure: needs to follow proper grammar patterns.\n`;
          }
          
          if (!isVerbTenseValid) {
            feedbackText += `• Verb Tense: ${verbAnalysis.feedback}\n`;
          }
          
          feedbackText += `Try again! Progress: ${correctCount}/${TARGET_CORRECT} correct`;
        }
      }

      setFeedback(feedbackText);
      setIsValid(overallValid);
      
      // Auto-reset after successful attempt
      if (overallValid && !isCompleted && correctCount + 1 < TARGET_CORRECT) {
        setTimeout(() => {
          resetSentenceOnly();
        }, 3000); // Give more time to read verb feedback
      }
      
    } catch (error) {
      console.error('Sentence checking error:', error);
      setTotalAttempts(totalAttempts + 1);
      setFeedback('Error checking sentence. Please try again.');
      setIsValid(false);
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