import React from 'react';
import ReactDOM from 'react-dom';
// import './styles/styles.css';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import '@fontsource/commissioner/300.css';
import '@fontsource/commissioner/400.css';
import '@fontsource/commissioner/500.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
