import { Box, Button, Heading, Text } from '@chakra-ui/react';
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
    <Box style={{
      padding: '20px',                 // Internal spacing
      backgroundColor: '#f9f9f9',      // Light gray background
      borderRadius: '6px',             // Rounded corners
      margin: '20px 0',                // Vertical spacing
      border: '1px solid gray.200'         // Light border
    }}>
      
      {/* Simple title */}
      <Heading as="h2" size="lg" sx={{
        textAlign: 'center',            // Center the title
        marginBottom: '20px',           // Space below title
        color: 'gray.700',                  // Dark gray color
        fontSize: '20px'                // Standard title size
      }}>
        📚 Articles Quick Reference
      </Heading>

      {/* Article Types Section */}
      <Box style={{ marginBottom: '15px' }}>
        <Button
          onClick={() => toggleSection('articles')}
          style={{
            width: '100%',              // Full width button
            padding: '12px',            // Internal spacing
            backgroundColor: 'blue.500', // Blue background
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
            e.target.style.backgroundColor = 'blue.500';
          }}
        >
          Article Types {activeSection === 'articles' ? '▼' : '▶'}
        </Button>

        {activeSection === 'articles' && (
          <Box style={{
            marginTop: '10px',          // Space above content
            padding: '15px',            // Internal spacing
            backgroundColor: 'white',   // White background
            borderRadius: '4px',        // Rounded corners
            border: '1px solid gray.200'    // Light border
          }}>
            {articleTypes.map((article, index) => (
              <Box key={index} style={{
                padding: '8px 0',        // Vertical spacing
                borderBottom: index < articleTypes.length - 1 ? '1px solid #eee' : 'none'
              }}>
                {/* Article name and form */}
                <Box sx={{ 
                  fontWeight: 'bold', 
                  color: 'gray.700',
                  marginBottom: '4px'
                }}>
                  {article.name}: <Text as="span" sx={{ 
                    color: 'green.500',           // Green for the actual article
                    fontSize: '18px',           // Slightly larger
                    fontFamily: 'monospace'     // Monospace for article
                  }}>{article.form}</Text>
                </Box>
                {/* Example usage */}
                <Box sx={{ 
                  fontSize: '14px', 
                  color: 'gray.500', 
                  fontStyle: 'italic',
                  marginLeft: '10px'          // Indent example
                }}>
                  Example: "{article.example}"
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Usage Rules Section */}
      <Box style={{ marginBottom: '15px' }}>
        <Button
          onClick={() => toggleSection('rules')}
          style={{
            width: '100%',              // Full width button
            padding: '12px',            // Internal spacing
            backgroundColor: 'green.500', // Green background
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
            e.target.style.backgroundColor = 'green.500';
          }}
        >
          Usage Rules {activeSection === 'rules' ? '▼' : '▶'}
        </Button>

        {activeSection === 'rules' && (
          <Box style={{
            marginTop: '10px',          // Space above content
            padding: '15px',            // Internal spacing
            backgroundColor: 'white',   // White background
            borderRadius: '4px',        // Rounded corners
            border: '1px solid gray.200'    // Light border
          }}>
            {usageRules.map((rule, index) => (
              <Box key={index} style={{
                padding: '8px 0',        // Vertical spacing
                borderBottom: index < usageRules.length - 1 ? '1px solid #eee' : 'none'
              }}>
                {/* Rule type and description */}
                <Box sx={{ 
                  fontWeight: 'bold', 
                  color: 'gray.700',
                  marginBottom: '4px'
                }}>
                  <Text as="span" sx={{ 
                    color: 'green.500',           // Green for the article
                    fontFamily: 'monospace',    // Monospace for article
                    fontSize: '16px'            // Slightly larger
                  }}>{rule.type}</Text>: {rule.rule}
                </Box>
                {/* Usage description */}
                <Box sx={{ 
                  fontSize: '14px', 
                  color: 'gray.500',
                  marginLeft: '10px'          // Indent usage info
                }}>
                  Used for: {rule.use}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Quick Tips Section */}
      <Box>
        <Button
          onClick={() => toggleSection('tips')}
          style={{
            width: '100%',              // Full width button
            padding: '12px',            // Internal spacing
            backgroundColor: 'yellow.400', // Yellow background
            color: 'gray.800',           // Dark text for contrast
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
            e.target.style.backgroundColor = 'yellow.400';
          }}
        >
          Quick Tips {activeSection === 'tips' ? '▼' : '▶'}
        </Button>

        {activeSection === 'tips' && (
          <Box style={{
            marginTop: '10px',          // Space above content
            padding: '15px',            // Internal spacing
            backgroundColor: 'white',   // White background
            borderRadius: '4px',        // Rounded corners
            border: '1px solid gray.200'    // Light border
          }}>
            <Box sx={{ 
              fontSize: '14px', 
              lineHeight: '1.6', 
              color: 'gray.700' 
            }}>
              {articleTips.map((tip, index) => (
                <Box key={index} style={{ marginBottom: '8px' }}>
                  <strong>✓</strong> <Text as="span" style={{ marginLeft: '8px' }}>{tip}</Text>
                </Box>
              ))}
            </Box>
            
            {/* Special section for vowel sound examples */}
            <Box sx={{
              marginTop: '15px',        // Space above examples
              padding: '12px',          // Internal spacing
              backgroundColor: 'gray.50', // Very light background
              borderRadius: '4px',      // Rounded corners
              border: '1px solid gray.100' // Light border
            }}>
              <Box sx={{ 
                fontWeight: 'bold', 
                marginBottom: '8px',
                color: 'gray.600'
              }}>
                🔊 Sound Examples:
              </Box>
              <Box style={{ fontSize: '13px', lineHeight: '1.5' }}>
                <Box style={{ marginBottom: '4px' }}>
                  <strong>Consonant sounds:</strong> a cat, a dog, a house, a university (y-sound)
                </Box>
                <Box style={{ marginBottom: '4px' }}>
                  <strong>Vowel sounds:</strong> an apple, an elephant, an umbrella, an hour (silent h)
                </Box>
                <Box sx={{ color: 'gray.500', fontStyle: 'italic', marginTop: '8px' }}>
                  Remember: It's about the <em>sound</em>, not the letter!
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* Simple footer with helpful reminder */}
      <Box sx={{
        marginTop: '20px',              // Space above footer
        textAlign: 'center',            // Center the footer text
        fontSize: '12px',               // Small font for footer
        color: 'gray.500',                  // Gray color
        fontStyle: 'italic'             // Italic styling
      }}>
        💡 Use this reference while practicing above!
      </Box>

      {/* Additional practice reminder */}
      <Box sx={{
        marginTop: '10px',              // Space above reminder
        textAlign: 'center',            // Center the text
        fontSize: '11px',               // Very small font
        color: 'gray.400',                  // Light gray
        fontStyle: 'italic',            // Italic styling
        padding: '8px',                 // Internal spacing
        backgroundColor: '#f1f3f4',     // Very light background
        borderRadius: '4px'             // Rounded corners
      }}>
        🎯 Focus on listening to the first sound of the word following the article
      </Box>
    </Box>
  );
};

export default ArticleGrammarLegend;