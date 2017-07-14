import React from 'react';
import { Link } from 'react-router-dom';
import {Form, Input, File} from 'formsy-react-components';
import {FormGroup, FormControl,Button} from 'react-bootstrap';
import Formsy from "formsy-react";


import {DeclearedModal} from "../components/decleared-modal.js";
import { QuaterlyModal } from "../components/quaterly-modal.js";
import "../assets/scss/invest-form.scss";

export default class InvestmentForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.inputHandler = this.inputHandler.bind(this);
    this.declearedModal = this.declearedModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.declearUpdate = this.declearUpdate.bind(this);
    this.qOneModal = this.qOneModal.bind(this);
    this.qTwoModal = this.qTwoModal.bind(this);
    this.qThreeModal = this.qThreeModal.bind(this);
    this.qFourModal = this.qFourModal.bind(this);
    this.quaterlyData = this.quaterlyData.bind(this);
    this.state = {
      declearedModal: false,
    }
  }
  
  inputHandler() {
    console.log('handler');
  }
  
  closeModal() {
    this.setState({
      declearedModal: false,
      qOne: false,
      qTwo: false,
      qThree: false,
      qFour: false
    });
  }
  
  declearedModal() {
    this.setState({
      declearedModal: true
    });
  }
  qOneModal() {
    this.setState({
      qOne: true
    });
  }
  
  qTwoModal() {
    this.setState({
      qTwo: true
    });
  }
  
  qThreeModal() {
    this.setState({
      qThree: true
    });
  }
  
  qFourModal() {
    this.setState({
      qFour: true
    });
  }
  
  declearUpdate(model) {
    this.setState({
      declearedInfo: model
    });
    this.closeModal();
  }
  
  quaterlyData(model, quaterno) {
    console.log('quater data');
    console.log(model);
    
    if(quaterno == 'q1') {
      console.log(quaterno);
      this.setState({
        q1: model
      });
    }else if(quaterno == 'q2') {
      console.log(quaterno);
      this.setState({
        q2: model
      });
    }else if (quaterno == 'q3') {
      console.log(quaterno);
      this.setState({
        q3: model
      });
    }else if (quaterno == 'q4') {
      console.log(quaterno);
      this.setState({
        q4: model
      });
    }
    this.closeModal();
    console.log(this.state);
  }
  
  submit() {
    console.log('submit');
  }
  render() {
    return (
      <Form onValidSubmit={this.submit}>
      <div className="container parent-container">
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
                <span onClick={this.declearedModal}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                <DeclearedModal open={this.state.declearedModal} modalClose={this.closeModal} update={this.declearUpdate}/>
              </div>
              <div className="col-md-8">
                <div className="border-bottom row text-center">Actual Investment made</div>
                <div className="col-md-2 border-right">
                  <span>Apr-June</span>
                  <span onClick={this.qOneModal}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                  <QuaterlyModal open={this.state.qOne} modalClose={this.closeModal} update={this.quaterlyData} quaterNo={'q1'}/>
                </div>
                <div className="col-md-2 border-right">
                  <span>Jul-Sept</span>
                  <span onClick={this.qTwoModal}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                  <QuaterlyModal open={this.state.qTwo} modalClose={this.closeModal} update={this.quaterlyData} quaterNo={'q2'}/>
                </div>
                <div className="col-md-2 border-right">
                  <span>Oct-Dec</span>
                  <span onClick={this.qThreeModal}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                  <QuaterlyModal open={this.state.qThree} modalClose={this.closeModal} update={this.quaterlyData} quaterNo={'q3'}/>
                </div>
                <div className="col-md-2 border-right">
                  <span>Jan-Mar</span>
                  <span onClick={this.qFourModal}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                  <QuaterlyModal open={this.state.qFour} modalClose={this.closeModal} update={this.quaterlyData} quaterNo={'q4'}/>
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
                <span>
                  {this.state.declearedInfo? this.state.declearedInfo.hm_ln_dc:null }
                </span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q1 ? this.state.q1.hm_ln_q1 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q2 ? this.state.q2.hm_ln_q2 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q3 ? this.state.q3.hm_ln_q3 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q4 ? this.state.q4.hm_ln_q4 : null }
                  </span>
                </div>
                <div className="col-md-2">
                  <span>
                  
                  </span>
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
                      <span>
                        {this.state.declearedInfo? this.state.declearedInfo.med_dc: null } 
                      </span>
                  </div>
                  <div className="col-md-8">
                    <div className="col-md-2 border-right">
                      <span>
                        {this.state.q1 ? this.state.q1.med_q1 : null }
                      </span>
                    </div>
                    <div className="col-md-2 border-right">
                      <span>
                        {this.state.q2 ? this.state.q2.med_q2 : null }
                      </span>
                    </div>
                    <div className="col-md-2 border-right">
                      <span>
                        {this.state.q3 ? this.state.q3.med_q3 : null }
                      </span>
                    </div>
                    <div className="col-md-2 border-right">
                      <span>
                        {this.state.q4 ? this.state.q4.med_q4 : null }
                      </span>
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
              <span>
              </span>
              </div>
              <div className="col-md-2 border-right">
                <span>
                {this.state.declearedInfo? this.state.declearedInfo.lic_dc:null }
                </span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                    <span>
                      {this.state.q1 ? this.state.q1.lic_q1 : null }
                    </span>
                </div>
                <div className="col-md-2 border-right">
                    <span>
                    {this.state.q2 ? this.state.q2.lic_q2 : null }
                    </span>
                </div>
                <div className="col-md-2 border-right">
                    <span>
                      {this.state.q3 ? this.state.q3.lic_q3 : null }
                    </span>
                </div>
                <div className="col-md-2 border-right">
                    <span>
                      {this.state.q4 ? this.state.q4.lic_q4 : null }
                    </span>
                </div>
                <div className="col-md-2">
                    <span>
                      
                    </span>
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
              <span>
                
              </span>
              </div>
              <div className="col-md-2 border-right">
                <span>
                  {this.state.declearedInfo? this.state.declearedInfo.bank_dc:null } 
                </span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q1 ? this.state.q1.bank_q1 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q2 ? this.state.q2.bank_q2 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q3 ? this.state.q3.bank_q3 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q4 ? this.state.q4.bank_q4 : null }
                  </span>
                </div>
                <div className="col-md-2">
                  <span>
                  
                  </span>
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
                <span>
                  
                </span>
              </div>
              <div className="col-md-2 border-right">
                <span>
                  {this.state.declearedInfo? this.state.declearedInfo.ppf_dc:null } 
                </span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q1 ? this.state.q1.ppf_q1 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q2 ? this.state.q2.ppf_q2 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q3 ? this.state.q3.ppf_q3 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q4 ? this.state.q4.ppf_q4 : null }
                  </span>
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
                <span>
                  
                </span>
              </div>
              <div className="col-md-2 border-right">
                <span>
                  {this.state.declearedInfo? this.state.declearedInfo.mutual_fund_dc:null } 
                </span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q1 ? this.state.q1.mutual_fund_q1 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q2 ? this.state.q2.mutual_fund_q2 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q3 ? this.state.q3.mutual_fund_q3 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q4 ? this.state.q4.mutual_fund_q4 : null }
                  </span>
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
              <div className="col-md-2 border-right">
                <span>
                  
                </span>
              </div>
              <div className="col-md-2 border-right">
                <span>
                  {this.state.declearedInfo? this.state.declearedInfo.hm_ln_pr_dc:null }
                </span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q1 ? this.state.q1.hm_ln_pr_q1 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q2 ? this.state.q2.hm_ln_pr_q2 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q3 ? this.state.q3.hm_ln_pr_q3 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q4 ? this.state.q4.hm_ln_pr_q4 : null }
                  </span>
                </div>
                <div className="col-md-2">
                  <span>
                    
                  </span>
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
                <span>
                  
                </span>
              </div>
              <div className="col-md-2 border-right">
                <span>
                  {this.state.declearedInfo? this.state.declearedInfo.tf_child_dc:null }
                </span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q1 ? this.state.q1.tf_child_q1 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q2 ? this.state.q2.tf_child_q2 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q3 ? this.state.q3.tf_child_q3 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q4 ? this.state.q4.tf_child_q4 : null }
                  </span>
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
                <span>
                  {this.state.declearedInfo? this.state.declearedInfo.hos_in_meddc:null } 
                </span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q1 ? this.state.q1.hos_in_med_q1 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q2 ? this.state.q2.hos_in_med_q2 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q3 ? this.state.q3.hos_in_med_q3 : null }
                  </span>
                </div>
                <div className="col-md-2 border-right">
                  <span>
                    {this.state.q4 ? this.state.q4.hos_in_med_q4 : null }
                  </span>
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
                  <span>
                    {this.state.declearedInfo? this.state.declearedInfo.edu_ln_dc:null } 
                  </span>
              </div>
              <div className="col-md-8">
                <div className="col-md-2 border-right">
                    <span>
                      {this.state.q1 ? this.state.q1.edu_ln_q1 : null }
                    </span>
                </div>
                <div className="col-md-2 border-right">
                    <span>
                      {this.state.q2 ? this.state.q2.edu_ln_q2 : null }
                    </span>
                </div>
                <div className="col-md-2 border-right">
                    <span>
                      {this.state.q3 ? this.state.q3.edu_ln_q3 : null }
                    </span>
                </div>
                <div className="col-md-2 border-right">
                    <span>
                      {this.state.q4 ? this.state.q4.edu_ln_q4 : null }
                    </span>
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
        <div className="row">
        <div className="col-md-12"> 
          
        </div>
        </div>
      </div>
    
    </Form>
    );
  }
}