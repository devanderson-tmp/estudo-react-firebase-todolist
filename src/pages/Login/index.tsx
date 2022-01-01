import Container from '../../components/Container';
import FormPrincipal from '../../components/FormPrincipal';

function Login() {
	function handleSubmit(email: string, senha: string) {
		console.log(email, senha);
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
