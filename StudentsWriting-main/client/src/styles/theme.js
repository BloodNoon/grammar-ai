import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	styles: {
		global: {},
	},
	fonts: {
		body: 'Commissioner',
	},
	components: {
		Link: {
			baseStyle: {
				color: 'red.700',
				_hover: {
					color: 'red.500',
					textDecoration: 'none',
				},
				_click: {
					outline: 'none',
				},
			},
		},
		Button: {
			baseStyle: {
				fontWeight: '500',
				color: 'red.700',
			},
		},
		Heading: {
			baseStyle: {
				color: 'red.700',
				fontWeight: '400',
				fontFamily: 'inherit',
				lineHeight: '120%',
			},
		},
		Text: {
			baseStyle: {
				color: 'red.700',
				lineHeight: '200%',
			},
		},
		FormLabel: {
			baseStyle: {
				color: 'red.700',
				lineHeight: '200%',
			},
		},
	},
});

export default theme;
