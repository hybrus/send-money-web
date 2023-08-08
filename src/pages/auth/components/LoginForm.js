import React from 'react';
import { Form, Button, Spinner, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../store/actions/AuthActions';

const LoginForm = () => {
	const dispatch = useDispatch();
	const authError = useSelector((state) => state.auth.error);
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = async (data) => {
		await dispatch(login(data));
	};

	return (
		<Card className='p-2 shadow'>
			<Card.Body>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<fieldset disabled={isSubmitting}>
						<Form.Group controlId="email">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								{...register('email', { required: 'Email is required' })}
							/>
							{errors.email && <span className="text-danger">{errors.email.message}</span>}
						</Form.Group>

						<Form.Group controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter password"
								{...register('password', { required: 'Password is required' })}
							/>
							{errors.password && <span className="text-danger">{errors.password.message}</span>}
						</Form.Group>
						{authError && <span className="text-danger">{authError}</span>}
						<div className="d-grid gap-2 mt-3">
							<Button variant="primary" type="submit">
								{isSubmitting ? <Spinner size='sm' animation='border' /> : ""} Login
							</Button>
						</div>
					</fieldset>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default LoginForm;
