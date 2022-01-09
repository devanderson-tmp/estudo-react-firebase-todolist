export function tempoParaSegundos(h: number, m: number, s: number): number {
	const hora = h * 3600;
	const minuto = m * 60;
	const segundos = hora + minuto + s;

	return segundos;
}
// auth/weak-password

export function tempoParaString(h: number, m: number, s: number): string {
	const hora = String(h).padStart(2, '0');
	const minuto = String(m).padStart(2, '0');
	const segundo = String(s).padStart(2, '0');

	return `${hora}:${minuto}:${segundo}`;
}
