import api from '../../utils/api';
import { clearTransactionLog } from './TransactionActions';

export const login = (userData) => async (dispatch) => {
	try {
		const response = await api.post('/auth/login', userData);

		if (response && response.data && response.data.access_token) {
			const access_token = response.data.access_token;
			localStorage.setItem('access_token', access_token);
			dispatch(clearTransactionLog());
			dispatch({ type: 'LOGIN_SUCCESS', payload: access_token });
			return true;
		} else {
			dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid response from the server.' });
		}


	} catch (error) {
		dispatch({ type: 'LOGIN_ERROR', payload: error.response.data["message"] || 'Invalid response from the server.' });
	}
};

export const fetchUserDetails = () => async (dispatch, getState) => {

	try {
		const response = await api.get('/auth/me');
		dispatch({ type: 'FETCH_USER_SUCCESS', payload: response.data });
	} catch (error) {
		// Unauthorized (token expired or invalid)
		localStorage.removeItem('access_token'); // Remove the expired token from localStorage
		dispatch({ type: 'LOGOUT_SUCCESS' }); // Update the state to clear user details

	}

};

export const logout = () => async (dispatch) => {
	await api.post('/auth/logout');
	localStorage.removeItem('access_token'); // Remove the access_token from localStorage on logout
	dispatch({ type: 'LOGOUT_SUCCESS' });
};
