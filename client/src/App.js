import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SentenceStructures from './pages/SentenceStructure';
import VerbTenseStructure from './pages/VerbTenseStructure';
import PromptList from './pages/PromptList';
import PromptOverview from './pages/PromptOverview';
import PrivateRoute from './components/PrivateRoute';

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
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<Route path="/prompts" component={PromptList} />
						<Route path="/overview/:id" component={PromptOverview} />			
					</Switch>
				</Router>
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
