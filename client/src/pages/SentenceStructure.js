import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import nlp from 'compromise';
import { testCases } from '../utils/SentenceChecker/TestCases';
import SubjectNounGame from '../utils/SentenceChecker/SubjectNounGame';
import SubjectQuiz from '../utils/SentenceChecker/SubjectQuiz';
import VerbTenseStructure from './VerbTenseStructure';
import ArticleStructure from './ArticleStructure';
// ADJECTIVE COMPONENTS
import AdjectiveLesson from '../utils/SentenceChecker/AdjectiveLesson';
import AdjectiveRoyalOrder from '../utils/SentenceChecker/AdjectiveRoyalOrder';
import AdjectiveSentenceStructures from '../utils/SentenceChecker/AdjectiveSentenceStructures';
import AdjectiveFillBlanks from '../utils/SentenceChecker/AdjectiveFillBlanks';
import AdjectiveSortingGame from '../utils/SentenceChecker/AdjectiveSortingGame';
import AdjectiveQuiz from '../utils/SentenceChecker/AdjectiveQuiz';
// ADVERB COMPONENTS
import AdverbLesson from '../utils/SentenceChecker/AdverbLesson';
import AdverbTypes from '../utils/SentenceChecker/AdverbTypes';
import AdverbRoyalOrder from '../utils/SentenceChecker/AdverbRoyalOrder';
import AdverbForms from '../utils/SentenceChecker/AdverbForms';
import AdverbSentenceStructures from '../utils/SentenceChecker/AdverbSentenceStructures';
import AdverbIdentificationGame from '../utils/SentenceChecker/AdverbIdentificationGame';
import AdverbTypeSorting from '../utils/SentenceChecker/AdverbTypeSorting';
import AdverbQuiz from '../utils/SentenceChecker/AdverbQuiz';
// PREP1 COMPONENTS
import PrepositionSorter from '../utils/SentenceChecker/PrepositionSorter';
import PrepositionStructureGame from '../utils/SentenceChecker/PrepositionStructureGame';
import PrepositionQuiz from '../utils/SentenceChecker/PrepositionQuiz';
// PREP2 COMPONENTS
import PrepositionPhraseLesson from '../utils/SentenceChecker/PrepositionPhraseLesson';
import PrepositionPhraseFillBlanks from '../utils/SentenceChecker/PrepositionPhraseFillBlanks';
import PrepositionPhraseWordBlocks from '../utils/SentenceChecker/PrepositionPhraseWordBlocks';
import PrepositionPhraseTesting from '../utils/SentenceChecker/PrepositionPhraseTesting';
import PrepositionPhraseSorting from '../utils/SentenceChecker/PrepositionPhraseSorting';
// PREP3 COMPONENTS
import SentenceScramble from '../utils/SentenceChecker/SentenceScramble';
import PrepositionBuilder from '../utils/SentenceChecker/PrepositionBuilder';
import PrepositionQuizFinal from '../utils/SentenceChecker/PrepositionQuizFinal';

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
	// ADD THIS: Use React Router's useHistory hook
	const history = useHistory();

	const [lessonPage, setLessonPage] = useState(1);
	const [example, setExample] = useState({ sentence: '', readable: '' });
	const [activePrepTab, setActivePrepTab] = useState('prep1');

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

	// MODIFIED: Updated handleNext for normal lesson navigation
	const handleNext = () => {
		if (lessonPage < 6) { // Updated to 6 lessons
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
					<h3>Lesson {lessonPage} of 6</h3> {/* Updated to 6 lessons */}
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
								<h3 style={{ marginBottom: '1rem' }}>Structure Quiz</h3>
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
															Word: <b>{quizSentence.split(' ')[i]}</b> – {' '}
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
										padding: '1.5rem',
										backgroundColor: '#f9f9f9', // subtle light gray
										border: '1px solid #ddd', // clean solid border
										borderRadius: '10px',
										boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)', // gentle shadow
										marginBottom: '2rem', // spacing between components
									}}
									>
									<SubjectNounGame />
									</div>

									<div
									style={{
										padding: '1.5rem',
										backgroundColor: '#f9f9f9',
										border: '1px solid #ddd',
										borderRadius: '10px',
										boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
										marginBottom: '2rem',
									}}
									>
									<SubjectQuiz />
									</div>

							</div>
						</>
					)}

					{lessonPage === 2 && (
						<div>
							<h2>Lesson 2: Verb Tense Structure</h2>
							<div style={{ 
								padding: '1rem', 
								backgroundColor: '#e8f5e8', 
								borderRadius: '10px', 
								marginBottom: '2rem',
								border: '2px solid #28a745'
							}}>
								<h3 style={{ color: '#28a745', marginBottom: '1rem' }}>🚀 Advanced Grammar Time!</h3>
								<p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
									Now let's dive into verb tenses and auxiliary verbs! This will help you understand 
									how to use helping verbs like "is", "are", "have", "will" with main verbs.
								</p>
							</div>
							
							{/* EMBED THE ENTIRE VerbTenseStructure COMPONENT */}
							<div style={{ 
								marginTop: '2rem',
								padding: '2rem',
								backgroundColor: '#f8f9fa',
								borderRadius: '10px',
								border: '1px solid #dee2e6'
							}}>
								<VerbTenseStructure />
							</div>
						</div>
					)}

					{lessonPage === 3 && (
						<div>
							<h2>Lesson 3: Article Structure</h2>
							<div style={{ 
								padding: '1rem', 
								backgroundColor: '#e8f5e8', 
								borderRadius: '10px', 
								marginBottom: '2rem',
								border: '2px solid #28a745'
							}}>
								<h3 style={{ color: '#28a745', marginBottom: '1rem' }}>📚 Master Articles!</h3>
								<p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
									Time to learn about definite and indefinite articles! This lesson will teach you 
									when to use "a", "an", and "the" correctly in your sentences.
								</p>
							</div>
							
							{/* EMBED THE ENTIRE ArticleStructure COMPONENT */}
							<div style={{ 
								marginTop: '2rem',
								padding: '2rem',
								backgroundColor: '#f8f9fa',
								borderRadius: '10px',
								border: '1px solid #dee2e6'
							}}>
								<ArticleStructure />
							</div>
						</div>
					)}

					{lessonPage === 4 && (
						<div>
							<h2>Lesson 4: Adjectives</h2>
							<div style={{ 
								padding: '1rem', 
								backgroundColor: '#e8f5e8', 
								borderRadius: '10px', 
								marginBottom: '2rem',
								border: '2px solid #28a745'
							}}>
								<h3 style={{ color: '#28a745', marginBottom: '1rem' }}> Master Descriptive Words!</h3>
								<p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
									Learn about adjectives - the words that make your sentences more colorful and descriptive! 
									Discover the secret order that English adjectives follow.
								</p>
							</div>

							{/* ADJECTIVE COMPONENTS */}
							<AdjectiveLesson />
							<AdjectiveRoyalOrder />
							<AdjectiveSentenceStructures />
							<AdjectiveFillBlanks />
							<AdjectiveSortingGame />
							<AdjectiveQuiz />
						</div>
					)}

					{lessonPage === 5 && (
						<div>
							<h2>Lesson 5: Adverbs</h2>
							<div style={{ 
								padding: '1rem', 
								backgroundColor: '#e8f5e8', 
								borderRadius: '10px', 
								marginBottom: '2rem',
								border: '2px solid #28a745'
							}}>
								<h3 style={{ color: '#28a745', marginBottom: '1rem' }}> Master Action Modifiers!</h3>
								<p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
									Discover adverbs - the words that modify verbs, adjectives, and other adverbs! 
									Learn how to use them correctly and understand their flexible placement in sentences.
								</p>
							</div>

							{/* ADVERB COMPONENTS */}
							<AdverbLesson />
							<AdverbTypes />
							<AdverbRoyalOrder />
							<AdverbForms />
							<AdverbSentenceStructures />
							<AdverbIdentificationGame />
							<AdverbTypeSorting />
							<AdverbQuiz />
						</div>
					)}

					{lessonPage === 6 && (
						<div
							style={{
								textAlign: 'center',
								padding: '2rem',
								backgroundColor: '#fdfdfd',
								border: '2px solid #eee',
								borderRadius: '10px',
							}}
						>
							{/* Tabs */}
							<div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
								{['prep1', 'prep2', 'prep3'].map((tabKey, index) => (
									<button
										key={tabKey}
										onClick={() => setActivePrepTab(tabKey)}
										style={{
											padding: '10px 20px',
											margin: '0 5px',
											border: '1px solid #ccc',
											borderBottom: activePrepTab === tabKey ? 'none' : '1px solid #ccc',
											backgroundColor: activePrepTab === tabKey ? '#fff' : '#eee',
											fontWeight: activePrepTab === tabKey ? 'bold' : 'normal',
											cursor: 'pointer',
											borderTopLeftRadius: '8px',
											borderTopRightRadius: '8px',
										}}
									>
										{`Prep ${index + 1}`}
									</button>
								))}
							</div>

							{/* Tab Content */}
							<div
								style={{
									padding: '2rem',
									border: '1px solid #ccc',
									borderTop: 'none',
									borderRadius: '0 0 10px 10px',
									backgroundColor: '#fff',
								}}
							>
								{activePrepTab === 'prep1' && (
									<>
										<h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '1rem' }}>
											Prepositions
										</h1>

										<p
											style={{
												fontSize: '1.25rem',
												maxWidth: '700px',
												margin: '0 auto',
												lineHeight: '1.6',
											}}
										>
											A <strong>preposition</strong> is a word that indicates the relationship between a noun or
											pronoun and other words in a sentence.
										</p>

										{/* Completion message for lesson 6 */}
										<div style={{ 
											marginTop: '2rem', 
											padding: '1.5rem',
											backgroundColor: '#e8f5e8',
											borderRadius: '10px',
											border: '2px solid #28a745'
										}}>
											<h3 style={{ color: '#28a745', marginBottom: '1rem' }}>🎉 Congratulations!</h3>
											<p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
												You've completed all 6 lessons of Sentence Structure! 
												You've learned about subjects, objects, verb tenses, articles, adjectives, adverbs, and prepositions.
											</p>
											<p style={{ fontSize: '1rem', marginTop: '1rem', fontWeight: 'bold', color: '#28a745' }}>
											 -- Remove if desired --
											</p>
										</div>

										{/* Types of Prepositions Section */}
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
												<source src="/lesson6.mp4" type="video/mp4" />
												Your browser does not support the video tag.
											</video>
										</div>
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
												Types of Prepositions:
											</h2>

											<ul
												style={{
													listStyle: 'none',
													padding: 0,
													fontSize: '18px',
													lineHeight: '2',
													color: '#333',
												}}
											>
												<li>
													<span style={{ fontWeight: 'bold', color: '#007acc' }}>Time:</span> before, during, after
												</li>
												<li>
													<span style={{ fontWeight: 'bold', color: '#e67e22' }}>Place:</span> in, on, under
												</li>
												<li>
													<span style={{ fontWeight: 'bold', color: '#27ae60' }}>Direction:</span> to, through, around
												</li>
												<li>
													<span style={{ fontWeight: 'bold', color: '#9b59b6' }}>Situation:</span> with, for, about
												</li>
												<li>
													<span style={{ fontWeight: 'bold', color: '#c0392b' }}>Comparison:</span> like, as, than
												</li>
											</ul>
										</div>

										{/* Sentence Structure Formulas Section */}
										<div
											style={{
												marginTop: '2.5rem',
												maxWidth: '800px',
												marginLeft: 'auto',
												marginRight: 'auto',
												textAlign: 'left',
											}}
										>
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
														marginBottom: '1.5rem',
														color: '#333',
														textAlign: 'center',
													}}
												>
													Sentence Structure Formulas for Prepositions:
												</h2>

												{/* Formula Boxes */}
												<div
													style={{
														display: 'flex',
														flexDirection: 'column',
														gap: '1.5rem',
													}}
												>
													<div
														style={{
															backgroundColor: '#e3f2fd',
															padding: '1rem',
															borderRadius: '12px',
															boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
														}}
													>
														<strong style={{ color: '#1565c0' }}>Formula:</strong> Pronoun + verb + preposition + article + noun <br />
														<em>Example: She walked <span style={{ color: '#007acc' }}>to</span> the store.</em>
													</div>

													<div
														style={{
															backgroundColor: '#fff3e0',
															padding: '1rem',
															borderRadius: '12px',
															boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
														}}
													>
														<strong style={{ color: '#ef6c00' }}>Formula:</strong> Article + noun + verb + preposition + article + noun <br />
														<em>Example: The dog ran <span style={{ color: '#e67e22' }}>through</span> the yard.</em>
													</div>

													<div
														style={{
															backgroundColor: '#e8f5e9',
															padding: '1rem',
															borderRadius: '12px',
															boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
														}}
													>
														<strong style={{ color: '#2e7d32' }}>Formula:</strong> Noun + verb + article + noun + preposition + noun <br />
														<em>Example: Mark gave the book <span style={{ color: '#27ae60' }}>to</span> Sarah.</em>
													</div>

													<div
														style={{
															backgroundColor: '#f3e5f5',
															padding: '1rem',
															borderRadius: '12px',
															boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
														}}
													>
														<strong style={{ color: '#8e24aa' }}>Formula:</strong> Noun + verb + preposition + gerund + noun <br />
														<em>Example: They talked <span style={{ color: '#9b59b6' }}>about</span> eating lunch.</em>
													</div>

													<div
														style={{
															backgroundColor: '#ffebee',
															padding: '1rem',
															borderRadius: '12px',
															boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
														}}
													>
														<strong style={{ color: '#c62828' }}>Formula:</strong> Preposition + article + noun + comma + noun + verb + article + noun <br />
														<em>Example: <span style={{ color: '#c0392b' }}>After</span> the movie, Jack ate the pizza.</em>
													</div>
												</div>
											</div>
										</div>
										{/* PREP1 COMPONENTS */}
										<PrepositionSorter />
										<PrepositionStructureGame />
										<PrepositionQuiz />
									</>
								)}

								{activePrepTab === 'prep2' && (
									<>
										<h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '1rem' }}>
											Prepositional Phrases
										</h1>

										<p
											style={{
												fontSize: '1.25rem',
												maxWidth: '700px',
												margin: '0 auto',
												lineHeight: '1.6',
											}}
										>
											A <strong>prepositional phrase</strong> is a group of words that begins with a preposition and ends with a noun or pronoun. It adds detail about time, place, or manner.
										</p>

										{/* PREP2 COMPONENTS */}
										<PrepositionPhraseLesson />
										<PrepositionPhraseFillBlanks />
										<PrepositionPhraseWordBlocks />
										<PrepositionPhraseTesting />
										<PrepositionPhraseSorting />
									</>
								)}

						{activePrepTab === 'prep3' && (
						<>
							<h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '1rem' }}>
							Compound Prepositions
							</h1>

							<p
							style={{
								fontSize: '1.25rem',
								maxWidth: '700px',
								margin: '0 auto',
								lineHeight: '1.6',
							}}
							>
							A <strong>compound preposition</strong> is a phrase that works like a single 
							preposition, connecting a noun or pronoun to another word in the sentence.
							</p>

							{/* Different Compound Prepositions Section */}
							<div
							style={{
								marginTop: '2rem',
								padding: '1.5rem',
								backgroundColor: '#f0f8ff',
								borderRadius: '10px',
								maxWidth: '900px',
								marginLeft: 'auto',
								marginRight: 'auto',
								boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
							}}
							>
							<h2
								style={{
								fontSize: '28px',
								fontWeight: 'bold',
								marginBottom: '1.5rem',
								color: '#333',
								textAlign: 'center',
								}}
							>
								Different Compound Prepositions
							</h2>

							<div
								style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(4, 1fr)',
								gap: '1rem',
								}}
							>
								{[
								"According to", "As of", "As well as", "Aside from",
								"Because of", "In addition to", "Ahead of", "Due to",
								"Along with", "Out of", "Next to", "Instead of",
								"Prior to", "In respect to", "In spite of", "In place of"
								].map((prep, idx) => (
								<div
									key={idx}
									style={{
									border: '2px dotted #007acc',
									borderRadius: '8px',
									padding: '1rem',
									textAlign: 'center',
									fontSize: '16px',
									fontWeight: '500',
									backgroundColor: idx % 2 === 0 ? '#ffffff' : '#e6f2fa',
									color: '#333',
									boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
									minHeight: '70px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									}}
								>
									{prep}
								</div>
								))}
							</div>
							</div>
							<SentenceScramble />
							<PrepositionBuilder />
							<PrepositionQuizFinal />
						</>
						)}

						</div>
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

					{/* Next Button with normal lesson navigation */}
					<button
						onClick={handleNext}
						style={{
							backgroundColor: lessonPage === 6 ? '#ccc' : '#007bff',
							color: 'white',
							padding: '10px 20px',
							border: 'none',
							borderRadius: '5px',
							cursor: lessonPage === 6 ? 'not-allowed' : 'pointer',
						}}
						disabled={lessonPage === 6}
					>
						{lessonPage === 6 ? 'Completed!' : 'Next'}
					</button>
				</div>
			</div>
		);
	};

	return renderLessonPage();
};

export default SentenceStructures;