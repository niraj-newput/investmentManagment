import React from 'react';
import { Link, Redirect ,hashHistory} from 'react-router-dom';
import Formsy from "formsy-react";
import { Form, Input } from 'formsy-react-components';


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
    this.props.history.push("/investment-form");;
  }
  
  render() {
    return (
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="row">
            <div className="col-xs-12">
              <div className="form-group text-right">
                <Link to="/register"> Click To Register</Link>
              </div>
              <Form onValidSubmit={this.submit} noValidate>
                <Input name="email" label="Email"  validations="isEmail" validationError="Email is not valid" required/>
                <Input name="password" type="password" label="password" onChange={this.changeHandler} validations={{minLength: 8}} validationErrors={{minLength: 'Password must have 8 characters'}} required/>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary pull-right">LogIn</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;