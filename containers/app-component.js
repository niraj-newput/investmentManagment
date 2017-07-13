import React from "react";
import  Login  from "./login.js";
import  RegisterUser  from "./register.js";
import { store } from "../store.js";
import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  
  logout() {
      store.getState().employee = null;
  }
  render() {
    return (
      <div>
        <Header logout={this.logout}/>
        <div className="view-container">
            {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}
