import {Delete} from '@mui/icons-material';
import {
	IconButton,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import useTarefaSelecionada from '../../../hooks/useTarefaSelecionada';
import {db} from '../../../services/firebase';
import {Tarefa} from '../../../types/tarefa';

function ItemTarefa({completada, id, tarefa, tempo}: Tarefa) {
	const {usuario} = useAuth();
	const {tarefaSelecionada, setTarefaSelecionada} = useTarefaSelecionada();

	function handleDelete() {
		const tarefaRef = db
			.collection('usuarios')
			.doc(`${usuario?.uid}`)
			.collection('tarefas')
			.doc(id);

		tarefaRef
			.delete()
			.then(() => console.log(`Tarefa ${tarefa} removida com sucesso`))
			.catch(error => console.error(error));
	}

	return (
		<ListItem
			onClick={() => {
				setTarefaSelecionada({
					completada,
					id,
					tarefa,
					tempo,
				});
			}}
			disablePadding
			secondaryAction={
				<IconButton
					edge="end"
					aria-label="excluir"
					onClick={handleDelete}
					sx={
						tarefaSelecionada?.id === id
							? {
									':hover': {
										bgcolor: 'primary.light',
									},
							  }
							: undefined
					}>
					<Delete />
				</IconButton>
			}
			sx={
				tarefaSelecionada?.id === id
					? {bgcolor: 'primary.main', color: 'white'}
					: undefined
			}>
			<ListItemButton>
				<ListItemText
					primary={tarefa}
					secondary={
						<Typography component="span" variant="body2">
							{tempo}
						</Typography>
					}
				/>
			</ListItemButton>
		</ListItem>
	);
}

export default ItemTarefa;
