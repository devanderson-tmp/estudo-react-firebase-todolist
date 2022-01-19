import {useFormik} from 'formik';
import * as yup from 'yup';
import {Button, TextField} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import {DateTime} from 'luxon';
import {db} from '../../services/firebase';
import useAuth from '../../hooks/useAuth';
import {tempoParaString} from '../../utils/tempo';
import {Box} from '@mui/system';

const validationSchema = yup.object({
	tarefa: yup.string().required('Tarefa é obrigatório'),
	tempo: yup
		.date()
		.typeError('Tempo inválido')
		.min(
			DateTime.local().set({hour: 0, minute: 4, second: 59}),
			'O tempo mínimo é de 00:05:00'
		)
		.max(
			DateTime.local().set({hour: 1, minute: 30, second: 0}),
			'O tempo máximo é de 01:30:00'
		),
});

function FormTarefa() {
	const {usuario} = useAuth();
	const formik = useFormik({
		initialValues: {
			tarefa: '',
			tempo: DateTime.local().set({hour: 0, minute: 5, second: 0}),
		},
		validationSchema: validationSchema,
		onSubmit: async values => {
			const tarefas = await db
				.collection('usuarios')
				.doc(`${usuario?.uid}`)
				.collection('tarefas');

			tarefas.add({
				completada: false,
				tarefa: values.tarefa,
				tempo: tempoParaString(
					values.tempo.hour,
					values.tempo.minute,
					values.tempo.second
				),
			});
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Box display="flex" flexDirection="column">
				<Box
					sx={[
						{
							display: 'flex',
							justifyContent: 'space-between',
						},
						theme => ({
							[theme.breakpoints.between('xs', 'sm')]: {
								flexDirection: 'column',
							},
						}),
					]}>
					<TextField
						type="text"
						name="tarefa"
						id="tarefa"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						error={formik.touched.tarefa && Boolean(formik.errors.tarefa)}
						helperText={formik.touched.tarefa && formik.errors.tarefa}
						value={formik.values.tarefa}
						label="Adicione um novo estudo"
						variant="standard"
						placeholder="O que você quer estudar?"
						sx={[
							{flexGrow: 1, mr: 1},
							theme => ({
								[theme.breakpoints.down('md')]: {
									mb: 1,
									mr: 0,
								},
							}),
						]}
					/>

					<LocalizationProvider dateAdapter={DateAdapter}>
						<TimePicker
							ampm={false}
							openTo="hours"
							views={['hours', 'minutes', 'seconds']}
							inputFormat="HH:mm:ss"
							mask="__:__:__"
							onChange={value => formik.setFieldValue('tempo', value)}
							value={formik.values.tempo}
							label="Tempo"
							renderInput={params => (
								<TextField
									{...params}
									error={formik.touched.tempo && Boolean(formik.errors.tempo)}
									helperText={formik.touched.tempo && formik.errors.tempo}
									variant="standard"
								/>
							)}
						/>
					</LocalizationProvider>
				</Box>

				<Button
					variant="contained"
					type="submit"
					sx={{alignSelf: 'center', mt: 2}}>
					Adicionar
				</Button>
			</Box>
		</form>
	);
}

export default FormTarefa;
