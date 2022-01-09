import {useEffect, useState} from 'react';
import {List, Typography} from '@mui/material';
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
		<>
			<Typography variant="h5" component="div" align="center">
				Estudos do dia
			</Typography>
			<List>
				{tarefas.map(tarefa => (
					<ItemTarefa key={tarefa.id} {...tarefa} />
				))}
			</List>
		</>
	);
}

export default ListaTarefas;
