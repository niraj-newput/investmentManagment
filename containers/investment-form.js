import React from 'react';
import { Link } from 'react-router-dom';
import {Form, Input, File} from 'formsy-react-components';
import Formsy from "formsy-react";
import { store } from "../store.js"; 
import "../assets/scss/invest-form.scss";

export default class InvestmentForm extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="container form-container">
        <div className="row border-bottom">
          <h3 className="text-center">NEWPUT INFOTECH PVT LTD</h3>
          <h4 className="text-center">314 DM TOWER, 21/1 RACE COURSE ROAD, INDORE</h4>
          <h5 className="text-center">Investment Details For 2017-18</h5>
        </div>
        <div className="row border-bottom">
          <div className="col-md-4 border-right"><span>Name Of Employee</span></div>
          <div className="col-md-8 text-center">{store.getState().employee ? store.getState().employee.employee.obj.email : 'Dummy'}</div>
        </div>
        <div className="row border-bottom">
          <div className="col-md-4 border-right">
            <span>Type Of Excemption</span>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-2 border-right">
                <span>Maximum Excemption</span>
              </div>
              <div className="col-md-2 border-right">
                <span>Declared Investment</span>
              </div>
              <div className="col-md-8">
                <div className="border-bottom row text-center">Actual Investment made</div>
                <div className="col-md-2 border-right">
                  <span>Apr-June</span>
                </div>
                <div className="col-md-2 border-right">
                  <span>Jul-Sept</span>
                </div>
                <div className="col-md-2 border-right">
                  <span>Oct-Dec</span>
                </div>
                <div className="col-md-2 border-right">
                  <span>Jan-Mar</span>
                </div>
                <div className="col-md-2">
                  <span>Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row border-bottom">
          <div className="col-md-4 border-right">
            <b>Home Loan interest</b>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-2 border-right">
                <span>200000</span>
              </div>
              <div className="col-md-2 border-right">
                <span></span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row border-bottom">
            <div className="col-md-4 border-right">
                <b>Medical bills</b>
            </div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-2 border-right">
                        <span>15000</span>
                    </div>
                    <div className="col-md-2 border-right">
                        <span></span>
                    </div>
                    <div className="col-md-8">
                        <div className="col-md-2 border-right">
                            <span></span>
                        </div>
                        <div className="col-md-2 border-right">
                            <span></span>
                        </div>
                        <div className="col-md-2 border-right">
                            <span></span>
                        </div>
                        <div className="col-md-2 border-right">
                            <span></span>
                        </div>
                        <div className="col-md-2">
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row border-bottom">
            <div className="col-md-4 border-right">
                <b>Excemption 80 C</b>
            </div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-2 border-right">
                        <span>150000</span>
                    </div>
                    <div className="col-md-2 border-right">
                        <span></span>
                    </div>
                    <div className="col-md-8">
                        <div className="col-md-2 border-right">
                            <span></span>
                        </div>
                        <div className="col-md-2 border-right">
                            <span></span>
                        </div>
                        <div className="col-md-2 border-right">
                            <span></span>
                        </div>
                        <div className="col-md-2 border-right">
                            <span></span>
                        </div>
                        <div className="col-md-2">
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row border-bottom">
            <div className="col-md-4 border-right">
                <span>LIC</span>
            </div>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-md-2 border-right">
                    </div>
                    <div className="col-md-2 border-right">
                        <span></span>
                    </div>
                    <div className="col-md-8">
                        <div className="col-md-2 border-right">
                            <span></span>
                        </div>
                        <div className="col-md-2 border-right">
                            <span></span>
                        </div>
                        <div className="col-md-2 border-right">
                            <span></span>
                        </div>
                        <div className="col-md-2 border-right">
                            <span></span>
                        </div>
                        <div className="col-md-2">
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row border-bottom">
          <div className="col-md-4 border-right">
            <span>Bank Deposits</span>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-2 border-right">
              </div>
              <div className="col-md-2 border-right">
                <span></span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row border-bottom">
          <div className="col-md-4 border-right">
              <span>Public Provident Fund</span>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-2 border-right">
                <span></span>
              </div>
              <div className="col-md-2 border-right">
                <span></span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row border-bottom">
          <div className="col-md-4 border-right">
            <span>Mutual Funds</span>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-2 border-right">
              </div>
              <div className="col-md-2 border-right">
                <span></span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row border-bottom">
          <div className="col-md-4 border-right">
            <span>Home Loan Principal</span>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-2 border-right"></div>
              <div className="col-md-2 border-right">
                <span></span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row border-bottom">
          <div className="col-md-4 border-right">
            <span>Tution Fee For children</span>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-2 border-right">
              </div>
              <div className="col-md-2 border-right">
                <span></span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row border-bottom">
          <div className="col-md-4 border-right">
            <b>Hospitalization insurance Mediclaim 80 D</b>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-2 border-right">
                <span>25000</span>
              </div>
              <div className="col-md-2 border-right">
                <span></span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2 border-right">
                  <span></span>
                </div>
                <div className="col-md-2">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row border-bottom">
          <div className="col-md-4 border-right">
            <b>Education Loan Interest 80 E</b>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-2 border-right">
                  <span>No Limit</span>
              </div>
              <div className="col-md-2 border-right">
                  <span></span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                    <span></span>
                </div>
                <div className="col-md-2 border-right">
                    <span></span>
                </div>
                <div className="col-md-2 border-right">
                    <span></span>
                </div>
                <div className="col-md-2 border-right">
                    <span></span>
                </div>
                <div className="col-md-2">
                    <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 border-right">Checked by Accounts Name & date</div>
          <div className="col-md-8"></div>
        </div>
      </div>
    );
  }
}