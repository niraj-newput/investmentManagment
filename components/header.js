import React from 'react';
import { Link } from 'react-router-dom';

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
         { props.employee ?
             <ul className="nav navbar-nav navbar-right">
               <li><a>{props.employee.employee.obj.user_name}</a></li>
               <li><Link to="/login" onClick={() => props.logout()}><span className="glyphicon glyphicon-log-out"></span>LogOut</Link></li>
             </ul> : null
         }
       </div>
     </div>
   </nav>
  );
});
