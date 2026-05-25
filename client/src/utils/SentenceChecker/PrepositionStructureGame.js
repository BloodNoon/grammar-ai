import { Box, Button, Text } from '@chakra-ui/react';
// PrepositionStructureGame.js
import React, { useState } from 'react';
import nlp from 'compromise';
import englishWords from 'an-array-of-english-words';

function PrepositionStructureGame() {
  const [answer1, setAnswer1] = useState("");
  const [feedback1, setFeedback1] = useState("");

  const [answer2, setAnswer2] = useState("");
  const [feedback2, setFeedback2] = useState("");

  const [answer3, setAnswer3] = useState("");
  const [feedback3, setFeedback3] = useState("");

  const [answer4, setAnswer4] = useState("");
  const [feedback4, setFeedback4] = useState("");

  const [answer5, setAnswer5] = useState("");
  const [feedback5, setFeedback5] = useState("");

  const knownPrepositions = [
    'to', 'for', 'of', 'with', 'by', 'at', 'from', 'as', 'about',
    'after', 'before', 'since', 'until', 'over', 'under', 'through'
  ];

  const trickyPrepositions = new Set([
    'across', 'through', 'about', 'around', 'over', 'under', 'off', 'onto', 'along', 'past',
  ]);

  // Helper to check if all words in sentence are valid English words
  function allWordsAreValid(sentence) {
    // Remove trailing punctuation (periods, commas, question marks, etc.) from the sentence
    const cleanedSentence = sentence.replace(/[.,!?;:]+$/g, '');
  
    const words = cleanedSentence
      .split(/\s+/)
      .map(word => word.replace(/[^a-zA-Z']/g, '')) // keep letters and apostrophes
      .filter(Boolean);
  
    const doc = nlp(cleanedSentence);
    const persons = doc.people().out('array').map(name => name.toLowerCase());
    const properNouns = doc.match('#ProperNoun').out('array').map(w => w.toLowerCase());
  
    return words.every(word => {
      const lower = word.toLowerCase();
      return (
        englishWords.includes(lower) || // normal English word
        persons.includes(lower) ||      // recognized person name
        properNouns.includes(lower)     // recognized proper noun (place, thing)
      );
    });
  }   

  // Reusable function for manual tagging fixes for prepositions and particles
  function manualFixes(doc) {
    const json = doc.json();
    if (json[0]?.terms) {
      for (const term of json[0].terms) {
        const text = term.text.toLowerCase();
        const tags = term.tags || [];

        if (knownPrepositions.includes(text) && !tags.includes('Preposition')) {
          doc.match(text).tag('Preposition', 'manual-fix');
        }
      }
    }

    const terms = doc.json()[0]?.terms || [];
    terms.forEach((term, i) => {
      const text = term.text.toLowerCase();
      const tags = term.tags || [];

      if (tags.includes('Particle') && trickyPrepositions.has(text)) {
        const prevTerm = terms[i - 1];
        const prevTags = prevTerm?.tags || [];
        const prevIsVerb = prevTags.includes('Verb') || prevTags.includes('Auxiliary');

        if (!prevIsVerb) {
          doc.match(term.text).unTag('Particle').tag('Preposition', 'manual-fix');
        }
      }
    });
  }

  // First Box Check
  const checkFirstBox = () => {
    const sentence = answer1.trim();
    if (!sentence) {
      setFeedback1("Please type a sentence.");
      return;
    }

    if (!allWordsAreValid(sentence)) {
      setFeedback1("❌ Your sentence contains invalid or non-English words.");
      return;
    }

    const doc = nlp(sentence);
    manualFixes(doc);

    const updatedTerms = doc.json()[0]?.terms || [];
    const debugTags = updatedTerms.map(term => `${term.text} [${[...term.tags].join(', ')}]`).join(' | ');

    const match = doc.match('^#Pronoun #Verb #Preposition #Determiner #Noun');

    if (match.found) {
      setFeedback1("✅ Correct!");
    } else {
      setFeedback1(`❌ Incorrect. Tags: ${debugTags}`);
    }
  };

  // Second Box Check
  const checkSecondBox = () => {
    const sentence = answer2.trim();
    if (!sentence) {
      setFeedback2("Please type a sentence.");
      return;
    }

    if (!allWordsAreValid(sentence)) {
      setFeedback2("❌ Your sentence contains invalid or non-English words.");
      return;
    }

    const doc = nlp(sentence);
    manualFixes(doc);

    const updatedTerms = doc.json()[0]?.terms || [];
    const debugTags = updatedTerms.map(term => `${term.text} [${[...term.tags].join(', ')}]`).join(' | ');

    const match = doc.match('^#Determiner #Noun #Verb #Preposition #Determiner #Noun');

    if (match.found) {
      setFeedback2("✅ Correct!");
    } else {
      setFeedback2(`❌ Incorrect. Tags: ${debugTags}`);
    }
  };

  // Third Box Check
  const checkThirdBox = () => {
    const sentence = answer3.trim();
    if (!sentence) {
      setFeedback3("Please type a sentence.");
      return;
    }

    if (!allWordsAreValid(sentence)) {
      setFeedback3("❌ Your sentence contains invalid or non-English words.");
      return;
    }

    const doc = nlp(sentence);
    manualFixes(doc);

    const updatedTerms = doc.json()[0]?.terms || [];
    const debugTags = updatedTerms.map(term => `${term.text} [${[...term.tags].join(', ')}]`).join(' | ');

    const match = doc.match('^#Noun #Verb #Determiner #Noun #Preposition #Noun');

    if (match.found) {
      setFeedback3("✅ Correct!");
    } else {
      setFeedback3(`❌ Incorrect. Tags: ${debugTags}`);
    }
  };

  // Fourth Box Check
  const checkFourthBox = () => {
    const sentence = answer4.trim();
    if (!sentence) {
      setFeedback4("Please type a sentence.");
      return;
    }

    if (!allWordsAreValid(sentence)) {
      setFeedback4("❌ Your sentence contains invalid or non-English words.");
      return;
    }

    const doc = nlp(sentence);
    manualFixes(doc);

    const updatedTerms = doc.json()[0]?.terms || [];
    const debugTags = updatedTerms.map(term => `${term.text} [${[...term.tags].join(', ')}]`).join(' | ');

    const match = doc.match('^#Noun #Verb #Preposition #Gerund #Noun');

    if (match.found) {
      setFeedback4("✅ Correct!");
    } else {
      setFeedback4(`❌ Incorrect. Tags: ${debugTags}`);
    }
  };

  // Fifth Box Check
  const checkFifthBox = () => {
    const sentence = answer5.trim();
    if (!sentence) {
      setFeedback5("Please type a sentence.");
      return;
    }

    if (!allWordsAreValid(sentence)) {
      setFeedback5("❌ Your sentence contains invalid or non-English words.");
      return;
    }

    const doc = nlp(sentence);
    manualFixes(doc);

    const updatedTerms = doc.json()[0]?.terms || [];
    const debugTags = updatedTerms.map(term => `${term.text} [${[...term.tags].join(', ')}]`).join(' | ');

    // Match pattern for formula 5: Preposition + Determiner + Noun , Noun + Verb + Determiner + Noun
    // Using optional comma in pattern (compromise allows optional punctuation)
    const match = doc.match('^#Preposition #Determiner #Noun [,]? #Noun #Verb #Determiner #Noun');

    if (match.found) {
      setFeedback5("✅ Correct!");
    } else {
      setFeedback5(`❌ Incorrect. Tags: ${debugTags}`);
    }
  };

  return (
    <Box style={{
      padding: '2rem',
      backgroundColor: '#fdfdfd',
      borderRadius: '12px',
      border: '1px solid gray.200',
      maxWidth: '900px',
      margin: '2rem auto'
    }}>

      {/* First Box */}
      <Box style={{
        backgroundColor: '#f9f9f9',
        border: '1px solid #eee',
        borderRadius: '10px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: '1.1rem',
          marginBottom: '0.5rem'
        }}>
          Formula 1: <Text as="span" style={{ color: '#007acc' }}>Pronoun + Verb + Preposition + Article + Noun</Text>
        </Text>

        <input
          type="text"
          value={answer1}
          onChange={(e) => setAnswer1(e.target.value)}
          placeholder="Type your sentence here..."
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid gray.300',
            marginBottom: '0.5rem'
          }}
        />

        <Button
          onClick={checkFirstBox}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Check
        </Button>

        <Text style={{
          marginTop: '0.5rem',
          fontWeight: 'bold',
          color: feedback1.startsWith("✅") ? 'green' : 'red'
        }}>
          {feedback1}
        </Text>
      </Box>

      {/* Second Box */}
      <Box style={{
        backgroundColor: '#f9f9f9',
        border: '1px solid #eee',
        borderRadius: '10px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: '1.1rem',
          marginBottom: '0.5rem'
        }}>
          Formula 2: <Text as="span" style={{ color: '#007acc' }}>Article + Noun + Verb + Preposition + Article + Noun</Text>
        </Text>

        <input
          type="text"
          value={answer2}
          onChange={(e) => setAnswer2(e.target.value)}
          placeholder="Type your sentence here..."
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid gray.300',
            marginBottom: '0.5rem'
          }}
        />

        <Button
          onClick={checkSecondBox}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Check
        </Button>

        <Text style={{
          marginTop: '0.5rem',
          fontWeight: 'bold',
          color: feedback2.startsWith("✅") ? 'green' : 'red'
        }}>
          {feedback2}
        </Text>
      </Box>

      {/* Third Box */}
      <Box style={{
        backgroundColor: '#f9f9f9',
        border: '1px solid #eee',
        borderRadius: '10px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: '1.1rem',
          marginBottom: '0.5rem'
        }}>
          Formula 3: <Text as="span" style={{ color: '#007acc' }}>Noun + Verb + Preposition + Article + Noun + Preposition + Article + Noun</Text>
        </Text>

        <input
          type="text"
          value={answer3}
          onChange={e => setAnswer3(e.target.value)}
          placeholder="Type your sentence here..."
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid gray.300',
            marginBottom: '0.5rem'
          }}
        />

        <Button
          onClick={checkThirdBox}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Check
        </Button>

        <Text style={{
          marginTop: '0.5rem',
          fontWeight: 'bold',
          color: feedback3.startsWith("✅") ? 'green' : 'red'
        }}>
          {feedback3}
        </Text>
      </Box>

      {/* Fourth Box */}
      <Box style={{
        backgroundColor: '#f9f9f9',
        border: '1px solid #eee',
        borderRadius: '10px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: '1.1rem',
          marginBottom: '0.5rem'
        }}>
          Formula 4: <Text as="span" style={{ color: '#007acc' }}>Noun + Verb + Preposition + Gerund + Noun</Text>
        </Text>

        <input
          type="text"
          value={answer4}
          onChange={e => setAnswer4(e.target.value)}
          placeholder="Type your sentence here..."
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid gray.300',
            marginBottom: '0.5rem'
          }}
        />

        <Button
          onClick={checkFourthBox}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Check
        </Button>

        <Text style={{
          marginTop: '0.5rem',
          fontWeight: 'bold',
          color: feedback4.startsWith("✅") ? 'green' : 'red'
        }}>
          {feedback4}
        </Text>
      </Box>

      {/* Fifth Box */}
      <Box style={{
        backgroundColor: '#f9f9f9',
        border: '1px solid #eee',
        borderRadius: '10px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: '1.1rem',
          marginBottom: '0.5rem'
        }}>
          Formula 5: <Text as="span" style={{ color: '#007acc' }}>Preposition + Determiner + Noun , Noun + Verb + Determiner + Noun</Text>
        </Text>

        <input
          type="text"
          value={answer5}
          onChange={e => setAnswer5(e.target.value)}
          placeholder="Type your sentence here..."
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1rem',
            borderRadius: '6px',
            border: '1px solid gray.300',
            marginBottom: '0.5rem'
          }}
        />

        <Button
          onClick={checkFifthBox}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Check
        </Button>

        <Text style={{
          marginTop: '0.5rem',
          fontWeight: 'bold',
          color: feedback5.startsWith("✅") ? 'green' : 'red'
        }}>
          {feedback5}
        </Text>
      </Box>

    </Box>
  );
}

export default PrepositionStructureGame;
