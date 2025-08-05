export const testCases = [
	/**************** FIRST BATCH ********************/
	{
		sentence: 'The fox ate the bird and the rabbit.',
		structure:
			'^#Determiner #Adjective? #Noun #Verb #Determiner #Adjective? #Noun ([and|or] #Determiner #Adjective? #Noun$)?',
	},
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

	{
	// Issue: Compromise is matching "Subject Pronouns" as "Nouns"
	"sentence" : 'The seal and I rolled.',
	"structure": '#Determiner #Noun (and|or) #Subject #Verb',
	},
	{
	//Issue: This test case has an issue where we have two similar structs.
	"sentence" : 'He and a girl met.',
	"structure": '#Subject (and|or) #Determiner #Noun #Verb',
	},
	{
	"sentence" : 'The curious friend and I met the thief and the robber.',
	"structure": '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Determiner #Noun (and|or) #Determiner #Noun',
	},
	{
	"sentence" : 'The brutal wave and I crashed.',
	"structure": '#Determiner #Adjective #Noun (and|or) #Subject #Verb',
	},
	{
	"sentence" : 'A scribe and a pen.',
	"structure": '#Determiner #Noun (and|or) #Determiner #Noun',
	},
	{
	"sentence" : 'The cute tarantula and I met the butterfly and the worm.',
	"structure": '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Determiner #Noun (and|or) #Determiner #Noun',
	},
	{
	"sentence" : 'I ran.',
	"structure": '#Subject #Verb',
	},
	{
	"sentence" : 'The huge eye stared.',
	"structure": '#Determiner #Adjective #Noun #Verb',
	},
	{
	"sentence" : 'He and I met her and him.',
	"structure": '#Subject (and|or) #Subject #Verb #Object (and|or) #Object',
	},
	{
	"sentence" : 'He and I landed on him and her.',
	"structure": '#Subject (and|or) #Subject #Verb #Preposition #Object (and|or) #Object',
	},
	{
	"sentence" : 'She and I flew with the sky and the cloud.',
	"structure": '#Subject (and|or) #Subject #Verb #Preposition #Determiner #Noun (and|or) #Determiner #Noun',
	},
	{
	"sentence" : 'He and the mouse slept on him and her.',
	"structure": '#Subject (and|or) #Determiner #Noun #Verb #Preposition #Object (and|or) #Object',
	},
	{
	"sentence" : 'She and the dark shark swam along him and her.',
	"structure": '#Subject (and|or) #Determiner #Adjective #Noun #Verb #Preposition #Object (and|or) #Object',
	},
	{
	"sentence" : 'She and he ran between the cars in the streets and the tunnels.',
	"structure": '#Subject (and|or) #Subject #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun (and|or) #Determiner #Noun',
	},
	{
	"sentence" : 'The dog and I slept on the cold floor and the wet grass.',
	"structure": '#Determiner #Noun (and|or) #Subject #Verb #Preposition #Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun',
	},
	{
	"sentence" : 'The llama and I kicked the thin human and the fat cow.',
	"structure": '#Determiner #Noun (and|or) #Subject #Verb #Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun',
	},
	/****************************** THIRD BATCH *****************************************/
	{
		sentence: 'The little girl hugged the kind dog.',
		structure: '#Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun',
	},
	{
		sentence: 'He kicked the red ball.',
		structure: '#Subject #Verb #Determiner #Adjective #Noun',
	},
	{
		sentence: 'She and I opened the gate and the door.',
		structure: '#Subject (and|or) #Subject #Verb #Determiner #Noun (and|or) #Determiner #Noun',
	},
	{
		sentence: 'The fat cat and the small mouse ran.',
		structure: '#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb',
	},
	{
		sentence: 'They climbed the tall ladder.',
		structure: '#Subject #Verb #Determiner #Adjective #Noun',
	},
	{
		sentence: 'I and the big bear ate honey and berries.',
		structure: '#Subject (and|or) #Determiner #Adjective #Noun #Verb #Noun (and|or) #Noun',
	},
	{
		sentence: 'The young man and she played soccer.',
		structure: '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Noun',
	},
	{
		sentence: 'We sang with the children and the teacher.',
		structure: '#Subject #Verb #Preposition #Determiner #Noun (and|or) #Determiner #Noun',
	},
	{
		sentence: 'The cold wind blew through the trees.',
		structure: '#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Noun',
	},
	{
		sentence: 'The girl and I helped the baby.',
		structure: '#Determiner #Noun (and|or) #Subject #Verb #Determiner #Noun',
	},
	{
		sentence: 'The tired horse walked beside the fence.',
		structure: '#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Noun',
	},
	{
		sentence: 'You and I watched the sun and the moon.',
		structure: '#Subject (and|or) #Subject #Verb #Determiner #Noun (and|or) #Determiner #Noun',
	},
	{
		sentence: 'The child saw the elephant and the giraffe.',
		structure: '#Determiner #Noun #Verb #Determiner #Noun (and|or) #Determiner #Noun',
	},
	{
		sentence: 'He and the boy built a house.',
		structure: '#Subject (and|or) #Determiner #Noun #Verb #Determiner #Noun',
	},
	{
		sentence: 'The bird flew above the lake and the trees.',
		structure: '#Determiner #Noun #Verb #Preposition #Determiner #Noun (and|or) #Determiner #Noun',
	},
	{
		sentence: 'A student and I answered the questions.',
		structure: '#Determiner #Noun (and|or) #Subject #Verb #Determiner #Noun',
	},
	{
		sentence: 'The brave knight rode the horse and the dragon.',
		structure: '#Determiner #Adjective #Noun #Verb #Determiner #Noun (and|or) #Determiner #Noun',
	},
	{
		sentence: 'She and the boy danced near the fire.',
		structure: '#Subject (and|or) #Determiner #Noun #Verb #Preposition #Determiner #Noun',
	},
	{
		sentence: 'The boy and I carried the big box and the bag.',
		structure: '#Determiner #Noun (and|or) #Subject #Verb #Determiner #Adjective #Noun (and|or) #Determiner #Noun',
	},
	{
		sentence: 'We walked through the tunnel and the cave.',
		structure: '#Subject #Verb #Preposition #Determiner #Noun (and|or) #Determiner #Noun',
	},
		/****************************** 	FOURTH BATCH *****************************************/	
		{
			sentence: 'The tall boy helped the small girl.',
			structure: '#Determiner #Adjective #Subject #Verb #Determiner #Adjective #Object',
		},
		{
			sentence: 'I threw the yellow ball.',
			structure: '#Subject #Verb #Determiner #Adjective #Object',
		},
		{
			sentence: 'The baker gave the child a cookie.',
			structure: '#Determiner #Subject #Verb #Determiner #Object #Determiner #Noun',
		},
		{
			sentence: 'The pilot and the copilot flew the plane.',
			structure: '#Determiner #Subject (and|or) #Determiner #Subject #Verb #Determiner #Object',
		},
		{
			sentence: 'She handed the teacher the paper.',
			structure: '#Subject #Verb #Determiner #Object #Determiner #Noun',
		},
		{
			sentence: 'The cat chased the noisy mouse.',
			structure: '#Determiner #Subject #Verb #Determiner #Adjective #Object',
		},
		{
			sentence: 'They built a house and a barn.',
			structure: '#Subject #Verb #Determiner #Object (and|or) #Determiner #Object',
		},
		{
			sentence: 'The knight and I saved the village.',
			structure: '#Determiner #Subject (and|or) #Subject #Verb #Determiner #Object',
		},
		{
			sentence: 'I saw the snake and the lizard.',
			structure: '#Subject #Verb #Determiner #Object (and|or) #Determiner #Object',
		},
		{
			sentence: 'The doctor examined the boy and the girl.',
			structure: '#Determiner #Subject #Verb #Determiner #Object (and|or) #Determiner #Object',
		},
		{
			sentence: 'The angry man blamed the quiet woman.',
			structure: '#Determiner #Adjective #Subject #Verb #Determiner #Adjective #Object',
		},
		{
			sentence: 'The team passed the ball and scored.',
			structure: '#Determiner #Subject #Verb #Determiner #Object (and|or) #Verb',
		},
		{
			sentence: 'She and the firefighter rescued the baby.',
			structure: '#Subject (and|or) #Determiner #Subject #Verb #Determiner #Object',
		},
		{
			sentence: 'The horse kicked the fence and the bucket.',
			structure: '#Determiner #Subject #Verb #Determiner #Object (and|or) #Determiner #Object',
		},
		{
			sentence: 'We met the astronaut and the engineer.',
			structure: '#Subject #Verb #Determiner #Object (and|or) #Determiner #Object',
		},
		{
			sentence: 'The tiger and the lion chased the deer.',
			structure: '#Determiner #Subject (and|or) #Determiner #Subject #Verb #Determiner #Object',
		},
		{
			sentence: 'The player gave the coach the trophy.',
			structure: '#Determiner #Subject #Verb #Determiner #Object #Determiner #Noun',
		},
		{
			sentence: 'You and the boy saw the parade and the floats.',
			structure: '#Subject (and|or) #Determiner #Subject #Verb #Determiner #Object (and|or) #Determiner #Object',
		},
		{
			sentence: 'The scientist observed the comet and the asteroid.',
			structure: '#Determiner #Subject #Verb #Determiner #Object (and|or) #Determiner #Object',
		},
		{
			sentence: 'The swimmer and I reached the boat and the dock.',
			structure: '#Determiner #Subject (and|or) #Subject #Verb #Determiner #Object (and|or) #Determiner #Object',
		},		
];
