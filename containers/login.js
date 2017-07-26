import React from 'react';
import Formsy from 'formsy-react';
import { Link, Redirect ,hashHistory} from 'react-router-dom';
import { Form, Input } from 'formsy-react-components';
import {Helmet} from 'react-helmet';

import { employeeDetail } from '../actions/employee-action.js';
import { dbConfig } from '../services/pouchdb-service.js';
import {store} from '../store.js';
import '../public/assets/scss/login-form.scss';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submit  = this.submit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      className :'hidden',
      msg : ''
    };
  }

  changeHandler() {
    this.setState({
      className: 'hidden',
      msg: ''
    });
  }

  submit(user) {
    var self = this;
    dbConfig.getData(user.email).then(function(doc) {
      if(doc.obj.email == user.email && doc.obj.password == user.password ) {
        doc.obj['loggedIn'] = true;
        dbConfig.putData(doc).then(function(response) {
          store.dispatch(employeeDetail(doc));
          self.props.history.push("/investment-form");
          // self.props.history.push({pathname: "/investment-form", query: {obj: user}, search : '?email=' + user.email + '&pwd=' + user.password});
        });
      } else {
        self.setState({
          className: "show",
          msg: "Invalid email or password"
        });
      }
    }).catch(function(err) {
      self.setState({
        className: "show",
        msg: "Not authorised User! Please Registered First."
      });
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
              <Input name="email" label="Email"  onChange={this.changeHandler} validations="isEmail" validationError="Email is not valid" required/>
              <Input name="password" type="password" onChange={this.changeHandler } label="Password"  validations={{minLength: 8}} validationErrors={{minLength: 'Password must have 8 characters'}} required/>
              <div className="text-center">
                <button type="submit" className="btn btn-primary app-btn">LogIn</button>
              </div>
              <div className={this.state.className + " text-center form-group error"}>
                <span className=" alert alert-danger">{this.state.msg}</span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
