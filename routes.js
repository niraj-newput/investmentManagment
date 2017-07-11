// routes.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { App } from './containers/app-component.js';
import Login from './containers/login.js';
import RegisterUser from './containers/register.js';


const routes = (
  <App>
    <Redirect from='/' to='/login'/> 
    <Route path="/login" component={ Login }/>
    <Route path="/register" component={ RegisterUser }/>
  </App>
);
export default routes;