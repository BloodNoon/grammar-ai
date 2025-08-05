import React, { useState } from 'react';
import nlp from 'compromise';
import { testCases } from '../utils/SentenceChecker/TestCases';
import SubjectQuiz from '../utils/SentenceChecker/SubjectQuiz';

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
	const [lessonPage, setLessonPage] = useState(1);
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

	// Click Quiz
	const [quizSentence, setQuizSentence] = useState('');
	const [userInputs, setUserInputs] = useState([]);
	const [quizFeedback, setQuizFeedback] = useState(null);
	const [progress, setProgress] = useState(0);
	const [quizStarted, setQuizStarted] = useState(false);
	const [quizEnded, setQuizEnded] = useState(false);

	const startQuiz = () => {
		if (progress >= 10) return;

		const randomIndex = Math.floor(Math.random() * testCases.length);
		const selected = testCases[randomIndex];
		const words = selected.sentence.split(' ');

		setQuizSentence(selected.sentence);
		setUserInputs(Array(words.length).fill(''));
		setQuizFeedback(null);
		setQuizStarted(true);
	};

	const resetQuiz = () => {
		setQuizSentence('');
		setUserInputs([]);
		setQuizFeedback(null);
		setProgress(0);
		setQuizStarted(false);
		setQuizEnded(false);
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

		if (correctness.every((val) => val === 'correct')) {
			if (progress < 9) {
				setProgress((prev) => prev + 1);
			} else {
				setProgress(10);
				setQuizEnded(true);
			}
		}
	};

	const handleNext = () => {
		if (lessonPage < 4) {
			setLessonPage(lessonPage + 1);
		}
	};

	const renderLessonPage = () => {
		return (
			<div
				className="container"
				style={{
					padding: '2rem',
					minHeight: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
			>
				{/* Header */}
				<div>
					<h3>Lesson {lessonPage} of 4</h3>
					<hr style={{ marginBottom: '2rem' }} />
				</div>

				{/* Main Content */}
				<div style={{ flexGrow: 1 }}>
					{lessonPage === 1 && (
						<>
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
									{example.sentence && (
										<>
											<div><b>Sentence:</b> {example.sentence}</div>
											<div style={{ color: '#555', marginTop: '0.25rem' }}>
												<b>Readable:</b> {example.readable}
											</div>
										</>
									)}
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
								<p><b>Progress:</b> {progress}/10</p>

								<div style={{ marginBottom: '1rem' }}>
									<button
										onClick={startQuiz}
										disabled={quizStarted || quizEnded}
										style={{
											marginRight: '10px',
											backgroundColor: quizStarted || quizEnded ? '#ccc' : '#4caf50',
											color: 'white',
											padding: '8px 16px',
											border: 'none',
											borderRadius: '4px',
											cursor: quizStarted || quizEnded ? 'not-allowed' : 'pointer',
										}}
									>
										Start Quiz
									</button>

									<button
										onClick={resetQuiz}
										style={{
											backgroundColor: '#f44336',
											color: 'white',
											padding: '8px 16px',
											border: 'none',
											borderRadius: '4px',
											cursor: 'pointer',
										}}
									>
										Reset Quiz
									</button>
								</div>

								{quizEnded && (
									<p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'green' }}>
										Congratulations! You completed the quiz.
									</p>
								)}

								{quizSentence && !quizEnded && (
									<div style={{ marginBottom: '1rem' }}>
										<p><b>Sentence:</b> {quizSentence}</p>
										<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
											{quizSentence.split(' ').map((word, index) => (
												<div
													key={index}
													style={{
														display: 'flex',
														flexDirection: 'column',
														alignItems: 'center',
													}}
												>
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

										<button onClick={checkAnswers} style={{ marginTop: '1rem', marginRight: '1rem' }}>
											Check Answers
										</button>

										{quizFeedback &&
											quizFeedback.every((val) => val === 'correct') &&
											progress < 10 && (
												<button onClick={handleNext} style={{ marginTop: '1rem' }}>
													Next Sentence
												</button>
											)}

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

							{/* Lesson 1 Content */}
							<div
								className="lesson-container"
								style={{
									marginTop: '4rem',
									padding: '2rem',
									backgroundColor: '#fdfdfd',
									border: '2px solid #eee',
									borderRadius: '10px',
								}}
							>
								<h2 style={{ marginBottom: '1rem' }}>Lesson 1: Subjects and Objects</h2>

								<div
									style={{
										backgroundColor: '#f9f9f9',
										padding: '1.5rem',
										border: '1px solid #ccc',
										borderRadius: '8px',
										marginBottom: '2rem',
									}}
								>
									<p style={{ fontSize: '1.1rem' }}>
										The <strong>subject</strong> of a sentence is the noun that performs the action,
										while the <strong>object</strong> is the noun that receives the action.
										<br /><br />
										For example:
										<br />
										<span style={{ fontStyle: 'italic', marginLeft: '1rem' }}>
											The chef prepared dinner.
										</span>
										<br />
										In this sentence, "<strong>chef</strong>" is the subject and "<strong>dinner</strong>" is the object.
									</p>
								</div>

								<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
									<video
										controls
										style={{
											width: '50%',
											maxWidth: '200px',
											height: 'auto',
											borderRadius: '8px',
											boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
										}}
									>
										<source src="/lesson1.mp4" type="video/mp4" />
										Your browser does not support the video tag.
									</video>
								</div>

								<div
									style={{
										padding: '1rem',
										backgroundColor: '#fffbe6',
										border: '1px dashed #999',
										borderRadius: '8px',
									}}
								>
									<SubjectQuiz />
								</div>
							</div>
						</>
					)}

					{lessonPage === 2 && (
						<div>
							<h2>Lesson 2</h2>
							<p>(Coming soon...)</p>
						</div>
					)}

					{lessonPage === 3 && (
						<div>
							<h2>Lesson 3</h2>
							<p>(Coming soon...)</p>
						</div>
					)}

					{lessonPage === 4 && (
						<div>
							<h2>Lesson 4</h2>
							<p>(Ready to build here)</p>
						</div>
					)}
				</div>

				{/* Bottom Navigation Buttons */}
				<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
					{/* Previous Button */}
					<button
						onClick={() => setLessonPage((prev) => Math.max(1, prev - 1))}
						style={{
							backgroundColor: lessonPage === 1 ? '#ccc' : '#007bff',
							color: 'white',
							padding: '10px 20px',
							border: 'none',
							borderRadius: '5px',
							cursor: lessonPage === 1 ? 'not-allowed' : 'pointer',
						}}
						disabled={lessonPage === 1}
					>
						Previous
					</button>

					{/* Next Button */}
					<button
						onClick={handleNext}
						style={{
							backgroundColor: lessonPage === 4 ? '#ccc' : '#007bff',
							color: 'white',
							padding: '10px 20px',
							border: 'none',
							borderRadius: '5px',
							cursor: lessonPage === 4 ? 'not-allowed' : 'pointer',
						}}
						disabled={lessonPage === 4}
					>
						Next
					</button>
				</div>
			</div>
		);
	};

	return renderLessonPage();
};

export default SentenceStructures;