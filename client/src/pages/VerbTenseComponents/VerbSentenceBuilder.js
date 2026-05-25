import { Box, Heading, Text } from '@chakra-ui/react';
// This component provides the area where users drop words to construct sentences
import React from 'react';

const VerbSentenceBuilder = ({ 
  sentenceArea,        // Array of word objects currently in the sentence
  removeFromSentence,  // Function to remove a word from the sentence by index
  handleDragOver,      // Function to handle drag over events (prevents default)
  handleDrop           // Function to handle drop events when words are dropped
}) => {

  // Color mapping for different grammatical word types (same as WordBank)
  const getWordTypeColor = (word) => {
    // First check if it's a verb and get the subtype for specific coloring
    if (word.type === 'Verb' && word.subtype) {
      const verbColorMap = {
        'Auxiliary': 'red.500',    // Red for auxiliary verbs
        'Present': 'green.500',      // Green for present verbs
        'Past': 'blue.500',         // Blue for past verbs
        'Continuous': 'orange.500',   // Orange for continuous verbs
        'Perfect': 'purple.500',      // Purple for perfect verbs
        'Verb': 'blueGray.500'          // Blue-gray for general verbs
      };
      return verbColorMap[word.subtype] || 'blueGray.500';
    }
    
    const colorMap = {
      'Subject': 'green.500',      // Green for subjects (displayed as Pronoun)
      'Object': 'blue.500',       // Blue for objects
      'Determiner': 'purple.500',   // Purple for determiners
      'Adjective': 'orange.500',    // Orange for adjectives
      'Noun': 'blueGray.500',         // Blue-gray for nouns
      'Verb': 'green.400',         // Light green for general verbs
      'Unknown': 'gray.500'       // Gray for unknown word types
    };
    return colorMap[word.type] || 'gray.500';
  };

  // Get lighter background color for word cards in sentence
  const getWordTypeBackgroundColor = (word) => {
    // First check if it's a verb and get the subtype for specific background coloring
    if (word.type === 'Verb' && word.subtype) {
      const verbBackgroundMap = {
        'Auxiliary': 'red.50',    // Light red for auxiliary verbs
        'Present': 'green.50',      // Light green for present verbs
        'Past': 'blue.50',         // Light blue for past verbs
        'Continuous': 'orange.50',   // Light orange for continuous verbs
        'Perfect': 'purple.50',      // Light purple for perfect verbs
        'Verb': 'blueGray.50'          // Light blue-gray for general verbs
      };
      return verbBackgroundMap[word.subtype] || 'blueGray.50';
    }
    
    const backgroundMap = {
      'Subject': 'green.50',      // Light green (displayed as Pronoun)
      'Object': 'blue.50',       // Light blue
      'Determiner': 'purple.50',   // Light purple
      'Adjective': 'orange.50',    // Light orange
      'Noun': 'blueGray.50',         // Light blue-gray
      'Verb': 'green.50',         // Very light green for general verbs
      'Unknown': 'gray.50'       // Light gray
    };
    return backgroundMap[word.type] || 'gray.50';
  };

  return (
    // Main container for the sentence building area
    <Box sx={{ 
      textAlign: 'center',              // Center-align content
      padding: '20px',                  // Internal spacing
      backgroundColor: 'gray.50',       // Light background
      borderRadius: '8px',              // Rounded corners
      margin: '20px 0',                 // Vertical spacing
      border: '2px solid gray.200'       // Light border
    }}>
      
      {/* Sentence builder title */}
      <Heading as="h3" size="md" sx={{ 
        marginBottom: '15px',           // Space below title
        color: 'gray.700'                   // Dark gray color
      }}>
        🏗️ Sentence Builder
      </Heading>

      {/* Instructions for sentence building */}
      <Text sx={{
        fontSize: '14px',               // Standard text size
        color: 'gray.500',                  // Gray color for secondary text
        marginBottom: '20px',           // Space below instructions
        lineHeight: '1.4'               // Better line spacing
      }}>
        Drop words here to build your sentence. Click words to remove them.
      </Text>

      {/* Main drop zone area */}
      <Box
        onDragOver={handleDragOver}     // Handle drag over to allow dropping
        onDrop={(e) => handleDrop(e)}   // Handle drop events
        style={{
          minHeight: '120px',           // Minimum height for drop zone
          padding: '20px',              // Internal spacing
          backgroundColor: sentenceArea.length === 0 ? 'gray.50' : 'white',
          border: sentenceArea.length === 0 ? '3px dashed gray.300' : '2px solid green.500',
          borderRadius: '8px',          // Rounded corners
          display: 'flex',              // Flex layout for sentence words
          flexWrap: 'wrap',             // Allow words to wrap to new lines
          alignItems: 'center',         // Center words vertically
          justifyContent: sentenceArea.length === 0 ? 'center' : 'flex-start',
          gap: '8px',                   // Space between words
          transition: 'all 0.3s ease', // Smooth transition for border changes
          position: 'relative'          // For positioning drag indicators
        }}
        // Add visual feedback during drag operations
        onDragEnter={(e) => {
          e.preventDefault();
          e.target.style.backgroundColor = 'green.50'; // Light green when dragging over
          e.target.style.borderColor = 'green.500';     // Green border
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          // Only change back if not hovering over a child element
          if (!e.currentTarget.contains(e.relatedTarget)) {
            e.target.style.backgroundColor = sentenceArea.length === 0 ? 'gray.50' : 'white';
            e.target.style.borderColor = sentenceArea.length === 0 ? 'gray.300' : 'green.500';
          }
        }}
      >
        {/* Show placeholder text when no words are in the sentence */}
        {sentenceArea.length === 0 ? (
          <Box sx={{
            color: 'gray.400',              // Light gray for placeholder
            fontSize: '18px',           // Large placeholder text
            fontStyle: 'italic',        // Italic styling
            textAlign: 'center',        // Center the placeholder
            width: '100%'               // Full width for centering
          }}>
            Drag words here to build your sentence...
          </Box>
        ) : (
          // Display words in the sentence when they exist
          <>
            {sentenceArea.map((word, index) => (
              <React.Fragment key={`${word.id}-${index}`}>
                {/* Word card in the sentence */}
                <Box
                  onClick={() => removeFromSentence(index)} // Remove word when clicked
                  style={{
                    backgroundColor: getWordTypeBackgroundColor(word),
                    border: `2px solid ${getWordTypeColor(word)}`,
                    color: getWordTypeColor(word),
                    padding: '10px 12px',   // Internal spacing for sentence words
                    borderRadius: '6px',    // Rounded corners
                    cursor: 'pointer',      // Show clickable cursor
                    fontSize: '16px',       // Standard text size
                    fontWeight: 'bold',     // Bold text for visibility
                    display: 'flex',        // Flex layout for word content
                    flexDirection: 'column', // Stack content vertically
                    alignItems: 'center',   // Center content
                    minWidth: '80px',       // Minimum width for consistency
                    textAlign: 'center',    // Center text
                    transition: 'all 0.2s ease', // Smooth transitions
                    userSelect: 'none',     // Prevent text selection
                    position: 'relative'    // For hover effects
                  }}
                  // Add hover effects for better interaction feedback
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)'; // Slight lift
                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)'; // Shadow
                    e.target.style.opacity = '0.8'; // Slight transparency to indicate removable
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)'; // Return to original position
                    e.target.style.boxShadow = 'none'; // Remove shadow
                    e.target.style.opacity = '1'; // Return to full opacity
                  }}
                  title={`Click to remove "${word.text}" from sentence`} // Tooltip
                >
                  {/* Word text */}
                  <Box style={{ fontSize: '16px' }}>
                    {word.text}
                  </Box>
                  
                  {/* Word type label - show "Pronoun" for Subject type, verb subtype if available */}
                  <Box style={{ 
                    fontSize: '10px',
                    opacity: '0.7',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginTop: '2px'
                  }}>
                    {word.type === 'Subject' ? 'PRONOUN' : 
                     word.type === 'Verb' && word.subtype ? word.subtype : 
                     word.type}
                  </Box>

                  {/* Remove indicator on hover */}
                  <Box sx={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    backgroundColor: 'red.500',
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    fontSize: '10px',
                    display: 'none', // Hidden by default
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                  className="remove-indicator">
                    x
                  </Box>
                </Box>

                {/* Add space between words (except after last word) */}
                {index < sentenceArea.length - 1 && (
                  <Box sx={{
                    fontSize: '16px',       // Standard spacing size
                    color: 'gray.400',          // Light gray for spacing
                    userSelect: 'none'      // Prevent selection of spacing
                  }}>
                    {/* Visual space between words */}
                  </Box>
                )}
              </React.Fragment>
            ))}
          </>
        )}
      </Box>

      {/* Current sentence display */}
      {sentenceArea.length > 0 && (
        <Box sx={{
          marginTop: '20px',            // Space above sentence display
          padding: '15px',              // Internal spacing
          backgroundColor: 'gray.100',   // Light gray background
          borderRadius: '6px',          // Rounded corners
          border: '1px solid gray.200'   // Light border
        }}>
          <Heading as="h4" size="sm" sx={{ 
            marginBottom: '10px',       // Space below title
            color: 'gray.600',           // Dark gray
            fontSize: '16px'            // Standard title size
          }}>
            Current Sentence:
          </Heading>
          
          {/* Display the sentence as readable text */}
          <Box sx={{
            fontSize: '20px',           // Large readable text
            fontWeight: 'bold',         // Bold for emphasis
            color: 'gray.800',           // Dark text color
            fontFamily: 'serif',        // Serif font for readability
            lineHeight: '1.4',          // Better line spacing
            textAlign: 'center',        // Center the sentence
            padding: '10px',            // Internal spacing
            backgroundColor: 'white',   // White background for contrast
            borderRadius: '4px',        // Rounded corners
            border: '1px solid gray.200', // Light border
            fontStyle: 'italic'         // Italic for sentence emphasis
          }}>
            "{sentenceArea.map(word => word.text).join(' ')}"
          </Box>

          {/* Word count and structure info */}
          <Box sx={{
            marginTop: '10px',          // Space above info
            fontSize: '12px',           // Small info text
            color: 'gray.500',           // Gray color
            textAlign: 'center',        // Center the info
            fontStyle: 'italic'         // Italic styling
          }}>
            {sentenceArea.length} words • Click any word above to remove it
          </Box>
        </Box>
      )}

      {/* Help text */}
      <Box sx={{
        marginTop: '15px',              // Space above help text
        fontSize: '12px',               // Small font for help
        color: 'gray.500',               // Gray color
        textAlign: 'center',            // Center help text
        fontStyle: 'italic'             // Italic styling
      }}>
         Tip: You can also drag words between positions in your sentence
      </Box>

      {/* Add CSS for hover effect on remove indicator */}
      <style>{`
        .sentence-word:hover .remove-indicator {
          display: flex !important;
        }
      `}</style>
    </Box>
  );
};

export default VerbSentenceBuilder;