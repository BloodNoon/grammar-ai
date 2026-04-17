import React from 'react';
import './prep1Structure.css';

// PREP1 COMPONENTS
import PrepositionSorter from '../../utils/SentenceChecker/PrepositionSorter';
import PrepositionStructureGame from '../../utils/SentenceChecker/PrepositionStructureGame';
import PrepositionQuiz from '../../utils/SentenceChecker/PrepositionQuiz';

const Prep1Structure = () => {
  return (
    
    <div className="prep1-container">
      <div className="prep1-content">
        <h1 className="prep1-title">Prepositions</h1>
        
        <p className="prep1-description">
          A <span className="prep1-highlight">preposition</span> is a word that indicates the relationship between a noun or
          pronoun and other words in a sentence.
        </p>

        {/* Completion message */}
        <div className="completion-message">
          <h3 className="completion-title">🎉 Congratulations!</h3>
          <p className="completion-text">
            You've completed all 6 lessons of Sentence Structure! 
            You've learned about subjects, objects, verb tenses, articles, adjectives, and adverbs.
          </p>
          <p className="completion-reminder">🏆 -- Remove if desired --</p>
        </div>

        {/* Types of Prepositions Video */}
        <div className="prep1-video-container">
          <video controls className="prep1-video" autoplay muted>
            <source src="/Lesson6.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Types of Prepositions Section */}
        <div className="prep-types-section">
          <h2 className="prep-types-title">Types of Prepositions:</h2>
          
          <ul className="prep-types-list">
            <li className="prep-type-item">
              <span className="prep-type-label prep-type-time">Time:</span> before, during, after
            </li>
            <li className="prep-type-item">
              <span className="prep-type-label prep-type-place">Place:</span> in, on, under
            </li>
            <li className="prep-type-item">
              <span className="prep-type-label prep-type-direction">Direction:</span> to, through, around
            </li>
            <li className="prep-type-item">
              <span className="prep-type-label prep-type-situation">Situation:</span> with, for, about
            </li>
            <li className="prep-type-item">
              <span className="prep-type-label prep-type-comparison">Comparison:</span> like, as, than
            </li>
          </ul>
        </div>

        {/* Sentence Structure Formulas Section */}
        <div className="formulas-section">
          <div className="formulas-container">
            <h2 className="formulas-title">Sentence Structure Formulas for Prepositions:</h2>
            
            <div className="formulas-list">
              {/* Formula 1 */}
              <div className="formula-box formula-box-time">
                <span className="formula-label formula-time">Formula:</span> Pronoun + verb + preposition + article + noun
                <div className="formula-example">
                  <em>Example: She walked <span className="formula-preposition preposition-time">to</span> the store.</em>
                </div>
              </div>

              {/* Formula 2 */}
              <div className="formula-box formula-box-place">
                <span className="formula-label formula-place">Formula:</span> Article + noun + verb + preposition + article + noun
                <div className="formula-example">
                  <em>Example: The dog ran <span className="formula-preposition preposition-place">through</span> the yard.</em>
                </div>
              </div>

              {/* Formula 3 */}
              <div className="formula-box formula-box-direction">
                <span className="formula-label formula-direction">Formula:</span> Article + noun + verb + preposition + article + noun + preposition + article + noun
                <div className="formula-example">
                  <em>Example: Mark gave the book <span className="formula-preposition preposition-direction">to</span> Sarah.</em>
                </div>
              </div>

              {/* Formula 4 */}
              <div className="formula-box formula-box-situation">
                <span className="formula-label formula-situation">Formula:</span> Pronoun + verb + preposition + article + noun
                <div className="formula-example">
                  <em>Example: They talked <span className="formula-preposition preposition-situation">about</span> eating lunch.</em>
                </div>
              </div>

              {/* Formula 5 */}
              <div className="formula-box formula-box-comparison">
                <span className="formula-label formula-comparison">Formula:</span> Article + noun + verb + preposition + article + noun
                <div className="formula-example">
                  <em>Example: <span className="formula-preposition preposition-comparison">After</span> the movie, Jack ate the pizza.</em>
                </div>

                
              </div>

              {/* Formula 6 */}
              <div className="formula-box formula-box-comparison">
                <span className="formula-label formula-comparison">Formula:</span> Article + noun + verb + preposition + article + noun
                <div className="formula-example">
                  
                </div>

                
              </div>
              {/* Formula 7 */}
              <div className="formula-box formula-box-comparison">
                <span className="formula-label formula-comparison">Formula:</span> Article + noun + verb + preposition + article + noun
                <div className="formula-example">
                  
                </div>
              </div>

              {/* Formula 8 */}
              <div className="formula-box formula-box-comparison">
                <span className="formula-label formula-comparison">Formula:</span> Article + noun + verb + preposition + article + noun + preposition + article + noun
                <div className="formula-example">
                  
                </div>

              </div>
                {/* Formula 9 */}
              <div className="formula-box formula-box-comparison">
                <span className="formula-label formula-comparison">Formula:</span> Preposition + article + noun + article + noun + verb + preposition + article + noun + preposition + article + noun
                <div className="formula-example">
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PREP1 COMPONENTS */}
        <div className="component-wrapper">
          <div className="component-header">🔤 Preposition Sorter</div>
          <div className="component-content">
            <PrepositionSorter />
          </div>
        </div>

        <div className="component-wrapper">
          <div className="component-header">🎮 Structure Game</div>
          <div className="component-content">
            <PrepositionStructureGame />
          </div>
        </div>

        <div className="component-wrapper">
          <div className="component-header">📝 Preposition Quiz</div>
          <div className="component-content">
            <PrepositionQuiz />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prep1Structure;
