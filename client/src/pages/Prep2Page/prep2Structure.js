import React from 'react';
import './prep2Structure.css';

// PREP2 COMPONENTS
import PrepositionPhraseLesson from '../../utils/SentenceChecker/PrepositionPhraseLesson';
import PrepositionPhraseFillBlanks from '../../utils/SentenceChecker/PrepositionPhraseFillBlanks';
import PrepositionPhraseWordBlocks from '../../utils/SentenceChecker/PrepositionPhraseWordBlocks';
import PrepositionPhraseTesting from '../../utils/SentenceChecker/PrepositionPhraseTesting';
import PrepositionPhraseSorting from '../../utils/SentenceChecker/PrepositionPhraseSorting';

const Prep2Structure = () => {
  return (
    <div className="prep2-container">
      <div className="prep2-content">
        <h1 className="prep2-title">Prepositional Phrases</h1>

        <p className="prep2-description">
          A <span className="prep2-highlight">prepositional phrase</span> is a group of words that begins with a preposition and ends with a noun or pronoun. It adds detail about time, place, or manner.
        </p>

        {/* Definition and Examples */}
        <div className="definition-card">
          <h2 className="definition-title">Understanding Prepositional Phrases</h2>
          <p className="definition-text">
            A prepositional phrase consists of:
            <br />1. A <strong>preposition</strong> (the head word)
            <br />2. An <strong>object</strong> (a noun or pronoun)
            <br />3. Any <strong>modifiers</strong> of that object
          </p>
          
          <div className="definition-example">
            <div className="example-title">Example Structure:</div>
            <div className="diagram-container">
              <div className="diagram-title">Diagram of a Prepositional Phrase:</div>
              <div className="diagram">
                <span className="diagram-part diagram-preposition">preposition</span>
                <span className="diagram-arrow">+</span>
                <span className="diagram-part diagram-article">article</span>
                <span className="diagram-arrow">+</span>
                <span className="diagram-part diagram-noun">noun</span>
              </div>
              <em>Example: "in the house" → "in" (preposition) + "the" (article) + "house" (noun)</em>
            </div>
          </div>
        </div>

        {/* Information Card */}
        <div className="info-card">
          <div className="info-title">Functions of Prepositional Phrases:</div>
          <ul className="info-list">
            <li className="info-item">
              <span className="info-bullet">📍</span>
              <strong>Adverbial:</strong> Modify verbs (She ran <em>with speed</em>)
            </li>
            <li className="info-item">
              <span className="info-bullet">📝</span>
              <strong>Adjectival:</strong> Modify nouns (The book <em>on the table</em> is mine)
            </li>
            <li className="info-item">
              <span className="info-bullet">⚡</span>
              <strong>Complement:</strong> Complete the meaning (We rely <em>on you</em>)
            </li>
          </ul>
        </div>

        {/* PREP2 COMPONENTS */}
        <div className="components-section">
          <div className="component-wrapper">
            <div className="component-header header-phrase">📖 Prepositional Phrase Lesson</div>
            <div className="component-content">
              <PrepositionPhraseLesson />
            </div>
          </div>

          <div className="component-wrapper">
            <div className="component-header header-fill">📝 Fill in the Blanks</div>
            <div className="component-content">
              <PrepositionPhraseFillBlanks />
            </div>
          </div>

          <div className="component-wrapper">
            <div className="component-header header-blocks">🧱 Word Blocks</div>
            <div className="component-content">
              <PrepositionPhraseWordBlocks />
            </div>
          </div>

          <div className="component-wrapper">
            <div className="component-header header-testing">🧪 Testing</div>
            <div className="component-content">
              <PrepositionPhraseTesting />
            </div>
          </div>

          <div className="component-wrapper">
            <div className="component-header header-sorting">🔠 Sorting Game</div>
            <div className="component-content">
              <PrepositionPhraseSorting />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prep2Structure;