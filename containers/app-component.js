import React from "react";
import  Login  from "./login.js";
import  RegisterUser  from "./register.js";
import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";
import { connect } from 'react-redux';
import { employeeDetail, removeUser } from '../actions/employee-action.js';
import {Helmet} from "react-helmet";
import localForage from "localforage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  
  logout() {
      this.props.dispatch(removeUser());
      localForage.removeItem('user');
      location.reload();
  }
  
  componentDidMount() {
      var self = this;
      localForage.getItem('user').then(function(value){
          if(value) {
             self.props.dispatch(employeeDetail(value)); 
          }
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
        <Header logout={this.logout} employee={this.props.employee}/>
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
export default connect(mapStateToProps)(App);