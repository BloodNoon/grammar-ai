import React from 'react';

// ADVERB COMPONENTS
import AdverbLesson from '../../utils/SentenceChecker/AdverbLesson';
import AdverbTypes from '../../utils/SentenceChecker/AdverbTypes';
import AdverbRoyalOrder from '../../utils/SentenceChecker/AdverbRoyalOrder';
import AdverbForms from '../../utils/SentenceChecker/AdverbForms';
import AdverbSentenceStructures from '../../utils/SentenceChecker/AdverbSentenceStructures';
import AdverbIdentificationGame from '../../utils/SentenceChecker/AdverbIdentificationGame';
import AdverbTypeSorting from '../../utils/SentenceChecker/AdverbTypeSorting';
import AdverbQuiz from '../../utils/SentenceChecker/AdverbQuiz';

const AdverbStructure = () => {

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
      top: '20px',
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
    columnFlex: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      height: '100%' 
    },
    stretchPanel: {
      flex: 1 
    },
    panel: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    },
    lessonPanel: {
      background: '#ffeaa7' 
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
        
      
     

      
        <h1 style={styles.mainTitle}>Adverb & Sentence Builder</h1>

       
        <div style={styles.mainContent}>
          
         
          <div style={styles.columnFlex}>
            
        
            <div style={{...styles.panel, ...styles.lessonPanel}}>
              <h2 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '15px', color: '#333'}}>
                 Introduction to Adverbs
              </h2>
              <p style={{fontSize: '18px', lineHeight: '1.6', color: '#555', marginBottom: '20px'}}>
                Discover <span style={{background: '#3F51B5', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', color: 'white'}}>adverbs</span> - the words that modify verbs, adjectives, and other adverbs! 
                Learn how to use them correctly and understand their flexible placement in sentences.
              </p>
              
              <div style={{background: 'rgba(255,255,255,0.6)', padding: '15px', borderRadius: '10px', border: '1px dashed #3F51B5'}}>
                <strong>Example:</strong> She runs <em>quickly</em>.<br />
                <span style={{fontSize: '14px', color: '#666'}}>In this sentence, "quickly" is an adverb describing how she runs.</span>
              </div>

              <div style={{ marginTop: '20px' }}>
                <AdverbLesson />
              </div>
            </div>

           
            <div style={styles.panel}>
              <h3 style={{marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold', color: '#2196F3'}}>
                🔤 Adverb Types
              </h3>
              <AdverbTypes />
            </div>
  
            <div style={{...styles.panel, ...styles.stretchPanel}}>
              <h3 style={{marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold', color: '#8BC34A'}}>
                📐 Adverb Forms
              </h3>
              <AdverbForms />
            </div>

          </div>

         
          <div style={styles.columnFlex}>
            
          
            <div style={styles.videoPanel}>
              <h3 style={{ marginBottom: '15px', color: '#333', fontSize: '1.5rem' }}>
                📹 Today's Lesson: Adverbs
              </h3>
              
              <div style={{ position: 'relative', width: '100%', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                <video controls style={{ width: '100%', height: 'auto', display: 'block' }}>
                  <source src="/adverbs1.mp4" type="video/mp4" />
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
              
              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#00BCD4', marginBottom: '10px'}}>
                Practice 1: Identification Game
              </h4>
              <AdverbIdentificationGame />
              
              <hr style={{margin: '25px 0', borderColor: '#eee'}} />
              
              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '10px'}}>
                Practice 2: Type Sorting
              </h4>
              <AdverbTypeSorting />
              
              <hr style={{margin: '25px 0', borderColor: '#eee'}} />
              
              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#FF5722', marginBottom: '10px'}}>
                Practice 3: Royal Order
              </h4>
              <AdverbRoyalOrder />

              <hr style={{margin: '25px 0', borderColor: '#eee'}} />
              
              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#9C27B0', marginBottom: '10px'}}>
                Practice 4: Sentence Structures
              </h4>
              <AdverbSentenceStructures />

            </div>
          </div>
        </div>

        
        <div style={styles.grammarReference}>
          <h2 style={{fontSize: '2rem', textAlign: 'center', marginBottom: '20px', color: '#333'}}>
            🏆 Final Adverb Quiz
          </h2>
          <AdverbQuiz />
        </div>

      </div>
    </div>
  );
};

export default AdverbStructure;