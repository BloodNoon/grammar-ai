import compromise from 'compromise';
import { customTags } from '../utils/SentenceChecker/Plugin';

beforeAll(() => {
	return compromise.extend(customTags);
});

const subjects = ['i', 'he', 'she', 'it', 'you', 'we', 'they'];
const objects = ['me', 'him', 'her', 'it', 'your', 'us', 'them'];

describe('check', () => {
	subjects.forEach((subject) => {
		test(`if subject tag is added to all - ${subject} tag`, () => {
			const [tags] = compromise(subject).match('#Subject').out('tags');
			const [values] = Object.values(tags);
			expect(values).toContain('Subject');
		});
	});

	objects.forEach((object) => {
		test(`if object tag is added to all - ${object} tag`, () => {
			const [tags] = compromise(object).match('#Object').out('tags');
			const [values] = Object.values(tags);
			expect(values).toContain('Object');
		});
	});
});
