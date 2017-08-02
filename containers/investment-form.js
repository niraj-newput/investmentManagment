import React from 'react';
import Formsy from 'formsy-react';
import {Form, Input, Select} from 'formsy-react-components';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';

import CSSModules from 'react-css-modules';
import moment from 'moment';
import { store } from '../store.js';
import { DeclearedModal } from '../components/decleared-modal.js';
import { employeeDetail } from '../actions/employee-action.js';
import { QuaterlyModal, name } from '../components/quaterly-modal.js';
import { dbConfig } from '../services/pouchdb-service.js';

import "../public/assets/scss/invest-form.scss";

export default class InvestmentForm extends React.Component {

  constructor(props) {
    super(props);
    this.declearedModal = this.declearedModal.bind(this);
    this.attachmentModal = this.attachmentModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.declearData = this.declearData.bind(this);
    this.quaterlyModalOpen = this.quaterlyModalOpen.bind(this);
    this.quaterlyData = this.quaterlyData.bind(this);
    this.deleteAttachment = this.deleteAttachment.bind(this);
    this.loadUserData = this.loadUserData.bind(this);
    this.showOptions = this.showOptions.bind(this);
    this.selectYear = this.selectYear.bind(this);

    var currentYear = new Date().getFullYear();
    var currentFi = (currentYear + '-' + (currentYear + 1)) ;
    this.state = {
      declearedModal: false,
      msg: 'hidden',
      financialYear: currentFi
    }
  }

