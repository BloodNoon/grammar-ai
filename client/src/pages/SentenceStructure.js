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
	const history = useHistory();

	const [lessonPage, setLessonPage] = useState(1);
	const [example, setExample] = useState({ sentence: '', readable: '' });
	const [activePrepTab, setActivePrepTab] = useState('prep1');

	// New states for the lesson1-style quiz
	const [practiceAnswered, setPracticeAnswered] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [feedback, setFeedback] = useState('');
	const [knowledgeSelected, setKnowledgeSelected] = useState(null);

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

	// Original quiz states
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

	// New functions for lesson1-style practice
	const selectAnswer = (answer, isCorrect) => {
		if (practiceAnswered) return;
		
		setPracticeAnswered(true);
		setSelectedAnswer(answer);
		
		if (isCorrect) {
			setFeedback('🎉 Correct! "The Cat" is the subject because it performs the action of running.');
		} else {
			setFeedback('❌ Incorrect. Try to identify who or what is performing the action in the sentence.');
		}
	};

	const selectKnowledgeAnswer = (option) => {
		setKnowledgeSelected(option);
	};

	const resetPractice = () => {
		setPracticeAnswered(false);
		setSelectedAnswer(null);
		setFeedback('');
		setKnowledgeSelected(null);
	};

	const handleNext = () => {
		if (lessonPage < 6) {
			setLessonPage(lessonPage + 1);
		}
	};

	const renderLessonPage = () => {
		return (
			<div style={{
				fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
				background: 'rgba(249, 190, 134, 0.922)',
				minHeight: '100vh',
				padding: '20px'
			}}>
				{/* Header */}
				<div style={{
					color: 'rgb(8, 0, 0)',
					border: '2px solid white',
					borderRadius: '1rem',
					padding: '0.5rem 1rem',
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '35px'
				}}>
					<h1>Sentence Structure Practice</h1>
				</div>

				{lessonPage === 1 && (
					<div style={{
						maxWidth: '1200px',
						margin: '0 auto',
						display: 'grid',
						gridTemplateColumns: '2fr 1fr',
						gap: '20px',
						minHeight: 'calc(100vh - 120px)'
					}}>
						{/* Main Content */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
							{/* Lesson Card */}
							<div style={{
								background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
								borderRadius: '15px',
								padding: '25px',
								boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
							}}>
								<div style={{
									display: 'flex',
									alignItems: 'center',
									gap: '15px',
									marginBottom: '20px'
								}}>
									<div style={{
										width: '60px',
										height: '60px',
										background: '#4CAF50',
										borderRadius: '50%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '24px'
									}}>
										🐸
									</div>
									<div style={{
										background: '#FFD700',
										padding: '10px 20px',
										borderRadius: '25px',
										fontSize: '24px',
										fontWeight: 'bold',
										color: '#333',
										position: 'relative'
									}}>
										Lesson 1: Subject and Objects
										<span style={{
											color: '#FFD700',
											fontSize: '20px',
											position: 'absolute',
											top: '-5px',
											right: '-5px'
										}}>⭐</span>
									</div>
								</div>
								
								<div style={{
									background: 'rgba(255,255,255,0.7)',
									padding: '20px',
									borderRadius: '10px',
									marginBottom: '20px',
									backdropFilter: 'blur(10px)'
								}}>
									<p>The <span style={{
										background: '#FFD700',
										padding: '2px 6px',
										borderRadius: '4px',
										fontWeight: 'bold'
									}}>subject</span> of a sentence is the noun that performs the action, while the <span style={{
										background: '#FFD700',
										padding: '2px 6px',
										borderRadius: '4px',
										fontWeight: 'bold'
									}}>object</span> is the noun that receives the action.</p>
									
									<p style={{ marginTop: '15px' }}>For example:</p>
									<div style={{
										fontStyle: 'italic',
										margin: '10px 0',
										color: '#555'
									}}>The chef prepared dinner.</div>
									<p>In this sentence, <strong>"chef"</strong> is the subject and <strong>"dinner"</strong> is the object.</p>
								</div>
							</div>

							{/* Practice Card */}
							<div style={{
								background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
								borderRadius: '15px',
								padding: '25px',
								boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
							}}>
								<div style={{
									background: '#FF6B35',
									color: 'white',
									padding: '5px 15px',
									borderRadius: '15px',
									fontWeight: 'bold',
									marginBottom: '20px',
									display: 'inline-block'
								}}>
									Sentence Structure
								</div>

								<div style={{
									background: 'linear-gradient(135deg, #ffb347 0%, #ffa500 100%)',
									padding: '25px',
									borderRadius: '15px',
									textAlign: 'center',
									marginBottom: '20px'
								}}>
									<div style={{
										fontSize: '28px',
										fontWeight: 'bold',
										color: '#333',
										marginBottom: '15px'
									}}>
										Which one is the subject?
									</div>
									<div style={{
										background: 'rgba(255,255,255,0.8)',
										padding: '20px',
										borderRadius: '10px',
										fontSize: '20px',
										fontWeight: '500',
										color: '#333'
									}}>
										The cat is running on the table
									</div>
								</div>

								<div style={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: '15px',
									justifyContent: 'center',
									marginBottom: '30px'
								}}>
									{[
										{ text: 'The Cat', color: '#90EE90', correct: true },
										{ text: 'Running', color: '#87CEEB', correct: false },
										{ text: 'On', color: '#DDA0DD', correct: false },
										{ text: 'Is', color: '#FFB6C1', correct: false },
										{ text: 'Table', color: '#F0E68C', correct: false }
									].map((option, index) => (
										<button
											key={index}
											onClick={() => selectAnswer(option.text, option.correct)}
											style={{
												padding: '15px 25px',
												borderRadius: '25px',
												border: 'none',
												fontSize: '16px',
												fontWeight: 'bold',
												cursor: practiceAnswered ? 'not-allowed' : 'pointer',
												transition: 'all 0.3s ease',
												boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
												background: practiceAnswered 
													? (selectedAnswer === option.text 
														? (option.correct ? '#4CAF50' : '#f44336')
														: '#e0e0e0')
													: option.color,
												color: practiceAnswered && selectedAnswer === option.text ? 'white' : '#333',
												pointerEvents: practiceAnswered ? 'none' : 'auto'
											}}
										>
											{option.text}
										</button>
									))}
								</div>

								{feedback && (
									<div style={{
										marginTop: '20px',
										padding: '15px',
										borderRadius: '10px',
										fontWeight: 'bold',
										textAlign: 'center',
										background: feedback.includes('Correct') ? '#d4edda' : '#f8d7da',
										color: feedback.includes('Correct') ? '#155724' : '#721c24',
										border: `1px solid ${feedback.includes('Correct') ? '#c3e6cb' : '#f5c6cb'}`
									}}>
										{feedback}
									</div>
								)}

								<div style={{ textAlign: 'center', marginTop: '20px' }}>
									<button
										onClick={resetPractice}
										style={{
											background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
											color: 'white',
											border: 'none',
											padding: '15px 30px',
											borderRadius: '25px',
											fontSize: '16px',
											fontWeight: 'bold',
											cursor: 'pointer',
											boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
											marginRight: '10px'
										}}
									>
										🔄 Reset Practice
									</button>
								</div>
							</div>

							{/* SubjectNounGame Section */}
							<div style={{
								background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
								borderRadius: '15px',
								padding: '25px',
								boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
								borderTop: '4px solid #4CAF50'
							}}>
								<div style={{
									background: '#4CAF50',
									color: 'white',
									padding: '5px 15px',
									borderRadius: '15px',
									fontWeight: 'bold',
									marginBottom: '20px',
									display: 'inline-block'
								}}>
									🎮 Interactive Game
								</div>
								
								<div style={{
									background: 'rgba(255,255,255,0.7)',
									padding: '20px',
									borderRadius: '10px',
									marginBottom: '20px',
									backdropFilter: 'blur(10px)'
								}}>
									<h3 style={{ 
										fontSize: '24px', 
										fontWeight: 'bold', 
										color: '#333', 
										marginBottom: '15px',
										textAlign: 'center'
									}}>
										Subject & Noun Game
									</h3>
									<SubjectNounGame />
								</div>
							</div>

							{/* SubjectQuiz Section */}
							<div style={{
								background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
								borderRadius: '15px',
								padding: '25px',
								boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
								borderTop: '4px solid #FF6B35'
							}}>
								<div style={{
									background: '#FF6B35',
									color: 'white',
									padding: '5px 15px',
									borderRadius: '15px',
									fontWeight: 'bold',
									marginBottom: '20px',
									display: 'inline-block'
								}}>
									📝 Subject Quiz
								</div>
								
								<div style={{
									background: 'rgba(255,255,255,0.7)',
									padding: '20px',
									borderRadius: '10px',
									marginBottom: '20px',
									backdropFilter: 'blur(10px)'
								}}>
									<h3 style={{ 
										fontSize: '24px', 
										fontWeight: 'bold', 
										color: '#333', 
										marginBottom: '15px',
										textAlign: 'center'
									}}>
										Test Your Knowledge
									</h3>
									<SubjectQuiz />
								</div>
							</div>

							{/* Original Advanced Quiz Section */}
							<div style={{
								background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
								borderRadius: '15px',
								padding: '25px',
								boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
								borderTop: '4px solid #007bff'
							}}>
								<div style={{
									background: '#007bff',
									color: 'white',
									padding: '5px 15px',
									borderRadius: '15px',
									fontWeight: 'bold',
									marginBottom: '20px',
									display: 'inline-block'
								}}>
									🚀 Advanced Challenge
								</div>
								
								<div style={{
									background: 'rgba(255,255,255,0.7)',
									padding: '20px',
									borderRadius: '10px',
									marginBottom: '20px',
									backdropFilter: 'blur(10px)'
								}}>
									<h3 style={{ marginBottom: '1rem', color: '#007bff' }}>Advanced Structure Quiz</h3>
									<p><b>Progress:</b> {progress}/10</p>

									<div style={{ marginBottom: '1rem' }}>
										<button
											onClick={startQuiz}
											disabled={quizStarted || quizEnded}
											style={{
												marginRight: '10px',
												backgroundColor: quizStarted || quizEnded ? '#ccc' : '#4caf50',
												color: 'white',
												padding: '12px 20px',
												border: 'none',
												borderRadius: '25px',
												cursor: quizStarted || quizEnded ? 'not-allowed' : 'pointer',
												fontWeight: 'bold',
												boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
												transition: 'all 0.3s ease'
											}}
										>
											Start Advanced Quiz
										</button>

										<button
											onClick={resetQuiz}
											style={{
												backgroundColor: '#f44336',
												color: 'white',
												padding: '12px 20px',
												border: 'none',
												borderRadius: '25px',
												cursor: 'pointer',
												fontWeight: 'bold',
												boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
												transition: 'all 0.3s ease'
											}}
										>
											Reset Quiz
										</button>
									</div>

									{quizEnded && (
										<div style={{
											background: '#d4edda',
											color: '#155724',
											border: '1px solid #c3e6cb',
											padding: '15px',
											borderRadius: '10px',
											fontWeight: 'bold',
											fontSize: '1.25rem',
											textAlign: 'center'
										}}>
											🎉 Congratulations! You completed the advanced quiz.
										</div>
									)}

									{quizSentence && !quizEnded && (
										<div style={{ marginBottom: '1rem' }}>
											<p style={{ fontSize: '18px', marginBottom: '15px' }}><b>Sentence:</b> {quizSentence}</p>
											<div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
												{quizSentence.split(' ').map((word, index) => (
													<div
														key={index}
														style={{
															display: 'flex',
															flexDirection: 'column',
															alignItems: 'center',
														}}
													>
														<span style={{ fontWeight: 'bold', marginBottom: '5px' }}>{word}</span>
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
																borderRadius: '8px',
																padding: '8px',
																width: '80px',
																textAlign: 'center',
																fontSize: '14px'
															}}
															placeholder="type"
														/>
													</div>
												))}
											</div>

											<div style={{ textAlign: 'center', marginTop: '20px' }}>
												<button 
													onClick={checkAnswers} 
													style={{ 
														backgroundColor: '#28a745',
														color: 'white',
														padding: '12px 25px',
														border: 'none',
														borderRadius: '25px',
														fontWeight: 'bold',
														cursor: 'pointer',
														marginRight: '10px',
														boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
														transition: 'all 0.3s ease'
													}}
												>
													Check Answers
												</button>

												{quizFeedback &&
													quizFeedback.every((val) => val === 'correct') &&
													progress < 10 && (
														<button 
															onClick={startQuiz} 
															style={{ 
																backgroundColor: '#17a2b8',
																color: 'white',
																padding: '12px 25px',
																border: 'none',
																borderRadius: '25px',
																fontWeight: 'bold',
																cursor: 'pointer',
																boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
																transition: 'all 0.3s ease'
															}}
														>
															Next Sentence
														</button>
													)}
											</div>

											{quizFeedback && (
												<div style={{ 
													marginTop: '20px',
													background: 'rgba(255,255,255,0.9)',
													padding: '15px',
													borderRadius: '10px',
													border: '1px solid #ddd'
												}}>
													<p style={{ fontWeight: 'bold', marginBottom: '10px' }}><b>Feedback:</b></p>
													<ul style={{ listStyle: 'none', padding: 0 }}>
														{quizFeedback.map((result, i) => (
															<li key={i} style={{ 
																padding: '5px 0',
																borderBottom: '1px solid #eee'
															}}>
																Word: <b>{quizSentence.split(' ')[i]}</b> — {' '}
																{result === 'correct' ? (
																	<span style={{ color: 'green', fontWeight: 'bold' }}>✓ Correct</span>
																) : (
																	<span style={{ color: 'red', fontWeight: 'bold' }}>✗ Incorrect</span>
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
						</div>

						{/* Sidebar */}
						<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
							{/* Video Card */}
							<div style={{
								background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
								borderRadius: '15px',
								padding: '20px',
								boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
								textAlign: 'center'
							}}>
								<div style={{
									fontSize: '48px',
									fontWeight: 'bold',
									color: '#333',
									margin: '40px 0'
								}}>
									Video
								</div>
								<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
									<video
										controls
										style={{
											width: '100%',
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
							</div>

							{/* Example Card */}
							<div style={{
								background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
								borderRadius: '15px',
								padding: '20px',
								boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
								textAlign: 'center'
							}}>
								<p style={{ marginBottom: '10px' }}><strong>Click here to see more examples</strong></p>
								<div
									onClick={generateRandomExample}
									style={{
										background: 'rgba(255,255,255,0.7)',
										padding: '15px',
										borderRadius: '10px',
										border: '2px dashed #ccc',
										margin: '10px 0',
										cursor: 'pointer',
										transition: 'background 0.3s ease'
									}}
									onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.9)'}
									onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.7)'}
								>
									{example.sentence ? (
										<>
											<strong>Sentence:</strong> {example.sentence}<br />
											<strong>Readable:</strong> {example.readable}
										</>
									) : (
										<>
											<strong>Sentence:</strong> The cat is rolling with ball<br />
											<strong>Readable:</strong> the [determine] cat [noun] .....
										</>
									)}
								</div>
							</div>

							{/* Knowledge Check Card */}
							<div style={{
								background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
								borderRadius: '15px',
								padding: '20px',
								boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
								textAlign: 'center'
							}}>
								<div style={{
									background: 'linear-gradient(135deg, #FFD700, #FFA500)',
									color: '#333',
									padding: '15px',
									borderRadius: '10px',
									fontWeight: 'bold',
									marginBottom: '15px'
								}}>
									⭐ Let's check your knowledge ⭐
								</div>

								<div style={{
									background: 'rgba(255,255,255,0.7)',
									padding: '15px',
									borderRadius: '10px',
									border: '2px dashed #ccc',
									marginBottom: '15px',
									fontSize: '18px',
									fontWeight: '500'
								}}>
									She and I flew with the sky and the cloud
								</div>

								<div style={{
									display: 'grid',
									gridTemplateColumns: '1fr 1fr',
									gap: '10px'
								}}>
									{['She', 'I', 'flew', 'cloud'].map((option, index) => (
										<div
											key={index}
											onClick={() => selectKnowledgeAnswer(option)}
											style={{
												background: knowledgeSelected === option 
													? 'rgba(76, 175, 80, 0.3)' 
													: 'rgba(255,255,255,0.5)',
												border: `2px dashed ${knowledgeSelected === option ? '#4CAF50' : '#ccc'}`,
												padding: '10px',
												borderRadius: '8px',
												cursor: 'pointer',
												transition: 'all 0.3s ease'
											}}
										>
											{option}
										</div>
									))}
								</div>

								<button
									onClick={() => alert('Great job! Moving to the next lesson...')}
									style={{
										background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
										color: 'white',
										border: 'none',
										padding: '15px 30px',
										borderRadius: '25px',
										fontSize: '16px',
										fontWeight: 'bold',
										cursor: 'pointer',
										marginTop: '20px',
										boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
									}}
								>
									🚀 Next Page
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Keep all other lesson pages as they were */}
				{lessonPage === 2 && (
					<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
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
						<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
						</div>
						
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
					<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
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
	<div style={{
		maxWidth: '1200px',
		margin: '0 auto',
		display: 'grid',
		gridTemplateColumns: '2fr 1fr',
		gap: '20px',
		minHeight: 'calc(100vh - 120px)'
	}}>
		{/* Main Content */}
		<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			{/* Lesson Card */}
			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
			}}>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					gap: '15px',
					marginBottom: '20px'
				}}>
					<div style={{
						width: '60px',
						height: '60px',
						background: '#E91E63',
						borderRadius: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '24px'
					}}>
						🎨
					</div>
					<div style={{
						background: '#E91E63',
						padding: '10px 20px',
						borderRadius: '25px',
						fontSize: '24px',
						fontWeight: 'bold',
						color: 'white',
						position: 'relative'
					}}>
						Lesson 4: Adjectives
						<span style={{
							color: '#FFD700',
							fontSize: '20px',
							position: 'absolute',
							top: '-5px',
							right: '-5px'
						}}>⭐</span>
					</div>
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<p>Learn about <span style={{
						background: '#E91E63',
						padding: '2px 6px',
						borderRadius: '4px',
						fontWeight: 'bold',
						color: 'white'
					}}>adjectives</span> - the words that make your sentences more colorful and descriptive! 
					Discover the secret order that English adjectives follow.</p>
					
					<p style={{ marginTop: '15px' }}>For example:</p>
					<div style={{
						fontStyle: 'italic',
						margin: '10px 0',
						color: '#555'
					}}>The beautiful red rose.</div>
					<p>In this phrase, <strong>"beautiful"</strong> and <strong>"red"</strong> are adjectives describing the rose.</p>
				</div>
			</div>

			{/* Adjective Components */}
			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #E91E63'
			}}>
				<div style={{
					background: '#E91E63',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					📖 Adjective Lesson
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdjectiveLesson />
				</div>
			</div>

			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #FF5722'
			}}>
				<div style={{
					background: '#FF5722',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					👑 Royal Order
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdjectiveRoyalOrder />
				</div>
			</div>

			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #9C27B0'
			}}>
				<div style={{
					background: '#9C27B0',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					🏗️ Sentence Structures
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdjectiveSentenceStructures />
				</div>
			</div>

			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #00BCD4'
			}}>
				<div style={{
					background: '#00BCD4',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					📝 Fill in the Blanks
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdjectiveFillBlanks />
				</div>
			</div>

			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #4CAF50'
			}}>
				<div style={{
					background: '#4CAF50',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					🎮 Sorting Game
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdjectiveSortingGame />
				</div>
			</div>

			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #FF6B35'
			}}>
				<div style={{
					background: '#FF6B35',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					🏆 Final Quiz
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdjectiveQuiz />
				</div>
			</div>
		</div>

		{/* Sidebar */}
		<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			{/* Video Card */}
			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '20px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				textAlign: 'center'
			}}>
				<div style={{
					fontSize: '48px',
					fontWeight: 'bold',
					color: '#333',
					margin: '40px 0'
				}}>
				</div>
				<div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
					<video
						controls
						style={{
							width: '100%',
							maxWidth: '200px',
							height: 'auto',
							borderRadius: '8px',
							boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
						}}
					>
						<source src="/lesson4.mp4" type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			</div>

			{/* Example Card */}
			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '20px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				textAlign: 'center'
			}}>
				<p style={{ marginBottom: '10px' }}><strong>Adjective Examples</strong></p>
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '15px',
					borderRadius: '10px',
					border: '2px dashed #E91E63',
					margin: '10px 0'
				}}>
					<strong>Example:</strong> The small, red car<br />
					<strong>Order:</strong> size [small] + color [red] + noun [car]
				</div>
			</div>

			{/* Knowledge Check Card */}
			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '20px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				textAlign: 'center'
			}}>
				<div style={{
					background: 'linear-gradient(135deg, #E91E63, #AD1457)',
					color: 'white',
					padding: '15px',
					borderRadius: '10px',
					fontWeight: 'bold',
					marginBottom: '15px'
				}}>
					⭐ Quick Check ⭐
				</div>

				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '15px',
					borderRadius: '10px',
					border: '2px dashed #ccc',
					marginBottom: '15px',
					fontSize: '18px',
					fontWeight: '500'
				}}>
					The _____ blue ocean
				</div>

				<div style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '10px'
				}}>
					{['beautiful', 'quickly', 'run', 'under'].map((option, index) => (
						<div
							key={index}
							style={{
								background: 'rgba(255,255,255,0.5)',
								border: '2px dashed #ccc',
								padding: '10px',
								borderRadius: '8px',
								cursor: 'pointer',
								transition: 'all 0.3s ease'
							}}
						>
							{option}
						</div>
					))}
				</div>
			</div>
		</div>
	</div>
)}

