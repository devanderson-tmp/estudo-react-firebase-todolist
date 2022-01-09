import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';
import {Tarefa} from '../types/tarefa';

type TarefaSelecionada = {
	tarefaSelecionada: Tarefa | undefined;
	setTarefaSelecionada: Dispatch<SetStateAction<Tarefa | undefined>>;
};

const TarefaSelecionadaContext = createContext({} as TarefaSelecionada);

function TarefaSelecionadaProvider({children}: {children: ReactNode}) {
	const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa>();

	return (
		<TarefaSelecionadaContext.Provider
			value={{
				tarefaSelecionada,
				setTarefaSelecionada,
			}}>
			{children}
		</TarefaSelecionadaContext.Provider>
	);
}

export {TarefaSelecionadaProvider};
export default TarefaSelecionadaContext;
