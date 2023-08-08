import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
	return (
		<Container className='my-4'>
			<h1>Login</h1>
			<LoginForm />
		</Container>
	);
};

export default LoginPage;
