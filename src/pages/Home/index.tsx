import {Box, Container, Grid} from '@mui/material';
import Cronometro from '../../components/Cronometro';
import FormTarefa from '../../components/FormTarefa';
import ListaTarefas from '../../components/ListaTarefas';
import {TarefaSelecionadaProvider} from '../../contexts/TarefaSelecionadaContext';
import useAuth from '../../hooks/useAuth';
import {db} from '../../services/firebase';

function Home() {
	const {usuario} = useAuth();

	function checkTarefa(id: string, completada: boolean) {
		const completadaRef = db
			.collection('usuarios')
			.doc(`${usuario?.uid}`)
			.collection(`tarefas`);

		completadaRef
			.doc(id)
			.update({
				completada,
			})
			.then(() => console.log('Tarefa marcada como concluída'))
			.catch(error => console.error(error));
	}

	return (
		<TarefaSelecionadaProvider>
			<Container component="main">
				<Box
					sx={[
						{
							backgroundColor: '#faffe2',
							mt: '1.5rem',
							padding: '3.5rem 2.5rem',
						},
						theme => ({
							[theme.breakpoints.down('md')]: {
								mt: '1rem',
								padding: '2.5rem 1.5rem',
							},
						}),
					]}
					boxShadow={2}>
					<Grid container columns={{xs: 4, sm: 8, md: 12}}>
						<Grid item xs={4} sm={4} md={6}>
							<FormTarefa />
							<Cronometro checkTarefa={checkTarefa} />
						</Grid>

						<Grid item xs={4} sm={8} md={6}>
							<ListaTarefas />
						</Grid>
					</Grid>
				</Box>
			</Container>
		</TarefaSelecionadaProvider>
	);
}

export default Home;
