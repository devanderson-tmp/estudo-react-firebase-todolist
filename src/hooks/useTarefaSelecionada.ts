import {useContext} from 'react';
import TarefaSelecionadaContext from '../contexts/TarefaSelecionadaContext';

function useTarefaSelecionada() {
	return useContext(TarefaSelecionadaContext);
}

export default useTarefaSelecionada;
