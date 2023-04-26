import React, { useEffect } from 'react';
import {
	makeStyles,
	Box,
	Grid,
	MenuItem,
	TextField as TextField2,
} from '@material-ui/core';
import { Field, Form, Formik, FieldArray, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';
import moment from 'moment';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import {
	FlightFareQuoteEtravDispatch,
	FlightFareQuoteDispatch,
	FlightFareQuoteReturnDispatch,
} from '../reducers/HomeReducer';
import { useDispatch, useSelector } from 'react-redux';
import { FlightFareQuoteTripJackDispatch } from '../reducers/TripjackReducer';
import { setBaggage, setMealInfo } from '../reducers/UiReducer';
import countryName from './CountryName';
import LastNameValidation from './LastNameValidation';
const title = ['Mr', 'Mrs', 'Ms', 'Mstr', 'Miss'];
const titleC = ['Mstr', 'Miss'];
const titleI = ['Mr', 'Ms', 'Mstr', 'Miss'];
const useStyles = makeStyles((theme) => ({
	selectField: {
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				border: '1px solid #959595',
			},
		},
		// backgroundColor: 'white',
		marginBottom: 30,
		width: '100%',
		marginTop: 10,
		borderRadius: 5,
		[theme.breakpoints.down('xs')]: {
			marginBottom: 15,
			marginTop: 8,
		},
		'& .MuiOutlinedInput-root': {
			borderRadius: 5,
		},
		'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
			borderRadius: 5,
		},
	},
	InputPropsStyle: {
		// backgroundColor: 'white',
		borderRadius: 15,
	},
	inputPropsStyle: {
		padding: 14,
	},
	createButton: {
		backgroundColor: 'rgb(239, 51, 57)',
		color: 'white',
		borderRadius: 12,
		width: '100%',
		padding: '11px 8px',
		'&:hover': {
			backgroundColor: 'rgb(239, 51, 57)',
		},
	},
	tabBorder: {
		borderBottom: '2px solid transparent',
		color: '#7B95AB',
		fontWeight: 400,
	},
	tabBorderColor: {
		borderBottom: '2px solid #313131',
		color: '#00325B',
		fontWeight: 700,
	},
	tab: {
		[theme.breakpoints.up('sm')]: {
			'& .MuiTab-root': {
				minWidth: 241,
				fontSize: 22,
			},
		},
	},
	date: {
		'& .MuiOutlinedInput-root': {
			borderRadius: 5,
			width: '100%',
		},
	},
	dob: {
		'& .MuiFormControl-root': {
			width: '100%',
		},
	},
	passport: {
		'& .MuiFormControl-root': {
			width: '100%',
		},
	},
	root: {
		'& .MuiFormHelperText-root': {
			fontSize: 12,
		},
		'& .MuiOutlinedInput-input': {
			fontSize: 14,
			padding: '13px 14px',
		},
		'& MuiInputLabel-root': {
			fontSize: 16,
		},
		'& label': {
			fontSize: 15,
		},
		// '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
		// 	fontSize: 14,
		// },
	},
	root2: {
		'& .MuiOutlinedInput-input': {
			fontSize: 14,
			padding: '13px 14px',
		},
		'& MuiInputLabel-root': {
			fontSize: 16,
		},
		'& label': {
			fontSize: 15,
		},
	},
}));
const FlightSummaryForm = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const { selectedOrigin, selectedDepart, baggageInfo } = useSelector(
		(state) => state.ui
	);
	const { agentlogin } = useSelector((state) => state.user);
	const phoneRegExp =
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
	const alpha = /^[a-zA-Z ]*$/;
	const dispatch = useDispatch();
	useEffect(() => {
		if (location.state.OneflightData) {
			if (location.state.OneflightData.Airline_Code) {
				let formEtravFare = {
					AdultCount: location.state.body.AdultCount,
					ChildCount: location.state.body.ChildCount,
					InfantCount: location.state.body.InfantCount,
					Search_Key: location.state.IDEtrav,
					AirRepriceRequests: [
						{
							Flight_Key: location.state.OneflightData.Flight_Key,
							Fare_Id: location.state.OneflightData.Fares.Fare_Id,
						},
					],
					Customer_Mobile: '8092184478',
					GST_Input: false,
					SinglePricing: true,
					agent_id:
						agentlogin && agentlogin.status === 200
							? agentlogin.result.result.id
							: 0,
				};

				// dispatch(FlightFareQuoteEtravDispatch(formEtravFare));
				// dispatch(
				// 	walletBalanceAgentDispatch(
				// 		agentlogin &&
				// 			agentlogin.result &&
				// 			agentlogin.result.result &&
				// 			agentlogin.result.result.email,
				// 		agentlogin &&
				// 			agentlogin.result &&
				// 			agentlogin.result.result &&
				// 			agentlogin.result.result.id
				// 	)
				// );
			} else if (location.state.OneflightData.AirlineCode) {
				let formData1 = {
					TraceId: location.state.IDTBO,
					ResultIndex: location.state.OneflightData.ResultIndex,
					agent_id:
						agentlogin && agentlogin.status === 200
							? agentlogin.result.result.id
							: 0,
				};
				let ssr = {
					TraceId: location.state.IDTBO,
					ResultIndex: location.state.OneflightData.ResultIndex,
				};

				// dispatch(FlightFareQuoteDispatch(formData1, ssr, dispatch));
			}
		}
	}, []);
	const handleFormSubmit = (data) => {
		if (location.state.OneflightData) {
			if (location.state.OneflightData.Airline_Code) {
				let formEtravFare = {
					AdultCount: location.state.body.AdultCount,
					ChildCount: location.state.body.ChildCount,
					InfantCount: location.state.body.InfantCount,
					Search_Key: location.state.IDEtrav,
					AirRepriceRequests: [
						{
							Flight_Key: location.state.OneflightData.Flight_Key,
							Fare_Id: location.state.OneflightData.Fares.Fare_Id,
						},
					],
					Customer_Mobile: data.phone,
					GST_Input: false,
					SinglePricing: true,
					agent_id:
						agentlogin && agentlogin.status === 200
							? agentlogin.result.result.id
							: 0,
				};

				// dispatch(FlightFareQuoteEtravDispatch(formEtravFare));
				// dispatch(
				// 	walletBalanceAgentDispatch(
				// 		agentlogin &&
				// 			agentlogin.result &&
				// 			agentlogin.result.result &&
				// 			agentlogin.result.result.email,
				// 		agentlogin &&
				// 			agentlogin.result &&
				// 			agentlogin.result.result &&
				// 			agentlogin.result.result.id
				// 	)
				// );
				history.push({
					pathname: '/confirmflight',
					state: {
						formData: data,
						body: location.state.body,
						// BookingData: FormData,
						OneflightData: location.state.OneflightData,
						IDTBO: location.state.IDTBO,
						IDEtrav: location.state.IDEtrav,
						orderID: location.state.orderID,
					},
				});
			} else if (location.state.OneflightData.AirlineCode) {
				// let formData1 = {
				// 	TraceId: location.state.IDTBO,
				// 	ResultIndex: location.state.OneflightData.ResultIndex,
				// 	agent_id:
				// 		agentlogin && agentlogin.status === 200
				// 			? agentlogin.result.result.id
				// 			: 0,
				// };
				// let ssr = {
				// 	TraceId: location.state.IDTBO,
				// 	ResultIndex: location.state.OneflightData.ResultIndex,
				// };

				// dispatch(FlightFareQuoteDispatch(formData1, ssr, dispatch));
				history.push({
					pathname: '/confirmflight',
					state: {
						formData: data,
						// BookingData: FormData,
						body: location.state.body,
						OneflightData: location.state.OneflightData,
						IDTBO: location.state.IDTBO,
						IDEtrav: location.state.IDEtrav,
						orderID: location.state.orderID,
						baggageInfo: baggageInfo,
					},
				});
			} else if (location.state.OneflightData.Supplier === 'TJK') {
				let formData = {
					priceIds: [location.state.OneflightData.totalPriceList.id],
				};
				// dispatch(FlightFareQuoteTripJackDispatch(formData));
				history.push({
					pathname: '/confirmflight',
					state: {
						formData: data,
						// BookingData: FormData,
						body: location.state.body,
						OneflightData: location.state.OneflightData,
						IDTBO: location.state.IDTBO,
						IDEtrav: location.state.IDEtrav,
						orderID: location.state.orderID,
					},
				});
			}
		} else if (location.state.selectedonward) {
			if (
				location.state.selectedonward[0]?.Airline_Code &&
				location.state.selectedReturn[0]?.Airline_Code
			) {
				let formEtravFare = {
					Search_Key: location.state.IDEtrav,
					AirRepriceRequests: [
						{
							Flight_Key: location.state.selectedonward[0]?.Flight_Key,
							Fare_Id: location.state.selectedonward[0]?.Fares.Fare_Id,
						},
						{
							Flight_Key: location.state.selectedReturn[0]?.Flight_Key,
							Fare_Id: location.state.selectedReturn[0]?.Fares.Fare_Id,
						},
					],
					Customer_Mobile: data.phone,
					GST_Input: false,
					SinglePricing: true,
					agent_id: agentlogin
						? agentlogin.status === 200
							? agentlogin?.result.result.id
							: 0
						: 0,
				};

				dispatch(FlightFareQuoteEtravDispatch(formEtravFare));
				history.push({
					pathname: '/confirmflight',
					state: {
						formData: data,
						orderID: location.state.orderID,
						returnBody: location.state.returnBody,
						IDTBO: location.state.IDTBO,
						IDEtrav: location.state.IDEtrav,
						//   BookingData: FormData,
						// orderID: location.state.orderID,
						selectedonward: location.state.selectedonward,
						selectedReturn: location.state.selectedReturn,
					},
				});
			} else if (
				location.state.selectedonward[0]?.Airline_Code &&
				location.state.selectedReturn[0]?.AirlineCode
			) {
				if (location.state.selectedonward[0]?.Airline_Code) {
					let formEtravFare = {
						Search_Key: location.state.IDEtrav,
						AirRepriceRequests: [
							{
								Flight_Key: location.state.selectedonward[0]?.Flight_Key,
								Fare_Id: location.state.selectedonward[0]?.Fares.Fare_Id,
							},
						],
						Customer_Mobile: data.phone,
						GST_Input: false,
						SinglePricing: true,
						agent_id: agentlogin
							? agentlogin.status === 200
								? agentlogin?.result.result.id
								: 0
							: 0,
					};

					dispatch(FlightFareQuoteEtravDispatch(formEtravFare));
					history.push({
						pathname: '/confirmflight',
						state: {
							formData: data,
							orderID: location.state.orderID,
							returnBody: location.state.returnBody,
							IDTBO: location.state.IDTBO,
							IDEtrav: location.state.IDEtrav,
							// BookingData: FormData,
							// orderID: location.state.orderID,
							selectedonward: location.state.selectedonward,
							selectedReturn: location.state.selectedReturn,
						},
					});
				}
				if (location.state.selectedReturn[0]?.AirlineCode) {
					let formData1 = {
						TraceId: location.state.IDTBO,
						ResultIndex: location.state.selectedReturn[0].ResultIndex,
						agent_id: agentlogin
							? agentlogin.status === 200
								? agentlogin?.result.result.id
								: 0
							: 0,
					};

					dispatch(FlightFareQuoteDispatch(formData1));
				}
			} else if (
				location.state.selectedReturn[0]?.Airline_Code &&
				location.state.selectedonward[0]?.AirlineCode
			) {
				if (location.state.selectedReturn[0].Airline_Code) {
					let formEtravFare = {
						Search_Key: location.state.IDEtrav,
						AirRepriceRequests: [
							{
								Flight_Key: location.state.selectedReturn[0].Flight_Key,
								Fare_Id: location.state.selectedReturn[0].Fares.Fare_Id,
							},
						],
						Customer_Mobile: data.phone,
						GST_Input: false,
						SinglePricing: true,
						agent_id: agentlogin
							? agentlogin.status === 200
								? agentlogin?.result.result.id
								: 0
							: 0,
					};

					dispatch(FlightFareQuoteEtravDispatch(formEtravFare));
					history.push({
						pathname: '/confirmflight',
						state: {
							formData: data,
							orderID: location.state.orderID,
							returnBody: location.state.returnBody,
							IDTBO: location.state.IDTBO,
							IDEtrav: location.state.IDEtrav,
							// BookingData: FormData,
							// orderID: location.state.orderID,
							selectedonward: location.state.selectedonward,
							selectedReturn: location.state.selectedReturn,
						},
					});
				}
				if (location.state.selectedonward[0]?.AirlineCode) {
					let formData1 = {
						TraceId: location.state.IDTBO,
						ResultIndex: location.state.selectedonward[0].ResultIndex,
						agent_id: agentlogin
							? agentlogin.status === 200
								? agentlogin?.result.result.id
								: 0
							: 0,
					};

					dispatch(FlightFareQuoteDispatch(formData1));
				}
			} else if (
				location.state.selectedonward[0]?.AirlineCode &&
				location.state.selectedReturn[0]?.AirlineCode
			) {
				let formData1 = {
					TraceId: location.state.IDTBO,
					ResultIndex: location.state.selectedonward[0].ResultIndex,
					agent_id: agentlogin
						? agentlogin.status === 200
							? agentlogin?.result.result.id
							: 0
						: 0,
				};
				let formData2 = {
					TraceId: location.state.IDTBO,
					ResultIndex: location.state.selectedReturn[0].ResultIndex,
					agent_id: agentlogin
						? agentlogin.status === 200
							? agentlogin?.result.result.id
							: 0
						: 0,
				};

				dispatch(FlightFareQuoteDispatch(formData1));
				dispatch(FlightFareQuoteReturnDispatch(formData2));
				history.push({
					pathname: '/confirmflight',
					state: {
						formData: data,
						orderID: location.state.orderID,
						returnBody: location.state.returnBody,
						IDTBO: location.state.IDTBO,
						IDEtrav: location.state.IDEtrav,
						selectedonward: location.state.selectedonward,
						selectedReturn: location.state.selectedReturn,
					},
				});
			} else if (
				location.state.selectedonward[0]?.Supplier === 'TJK' &&
				location.state.selectedReturn[0]?.Supplier === 'TJK'
			) {
				let formData = {
					priceIds: [
						location.state.selectedonward[0].totalPriceList.id,
						location.state.selectedReturn[0].totalPriceList.id,
					],
				};
				dispatch(FlightFareQuoteTripJackDispatch(formData));
				history.push({
					pathname: '/confirmflight',
					state: {
						formData: data,
						orderID: location.state.orderID,
						returnBody: location.state.returnBody,
						//   IDTBO: location.state.IDTBO,
						//   IDEtrav: location.state.IDEtrav,
						// BookingData: FormData,
						// orderID: location.state.orderID,
						selectedonward: location.state.selectedonward,
						selectedReturn: location.state.selectedReturn,
					},
				});
			} else if (
				location.state.selectedonward[0]?.Supplier === 'TJK' &&
				location.state.selectedReturn[0]?.AirlineCode
			) {
				if (location.state.selectedonward[0]?.Supplier === 'TJK') {
					let formData = {
						priceIds: [location.state.selectedonward[0].totalPriceList.id],
					};
					dispatch(FlightFareQuoteTripJackDispatch(formData));
				}
				if (location.state.selectedReturn[0]?.AirlineCode) {
					let formData1 = {
						TraceId: location.state.IDTBO,
						ResultIndex: location.state.selectedReturn[0].ResultIndex,
						agent_id: agentlogin
							? agentlogin.status === 200
								? agentlogin?.result.result.id
								: 0
							: 0,
					};

					dispatch(FlightFareQuoteDispatch(formData1));
				}
				history.push({
					pathname: '/confirmflight',
					state: {
						formData: data,
						orderID: location.state.orderID,
						returnBody: location.state.returnBody,
						//   IDTBO: location.state.IDTBO,
						//   IDEtrav: location.state.IDEtrav,
						// BookingData: FormData,
						// orderID: location.state.orderID,
						selectedonward: location.state.selectedonward,
						selectedReturn: location.state.selectedReturn,
					},
				});
			}
		} else if (location.state.intFlight) {
			let formData1 = {
				TraceId: location.state.IDTBO,
				ResultIndex: location.state.intFlight.ResultIndex,
				agent_id:
					agentlogin && agentlogin.status === 200
						? agentlogin.result.result.id
						: 0,
			};
			let ssr = {
				TraceId: location.state.IDTBO,
				ResultIndex: location.state.intFlight.ResultIndex,
			};

			// dispatch(FlightFareQuoteDispatch(formData1, ssr, dispatch));
			history.push({
				pathname: '/confirmflight',
				state: {
					formData: data,
					// BookingData: FormData,
					body: location.state.body,
					returnBody: location.state.returnBody,
					intFlight: location.state.intFlight,
					IDTBO: location.state.IDTBO,
					// IDEtrav: etravInt.result.Search_Key,
					orderID: location.state.orderID,
				},
			});
		}
	};
	const adult = location.state.body
		? location.state.body.AdultCount
		: location.state.returnBody.AdultCount;
	const child = location.state.body
		? location.state.body.ChildCount
		: location.state.returnBody.ChildCount;
	const infant = location.state.body
		? location.state.body.InfantCount
		: location.state.returnBody.InfantCount;
	const ar = [];
	const ar2 = [];
	const ar3 = [];
	for (let i = 1; i <= adult; i++) {
		if (
			selectedOrigin.country_code === 'IN' &&
			selectedDepart.country_code === 'IN'
		) {
			ar.push({ title: '', firstname: '', lastname: '' });
		} else {
			ar.push({
				title: '',
				firstname: '',
				lastname: '',
				passportnumber: '',
				expiry: '',
				dob: '',
				nationality: '',
				passportIssuingCountry: '',
			});
		}
	}
	for (let i = 1; i <= child; i++) {
		if (
			selectedOrigin.country_code === 'IN' &&
			selectedDepart.country_code === 'IN'
		) {
			ar2.push({ title: '', firstname: '', lastname: '', dob: '' });
		} else {
			ar2.push({
				title: '',
				firstname: '',
				lastname: '',
				passportnumber: '',
				expiry: '',
				dob: '',
				nationality: '',
				passportIssuingCountry: '',
			});
		}
	}
	for (let i = 1; i <= infant; i++) {
		if (
			selectedOrigin.country_code === 'IN' &&
			selectedDepart.country_code === 'IN'
		) {
			ar3.push({ title: '', firstname: '', lastname: '', dob: '' });
		} else {
			ar3.push({
				title: '',
				firstname: '',
				lastname: '',
				passportnumber: '',
				expiry: '',
				dob: '',
				nationality: '',
				passportIssuingCountry: '',
			});
		}
	}
	console.log('first', ar);

	return (
		<>
			<Formik
				initialValues={{
					phone: '',
					email: '',
					adults: ar,
					childs: ar2,
					infants: ar3,
				}}
				validationSchema={
					selectedOrigin.country_code === 'IN' &&
					selectedDepart.country_code === 'IN'
						? Yup.object({
								phone: Yup.string()
									.required('Phone required')
									.matches(phoneRegExp, 'Phone number is not valid')
									.min(10, 'too short')
									.max(10, 'too long'),
								email: Yup.string()
									.required('email required')
									.email('Enter valid email'),
								adults: Yup.array().of(
									Yup.object().shape({
										title: Yup.string().required('title required'),
										firstname: Yup.string()
											.required('firstname required')
											.matches(alpha, 'firstname is not valid'),
										lastname: Yup.string()
											.required('lastname required')
											.matches(alpha, 'lastname is not valid')
											.test('validator-custom-name', function (value) {
												const validation = LastNameValidation(value);
												console.log('validation', validation);
												if (validation.isValid) {
													return this.createError({
														path: this.path,
														message: validation.errorMessage,
													});
												} else {
													return true;
												}
											}),
									})
								),
								childs: Yup.array().of(
									Yup.object().shape({
										title: Yup.string().required('title required'),
										firstname: Yup.string()
											.required('firstname required')
											.matches(alpha, 'firstname is not valid'),
										lastname: Yup.string()
											.required('lastname required')
											.matches(alpha, 'lastname is not valid')
											.test('validator-custom-name', function (value) {
												const validation = LastNameValidation(value);
												console.log('validation', validation);
												if (validation.isValid) {
													return this.createError({
														path: this.path,
														message: validation.errorMessage,
													});
												} else {
													return true;
												}
											}),
										dob: Yup.string()
											.required('dob required')
											.test(
												'DOB',
												'Please choose a valid date of birth',
												(date) => moment().diff(moment(date), 'years') <= 12
											),
									})
								),
								infants: Yup.array().of(
									Yup.object().shape({
										title: Yup.string().required('title required'),
										firstname: Yup.string()
											.required('firstname required')
											.matches(alpha, 'firstname is not valid'),
										lastname: Yup.string()
											.required('lastname required')
											.matches(alpha, 'lastname is not valid')
											.test('validator-custom-name', function (value) {
												const validation = LastNameValidation(value);
												console.log('validation', validation);
												if (validation.isValid) {
													return this.createError({
														path: this.path,
														message: validation.errorMessage,
													});
												} else {
													return true;
												}
											}),
										dob: Yup.string()
											.required('dob required')
											.test(
												'DOB',
												'Please choose a valid date of birth',
												(date) => moment().diff(moment(date), 'years') <= 2
											),
									})
								),
						  })
						: Yup.object({
								phone: Yup.string()
									.required('Phone required')
									.matches(phoneRegExp, 'Phone number is not valid')
									.min(10, 'too short')
									.max(10, 'too long'),
								email: Yup.string()
									.required('email required')
									.email('Enter valid email'),
								adults: Yup.array().of(
									Yup.object().shape({
										title: Yup.string().required('title required'),
										firstname: Yup.string()
											.required('firstname required')
											.matches(alpha, 'firstname is not valid'),
										lastname: Yup.string()
											.required('lastname required')
											.matches(alpha, 'lastname is not valid')
											.test('validator-custom-name', function (value) {
												const validation = LastNameValidation(value);
												console.log('validation', validation);
												if (validation.isValid) {
													return this.createError({
														path: this.path,
														message: validation.errorMessage,
													});
												} else {
													return true;
												}
											}),
										passportnumber: Yup.string().required(
											'passportnumber required'
										),
										expiry: Yup.string().required('expiry required'),
										// nationality: Yup.string().required('nationality required'),
										// passportIssuingCountry: Yup.string().required(
										// 	'passportIssuingCountry required'
										// ),
										dob: Yup.string()
											.required('dob required')
											.test(
												'DOB',
												'Please choose a valid date of birth',
												(date) => moment().diff(moment(date), 'years') >= 12
											),
									})
								),
								childs: Yup.array().of(
									Yup.object().shape({
										title: Yup.string().required('title required'),
										firstname: Yup.string()
											.required('firstname required')
											.matches(alpha, 'firstname is not valid'),
										lastname: Yup.string()
											.required('lastname required')
											.matches(alpha, 'lastname is not valid')
											.test('validator-custom-name', function (value) {
												const validation = LastNameValidation(value);
												console.log('validation', validation);
												if (validation.isValid) {
													return this.createError({
														path: this.path,
														message: validation.errorMessage,
													});
												} else {
													return true;
												}
											}),
										passportnumber: Yup.string().required(
											'passportnumber required'
										),
										expiry: Yup.string().required('expiry required'),
										// nationality: Yup.string().required('nationality required'),
										// passportIssuingCountry: Yup.string().required(
										// 	'passportIssuingCountry required'
										// ),
										// .min(new Date(), "Please choose a valid expiry date"),
										dob: Yup.string()
											.required('dob required')
											.test(
												'DOB',
												'Please choose a valid date of birth',
												(date) => moment().diff(moment(date), 'years') <= 12
											),
									})
								),
								infants: Yup.array().of(
									Yup.object().shape({
										title: Yup.string().required('title required'),
										firstname: Yup.string()
											.required('firstname required')
											.matches(alpha, 'firstname is not valid'),
										lastname: Yup.string()
											.required('lastname required')
											.matches(alpha, 'lastname is not valid')
											.test('validator-custom-name', function (value) {
												const validation = LastNameValidation(value);
												console.log('validation', validation);
												if (validation.isValid) {
													return this.createError({
														path: this.path,
														message: validation.errorMessage,
													});
												} else {
													return true;
												}
											}),
										passportnumber: Yup.string().required(
											'passportnumber required'
										),
										expiry: Yup.string().required('expiry required'),
										// nationality: Yup.string().required('nationality required'),
										// passportIssuingCountry: Yup.string().required(
										// 	'passportIssuingCountry required'
										// ),
										dob: Yup.string()
											.required('dob required')
											.test(
												'DOB',
												'Please choose a valid date of birth',
												(date) => moment().diff(moment(date), 'years') <= 2
											),
									})
								),
						  })
				}
				onSubmit={handleFormSubmit}>
				{(formik) => (
					<Form>
						<Box
							className={classes.root}
							style={{
								background: 'white',
								padding: '10px 15px',
								border: '1px solid #e6e6e6',
								marginTop: '10px',
								boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
								borderRadius: '5px',
							}}>
							<Grid
								container
								spacing={2}
								alignItems='center'
								style={{ marginTop: 20, alignItems: 'baseline' }}>
								<Grid item xs={12} lg={6}>
									<Field
										component={TextField}
										name='email'
										type='email'
										variant='outlined'
										// error={errors.email}
										label='Email ID'
										className={classes.selectField}
										InputProps={{
											className: classes.InputPropsStyle,
										}}
										inputProps={{
											style: { padding: 12 },
										}}
									/>
								</Grid>
								<Grid item xs={12} lg={6}>
									<Field
										component={TextField}
										name='phone'
										type='number'
										variant='outlined'
										// error={errors.phone}
										label='Mobile No.'
										className={classes.selectField}
										InputProps={{
											className: classes.InputPropsStyle,
										}}
										inputProps={{
											style: { padding: 12 },
										}}
									/>
								</Grid>
							</Grid>
						</Box>
						<FieldArray
							name='adult'
							render={(arrayHelpers) => {
								return (
									<div>
										{formik.values.adults.map((adult, index) => (
											<>
												<Box
													className={classes.root}
													style={{
														background: 'white',
														padding: '10px 15px',
														border: '1px solid #e6e6e6',
														marginTop: '10px',
														boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
														borderRadius: '5px',
													}}>
													<div>{`Enter the Detail of Adult.${index + 1}`}</div>

													<Grid
														container
														spacing={2}
														alignItems='center'
														style={{ marginTop: 20, alignItems: 'baseline' }}>
														<Grid
															item
															xs={12}
															sm={6}
															lg={4}
															className={classes.root2}
															style={{ alignItems: 'center' }}>
															<Field
																component={TextField}
																select
																name={`adults.${index}.title`}
																type='text'
																variant='outlined'
																label='Select Title'
																// error={errors.titleA1}
																className={classes.selectField}
																InputProps={{
																	className: classes.InputPropsStyle,
																}}
																inputProps={{
																	className: classes.inputPropsStyle,
																}}>
																{title.map((item, index) => (
																	<MenuItem key={index} value={item}>
																		{item}
																	</MenuItem>
																))}
															</Field>
															{/* <ErrorMessage name={`adult.${index}.title`} /> */}
														</Grid>
														<Grid item xs={12} sm={6} lg={4}>
															<Field
																component={TextField}
																name={`adults.${index}.firstname`}
																type='text'
																// error={errors.first_nameA1}
																variant='outlined'
																label='Enter First Name'
																className={classes.selectField}
																InputProps={{
																	className: classes.InputPropsStyle,
																}}
																inputProps={{
																	style: { padding: 12 },
																}}
															/>
															{/* <ErrorMessage
																name={`adults.${index}.firstname`}
															/> */}
														</Grid>
														<Grid item xs={12} sm={6} lg={4}>
															<Field
																component={TextField}
																name={`adults.${index}.lastname`}
																type='text'
																// error={errors.last_nameA1}
																variant='outlined'
																label='Enter Last Name'
																className={classes.selectField}
																InputProps={{
																	className: classes.InputPropsStyle,
																}}
																inputProps={{
																	style: { padding: 12 },
																}}
															/>
														</Grid>

														{selectedOrigin.country_code === 'IN' &&
														selectedDepart.country_code === 'IN' ? (
															''
														) : (
															<>
																<Grid item xs={12} sm={6} lg={4}>
																	<Field
																		component={TextField}
																		name={`adults.${index}.passportnumber`}
																		type='text'
																		// error={errors.last_nameA1}
																		variant='outlined'
																		label='Enter Passport Number'
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			style: { padding: 12 },
																		}}
																	/>
																</Grid>
																<Grid item xs={12} sm={6} lg={4}>
																	<Field
																		component={TextField}
																		name={`adults.${index}.expiry`}
																		type='date'
																		// error={errors.last_nameA1}
																		variant='outlined'
																		label='Select Expiry Date'
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			style: { padding: 12 },
																		}}
																	/>
																</Grid>
																<Grid item xs={12} sm={6} lg={4}>
																	<Field
																		component={TextField}
																		name={`adults.${index}.dob`}
																		type='date'
																		// error={errors.last_nameA1}
																		variant='outlined'
																		label='Select DOB'
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			style: { padding: 12 },
																		}}
																	/>
																</Grid>
																<Grid
																	item
																	xs={12}
																	sm={6}
																	lg={4}
																	className={classes.root2}
																	style={{ alignItems: 'center' }}>
																	<Field
																		component={TextField}
																		select
																		name={`adults.${index}.nationality`}
																		type='text'
																		variant='outlined'
																		label='Select Nationality'
																		// error={errors.titleA1}
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			className: classes.inputPropsStyle,
																		}}>
																		{countryName.map((item, index) => (
																			<MenuItem key={index} value={item.code}>
																				{item.name}
																			</MenuItem>
																		))}
																	</Field>
																	{/* <ErrorMessage name={`adult.${index}.title`} /> */}
																</Grid>
																<Grid
																	item
																	xs={12}
																	sm={6}
																	lg={4}
																	className={classes.root2}
																	style={{ alignItems: 'center' }}>
																	<Field
																		component={TextField}
																		select
																		name={`adults.${index}.passportIssuingCountry`}
																		type='text'
																		variant='outlined'
																		label='Select Passport Issuing Country'
																		// error={errors.titleA1}
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			className: classes.inputPropsStyle,
																		}}>
																		{countryName.map((item, index) => (
																			<MenuItem key={index} value={item.name}>
																				{item.name}
																			</MenuItem>
																		))}
																	</Field>
																	{/* <ErrorMessage name={`adult.${index}.title`} /> */}
																</Grid>
															</>
														)}
														{/* <Grid
															item
															xs={12}
															sm={6}
															lg={12}
															className={classes.root2}
															style={{ alignItems: 'center' }}>
															<Box
																display='flex'
																justifyContent='space-between'
																alignItems='center'>
																<span style={{ width: '100%',fontFamily:'sans-serif',fontWeight:'bold' }}>
																	Select Excess Baggage
																</span>
																<Field
																	component={TextField}
																	select
																	name={`adults.${index}.baggage`}
																	type='text'
																	variant='outlined'
																	label='Select Baggage'
																	// error={errors.titleA1}
																	className={classes.selectField}
																	InputProps={{
																		className: classes.InputPropsStyle,
																	}}
																	inputProps={{
																		className: classes.inputPropsStyle,
																	}}>
																	{ssrTBO &&
																		ssrTBO?.result &&
																		ssrTBO?.result?.Response?.Baggage[0]?.map(
																			(item, inde) => (
																				<MenuItem
																					key={inde}
																					value={item}
																					onClick={() =>
																						dispatch(
																							setBaggage(
																								`${index}|${item.Weight}|${item.Price}`
																							)
																						)
																					}>
																					{`${item.Weight}kg Rs ${item.Price}-${
																						item.Text ? item.Text : ''
																					}`}
																				</MenuItem>
																			)
																		)}
																	
																</Field>
															</Box>
														</Grid> */}
														{/* <Grid
															item
															xs={12}
															sm={6}
															lg={12}
															className={classes.root2}
															style={{ alignItems: 'center' }}>
															<Box
																display='flex'
																justifyContent='space-between'
																alignItems='center'>
																<span style={{ width: '100%',fontFamily:'sans-serif',fontWeight:'bold' }}>
																	Select Meal Preferences :
																</span>
																<Field
																	component={TextField}
																	select
																	name={`adults.${index}.baggage`}
																	type='text'
																	variant='outlined'
																	label='Select Meal'
																	// error={errors.titleA1}
																	className={classes.selectField}
																	InputProps={{
																		className: classes.InputPropsStyle,
																	}}
																	inputProps={{
																		className: classes.inputPropsStyle,
																	}}>
																	{ssrTBO &&
																		ssrTBO?.result &&
																		ssrTBO?.result?.Response?.MealDynamic[0]?.map(
																			(item, inde) => (
																				<MenuItem
																					key={inde}
																					value={item}
																					onClick={() =>
																						dispatch(
																							setMealInfo(
																								`${index}|${item.Quantity}|${item.Price}`
																							)
																						)
																					}>
																					{`Add ${item.AirlineDescription} Rs ${item.Price}-${
																						item.Code ? item.Code : ''
																					}`}
																				</MenuItem>
																			)
																		)}
																</Field>
															</Box>
														</Grid> */}
													</Grid>
												</Box>
											</>
										))}
									</div>
								);
							}}
						/>
						<FieldArray
							name='child'
							render={(arrayHelpers) => {
								return (
									<div>
										{formik.values.childs.map((child, index) => (
											<>
												<Box
													className={classes.root}
													style={{
														background: 'white',
														padding: '10px 15px',
														border: '1px solid #e6e6e6',
														marginTop: '10px',
														boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
														borderRadius: '5px',
													}}>
													<div>{`Enter the Detail of Child.${index + 1}`}</div>
													{/* <Field
														disabled
														type='text'
														name={`chil.${index}.firsName`}
														value={chil.firsName}
													/>
													<Field type='date' name={`chil.${index}.date`} /> */}
													<Grid
														container
														spacing={2}
														alignItems='center'
														style={{ marginTop: 20, alignItems: 'baseline' }}>
														<Grid
															item
															xs={12}
															sm={6}
															lg={3}
															className={classes.root2}
															style={{ alignItems: 'center' }}>
															<Field
																component={TextField}
																select
																name={`childs.${index}.title`}
																type='text'
																variant='outlined'
																label='Select Title'
																// error={errors.titleC1}
																className={classes.selectField}
																InputProps={{
																	className: classes.InputPropsStyle,
																}}
																inputProps={{
																	className: classes.inputPropsStyle,
																}}>
																{titleC.map((item, index) => (
																	<MenuItem key={index} value={item}>
																		{item}
																	</MenuItem>
																))}
															</Field>
														</Grid>
														<Grid item xs={12} sm={6} lg={3}>
															<Field
																component={TextField}
																name={`childs.${index}.firstname`}
																type='text'
																variant='outlined'
																// error={errors.first_nameC1}
																label='Enter First Name'
																className={classes.selectField}
																InputProps={{
																	className: classes.InputPropsStyle,
																}}
																inputProps={{
																	style: { padding: 12 },
																}}
															/>
														</Grid>
														<Grid item xs={12} sm={6} lg={3}>
															<Field
																component={TextField}
																name={`childs.${index}.lastname`}
																type='text'
																variant='outlined'
																// error={errors.last_nameC1}
																label='Enter Last Name'
																className={classes.selectField}
																InputProps={{
																	className: classes.InputPropsStyle,
																}}
																inputProps={{
																	style: { padding: 12 },
																}}
															/>
														</Grid>
														<Grid item xs={12} sm={6} lg={3}>
															<Field
																component={TextField}
																name={`childs.${index}.dob`}
																type='date'
																variant='outlined'
																// error={errors.last_nameC1}
																label='Select DOB'
																className={classes.selectField}
																// style={{color:'lightgrey'}}
																InputProps={{
																	className: classes.InputPropsStyle,
																}}
																inputProps={{
																	style: { padding: 12 },
																}}
															/>
														</Grid>
														{selectedOrigin.country_code === 'IN' &&
														selectedDepart.country_code === 'IN' ? (
															''
														) : (
															<>
																<Grid item xs={12} sm={6} lg={4}>
																	<Field
																		component={TextField}
																		name={`childs.${index}.passportnumber`}
																		type='text'
																		// error={errors.last_nameA1}
																		variant='outlined'
																		label='Enter Passport Number'
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			style: { padding: 12 },
																		}}
																	/>
																</Grid>
																<Grid item xs={12} sm={6} lg={4}>
																	<Field
																		component={TextField}
																		name={`childs.${index}.expiry`}
																		type='date'
																		// error={errors.last_nameA1}
																		variant='outlined'
																		label='Select Expiry Date'
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			style: { padding: 12 },
																		}}
																	/>
																</Grid>
																<Grid
																	item
																	xs={12}
																	sm={6}
																	lg={4}
																	className={classes.root2}
																	style={{ alignItems: 'center' }}>
																	<Field
																		component={TextField}
																		select
																		name={`childs.${index}.nationality`}
																		type='text'
																		variant='outlined'
																		label='Select Nationality'
																		// error={errors.titleA1}
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			className: classes.inputPropsStyle,
																		}}>
																		{countryName.map((item, index) => (
																			<MenuItem key={index} value={item.code}>
																				{item.name}
																			</MenuItem>
																		))}
																	</Field>
																	{/* <ErrorMessage name={`adult.${index}.title`} /> */}
																</Grid>
																<Grid
																	item
																	xs={12}
																	sm={6}
																	lg={4}
																	className={classes.root2}
																	style={{ alignItems: 'center' }}>
																	<Field
																		component={TextField}
																		select
																		name={`childs.${index}.passportIssuingCountry`}
																		type='text'
																		variant='outlined'
																		label='Select Passport Issuing Country'
																		// error={errors.titleA1}
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			className: classes.inputPropsStyle,
																		}}>
																		{countryName.map((item, index) => (
																			<MenuItem key={index} value={item.name}>
																				{item.name}
																			</MenuItem>
																		))}
																	</Field>
																	{/* <ErrorMessage name={`adult.${index}.title`} /> */}
																</Grid>
															</>
														)}
													</Grid>
												</Box>
											</>
										))}
									</div>
								);
							}}
						/>
						<FieldArray
							name='infant'
							render={(arrayHelpers) => {
								return (
									<div>
										{formik.values.infants.map((infant, index) => (
											<>
												<Box
													className={classes.root}
													style={{
														background: 'white',
														padding: '10px 15px',
														border: '1px solid #e6e6e6',
														marginTop: '10px',
														boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
														borderRadius: '5px',
													}}>
													<div>{`Enter the Detail of Infant.${index + 1}`}</div>
													{/* <Field
														disabled
														type='text'
														name={`chil.${index}.firsName`}
														value={chil.firsName}
													/>
													<Field type='date' name={`chil.${index}.date`} /> */}
													<Grid
														container
														spacing={2}
														alignItems='center'
														style={{ marginTop: 20, alignItems: 'baseline' }}>
														<Grid
															item
															xs={12}
															sm={6}
															lg={3}
															className={classes.root2}
															style={{ alignItems: 'center' }}>
															<Field
																component={TextField}
																select
																name={`infants.${index}.title`}
																type='text'
																variant='outlined'
																label='Select Title'
																// error={errors.titleC1}
																className={classes.selectField}
																InputProps={{
																	className: classes.InputPropsStyle,
																}}
																inputProps={{
																	className: classes.inputPropsStyle,
																}}>
																{titleI.map((item, index) => (
																	<MenuItem key={index} value={item}>
																		{item}
																	</MenuItem>
																))}
															</Field>
														</Grid>
														<Grid item xs={12} sm={6} lg={3}>
															<Field
																component={TextField}
																name={`infants.${index}.firstname`}
																type='text'
																variant='outlined'
																// error={errors.first_nameC1}
																label='Enter First Name'
																className={classes.selectField}
																InputProps={{
																	className: classes.InputPropsStyle,
																}}
																inputProps={{
																	style: { padding: 12 },
																}}
															/>
														</Grid>
														<Grid item xs={12} sm={6} lg={3}>
															<Field
																component={TextField}
																name={`infants.${index}.lastname`}
																type='text'
																variant='outlined'
																// error={errors.last_nameC1}
																label='Enter Last Name'
																className={classes.selectField}
																InputProps={{
																	className: classes.InputPropsStyle,
																}}
																inputProps={{
																	style: { padding: 12 },
																}}
															/>
														</Grid>
														<Grid item xs={12} sm={6} lg={3}>
															<Field
																component={TextField}
																name={`infants.${index}.dob`}
																type='date'
																variant='outlined'
																// placeholder="Select DOB"
																// error={errors.last_nameC1}
																label='Select DOB'
																className={classes.selectField}
																InputProps={{
																	className: classes.InputPropsStyle,
																}}
																inputProps={{
																	style: { padding: 12 },
																}}
															/>
														</Grid>
														{selectedOrigin.country_code === 'IN' &&
														selectedDepart.country_code === 'IN' ? (
															''
														) : (
															<>
																<Grid item xs={12} sm={6} lg={4}>
																	<Field
																		component={TextField}
																		name={`infants.${index}.passportnumber`}
																		type='text'
																		// error={errors.last_nameA1}
																		variant='outlined'
																		label='Enter Passport Number'
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			style: { padding: 12 },
																		}}
																	/>
																</Grid>
																<Grid item xs={12} sm={6} lg={4}>
																	<Field
																		component={TextField}
																		name={`infants.${index}.expiry`}
																		type='date'
																		// error={errors.last_nameA1}
																		variant='outlined'
																		label='Select Expiry Date'
																		// value=''
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			style: { padding: 12 },
																		}}
																	/>
																</Grid>
																<Grid
																	item
																	xs={12}
																	sm={6}
																	lg={4}
																	className={classes.root2}
																	style={{ alignItems: 'center' }}>
																	<Field
																		component={TextField}
																		select
																		name={`infants.${index}.nationality`}
																		type='text'
																		variant='outlined'
																		label='Select Nationality'
																		// error={errors.titleA1}
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			className: classes.inputPropsStyle,
																		}}>
																		{countryName.map((item, index) => (
																			<MenuItem key={index} value={item.code}>
																				{item.name}
																			</MenuItem>
																		))}
																	</Field>
																	{/* <ErrorMessage name={`adult.${index}.title`} /> */}
																</Grid>
																<Grid
																	item
																	xs={12}
																	sm={6}
																	lg={4}
																	className={classes.root2}
																	style={{ alignItems: 'center' }}>
																	<Field
																		component={TextField}
																		select
																		name={`infants.${index}.passportIssuingCountry`}
																		type='text'
																		variant='outlined'
																		label='Select Passport Issuing Country'
																		// error={errors.titleA1}
																		className={classes.selectField}
																		InputProps={{
																			className: classes.InputPropsStyle,
																		}}
																		inputProps={{
																			className: classes.inputPropsStyle,
																		}}>
																		{countryName.map((item, index) => (
																			<MenuItem key={index} value={item.name}>
																				{item.name}
																			</MenuItem>
																		))}
																	</Field>
																	{/* <ErrorMessage name={`adult.${index}.title`} /> */}
																</Grid>
															</>
														)}
													</Grid>
												</Box>
											</>
										))}
									</div>
								);
							}}
						/>

						<Grid
							container
							spacing={4}
							alignItems='center'
							style={{ marginBottom: 20 }}>
							<Grid item xs={3}></Grid>
							<Grid item xs={12} lg={4}>
								<button
									type='submit'
									className={classes.createButton}
									a
									style={{ marginTop: 10, fontSize: 16, cursor: 'pointer' }}>
									Continue
								</button>
							</Grid>
							<Grid item xs={4}></Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default FlightSummaryForm;
