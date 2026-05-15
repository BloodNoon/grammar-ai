import React from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SentenceStructures from './pages/SentenceStructure';
import VerbTenseStructure from './pages/VerbTenseStructure';
import ArticleStructure from './pages/ArticleStructure';
import AdjectiveStructure from './pages/adjectivePage/adjectiveStructure';
import AdverbStructure from './pages/adverbPage/adverbPage';
import PromptList from './pages/PromptList';
import PromptOverview from './pages/PromptOverview';
import PrivateRoute from './components/PrivateRoute';
import Prep1Structure from './pages/Prep1Page/prep1Structure';
import Prep2Structure from './pages/Prep2Page/prep2Structure';
import Prep3Structure from './pages/Prep3Page/prep3Structure';
import NounsPage from './pages/NounsPage';
import PropComNouns from './pages/PropComNoun';
import AbPlurNoun from './pages/AbPlurNoun';
import PluralNoun from './pages/pluralNoun';
import PossessiveNouns from './pages/PossessiveNouns';
import NounSortingGame from './components/SortingGameWrapper';
import NounComponentTest from './pages/nounComponentTest';
import NounQuizPageTest from './pages/nounQuizpageTest';
import NounPractice from './pages/nounPractice';
import VerbPractice from './pages/verbPractice';
import ArticlePractice from './pages/articlePractice';
import PrepositionPractice from './pages/prepositionPractice';
import AdjectivePractice from './pages/adjectivePage/adjectivePractice';
import AdverbPractice from './pages/adverbPage/adverbPractice';
import ConjunctionPractice from './pages/conjunctionPractice';
import AdjectiveQuizPage from './pages/adjquiz';
import AdverbQuizPage from './pages/adverbQuiz';
import VerbTenseQuizPage from './pages/verbTenseQuiz';
import ArticleQuizPage from './pages/articleQuiz';
import PrepositionQuizPage from './pages/prepositionQuiz';
import VerbGrammarLegend from './pages/VerbTenseComponents/VerbGrammarLegend';
import VerbSentenceBuilder from './pages/VerbTenseComponents/VerbSentenceBuilder';
import VerbLevelSelection from './pages/VerbTenseComponents/VerbLevelSelection';
import VerbWordBank from './pages/VerbTenseComponents/VerbWordBank';
import ConjunctionStructure from './pages/conjunctionStructure';
import ConjunctionQuiz from './pages/ConjunctionQuiz';
import PracticeMenu from './pages/PracticeMenu';
import ArticleGrammarLegend from './pages/ArticleStructureComponents/ArticleGrammarLegend';
import ArticleSentenceBuilder from './pages/ArticleStructureComponents/ArticleSentenceBuilder';
import ArticleLevelSelection from './pages/ArticleStructureComponents/ArticleLevelSelection';
import ArticleWordBank from './pages/ArticleStructureComponents/ArticleWordbank';
import AdjectiveRoyalOrder from './utils/SentenceChecker/AdjectiveRoyalOrder';
import AdjectiveSentenceStructures from './utils/SentenceChecker/AdjectiveSentenceStructures';
import AdjectiveFillBlanks from './utils/SentenceChecker/AdjectiveFillBlanks';
import AdverbTypes from './utils/SentenceChecker/AdverbTypes';
import AdverbTypeSorting from './utils/SentenceChecker/AdverbTypeSorting';
import AdverbForms from './utils/SentenceChecker/AdverbForms';
import AdverbRoyalOrder from './utils/SentenceChecker/AdverbRoyalOrder';
import AdverbSentenceStructures from './utils/SentenceChecker/AdverbSentenceStructures';
import AdverbIdentificationGame from './utils/SentenceChecker/AdverbIdentificationGame';
import MainNav from './components/MainNav';

