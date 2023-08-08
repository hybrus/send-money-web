import { combineReducers } from 'redux';
import authReducer from './authReducer';
import transactionReducer from './transactionReducer';
import resourceReducer from './resourceReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	transactions: transactionReducer,
	resources: resourceReducer
});

export default rootReducer;
