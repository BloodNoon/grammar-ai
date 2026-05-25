import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const PronounsLesson = () => {
  return (
    <Box
      style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f0f8ff',
        borderRadius: '10px',
        maxWidth: '800px',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Heading as="h2" size="lg"
        sx={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: 'gray.700',
        }}
      >
       
        Learn the Lesson: Pronouns
      </Heading>

      <Box style={{ textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.8' }}>
        <Text><strong>Definition:</strong> a word that <strong>replaces a noun.</strong></Text>
        
        
        <Box style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
          <Heading as="h4" size="sm" sx={{ color: 'blue.800', marginBottom: '0.5rem' }}>Types of conjunctions:</Heading>
          <ul style={{ margin: '0.5rem 0' }}>
            <Text>We use pronouns so we don’t repeat the same noun again and again.</Text>
            <Text>• Noun: Maria has a book. Maria is reading the book.</Text>
            <Text>• Pronoun: Maria has a book. <strong>She</strong> is reading <strong>it.</strong></Text>
            <Text>Pronouns make our writing smoother and less repetitive.</Text>
            <Text>Types of Pronouns (with Examples)</Text>

            <Text>Subject Pronouns:</Text>
            <Text>Used as the <strong>subject</strong> of a sentence.</Text>
            <Text><strong> I, you, he, she, it, we, they</strong></Text>
            <Text><strong>Lena </strong>is my friend.<strong> She</strong> is very kind.</Text>
            <Text>(The subject pronoun <strong>she</strong> replaces Lena.)</Text>

            <Text> Object Pronouns:</Text>
            <Text>Used after a <strong>verb</strong> or <strong>preposition</strong>.</Text>
            <Text>I saw<strong> the dogs</strong>. I called them.</Text>
            <Text>(The object pronoun <strong> them </strong>replaces the dogs.)</Text>

            <Text>Possessive Pronouns: </Text>
            <Text>Show <strong> ownership.</strong></Text>
            <Text><strong> mine, yours, his, hers, its, ours, theirs</strong></Text>
            <Text>This backpack is<strong> mine.</strong></Text>
            <Text>(The possessive pronoun <strong> mine </strong>shows ownership.)</Text>

            <Text> Reflexive Pronouns:</Text>
            <Text>Refer <strong>back to the subject.</strong></Text>
            <Text><strong>myself, yourself, himself, herself, itself, ourselves, yourselves, themselves</strong></Text>
            <Text>Carlos made the project <strong>himself.</strong></Text>
            <Text>(The reflexive pronoun<strong> himself </strong>refers back to Carlos.)</Text>

            <Text> Interrogative Pronouns</Text>
            <Text>Used to <strong>ask questions</strong></Text>
            <Text><strong> who, whom, whose, which, what</strong></Text>
            <Text><strong>Who</strong> is at the door?</Text>
            <Text> (The interrogative pronoun<strong> who </strong>asks a question.)</Text>


            <Text>Relative Pronouns: </Text>
            <Text>Connect a<strong> dependent clause </strong>to a noun.</Text>
            <Text><strong> who, whom, whose, which, that</strong></Text>
            <Text>The student <strong>who</strong> won the prize is my sister.</Text>
            <Text>(The relative pronoun<strong> who </strong>connects the ideas.)</Text>

            <Text><strong>Demonstrative Pronouns:</strong></Text>
            <Text>Point to <strong>specific people or things.</strong></Text>
            <Text><strong> this, that, these, those</strong></Text>
            <Text><strong>These</strong> are my favorite cookies.</Text>
            <Text> (The demonstrative pronoun <strong>these</strong> points to specific things.)</Text>

            <Text>Indefinite Pronouns:</Text>
            <Text>Do<strong> not </strong>name a specific person or thing.</Text>
            <Text><strong>someone, anyone, everyone, no one, something, anything, everything, nothing, each, few, many, several, all, some, none</strong></Text>
            <Text><strong>Someone</strong> left a notebook on the desk.</Text>
            <Text>(The indefinite pronoun <strong>someone </strong>does not name a specific person.)</Text>


            
          </ul>
        </Box>

          <video width="720" height="480">
          <source public="Pronouns.mp4" type="video/mp4"></source>
          </video>

        <Text><strong>How they work in sentences:</strong></Text>
        <Box sx={{ margin: '1rem 0', padding: '1rem', backgroundColor: 'orange.50', borderRadius: '8px' }}>
          <Text>• Coordinating Conjunction: She wanted to go to the museum, <strong>but</strong> it was closed.</Text>
          <Text>• Subordinating Conjunctions: He stayed home <strong>because</strong> he was feeling sick.</Text>
          <Text>• Correlative Conjunctions: She is interested in <strong>both</strong> science <strong>and</strong> literature.</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PronounsLesson;