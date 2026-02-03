export const customTags = function (Doc, world) {
	world.addTags({
		Subject: {
			isA: 'Pronoun',
		},
		Object: {
			isA: 'Pronoun',
		},
	});

	// world.addWords({
	// 	i: 'Subject',
	// 	he: 'Subject',
	// 	she: 'Subject',
	// 	it: 'Subject',
	// 	you: 'Subject',
	// 	we: 'Subject',
	// 	they: 'Subject',
	// 	me: 'Object',
	// 	him: 'Object',
	// 	her: 'Object',
	// 	it: 'Object',
	// 	your: 'Object',
	// 	us: 'Object',
	// 	them: 'Object',
	// });

	const subjects = ['i', 'he', 'she', 'it', 'you', 'we', 'they'];
	const objects = ['me', 'him', 'her', 'it', 'your', 'us', 'them'];

	world.postProcess((doc) => {
		subjects.forEach((subject) => {
			// doc.match(subject).untag('#Noun'); // Unable to untag '#Noun' as it is a parent of '#Pronoun'
			doc.match(subject).tag('#Subject');
		});

		objects.forEach((object) => doc.match(object).tag('#Object'));
	});
};
