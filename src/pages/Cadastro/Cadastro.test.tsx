import {render, screen} from '@testing-library/react';
import Cadastro from '.';

describe('Cadastro', () => {
	it('has a title', () => {
		render(<Cadastro />);
		const title = screen.getByText('Cadastro');
		expect(title).toBeInTheDocument();
	});
});
