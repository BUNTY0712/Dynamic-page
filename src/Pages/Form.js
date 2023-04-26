import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
	const navigate = useNavigate();
	const [value, setValue] = useState('');
	console.log('first', value);
	return (
		<>
			<div>
				<p style={{ textAlign: 'center', fontSize: '50px' }}>
					Enter No. of form you need
				</p>
				<div style={{ textAlign: 'center' }}>
					<input
						onChange={(e) => setValue(e.target.value)}
						style={{
							width: '14rem',
							height: '3rem',
							textAlign: 'center',
							fontSize: '2rem',
						}}></input>
				</div>
				<div style={{ textAlign: 'center', marginTop: '3rem' }}>
					<button
						style={{
							textAlign: 'center',
							width: '5rem',
							height: '2rem',
							fontSize: '20px',
							fontWeight: '400',
							background: 'red',
							color: 'white',
							cursor: 'pointer',
							borderRadius: '10px',
							boxShadow: '0 0 0 5px',
						}}
						onClick={() => navigate('/data', { state: { value } })}>
						Submit
					</button>
				</div>
			</div>
		</>
	);
};

export default Form;
