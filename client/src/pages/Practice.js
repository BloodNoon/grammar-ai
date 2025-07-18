import React, { useState } from 'react';

const Practice = ({ onCheck }) => {
  const [words, setWords] = useState(['The', 'dog', 'ran']);
  const [sentence, setSentence] = useState([]);

  const handleDrop = (word) => {
    setSentence([...sentence, word]);
    setWords(words.filter(w => w !== word));
  };

  return (
    <section>
      <h2>Build a Sentence</h2>
      <div>
        {words.map((word) => (
          <button key={word} onClick={() => handleDrop(word)}>
            {word}
          </button>
        ))}
      </div>
      <div>
        <h4>Your Sentence:</h4>
        <p>{sentence.join(' ')}</p>
        <button onClick={() => onCheck(sentence.join(' '))}>Check Sentence</button>
      </div>
    </section>
  );
};

export default Practice;
