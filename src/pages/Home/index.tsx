import {Container} from '@mui/material';
import FormTarefa from '../../components/FormTarefa';
import ListaTarefas from '../../components/ListaTarefas';

function Home() {
	return (
		<Container>
			<FormTarefa />
			<ListaTarefas />
		</Container>
	);
}

export default Home;
