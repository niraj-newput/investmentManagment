import React from "react";
import  Login  from "./login.js";
import  RegisterUser  from "./register.js";
import { store } from "../store.js";
import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";
import {Helmet} from "react-helmet";

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
        <Helmet>
            <meta charSet="utf-8" />
            <title>My Title</title>
            <meta name="description" content="Helmet application" />
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
