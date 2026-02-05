import React from 'react';
import './prep3Structure.css';

// PREP3 COMPONENTS
import SentenceScramble from '../../utils/SentenceChecker/SentenceScramble';
import PrepositionBuilder from '../../utils/SentenceChecker/PrepositionBuilder';
import PrepositionQuizFinal from '../../utils/SentenceChecker/PrepositionQuizFinal';

const prep3Structure = () => {
  const compoundPrepositions = [
    "According to", "As of", "As well as", "Aside from",
    "Because of", "In addition to", "Ahead of", "Due to",
    "Along with", "Out of", "Next to", "Instead of",
    "Prior to", "In respect to", "In spite of", "In place of"
  ];

  return (
    <div className="prep3-container">
      <div className="prep3-content">
        <h1 className="prep3-title">Compound Prepositions</h1>

        <p className="prep3-description">
          A <span className="prep3-highlight">compound preposition</span> is a phrase that works like a single 
          preposition, connecting a noun or pronoun to another word in the sentence.
        </p>

        {/* Different Compound Prepositions Section */}
        <div className="compound-grid-section">
          <h2 className="compound-grid-title">Different Compound Prepositions</h2>
          
          <div className="compound-grid">
            {compoundPrepositions.map((prep, idx) => (
              <div key={idx} className="compound-item">
                {prep}
              </div>
            ))}
          </div>
        </div>

        {/* Explanation Section */}
        <div className="explanation-section">
          <div className="explanation-title">How to Use Compound Prepositions</div>
          <p className="explanation-text">
            Compound prepositions function just like single-word prepositions but are made up of multiple words. 
            They establish relationships between different parts of a sentence.
          </p>
          
          <ul className="example-list">
            <li className="example-item">
              <span className="example-bullet">1.</span>
              <span className="example-sentence">
                She succeeded <span className="highlight-compound">because of</span> her hard work.
              </span>
            </li>
            <li className="example-item">
              <span className="example-bullet">2.</span>
              <span className="example-sentence">
                <span className="highlight-compound">In spite of</span> the rain, we went for a walk.
              </span>
            </li>
            <li className="example-item">
              <span className="example-bullet">3.</span>
              <span className="example-sentence">
                The decision was made <span className="highlight-compound">according to</span> the rules.
              </span>
            </li>
          </ul>
        </div>

        {/* Usage Tips */}
        <div className="tips-section">
          <div className="tips-title">Tips for Using Compound Prepositions:</div>
          <ul className="tips-list">
            <li className="tip-item">
              <span className="tip-icon">💡</span>
              Treat compound prepositions as single units - don't separate the words
            </li>
            <li className="tip-item">
              <span className="tip-icon">💡</span>
              They are usually followed by a noun or gerund (-ing form)
            </li>
            <li className="tip-item">
              <span className="tip-icon">💡</span>
              Some compound prepositions can be replaced with single-word equivalents
            </li>
          </ul>
        </div>

        {/* PREP3 COMPONENTS */}
        <div className="components-section">
          <div className="component-wrapper">
            <div className="component-header header-scramble">🔀 Sentence Scramble</div>
            <div className="component-content">
              <SentenceScramble />
            </div>
          </div>

          <div className="component-wrapper">
            <div className="component-header header-builder">🏗️ Preposition Builder</div>
            <div className="component-content">
              <PrepositionBuilder />
            </div>
          </div>

          <div className="component-wrapper">
            <div className="component-header header-final">🏆 Final Quiz</div>
            <div className="component-content">
              <PrepositionQuizFinal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default prep3Structure;