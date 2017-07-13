import { combineReducers } from 'redux';
import { USER_LOGIN } from '../actions/employee-action.js';

function employee(state = null, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        employee: action.employee
      };
		break;
    default:
    return state;
  }
}

const reducers = combineReducers({
  employee: employee
})

export default reducers;