import React from 'react';

const Feedback = ({ sentence, result }) => {
  if (!sentence) return null;

  return (
    <section>
      <h2>Feedback</h2>
      <p>Your Sentence: "{sentence}"</p>
      {result ? (
        <p style={{ color: 'green' }}> Correct structure!</p>
      ) : (
        <p style={{ color: 'red' }}> Incorrect structure. Try again!</p>
      )}
    </section>
  );
};

export default Feedback;