  componentDidMount() {
    var self = this;
    dbConfig.findByLoggedInUser(true).then(function(doc) {
      if(doc.docs.length > 0) {
        store.dispatch(employeeDetail(doc.docs[0]));
        self.loadUserData(doc.docs[0]);
      } else {
        self.props.history.push('/login');
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  showOptions() {
    var arr = [];
    var currentYear = new Date().getFullYear();
    arr.push(<option key={Math.random()} value={((currentYear - 1)  + '-') + currentYear} selected={this.state.financialYear == (((currentYear - 1)  + '-') + currentYear) }>{((currentYear - 1)  + '-') + currentYear}</option>);
    arr.push(<option key={Math.random()} value={(currentYear + '-' )   + (currentYear + 1)} selected={this.state.financialYear == ((currentYear + '-' )   + (currentYear + 1))}>{(currentYear + '-' )   + (currentYear + 1)}</option>);
    return (arr)
  }

  selectYear(event) {
    var value = event.target.value;
    this.setState({
      financialYear: value
    });
    this.componentDidMount();
  }

  fileRead(id, file, rev) {
    return new Promise(function(resolve, reject) {
      var fileObj = {};
      fileObj['name'] = file;
      dbConfig.getAttachment(id, file, rev).then(function(blob) {
        fileObj['url'] = URL.createObjectURL(blob);
        fileObj['type'] = blob.type;
        resolve(fileObj);
      });
    });
  }

  totalQuaterlyAmount(qObj, totalInfo) {
    var keys = ["hm_ln", "med", "lic", "bank", "ppf", "mutual_fund", "hm_ln_pr", "tf_child", "hos_in_med", "edu_ln"];
    for (var i = 0; i < keys.length; i++) {
      totalInfo[keys[i]] = totalInfo[keys[i]] + parseFloat(qObj[keys[i]]);
    }
    return totalInfo;
  }

  loadUserData(value) {
    var self = this;
    dbConfig.getData(value.obj.email).then(function(doc) {
      var totalInfo = {hm_ln: 0, med: 0, lic: 0, bank: 0, ppf: 0, mutual_fund: 0, hm_ln_pr: 0, tf_child: 0, hos_in_med: 0, edu_ln: 0};
      if(doc.year) {
        if(doc.year[self.state.financialYear]) {
          if(doc.year[self.state.financialYear].q1) {
            totalInfo = self.totalQuaterlyAmount(doc.year[self.state.financialYear].q1, totalInfo);
          } if(doc.year[self.state.financialYear].q2) {
            totalInfo = self.totalQuaterlyAmount(doc.year[self.state.financialYear].q2, totalInfo);
          } if(doc.year[self.state.financialYear].q3) {
            totalInfo = self.totalQuaterlyAmount(doc.year[self.state.financialYear].q3, totalInfo);
          } if(doc.year[self.state.financialYear].q4) {
            totalInfo = self.totalQuaterlyAmount(doc.year[self.state.financialYear].q4, totalInfo);
          }
        }
      }


      var q1Attachments = [], q2Attachments = [], q3Attachments = [], q4Attachments = [] ;
       if(doc._attachments) {
         var promises = [];
         var attachments = Object.keys(doc._attachments);

         for(var i = 0; i < attachments.length; i++) {
           var file = attachments[i];
           if(file.indexOf(self.state.financialYear) != -1) {
             promises.push(self.fileRead(doc._id, file, doc._rev));
           }
         }
         Promise.all(promises).then(function(value) {
          for(var i = 0; i < value.length; i++) {
            var file = value[i];

            if(file.name.indexOf('q1') != -1) {
                 q1Attachments.push({name: file.name, url: file.url, type: file.type });
             } else if(file.name.indexOf('q2') != -1 ) {
                 q2Attachments.push({name: file.name, url: file.url, type: file.type});
             } else if(file.name.indexOf('q3') != -1 ) {
                 q3Attachments.push({name: file.name, url: file.url, type: file.type });
             } else if(file.name.indexOf('q4') != -1) {
                 q4Attachments.push({name: file.name, url: file.url, type: file.type });
             }
          }
        });
      }else {
          q1Attachments = null,
          q2Attachments = null,
          q3Attachments = null,
          q4Attachments = null
        }
      self.setState({
        user: doc,
        declearedInfo: doc.year && doc.year[self.state.financialYear] ? doc.year[self.state.financialYear].declareData : null,
        q1: doc.year && doc.year[self.state.financialYear] ? doc.year[self.state.financialYear].q1 : null,
        q2: doc.year && doc.year[self.state.financialYear] ? doc.year[self.state.financialYear].q2 : null,
        q3: doc.year && doc.year[self.state.financialYear] ? doc.year[self.state.financialYear].q3 : null,
        q4: doc.year && doc.year[self.state.financialYear] ? doc.year[self.state.financialYear].q4 : null,
        totalBlockData : totalInfo,
        q1Attachments: q1Attachments,
        q2Attachments: q2Attachments,
        q3Attachments: q3Attachments,
        q4Attachments: q4Attachments
      });
   });
  }

  closeModal() {
    this.setState({
      declearedModal: false,
      qOne: false,
      qTwo: false,
      qThree: false,
      qFour: false,
      attachmentModalQ1: false,
      attachmentModalQ2: false,
      attachmentModalQ3: false,
      attachmentModalQ4: false
    });
  }

  declearedModal() {
    this.setState({
      declearedModal: true
    });
  }

  attachmentModal(modalNo) {
    switch(modalNo) {
      case 'q1':
        this.setState({
          attachmentModalQ1: true
        });
        break;
      case 'q2':
        this.setState({
          attachmentModalQ2: true
        });
        break;
      case 'q3':
        this.setState({
          attachmentModalQ3: true
        });
        break;
      case 'q4':
        this.setState({
          attachmentModalQ4: true
        });
        break;
    }
  }

  quaterlyModalOpen(quaterno) {
    switch(quaterno) {
      case 'q1':
        this.setState({
          qOne: true
        });
        break;
      case 'q2':
        this.setState({
          qTwo: true
        });
        break;
      case 'q3':
        this.setState({
          qThree: true
        });
        break;
      case 'q4':
        this.setState({
          qFour: true
        });
        break;
    }
  }

  declearData(model) {
    var self = this;
    var user = store.getState().employee.employee;
    if(!user.year) {
     let year = {
          [self.state.financialYear]: {
            'declareData' : model
          }
      }
      user['year'] = year;
    }else {
      user['year'][this.state.financialYear] = {'declareData' : model};
    }
    // this.state.user['declareData'] = model;
    dbConfig.putData(user).then(function(result) {
    });
    this.closeModal();
    this.componentDidMount();
  }

  fileLoad(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      var tempAtta = {};
      tempAtta['name'] = file.name;
      tempAtta['content_type'] = file.type;
      reader.onload = function() {
        var data = reader.result.split(',')[1];
        tempAtta['data'] = data;
        resolve(  tempAtta);
      }
      reader.readAsDataURL(file);
    });

  }

  prepareModel(model) {
    Object.keys(model).filter(key => key != 'file').map(function(key) {
      if(model[key] == '') {
        model[key] = "0";
      }
    });
    return model;
  }

  quaterlyData(model, quaterno) {
    var self = this;
    var promises = [];
    model = self.prepareModel(model);
    self.state.user.year[this.state.financialYear][quaterno] = model;
    //self.state.user.year[quaterno] = model;
    if(model.file ) {
      for(var i = 0; i < model.file.length; i++) {
        var a = this.fileLoad(model.file[i]);
        promises.push(a);
      }

      Promise.all(promises).then(function(value) {
        var attachmentObj = {};
        if(  self.state.user._attachments) {
          for(var i = 0; i < value.length; i++) {
            self.state.user._attachments[self.state.financialYear + '.' + quaterno + '.' + value[i]['name']] = value[i];
          }
        }else {
          for(var i = 0; i < value.length; i++) {
            attachmentObj[self.state.financialYear + '.' + quaterno + '.' +value[i]['name']] = value[i];
          }
          self.state.user['_attachments'] = attachmentObj;
        }
        self.putQuaterlyData();

      });
    }else {
      self.putQuaterlyData();
    }
  }

  putQuaterlyData() {
    var self = this;
    dbConfig.putData(self.state.user).then(function(result) {
      self.setState({
        msg: 'show'
      });
      setTimeout(function(){  self.closeModal();
        self.setState({
          msg: 'hidden'
        });
       }, 2000);
      self.componentDidMount();
    });
  }

  deleteAttachment(fileName) {
    var self = this;
    dbConfig.getData(self.state.user.obj.email).then(function(doc) {
      dbConfig.deleteAttachment(doc._id, fileName, doc._rev).then(function (result) {
        self.componentDidMount();
      }).catch(function (error) {
          console.log(error);
      });
    });
  }

  render() {
    return (
      <div>
        <Helmet>
            <title>Investment Form</title>
            <meta name="description" content="Investment form" />
        </Helmet>
        <div className="container parent-container">
          <div className="row border-bottom">
            <h3 className="text-center">NEWPUT INFOTECH PVT LTD</h3>
            <h4 className="text-center">314 DM TOWER, 21/1 RACE COURSE ROAD, INDORE</h4>
            <h5 className="text-center">Investment Details For : &nbsp;

              <select name="year" onChange = {this.selectYear} className="input-sm">
                {this.showOptions()}
              </select>
            </h5>
          </div>
          <div className="row border-bottom">
            <div className="col-md-3 border-right cell"><span>Name Of Employee</span></div>
            <div className="col-md-9 text-center cell">{store.getState().employee && store.getState().employee.employee ? store.getState().employee.employee.obj.user_name : 'Dummy'}</div>
          </div>
          <div className="row border-bottom">
            <div className="col-md-3 cell"></div>
            <div className="col-md-9 text-center cell">Actual Investment made</div>
          </div>
          <div className="row border-bottom">
            <div className="col-md-3 border-right cell">
              <span>Type Of Exemption</span>
            </div>
            <div className="col-md-2 border-right cell">
              <span>Maximum Exemption</span>
            </div>
            <div className="col-md-2 border-right cell">
              <span>Declared Investment</span>
              <span onClick={this.declearedModal}> <i className="fa fa-pencil-square-o hover" aria-hidden="true"></i></span>
              <DeclearedModal open={this.state.declearedModal} modalClose={this.closeModal} update={this.declearData} declareObj={this.state.declearedInfo}/>
            </div>
            <div className="col-md-1 border-right cell">
              <span onClick={()=> this.quaterlyModalOpen('q1')}>Apr-June <i className="fa fa-pencil-square-o hover" aria-hidden="true"></i></span>
              <QuaterlyModal open={this.state.qOne} modalClose={this.closeModal} update={this.quaterlyData} quaterNo={'q1'} quaterName="Apr-June" qObj={this.state.q1} files={this.state.q1Attachments ? this.state.q1Attachments : null} deleteFile={this.deleteAttachment} msg={this.state.msg} year={this.state.financialYear}/>
            </div>
            <div className="col-md-1 border-right cell">
               <span>Jul-Sept</span>
               <span onClick={()=> this.quaterlyModalOpen('q2')}> <i className="fa fa-pencil-square-o hover" aria-hidden="true"></i></span>
               <QuaterlyModal open={this.state.qTwo} modalClose={this.closeModal} update={this.quaterlyData} quaterNo={'q2'} quaterName="Jul-Sept" qObj={this.state.q2} files={this.state.q2Attachments ? this.state.q2Attachments : null} deleteFile={this.deleteAttachment} msg={this.state.msg} year={this.state.financialYear}/>
            </div>
            <div className="col-md-1 border-right cell">
              <span>Oct-Dec</span>
              <span onClick={()=> this.quaterlyModalOpen('q3')}> <i className="fa fa-pencil-square-o hover" aria-hidden="true"></i></span>
              <QuaterlyModal open={this.state.qThree} modalClose={this.closeModal} update={this.quaterlyData} quaterNo={'q3'} quaterName="Oct-Dec" qObj={this.state.q3} files={this.state.q3Attachments ? this.state.q3Attachments : null} deleteFile={this.deleteAttachment} msg={this.state.msg} year={this.state.financialYear}/>
            </div>
            <div className="col-md-1 border-right cell">
              <span onClick={()=> this.quaterlyModalOpen('q4')}> Jan-Mar <i className="fa fa-pencil-square-o hover" aria-hidden="true"></i></span>
              <QuaterlyModal open={this.state.qFour} modalClose={this.closeModal} update={this.quaterlyData} quaterNo={'q4'} quaterName="Jan-Mar" qObj={this.state.q4} files={this.state.q4Attachments ? this.state.q4Attachments : null} deleteFile={this.deleteAttachment} msg={this.state.msg} year={this.state.financialYear}/>
            </div>
            <div className="col-md-1 cell">
              <span>Total</span>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="col-md-3 border-right cell"><b>Home Loan interest</b></div>
            <div className="col-md-2 border-right cell"><span>{new Number(200000).toLocaleString('en-IN')}</span></div>
            <div className="col-md-2 border-right cell"><span>{this.state.declearedInfo? this.state.declearedInfo.hm_ln:null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q1 && this.state.q1.hm_ln != "0") ? this.state.q1.hm_ln : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q2 && this.state.q2.hm_ln != "0") ? this.state.q2.hm_ln : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q3 && this.state.q3.hm_ln != "0") ? this.state.q3.hm_ln : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q4 && this.state.q4.hm_ln != "0") ? this.state.q4.hm_ln : null }</span></div>
            <div className="col-md-1 cell">{this.state.totalBlockData && this.state.totalBlockData.hm_ln != 0 ? new Number(parseFloat(this.state.totalBlockData.hm_ln)).toLocaleString('en-IN') : null }</div>
          </div>
          <div className="row border-bottom">
              <div className="col-md-3 border-right cell"><b>Medical bills</b></div>
              <div className="col-md-2 border-right cell"><span>{new Number(15000).toLocaleString('en-IN')}</span></div>
              <div className="col-md-2 border-right cell"><span>{this.state.declearedInfo? this.state.declearedInfo.med: null } </span></div>
              <div className="col-md-1 border-right cell"><span>{(this.state.q1 && this.state.q1.med != "0") ? this.state.q1.med : null }</span></div>
              <div className="col-md-1 border-right cell"><span>{(this.state.q2 && this.state.q2.med != "0") ? this.state.q2.med : null }</span></div>
              <div className="col-md-1 border-right cell"><span>{(this.state.q3 && this.state.q3.med != "0") ? this.state.q3.med : null }</span></div>
              <div className="col-md-1 border-right cell"><span>{(this.state.q4 && this.state.q4.med != "0") ? this.state.q4.med : null }</span></div>
              <div className="col-md-1 cell">{this.state.totalBlockData && this.state.totalBlockData.med != 0 ? new Number(parseFloat(this.state.totalBlockData.med)).toLocaleString('en-IN'): null }</div>
          </div>
          <div className="row border-bottom">
              <div className="col-md-3 border-right cell"><b>Exemption 80 C</b></div>
              <div className="col-md-2 border-right cell"><span>{new Number(150000).toLocaleString('en-IN')}</span></div>
              <div className="col-md-7 border-right cell"></div>
          </div>
          <div className="row border-bottom">
            <div className="col-md-3 border-right cell"><span>LIC</span></div>
            <div className="col-md-2 border-right cell"></div>
            <div className="col-md-2 border-right cell"><span>{this.state.declearedInfo? this.state.declearedInfo.lic:null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q1 && this.state.q1.lic != "0") ? this.state.q1.lic : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q2 && this.state.q2.lic != "0") ? this.state.q2.lic : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q3 && this.state.q3.lic != "0") ? this.state.q3.lic : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q4 && this.state.q4.lic != "0") ? this.state.q4.lic : null }</span></div>
            <div className="col-md-1 cell">{this.state.totalBlockData && this.state.totalBlockData.lic != 0 ? new Number(parseFloat(this.state.totalBlockData.lic )).toLocaleString('en-IN') : null }</div>
          </div>
          <div className="row border-bottom">
            <div className="col-md-3 border-right cell"><span>Bank Deposits</span></div>
            <div className="col-md-2 border-right cell"></div>
            <div className="col-md-2 border-right cell"><span>{this.state.declearedInfo? this.state.declearedInfo.bank:null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q1 && this.state.q1.bank != "0") ? this.state.q1.bank : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q2 && this.state.q2.bank != "0") ? this.state.q2.bank : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q3 && this.state.q3.bank != "0") ? this.state.q3.bank : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q4 && this.state.q4.bank != "0") ? this.state.q4.bank : null }</span></div>
            <div className="col-md-1 cell">{this.state.totalBlockData && this.state.totalBlockData.bank != 0 ? new Number(parseFloat(this.state.totalBlockData.bank)).toLocaleString('en-IN') : null }</div>
          </div>
          <div className="row border-bottom">
            <div className="col-md-3 border-right cell"><span>Public Provident Fund</span></div>
            <div className="col-md-2 border-right cell"></div>
            <div className="col-md-2 border-right cell"><span>{this.state.declearedInfo? this.state.declearedInfo.ppf:null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q1 && this.state.q1.ppf != "0") ? this.state.q1.ppf : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q2 && this.state.q2.ppf != "0") ? this.state.q2.ppf : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q3 && this.state.q3.ppf != "0") ? this.state.q3.ppf : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q4 && this.state.q4.ppf != "0") ? this.state.q4.ppf : null }</span></div>
            <div className="col-md-1 cell">{this.state.totalBlockData && this.state.totalBlockData.ppf != 0 ? new Number(parseFloat(this.state.totalBlockData.ppf)).toLocaleString('en-IN') : null }</div>
          </div>
          <div className="row border-bottom">
            <div className="col-md-3 border-right cell"><span>Mutual Funds</span></div>
            <div className="col-md-2 border-right cell"></div>
            <div className="col-md-2 border-right cell"><span>{this.state.declearedInfo? this.state.declearedInfo.mutual_fund:null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q1 && this.state.q1.mutual_fund != "0") ? this.state.q1.mutual_fund : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q2 && this.state.q2.mutual_fund != "0") ? this.state.q2.mutual_fund : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q3 && this.state.q3.mutual_fund != "0") ? this.state.q3.mutual_fund : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q4 && this.state.q4.mutual_fund != "0") ? this.state.q4.mutual_fund : null }</span></div>
            <div className="col-md-1 cell">{this.state.totalBlockData && this.state.totalBlockData.mutual_fund != 0 ? new Number(parseFloat(this.state.totalBlockData.mutual_fund)).toLocaleString('en-IN') : null }</div>
          </div>
          <div className="row border-bottom">
            <div className="col-md-3 border-right cell"><span>Home Loan Principal</span></div>
            <div className="col-md-2 border-right cell"></div>
            <div className="col-md-2 border-right cell"><span>{this.state.declearedInfo? this.state.declearedInfo.hm_ln_pr : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q1 && this.state.q1.hm_ln_pr != "0") ? this.state.q1.hm_ln_pr : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q2 && this.state.q2.hm_ln_pr != "0") ? this.state.q2.hm_ln_pr : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q3 && this.state.q3.hm_ln_pr != "0") ? this.state.q3.hm_ln_pr : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q4 && this.state.q4.hm_ln_pr != "0") ? this.state.q4.hm_ln_pr : null }</span></div>
            <div className="col-md-1 cell">{this.state.totalBlockData && this.state.totalBlockData.hm_ln_pr != 0 ? new Number(parseFloat(this.state.totalBlockData.hm_ln_pr)).toLocaleString('en-IN') : null }</div>
          </div>
          <div className="row border-bottom">
            <div className="col-md-3 border-right cell"><span>Tution Fee For children</span></div>
            <div className="col-md-2 border-right cell"></div>
            <div className="col-md-2 border-right cell"><span>{this.state.declearedInfo? this.state.declearedInfo.tf_child : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q1 && this.state.q1.tf_child != "0") ? this.state.q1.tf_child : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q2 && this.state.q2.tf_child != "0") ? this.state.q2.tf_child : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q3 && this.state.q3.tf_child != "0") ? this.state.q3.tf_child : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q4 && this.state.q4.tf_child != "0") ? this.state.q4.tf_child : null }</span></div>
            <div className="col-md-1 cell">{this.state.totalBlockData && this.state.totalBlockData.tf_child != 0 ? new Number(parseFloat(this.state.totalBlockData.tf_child)).toLocaleString('en-IN') : null }</div>
          </div>
          <div className="row border-bottom">
            <div className="col-md-3 border-right cell"><b>Hospitalization insurance Mediclaim 80 D</b></div>
            <div className="col-md-2 border-right cell"><span>{new Number(25000).toLocaleString('en-IN')}</span></div>
            <div className="col-md-2 border-right cell"><span>{this.state.declearedInfo? this.state.declearedInfo.hos_in_med:null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q1 && this.state.q1.hos_in_med != "0") ? this.state.q1.hos_in_med : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q2 && this.state.q2.hos_in_med != "0") ? this.state.q2.hos_in_med : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q3 && this.state.q3.hos_in_med != "0") ? this.state.q3.hos_in_med : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q4 && this.state.q4.hos_in_med != "0") ? this.state.q4.hos_in_med : null }</span></div>
            <div className="col-md-1 cell">{this.state.totalBlockData && this.state.totalBlockData.hos_in_med != 0 ? new Number(parseFloat(this.state.totalBlockData.hos_in_med)).toLocaleString('en-IN') : null }</div>
          </div>
          <div className="row border-bottom">
            <div className="col-md-3 border-right cell"><b>Education Loan Interest 80 E</b></div>
            <div className="col-md-2 border-right cell"><span>No Limit</span></div>
            <div className="col-md-2 border-right cell"><span>{this.state.declearedInfo? this.state.declearedInfo.edu_ln:null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q1 && this.state.q1.edu_ln != "0") ? this.state.q1.edu_ln : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q2 && this.state.q2.edu_ln != "0") ? this.state.q2.edu_ln : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q3 && this.state.q3.edu_ln != "0") ? this.state.q3.edu_ln : null }</span></div>
            <div className="col-md-1 border-right cell"><span>{(this.state.q4 && this.state.q4.edu_ln != "0") ? this.state.q4.edu_ln : null }</span></div>
            <div className="col-md-1 cell">{this.state.totalBlockData && this.state.totalBlockData.edu_ln != 0 ? new Number(parseFloat(this.state.totalBlockData.edu_ln)).toLocaleString('en-IN') : null }</div>
          </div>
        </div>
      </div>
    );
  }
}
