import {useNavigate} from 'react-router-dom';
import {Button, Stack, Typography} from '@mui/material';
import useAuth from '../../hooks/useAuth';
import {auth} from '../../services/firebase';

function Perfil() {
	const {usuario, setUsuario} = useAuth();
	const navigate = useNavigate();

	return (
		<Stack
			direction="row"
			spacing={2}
			mt={4}
			justifyContent="flex-end"
			alignItems="center">
			<Typography>{usuario?.email}</Typography>
			<Button
				variant="text"
				onClick={() => {
					auth
						.signOut()
						.then(() => {
							setUsuario(undefined);
							navigate('/');
						})
						.catch(error => console.error(error));
				}}>
				Sair
			</Button>
		</Stack>
	);
}

export default Perfil;
