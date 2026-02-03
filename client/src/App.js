import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from '../../StudentsWriting-main/client/src/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from '../../StudentsWriting-main/client/src/pages/Home';
import Signup from '../../StudentsWriting-main/client/src/pages/Signup';
import Login from '../../StudentsWriting-main/client/src/pages/Login';
import Dashboard from '../../StudentsWriting-main/client/src/pages/Dashboard';
import SentenceStructures from './pages/SentenceStructure';
import VerbTenseStructure from '../../StudentsWriting-main/client/src/pages/VerbTenseStructure';
import ArticleStructure from '../../StudentsWriting-main/client/src/pages/ArticleStructure';
import AdjectiveStructure from '../../StudentsWriting-main/client/src/pages/adjectivePage/adjectiveStructure';
import AdverbStructure from '../../StudentsWriting-main/client/src/pages/adverbPage/adverbPage';
import PromptList from '../../StudentsWriting-main/client/src/pages/PromptList';
import PromptOverview from '../../StudentsWriting-main/client/src/pages/PromptOverview';
import PrivateRoute from '../../StudentsWriting-main/client/src/components/PrivateRoute';
import Prep1Structure from '../../StudentsWriting-main/client/src/pages/Prep1Page/prep1Structure';
import Prep2Structure from '../../StudentsWriting-main/client/src/pages/Prep2Page/prep2Structure';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Router>
					<Switch>
						<Route path="/" component={Home} exact />
						<Route path="/signup" component={Signup} />
						<Route path="/login" component={Login} />
						<Route path="/sentence-structure" component={SentenceStructures} />
						<Route path="/verb-tense-structure" component={VerbTenseStructure} />
						<Route path="/article-structure" component={ArticleStructure} />
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<Route path="/prompts" component={PromptList} />
						<Route path="/overview/:id" component={PromptOverview} />
						<Route path="/adjective-structure" component={AdjectiveStructure} />
						<Route path="/adverb-structure" component={AdverbStructure} />
						<Route path="/prep1-structure" component={Prep1Structure} />
						<Route path="/prep2-structure" component={Prep2Structure} />
					</Switch>
				</Router>
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
