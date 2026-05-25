import { Box, Heading, Text } from '@chakra-ui/react';
import React from "react";
import { hasFullStructCheck, getFullStructCheck, getTags } from '../utils/SentenceChecker/StructureChecker';
import { testCases } from '../utils/SentenceChecker/TestCases';

import PronounSentenceBuilder from "./PronounSentenceBuilder";
import PronounCompletionCelebration from "./PronounCompletionCelebration";
import PronounWordBank from "./PronounWordBank";
import PronounCompletionCelebration from "./PronounCompletionCelebration";
import PronounActionButton from "./PronounActionButton";
import PronounFeedbackDisplay from "./PronounFeedbackDisplay";
import PronounQuiz from "./PronounQuiz";
import PronounProgressTracker from "./PronounProgressTracker";
import PronounSentenceBuilder from "./PronounSentenceBuilder";


function getWordType(word) {
  // Define word categories for grammatical classification (MATCHES BACKEND)
  const subject = ['i', 'he', 'she', 'it', 'you', 'we', 'they'];
  const object = ['me', 'him', 'her', 'it', 'your', 'us', 'them'];
  const possessive = ['mine', 'ours', 'yours', 'his', 'hers', 'theirs', 'whose'];
  const reflexive = ['myself', 'ourselves', 'yourself', 'himself', 'herself', 'themself', 'itself'];
  
  // Clean the word by removing punctuation and converting to lowercase
  const lowerWord = word.toLowerCase().replace(/[.,!?]/, '');
  
 
  // Return 'Pronoun' for subject pronouns to match backend patterns
  if (subject.includes(lowerWord)) return 'Pronoun'; // Changed from 'Subject' to 'Pronoun'
  if (object.includes(lowerWord)) return 'Object';
  if (possessive.includes(lowerWord)) return 'Possessive';
  if (reflexive.includes(lowerWord)) return 'Reflexive';
  return 'Unknown';
}
const PronounTenseStructure = () => {
  
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

  // ===== RENDER =====
  return (
    <Box style={styles.body}>
      <Box style={styles.container}>
        {/* Navigation Header */}
        <header style={styles.navHeader}>
          <h1 style={styles.Heading}>🐸 Sentence Structure Practice</h1>
        </header>

        {/* Main Title */}
        <h1 style={styles.mainTitle}>Verb Tense & Auxiliary Verb Builder</h1>

        {/* Main Two-Column Layout */}
        <Box style={styles.mainContent}>
          {/* LEFT COLUMN */}
          <Box>
            {/* Top Left - VerbTenseLesson */}
            <Box style={{...styles.panel, ...styles.lessonPanel, marginBottom: '20px'}}>
              <VerbTenseLesson 
                sentenceFeedback={sentenceFeedback}
                handleVerbSentenceChoice={handleVerbSentenceChoice}
              />
            </Box>

            {/* Bottom Left - Verb Tense Typing Challenge */}
            <Box style={{...styles.panel, ...styles.typingChallenge}}>
              <PronounQuiz 
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
            </Box>
          </Box>

          {/* RIGHT COLUMN */}
          <Box>
            {/* Top Right - Today's Lesson Video */}
            <Box sx={{
              backgroundColor: 'gray.50',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px',
              border: '1px solid gray.200',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <Heading as="h3" size="md" sx={{ 
                marginBottom: '15px',
                color: 'gray.700',
                fontSize: '1.5rem'
              }}>
                📹 Today's Lesson: Verb
              </Heading>
              <Text sx={{
                fontSize: '14px',
                color: 'gray.500',
                marginBottom: '15px',
                lineHeight: '1.4'
              }}>
                Watch this lesson to understand pronouns and sentence building:
              </Text>
              <Box style={{
                position: 'relative',
                width: '100%',
                maxWidth: '100%',
                margin: '0 auto',
                backgroundColor: 'black',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}>
                <video 
                  controls
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                  poster="/api/placeholder/400/225"
                >
                  <source src="lesson2.mp4" type="video/mp4" />
                  <Text sx={{ 
                    color: 'gray.500', 
                    padding: '20px',
                    backgroundColor: 'gray.50'
                  }}>
                    Your browser does not support the video tag. 
                    <a href="lesson2.mp4" style={{ color: 'blue.500' }}>
                      Click here to download the video
                    </a>
                  </Text>
                </video>
              </Box>
              <Box style={{
                marginTop: '10px',
                fontSize: '12px',
                color: '#888',
                fontStyle: 'italic'
              }}>
                💡 Watch the lesson before practicing with the drag & drop exercises below
              </Box>
            </Box>

            {/* Middle Right - Drag & Drop Sections */}
            <Box style={styles.panel}>
              {/* Status Badges
              <Box style={styles.statusBadges}>
                <Box style={{...styles.badge, ...styles.correct}}>
                  Correct: {correctCount}
                </Box>
                <Box style={{...styles.badge, ...styles.accuracy}}>
                  Accuracy: {totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0}%
                </Box>
                <Box style={{...styles.badge, ...styles.incorrect}}>
                  Incorrect: {totalAttempts - correctCount}
                </Box>
                <Box style={{...styles.badge, ...styles.streak}}>
                  Streak: {streak}
                </Box>
              </Box> */}

              <PronounProgressTracker 
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

              <PronounCompletionCelebration 
                isCompleted={isCompleted}
                correctCount={correctCount}
                totalAttempts={totalAttempts}
                resetProgress={resetProgress}
              />

              <PronounWordBank 
                availableWords={availableWords}
                handleDragStart={handleDragStart}
              />

              <PronounSentenceBuilder 
                sentenceArea      
                removeFromSentence
                handleDragOver    
                handleDrop         
              />

              <PronounActionButtons 
                checkSentence={checkSentence}
                resetSentenceOnly={resetSentenceOnly}
                generatePronounSetFromTestCases={generatePronounSetFromTestCases}
                sentenceArea={sentenceArea}
                isCompleted={isCompleted}
              />

              <PronounFeedbackDisplay
                feedback={feedback}
              />
            </Box>
          </Box>
        </Box>

       
        </Box>
      </Box>
    
  );

}

export default PronounTenseStructure;