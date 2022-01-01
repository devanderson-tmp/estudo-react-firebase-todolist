import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/cadastro" element={<Cadastro />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
