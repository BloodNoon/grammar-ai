import React from 'react';
import { Button } from '@chakra-ui/react';

const ActionButton = ({ variant = 'primary', children, ...rest }) => {
	const variantMap = {
		primary: 'primary',
		check: 'check',
		success: 'success',
		danger: 'danger',
		nav: 'nav',
	};

	return (
		<Button variant={variantMap[variant]} {...rest}>
			{children}
		</Button>
	);
};

export default ActionButton;
