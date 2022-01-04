import {createContext, ReactNode, useEffect, useState} from 'react';
import {auth} from '../services/firebase';

type Usuario = {
	uid: string;
	email: string | null;
};

type AuthContext = {
	usuario: Usuario | undefined;
	signInWithEmailAndPassword: (
		email: string,
		password: string
	) => Promise<void>;
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

	async function signInWithEmailAndPassword(email: string, password: string) {
		const result = await auth.signInWithEmailAndPassword(email, password);

		if (result.user) {
			const {uid, email} = result.user;

			setUsuario({
				uid,
				email,
			});
		}
	}

	return (
		<AuthContext.Provider value={{usuario, signInWithEmailAndPassword}}>
			{children}
		</AuthContext.Provider>
	);
}

export {AuthContextProvider};
export default AuthContext;
