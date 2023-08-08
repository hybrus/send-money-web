import api from '../../utils/api';

export const fetchTransactionLog = () => async (dispatch, getState) => {

	const { transactions } = getState();
	if (transactions.hasMore) {

		try {

			let response = await api.get(`/transaction?page=${transactions.page}`);

			let payload = {
				logs: response.data.data,
				page: response.data.current_page + 1,
				hasMore: response.data.current_page < response.data.last_page,
			};
			dispatch({
				type: "FETCH_TRANSACTION_SUCCESS",
				payload: payload,
			});
		} catch (error) {

			dispatch({
				type: "FETCH_TRANSACTION_ERROR",
				payload: { message: "Oops, Something went wrong . . ." },
			});
		}


	}
}

export const resetTransactionLog = () => async (dispatch, getState) => {

	try {

		let response = await api.get(`/transaction?page=${1}`);

		let payload = {
			logs: response.data.data,
			page: response.data.current_page + 1,
			hasMore: response.data.current_page < response.data.last_page,
		};
		dispatch({
			type: "RESET_TRANSACTION_LOGS",
			payload: payload,
		});
	} catch (error) {

		dispatch({
			type: "FETCH_TRANSACTION_ERROR",
			payload: { message: "Oops, Something went wrong . . ." },
		});
	}
}

export const clearTransactionLog = () => async (dispatch) => {
	dispatch({
		type: "CLEAR_TRANSACTION_LOGS",
		payload: {}
	});
}
