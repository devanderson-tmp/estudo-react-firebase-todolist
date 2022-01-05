import {useNavigate} from 'react-router-dom';
import Container from '../../components/Container';
import FormPrincipal from '../../components/FormPrincipal';
import {auth, firebase} from '../../services/firebase';

function Cadastro() {
	const navigate = useNavigate();
	async function handleSubmit(email: string, senha: string) {
		await auth
			.createUserWithEmailAndPassword(email, senha)
			.then(() => navigate('/home'))
			.catch((error: firebase.FirebaseError) => {
				console.log(error);
				if (error.code === 'auth/email-already-in-use') {
					alert('E-mail já está em uso');
				}
			});
	}

	return (
		<Container>
			<FormPrincipal
				titulo="Cadastro"
				funcaoSubmit={handleSubmit}
				textoBotao="Cadastrar"
				url="/"
				textoLink="Voltar para login"
			/>
		</Container>
	);
}

export default Cadastro;
