import React, { useState, useEffect } from 'react';
import nlp from 'compromise';
import { testCases } from './TestCases';
import './SubjectQuiz.css';

const getChoices = (sentence) => {
	const words = sentence.split(' ').map(w => w.replace(/[^a-zA-Z']/g, '')); // remove punctuation
	const doc = nlp(sentence);
	const subjects = doc.nouns().toSingular().out('array');

	const correct = subjects[0]; // only take the first subject found
	if (!correct || !words.includes(correct)) return null;

	// Remove the correct word from the list of words to pick distractors
	const remaining = words.filter(w => w !== correct);
	const shuffled = [...remaining].sort(() => 0.5 - Math.random());
	const distractors = shuffled.slice(0, 3);

	// Shuffle correct + distractors
	const allChoices = [...distractors, correct].sort(() => 0.5 - Math.random());

	return { choices: allChoices, correct };
};

const getMessage = (score) => {
	if (score <= 3) return 'You need more practice. Try again please.';
	if (score <= 7) return 'Very good but I know you can do better.';
	return 'Amazing! You know your subjects. Try again for more practice.';
};

const SubjectQuiz = () => {
	const [question, setQuestion] = useState(null);
	const [selected, setSelected] = useState('');
	const [result, setResult] = useState('');
	const [showNext, setShowNext] = useState(false);
	const [score, setScore] = useState(0);
	const [questionCount, setQuestionCount] = useState(0);
	const [quizOver, setQuizOver] = useState(false);

	const loadNewQuestion = () => {
		let sentenceObj, data;
		do {
			sentenceObj = testCases[Math.floor(Math.random() * testCases.length)];
			data = getChoices(sentenceObj.sentence);
		} while (!data);

		setQuestion({
			sentence: sentenceObj.sentence,
			choices: data.choices,
			correct: data.correct
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
			<h2>Which word is the subject?</h2>
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

export default SubjectQuiz;