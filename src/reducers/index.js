import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import cricketReducer from './cricketReducer';

export default combineReducers({
  errors: errorReducer,
  cricket: cricketReducer,
});
