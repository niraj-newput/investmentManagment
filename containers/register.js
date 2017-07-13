import React from 'react';
import { Link } from 'react-router-dom';
import {Form, Input, File, Select} from 'formsy-react-components';
import { dbConfig } from '../services/pouchdb-service.js';

export default class RegisterUser extends React.Component {
  
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  
  submit(model){
    var _this = this;
    dbConfig.findByEmail(model.email).then(function(doc) {
        console.log(doc.length > 0);
      if(doc.length > 0) {
        alert('User already registered');
    } else {
        var doc = {
          _id: model.email,
          obj: model
        }
        dbConfig.putData(doc).then(function(response) {
          alert('Registered Successfully');
        });
    }
    }).catch(function(err) {
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="row">
            <div className="col-xs-12">
              <div className="form-group text-right">
                <Link to="/login">Back To LogIn</Link>
              </div>
              <Form  onValidSubmit={this.submit} noValidate>
                <div className="form-group">
                  <Input name="email" label="Email address" validations="isEmail" placeholder="Email" value="" required/>
                </div>
                <div className="form-group">
                  <Input name="password" type="password" label="Password" validations="minLength:8" validationErrors={{minLength:'Password must have 8 characters'}} placeholder="Password" required/>
                </div>
                <div className="form-group">
                  <Input name="c_password" type="password" label="Confirm Password" validations="equalsField:password" validationError="Password does not match"  placeholder="Confirm Password"/>
                </div>
                <div className="form-group">
                  <Input name="phone" label="Phone No." validations="isNumeric,isLength:10" validationErrors={{isNumeric:"Enter only digit", isLength:"Phone No. should be 10 digit"}}type="text" className="form-control" id="phone" placeholder="Phone No" required/>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary pull-right">Registration</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}