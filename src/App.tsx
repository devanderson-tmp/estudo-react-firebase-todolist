import {ThemeProvider} from '@emotion/react';
import {CssBaseline} from '@mui/material';
import {theme} from './components/UI/theme';
import {AuthContextProvider} from './contexts/AuthContext';
import Routes from './routes/Routes';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AuthContextProvider>
				<Routes />
			</AuthContextProvider>
		</ThemeProvider>
	);
}

export default App;
