import {useNavigate} from 'react-router-dom';
import Container from '../../components/Container';
import FormPrincipal from '../../components/FormPrincipal';
import useAuth from '../../hooks/useAuth';
import {auth, firebase} from '../../services/firebase';

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
				console.log(error);
			});
	}

	return (
		<Container>
			<FormPrincipal
				titulo="Login"
				funcaoSubmit={handleSubmit}
				textoBotao="Entrar"
				url="/cadastro"
				textoLink="Criar conta"
			/>
		</Container>
	);
}

export default Login;
