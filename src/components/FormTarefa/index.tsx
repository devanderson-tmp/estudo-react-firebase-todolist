import {useFormik} from 'formik';
import * as yup from 'yup';
import {Button, TextField} from '@mui/material';

const validationSchema = yup.object({
	tarefa: yup.string().required('Tarefa é obrigatório'),
	tempo: yup.string().required('Tempo é obrigatório'),
});

function FormTarefa() {
	const formik = useFormik({
		initialValues: {
			tarefa: '',
			tempo: '00:30:00',
		},
		validationSchema: validationSchema,
		onSubmit: values => console.log(values),
	});

	return (
		<>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					type="text"
					name="tarefa"
					id="tarefa"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					error={formik.touched.tarefa && Boolean(formik.errors.tarefa)}
					helperText={formik.touched.tarefa && formik.errors.tarefa}
					value={formik.values.tarefa}
					label="Tarefa"
				/>

				<TextField
					type="time"
					name="tempo"
					id="tempo"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					error={formik.touched.tempo && Boolean(formik.errors.tempo)}
					helperText={formik.touched.tempo && formik.errors.tempo}
					value={formik.values.tempo}
					label="Tempo"
				/>

				<Button variant="contained" type="submit">
					Adicionar
				</Button>
			</form>
		</>
	);
}

export default FormTarefa;
