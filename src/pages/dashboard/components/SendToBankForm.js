import React, { useCallback, useEffect, useState } from "react";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import api from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { resetTransactionLog } from "../../../store/actions/TransactionActions";
import { fetchUserDetails } from "../../../store/actions/AuthActions";
import Select from "react-select";


const SendToBankForm = ({ setSelf }) => {

	const { register, handleSubmit, setValue, setError, watch, clearErrors, control, formState: { errors, isSubmitting } } = useForm();
	const dispatch = useDispatch();
	const [success, setSuccess] = useState(false);
	const providers = useSelector((state) => state.resources.providers);
	const [prevProviderID, setPrevProviderID] = useState(null);

	const watchedProviderID = watch('provider_id');

	useEffect(() => {
		if (prevProviderID?.value !== null && prevProviderID?.value !== watchedProviderID?.value) {
			setValue('bank_id', null);
			setPrevProviderID(watchedProviderID)
		}
	}, [watchedProviderID, setPrevProviderID, prevProviderID, setValue]);



	const bankOptions = useCallback(() => {

		let provider = findObjectById(watchedProviderID?.value, providers);
		let banks = provider?.banks || [];

		return banks.map(bank => {
			return { label: bank.name, value: bank.id, isDisabled: bank.is_disabled }
		})

	}, [watchedProviderID, providers])

	const findObjectById = (id, data) => {
		return data.find((item) => item.id === id);
	};

	const onSubmit = async (formdata) => {

		let data = formdata;
		data.provider_id = formdata.provider_id?.value
		data.bank_id = formdata.bank_id?.value

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
					<Card.Title>Send Money To Bank Form</Card.Title>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Control
							type="text"
							value="bank"
							hidden
							{...register('type')}
						/>
						<fieldset disabled={isSubmitting} onChange={() => clearErrors()}>

							<Form.Group controlId="provider_id" className="mb-2">
								<Form.Label>Provider</Form.Label>
								<Controller
									name="provider_id"
									control={control}
									rules={{ required: 'Provider is required' }}
									render={({ field }) => (
										<Select
											{...field}
											options={providers?.map(provider => { return { label: provider.name, value: provider.id, isDisabled: provider.is_disabled  } })}
										/>
									)}
								/>
								{errors.provider_id && <small className="text-danger">{errors.provider_id.message}</small>}
							</Form.Group>

							<Form.Group controlId="bank_id" className="mb-2">
								<Form.Label>Bank</Form.Label>
								<Controller
									name="bank_id"
									control={control}
									rules={{ required: 'Bank is required' }}
									render={({ field }) => (
										<Select
											{...field}
											options={bankOptions()}
										/>
									)}
								/>
								{errors.bank_id && <small className="text-danger">{errors.bank_id.message}</small>}
							</Form.Group>

							<Form.Group controlId="amount" className="mb-4">
								<Form.Label>Amount</Form.Label>
								<Form.Control
									type="number"
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


export default SendToBankForm