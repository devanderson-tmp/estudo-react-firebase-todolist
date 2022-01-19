import {Pause, PlayArrow, Stop} from '@mui/icons-material';
import {Box, IconButton, Stack} from '@mui/material';
import {useEffect, useState} from 'react';
import useTarefaSelecionada from '../../hooks/useTarefaSelecionada';
import {tempoParaSegundos} from '../../utils/tempo';
import Relogio from './Relogio';

type Cronometro = {
	checkTarefa: (id: string, completada: boolean) => void;
};

let cronometroTimeout: NodeJS.Timeout;

function Cronometro({checkTarefa}: Cronometro) {
	const [ativo, setAtivo] = useState(false);
	const [tempo, setTempo] = useState(0);
	const {tarefaSelecionada, setTarefaSelecionada} = useTarefaSelecionada();

	useEffect(() => {
		if (tarefaSelecionada?.tempo) {
			setTempo(tempoParaSegundos(tarefaSelecionada.tempo));
		}

		clearTimeout(cronometroTimeout);

		if (ativo) setAtivo(false);
	}, [tarefaSelecionada]);

	useEffect(() => {
		if (ativo && tempo > 0) {
			cronometroTimeout = setTimeout(() => {
				setTempo(tempo - 1);
			}, 1000);
		} else if (ativo && tempo === 0) {
			if (tarefaSelecionada) checkTarefa(tarefaSelecionada?.id, true);
			setAtivo(false);
		}
	}, [ativo, tempo]);

	function play() {
		setAtivo(true);
	}

	function pause() {
		clearTimeout(cronometroTimeout);
		setAtivo(false);
	}

	function stop() {
		clearTimeout(cronometroTimeout);
		setAtivo(false);
		setTempo(0);
		setTarefaSelecionada(undefined);
	}

	return (
		<Box alignItems="center" display="flex" flexDirection="column">
			<Relogio tempo={tempo} />
			<Stack direction="row" alignItems="center" spacing={1}>
				<IconButton onClick={play} aria-label="play">
					<PlayArrow />
				</IconButton>
				<IconButton onClick={pause} aria-label="pause">
					<Pause />
				</IconButton>
				<IconButton onClick={stop} aria-label="stop">
					<Stop />
				</IconButton>
			</Stack>
		</Box>
	);
}

export default Cronometro;
