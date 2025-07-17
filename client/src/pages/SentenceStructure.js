import React, {useState} from 'react';
import SentenceStructure from '../utils/SentenceChecker/SentenceStructure'
import SentenceStructurev2 from '../utils/SentenceChecker/SentenceStructurev2'
import StructureChecker from '../utils/SentenceChecker/StructureChecker'
import {testCases} from '../utils/SentenceChecker/TestCases'

const SentenceStructures = () => {
	const [exampleSentence, setExampleSentence] = useState('');

	const generateRandomExample = () => {
		if (testCases.length === 0) return;

		// Pick a random sentence from testCases
		const randomIndex = Math.floor(Math.random() * testCases.length);
		const selected = testCases[randomIndex].sentence;
		setExampleSentence(selected);
	};

	return (
		<div className="container">
			<h2 style = {{fontSize: "72px"}}>Sentence Structure Practice</h2>

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
					marginBottom: '1rem',
					userSelect: 'none',
				}}
			>
				<b>Click here to see an example:</b>
				<div style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
					{exampleSentence || 'Click to generate an example sentence.'}
				</div>
			</div>
		</div>
	);
};
export default SentenceStructures;