import {useEffect} from 'react';
import {BrowserRouter, Route, Routes as DomRoutes} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';
import Login from '../pages/Login';

function Routes() {
	const {usuario} = useAuth();

	useEffect(() => {
		console.log(usuario);
	}, [usuario]);

	return (
		<BrowserRouter>
			<DomRoutes>
				{!usuario ? (
					<>
						<Route path="/" element={<Login />} />
						<Route path="/cadastro" element={<Cadastro />} />
					</>
				) : (
					<Route path="/home" element={<Home />} />
				)}
				<Route
					path="*"
					element={
						<div>
							<h1>404</h1>
						</div>
					}
				/>
			</DomRoutes>
		</BrowserRouter>
	);
}

export default Routes;
