import React from 'react';
import Form from './Pages/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataForm from './Pages/DataForm';

const App = () => {
	return (
		<>
			<Router>
				{/* <Form /> */}
				<Routes>
					<Route exact path={'/'} element={<Form />} />
					<Route exact path={'/data'} element={<DataForm />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
