import React from 'react';
import { Link, Redirect ,hashHistory} from 'react-router-dom';
import Formsy from "formsy-react";
import { Form, Input } from 'formsy-react-components';
import { employeeDetail } from '../actions/employee-action.js';
import { dbConfig } from '../services/pouchdb-service.js';
import "../assets/scss/login-form.scss";
import {Helmet} from "react-helmet";
import {store} from "../store.js";
import localForage from "localforage";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submit  = this.submit.bind(this);
  }

  submit(user) {
    var self = this;
    dbConfig.getData(user.email).then(function(doc) {
      if(doc.obj.email == user.email && doc.obj.password == user.password ) {
        self.props.history.push("/investment-form");
        store.dispatch(employeeDetail(doc));
      } else {
        alert("Email or password do not match");
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  render() {
    return (
        <div>
            <Helmet>
                <title>Login</title>
                <meta name="description" content="Login page" />
            </Helmet>
            <div className="container">
               <div className="login-form">
                  <div className="form-group text-right">
                    <Link to="/register"> Click here to Register</Link>
                  </div>
                  <Form onValidSubmit={this.submit} noValidate>
                    <Input name="email" label="Email"  validations="isEmail" validationError="Email is not valid" required/>
                    <Input name="password" type="password" label="password" onChange={this.changeHandler} validations={{minLength: 8}} validationErrors={{minLength: 'Password must have 8 characters'}} required/>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary app-btn">LogIn</button>
                    </div>
                  </Form>
              </div>
           </div>
       </div>
    );
  }
}

export default Login;
