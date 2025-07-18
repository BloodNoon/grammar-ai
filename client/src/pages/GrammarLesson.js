import React from 'react';
import { testCases } from '../utils/SentenceChecker/TestCases';

const GrammarLesson = () => {
  const example = testCases[0];

  return (
    <section>
      <h2>Grammar Lesson</h2>
      <p><strong>Example:</strong> {example.sentence}</p>
      <p><strong>Structure:</strong> {example.structure}</p>
    </section>
  );
};

export default GrammarLesson;
