import React from 'react';

export default function Modal({ open, children }) {
	const isOpenStyle = open ? { display: 'block' } : { display: 'none' };
	return (
		<div style={isOpenStyle}>
			<section className="modal__body">{children}</section>
		</div>
	);
}
