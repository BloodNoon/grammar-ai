import React from 'react';
import './adjectivePage.css';

// ADJECTIVE COMPONENTS
import AdjectiveLesson from '../../utils/SentenceChecker/AdjectiveLesson';
import AdjectiveRoyalOrder from '../../utils/SentenceChecker/AdjectiveRoyalOrder';
import AdjectiveSentenceStructures from '../../utils/SentenceChecker/AdjectiveSentenceStructures';
import AdjectiveFillBlanks from '../../utils/SentenceChecker/AdjectiveFillBlanks';
import AdjectiveSortingGame from '../../utils/SentenceChecker/AdjectiveSortingGame';
import AdjectiveQuiz from '../../utils/SentenceChecker/AdjectiveQuiz';
import adjectivesData from '../../data/adjectives_questions.json';
import WordHunterGame from '../../components/wordHunter';

const AdjectivePage = () => {

  const styles = {
    body: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'rgba(249, 190, 134, 0.922)',
      minHeight: '100vh',
      padding: '20px',
      margin: 0
    },
    container: {
      margin: '0 auto',
      padding: '20px',
      textAlign: 'center'
    },
    navHeader: {
      color: 'rgb(8, 0, 0)',
      border: '2px solid white',
      borderRadius: '1rem',
      padding: '0.5rem 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      position: 'sticky',
      backgroundColor: 'rgba(249, 190, 134, 0.922)',
      marginBottom: '20px',
      zIndex: 100
    },
    Heading: {
      fontSize: '32px',
      margin: '0 auto',
      textAlign: 'center',
      fontWeight: '600',
      lineHeight: '1.2'
    },
    mainTitle: {
      fontSize: '40px',
      marginBottom: '1.5rem',
      marginTop: '1rem',
      textAlign: 'center',
      fontWeight: '700',
      color: '#333',
      lineHeight: '1.2'
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', 
      gap: '20px',
      marginTop: '35px',
      marginBottom: '20px',
      textAlign: 'left' 
    },
    
    // NEW: This makes the columns act like smart containers
    columnFlex: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      height: '100%' 
    },
    // NEW: This forces the bottom boxes to stretch downward
    stretchPanel: {
      flex: 1 
    },

    panel: {
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      // Notice we removed marginBottom here! The columnFlex gap handles it now.
    },
    lessonPanel: {
      background: '#ffeaa7' 
    },
    typingChallenge: {
      background: '#e3f2fd' 
    },
    videoPanel: {
      backgroundColor: '#f8f9fa',
      borderRadius: '15px',
      padding: '20px',
      border: '1px solid #ddd',
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },
    grammarReference: {
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      marginTop: '20px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      textAlign: 'left'
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>

        <h1 style={styles.mainTitle}>Adjective & Royal Order Builder</h1>

      
        <div style={styles.mainContent}>
          
       
          {/* Inside the Left Column container */}
<div style={styles.columnFlex}>
  
  
  <div style={{...styles.panel, ...styles.lessonPanel}}>
    <AdjectiveLesson />
  </div>

  
  <div style={{...styles.panel, ...styles.typingChallenge}}>
    <h3 style={{marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold', color: '#1565c0'}}>
      ✍️ Adjective Fill-in-the-Blank
    </h3>
    <AdjectiveFillBlanks />
  </div>

  {/* Word Hunter Box - Stretches to fill remaining space */}
  <div style={{...styles.panel, ...styles.stretchPanel, background: '#FAF5FF'}}>
    <WordHunterGame
      questions={adjectivesData.filter(q => q.exercise === "identifying")}
    />
  </div>

</div>

          
          <div style={styles.columnFlex}>
            
            <div style={styles.videoPanel}>
              <h3 style={{ marginBottom: '15px', color: '#333', fontSize: '1.5rem' }}>
                📹 Today's Lesson: Adjectives
              </h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px', lineHeight: '1.4' }}>
                Watch this lesson to understand how to use and order adjectives:
              </p>
              
              <div style={{ position: 'relative', width: '55%', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto' }}>
                <video controls style={{ width: '100%', height: '100%', display: 'block' }}>
                  <source src="/lesson4.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#888', fontStyle: 'italic' }}>
                💡 Watch the lesson before practicing with the exercises below
              </div>
            </div>

            
            <div style={{...styles.panel, ...styles.stretchPanel}}>
              <h3 style={{marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center'}}>
                Interactive Practice
              </h3>
              
              <AdjectiveRoyalOrder />
              
              <hr style={{margin: '25px 0', borderColor: '#eee'}} />
              
              <AdjectiveSentenceStructures />
              
              <hr style={{margin: '25px 0', borderColor: '#eee'}} />
              
              <AdjectiveSortingGame />
            </div>
          </div>
        </div>

        
        <div style={styles.grammarReference}>
          <h2 style={{fontSize: '2rem', textAlign: 'center', marginBottom: '20px', color: '#333'}}>
            🏆 Final Adjective Quiz
          </h2>
          <AdjectiveQuiz />
        </div>

      </div>
    </div>
  );
};

export default AdjectivePage;