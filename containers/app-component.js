import React from "react";

import  Login  from "./login.js";
import  RegisterUser  from "./register.js";
import { Header } from "../components/header.js";
import { Footer } from "../components/footer.js";

export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('app props');
    console.log(this.props);
    return (
      <div>
        <Header />
        <div className="view-container">
            {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}
