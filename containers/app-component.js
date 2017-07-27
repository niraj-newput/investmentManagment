import React from "react";
import { withRouter } from 'react-router-dom';
import  Login  from "./login.js";
import  RegisterUser  from "./register.js";
import EditProfile from "./edit-profile.js";
import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";
import { connect } from 'react-redux';
import { dbConfig } from '../services/pouchdb-service.js';
import { removeUser } from '../actions/employee-action.js';
import {Helmet} from "react-helmet";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    var self = this;
    self.props.dispatch(removeUser());
    dbConfig.findByLoggedInUser(true).then(function(doc) {
        doc.docs[0].obj['loggedIn'] = false;

        dbConfig.putData(doc.docs[0]).then(function(response) {
          self.props.history.push('/login');
        });
    }).catch(function(err) {
    });
  }

  componentWillMount() {
    console.log('app');
    console.log(this.props.children);
      var self = this;
      dbConfig.findByLoggedInUser(true).then(function(doc) {
         if(doc.docs.length = 0) {
             self.props.history.push('/login');
         }
      }).catch(function(err) {
      });

  }
  render() {
    return (
      <div>
        <Helmet>
            <meta charSet="utf-8" />
            <title>React App</title>
            <meta name="description" content="App header" />
        </Helmet>
        <Header logout={this.logout}/>
        <div className="view-container">
            {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employee: state.employee
  };
};
export default withRouter(connect(mapStateToProps)(App));
