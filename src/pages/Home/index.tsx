import {Container} from '@mui/material';
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
			<Container>
				<FormTarefa />
				<Cronometro checkTarefa={checkTarefa} />
				<ListaTarefas />
			</Container>
		</TarefaSelecionadaProvider>
	);
}

export default Home;
