import React, { useState } from 'react';
import nlp from 'compromise';
import { testCases } from '../utils/SentenceChecker/TestCases';
import SubjectNounGame from '../utils/SentenceChecker/SubjectNounGame';
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
	const [example, setExample] = useState({ sentence: '', readable: '' });

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
				marginBottom: '35px',
				fontSize: '1.5rem',
				textAlign: 'center',
				fontWeight: 'bold',
			}}>
				<h1>Sentence Structure Practice</h1>
			</div>

			<div style={{
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
							}}><div style={{
									background: 'rgba(255,255,255,0.7)',
									padding: '20px',
									borderRadius: '10px',
									marginBottom: '20px',
									backdropFilter: 'blur(10px)'}}>
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
							}}><div style={{
								background: 'rgba(255,255,255,0.7)',
									padding: '20px',
									borderRadius: '10px',
									marginBottom: '20px',
									backdropFilter: 'blur(10px)'
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
											maxWidth: '5in',
											height: '8in',
											borderRadius: '8px',
											boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
										}}
									>
										<source src="/lesson1.mp4" type="video/mp4" />
										Your browser does not support the video tag.
									</video>
								</div>
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
			</div>
		);
	};

export default SentenceStructures;