function ConditionalMainNav() {
	const location = useLocation();
	const structurePages = [
		'/practice-menu',
		'/sentence-structure',
		'/conjunction-structure',
		'/verb-tense-structure',
		'/article-structure',
		'/adjective-structure',
		'/adverb-structure',
		'/prep1-structure',
		'/prep2-structure',
		'/prep3-structure',
		'/nouns',
		'/propcom-nouns',
		'/abplur-nouns',
		'/plural-noun',
		'/possessive-nouns',
		'/NounSortingGame',
		'/NounComponentTest',
		'/NounQuizPageTest',
		'/noun-practice',
		'/verb-practice',
		'/article-practice',
		'/preposition-practice',
		'/adjective-practice',
		'/adverb-practice',
		'/conjunction-practice',
		'/adj-quiz',
		'/adverb-quiz',
		'/verb-tense-quiz',
		'/article-quiz',
		'/preposition-quiz',
		'/conjunction-quiz',
		'/verb-grammar-legend',
		'/verb-sentence-builder',
		'/verb-level-selection',
		'/verb-wordbank',
		'/article-grammar-legend',
		'/article-sentence-builder',
		'/article-level-selection',
		'/article-wordbank',
		'/adjective-royal-order',
		'/adjective-sentence-structures',
		'/adjective-fill-blanks',
		'/adverb-types',
		'/adverb-forms',
		'/adverb-royal-order',
		'/adverb-sentence-structures',
		'/adverb-identification-game',
		'/adverb-type-sorting'
	];

	
	if (structurePages.includes(location.pathname)) {
		return <MainNav />;
	}
	return null;
}

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
								<Router>
					<ConditionalMainNav />
					<Switch>
						<Route path="/" component={Home} exact />
						<Route path="/signup" component={Signup} />
						<Route path="/login" component={Login} />
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<Route path="/overview/:id" component={PromptOverview} />
						<Route path="/practice-menu" component={PracticeMenu} />
						<Route path="/sentence-structure" component={SentenceStructures} />
						<Route path="/verb-tense-structure" component={VerbTenseStructure} />
						<Route path="/verb-grammar-legend" component={VerbGrammarLegend} />
						<Route path="/verb-sentence-builder" component={VerbSentenceBuilder} />
						<Route path="/verb-level-selection" component={VerbLevelSelection} />
						<Route path="/verb-wordbank" component={VerbWordBank} />
						<Route path="/article-structure" component={ArticleStructure} />
						<Route path="/article-grammar-legend" component={ArticleGrammarLegend} />
						<Route path="/article-sentence-builder" component={ArticleSentenceBuilder} />
						<Route path="/article-level-selection" component={ArticleLevelSelection} />
						<Route path="/article-wordbank" component={ArticleWordBank} />
						<Route path="/prompts" component={PromptList} />
						<Route path="/adjective-structure" component={AdjectiveStructure} />
						<Route path="/adjective-royal-order" component={AdjectiveRoyalOrder} />
						<Route path="/adjective-sentence-structures" component={AdjectiveSentenceStructures} />
						<Route path="/adjective-fill-blanks" component={AdjectiveFillBlanks} />
						<Route path="/adverb-structure" component={AdverbStructure} />
						<Route path="/adverb-types" component={AdverbTypes} />
						<Route path="/adverb-forms" component={AdverbForms} />
						<Route path="/adverb-royal-order" component={AdverbRoyalOrder} />
						<Route path="/adverb-sentence-structures" component={AdverbSentenceStructures} />
						<Route path="/adverb-identification-game" component={AdverbIdentificationGame} />
						<Route path="/adverb-type-sorting" component={AdverbTypeSorting} />
						<Route path="/conjunction-structure" component={ConjunctionStructure} />
						<Route path="/prep1-structure" component={Prep1Structure} />
						<Route path="/prep2-structure" component={Prep2Structure} />
						<Route path="/prep3-structure" component={Prep3Structure} />
						<Route path="/nouns" component={NounsPage} />
						<Route path="/propcom-nouns" component={PropComNouns} />
						<Route path="/abplur-nouns" component={AbPlurNoun} />
						<Route path="/plural-noun" component={PluralNoun} />
					<Route path="/possessive-nouns" component={PossessiveNouns} />
						<Route path="/NounSortingGame" component={NounSortingGame} />
						<Route path="/NounComponentTest" component={NounComponentTest} />
						<Route path="/NounQuizPageTest" component={NounQuizPageTest} />
						<Route path="/noun-practice" component={NounPractice} />
						<Route path="/verb-practice" component={VerbPractice} />
						<Route path="/article-practice" component={ArticlePractice} />
						<Route path="/preposition-practice" component={PrepositionPractice} />
						<Route path="/adjective-practice" component={AdjectivePractice} />
						<Route path="/adverb-practice" component={AdverbPractice} />
						<Route path="/conjunction-practice" component={ConjunctionPractice} />
			<Route path="/adj-quiz" component={AdjectiveQuizPage} />
		<Route path="/adverb-quiz" component={AdverbQuizPage} />
		<Route path="/verb-tense-quiz" component={VerbTenseQuizPage} />
		<Route path="/article-quiz" component={ArticleQuizPage} />
		<Route path="/preposition-quiz" component={PrepositionQuizPage} />
		<Route path="/conjunction-quiz" component={ConjunctionQuiz} />
					</Switch>
				</Router>
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
 
export default App;
