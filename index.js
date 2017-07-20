import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import routes from "./routes.js";
import "./assets/scss/app.scss";

ReactDOM.render((
  <Router>
    {routes}
  </Router>
),document.getElementById('app'));
