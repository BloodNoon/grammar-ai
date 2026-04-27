import React, { useState, useEffect } from 'react';

// PREP1 COMPONENTS
import PrepositionSorter from '../../utils/SentenceChecker/PrepositionSorter';
import PrepositionStructureGame from '../../utils/SentenceChecker/PrepositionStructureGame';
import PrepositionQuiz from '../../utils/SentenceChecker/PrepositionQuiz';
// import PrepositionFillBlanks from '../../utils/SentenceChecker/PrepositionFillBlanks';

const Prep1Structure = () => {
  const [showCongrats, setShowCongrats] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCongrats(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

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
      background: '#ffeaa7' // The exact Verb Tense yellow
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
    },
    // --- NEW TABLE STYLES TO MATCH VERB PAGE ---
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '15px',
      backgroundColor: 'white',
      border: '1px solid #333'
    },
    th: {
      border: '1px solid #333',
      padding: '10px',
      textAlign: 'left',
      backgroundColor: '#f8f9fa',
      fontWeight: 'bold',
      fontSize: '14px'
    },
    td: {
      border: '1px solid #333',
      padding: '10px',
      fontSize: '14px',
      color: '#333'
    },
    // --- NEW PATTERN CARD STYLES TO MATCH VERB PAGE ---
    patternCard: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }
  };

  const formulas = [
    { pattern: "#Pronoun #Verb #Preposition #Article #Noun", example: "She walked to the store." },
    { pattern: "#Article #Noun #Verb #Preposition #Article #Noun", example: "The dog ran through the yard." },
    { pattern: "#Article #Noun #Verb #Preposition #Article #Noun #Preposition #Article #Noun", example: "Mark gave the book to Sarah." },
    { pattern: "#Pronoun #Verb #Preposition #Article #Noun", example: "They talked about eating lunch." },
    { pattern: "#Preposition #Article #Noun, #Noun #Verb #Article #Noun", example: "After the movie, Jack ate the pizza." }
  ];

  return (
    <div style={styles.body}>
      <div style={styles.container}>

        <h1 style={styles.mainTitle}>Preposition & Phrase Builder</h1>

        {showCongrats && (
          <div style={{ backgroundColor: '#e8f5e8', border: '2px solid #28a745', borderRadius: '10px', padding: '1.5rem', transition: 'opacity 0.5s ease', maxWidth: '800px', margin: '0 auto 20px auto' }}>
            <h3 style={{ color: '#28a745', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>🎉 Almost there!</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
              You are making great progress! You've learned about subjects, objects, verb tenses, and articles. Let's master prepositions!
            </p>
          </div>
        )}

        <div style={styles.mainContent}>
          
          {/* ========================================== */}
          {/* LEFT COLUMN: Lesson & Formulas */}
          {/* ========================================== */}
          <div style={styles.columnFlex}>
            
            <div style={{...styles.panel, ...styles.lessonPanel}}>
              <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#333'}}>Understanding Prepositions</h2>
              <p style={{fontSize: '14px', lineHeight: '1.6', color: '#555', marginBottom: '15px'}}>
                A <strong>preposition</strong> is a word that indicates the relationship between a noun or pronoun and other words in a sentence. They often express relationships of time, place, direction, or situation.
              </p>

              {/* REPLACED THE LIST WITH A CLEAN VERB-STYLE TABLE */}
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Preposition Examples</th>
                    <th style={styles.th}>Sample Phrase</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{...styles.td, fontWeight: 'bold'}}>Time</td>
                    <td style={styles.td}>before, during, after</td>
                    <td style={styles.td}>...<em>during</em> the movie.</td>
                  </tr>
                  <tr>
                    <td style={{...styles.td, fontWeight: 'bold'}}>Place</td>
                    <td style={styles.td}>in, on, under</td>
                    <td style={styles.td}>...<em>under</em> the bed.</td>
                  </tr>
                  <tr>
                    <td style={{...styles.td, fontWeight: 'bold'}}>Direction</td>
                    <td style={styles.td}>to, through, around</td>
                    <td style={styles.td}>...<em>through</em> the door.</td>
                  </tr>
                  <tr>
                    <td style={{...styles.td, fontWeight: 'bold'}}>Situation</td>
                    <td style={styles.td}>with, for, about</td>
                    <td style={styles.td}>...<em>about</em> the test.</td>
                  </tr>
                  <tr>
                    <td style={{...styles.td, fontWeight: 'bold'}}>Comparison</td>
                    <td style={styles.td}>like, as, than</td>
                    <td style={styles.td}>...<em>like</em> a tiger.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{...styles.panel, ...styles.stretchPanel}}>
               <p style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#333'}}>
                 Learn your new sentence structures:
               </p>
               
               {/* REPLACED THE COLORED CSS BOXES WITH CLEAN PATTERN CARDS */}
               <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                  {formulas.map((item, index) => (
                    <div key={index} style={styles.patternCard}>
                      <div style={{ fontWeight: 'bold', color: '#555', marginBottom: '8px', fontSize: '13px', fontFamily: 'monospace' }}>
                        {item.pattern}
                      </div>
                      <div style={{ fontSize: '14px', color: '#333' }}>
                        <strong>Example:</strong> "{item.example}"
                      </div>
                    </div>
                  ))}
               </div>
            </div>

          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: Video & Interactive Games */}
          {/* ========================================== */}
          <div style={styles.columnFlex}>
            
            <div style={styles.videoPanel}>
              <h3 style={{ marginBottom: '15px', color: '#333', fontSize: '1.5rem' }}>
                📹 Today's Lesson: Prepositions
              </h3>
              
              <div style={{ position: 'relative', width: '100%', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                <video controls style={{ width: '100%', height: 'auto', display: 'block' }}>
                  <source src="/Lesson6.mp4" type="video/mp4" />
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
              
              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '10px'}}>
                Practice 1: Prepositions Sorter
              </h4>
              <PrepositionSorter />
              
              <hr style={{margin: '30px 0', borderColor: '#eee'}} />
              
              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '10px'}}>
                Practice 2: Preposition Fill-in-the-Blanks
              </h4>
              <div style={{background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #ddd'}}>
                {/* <PrepositionFillBlanks /> */}
                <p style={{fontSize: '18px', fontWeight: 'bold', color: '#333'}}>The boy is sitting ______ a chair.</p>
                <p style={{fontSize: '14px', color: '#666', marginTop: '10px', fontStyle: 'italic'}}>
                  (Fill-in-the-blank component will mount here)
                </p>
              </div>
              
              <hr style={{margin: '30px 0', borderColor: '#eee'}} />
              
              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '10px'}}>
                Practice 3: Structure Game
              </h4>
              <PrepositionStructureGame />
              
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* BOTTOM FULL WIDTH - Final Quiz */}
        {/* ========================================== */}
        <div style={styles.grammarReference}>
          <h2 style={{fontSize: '2rem', textAlign: 'center', marginBottom: '20px', color: '#333'}}>
            🏆 Final Preposition Quiz
          </h2>
          <PrepositionQuiz />
        </div>

      </div>
    </div>
  );
};

export default Prep1Structure;