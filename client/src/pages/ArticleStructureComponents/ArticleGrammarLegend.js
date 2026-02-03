// This component displays essential article grammar information in a clean, simple format
import React, { useState } from 'react';

const ArticleGrammarLegend = () => {
  
  // State to control which section is expanded (only one at a time for simplicity)
  const [activeSection, setActiveSection] = useState('');

  // Toggle function - closes if same section clicked, opens if different
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  // Essential article information - simplified and focused
  const articleTypes = [
    { name: 'Definite Article', form: 'the', example: 'The sun is bright.' },
    { name: 'Indefinite Article', form: 'a', example: 'A cat is sleeping.' },
    { name: 'Indefinite Article', form: 'an', example: 'An apple is red.' }
  ];

  // Article usage rules - simplified
  const usageRules = [
    { type: '"the"', rule: 'Specific things both people know', use: 'Definite reference' },
    { type: '"a"', rule: 'Before consonant sounds', use: 'Indefinite reference' },
    { type: '"an"', rule: 'Before vowel sounds (a, e, i, o, u)', use: 'Indefinite reference' }
  ];

  // Common mistakes and tips
  const articleTips = [
    'Listen to sounds: "a university" (y sound) vs "an umbrella" (u sound)',
    'Specific vs general: "the book" (specific) vs "a book" (any book)',
    'First mention: Use "a/an" first, then "the" for same item',
    'Practice: Read aloud to hear vowel vs consonant sounds'
  ];

  return (
    <div style={{
      padding: '20px',                 // Internal spacing
      backgroundColor: '#f9f9f9',      // Light gray background
      borderRadius: '6px',             // Rounded corners
      margin: '20px 0',                // Vertical spacing
      border: '1px solid #ddd'         // Light border
    }}>
      
      {/* Simple title */}
      <h2 style={{
        textAlign: 'center',            // Center the title
        marginBottom: '20px',           // Space below title
        color: '#333',                  // Dark gray color
        fontSize: '20px'                // Standard title size
      }}>
        📚 Articles Quick Reference
      </h2>

      {/* Article Types Section */}
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => toggleSection('articles')}
          style={{
            width: '100%',              // Full width button
            padding: '12px',            // Internal spacing
            backgroundColor: '#007bff', // Blue background
            color: 'white',             // White text
            border: 'none',             // No border
            borderRadius: '4px',        // Rounded corners
            fontSize: '16px',           // Standard text size
            cursor: 'pointer',          // Clickable cursor
            textAlign: 'left'           // Left-align text
          }}
          // Add hover effect
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#0056b3';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#007bff';
          }}
        >
          Article Types {activeSection === 'articles' ? '▼' : '▶'}
        </button>

        {activeSection === 'articles' && (
          <div style={{
            marginTop: '10px',          // Space above content
            padding: '15px',            // Internal spacing
            backgroundColor: 'white',   // White background
            borderRadius: '4px',        // Rounded corners
            border: '1px solid #ddd'    // Light border
          }}>
            {articleTypes.map((article, index) => (
              <div key={index} style={{
                padding: '8px 0',        // Vertical spacing
                borderBottom: index < articleTypes.length - 1 ? '1px solid #eee' : 'none'
              }}>
                {/* Article name and form */}
                <div style={{ 
                  fontWeight: 'bold', 
                  color: '#333',
                  marginBottom: '4px'
                }}>
                  {article.name}: <span style={{ 
                    color: '#4CAF50',           // Green for the actual article
                    fontSize: '18px',           // Slightly larger
                    fontFamily: 'monospace'     // Monospace for article
                  }}>{article.form}</span>
                </div>
                {/* Example usage */}
                <div style={{ 
                  fontSize: '14px', 
                  color: '#666', 
                  fontStyle: 'italic',
                  marginLeft: '10px'          // Indent example
                }}>
                  Example: "{article.example}"
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Usage Rules Section */}
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={() => toggleSection('rules')}
          style={{
            width: '100%',              // Full width button
            padding: '12px',            // Internal spacing
            backgroundColor: '#28a745', // Green background
            color: 'white',             // White text
            border: 'none',             // No border
            borderRadius: '4px',        // Rounded corners
            fontSize: '16px',           // Standard text size
            cursor: 'pointer',          // Clickable cursor
            textAlign: 'left'           // Left-align text
          }}
          // Add hover effect
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#1e7e34';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#28a745';
          }}
        >
          Usage Rules {activeSection === 'rules' ? '▼' : '▶'}
        </button>

        {activeSection === 'rules' && (
          <div style={{
            marginTop: '10px',          // Space above content
            padding: '15px',            // Internal spacing
            backgroundColor: 'white',   // White background
            borderRadius: '4px',        // Rounded corners
            border: '1px solid #ddd'    // Light border
          }}>
            {usageRules.map((rule, index) => (
              <div key={index} style={{
                padding: '8px 0',        // Vertical spacing
                borderBottom: index < usageRules.length - 1 ? '1px solid #eee' : 'none'
              }}>
                {/* Rule type and description */}
                <div style={{ 
                  fontWeight: 'bold', 
                  color: '#333',
                  marginBottom: '4px'
                }}>
                  <span style={{ 
                    color: '#4CAF50',           // Green for the article
                    fontFamily: 'monospace',    // Monospace for article
                    fontSize: '16px'            // Slightly larger
                  }}>{rule.type}</span>: {rule.rule}
                </div>
                {/* Usage description */}
                <div style={{ 
                  fontSize: '14px', 
                  color: '#666',
                  marginLeft: '10px'          // Indent usage info
                }}>
                  Used for: {rule.use}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Tips Section */}
      <div>
        <button
          onClick={() => toggleSection('tips')}
          style={{
            width: '100%',              // Full width button
            padding: '12px',            // Internal spacing
            backgroundColor: '#ffc107', // Yellow background
            color: '#212529',           // Dark text for contrast
            border: 'none',             // No border
            borderRadius: '4px',        // Rounded corners
            fontSize: '16px',           // Standard text size
            cursor: 'pointer',          // Clickable cursor
            textAlign: 'left'           // Left-align text
          }}
          // Add hover effect
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#e0a800';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#ffc107';
          }}
        >
          Quick Tips {activeSection === 'tips' ? '▼' : '▶'}
        </button>

        {activeSection === 'tips' && (
          <div style={{
            marginTop: '10px',          // Space above content
            padding: '15px',            // Internal spacing
            backgroundColor: 'white',   // White background
            borderRadius: '4px',        // Rounded corners
            border: '1px solid #ddd'    // Light border
          }}>
            <div style={{ 
              fontSize: '14px', 
              lineHeight: '1.6', 
              color: '#333' 
            }}>
              {articleTips.map((tip, index) => (
                <div key={index} style={{ marginBottom: '8px' }}>
                  <strong>✓</strong> <span style={{ marginLeft: '8px' }}>{tip}</span>
                </div>
              ))}
            </div>
            
            {/* Special section for vowel sound examples */}
            <div style={{
              marginTop: '15px',        // Space above examples
              padding: '12px',          // Internal spacing
              backgroundColor: '#f8f9fa', // Very light background
              borderRadius: '4px',      // Rounded corners
              border: '1px solid #e9ecef' // Light border
            }}>
              <div style={{ 
                fontWeight: 'bold', 
                marginBottom: '8px',
                color: '#495057'
              }}>
                🔊 Sound Examples:
              </div>
              <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                <div style={{ marginBottom: '4px' }}>
                  <strong>Consonant sounds:</strong> a cat, a dog, a house, a university (y-sound)
                </div>
                <div style={{ marginBottom: '4px' }}>
                  <strong>Vowel sounds:</strong> an apple, an elephant, an umbrella, an hour (silent h)
                </div>
                <div style={{ color: '#6c757d', fontStyle: 'italic', marginTop: '8px' }}>
                  Remember: It's about the <em>sound</em>, not the letter!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simple footer with helpful reminder */}
      <div style={{
        marginTop: '20px',              // Space above footer
        textAlign: 'center',            // Center the footer text
        fontSize: '12px',               // Small font for footer
        color: '#666',                  // Gray color
        fontStyle: 'italic'             // Italic styling
      }}>
        💡 Use this reference while practicing above!
      </div>

      {/* Additional practice reminder */}
      <div style={{
        marginTop: '10px',              // Space above reminder
        textAlign: 'center',            // Center the text
        fontSize: '11px',               // Very small font
        color: '#999',                  // Light gray
        fontStyle: 'italic',            // Italic styling
        padding: '8px',                 // Internal spacing
        backgroundColor: '#f1f3f4',     // Very light background
        borderRadius: '4px'             // Rounded corners
      }}>
        🎯 Focus on listening to the first sound of the word following the article
      </div>
    </div>
  );
};

export default ArticleGrammarLegend;