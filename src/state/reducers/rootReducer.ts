import {combineReducers} from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Otros reducers aquí si los tienes
});

export default rootReducer;
