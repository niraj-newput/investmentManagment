import React from 'react';
import { Link, Redirect ,hashHistory} from 'react-router-dom';
import Formsy from "formsy-react";
import { connect } from 'react-redux';
import { Form, Input } from 'formsy-react-components';
import { employeeDetail } from '../actions/employee-action.js';
import { dbConfig } from '../services/pouchdb-service.js'; 
import "../assets/scss/login-form.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
    this.submit  = this.submit.bind(this);
    this.state = {
      user: {}
    }
  }
  
  changeHandler(event) {
  }
  
  submit(user) {
      var parentInstance = this;
      dbConfig.getData(user.email).then(function(doc) {
        if(doc.obj.email == user.email && doc.obj.password == user.password ) {
          parentInstance.props.dispatch(employeeDetail(doc));
          parentInstance.props.history.push("/investment-form");
        } else {
          alert("Email or password do not match");
        }
      }).catch(function(err) {
        console.log(err);
      });
  }
  
  render() {
    return (
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
    );
  }
}

const mapStateToProps = (state) => {
    console.log(state);
  return {
    employee: state.employee
  };
};
export default connect(mapStateToProps)(Login);