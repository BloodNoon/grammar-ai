import structures from './SentenceStructure';
import compromise from 'compromise';
import { customTags } from './Plugin';

/**
 * Initialize more configurations
 * 1. Add custom tags for subject and object pronouns
 *
 * @version 1.0.0
 * @since 1.0.0
 */
function init() {
	compromise.extend(customTags);
}

/**
 * Filter a list of sentence structures
 *
 * @version 1.0.0
 * @param {string} sentence
 * @returns {array} Filtered list of structures that match part of speech of first word
 * @since 1.0.0
 * @deprecated
 */
export function filterStructure(sentence) {
	const identifier = sentence.split(' ')[0];

	return structures.filter((structure) => {
		let starter = structure.split(' ')[0];
		return compromise(identifier).has(starter);
	});
}

/**
 * Match sentence with list of structures using Compromise and returns boolean result
 * If structure is provide, only check provided structure
 *
 * @version 1.1.0
 * @param {string} sentence String for analysis
 * @param {array} filteredStructures Filtered list of structures(no longer needed)
 * @returns {boolean} True if one structure is matched
 * 						 False if no match
 * @since 1.0.0
 */
export function hasFullStructCheck(sentence, definedStructure = '') {
	init();

	if (definedStructure) return compromise(sentence).has(definedStructure);

	return structures.some((structure) => {
		return compromise(sentence).has(structure);
	});
}

/**
 * Match sentence with list of structures using Compromise and returns structure that matches
 * If structure is provide, only check provided structure
 *
 * @version 1.1.0
 * @param {string} sentence String for analysis
 * @param {array} filteredStructures Filtered list of structures(no longer needed)
 * @returns {string} structure that matches sentence
 * @since 1.0.0
 */
export function getFullStructCheck(sentence, definedStructure = '') {
	init();

	if (definedStructure) return compromise(sentence).has(definedStructure);

	return structures.find((structure) => {
		return compromise(sentence).has(structure);
	});
}

/**
 * Take one paragraph and analyze each sentence with structures
 *
 * @version 1.0.0
 * @param {string} paragraph
 * @returns {Object} structures that match every sentence
 * @since 1.0.0
 */

export function getFullParagraphCheck(paragraph) {
	const sentences = paragraph
		.split(
			/((?![.\n\s])[^.\n"]*(?:"[^\n"]*[^\n".]"[^.\n"]*)*(?:"[^"\n]+\."|\.|(?=\n)))\s*/gi
		)
		.filter((el) => {
			return el.length !== 0;
		});

	const result = [];
	sentences.forEach((sentence) => {
		let structure = getFullStructCheck(sentence);
		if (structure) {
			result.push({
				sentence,
				structure,
			});
		} else {
			result.push({
				sentence,
				structure: 'none',
			});
		}
	});

	return result;
}

/**
 *
 * @version 1.0.0
 * @param {string} sentence String for analysis
 * @param {array} filteredStructures Filtered list of structures(optional)
 * @returns {Object} containing tags of each words
 * @since 1.0.0
 */

export function getTags(sentence) {
	return compromise(sentence).json();
}

/*function perWordStructCheck(sentence, filteredStructures) {
	filteredStructures.forEach((structure) => {
		let splittedStructure = structure.split(' ');
		let words = sentence.split(' ');
	});
}

function matchWords(words, structure) {
	if (words.length == 0) return 0;
	if (structure.length == 0) return 0;

	let result = compromise(words[0]).has(structure[0]);
	let checkedWords = words.shift();
	let checkedStructure = structure.shift();
	if (result) return 1 + matchWords(checkedWords, checkedStructure)
}*/
