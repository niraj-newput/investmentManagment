import React from 'react';
import { Link } from 'react-router-dom';
import {store} from  '../store.js';
export const Header = ((props) => {
  return (
    <nav className="navbar navbar-default" id="header">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand"><img className="brand-img" src="../assets/images/company_logo.png" alt="brand"/></a>
          <span className="navbar-brand">Investment Management</span>
       </div>
       <div className="collapse navbar-collapse" id="app-navbar-collapse">
           {store.getState().employee?
               <ul className="nav navbar-nav navbar-right">
                 <li><a>{store.getState().employee.employee.obj.user_name}</a></li>
                 <li><a onClick={() => props.logout()}><span className="glyphicon glyphicon-log-out"></span>LogOut</a></li>
               </ul> : null}
       </div>
     </div>
   </nav>
  );
});
