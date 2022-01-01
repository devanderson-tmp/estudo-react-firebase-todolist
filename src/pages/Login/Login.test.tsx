import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import Login from '.';

describe('Cadastro', () => {
	it('has a title', () => {
		render(
			<BrowserRouter>
				<Login />
			</BrowserRouter>
		);
		const title = screen.getByText('Login');
		expect(title).toBeInTheDocument();
	});
});
