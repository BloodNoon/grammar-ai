import React, { useState } from 'react';

const PronounsLesson = () => {
  return (
    <div
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
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#333',
        }}
      >
       
        Learn the Lesson: Pronouns
      </h2>

      <div style={{ textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.8' }}>
        <p><strong>Definition:</strong> a word that <strong>replaces a noun.</strong></p>
        
        
        <div style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
          <h4 style={{ color: '#1565c0', marginBottom: '0.5rem' }}>Types of conjunctions:</h4>
          <ul style={{ margin: '0.5rem 0' }}>
            <p>We use pronouns so we don’t repeat the same noun again and again.</p>
            <p>• Noun: Maria has a book. Maria is reading the book.</p>
            <p>• Pronoun: Maria has a book. <strong>She</strong> is reading <strong>it.</strong></p>
            <p>Pronouns make our writing smoother and less repetitive.</p>
            <p>Types of Pronouns (with Examples)</p>

            <p>Subject Pronouns:</p>
            <p>Used as the <strong>subject</strong> of a sentence.</p>
            <p><strong> I, you, he, she, it, we, they</strong></p>
            <p><strong>Lena </strong>is my friend.<strong> She</strong> is very kind.</p>
            <p>(The subject pronoun <strong>she</strong> replaces Lena.)</p>

            <p> Object Pronouns:</p>
            <p>Used after a <strong>verb</strong> or <strong>preposition</strong>.</p>
            <p>I saw<strong> the dogs</strong>. I called them.</p>
            <p>(The object pronoun <strong> them </strong>replaces the dogs.)</p>

            <p>Possessive Pronouns: </p>
            <p>Show <strong> ownership.</strong></p>
            <p><strong> mine, yours, his, hers, its, ours, theirs</strong></p>
            <p>This backpack is<strong> mine.</strong></p>
            <p>(The possessive pronoun <strong> mine </strong>shows ownership.)</p>

            <p> Reflexive Pronouns:</p>
            <p>Refer <strong>back to the subject.</strong></p>
            <p><strong>myself, yourself, himself, herself, itself, ourselves, yourselves, themselves</strong></p>
            <p>Carlos made the project <strong>himself.</strong></p>
            <p>(The reflexive pronoun<strong> himself </strong>refers back to Carlos.)</p>

            <p> Interrogative Pronouns</p>
            <p>Used to <strong>ask questions</strong></p>
            <p><strong> who, whom, whose, which, what</strong></p>
            <p><strong>Who</strong> is at the door?</p>
            <p> (The interrogative pronoun<strong> who </strong>asks a question.)</p>


            <p>Relative Pronouns: </p>
            <p>Connect a<strong> dependent clause </strong>to a noun.</p>
            <p><strong> who, whom, whose, which, that</strong></p>
            <p>The student <strong>who</strong> won the prize is my sister.</p>
            <p>(The relative pronoun<strong> who </strong>connects the ideas.)</p>

            <p><strong>Demonstrative Pronouns:</strong></p>
            <p>Point to <strong>specific people or things.</strong></p>
            <p><strong> this, that, these, those</strong></p>
            <p><strong>These</strong> are my favorite cookies.</p>
            <p> (The demonstrative pronoun <strong>these</strong> points to specific things.)</p>

            <p>Indefinite Pronouns:</p>
            <p>Do<strong> not </strong>name a specific person or thing.</p>
            <p><strong>someone, anyone, everyone, no one, something, anything, everything, nothing, each, few, many, several, all, some, none</strong></p>
            <p><strong>Someone</strong> left a notebook on the desk.</p>
            <p>(The indefinite pronoun <strong>someone </strong>does not name a specific person.)</p>


            
          </ul>
        </div>

          <video width="720" height="480">
          <source public="Pronouns.mp4" type="video/mp4"></source>
          </video>

        <p><strong>How they work in sentences:</strong></p>
        <div style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
          <p>• Coordinating Conjunction: She wanted to go to the museum, <strong>but</strong> it was closed.</p>
          <p>• Subordinating Conjunctions: He stayed home <strong>because</strong> he was feeling sick.</p>
          <p>• Correlative Conjunctions: She is interested in <strong>both</strong> science <strong>and</strong> literature.</p>
        </div>
      </div>
    </div>
  );
};

export default PronounsLesson;