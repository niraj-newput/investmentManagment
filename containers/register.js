import React from 'react';
import { Link } from 'react-router-dom';
import {Form, Input, File, Select} from 'formsy-react-components';
import { dbConfig } from '../services/pouchdb-service.js';

export default class RegisterUser extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      className :'hidden',
      msg : '',
      msgClass: ''
    };
  }

  changeHandler() {
    this.setState({
      className: 'hidden',
      msg: ''
    });
  }

  submit(model){
    var self = this;
    dbConfig.findByEmail(model.email).then(function(doc) {
      if(doc.docs.length > 0) {
        self.setState({
          className: 'show',
          msg: 'User already registered',
          msgClass: 'alert-danger'
        });
    } else {
        model['loggedIn'] = true;
        var doc = {
          _id: model.email,
          obj: model
        }
        dbConfig.putData(doc).then(function(response) {
          self.setState({
            className: 'show ',
            msg: 'Registered Successfully',
            msgClass: 'alert-success'
          });
          setTimeout(function(){
          self.props.history.push('/investment-form');
          }, 1000);
        }).catch(function(err) {
          console.log(err);
        });
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="container register-container">
        <div className="form-group text-right">
          <Link to="/login">Back To LogIn</Link>
        </div>
        <Form  onValidSubmit={this.submit} noValidate>
          <div className="form-group">
            <Input name="email" label="Email address" onChange={this.changeHandler} validations="isEmail" placeholder="Email" value="" required/>
          </div>
          <div className="form-group">
            <Input name="password" type="password" onChange={this.changeHandler} label="Password" validations="minLength:8" validationErrors={{minLength:'Password must have 8 characters'}} placeholder="Password" required/>
          </div>
          <div className="form-group">
            <Input name="c_password" type="password" label="Confirm Password" validations="equalsField:password" validationError="Password does not match"  placeholder="Confirm Password" required/>
          </div>
          <div className="form-group">
            <Input name="user_name" label="Full Name" validations="isWords" validationErrors={{isAlpha:'Enter only Characters'}} type="text" className="form-control" id="user_name" placeholder="Full Name" required/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary pull-right">Register</button>
          </div>
          <div className={this.state.className + " form-group text-center"}>
            <span className={this.state.msgClass + " alert"}>{this.state.msg}</span>
          </div>
        </Form>
      </div>
    );
  }
}
