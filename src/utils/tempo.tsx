export function tempoParaSegundos(h: number, m: number, s: number): number {
	const hora = h * 3600;
	const minuto = m * 60;
	const segundos = hora + minuto + s;

	return segundos;
}
// auth/weak-password
