import {useEffect, useState} from 'react';
import {Box, List, Typography} from '@mui/material';
import useAuth from '../../hooks/useAuth';
import {db} from '../../services/firebase';
import ItemTarefa from './Tarefa';
import {Tarefa} from '../../types/tarefa';

function ListaTarefas() {
	const [tarefas, setTarefas] = useState<Tarefa[]>([]);
	const {usuario} = useAuth();

	useEffect(() => {
		const tarefasRef = db
			.collection('usuarios')
			.doc(`${usuario?.uid}`)
			.collection('tarefas');

		tarefasRef.orderBy('tarefa').onSnapshot(querySnapshot => {
			const arrayDeTarefas: Tarefa[] = [];

			querySnapshot.forEach(doc => {
				arrayDeTarefas.push({
					id: doc.id,
					...(doc.data() as Omit<Tarefa, 'id'>),
				});
			});

			setTarefas(arrayDeTarefas);
		});
	}, [usuario]);

	return (
		<Box
			sx={[
				{marginLeft: 2},
				theme => ({
					[theme.breakpoints.down('md')]: {
						marginLeft: 0,
						marginTop: 4,
					},
				}),
			]}>
			<Typography variant="h5" component="div" align="center">
				Estudos do dia
			</Typography>
			<List>
				{tarefas.map(tarefa => (
					<ItemTarefa key={tarefa.id} {...tarefa} />
				))}
			</List>
		</Box>
	);
}

export default ListaTarefas;
