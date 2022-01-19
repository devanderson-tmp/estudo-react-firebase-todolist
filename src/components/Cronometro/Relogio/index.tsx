import {Box, Typography} from '@mui/material';

function Relogio({tempo}: {tempo: number}) {
	const minutos = Math.floor(tempo / 60);
	const segundos = tempo % 60;
	const [minDez, minUn] = String(minutos).padStart(2, '0');
	const [segDez, segUn] = String(segundos).padStart(2, '0');

	return (
		<Box my={4}>
			<Typography variant="h3" component="span">
				{minDez}
			</Typography>
			<Typography variant="h3" component="span">
				{minUn}
			</Typography>
			<Typography variant="h3" component="span">
				:
			</Typography>
			<Typography variant="h3" component="span">
				{segDez}
			</Typography>
			<Typography variant="h3" component="span">
				{segUn}
			</Typography>
		</Box>
	);
}

export default Relogio;
