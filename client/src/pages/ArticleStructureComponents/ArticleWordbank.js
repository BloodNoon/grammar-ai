import { Box, Heading, Text } from '@chakra-ui/react';
// This component shows available words that users can drag into the sentence building area
import React from 'react';

const ALLOWED_TYPES = ['Subject', 'Object', 'Determiner', 'Noun'];

const ArticleWordBank = ({ 
  availableWords,   // Array of word objects with id, text, and type properties
  handleDragStart   // Function called when user starts dragging a word
}) => {

  const filteredWords = availableWords.filter(word => ALLOWED_TYPES.includes(word.type));

  // Color mapping for different grammatical word types
  const getWordTypeColor = (type) => {
    const colorMap = {
      'Subject': 'purple.500',      // Purple for subjects
      'Object': 'blue.500',       // Blue for objects
      'Determiner': 'green.500',   // Green for determiners (articles)
      'Adjective': 'orange.500',    // Orange for adjectives
      'Noun': 'blueGray.500',         // Blue-gray for nouns
      'Verb': 'red.500',         // Red for verbs
      'Unknown': 'gray.500'       // Gray for unknown word types
    };
    return colorMap[type] || 'gray.500';
  };

  // Get lighter background color for word cards
  const getWordTypeBackgroundColor = (type) => {
    const backgroundMap = {
      'Subject': 'purple.50',      // Light purple
      'Object': 'blue.50',       // Light blue
      'Determiner': 'green.50',   // Light green for articles
      'Adjective': 'orange.50',    // Light orange
      'Noun': 'blueGray.50',         // Light blue-gray
      'Verb': 'red.50',         // Light red
      'Unknown': 'gray.50'       // Light gray
    };
    return backgroundMap[type] || 'gray.50';
  };

  return (
    // Main container for the word bank section
    <Box style={{ 
      textAlign: 'left',                // Left-align content for better organization
      padding: '20px',                  // Internal spacing
      backgroundColor: '#fafafa',       // Very light gray background
      borderRadius: '8px',              // Rounded corners
      margin: '20px 0',                 // Vertical spacing
      border: '2px solid #e0e0e0'       // Light border for definition
    }}>
      
      {/* Word bank title */}
      <Heading as="h3" size="md" sx={{ 
        marginBottom: '15px',           // Space below title
        color: 'gray.700',                  // Dark gray color
        textAlign: 'center'             // Center the title
      }}>
        📝 Word Bank - Drag words to build sentences
      </Heading>

      {/* Instructions for users */}
      <Text sx={{
        fontSize: '14px',               // Standard descriptive text size
        color: 'gray.500',                  // Gray color for secondary text
        marginBottom: '20px',           // Space below instructions
        textAlign: 'center',            // Center the instructions
        lineHeight: '1.4'               // Better line spacing
      }}>
        Drag and drop words from below to create sentences with proper articles. Words are color-coded by grammatical type.
      </Text>

      {/* Check if there are words available to display */}
      {filteredWords.length === 0 ? (
        // Show message when no words are available
        <Box sx={{
          textAlign: 'center',          // Center the message
          padding: '40px',              // Large padding for empty state
          fontSize: '16px',             // Standard text size
          color: 'gray.400',                // Light gray for empty state
          fontStyle: 'italic',          // Italic styling
          backgroundColor: '#f9f9f9',   // Very light background
          borderRadius: '6px',          // Rounded corners
          border: '2px dashed gray.200'     // Dashed border for empty state
        }}>
          No words available. Click "Generate New Words" to get started!
        </Box>
      ) : (
        // Display grid of available words when words exist
        <Box style={{
          display: 'grid',              // Grid layout for organized word display
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', // Responsive grid
          gap: '10px',                  // Space between word cards
          padding: '10px'               // Internal padding for grid container
        }}>
          {/* Map through each available word to create draggable cards */}
          {filteredWords.map((word) => (
            <Box
              key={word.id}             // Unique key for React rendering
              draggable                 // Make the div draggable
              onDragStart={(e) => {
                e.target.style.cursor = 'grabbing'; // Show grabbing cursor during drag
                handleDragStart(e, word);
              }} // Handle drag start
              style={{
                backgroundColor: getWordTypeBackgroundColor(word.type),
                border: `2px solid ${getWordTypeColor(word.type)}`,
                color: getWordTypeColor(word.type),
                padding: '12px 8px',     // Internal spacing for word cards
                textAlign: 'center',     // Center text within cards
                cursor: 'grab',          // Show grab cursor to indicate draggable
                borderRadius: '6px',     // Rounded corners
                fontSize: '14px',        // Standard readable text size
                fontWeight: 'bold',      // Bold text for better visibility
                minHeight: '60px',       // Minimum height for consistent card sizes
                display: 'flex',         // Flex layout for centering
                flexDirection: 'column', // Stack content vertically
                justifyContent: 'center', // Center content vertically
                alignItems: 'center',    // Center content horizontally
                transition: 'all 0.2s ease', // Smooth transition for interactions
                userSelect: 'none'       // Prevent text selection during drag
              }}
              // Add hover effects for better user interaction
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)'; // Slight lift on hover
                e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; // Shadow on hover
                e.target.style.cursor = 'grab'; // Ensure grab cursor
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)'; // Return to original position
                e.target.style.boxShadow = 'none'; // Remove shadow
              }}
              onDragEnd={(e) => {
                e.target.style.cursor = 'grab'; // Return to grab cursor after drag
              }}
            >
              {/* Display the word text */}
              <Box style={{ 
                fontSize: '16px',        // Larger font for the word itself
                marginBottom: '4px'      // Small space below word
              }}>
                {word.text}
              </Box>
              
              {/* Display the grammatical type label */}
              <Box style={{ 
                fontSize: '10px',        // Small font for type label
                opacity: '0.8',          // Slightly transparent for subtle appearance
                textTransform: 'uppercase', // Uppercase for type labels
                letterSpacing: '0.5px'   // Letter spacing for readability
              }}>
                {word.type}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Word count indicator */}
      <Box style={{
        textAlign: 'center',            // Center the count
        marginTop: '15px',              // Space above count
        fontSize: '12px',               // Small font for count
        color: '#888',                  // Light gray color
        fontStyle: 'italic'             // Italic styling
      }}>
        {filteredWords.length} words available for dragging
      </Box>

      {/* Legend showing word type colors */}
      <Box style={{
        marginTop: '20px',              // Space above legend
        padding: '15px',                // Internal spacing
        backgroundColor: '#f0f0f0',     // Light gray background
        borderRadius: '6px',            // Rounded corners
        border: '1px solid gray.200'        // Light border
      }}>
        <Heading as="h4" size="sm" sx={{ 
          marginBottom: '10px',         // Space below legend title
          fontSize: '14px',             // Small title font
          color: 'gray.700',                // Dark color
          textAlign: 'center'           // Center legend title
        }}>
          Word Type Color Guide:
        </Heading>
        
        {/* Grid display of color legend */}
        <Box style={{
          display: 'grid',              // Grid layout for legend
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', // Responsive grid
          gap: '8px',                   // Space between legend items
          fontSize: '11px'              // Small font for legend
        }}>
          {/* Create legend items for common word types */}
          {[
            { type: 'Subject', label: 'Subject' },
            { type: 'Determiner', label: 'Articles' },
            { type: 'Object', label: 'Object' },
            { type: 'Noun', label: 'Noun' },
          ].map(({ type, label }) => (
            <Box key={type} style={{
              display: 'flex',          // Horizontal layout
              alignItems: 'center',     // Vertical alignment
              gap: '5px'                // Space between color and label
            }}>
              {/* Color indicator dot */}
              <Box style={{
                width: '12px',          // Small dot size
                height: '12px',         // Square dot
                backgroundColor: getWordTypeColor(type),
                borderRadius: '50%',    // Make it circular
                flexShrink: 0           // Prevent shrinking
              }}></Box>
              {/* Type label */}
              <Text as="span" sx={{ color: 'gray.500' }}>{label}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleWordBank;
