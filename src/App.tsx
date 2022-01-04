import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from '@emotion/react';
import {CssBaseline} from '@mui/material';
import {theme} from './components/UI/theme';
import {AuthContextProvider} from './contexts/AuthContext';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AuthContextProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/cadastro" element={<Cadastro />} />
					</Routes>
				</BrowserRouter>
			</AuthContextProvider>
		</ThemeProvider>
	);
}

export default App;
