import {Delete} from '@mui/icons-material';
import {
	IconButton,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import {db} from '../../../services/firebase';
import {Tarefa} from '../../../types/tarefa';

function ItemTarefa({id, tarefa, tempo}: Tarefa) {
	const {usuario} = useAuth();

	return (
		<ListItem
			disablePadding
			secondaryAction={
				<IconButton
					edge="end"
					aria-label="excluir"
					onClick={() => {
						const tarefaRef = db
							.collection('usuarios')
							.doc(`${usuario?.uid}`)
							.collection('tarefas')
							.doc(id);

						tarefaRef
							.delete()
							.then(() => console.log(`Tarefa ${tarefa} removida com sucesso`))
							.catch(error => console.error(error));
					}}>
					<Delete />
				</IconButton>
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
