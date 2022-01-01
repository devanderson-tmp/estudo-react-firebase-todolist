import React from 'react';
import {MuiContainer} from './style';

function Container({children}: {children: React.ReactNode}) {
	return <MuiContainer as="main">{children}</MuiContainer>;
}

export default Container;
