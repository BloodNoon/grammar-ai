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
import NounSortingGame from './pages/nounComponents/SortingGameWrapper';
import NounComponentTest from './pages/nounComponentTest';

import MainNav from './components/MainNav';

function ConditionalMainNav() {
	const location = useLocation();
	const structurePages = [
		'/sentence-structure',
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
		'/NounSortingGame',
		'/NounComponentTest'
	];

	// Only show MainNav on structure pages
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
						<Route path="/sentence-structure" component={SentenceStructures} />
						<Route path="/verb-tense-structure" component={VerbTenseStructure} />
						<Route path="/article-structure" component={ArticleStructure} />
						<Route path="/prompts" component={PromptList} />
						<Route path="/adjective-structure" component={AdjectiveStructure} />
						<Route path="/adverb-structure" component={AdverbStructure} />
						<Route path="/prep1-structure" component={Prep1Structure} />
						<Route path="/prep2-structure" component={Prep2Structure} />
						<Route path="/prep3-structure" component={Prep3Structure} />
						<Route path="/nouns" component={NounsPage} />
						<Route path="/propcom-nouns" component={PropComNouns} />
					<Route path="/abplur-nouns" component={AbPlurNoun} />
					<Route path="/NounSortingGame" component={NounSortingGame} />
					<Route path="/NounComponentTest" component={NounComponentTest} />
					</Switch>
				</Router>
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
