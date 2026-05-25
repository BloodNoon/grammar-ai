import React from 'react';
import { Progress } from '@chakra-ui/react';

const ProgressBar = ({ value, colorScheme = 'orange', ...rest }) => (
	<Progress value={value} colorScheme={colorScheme} {...rest} />
);

export default ProgressBar;
