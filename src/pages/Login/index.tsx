import Container from '../../components/Container';
import FormPrincipal from '../../components/FormPrincipal';
import useAuth from '../../hooks/useAuth';

function Login() {
	const {signInWithEmailAndPassword} = useAuth();

	return (
		<Container>
			<FormPrincipal
				titulo="Login"
				funcaoSubmit={signInWithEmailAndPassword}
				textoBotao="Entrar"
				url="/cadastro"
				textoLink="Criar conta"
			/>
		</Container>
	);
}

export default Login;
