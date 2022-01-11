export function tempoParaSegundos(tempo: string): number {
	const [h = '0', m = '0', s = '0'] = tempo.split(':');

	const hora = Number(h) * 3600;
	const minuto = Number(m) * 60;
	const segundos = hora + minuto + Number(s);

	return segundos;
}

export function tempoParaString(h: number, m: number, s: number): string {
	const hora = String(h).padStart(2, '0');
	const minuto = String(m).padStart(2, '0');
	const segundo = String(s).padStart(2, '0');

	return `${hora}:${minuto}:${segundo}`;
}
