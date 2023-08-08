import React, { useState } from "react";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import api from "../../../utils/api";
import { useDispatch } from "react-redux";
import { resetTransactionLog } from "../../../store/actions/TransactionActions";
import { fetchUserDetails } from "../../../store/actions/AuthActions";


const SendToUserForm = ({ setSelf }) => {

	const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm();
	const dispatch = useDispatch();
	const [success, setSuccess] = useState(false);

	const onSubmit = async (data) => {
		try {
			// Send the form data to the server using the API (assuming api.post returns a Promise)
			const res = await api.post('transaction', data);

			if (res) {
				// If the API call is successful, perform the following actions
				dispatch(resetTransactionLog()); // Dispatch an action to reset Transaction History (assuming it's a Redux action)
				dispatch(fetchUserDetails()); // Dispatch an action to fetch user details (assuming it's a Redux action)
				setSuccess(true); // Set the "success" state to true to trigger the success notification

				// Close the form or the component containing the form after 1.5 seconds (1500 milliseconds)
				setTimeout(() => {
					setSelf(false);
				}, 1000);
			}
		} catch (err) {
			// If there's an error in the API call, handle the error and set an error message using setError
			setError('server', {
				type: 'manual',
				message: err.response?.data?.message || 'Server Error',
			});
		}
	};

	return (

		<Card className="mt-4 shadow p-2">
			{success ?
				<Card.Body>
					<Card.Title className="mb-0 text-success"><Spinner variant="success" animation="border" size="sm" /> Success</Card.Title>
				</Card.Body>
				:
				<Card.Body>
					<Card.Title>Send Money To User Form</Card.Title>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Control
							type="text"
							value="user"
							hidden
							{...register('type')}
						/>
						<fieldset disabled={isSubmitting} onChange={() => clearErrors()}>
							<Form.Group controlId="email" className="mb-2">
								<Form.Label>Email</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									{...register('recipient_email', { required: 'Email is required' })}
								/>
								{errors.email && <small className="text-danger">{errors.recipient_email.message}</small>}
							</Form.Group>

							<Form.Group controlId="email" className="mb-4">
								<Form.Label>Amount</Form.Label>
								<Form.Control
									type="number"
									step="0.1"
									placeholder="Enter amount"
									{...register('amount', { required: 'Amount is required' })}
								/>
								{errors.amount && <small className="text-danger">{errors.amount.message}</small>}
							</Form.Group>
						</fieldset>
						<div>
							{errors.server && <small className="text-danger">{errors.server.message}</small>}
						</div>
						<Button variant="primary" type='submit' disabled={isSubmitting} >{isSubmitting ? <Spinner size='sm' animation='border' /> : ""} Submit</Button>
						<Button variant="secondary" type='button' disabled={isSubmitting} className="ms-2" onClick={() => setSelf(false)}>Cancel</Button>
					</Form>

				</Card.Body>
			}

		</Card>
	)
}


export default SendToUserForm