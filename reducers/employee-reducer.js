import { combineReducers } from 'redux';
import { USER_LOGIN, USER_LOGOUT} from '../actions/employee-action.js';

function employee(state = null, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        employee: action.employee
      };
		break;
    case USER_LOGOUT:
      return {
        employee: action.employee
      };
    break;
    default:
    return state;
  }
}


const reducers = combineReducers({
  employee
})

export default reducers;
