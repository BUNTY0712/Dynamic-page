import React from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Box, Grid } from '@mui/material';

const logSchema = Yup.object({
	person: Yup.array().of(
		Yup.object().shape({
			firstname: Yup.string().required('firstname required'),
			email: Yup.string().required('email required').email('Enter valid email'),
			phone: Yup.string().required('email required'),
		})
	),
});

const DataForm = () => {
	const location = useLocation();
	console.log('location', location.state.value);
	const handleFormSubmit = (data) => {
		console.log('Data', data);
	};
	let arr = [];
	for (let i = 1; i <= parseInt(location.state.value); i++) {
		arr.push({ phone: '', firstname: '', email: '' });
	}
	console.log('arr', arr);
	return (
		<>
			<Formik
				initialValues={{
					person: arr,
				}}
				validationSchema={Yup.object({
					person: Yup.array().of(
						Yup.object().shape({
							firstname: Yup.string().required('firstname required'),
							email: Yup.string()
								.required('email required')
								.email('Enter valid email'),
							phone: Yup.string().required('phone no. is required'),
						})
					),
				})}
				onSubmit={handleFormSubmit}>
				{(formik) => {
					const { errors } = formik;
					console.log(
						'first',
						Object.keys(errors).length === 0 && errors.constructor === Object
					);
					console.log('errors', errors);
					return (
						<Form>
							<Grid container>
								<Grid ml={3} item xs={6}>
									<FieldArray
										name='person'
										render={(arrayHelpers) => {
											return (
												<div>
													{formik.values.person.map((person, index) => (
														<>
															<h2>Person {index + 1}</h2>

															<Box>
																<Field
																	name={`person.${index}.firstname`}
																	type='text'
																	placeHolder='Name'
																	inputProps={{
																		style: { padding: 12 },
																	}}
																/>
																<br />
																{Object.keys(errors).length === 0 &&
																errors.constructor === Object ? (
																	''
																) : errors?.person[index]?.firstname ? (
																	<span style={{ color: 'red' }}>
																		{errors?.person[index]?.firstname}
																	</span>
																) : null}
																{/* {errors.firstname ? (
																	<span style={{ color: 'red' }}>
																		{errors.firstname}
																	</span>
																) : null} */}
																<br />
																<Field
																	name={`person.${index}.email`}
																	type='email'
																	placeHolder='Email'
																	inputProps={{
																		style: { padding: 12 },
																	}}
																/>
																<br />
																{Object.keys(errors).length === 0 &&
																errors.constructor === Object ? (
																	''
																) : errors?.person[index]?.email ? (
																	<span style={{ color: 'red' }}>
																		{errors?.person[index]?.email}
																	</span>
																) : null}
																<br />
																<Field
																	name={`person.${index}.phone`}
																	type='number'
																	placeHolder='Phone'
																	inputProps={{
																		style: { padding: 12 },
																	}}
																/>
																<br />
																{Object.keys(errors).length === 0 &&
																errors.constructor === Object ? (
																	''
																) : errors?.person[index]?.phone ? (
																	<span style={{ color: 'red' }}>
																		{errors?.person[index]?.phone}
																	</span>
																) : null}
																<br />
															</Box>
														</>
													))}
												</div>
											);
										}}
									/>
									<button
										type='submit'
										style={{
											textAlign: 'center',
											width: '6rem',
											fontSize: '15px',
											background: 'red',
											color: 'white',
											padding: '2px',
											borderRadius: '8px',
											cursor: 'pointer',
										}}>
										Submit
									</button>
								</Grid>
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default DataForm;
