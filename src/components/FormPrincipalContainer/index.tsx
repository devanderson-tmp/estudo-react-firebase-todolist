import React from 'react';
import {MuiContainer} from './style';

function FormPrincipalContainer({children}: {children: React.ReactNode}) {
	return <MuiContainer as="main">{children}</MuiContainer>;
}

export default FormPrincipalContainer;
