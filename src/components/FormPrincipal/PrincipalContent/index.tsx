import {useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const validationSchema = yup.object({
	email: yup
		.string()
		.email('Insira um e-mail válido')
		.required('E-mail é obrigatório'),
	password: yup
		.string()
		.min(8, 'Senha deve ter no mínimo 8 caracteres')
		.required('Senha é obrigatório'),
});

type PrincipalContent = {
	funcaoSubmit: (email: string, password: string) => Promise<void>;
	textoBotao: string;
};

function PrincipalContent({funcaoSubmit, textoBotao}: PrincipalContent) {
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: async values => {
			await funcaoSubmit(values.email, values.password);
			navigate('/home');
		},
	});
	const [showPassword, setShowPassword] = useState(false);

	function handleClickShowPassword() {
		setShowPassword(!showPassword);
	}

	return (
		<>
			<form
				onSubmit={formik.handleSubmit}
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}>
				<TextField
					id="email"
					name="email"
					label="E-mail"
					variant="outlined"
					value={formik.values.email}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
					type="email"
				/>

				<TextField
					id="password"
					name="password"
					label="Senha"
					variant="outlined"
					value={formik.values.password}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
					type={showPassword ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="mostrar senha"
									edge="end"
									onClick={handleClickShowPassword}>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
					sx={{mb: '2.5rem', mt: '1.5rem'}}
				/>

				<Button variant="contained" type="submit" size="large">
					{formik.isSubmitting ? <CircularProgress /> : textoBotao}
				</Button>
			</form>
		</>
	);
}

export default PrincipalContent;
