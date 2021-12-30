import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Cadastro from './pages/Cadastro';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Cadastro />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
