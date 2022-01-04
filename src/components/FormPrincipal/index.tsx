import {Typography} from '@mui/material';
import PrincipalContent from './PrincipalContent';
import PrincipalLink from './PrincipalLink';
import Box from './style';

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
		<Box>
			<Typography component="h1" variant="h4" sx={{mb: 2.5}} align="center">
				{titulo}
			</Typography>
			<PrincipalContent funcaoSubmit={funcaoSubmit} textoBotao={textoBotao} />
			<PrincipalLink url={url}>{textoLink}</PrincipalLink>
		</Box>
	);
}

export default FormPrincipal;
