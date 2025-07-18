import React, { useState } from 'react';
import GrammarLesson from './GrammarLesson';
import Practice from './Practice';
import Feedback from './Feedback';
import { hasFullStructCheck } from '../utils/SentenceChecker/StructureChecker';

function SentenceStructureWebsite() {
  const [userSentence, setUserSentence] = useState('');
  const [result, setResult] = useState(null);

  const checkSentence = (sentence) => {
    setUserSentence(sentence);
    const isCorrect = hasFullStructCheck(sentence);
    setResult(isCorrect);
  };

  return (
    <div>
      <GrammarLesson />
      <Practice onCheck={checkSentence} />
      <Feedback sentence={userSentence} result={result} />
    </div>
  );
}

export default SentenceStructureWebsite;
