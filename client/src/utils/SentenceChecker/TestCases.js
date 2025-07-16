export const testCases = [
	/**************** FIRST BATCH ********************/
	// {
	// 	sentence: 'The fox ate the bird and the rabbit.',
	// 	structure:
	// 		'^#Determiner #Adjective? #Noun #Verb #Determiner #Adjective? #Noun ([and|or] #Determiner #Adjective? #Noun$)?',
	// },
	{
		sentence: 'He ran and ran.',
		structure: '^#Subject #Verb (and|or) #Verb$',
	},
	{
		sentence: 'The rabbit ran and fell.',
		structure: '^#Determiner #Noun #Verb (and|or) #Verb',
	},
	{
		// Issue: No match for "Object Pronoun" after (and|or)
		sentence: 'The young boy and him played.',
		structure:
			'^#Determiner #Adjective? #Noun (and|or) #Subject #Verb ([#Preposition #Object]? #Preposition #Object [and|or] #Preposition #Object$)?',
	},
	{
		// Issue: Compromise is matching "Subject Pronouns" as "Nouns"
		sentence: 'The boy and I played.',
		structure:
			'^#Determiner #Adjective? #Noun (and|or) #Subject #Verb ([#Preposition #Object]? #Preposition #Object [and|or] #Preposition #Object$)?',
	},
	// {
	// 	//Issue: This test case has an issue where we have two similar structs. Matches with "#Determiner #Adjective? #Noun (and|or) #Determiner #Adjective? #Noun #Verb #Adjective?"
	// 	sentence: 'The small fish and the big shark swam.',
	// 	structure:
	// 		'^#Determiner #Adjective? #Noun (and|or) #Determiner #Adjective? #Noun #Verb ([and|or] #Verb #Adjective [and|or] #Adjective$)?',
	// },
	// {
	// 	//Issue: This test case has an issue where we have two similar structs.
	// 	sentence: 'The dog and the small kitten played.',
	// 	structure:
	// 		'^#Determiner #Adjective? #Noun (and|or) #Determiner #Adjective? #Noun #Verb ([and|or] #Verb #Adjective [and|or] #Adjective$)?',
	// },
	{
		sentence: 'The stinky baby cried.',
		structure: '^#Determiner #Adjective #Noun #Verb',
	},
	// {
	// 	//Issue: This test case has an issue where we have two similar structs.
	// 	sentence: 'A ball and a rock rolled.',
	// 	structure:
	// 		'^#Determiner #Adjective? #Noun (and|or) #Determiner #Adjective? #Noun #Verb ([and|or] #Verb #Adjective [and|or] #Adjective$)?',
	// },
	// {
	// 	//Issue: This test case has an issue where we have two similar structs.
	// 	sentence: 'A swift bird and quick hawk flew.',
	// 	structure:
	// 		'^#Determiner #Adjective? #Noun (and|or) #Determiner #Adjective? #Noun #Verb ([and|or] #Verb #Adjective [and|or] #Adjective$)?',
	// },
	{
		//Issue: Compromise is matching "Subject Pronouns" as "Nouns"
		sentence: 'The yellow ball and I rolled.',
		structure:
			'^#Determiner #Adjective? #Noun (and|or) #Subject #Verb ([#Preposition #Object]? #Preposition #Object [and|or] #Preposition #Object$)?',
	},
	// {
	// 	//Issue: This test case has an issue where we have two similar structs.
	// 	sentence: 'The hard rock or the soft ball rolled.',
	// 	structure:
	// 		'^#Determiner #Adjective? #Noun (and|or) #Determiner #Adjective? #Noun #Verb ([and|or] #Verb #Adjective [and|or] #Adjective$)?',
	// },
	{
		//Issue: This test case has an issue where we have two similar structs.
		sentence: 'He and I ran.',
		structure: '^#Subject (and|or) #Subject #Verb',
	},
	{
		sentence: 'A round egg flew.',
		structure: '^#Determiner #Adjective #Noun #Verb',
	},
	{
		// Issue: Compromise is matching "Subject Pronouns" as "Nouns"
		sentence: 'The dog and I ran.',
		structure:
			'^#Determiner #Adjective? #Noun (and|or) #Subject #Verb ([#Preposition #Object]? #Preposition #Object [and|or] #Preposition #Object$)?',
	},
	{
		// Issue: This test case has an issue where we have two similar structs. The similar struct is "#Subject (and|or) #Determiner #Adjective? #Noun #Verb"
		sentence: 'He and the baby laughed.',
		structure:
			'^#Subject (and|or) #Determiner #Adjective? #Noun #Verb (#Preposition #Object [and|or] #Object$)?',
	},

	/****************************** SECOND BATCH *****************************************/

	// {
	// // Issue: Compromise is matching "Subject Pronouns" as "Nouns"
	// "sentence" : 'The seal and I rolled.',
	// "structure": '#Determiner #Noun (and|or) #Subject #Verb',
	// },
	// {
	// //Issue: This test case has an issue where we have two similar structs.
	// "sentence" : 'He and a girl met.',
	// "structure": '#Subject (and|or) #Determiner #Noun #Verb',
	// },
	// {
	// "sentence" : 'The curious friend and I met the thief and the robber.',
	// "structure": '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Determiner #Noun (and|or) #Determiner #Noun',
	// },
	// {
	// "sentence" : 'The brutal wave and I crashed.',
	// "structure": '#Determiner #Adjective #Noun (and|or) #Subject #Verb',
	// },
	// {
	// "sentence" : 'A scribe and a pen.',
	// "structure": '#Determiner #Noun (and|or) #Determiner #Noun',
	// },
	// {
	// "sentence" : 'The cute tarantula and I met the butterfly and the worm.',
	// "structure": '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Determiner #Noun (and|or) #Determiner #Noun',
	// },
	// {
	// "sentence" : 'I ran.',
	// "structure": '#Subject #Verb',
	// },
	// {
	// "sentence" : 'The huge eye stared.',
	// "structure": '#Determiner #Adjective #Noun #Verb',
	// },
	// {
	// "sentence" : 'He and I met her and him.',
	// "structure": '#Subject (and|or) #Subject #Verb #Object (and|or) #Object',
	// },
	// {
	// "sentence" : 'He and I landed on him and her.',
	// "structure": '#Subject (and|or) #Subject #Verb #Preposition #Object (and|or) #Object',
	// },
	// {
	// "sentence" : 'She and I flew with the sky and the cloud.',
	// "structure": '#Subject (and|or) #Subject #Verb #Preposition #Determiner #Noun (and|or) #Determiner #Noun',
	// },
	// {
	// "sentence" : 'He and the mouse slept on him and her.',
	// "structure": '#Subject (and|or) #Determiner #Noun #Verb #Preposition #Object (and|or) #Object',
	// },
	// {
	// "sentence" : 'She and the dark shark swam along him and her.',
	// "structure": '#Subject (and|or) #Determiner #Adjective #Noun #Verb #Preposition #Object (and|or) #Object',
	// },
	// {
	// "sentence" : 'She and he ran between the cars in the streets and the tunnels.',
	// "structure": '#Subject (and|or) #Subject #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun (and|or) #Determiner #Noun',
	// },
	// {
	// "sentence" : 'The dog and I slept on the cold floor and the wet grass.',
	// "structure": '#Determiner #Noun (and|or) #Subject #Verb #Preposition #Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun',
	// },
	// {
	// "sentence" : 'The llama and I kicked the thin human and the fat cow.',
	// "structure": '#Determiner #Noun (and|or) #Subject #Verb #Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun',
	// },
];
