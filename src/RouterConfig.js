
import React from 'react';
import {Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';

const RouterConfig = () => {
	return (
		<Routes>
			<Route exact path='/login' element={<GuestRoute />}>
				<Route exact path='/login' element={<LoginPage />} />
			</Route>
			<Route exact path='/' element={<PrivateRoute />}>
				<Route exact path='/' element={<DashboardPage />} />
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default RouterConfig;
