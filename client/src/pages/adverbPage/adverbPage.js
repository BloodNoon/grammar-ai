import React from 'react';
import './adverbPage.css'; // Import CSS file


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
  return (
    <>

    <div className="lesson5-container">
      {/* Main Content */}
      <div className="lesson5-main-content">
        {/* Lesson Card */}
        <div className="adverb-lesson-card">
          <div className="adverb-header">
            <div className="adverb-icon">⚡</div>
            <div className="adverb-title">
              Lesson 5: Adverbs
              <span className="adverb-star">⭐</span>
            </div>
          </div>
          
          <div className="adverb-content">
            <p>Discover <span className="adverb-highlight">adverbs</span> - the words that modify verbs, adjectives, and other adverbs! 
            Learn how to use them correctly and understand their flexible placement in sentences.</p>
            
            <p style={{ marginTop: '15px' }}>For example:</p>
            <div className="example-text">She runs quickly.</div>
            <p>In this sentence, <strong>"quickly"</strong> is an adverb describing how she runs.</p>
          </div>
        </div>

        {/* Adverb Lesson Component */}
        <div className="adverb-component-card border-top-adverb-lesson">
          <div className="adverb-component-header adverb-header-lesson">
            📖 Adverb Lesson
          </div>
          
          <div className="adverb-component-content">
            <AdverbLesson />
          </div>
        </div>

        {/* Adverb Types Component */}
        <div className="adverb-component-card border-top-adverb-types">
          <div className="adverb-component-header adverb-header-types">
            🔤 Adverb Types
          </div>
          
          <div className="adverb-component-content">
            <AdverbTypes />
          </div>
        </div>

        {/* Adverb Royal Order Component */}
        <div className="adverb-component-card border-top-adverb-royal">
          <div className="adverb-component-header adverb-header-royal">
            👑 Royal Order
          </div>
          
          <div className="adverb-component-content">
            <AdverbRoyalOrder />
          </div>
        </div>

        {/* Adverb Forms Component */}
        <div className="adverb-component-card border-top-adverb-forms">
          <div className="adverb-component-header adverb-header-forms">
            📐 Adverb Forms
          </div>
          
          <div className="adverb-component-content">
            <AdverbForms />
          </div>
        </div>

        {/* Adverb Sentence Structures Component */}
        <div className="adverb-component-card border-top-adverb-sentence">
          <div className="adverb-component-header adverb-header-sentence">
            🏗️ Sentence Structures
          </div>
          
          <div className="adverb-component-content">
            <AdverbSentenceStructures />
          </div>
        </div>

        {/* Adverb Identification Game Component */}
        <div className="adverb-component-card border-top-adverb-identification">
          <div className="adverb-component-header adverb-header-identification">
            🕵️ Identification Game
          </div>
          
          <div className="adverb-component-content">
            <AdverbIdentificationGame />
          </div>
        </div>

        {/* Adverb Type Sorting Component */}
        <div className="adverb-component-card border-top-adverb-sorting">
          <div className="adverb-component-header adverb-header-sorting">
            🎮 Type Sorting
          </div>
          
          <div className="adverb-component-content">
            <AdverbTypeSorting />
          </div>
        </div>

        {/* Adverb Quiz Component */}
        <div className="adverb-component-card border-top-adverb-quiz">
          <div className="adverb-component-header adverb-header-quiz">
            🏆 Final Quiz
          </div>
          
          <div className="adverb-component-content">
            <AdverbQuiz />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lesson5-sidebar">
        {/* Video Card */}
        <div className="adverb-sidebar-card">
          <div className="adverb-video-title">Video</div>
          <video
              controls
              className="video-player"
            >
              <source src="/lesson5.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Example Card */}
        <div className="adverb-sidebar-card">
          <p style={{ marginBottom: '10px' }}><strong>Adverb Examples</strong></p>
          <div className="adverb-example-card-content">
            <strong>Example:</strong> She sings beautifully<br />
            <strong>Type:</strong> manner [beautifully] modifies verb [sings]
          </div>
        </div>

        {/* Knowledge Check Card */}
        <div className="adverb-sidebar-card">
          <div className="adverb-knowledge-header">
            ⭐ Quick Check ⭐
          </div>

          <div className="adverb-knowledge-question">
            He speaks _____ clearly
          </div>

          <div className="adverb-options-grid">
            {['very', 'blue', 'table', 'under'].map((option, index) => (
              <div
                key={index}
                className="adverb-option-item"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdverbStructure;
