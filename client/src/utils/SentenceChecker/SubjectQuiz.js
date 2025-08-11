import React, { useState, useEffect } from 'react';
import nlp from 'compromise';
import { testCases } from './TestCases';
import './SubjectQuiz.css';

const getChoices = (sentence, type) => {
	const words = sentence.split(' ').map(w => w.replace(/[^a-zA-Z']/g, ''));
	const doc = nlp(sentence);
  
	// Get nouns and verbs from the sentence
	const nounList = doc.nouns().toSingular().out('array');
	const verbList = doc.verbs().out('array');
  
	if (nounList.length < 1 || verbList.length < 1) return null;
  
	const firstVerb = verbList[0];
	const firstVerbIndex = words.findIndex(
	  w => w.toLowerCase() === firstVerb.toLowerCase()
	);
  
	let correct;
	if (type === 'subject') {
	  // Look for noun before the first verb
	  for (let i = 0; i < firstVerbIndex; i++) {
		if (nounList.includes(words[i].toLowerCase())) {
		  correct = words[i];
		  break;
		}
	  }
	} else if (type === 'object') {
	  // Look for noun after the first verb
	  for (let i = firstVerbIndex + 1; i < words.length; i++) {
		if (nounList.includes(words[i].toLowerCase())) {
		  correct = words[i];
		  break;
		}
	  }
	}
  
	if (!correct) return null;
  
	const remaining = words.filter(w => w.toLowerCase() !== correct.toLowerCase());
	const shuffled = [...remaining].sort(() => 0.5 - Math.random());
	const distractors = shuffled.slice(0, 3);
	const allChoices = [...distractors, correct].sort(() => 0.5 - Math.random());
  
	return { choices: allChoices, correct };
  };
  
const getMessage = (score) => {
	if (score <= 3) return 'You need more practice. Try again please.';
	if (score <= 7) return 'Very good but I know you can do better.';
	return 'Amazing! You know your grammar. Try again for more practice.';
};

const SubjectObjectQuiz = () => {
	const [question, setQuestion] = useState(null);
	const [selected, setSelected] = useState('');
	const [result, setResult] = useState('');
	const [showNext, setShowNext] = useState(false);
	const [score, setScore] = useState(0);
	const [questionCount, setQuestionCount] = useState(0);
	const [quizOver, setQuizOver] = useState(false);

	const loadNewQuestion = () => {
		let sentenceObj, data, type;

		do {
			sentenceObj = testCases[Math.floor(Math.random() * testCases.length)];
			type = Math.random() < 0.5 ? 'subject' : 'object'; // randomly pick question type
			data = getChoices(sentenceObj.sentence, type);
		} while (!data);

		setQuestion({
			sentence: sentenceObj.sentence,
			choices: data.choices,
			correct: data.correct,
			type,
		});
		setSelected('');
		setResult('');
		setShowNext(false);
	};

	useEffect(() => {
		loadNewQuestion();
	}, []);

	const handleSelect = (word) => {
		setSelected(word);
	};

	const checkAnswer = () => {
		if (!selected) return;

		if (selected === question.correct) {
			setResult('✅ Correct!');
			setScore(prev => prev + 1);
		} else {
			setResult(`❌ Incorrect. The correct answer is "${question.correct}".`);
		}

		setShowNext(true);
	};

	const nextQuestion = () => {
		const nextCount = questionCount + 1;
		setQuestionCount(nextCount);

		if (nextCount >= 10) {
			setQuizOver(true);
		} else {
			loadNewQuestion();
		}
	};

	const resetQuiz = () => {
		setScore(0);
		setQuestionCount(0);
		setQuizOver(false);
		loadNewQuestion();
	};

	if (!question) return <p>Loading quiz...</p>;

	return (
		<div className="quiz-box">
			<h2>Which word is the <span className="quiz-type">{question.type}</span>?</h2>
			<p className="quiz-sentence">"{question.sentence}"</p>
			<p className="quiz-score">Score: {score}/10</p>

			<div className="choices">
				{question.choices.map((word, i) => (
					<button
						key={i}
						className={`choice-btn ${selected === word ? 'selected' : ''}`}
						onClick={() => handleSelect(word)}
						disabled={showNext || quizOver}
					>
						{word}
					</button>
				))}
			</div>

			{!quizOver && !showNext && (
				<button
					className="check-btn"
					onClick={checkAnswer}
					disabled={!selected}
				>
					Check Answer
				</button>
			)}

			{result && <p className="quiz-result">{result}</p>}

			{!quizOver && showNext && (
				<button className="next-btn" onClick={nextQuestion}>
					Next Question
				</button>
			)}

			{quizOver && (
				<div className="quiz-end">
					<h3>Final Score: {score}/10</h3>
					<p>{getMessage(score)}</p>
					<button className="reset-btn" onClick={resetQuiz}>
						Restart Quiz
					</button>
				</div>
			)}
		</div>
	);
};

export default SubjectObjectQuiz;