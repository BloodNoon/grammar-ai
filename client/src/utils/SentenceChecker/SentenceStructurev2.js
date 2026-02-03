module.exports = [
	//'#Pronoun #Verb #Preposition #Determiner #Noun',

	'#Pronoun #Verb (#Adjective|#Noun|#Adverb)',
	//'#Pronoun #Verb #Adverb',

	'#Pronoun #Verb #Possessive #Noun (#Adverb #Preposition #Determiner #Noun|#Preposition #Determiner #Noun #Adverb)?',
	//'#Pronoun #Verb #Possessive #Noun #Adverb #Preposition #Determiner #Noun',
	//'#Pronoun #Verb #Possessive #Noun #Preposition #Determiner #Noun #Adverb',

	'#Pronoun #Verb #Possessive #Adjective #Noun (#Preposition #Possessive #Noun #Adverb|#Preposition #Possessive #Adjective #Noun #Adverb)?',

	//'#Pronoun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun #Adverb',
	//'#Pronoun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	//'#Pronoun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Noun #Adverb',
	'#Pronoun #Verb #Possessive #Adjective #Noun #Preposition #Adjective? #Determiner #Noun #Adverb',

	//'#Pronoun #Verb #Determiner #Noun',
	//'#Pronoun #Verb #Determiner #Noun #Adverb?',
	'#Pronoun #Verb #Determiner #Adjective? #Noun #Adverb?',
	//'#Pronoun #Verb #Determiner #Adjective #Noun',

	'#Pronoun #Verb #Determiner #Adjective #Noun #Preposition (#Determiner|#Possessive) #Adjective? #Noun #Adverb',
	//'#Pronoun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',
	//'#Pronoun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun #Adverb',

	//'#Pronoun #Verb #Preposition #Determiner #Noun #Adverb?',
	'#Pronoun #Verb #Preposition (#Determiner|#Possessive) #Adjective? #Noun #Adverb?',
	'#Pronoun #Verb #Preposition #Determiner #Adjective #Noun #Preposition (#Determiner|#Possessive) #Adjective #Noun',
	//'#Pronoun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	'#Pronoun #Verb #Preposition (#Determiner|#Possessive) #Noun #Preposition #Determiner #Noun #Adverb',

	//'#Pronoun #Verb #Preposition #Possessive #Adjective #Noun',
	'#Pronoun #Verb #Preposition #Possessive #Adjective #Noun #Preposition (#Determiner|#Possessive) #Adjective #Noun',
	//'#Pronoun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	'#Pronoun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Adjective #Determiner #Noun #Adverb',

	//'#Pronoun #Verb #Preposition #Possessive #Noun',
	//'#Pronoun #Verb #Preposition #Possessive #Noun #Adverb',
	'#Pronoun #Verb #Preposition #Possessive #Noun #Adverb #Preposition (#Determiner|#Possessive) #Noun',
	//'#Pronoun #Verb #Preposition #Possessive #Noun #Adverb #Preposition #Possessive #Noun',
	//'#Pronoun #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun #Adverb',

	'#Pronoun #Verb #Preposition #Adverb #Determiner #Possessive #Adjective #Noun #Preposition #Adjective #Determiner #Noun',

	//'#Pronoun #Verb #Adverb #Determiner #Adjective #Noun',
	//'#Pronoun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	'#Pronoun #Verb #Adverb #Determiner #Adjective #Noun (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',
	//'#Pronoun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	/** Not sure if this is correct */
	'#Pronoun #Verb #Adverb #Determiner #Possessive #Adjective #Noun #Preposition #Adjective #Determiner #Noun',
	'#Pronoun #Verb #Adverb #Determiner #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	/********************************/

	//'#Pronoun #Verb #Adverb #Preposition #Possessive #Noun',
	'#Pronoun #Verb #Adverb #Preposition #Possessive #Noun (#Preposition [#Determiner|#Possessive] #Noun)?',
	//'#Pronoun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',

	'#Pronoun #Verb #Adverb #Preposition #Determiner #Adjective? #Noun (#Preposition #Determiner #Noun)?',
	//'#Pronoun #Verb #Adverb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',

	'#Pronoun #Verb #Adverb #Possessive #Noun #Preposition #Determiner #Noun',
	'#Pronoun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective? #Noun',
	//'#Pronoun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',

	'#Pronoun #Adverb #Verb',
	'#Pronoun #Adverb #Verb #Preposition? (#Determiner|#Possessive) #Adjective? #Noun',
	'#Pronoun #Adverb #Verb #Preposition (#Determiner|#Possessive) #Noun #Preposition (#Determiner|#Possessive) #Noun',

	//'#Pronoun #Adverb #Verb #Preposition #Possessive #Noun',
	//'#Pronoun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun',
	//'#Pronoun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',

	'#Pronoun #Adverb #Verb #Preposition #Possessive #Preposition #Determiner #Noun',
	'#Pronoun #Adverb #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	//'#Pronoun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Pronoun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	'#Pronoun #Adverb #Verb (#Determiner|#Possessive) #Adjective #Noun #Preposition (#Determiner|#Possessive) #Adjective? #Noun',

	'#Pronoun #Adverb #Verb #Possessive #Preposition #Determiner #Noun',
	//'#Pronoun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Pronoun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Pronoun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Pronoun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',

	/****************************************************************************************************/

	'#Adverb #Pronoun #Verb',
	'#Adverb #Pronoun #Verb #Determiner #Adjective #Noun',
	//'#Adverb #Pronoun #Verb (#Determiner|#Possessive) #Adjective #Noun #Preposition (#Determiner|#Possessive) #Noun',
	'#Adverb #Pronoun #Verb (#Determiner|#Possessive) #Adjective #Noun #Preposition (#Determiner|#Possessive) #Adjective? #Noun',
	//'#Adverb #Pronoun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	//'#Adverb #Pronoun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Pronoun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Pronoun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	'#Adverb #Pronoun #Verb #Possessive #Preposition #Determiner #Noun',

	'#Adverb #Pronoun #Verb #Preposition (#Determiner|#Possessive) #Adjective? #Noun',
	//'#Adverb #Pronoun #Verb #Preposition #Possessive #Noun',
	'#Adverb #Pronoun #Verb #Preposition (#Determiner|#Possessive) #Noun #Preposition (#Determiner|#Possessive) #Noun',
	//'#Adverb #Pronoun #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Pronoun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',

	'#Adverb #Pronoun #Verb #Preposition #Possessive (#Preposition #Determiner #Noun|#Adjective #Noun #Preposition #Possessive #Adjective #Noun)',
	//'#Adverb #Pronoun #Verb #Preposition #Determiner #Noun',
	//'#Adverb #Pronoun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	//'#Adverb #Determiner #Noun #Verb',
	//'#Adverb #Determiner #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Determiner #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective? #Noun',

	//'#Adverb #Determiner #Noun #Verb #Possessive #Noun',

	'#Adverb #Determiner #Noun #Verb (#Possessive #Noun)? (#Preposition [#Determiner|#Possessive] #Noun)?',
	//'#Adverb #Determiner #Noun #Verb #Possessive #Noun #Preposition #Determiner #Noun',

	//'#Adverb #Determiner #Noun #Verb #Possessive #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Adverb #Determiner #Noun #Verb #Possessive #Noun #Preposition #Possessive #Adjective #Noun',

	//'#Adverb #Determiner #Noun #Verb #Possessive #Adjective #Noun',
	'#Adverb (#Determiner|#Possessive) #Noun #Verb (#Determiner|#Possessive) #Adjective? #Noun (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Adverb #Determiner #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Determiner #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	//'#Adverb #Determiner #Noun #Verb #Preposition #Possessive #Noun',
	//'#Adverb #Determiner #Noun #Verb #Preposition #Possessive #Adjective? #Noun',
	//'#Adverb #Determiner #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Determiner #Noun #Verb #Preposition (#Determiner|#Possessive) #Adjective? #Noun (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',
	//'#Adverb #Determiner #Noun #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Determiner #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Determiner #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Determiner #Noun #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Noun',

	//'#Adverb #Determiner #Noun #Verb #Preposition (#Determiner|#Possessive) #Adjective? #Noun (#Preposition [#Determiner|#Possessive] #Noun)?',

	//'#Adverb #Determiner #Noun #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Determiner #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Determiner #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Determiner #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition (#Determiner|#Possessive) #Adjective #Noun',

	'#Adverb (#Determiner|#Possessive) #Adjective? #Noun #Verb',
	'#Adverb (#Determiner|#Possessive) #Adjective? #Noun #Verb #Preposition (#Determiner|#Possessive) #Adjective? #Noun (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Adverb #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',

	//'#Adverb #Determiner #Adjective #Noun #Verb #Preposition #Possessive #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Adjective #Noun',

	//'#Adverb #Determiner #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	'#Adverb (#Determiner|#Possessive) #Adjective? #Noun #Verb (#Determiner|#Possessive) #Adjective? #Noun (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Possessive #Adjective #Noun',

	//'#Adverb #Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	//'#Adverb #Determiner #Adjective #Noun #Verb #Possessive #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Determiner #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',

	//'#Adverb #Possessive #Noun #Verb',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Determiner #Noun',

	//'#Adverb #Possessive #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Determiner #Adjective #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun',

	//'#Adverb #Possessive #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	//'#Adverb #Possessive #Noun #Verb #Determiner #Noun',
	//'#Adverb #Possessive #Noun #Verb #Determiner #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Adverb #Possessive #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Noun #Verb #Determiner #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Possessive #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Noun #Verb #Determiner #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	//'#Adverb #Possessive #Noun #Verb #Possessive #Noun',
	//'#Adverb #Possessive #Noun #Verb #Possessive #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Possessive #Noun #Verb #Possessive #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Possessive #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Noun #Verb #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Adverb #Possessive #Noun #Verb #Possessive #Adjective #Noun',

	//	'#Adverb (#Determiner|#Possessive) #Adjective? #Noun #Verb #Preposition (#Determiner|#Possessive) #Adjective? #Noun (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Adverb #Possessive #Adjective #Noun #Verb',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Possessive #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Possessive #Noun #Preposition #Determiner #Noun',

	//'#Adverb #Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	//'#Adverb #Possessive #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Determiner #Adjective #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	//'#Adverb #Possessive #Adjective #Noun #Verb #Determiner #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Determiner #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Determiner #Noun #Preposition #Possessive #Noun',

	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Adverb #Possessive #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	/****************************************************************************************************/

	//'#Determiner #Noun #Verb #Adverb',
	//'#Determiner #Noun #Verb #Adverb #Preposition #Possessive #Noun',
	'(#Determiner|#Possessive) #Noun #Verb #Adverb? #Preposition ([#Determiner|#Possessive] #Adjective? #Noun)? (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Determiner #Noun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Noun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Noun',

	//'#Determiner #Noun #Verb #Adverb #Preposition #Determiner #Noun',
	//'#Determiner #Noun #Verb #Adverb #Preposition #Determiner #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',

	//'#Determiner #Noun #Verb #Adverb #Possessive #Noun',
	'(#Determiner|#Possessive) #Noun #Verb #Adverb? ([#Determiner|#Possessive] #Adjective? #Noun)? (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',
	//'#Determiner #Noun #Verb #Adverb #Possessive #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb',

	//'#Determiner #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Noun #Verb #Adverb #Possessive #Adjective #Noun',
	//'#Determiner #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',
	//'#Determiner #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Noun #Verb (#Determiner|#Possessive) #Noun',
	//'#Determiner #Noun #Verb #Preposition (#Determiner|#Possessive) #Noun #Preposition #Determiner #Noun',

	//'#Determiner #Noun #Verb #Adjective',
	//'#Determiner #Noun #Verb #Possessive #Noun',
	//'#Determiner #Noun #Verb #Preposition #Adverb #Possessive #Noun #Preposition #Determiner #Noun',

	'(#Determiner|#Possessive) #Noun #Verb #Preposition ([#Determiner|#Possessive] #Adjective? #Noun)? (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)? #Adverb?',

	//'#Determiner #Noun #Verb #Preposition #Possessive #Noun #Adverb',
	//'#Determiner #Noun #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun #Adverb',
	//'#Determiner #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun #Adverb',
	//'#Determiner #Noun #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Adjective #Noun #Adverb',

	'(#Determiner|#Possessive) #Noun #Verb #Preposition ([#Determiner|#Possessive] #Adjective #Noun)? #Adverb? (#Preposition [#Determiner|#Possessive] #Adjective #Noun)?',
	//'#Determiner #Noun #Verb #Preposition #Determiner #Adjective #Noun #Adverb #Preposition #Possessive #Adjective #Noun',

	//'#Determiner #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Noun #Adverb',
	//'#Determiner #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	//'#Determiner #Noun #Verb #Preposition #Determiner #Noun #Adverb?',
	//'#Determiner #Noun #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Noun #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Adjective #Noun #Adverb',
	//'#Determiner #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun #Adverb',
	//'#Determiner #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	//'#Determiner #Noun #Verb #Adverb? #Preposition ([#Determiner|#Possessive] #Adjective? #Noun)? (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',
	'(#Determiner|#Possessive) #Noun #Verb ([#Determiner|#Possessive] #Adjective? #Noun)? #Adverb? (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	'(#Determiner|#Possessive) #Noun #Verb ([#Determiner|#Possessive] #Adjective? #Noun)? (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)? #Adverb?',

	//'#Determiner #Noun #Verb #Possessive #Noun #Adverb',
	//'#Determiner #Noun #Verb #Possessive #Noun #Adverb #Preposition #Possessive #Adjective #Noun',

	//'#Determiner #Noun #Verb #Possessive #Noun #Preposition #Possessive #Noun #Adverb',
	//'#Determiner #Noun #Verb #Possessive #Noun #Preposition #Determiner #Adjective #Noun #Adverb',
	//'#Determiner #Noun #Verb #Possessive #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	//'#Determiner #Noun #Verb #Possessive #Adjective #Noun #Adverb',
	//'#Determiner #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun #Adverb',
	//'#Determiner #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun #Adverb',
	//'#Determiner #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	'(#Determiner|#Possessive) #Noun #Adverb? #Verb ([#Determiner|#Possessive] #Adjective? #Noun)? (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Determiner #Noun #Adverb #Verb #Preposition #Possessive #Noun',
	'(#Determiner|#Possessive) #Noun #Adverb #Verb #Preposition (#Determiner|#Possessive) #Adjective? #Noun (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Determiner #Noun #Adverb #Verb #Preposition #Determiner #Noun',
	//'#Determiner #Noun #Adverb #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Determiner #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Noun',

	//'#Determiner #Noun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Noun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',

	'(#Determiner|#Possessive) #Noun #Adverb #Verb (#Determiner|#Possessive) #Adjective? #Noun (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Determiner #Noun #Adverb #Verb #Possessive #Adjective? #Noun',
	//'#Determiner #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Noun #Adverb #Verb #Possessive #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Noun #Adverb #Verb #Possessive #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Noun #Adverb #Verb #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Noun #Adverb #Verb',

	//'#Determiner #Noun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Noun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	'(#Determiner|#Possessive) #Adjective? #Noun #Verb #Adjective (#Noun #Preposition #Possessive #Adjective #Noun)?',
	//'#Determiner #Adjective #Noun #Verb #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	'(#Determiner|#Possessive) #Adjective #Noun #Verb #Adverb ([#Determiner|#Possessive] #Adjective? #Noun)? (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Determiner #Adjective #Noun #Verb #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Determiner #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	//'#Determiner #Adjective #Noun #Verb #Adverb #Possessive #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Possessive #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	//'#Determiner #Adjective #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Noun',

	'(#Determiner|#Possessive) #Adjective #Noun #Verb #Adverb #Preposition (#Determiner|#Possessive) #Adjective? #Noun (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Determiner #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',

	//'#Determiner #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Determiner #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Preposition #Determiner #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',

	//'#Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Possessive #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb (#Determiner|#Possessive) #Adjective #Noun #Adverb?',
	//'#Determiner #Adjective #Noun #Verb #Possessive #Adjective #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb (#Determiner|#Possessive) #Noun #Preposition #Possessive #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Determiner #Noun #Preposition #Possessive #Noun #Adverb',
	'(#Determiner|#Possessive) #Adjective #Noun #Verb (#Determiner|#Possessive) #Adjective? #Noun (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)? #Adverb?',
	//'#Determiner #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun #Adverb',

	//'#Determiner #Adjective #Noun #Verb #Possessive #Noun #Preposition #Possessive #Adjective #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	'(#Determiner|#Possessive) #Adjective #Noun #Verb (#Determiner|#Possessive) #Adjective? #Noun #Adverb (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Determiner #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb (#Determiner|#Possessive) #Noun #Adverb (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Determiner #Adjective #Noun #Verb #Preposition #Possessive #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun #Adverb',

	'(#Determiner|#Possessive) #Adjective #Noun #Verb #Preposition (#Determiner|#Possessive) #Adjective? #Noun (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)? #Adverb?',

	//'#Determiner #Adjective #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	'(#Determiner|#Possessive) #Adjective #Noun #Verb #Preposition (#Determiner|#Possessive) #Adjective? #Noun #Adverb (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Adverb?',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb?',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun //#Adverb',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun #Adverb',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Adverb #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	//'#Determiner #Adjective #Noun #Adverb #Verb',
	//'#Determiner #Adjective #Noun #Adverb #Verb ([#Determiner|#Possessive] #Adjective #Noun)?',

	//'#Determiner #Adjective #Noun #Adverb #Verb #Possessive #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Adjective #Noun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	//'#Determiner #Adjective #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	'(#Determiner|#Possessive) #Adjective #Noun #Adverb #Verb ([#Determiner|#Possessive] #Adjective? #Noun)? (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	//'#Determiner #Adjective #Noun #Adverb #Verb #Determiner #Noun #Preposition #Possessive #Noun',

	// '#Determiner #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Noun',
	// '#Determiner #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun',
	// '#Determiner #Adjective #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun',
	// '#Determiner #Adjective #Noun #Adverb #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Noun',
	// '#Determiner #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun',
	// '#Determiner #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',
	// '#Determiner #Adjective #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Determiner #Adjective #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Determiner #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Determiner #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Determiner #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Determiner #Adjective #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	'(#Determiner|#Possessive) #Adjective #Noun #Adverb #Verb #Preposition (#Determiner|#Possessive) #Adjective? #Noun (#Preposition [#Determiner|#Possessive] #Adjective? #Noun)?',

	'(#Determiner|#Possessive) #Adjective #Noun #Adverb #Verb #Preposition (#Determiner|#Possessive) #Adjective? #Noun (#Determiner|#Possessive) #Adjective? #Noun',

	/****************************************************************************************************/

	// '#Possessive #Noun #Verb #Adverb',
	// '#Possessive #Noun #Adverb #Verb',

	// '#Possessive #Adjective #Noun #Verb #Adverb',
	// '#Possessive #Adjective #Noun #Adverb #Verb',
	// '#Possessive #Noun #Verb (#Determiner|#Possessive) #Noun',
	// '#Possessive #Noun #Adverb #Verb #Determiner #Noun',
	// '#Possessive #Noun #Adverb #Verb #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Adverb #Verb #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Adverb #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Noun #Verb #Adverb #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Preposition #Determiner #Noun #Adverb',
	// '#Possessive #Noun #Adverb #Verb #Possessive #Noun',
	// '#Possessive #Noun #Verb #Adverb #Determiner #Noun',
	// '#Possessive #Noun #Verb #Adverb #Possessive #Noun',
	// '#Possessive #Noun #Verb #Determiner #Noun #Adverb',
	// '#Possessive #Noun #Verb #Possessive #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Possessive #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Adverb #Possessive #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Possessive #Noun #Preposition #Determiner #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Adverb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Possessive #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Adverb #Possessive #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Possessive #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb? #Verb (#Determiner|#Possessive) #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Determiner #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Adverb #Verb #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Possessive #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',

	// '#Possessive #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Verb #Preposition #Adjective #Noun #Determiner #Adjective #Noun',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Adverb #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	// '#Possessive #Noun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Verb #Adverb #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Adverb #Verb #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Possessive #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Determiner #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Determiner #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Noun #Adverb',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Possessive #Noun #Preposition #Determiner #Noun',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Determiner #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Adverb #Preposition #Determiner #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Possessive #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Adverb #Preposition #Determiner #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Adverb #Verb #Adverb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Noun #Verb #Adverb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Noun #Verb #Possessive #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Determiner #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Adverb #Determiner #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Determiner #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Determiner #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Determiner #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Determiner #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Determiner #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Determiner #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Determiner #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Determiner #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Adverb #Determiner #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Determiner #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Determiner #Noun #Adverb',

	// '#Possessive #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Possessive #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Noun #Verb #Preposition #Determiner #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Preposition #Possessive #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Adverb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Determiner #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Adverb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Noun #Verb #Preposition #Possessive #Adjective #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Adjective #Noun #Adverb #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Adverb #Preposition #Possessive #Noun #Preposition #Possessive #Noun',
	// '#Possessive #Adjective #Noun #Verb #Preposition #Possessive #Noun #Preposition #Possessive #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Noun #Verb #Preposition #Determiner #Adjective #Noun #Adverb #Preposition #Determiner #Adjective #Noun',
	// '#Possessive #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun #Adverb',

	// '#Possessive #Noun #Adverb #Verb #Possessive #Adjective #Noun',
	// '#Possessive #Noun #Verb #Adverb #Possessive #Adjective #Noun',
	// 'Possessive pro#Noun #Noun #Verb #Adverb #Possessive #Adjective #Noun #Adverb',

	//'#Possessive #Noun #Verb #Adjective',
	'#Possessive #Adjective? #Noun #Verb #Adjective',
	'#Possessive #Noun #Verb #Preposition (#Determiner|#Possessive) #Noun #Adverb?',
	'#Possessive #Noun #Adverb #Verb #Preposition #Possessive #Noun',
	'#Possessive #Noun #Verb #Adverb #Preposition #Possessive #Noun',
	'#Possessive #Noun #Verb #Preposition #Possessive #Noun #Adverb',
	'#Possessive #Noun #Verb #Preposition (#Determiner|#Possessive) #Noun #Preposition #Determiner #Noun',
	'#Possessive #Noun #Verb #Preposition #Determiner #Noun #Preposition #Possessive #Noun',

	/****************************************************************************************************/

	'#Subject #Verb (#Object|#Adjective)',
	'#Subject #Verb #Object? #Preposition #Object',
	//'#Subject #Verb #Object #Preposition #Determiner #Noun',
	'#Subject #Verb #Object #Preposition #Determiner #Adjective? #Noun',

	//'#Subject #Verb #Adjective',

	//'#Subject #Verb #Determiner #Noun',
	//'#Subject #Verb #Determiner #Adjective? #Noun',

	//'#Subject #Verb #Determiner #Noun #Preposition #Object',
	//'#Subject #Verb #Determiner #Noun #Preposition #Determiner #Noun',
	'#Subject #Verb #Determiner #Adjective? #Noun #Preposition (#Object|#Determiner #Noun)',
	//'#Subject #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Subject #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective',
	//'#Subject #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective? #Noun',

	//'#Subject #Verb #Preposition #Object',
	'#Subject #Verb #Preposition #Object #Preposition (#Object|#Determiner #Noun)',
	//'#Subject #Verb #Preposition #Object #Preposition #Determiner #Noun',

	//'#Subject #Verb #Preposition #Determiner #Noun',
	'#Subject #Verb #Preposition #Determiner #Adjective? #Noun (#Preposition [#Object|#Determiner #Adjective? #Noun])?',
	//'#Subject #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',
	//'#Subject #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Adjective #Noun',

	// '#Subject #Verb #Preposition #Determiner #Adjective #Noun',
	// '#Subject #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Subject #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Object',
	// '#Subject #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	'#Determiner #Adjective #Noun #Verb #Preposition #Object',

	//'#Determiner #Adjective #Noun #Verb #Object',
	'#Determiner #Adjective? #Noun #Verb #Object (#Determiner #Adjective #Noun)?',

	//'#Determiner #Adjective #Noun #Verb #Object #Preposition #Object',
	'#Determiner #Adjective #Noun #Verb #Object #Preposition #Object (#Preposition #Object)?',
	//'#Determiner #Adjective #Noun #Verb #Object #Preposition #Determiner #Noun',
	'#Determiner #Adjective? #Noun #Verb #Object #Preposition (#Object|#Determiner #Adjective? #Noun)',

	'#Determiner #Adjective #Noun #Verb #Determiner #Noun #Preposition #Object',

	//'#Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	'#Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun (#Preposition [#Object|#Determiner #Adjective #Noun])?',

	'#Determiner #Adjective? #Noun #Verb #Preposition #Object #Preposition (#Object|#Determiner #Adjective? #Noun)',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Object #Preposition #Determiner #Noun',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Object #Preposition #Determiner #Adjective? #Noun',

	//'#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Noun #Preposition (#Object|#Determiner #Noun)',

	//'#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Object',
	'#Determiner #Adjective? #Noun #Verb #Preposition #Determiner #Adjective? #Noun (#Preposition [#Object|#Determiner #Adjective? #Noun])?',

	//'#Determiner #Noun #Verb #Object',

	//'#Determiner #Noun #Verb #Object (#Determiner #Adjective #Noun)?',

	//'#Determiner #Noun #Verb #Object #Preposition (#Object|#Determiner #Adjective? #Noun)',
	//'#Determiner #Noun #Verb #Object #Preposition #Determiner #Noun',
	//'#Determiner #Noun #Verb #Object #Preposition #Determiner #Adjective? #Noun',

	//'#Determiner #Noun #Verb #Preposition #Object',
	'#Determiner #Noun #Verb #Preposition #Object (#Determiner #Adjective #Noun)?',

	//'#Determiner #Noun #Verb #Preposition #Object #Preposition #Determiner #Noun',
	//'#Determiner #Noun #Verb #Preposition #Object #Preposition #Determiner #Adjective? #Noun',
	//'#Determiner #Noun #Verb #Preposition #Object #Preposition (#Object|#Determiner #Adjective? #Noun)',

	//'#Determiner #Noun #Verb #Preposition #Determiner #Adjective #Noun',

	//'#Determiner #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Object',
	//'#Determiner #Noun #Verb #Preposition #Determiner #Noun',
	//'#Determiner #Noun #Verb #Preposition #Determiner #Noun #Preposition #Object',
	//'#Determiner #Noun #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',

	/****************************************************************************************************/

	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb',
	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Object',
	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Adjective',

	'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Adjective?',

	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Object #Preposition #Object',
	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Object #Preposition #Determiner #Noun',
	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Object #Preposition #Determiner #Adjective? #Noun',

	'#Determiner #Noun (and|or) #Determiner #Adjective? #Noun #Verb (#Object|#Determiner #Adjective? #Noun)? (#Preposition [#Object|#Determiner #Adjective? #Noun])?',

	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Determiner #Noun',
	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Determiner #Noun #Preposition #Object',
	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Determiner #Noun #Preposition #Determiner #Noun',
	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Determiner #Noun #Preposition #Determiner #Adjective #Noun',

	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Determiner #Noun (#Preposition [#Object|#Determiner #Adjective? #Noun])?',

	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Determiner #Adjective #Noun',
	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Determiner #Adjective #Noun #Preposition #Object',
	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Preposition #Object',
	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Preposition #Object #Preposition #Determiner #Noun',

	//'#Determiner #Noun (and|or) #Determiner #Noun #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',
	'#Determiner #Noun (and|or) #Determiner #Adjective? #Noun #Verb #Preposition #Determiner #Adjective? #Noun #Preposition (#Object|#Determiner #Adjective? #Noun)?',

	//'#Determiner #Noun (and|or) #Determiner #Adjective #Noun #Verb',
	//'#Determiner #Noun (and|or) #Determiner #Adjective #Noun #Verb #Determiner #Noun #Preposition #Object',
	//'#Determiner #Noun (and|or) #Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Object',
	//'#Determiner #Noun (and|or) #Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Noun (and|or) #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',

	//'#Determiner #Noun (and|or) #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Object',
	//'#Determiner #Noun (and|or) #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Determiner #Noun (and|or) #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	'#Determiner #Noun (and|or) #Determiner #Adjective? #Noun #Verb #Adjective?',
	//'#Determiner #Noun (and|or) #Determiner #Adjective #Noun #Verb #Object #Preposition #Object',
	//'#Determiner #Noun (and|or) #Determiner #Adjective #Noun #Verb #Object #Preposition #Determiner #Noun',
	//'#Determiner #Noun (and|or) #Determiner #Adjective #Noun #Verb #Object #Preposition #Determiner #Adjective #Noun',

	//'#Determiner #Noun (and|or) #Determiner #Adjective? #Noun #Verb #Object #Preposition (#Object|#Determiner #Adjective? #Noun)',

	'#Determiner #Noun (and|or) #Subject #Preposition #Verb #Object',
	'#Determiner #Noun (and|or) #Subject #Preposition #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	//'#Determiner #Noun (and|or) #Subject #Verb',
	'#Determiner #Noun (and|or) #Subject #Verb (#Adjective|#Preposition #Object)?',

	// '#Determiner #Noun (and|or) #Subject #Verb #Object',
	// '#Determiner #Noun (and|or) #Subject #Verb #Object #Preposition #Object',
	// '#Determiner #Noun (and|or) #Subject #Verb #Object #Preposition #Determiner #Adjective #Noun',

	'#Determiner #Noun (and|or) #Subject #Verb #Object (#Preposition [#Object|#Determiner #Adjective? #Noun])?',

	//'#Determiner #Noun (and|or) #Subject #Verb #Preposition #Object',
	//'#Determiner #Noun (and|or) #Subject #Verb #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Noun (and|or) #Subject #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Noun (and|or) #Subject #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	'#Determiner #Noun (and|or) #Subject #Verb #Preposition #Determiner #Adjective? #Noun (#Preposition #Determiner #Adjective? #Noun)?',

	//'#Determiner #Noun (and|or) #Subject #Verb #Determiner #Adjective #Noun',
	//'#Determiner #Noun (and|or) #Subject #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Determiner #Noun (and|or) #Subject #Verb #Determiner #Adjective #Noun #Preposition #Object',
	//'#Determiner #Noun (and|or) #Subject #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	'#Determiner #Noun (and|or) #Subject #Verb #Determiner #Adjective? #Noun (#Preposition [#Object|#Determiner #Adjective? #Noun])?',

	// '#Determiner #Noun (and|or) #Subject #Verb #Determiner #Noun',
	// '#Determiner #Noun (and|or) #Subject #Verb #Determiner #Noun #Preposition #Object',
	// '#Determiner #Noun (and|or) #Subject #Verb #Determiner #Noun #Preposition #Determiner #Noun',
	// '#Determiner #Noun (and|or) #Subject #Verb #Determiner #Noun #Preposition #Determiner #Adjective #Noun',

	'#Determiner #Adjective? #Noun (and|or) #Noun #Verb',

	//'#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb',
	//'#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb #Adjective',

	// '#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb #Object #Preposition #Object',
	// '#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb #Object #Preposition #Determiner #Noun',
	// '#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb #Object #Preposition #Determiner #Adjective #Noun',

	// '#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb #Determiner #Adjective #Noun',
	// '#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb #Determiner #Adjective #Noun #Preposition #Object',
	// '#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	//'#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	//'#Determiner #Adjective #Noun (and|or) #Determiner #Noun #Verb #Preposition #Object #Preposition #Determiner #Noun',

	//'#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb',
	//'#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Adjective',
	//'#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Determiner #Noun #Preposition #Object',
	//'#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Determiner #Noun #Preposition #Determiner #Noun',

	// '#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun',
	// '#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Object',
	// '#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	// '#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Object',
	// '#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Object #Preposition #Object',
	// '#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Object #Preposition #Determiner #Noun',
	// '#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Object #Preposition #Determiner #Adjective #Noun',

	//'#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Noun',
	//'#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	//'#Determiner #Adjective #Noun (and|or) #Determiner #Adjective #Noun #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Object',

	//'#Determiner #Adjective #Noun (and|or) #Subject #Verb',
	//'#Determiner #Adjective #Noun (and|or) #Subject #Verb #Object',
	//'#Determiner #Adjective #Noun (and|or) #Subject #Verb #Adjective',

	//'#Determiner #Adjective #Noun (and|or) #Subject #Verb #Determiner #Noun',
	//'#Determiner #Adjective #Noun (and|or) #Subject #Verb #Determiner #Noun #Preposition #Determiner #Noun',
	//'#Determiner #Adjective #Noun (and|or) #Subject #Verb #Determiner #Noun #Preposition #Object',

	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Determiner #Adjective #Noun',
	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',
	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Determiner #Adjective #Noun #Preposition #Object',

	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Preposition #Determiner #Noun #Preposition #Object',
	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Preposition #Determiner #Noun #Preposition #Determiner #Adjective #Noun',

	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Preposition #Determiner #Adjective #Noun',
	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Object',
	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Preposition #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Preposition #Object',
	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Preposition #Object #Preposition #Object',
	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Preposition #Object #Preposition #Determiner #Noun',
	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Preposition #Object #Preposition #Determiner #Adjective #Noun',

	//'#Determiner #Adjective #Noun (and|or) #Subject #Verb #Object #Preposition #Object',
	'#Determiner #Adjective #Noun (and|or) #Subject #Verb #Object #Preposition #Object #Preposition #Object',

	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Object #Preposition #Determiner #Noun',
	// '#Determiner #Adjective #Noun (and|or) #Subject #Verb #Object #Preposition #Determiner #Adjective #Noun',

	'#Subject (and|or) #Subject #Verb',
	// '#Subject (and|or) #Subject #Verb #Determiner #Noun',
	// '#Subject (and|or) #Subject #Verb #Determiner #Adjective #Noun',
	// '#Subject (and|or) #Subject #Verb #Determiner #Adjective #Noun #Preposition #Object',
	// '#Subject (and|or) #Subject #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective',
	//'#Subject (and|or) #Subject #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Noun',
	//'#Subject (and|or) #Subject #Verb #Determiner #Adjective #Noun #Preposition #Determiner #Adjective #Noun',

	'#Subject (and|or) #Subject #Verb #Determiner #Adjective? #Noun (#Preposition [#Object|#Determiner #Adjective? #Noun])?',
];
