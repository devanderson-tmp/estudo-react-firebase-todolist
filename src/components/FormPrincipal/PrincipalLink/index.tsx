import {ReactNode} from 'react';
import {Link} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';

type PrincipalLink = {
	url: string;
	children: ReactNode;
};

function PrincipalLink({url, children}: PrincipalLink) {
	return (
		<Link
			component={RouterLink}
			to={url}
			underline="hover"
			variant="body1"
			align="center"
			sx={{color: '#1c1c1c', display: 'block', mt: 2.5}}>
			{children}
		</Link>
	);
}

export default PrincipalLink;
