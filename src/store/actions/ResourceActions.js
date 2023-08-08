import api from '../../utils/api';

export const fetchProviders = () => async (dispatch, getState) => {

	const { resources } = getState();
	if (!resources?.provider?.length) {
		try {
			let response = await api.get(`/provider`);
			dispatch({
				type: "SET_PROVIDERS",
				payload: response.data,
			});
		} catch (error) {

			console.error(error);
		}
	}
}
