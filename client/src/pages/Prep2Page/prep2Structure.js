import React from 'react';

// PREP2 COMPONENTS
import PrepositionPhraseLesson from '../../utils/SentenceChecker/PrepositionPhraseLesson';
import PrepositionPhraseFillBlanks from '../../utils/SentenceChecker/PrepositionPhraseFillBlanks';
import PrepositionPhraseWordBlocks from '../../utils/SentenceChecker/PrepositionPhraseWordBlocks';
import PrepositionPhraseTesting from '../../utils/SentenceChecker/PrepositionPhraseTesting';
import PrepositionPhraseSorting from '../../utils/SentenceChecker/PrepositionPhraseSorting';

const Prep2Structure = () => {
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
    },
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
    patternCard: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        
        
        <h1 style={styles.mainTitle}>Prepositional Phrases</h1>

        <div style={styles.mainContent}>
          
          <div style={styles.columnFlex}>
            <div style={{...styles.panel, ...styles.lessonPanel}}>
              <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#333'}}>Understanding Prepositional Phrases</h2>
              <p style={{fontSize: '14px', lineHeight: '1.6', color: '#555', marginBottom: '15px'}}>
                A <strong>prepositional phrase</strong> is a group of words that begins with a preposition and ends with a noun or pronoun. It adds detail about time, place, or manner.
              </p>

              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Function</th>
                    <th style={styles.th}>What it does</th>
                    <th style={styles.th}>Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{...styles.td, fontWeight: 'bold'}}>Adverbial</td>
                    <td style={styles.td}>Modifies verbs</td>
                    <td style={styles.td}>She ran <em>with speed</em>.</td>
                  </tr>
                  <tr>
                    <td style={{...styles.td, fontWeight: 'bold'}}>Adjectival</td>
                    <td style={styles.td}>Modifies nouns</td>
                    <td style={styles.td}>The book <em>on the table</em> is mine.</td>
                  </tr>
                  <tr>
                    <td style={{...styles.td, fontWeight: 'bold'}}>Complement</td>
                    <td style={styles.td}>Completes the meaning</td>
                    <td style={styles.td}>We rely <em>on you</em>.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{...styles.panel, ...styles.stretchPanel}}>
               <p style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#333'}}>
                 Anatomy of a Prepositional Phrase:
               </p>
               
               <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                  <div style={styles.patternCard}>
                    <div style={{ fontWeight: 'bold', color: '#555', marginBottom: '8px', fontSize: '13px', fontFamily: 'monospace' }}>
                      #Preposition + (Modifiers/Article) + #Noun/#Pronoun
                    </div>
                    <div style={{ fontSize: '14px', color: '#333' }}>
                      <strong>Example:</strong> "in the house"
                    </div>
                    <div style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>
                      <em>"in" (preposition) + "the" (article) + "house" (noun)</em>
                    </div>
                  </div>
               </div>
            </div>
          </div>

          
          <div style={styles.columnFlex}>
            <div style={styles.videoPanel}>
              <h3 style={{ marginBottom: '15px', color: '#333', fontSize: '1.5rem' }}>📹 Today's Lesson</h3>
              <div style={{ position: 'relative', width: '100%', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                <video controls style={{ width: '100%', height: 'auto', display: 'block' }}>
                  <source src="/Lesson7.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            <div style={{...styles.panel, ...styles.stretchPanel}}>
              <h3 style={{marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center'}}>
                Practice
              </h3>
              
              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '10px'}}>Practice 1: Phrase Lesson</h4>
              <PrepositionPhraseLesson />
              <hr style={{margin: '20px 0', borderColor: '#eee'}} />
              
              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '10px'}}>Practice 2: Fill in the Blanks</h4>
              <PrepositionPhraseFillBlanks />
              <hr style={{margin: '20px 0', borderColor: '#eee'}} />
              
              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '10px'}}>Practice 3: Word Blocks</h4>
              <PrepositionPhraseWordBlocks />
              <hr style={{margin: '20px 0', borderColor: '#eee'}} />

              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '10px'}}>Practice 4: Sorting Game</h4>
              <PrepositionPhraseSorting />
            </div>
          </div>
        </div>

        
        <div style={styles.grammarReference}>
          <h2 style={{fontSize: '2rem', textAlign: 'center', marginBottom: '20px', color: '#333'}}>
            🏆 Final Phrase Test
          </h2>
          <PrepositionPhraseTesting />
        </div>

      </div>
    </div>
  );
};

export default Prep2Structure;
