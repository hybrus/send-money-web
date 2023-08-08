const initialState = {
	token: localStorage.getItem('access_token') || null,
	user: null,
	error: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				token: action.payload,
				error: null,
			};
		case 'LOGIN_ERROR':
			return {
				...state,
				token: null,
				error: action.payload,
			};
		case 'LOGOUT_SUCCESS':
			return {
				...state,
				token: null,
				user: null,
				error: null,
			};
		case 'FETCH_USER_SUCCESS':
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
