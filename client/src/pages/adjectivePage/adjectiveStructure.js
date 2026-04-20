import React from 'react';
import './adjectivePage.css'; // Import CSS file




// ADJECTIVE COMPONENTS
import AdjectiveLesson from '../../utils/SentenceChecker/AdjectiveLesson';
import AdjectiveRoyalOrder from '../../utils/SentenceChecker/AdjectiveRoyalOrder';
import AdjectiveSentenceStructures from '../../utils/SentenceChecker/AdjectiveSentenceStructures';
import AdjectiveFillBlanks from '../../utils/SentenceChecker/AdjectiveFillBlanks';
import AdjectiveSortingGame from '../../utils/SentenceChecker/AdjectiveSortingGame';
import AdjectiveQuiz from '../../utils/SentenceChecker/AdjectiveQuiz';

const AdjectivePage = () => {
  return (
  <>
    
    <div className="lesson4-container">
      {/* Main Content */}
      <div className="lesson4-main-content">
        {/* Lesson Card */}
        <div className="lesson-card">
          <div className="lesson-header">
            <div className="lesson-icon">🎨</div>
            <div className="lesson-title">
              Lesson 4: Adjectives
              <span className="lesson-star">⭐</span>
            </div>
          </div>
          
          <div className="lesson-content">
            <p>Learn about <span className="adjective-highlight">adjectives</span> - the words that make your sentences more colorful and descriptive! 
            Discover the secret order that English adjectives follow.</p>
            
            <p style={{ marginTop: '15px' }}>For example:</p>
            <div className="example-text">The beautiful red rose.</div>
            <p>In this phrase, <strong>"beautiful"</strong> and <strong>"red"</strong> are adjectives describing the rose.</p>
          </div>
        </div>

        {/* Adjective Lesson Component */}
        <div className="component-card border-top-adjective">
          <div className="component-header component-header-adjective">
            📖 Adjective Lesson
          </div>
          
          <div className="component-content">
            <AdjectiveLesson />
          </div>
        </div>

        {/* Adjective Royal Order Component */}
        <div className="component-card border-top-royal">
          <div className="component-header component-header-royal">
            👑 Royal Order
          </div>
          
          <div className="component-content">
            <AdjectiveRoyalOrder />
          </div>
        </div>

        {/* Adjective Sentence Structures Component */}
        <div className="component-card border-top-sentence">
          <div className="component-header component-header-sentence">
            🏗️ Sentence Structures
          </div>
          
          <div className="component-content">
            <AdjectiveSentenceStructures />
          </div>
        </div>

        {/* Adjective Fill Blanks Component */}
        <div className="component-card border-top-fill">
          <div className="component-header component-header-fill">
            📝 Fill in the Blanks
          </div>
          
          <div className="component-content">
            <AdjectiveFillBlanks />
          </div>
        </div>

        {/* Adjective Sorting Game Component */}
        <div className="component-card border-top-sorting">
          <div className="component-header component-header-sorting">
            🎮 Sorting Game
          </div>
          
          <div className="component-content">
            <AdjectiveSortingGame />
          </div>
        </div>

        {/* Adjective Quiz Component */}
        <div className="component-card border-top-quiz">
          <div className="component-header component-header-quiz">
            🏆 Final Quiz
          </div>

          <div className="component-content">
            <AdjectiveQuiz />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lesson4-sidebar">
        {/* Video Card */}
        <div className="sidebar-card">
          <div className="video-title">Video</div>
          <div className="video-container">
            <video
              controls
              className="video-player"
            >
              <source src="/lesson4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Example Card */}
        <div className="sidebar-card">
          <p style={{ marginBottom: '10px' }}><strong>Adjective Examples</strong></p>
          <div className="example-card-content">
            <strong>Example:</strong> The small, red car<br />
            <strong>Order:</strong> size [small] + color [red] + noun [car]
          </div>
        </div>

        {/* Knowledge Check Card */}
        <div className="sidebar-card">
          <div className="knowledge-header">
            ⭐ Quick Check ⭐
          </div>

          <div className="knowledge-question">
            The _____ blue ocean
          </div>

          <div className="options-grid">
            {['beautiful', 'quickly', 'run', 'under'].map((option, index) => (
              <div
                key={index}
                className="option-item"
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

export default AdjectivePage;