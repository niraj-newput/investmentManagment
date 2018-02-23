// routes.js
import React from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
import  App from './containers/app-component.js';
import { Provider } from 'react-redux';
import {store} from "./store.js";
import Login from './containers/login.js';
import RegisterUser from './containers/register.js';
import InvestmentForm from './containers/investment-form.js';
import EditProfile from './containers/edit-profile.js';
const routes = (
  <Provider store ={store}>
    <App>
      <Switch>
        <Redirect exact to="/login" from="/"/>
        <Route exact path="/login" component={ Login }/>
        <Route exact path="/register" component={ RegisterUser }/>
        <Route exact path="/investment-form" component={ InvestmentForm }/>
        <Route exact path="/edit-profile" component={ EditProfile }/>
      </Switch>
    </App>
  </Provider>
);
export default routes;
