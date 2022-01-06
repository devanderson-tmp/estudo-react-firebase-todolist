import {useFormik} from 'formik';
import * as yup from 'yup';
import {Box, Button, TextField} from '@mui/material';

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
					variant="standard"
				/>
			</Box>

			<Button variant="contained" type="submit">
				Adicionar
			</Button>
		</form>
	);
}

export default FormTarefa;