{lessonPage === 5 && (
	<div style={{
		maxWidth: '1200px',
		margin: '0 auto',
		display: 'grid',
		gridTemplateColumns: '2fr 1fr',
		gap: '20px',
		minHeight: 'calc(100vh - 120px)'
	}}>
		{/* Main Content */}
		<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			{/* Lesson Card */}
			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
			}}>
				<div style={{
					display: 'flex',
					alignItems: 'center',
					gap: '15px',
					marginBottom: '20px'
				}}>
					<div style={{
						width: '60px',
						height: '60px',
						background: '#3F51B5',
						borderRadius: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '24px'
					}}>
						⚡
					</div>
					<div style={{
						background: '#3F51B5',
						padding: '10px 20px',
						borderRadius: '25px',
						fontSize: '24px',
						fontWeight: 'bold',
						color: 'white',
						position: 'relative'
					}}>
						Lesson 5: Adverbs
						<span style={{
							color: '#FFD700',
							fontSize: '20px',
							position: 'absolute',
							top: '-5px',
							right: '-5px'
						}}>⭐</span>
					</div>
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<p>Discover <span style={{
						background: '#3F51B5',
						padding: '2px 6px',
						borderRadius: '4px',
						fontWeight: 'bold',
						color: 'white'
					}}>adverbs</span> - the words that modify verbs, adjectives, and other adverbs! 
					Learn how to use them correctly and understand their flexible placement in sentences.</p>
					
					<p style={{ marginTop: '15px' }}>For example:</p>
					<div style={{
						fontStyle: 'italic',
						margin: '10px 0',
						color: '#555'
					}}>She runs quickly.</div>
					<p>In this sentence, <strong>"quickly"</strong> is an adverb describing how she runs.</p>
				</div>
			</div>

			{/* Adverb Components */}
			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #3F51B5'
			}}>
				<div style={{
					background: '#3F51B5',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					📖 Adverb Lesson
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdverbLesson />
				</div>
			</div>

			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #2196F3'
			}}>
				<div style={{
					background: '#2196F3',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					🔤 Adverb Types
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdverbTypes />
				</div>
			</div>

			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #FF5722'
			}}>
				<div style={{
					background: '#FF5722',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					👑 Royal Order
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdverbRoyalOrder />
				</div>
			</div>

			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #8BC34A'
			}}>
				<div style={{
					background: '#8BC34A',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					📐 Adverb Forms
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdverbForms />
				</div>
			</div>

			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #9C27B0'
			}}>
				<div style={{
					background: '#9C27B0',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					🏗️ Sentence Structures
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdverbSentenceStructures />
				</div>
			</div>

			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #00BCD4'
			}}>
				<div style={{
					background: '#00BCD4',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					🕵️ Identification Game
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdverbIdentificationGame />
				</div>
			</div>

			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #4CAF50'
			}}>
				<div style={{
					background: '#4CAF50',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					🎮 Type Sorting
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdverbTypeSorting />
				</div>
			</div>

			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '25px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				borderTop: '4px solid #FF6B35'
			}}>
				<div style={{
					background: '#FF6B35',
					color: 'white',
					padding: '5px 15px',
					borderRadius: '15px',
					fontWeight: 'bold',
					marginBottom: '20px',
					display: 'inline-block'
				}}>
					🏆 Final Quiz
				</div>
				
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '20px',
					borderRadius: '10px',
					marginBottom: '20px',
					backdropFilter: 'blur(10px)'
				}}>
					<AdverbQuiz />
				</div>
			</div>
		</div>

		{/* Sidebar */}
		<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
			{/* Empty Video Card for Lesson 5 */}
			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '20px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				textAlign: 'center'
			}}>
				<div style={{
					fontSize: '48px',
					fontWeight: 'bold',
					color: '#333',
					margin: '40px 0'
				}}>
					Video
				</div>
				<div style={{ 
					display: 'flex', 
					justifyContent: 'center', 
					alignItems: 'center',
					margin: '2rem 0',
					height: '150px',
					background: 'rgba(0,0,0,0.1)',
					borderRadius: '8px',
					color: '#666',
					fontSize: '16px',
					fontStyle: 'italic'
				}}>
					Video coming soon...
				</div>
			</div>

			{/* Example Card */}
			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '20px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				textAlign: 'center'
			}}>
				<p style={{ marginBottom: '10px' }}><strong>Adverb Examples</strong></p>
				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '15px',
					borderRadius: '10px',
					border: '2px dashed #3F51B5',
					margin: '10px 0'
				}}>
					<strong>Example:</strong> She sings beautifully<br />
					<strong>Type:</strong> manner [beautifully] modifies verb [sings]
				</div>
			</div>

			{/* Knowledge Check Card */}
			<div style={{
				background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
				borderRadius: '15px',
				padding: '20px',
				boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
				textAlign: 'center'
			}}>
				<div style={{
					background: 'linear-gradient(135deg, #3F51B5, #303F9F)',
					color: 'white',
					padding: '15px',
					borderRadius: '10px',
					fontWeight: 'bold',
					marginBottom: '15px'
				}}>
					⭐ Quick Check ⭐
				</div>

				<div style={{
					background: 'rgba(255,255,255,0.7)',
					padding: '15px',
					borderRadius: '10px',
					border: '2px dashed #ccc',
					marginBottom: '15px',
					fontSize: '18px',
					fontWeight: '500'
				}}>
					He speaks _____ clearly
				</div>

				<div style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '10px'
				}}>
					{['very', 'blue', 'table', 'under'].map((option, index) => (
						<div
							key={index}
							style={{
								background: 'rgba(255,255,255,0.5)',
								border: '2px dashed #ccc',
								padding: '10px',
								borderRadius: '8px',
								cursor: 'pointer',
								transition: 'all 0.3s ease'
							}}
						>
							{option}
						</div>
					))}
				</div>
			</div>
		</div>
	</div>
)}

				{lessonPage === 6 && (
					<div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
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
											🏆 -- Remove if desired --
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
										{/* PREP3 COMPONENTS */}
										<SentenceScramble />
										<PrepositionBuilder />
										<PrepositionQuizFinal />
									</>
								)}

							</div>
						</div>
					</div>
				)}

				{/* Bottom Navigation Buttons */}
				<div style={{ 
					display: 'flex', 
					justifyContent: 'space-between', 
					marginTop: '2rem',
					maxWidth: '1200px',
					margin: '2rem auto 0 auto',
					padding: '0 2rem'
				}}>
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