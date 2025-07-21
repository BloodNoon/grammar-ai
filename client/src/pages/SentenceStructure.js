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
					marginBottom: '1rem',
					userSelect: 'none',
				}}
			>
				<b>Click here to see an example:</b>
				<div style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
					{example.sentence ? (
						<>
							<div><b>Sentence:</b> {example.sentence}</div>
							<div style={{ color: '#555', marginTop: '0.25rem' }}>
								<b>Structure:</b> {example.readable}
							</div>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default SentenceStructures;
