import toast, {Toaster} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import FormPrincipal from '../../components/FormPrincipal';
import useAuth from '../../hooks/useAuth';
import {auth, firebase} from '../../services/firebase';
import {Box} from '@mui/material';

function Login() {
	const {setUsuario} = useAuth();
	const navigate = useNavigate();

	async function handleSubmit(email: string, password: string) {
		await auth
			.signInWithEmailAndPassword(email, password)
			.then(result => {
				if (result.user) {
					const {uid, email} = result.user;

					setUsuario({
						uid,
						email,
					});

					navigate('/home');
				}
			})
			.catch((error: firebase.FirebaseError) => {
				if (error.code === 'auth/user-not-found') {
					toast.error('Não encontramos uma conta com esse endereço de email', {
						ariaProps: {
							role: 'alert',
							'aria-live': 'polite',
						},
					});
				}

				if (error.code === 'auth/wrong-password') {
					toast.error('Sua senha está incorreta', {
						ariaProps: {
							role: 'alert',
							'aria-live': 'polite',
						},
					});
				}
			});
	}

	return (
		<Box
			sx={{
				alignItems: 'center',
				display: 'flex',
				minHeight: '100vh',
				justifyContent: 'center',
			}}>
			<FormPrincipal
				titulo="Login"
				funcaoSubmit={handleSubmit}
				textoBotao="Entrar"
				url="/cadastro"
				textoLink="Criar conta"
			/>
			<Toaster />
		</Box>
	);
}

export default Login;
