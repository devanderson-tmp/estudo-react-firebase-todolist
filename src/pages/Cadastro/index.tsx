import Container from '../../components/Container';
import FormPrincipal from '../../components/FormPrincipal';
import {auth} from '../../services/firebase';

function Cadastro() {
	async function handleSubmit(email: string, senha: string) {
		const result = await auth.createUserWithEmailAndPassword(email, senha);

		if (result.user) {
			alert('Conta criada com sucesso!');
		}
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
