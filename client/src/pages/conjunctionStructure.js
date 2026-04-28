import React, { useState, useEffect } from 'react';

// CONJUNCTION COMPONENTS
import ConjunctionSorter from './../utils/SentenceChecker/ConjunctionSorter';
import ConjunctionFillBlanks from './../utils/SentenceChecker/ConjunctionFillBlanks';
import ConjunctionStructureGame from './../utils/SentenceChecker/ConjunctionStructureGame';


const ConjunctionStructure = () => {
  const [showCongrats, setShowCongrats] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowCongrats(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const styles = {
    body: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', background: 'rgba(249, 190, 134, 0.922)', minHeight: '100vh', padding: '20px', margin: 0 },
    container: { margin: '0 auto', padding: '20px', textAlign: 'center', maxWidth: '1400px' },
    navHeader: { color: 'rgb(8, 0, 0)', border: '2px solid white', borderRadius: '1rem', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', position: 'sticky', top: '20px', backgroundColor: 'rgba(249, 190, 134, 0.922)', marginBottom: '20px', zIndex: 100 },
    Heading: { fontSize: '32px', margin: '0 auto', textAlign: 'center', fontWeight: '600', lineHeight: '1.2' },
    mainTitle: { fontSize: '40px', marginBottom: '1.5rem', marginTop: '1rem', textAlign: 'center', fontWeight: '700', color: '#333', lineHeight: '1.2' },
    mainContent: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '35px', marginBottom: '20px', textAlign: 'left' },
    columnFlex: { display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' },
    stretchPanel: { flex: 1 },
    panel: { background: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
    lessonPanel: { background: '#ffeaa7' },
    videoPanel: { backgroundColor: '#f8f9fa', borderRadius: '15px', padding: '20px', border: '1px solid #ddd', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
    grammarReference: { background: 'white', borderRadius: '15px', padding: '20px', marginTop: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'left' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px', backgroundColor: 'white', border: '1px solid #333' },
    th: { border: '1px solid #333', padding: '10px', textAlign: 'left', backgroundColor: '#f8f9fa', fontWeight: 'bold', fontSize: '14px' },
    td: { border: '1px solid #333', padding: '8px', fontSize: '13px', color: '#333' },
    patternCard: { backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '8px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '15px' },
    exampleBox: { background: 'rgba(255,255,255,0.7)', padding: '12px', borderRadius: '8px', border: '1px dashed #333', fontSize: '14px', marginBottom: '10px' }
  };

  const complexStructures = [
    { level: 1, pattern: "Pronoun + Be Verb + Adjective + SUB CONJ + Pronoun + Be Verb + Adjective", example: "He is quickly happy because she is calmly cheerful." },
    { level: 2, pattern: "Article + Noun + Be Verb + Adjective + SUB CONJ + Article + Noun + Be Verb + Adjective", example: "The dog is playfully happy although the cat is quietly content." },
    { level: 3, pattern: "Article + Adjective + Noun + Be Verb + Adjective + SUB CONJ + Article + Adjective + Noun + Be Verb + Adjective", example: "Quickly, the small dog is friendly while cautiously, the large cat is reserved." },
    { level: 4, pattern: "Pronoun + Verb + Preposition + Article + Adjective + Noun + SUB CONJ + Pronoun + Verb + Preposition + Article + Adjective + Noun", example: "She sings beautifully to the bright crowd after he plays softly for the eager audience." },
    { level: 5, pattern: "Article + Adjective + Noun + Verb + Article + Adjective + Noun + SUB CONJ + Article + Adjective + Noun + Verb + Article + Adjective + Noun", example: "Since the young student writes carefully a difficult essay, the diligent scholar solves methodically a complex problem." },
    { level: 6, pattern: "Article + Adjective + Noun + Preposition + Article + Adjective + Noun + Verb + Preposition... [Complex Phrasal]", example: "While the excited class in the noisy room slowly discusses a new project in the large hall, the determined group in the quiet library carefully prepares an important report in the old building." },
    { level: 7, pattern: "Article + Adjective + Noun + Verb + Preposition + Article + Adjective + Noun + CONJ + Article + Adjective + Noun + SUB CONJ...", example: "Because the clever fox jumps quickly over the lazy dog and the small cat, the sly wolf runs swiftly past the tired horse and the old goat." }
  ];

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        
     

        <h1 style={styles.mainTitle}>Conjunctions</h1>

        {showCongrats && (
          <div style={{ backgroundColor: '#e8f5e8', border: '2px solid #28a745', borderRadius: '10px', padding: '1.5rem', transition: 'opacity 0.5s ease', maxWidth: '800px', margin: '0 auto 20px auto' }}>
            <h3 style={{ color: '#28a745', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>🎉 Great job!</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#333' }}>
              You have mastered the basic parts of speech. Now, let's learn how to glue them together into longer, complex sentences using conjunctions!
            </p>
          </div>
        )}

        <div style={styles.mainContent}>
          
       
          <div style={styles.columnFlex}>
            
            <div style={{...styles.panel, ...styles.lessonPanel}}>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: '#333'}}>Types of Conjunctions</h2>
              <p style={{fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '25px'}}>
                A <strong>conjunction</strong> is the "glue" of the English language. It connects words, phrases, or entirely independent clauses together so your writing doesn't sound choppy.
              </p>
              
              <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#d35400'}}>1. Coordinating Conjunctions (FANBOYS)</h3>
              <p style={{fontSize: '14px', color: '#555', marginBottom: '10px'}}>
                These connect two ideas that have <strong>equal importance</strong> (like two independent clauses). If you put one of these between two complete sentences, you must use a comma.
              </p>
              <div style={styles.exampleBox}>
                <strong>Example:</strong> I wanted to go to the park, <strong>but</strong> it started raining.
              </div>
              <table style={styles.table}>
                <tbody>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>F</td><td style={styles.td}>For</td><td style={styles.td}>Reason or purpose</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>A</td><td style={styles.td}>And</td><td style={styles.td}>Addition</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>N</td><td style={styles.td}>Nor</td><td style={styles.td}>Non-contrasting negative ideas</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>B</td><td style={styles.td}>But</td><td style={styles.td}>Contrast</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>O</td><td style={styles.td}>Or</td><td style={styles.td}>Choice</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>Y</td><td style={styles.td}>Yet</td><td style={styles.td}>Contrast or exception</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>S</td><td style={styles.td}>So</td><td style={styles.td}>Result or consequence</td></tr>
                </tbody>
              </table>

              <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#8e44ad', marginTop: '30px'}}>2. Correlative Conjunctions (Pairs)</h3>
              <p style={{fontSize: '14px', color: '#555', marginBottom: '10px'}}>
                These conjunctions always travel in <strong>pairs</strong>. You use them to link two balanced options, actions, or ideas together in the same sentence. 
              </p>
              <div style={styles.exampleBox}>
                <strong>Example:</strong> <strong>Not only</strong> is she a great singer, <strong>but also</strong> a talented dancer.
              </div>
              <table style={styles.table}>
                <tbody>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>Not only... but also</td><td style={styles.td}>Emphasizes two qualities or actions</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>Both... and</td><td style={styles.td}>Includes two things together</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>Either... or</td><td style={styles.td}>Chooses between two options</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>Neither... nor</td><td style={styles.td}>Excludes both options</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>No sooner... than</td><td style={styles.td}>Something happens immediately after another</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>As... as</td><td style={styles.td}>Compares two things equally</td></tr>
                </tbody>
              </table>

              <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#2980b9', marginTop: '30px'}}>3. Subordinating Conjunctions (AWUBIS)</h3>
              <p style={{fontSize: '14px', color: '#555', marginBottom: '10px'}}>
                These attach to the front of a clause and make it <strong>dependent</strong> (meaning it can't stand alone anymore). They establish a relationship of time, cause, or condition with the main sentence.
              </p>
              <div style={styles.exampleBox}>
                <strong>Example:</strong> We stayed inside <strong>because</strong> the storm was getting worse.
              </div>
              <table style={styles.table}>
                <tbody>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>Time</td><td style={styles.td}>after, before, until, when, while</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>Cause / Effect</td><td style={styles.td}>because, since, so that</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>Contrast</td><td style={styles.td}>although, even though, whereas</td></tr>
                  <tr><td style={{...styles.td, fontWeight: 'bold'}}>Condition</td><td style={styles.td}>if, unless, provided that</td></tr>
                </tbody>
              </table>
            </div>

            <div style={{...styles.panel, ...styles.stretchPanel}}>
               <p style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#333'}}>
                 7 Complex Sentence Structures:
               </p>
               <p style={{fontSize: '14px', color: '#555', marginBottom: '15px'}}>
                 You can place subordinating conjunctions in the middle of a sentence, or <strong>"front-load"</strong> them at the beginning. If you front-load them, you MUST use a comma!
               </p>

               <div>
                  {complexStructures.map((struct, index) => (
                    <div key={index} style={styles.patternCard}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 'bold', color: '#2980b9', fontSize: '14px' }}>Level {struct.level}</span>
                      </div>
                      <div style={{ color: '#555', marginBottom: '8px', fontSize: '13px', fontFamily: 'monospace', lineHeight: '1.4' }}>
                        {struct.pattern}
                      </div>
                      <div style={{ fontSize: '14px', color: '#333', background: 'white', padding: '10px', borderRadius: '6px', border: '1px dashed #ccc' }}>
                        <strong>Example:</strong> "{struct.example}"
                      </div>
                    </div>
                  ))}
               </div>
            </div>

          </div>

      
          <div style={styles.columnFlex}>
            
          
            <div style={styles.videoPanel}>
              <h3 style={{ marginBottom: '15px', color: '#333', fontSize: '1.5rem' }}>
                📹 Today's Lesson: Conjunctions
              </h3>
              
              <div style={{ position: 'relative', width: '100%', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                <video controls style={{ width: '100%', height: 'auto', display: 'block' }}>
                  <source src="/Coordinating Conjunctions (Part 1).mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

          
            <div style={styles.panel}>
              <h3 style={{marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold', color: '#00BCD4'}}>
                Practice 1: Conjunction Sorter
              </h3>
              <ConjunctionSorter />
            </div>
            
          
            <div style={styles.panel}>
              <h3 style={{marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold', color: '#4CAF50'}}>
                Practice 2: Comma or No Comma?
              </h3>
              <ConjunctionFillBlanks />
            </div>
            
           
            <div style={{...styles.panel, ...styles.stretchPanel}}>
              <h3 style={{marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold', color: '#FF5722'}}>
                Practice 3: Complex Builder
              </h3>
              <ConjunctionStructureGame />
            </div>

          </div>
        </div>

     
   

      </div>
    </div>
  );
};

export default ConjunctionStructure;