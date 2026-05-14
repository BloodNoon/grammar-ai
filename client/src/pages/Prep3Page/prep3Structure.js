import React from 'react';

// PREP3 COMPONENTS
import SentenceScramble from '../../utils/SentenceChecker/SentenceScramble';
import PrepositionBuilder from '../../utils/SentenceChecker/PrepositionBuilder';
import PrepositionQuizFinal from '../../utils/SentenceChecker/PrepositionQuizFinal';

const Prep3Structure = () => {
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
    td: {
      border: '1px solid #333',
      padding: '10px',
      fontSize: '14px',
      color: '#333',
      width: '50%'
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
        
     

        <h1 style={styles.mainTitle}>Compound Prepositions</h1>

        <div style={styles.mainContent}>
         
          <div style={styles.columnFlex}>
            <div style={{...styles.panel, ...styles.lessonPanel}}>
              <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#333'}}>Understanding Compound Prepositions</h2>
              <p style={{fontSize: '14px', lineHeight: '1.6', color: '#555', marginBottom: '15px'}}>
                A <strong>compound preposition</strong> is a phrase that works like a single preposition, connecting a noun or pronoun to another word in the sentence.
              </p>

              <table style={styles.table}>
                <tbody>
                  <tr>
                    <td style={styles.td}>According to</td>
                    <td style={styles.td}>As of</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>As well as</td>
                    <td style={styles.td}>Aside from</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Because of</td>
                    <td style={styles.td}>In addition to</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Ahead of</td>
                    <td style={styles.td}>Due to</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Along with</td>
                    <td style={styles.td}>Out of</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Next to</td>
                    <td style={styles.td}>Instead of</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>Prior to</td>
                    <td style={styles.td}>In respect to</td>
                  </tr>
                  <tr>
                    <td style={styles.td}>In spite of</td>
                    <td style={styles.td}>In place of</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{...styles.panel, ...styles.stretchPanel}}>
               <p style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#333'}}>
                 Usage Rules & Examples:
               </p>
               
               <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                  <div style={styles.patternCard}>
                    <div style={{ fontSize: '14px', color: '#333' }}>
                      <strong>1.</strong> She succeeded <strong>because of</strong> her hard work.
                    </div>
                  </div>
                  <div style={styles.patternCard}>
                    <div style={{ fontSize: '14px', color: '#333' }}>
                      <strong>2.</strong> <strong>In spite of</strong> the rain, we went for a walk.
                    </div>
                  </div>
                  <div style={styles.patternCard}>
                    <div style={{ fontSize: '14px', color: '#333' }}>
                      <strong>3.</strong> The decision was made <strong>according to</strong> the rules.
                    </div>
                  </div>
                  
                  <div style={{marginTop: '15px', padding: '15px', background: '#e3f2fd', borderRadius: '8px'}}>
                    <p style={{fontWeight: 'bold', fontSize: '14px', marginBottom: '10px'}}>💡 Quick Tips:</p>
                    <ul style={{fontSize: '13px', paddingLeft: '20px', margin: 0, color: '#444'}}>
                      <li style={{marginBottom: '5px'}}>Treat compound prepositions as single units.</li>
                      <li style={{marginBottom: '5px'}}>They are usually followed by a noun or gerund (-ing form).</li>
                      <li>Some can be replaced with single-word equivalents.</li>
                    </ul>
                  </div>
               </div>
            </div>
          </div>

          
          <div style={styles.columnFlex}>
            <div style={styles.videoPanel}>
              <h3 style={{ marginBottom: '15px', color: '#333', fontSize: '1.5rem' }}>📹 Today's Lesson</h3>
              <div style={{ position: 'relative', width: '100%', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                <video controls style={{ width: '100%', height: 'auto', display: 'block' }}>
                  <source src="/Lesson8.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            <div style={{...styles.panel, ...styles.stretchPanel}}>
              <h3 style={{marginBottom: '20px', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center'}}>
                Practice
              </h3>
              
              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '10px'}}>Practice 1: Sentence Scramble</h4>
              <SentenceScramble />
              <hr style={{margin: '25px 0', borderColor: '#eee'}} />
              
              <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '10px'}}>Practice 2: Preposition Builder</h4>
              <PrepositionBuilder />
            </div>
          </div>
        </div>

 
        <div style={styles.grammarReference}>
          <h2 style={{fontSize: '2rem', textAlign: 'center', marginBottom: '20px', color: '#333'}}>
            🏆 Final Quiz
          </h2>
          <PrepositionQuizFinal />
        </div>

      </div>
    </div>
  );
};

export default Prep3Structure;
