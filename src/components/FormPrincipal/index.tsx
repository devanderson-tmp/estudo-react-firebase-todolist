import {Box, Typography} from '@mui/material';
import PrincipalContent from './PrincipalContent';
import PrincipalLink from './PrincipalLink';

type FormPrincipal = {
	titulo: string;
	funcaoSubmit: (email: string, password: string) => Promise<void>;
	textoBotao: string;
	url: string;
	textoLink: string;
};

function FormPrincipal({
	titulo,
	funcaoSubmit,
	textoBotao,
	url,
	textoLink,
}: FormPrincipal) {
	return (
		<Box
			sx={{
				backgroundColor: '#faffe2',
				borderRadius: '1rem',
				boxShadow: '0 1px 4px rgba(66, 52, 64, .2)',
				maxWidth: '404px',
				padding: '3rem 2.5rem',
				width: '100%',
			}}>
			<Typography component="h1" variant="h4" sx={{mb: 2.5}} align="center">
				{titulo}
			</Typography>
			<PrincipalContent funcaoSubmit={funcaoSubmit} textoBotao={textoBotao} />
			<PrincipalLink url={url}>{textoLink}</PrincipalLink>
		</Box>
	);
}

export default FormPrincipal;
