import {useFormik} from 'formik';
import * as yup from 'yup';
import {Box, Button, TextField} from '@mui/material';
import DateAdapter from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import {DateTime} from 'luxon';
import {db} from '../../services/firebase';
import {tempoParaSegundos} from '../../utils/tempo';
import useAuth from '../../hooks/useAuth';

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
				selecionada: false,
				tarefa: values.tarefa,
				tempo: tempoParaSegundos(
					values.tempo.hour,
					values.tempo.minute,
					values.tempo.second
				),
			});
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Box sx={{alignItems: 'flex-start', display: 'flex'}}>
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

			<Button variant="contained" type="submit">
				Adicionar
			</Button>
		</form>
	);
}

export default FormTarefa;
