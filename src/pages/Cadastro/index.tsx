import {
	Box,
	Container,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import {useFormik} from 'formik';
import {useState} from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().min(8).required(),
});

function Cadastro() {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: values => alert(values),
	});
	const [showPassword, setShowPassword] = useState(false);

	function handleClickShowPassword() {
		setShowPassword(!showPassword);
	}

	function handleMouseDownPassword(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
	}

	return (
		<Container
			component="main"
			sx={{
				alignItems: 'center',
				display: 'flex',
				height: '100vh',
				justifyContent: 'center',
			}}>
			<Box component="div">
				<h1>Cadastro</h1>

				<form onSubmit={formik.handleSubmit}>
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
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}>
										{showPassword ? '<VisibilityOff />' : '<Visibility />'}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</form>
			</Box>
		</Container>
	);
}

export default Cadastro;
