const initialState = {
	logs: [],
	page: 1,
	hasMore: true,
	error: null,
	init: false,
};

// Transaction Reducer
const transactionReducer = (state = initialState, action) => {
	switch (action.type) {
		case "FETCH_TRANSACTION_SUCCESS":

			let newLogs = [...state.logs, ...action.payload.logs].filter((item, index, self) => {
				// Filter out the items with unique ids
				return index === self.findIndex((obj) => obj.id === item.id);
			});

			return {
				...state,
				logs: newLogs,
				page: action.payload.page,
				hasMore: action.payload.hasMore,
				init: true,
			};
		case "RESET_TRANSACTION_LOGS":
			return {
				...state,
				logs: action.payload.logs,
				page: action.payload.page,
				hasMore: action.payload.hasMore,
			};
		case "FETCH_TRANSACTION_ERROR":
			return {
				...state,
				logs: [...state.logs, action.payload.logs],
				page: action.payload.page,
				hasMore: action.payload.hasMore,
				init: true,
			};
		case "CLEAR_TRANSACTION_LOGS":
			return { ...state, ...initialState, logs: [] };
		default:
			return state;
	}
};

export default transactionReducer;
