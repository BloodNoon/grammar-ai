import React, { useState } from 'react';
import SentenceStructure from '../utils/SentenceChecker/SentenceStructure';
import SentenceStructurev2 from '../utils/SentenceChecker/SentenceStructurev2';
import StructureChecker from '../utils/SentenceChecker/StructureChecker';
import nlp from 'compromise';
import { testCases } from '../utils/SentenceChecker/TestCases';

function tagWordsWithCompromise(sentence) {
	const doc = nlp(sentence);
	const allSentences = doc.sentences().json();
	const taggedWords = [];

	const tagMap = {
		Determiner: 'determiner',
		Adjective: 'adjective',
		Noun: 'noun',
		Pronoun: 'pronoun',
		Verb: 'verb',
		Preposition: 'preposition',
		Conjunction: 'conjunction',
	};

	for (const sentenceObj of allSentences) {
		for (const term of sentenceObj.terms) {
			const word = term.text;
			const tags = term.tags || [];

			let label = '';
			for (const [compTag, customLabel] of Object.entries(tagMap)) {
				if (tags.includes(compTag)) {
					label = customLabel;
					break;
				}
			}

			taggedWords.push(label ? `${word}[${label}]` : word);
		}
	}

	return taggedWords.join(' ');
}

const SentenceStructures = () => {
	const [example, setExample] = useState({ sentence: '', readable: '' });

	const generateRandomExample = () => {
		if (testCases.length === 0) return;

		const randomIndex = Math.floor(Math.random() * testCases.length);
		const selected = testCases[randomIndex];

		const readableStructure = tagWordsWithCompromise(selected.sentence);

		setExample({
			sentence: selected.sentence,
			readable: readableStructure,
		});
	};

	/****************************** Click Quiz *****************************************/
	const [quizSentence, setQuizSentence] = useState('');
	const [userInputs, setUserInputs] = useState([]);
	const [quizFeedback, setQuizFeedback] = useState(null);
	const [progress, setProgress] = useState(0); // Track progress out of 10

	const startQuiz = () => {
		const randomIndex = Math.floor(Math.random() * testCases.length);
		const selected = testCases[randomIndex];
		const words = selected.sentence.split(' ');
		setQuizSentence(selected.sentence);
		setUserInputs(Array(words.length).fill(''));
		setQuizFeedback(null);
	};

	const handleInputChange = (index, value) => {
		const updatedInputs = [...userInputs];
		updatedInputs[index] = value;
		setUserInputs(updatedInputs);
	};

	const checkAnswers = () => {
		const tagged = tagWordsWithCompromise(quizSentence);
		const expectedTags = tagged.split(' ').map((taggedWord) => {
			const match = taggedWord.match(/\[(.*?)\]$/);
			return match ? match[1].toLowerCase() : '';
		});

		const correctness = expectedTags.map((expected, i) =>
			userInputs[i]?.toLowerCase() === expected ? 'correct' : 'incorrect'
		);

		setQuizFeedback(correctness);

		// If all correct and not yet at 10, increase progress
		if (correctness.every((val) => val === 'correct') && progress < 10) {
			setProgress(prev => prev + 1);
		}
	};

	const handleNext = () => {
		// Only allow if all are correct
		if (quizFeedback && quizFeedback.every((val) => val === 'correct')) {
			startQuiz();
		}
	};

	return (
		<div className="container">
			<h2 style={{ fontSize: '72px' }}>Sentence Structure Practice</h2>

			{/* Example Box */}
			<div
				className="example-box"
				onClick={generateRandomExample}
				style={{
					cursor: 'pointer',
					padding: '1rem',
					backgroundColor: '#f0f0f0',
					border: '1px solid #ccc',
					borderRadius: '8px',
					marginBottom: '2rem',
					userSelect: 'none',
				}}
			>
				<b>Click here to see an example:</b>
				<div style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
					{example.sentence ? (
						<>
							<div><b>Sentence:</b> {example.sentence}</div>
							<div style={{ color: '#555', marginTop: '0.25rem' }}>
								<b>Readable:</b> {example.readable}
							</div>
						</>
					) : null}
				</div>
			</div>

			{/* Quiz Section */}
			<div
				className="quiz-box"
				style={{
					borderTop: '2px solid #888',
					paddingTop: '1.5rem',
					marginTop: '2rem',
				}}
			>
				<h3 style={{ marginBottom: '1rem' }}>Click Quiz</h3>

				{/* Progress Display */}
				<p><b>Progress:</b> {progress}/10</p>

				<button onClick={startQuiz} style={{ marginBottom: '1rem' }}>
					Start Quiz
				</button>

				{quizSentence && (
					<div style={{ marginBottom: '1rem' }}>
						<p><b>Sentence:</b> {quizSentence}</p>
						<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
							{quizSentence.split(' ').map((word, index) => (
								<div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
									<span>{word}</span>
									<input
										type="text"
										value={userInputs[index]}
										onChange={(e) => handleInputChange(index, e.target.value)}
										style={{
											borderColor:
												quizFeedback && quizFeedback[index] === 'correct'
													? 'green'
													: quizFeedback && quizFeedback[index] === 'incorrect'
													? 'red'
													: '#ccc',
											borderWidth: '2px',
											borderRadius: '4px',
											padding: '4px',
											width: '80px',
											textAlign: 'center',
										}}
										placeholder="type"
									/>
								</div>
							))}
						</div>

						{/* Check Answers */}
						<button onClick={checkAnswers} style={{ marginTop: '1rem', marginRight: '1rem' }}>
							Check Answers
						</button>

						{/* Next Button - Only if all correct */}
						{quizFeedback && quizFeedback.every((val) => val === 'correct') && (
							<button onClick={handleNext} style={{ marginTop: '1rem' }}>
								Next
							</button>
						)}

						{/* Feedback Section */}
						{quizFeedback && (
							<div style={{ marginTop: '1rem' }}>
								<p><b>Feedback:</b></p>
								<ul>
									{quizFeedback.map((result, i) => (
										<li key={i}>
											Word: <b>{quizSentence.split(' ')[i]}</b> —{' '}
											{result === 'correct' ? (
												<span style={{ color: 'green' }}>Correct</span>
											) : (
												<span style={{ color: 'red' }}>Incorrect</span>
											)}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default SentenceStructures;