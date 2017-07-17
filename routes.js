// routes.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { App } from './containers/app-component.js';
import { Provider } from 'react-redux';
import {store} from "./store.js";
import Login from './containers/login.js';
import RegisterUser from './containers/register.js';
import InvestmentForm from './containers/investment-form.js';
import Attachment from './components/attachment-modal.js';
const routes = (
  <Provider store = {store}>
      <App>
        <Route path="/login" component={ Login }/>
        <Route path="/register" component={ RegisterUser }/>
        <Route path="/investment-form" component={ InvestmentForm }/>
      </App>
  </Provider>
);
export default routes;
