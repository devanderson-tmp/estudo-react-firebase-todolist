import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import {auth} from '../services/firebase';

type Usuario = {
	uid: string;
	email: string | null;
};

type AuthContext = {
	usuario: Usuario | undefined;
	setUsuario: Dispatch<SetStateAction<Usuario | undefined>>;
};

const AuthContext = createContext({} as AuthContext);

function AuthContextProvider({children}: {children: ReactNode}) {
	const [usuario, setUsuario] = useState<Usuario>();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(usuario => {
			if (usuario) {
				const {uid, email} = usuario;

				setUsuario({
					uid,
					email,
				});
			}
		});

		return () => unsubscribe();
	}, [setUsuario]);

	return (
		<AuthContext.Provider value={{usuario, setUsuario}}>
			{children}
		</AuthContext.Provider>
	);
}

export {AuthContextProvider};
export default AuthContext;
