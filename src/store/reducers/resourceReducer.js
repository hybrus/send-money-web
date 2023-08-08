const initialState = {
	providers: [],
	error: null,
};

const resourceReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_PROVIDERS':
			return {
				...state,
				providers: action.payload,
			};
		default:
			return state;
	}
};

export default resourceReducer;
