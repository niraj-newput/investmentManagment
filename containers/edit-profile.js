import React from 'react';
import Formsy from 'formsy-react';
import { Form, Input } from 'formsy-react-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { store } from '../store.js';

import { dbConfig } from '../services/pouchdb-service.js';
import { employeeDetail } from '../actions/employee-action.js';
import '../public/assets/scss/login-form.scss';
import "../public/assets/scss/invest-form.scss";

 class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      user: store.getState(),
      className: 'hidden',
      msg: ''
    };
  }

  componentWillMount() {
    var self = this;
    dbConfig.findByLoggedInUser(true).then(function(doc) {
      if(doc.docs.length > 0) {
        store.dispatch(employeeDetail(doc.docs[0]));
        self.setState({
          user: doc.docs[0].obj,
          password: store.getState().employee.employee.obj.password
        });
      } else {
        self.props.history.push('/login');
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  componentDidMount() {
    console.log('componentDidMount');
    var self = this;
    dbConfig.findByLoggedInUser(true).then(function(doc) {
      if(doc.docs.length > 0) {
        store.dispatch(employeeDetail(doc.docs[0]));
        self.setState({
          user: doc.docs[0].obj,
          password: store.getState().employee.employee.obj.password
        });
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  submit(model) {
    var self = this;
    var currentuser = store.getState().employee;
    currentuser.employee.obj['password'] = model.new_password;
    dbConfig.putData(currentuser.employee).then(function(response) {
      console.log(response);
      dbConfig.findByEmail(response.id).then(function(doc) {
        console.log(doc);
        store.dispatch(employeeDetail(doc.docs[0]));
      });
      self.setState({
        className: 'show',
        msg: 'Change password successfully!'
      });
      setTimeout(function() {
        self.setState({
          className: 'hidden',
          msg: ''
        });
      },1000);
    });
  }

  render() {
    return (
      <div className="container">
        <Helmet>
            <title>Edit Profile</title>
            <meta name="description" content="Edit Profile" />
        </Helmet>
        <div className="text-center form-group">
          <h3>WelCome {this.state.user ? this.state.user.user_name : ''} !</h3>

        </div>
        <div className="row">
          <div className="col-md-offset-3 col-md-6">
            <div className="text-center form-group">
              <strong>Change your password</strong>
            </div>
            <div>
              <Form onValidSubmit={this.submit} noValidate>
                <Input name="password" type="password" label="Current Password"
                  labelClassName={[{'col-sm-3': false}, 'col-sm-5']}
                  elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-5']}
                  validations={"equals:" + this.state.password}
                  validationError="current password does not match"
                  placeholder="Current Password" required
                />
                <Input name="new_password" type="password" label="New Password"
                  labelClassName={[{'col-sm-3': false}, 'col-sm-5']}
                  elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-5']}
                  validations={{minLength: 8}} validationErrors={{minLength: 'Password must have 8 characters'}}
                  placeholder="New Password" required
                />
                <Input name="c_new_password" type="password" label="Confirm New Password"
                    labelClassName={[{'col-sm-3': false}, 'col-sm-5']}
                    elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-5']}
                    validations="equalsField:new_password" validationError="Password does not match"
                    placeholder="Confirm New Password" required
                />
                <div className="text-center form-group">
                  <button type="submit" className="btn btn-primary app-btn">Save Changes</button>
                </div>
              </Form>
              <div className={this.state.className + " text-center error"}>
                <span className=" alert alert-success">{this.state.msg}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.employee,
  };
};
export  default connect(mapStateToProps)(EditProfile);
