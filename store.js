import { createStore } from 'redux';
import reducers from './reducers/employee-reducer.js';
export const store = createStore(reducers);