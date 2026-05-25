import { Box, Button, Heading } from '@chakra-ui/react';
// This component displays essential grammar information in a clean, simple format
import React, { useState } from 'react';

const VerbGrammarLegend = () => {
  
  // State to control which section is expanded (only one at a time for simplicity)
  const [activeSection, setActiveSection] = useState('');

  // Toggle function - closes if same section clicked, opens if different
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  // Essential verb tense information - simplified
  const verbTenses = [
    { name: 'Present Simple', form: 'walk/walks', example: 'I walk to school.' },
    { name: 'Past Simple', form: 'walked', example: 'I walked to school.' },
    { name: 'Future Simple', form: 'will walk', example: 'I will walk to school.' },
    { name: 'Present Continuous', form: 'am/is/are walking', example: 'I am walking to school.' },
    { name: 'Past Continuous', form: 'was/were walking', example: 'I was walking to school.' },
    { name: 'Present Perfect', form: 'have/has walked', example: 'I have walked to school.' }
  ];

  // Common auxiliary verbs - simplified
  const auxiliaries = [
    { type: 'Be verbs', verbs: 'am, is, are, was, were', use: 'Continuous tenses' },
    { type: 'Have verbs', verbs: 'have, has, had', use: 'Perfect tenses' },
    { type: 'Modal verbs', verbs: 'will, can, could, should', use: 'Future and possibility' }
  ];

  return (
    <Box style={{
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '6px',
      margin: '20px 0',
      border: '1px solid gray.200'
    }}>
      
      {/* Simple title */}
      <Heading as="h2" size="lg" sx={{
        textAlign: 'center',
        marginBottom: '20px',
        color: 'gray.700',
        fontSize: '20px'
      }}>
        📚 Grammar Quick Reference
      </Heading>

      {/* Verb Tenses Section */}
      <Box style={{ marginBottom: '15px' }}>
        <Button
          onClick={() => toggleSection('tenses')}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'blue.500',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          Verb Tenses {activeSection === 'tenses' ? '▼' : '▶'}
        </Button>

        {activeSection === 'tenses' && (
          <Box style={{
            marginTop: '10px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid gray.200'
          }}>
            {verbTenses.map((tense, index) => (
              <Box key={index} style={{
                padding: '8px 0',
                borderBottom: index < verbTenses.length - 1 ? '1px solid #eee' : 'none'
              }}>
                <Box sx={{ fontWeight: 'bold', color: 'gray.700' }}>
                  {tense.name}: {tense.form}
                </Box>
                <Box sx={{ fontSize: '14px', color: 'gray.500', fontStyle: 'italic' }}>
                  "{tense.example}"
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Auxiliary Verbs Section */}
      <Box style={{ marginBottom: '15px' }}>
        <Button
          onClick={() => toggleSection('auxiliaries')}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'green.500',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          Helper Verbs {activeSection === 'auxiliaries' ? '▼' : '▶'}
        </Button>

        {activeSection === 'auxiliaries' && (
          <Box style={{
            marginTop: '10px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid gray.200'
          }}>
            {auxiliaries.map((aux, index) => (
              <Box key={index} style={{
                padding: '8px 0',
                borderBottom: index < auxiliaries.length - 1 ? '1px solid #eee' : 'none'
              }}>
                <Box sx={{ fontWeight: 'bold', color: 'gray.700' }}>
                  {aux.type}: {aux.verbs}
                </Box>
                <Box sx={{ fontSize: '14px', color: 'gray.500' }}>
                  Used for: {aux.use}
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
            width: '100%',
            padding: '12px',
            backgroundColor: 'yellow.400',
            color: 'gray.800',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          Quick Tips {activeSection === 'tips' ? '▼' : '▶'}
        </Button>

        {activeSection === 'tips' && (
          <Box style={{
            marginTop: '10px',
            padding: '15px',
            backgroundColor: 'white',
            borderRadius: '4px',
            border: '1px solid gray.200'
          }}>
            <Box sx={{ fontSize: '14px', lineHeight: '1.6', color: 'gray.700' }}>
              <Box style={{ marginBottom: '8px' }}>
                <strong>✓ Subject-Verb Agreement:</strong> "I am" but "He is"
              </Box>
              <Box style={{ marginBottom: '8px' }}>
                <strong>✓ Tense Consistency:</strong> Keep the same tense in your sentence
              </Box>
              <Box style={{ marginBottom: '8px' }}>
                <strong>✓ Word Order:</strong> Subject + Verb + Object
              </Box>
              <Box>
                <strong>✓ Practice:</strong> Start simple, then add complexity
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* Simple footer */}
      <Box sx={{
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '12px',
        color: 'gray.500',
        fontStyle: 'italic'
      }}>
        💡 Use this reference while practicing above!
      </Box>
    </Box>
  );
};

export default VerbGrammarLegend;