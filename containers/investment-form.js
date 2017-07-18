import React from 'react';
import { Link } from 'react-router-dom';
import {Form, Input, File} from 'formsy-react-components';
import {FormGroup, FormControl,Button} from 'react-bootstrap';
import Formsy from "formsy-react";
import {Helmet} from "react-helmet";
import {store} from "../store.js";
import {DeclearedModal} from "../components/decleared-modal.js";
import { employeeDetail } from '../actions/employee-action.js';
import {AttachmentModal} from "../components/attachment-modal.js";
import { QuaterlyModal } from "../components/quaterly-modal.js";
import { dbConfig } from '../services/pouchdb-service.js';
import localForage from "localforage";
import "../assets/scss/invest-form.scss";

export default class InvestmentForm extends React.Component {

  constructor(props) {
    super(props);
    this.declearedModal = this.declearedModal.bind(this);
    this.attachmentModal = this.attachmentModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.declearData = this.declearData.bind(this);
    this.qOneModal = this.qOneModal.bind(this);
    this.qTwoModal = this.qTwoModal.bind(this);
    this.qThreeModal = this.qThreeModal.bind(this);
    this.qFourModal = this.qFourModal.bind(this);
    this.quaterlyData = this.quaterlyData.bind(this);
    this.deleteAttachment = this.deleteAttachment.bind(this);
    this.loadUserData = this.loadUserData.bind(this);
    this.state = {
      declearedModal: false
    }
  }

  fileRead(id, file, rev) {
    return new Promise(function(resolve, reject) {
      var fileObj = {};
      fileObj['name'] = file;
      dbConfig.getAttachment(id, file, rev).then(function(blob) {
          var url =  URL.createObjectURL(blob);
          fileObj['url'] = url;
          fileObj['type'] = blob.type;
          resolve(fileObj);
        });
    });
  }

  componentDidMount() {
      var _this = this;
      localForage.getItem('user').then(function(value) {
        if(value) {
          _this.loadUserData(value);
          store.dispatch(employeeDetail(value));
        }else {
          _this.loadUserData(store.getState().employee.employee);
          localForage.setItem('user', store.getState().employee.employee);
        }
    });
  }

  loadUserData(value) {
    var _this = this;
    dbConfig.getData(value.obj.email).then(function(doc) {
     _this.setState({
       user: doc,
       declearedInfo: doc.declareData ? doc.declareData : null,
       q1: doc.q1 ? doc.q1 : null,
       q2: doc.q2 ? doc.q2 : null,
       q3: doc.q3 ? doc.q3 : null,
       q4: doc.q4 ? doc.q4 : null
     });
     var totalInfo = {};
     var keys;
     if(_this.state.q1) {
        keys = Object.keys(_this.state.q1);
        for (var i = 0; i < keys.length; i++) {
          if(_this.state.q1 && !_this.state.q2 && ! _this.state.q3) {
            totalInfo[keys[i]] = parseInt(_this.state.q1[keys[i]]);
          } else if(_this.state.q1 && _this.state.q2 && ! _this.state.q3) {
              totalInfo[keys[i]] = parseInt(_this.state.q1[keys[i]]) + parseInt(_this.state.q2[keys[i]]);
          } else if(_this.state.q1 && _this.state.q2 && _this.state.q3) {
              totalInfo[keys[i]] = parseInt(_this.state.q1[keys[i]]) + parseInt(_this.state.q2[keys[i]]) + parseInt(_this.state.q3[keys[i]]);
          } else if(_this.state.q1 && _this.state.q2 && _this.state.q3 && _this.state.q4) {
              totalInfo[keys[i]] = parseInt(_this.state.q1[keys[i]]) + parseInt(_this.state.q2[keys[i]]) + parseInt(_this.state.q3[keys[i]]) + parseInt(_this.state.q4[keys[i]]);
          }
        }
        _this.setState({totalBlockData: totalInfo});
     }
     if(doc._attachments) {
       var promises = [];
       var attachments = Object.keys(doc._attachments);
       var q1Attachments = [], q2Attachments = [], q3Attachments = [], q4Attachments = [] ;
       for(var i = 0; i < attachments.length; i++) {
         var file = attachments[i];
         promises.push(_this.fileRead(doc._id, file, doc._rev));
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
         _this.setState({
           q1Attachments: q1Attachments,
           q2Attachments: q2Attachments,
           q3Attachments: q3Attachments,
           q4Attachments: q4Attachments
         });
      });
    }
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

  declearData(model) {
    this.state.user['declareData'] = model;
    dbConfig.putData(this.state.user).then(function(result) {
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

  quaterlyData(model, quaterno) {
    var _this = this;
    var promises = [];
    for(var i = 0; i < model.file.length; i++) {
      var a = this.fileLoad(model.file[i]);
      promises.push(a);
    }
    _this.state.user[quaterno] = model;
    Promise.all(promises).then(function(value) {
      var attachmentObj = {};
      if(  _this.state.user._attachments) {
        for(var i = 0; i < value.length; i++) {
          _this.state.user._attachments[quaterno + '.' + value[i]['name']] = value[i];
        }

      }else {
        for(var i = 0; i < value.length; i++) {
          attachmentObj[quaterno + '.' +value[i]['name']] = value[i];
        }
        _this.state.user['_attachments'] = attachmentObj;
      }
      dbConfig.putData(_this.state.user).then(function(result) {
        _this.closeModal();
        _this.componentDidMount();
      });
    });
  }

  deleteAttachment(name) {
    var _this = this;
    dbConfig.getData(this.state.user.obj.email).then(function(doc) {
      dbConfig.deleteAttachment(doc._id, name, doc._rev).then(function (result) {
        _this.closeModal();
        _this.componentDidMount();
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
              <h5 className="text-center">Investment Details For 2017-18</h5>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3 border-right"><span>Name Of Employee</span></div>
              <div className="col-md-9 text-center">{store.getState().employee ? store.getState().employee.employee.obj.user_name : 'Dummy'}</div>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3"></div>
              <div className="col-md-9 text-center">Actual Investment made</div>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3 border-right">
                <span>Type Of Excemption</span>
              </div>
              <div className="col-md-2 border-right">
                <span>Maximum Excemption</span>
              </div>
              <div className="col-md-2 border-right">
                <span>Declared Investment</span>
                <span onClick={this.declearedModal}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                <DeclearedModal open={this.state.declearedModal} modalClose={this.closeModal} update={this.declearData} declareObj={this.state.declearedInfo}/>
              </div>
              <div className="col-md-1 border-right">
                <span onClick={this.qOneModal}>Apr-June <i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                <QuaterlyModal open={this.state.qOne} modalClose={this.closeModal} update={this.quaterlyData} quaterNo={'q1'} qObj={this.state.q1} files={this.state.q1Attachments ? this.state.q1Attachments : null} deleteFile={this.deleteAttachment}/>
              </div>
              <div className="col-md-1 border-right">
                 <span>Jul-Sept</span>
                 <span onClick={this.qTwoModal}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                 <QuaterlyModal open={this.state.qTwo} modalClose={this.closeModal} update={this.quaterlyData} quaterNo={'q2'} qObj={this.state.q2} files={this.state.q2Attachments ? this.state.q2Attachments : null} deleteFile={this.deleteAttachment}/>
              </div>
              <div className="col-md-1 border-right">
                <span>Oct-Dec</span>
                <span onClick={this.qThreeModal}> <i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                <QuaterlyModal open={this.state.qThree} modalClose={this.closeModal} update={this.quaterlyData} quaterNo={'q3'} qObj={this.state.q3} files={this.state.q3Attachments ? this.state.q3Attachments : null} deleteFile={this.deleteAttachment}/>
              </div>
              <div className="col-md-1 border-right">
                <span onClick={this.qFourModal}> Jan-Mar<i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                <QuaterlyModal open={this.state.qFour} modalClose={this.closeModal} update={this.quaterlyData} quaterNo={'q4'} qObj={this.state.q4} files={this.state.q4Attachments ? this.state.q4Attachments : null} deleteFile={this.deleteAttachment}/>
              </div>
              <div className="col-md-1">
                <span>Total</span>
              </div>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3 border-right"><b>Home Loan interest</b></div>
              <div className="col-md-2 border-right"><span>200000</span></div>
              <div className="col-md-2 border-right"><span>{this.state.declearedInfo? this.state.declearedInfo.hm_ln_dc:null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q1 ? this.state.q1.hm_ln : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q2 ? this.state.q2.hm_ln : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q3 ? this.state.q3.hm_ln : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q4 ? this.state.q4.hm_ln : null }</span></div>
              <div className="col-md-1">{this.state.totalBlockData ? this.state.totalBlockData.hm_ln : null }</div>
            </div>
            <div className="row border-bottom">
                <div className="col-md-3 border-right"><b>Medical bills</b></div>
                <div className="col-md-2 border-right"><span>15000</span></div>
                <div className="col-md-2 border-right"><span>{this.state.declearedInfo? this.state.declearedInfo.med_dc: null } </span></div>
                <div className="col-md-1 border-right"><span>{this.state.q1 ? this.state.q1.med : null }</span></div>
                <div className="col-md-1 border-right"><span>{this.state.q2 ? this.state.q2.med : null }</span></div>
                <div className="col-md-1 border-right"><span>{this.state.q3 ? this.state.q3.med : null }</span></div>
                <div className="col-md-1 border-right"><span>{this.state.q4 ? this.state.q4.med : null }</span></div>
                <div className="col-md-1">{this.state.totalBlockData ? this.state.totalBlockData.med : null }</div>
            </div>
            <div className="row border-bottom">
                <div className="col-md-3 border-right"><b>Excemption 80 C</b></div>
                <div className="col-md-2 border-right"><span>150000</span></div>
                <div className="col-md-2 border-right"></div>
                <div className="col-md-1 border-right"></div>
                <div className="col-md-1 border-right"></div>
                <div className="col-md-1 border-right"></div>
                <div className="col-md-1 border-right"></div>
                <div className="col-md-1"></div>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3 border-right"><span>LIC</span></div>
              <div className="col-md-2 border-right"></div>
              <div className="col-md-2 border-right"><span>{this.state.declearedInfo? this.state.declearedInfo.lic_dc:null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q1 ? this.state.q1.lic : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q2 ? this.state.q2.lic : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q3 ? this.state.q3.lic : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q4 ? this.state.q4.lic : null }</span></div>
              <div className="col-md-1">{this.state.totalBlockData ? this.state.totalBlockData.lic : null }</div>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3 border-right"><span>Bank Deposits</span></div>
              <div className="col-md-2 border-right"></div>
              <div className="col-md-2 border-right"><span>{this.state.declearedInfo? this.state.declearedInfo.bank_dc:null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q1 ? this.state.q1.bank : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q2 ? this.state.q2.bank : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q3 ? this.state.q3.bank : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q4 ? this.state.q4.bank : null }</span></div>
              <div className="col-md-1">{this.state.totalBlockData ? this.state.totalBlockData.bank : null }</div>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3 border-right"><span>Public Provident Fund</span></div>
              <div className="col-md-2 border-right"></div>
              <div className="col-md-2 border-right"><span>{this.state.declearedInfo? this.state.declearedInfo.ppf_dc:null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q1 ? this.state.q1.ppf : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q2 ? this.state.q2.ppf : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q3 ? this.state.q3.ppf : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q4 ? this.state.q4.ppf : null }</span></div>
              <div className="col-md-1">{this.state.totalBlockData ? this.state.totalBlockData.ppf : null }</div>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3 border-right"><span>Mutual Funds</span></div>
              <div className="col-md-2 border-right"></div>
              <div className="col-md-2 border-right"><span>{this.state.declearedInfo? this.state.declearedInfo.mutual_fund_dc:null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q1 ? this.state.q1.mutual_fund : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q2 ? this.state.q2.mutual_fund : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q3 ? this.state.q3.mutual_fund : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q4 ? this.state.q4.mutual_fund : null }</span></div>
              <div className="col-md-1">{this.state.totalBlockData ? this.state.totalBlockData.mutual_fund : null }</div>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3 border-right"><span>Home Loan Principal</span></div>
              <div className="col-md-2 border-right"></div>
              <div className="col-md-2 border-right"><span>{this.state.declearedInfo? this.state.declearedInfo.hm_ln_pr_dc:null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q1 ? this.state.q1.hm_ln_pr : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q2 ? this.state.q2.hm_ln_pr : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q3 ? this.state.q3.hm_ln_pr : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q4 ? this.state.q4.hm_ln_pr : null }</span></div>
              <div className="col-md-1">{this.state.totalBlockData ? this.state.totalBlockData.hm_ln_pr : null }</div>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3 border-right"><span>Tution Fee For children</span></div>
              <div className="col-md-2 border-right"></div>
              <div className="col-md-2 border-right"><span>{this.state.declearedInfo? this.state.declearedInfo.tf_child_dc:null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q1 ? this.state.q1.tf_child : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q2 ? this.state.q2.tf_child : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q3 ? this.state.q3.tf_child : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q4 ? this.state.q4.tf_child : null }</span></div>
              <div className="col-md-1">{this.state.totalBlockData ? this.state.totalBlockData.tf_child : null }</div>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3 border-right"><b>Hospitalization insurance Mediclaim 80 D</b></div>
              <div className="col-md-2 border-right"><span>25000</span></div>
              <div className="col-md-2 border-right"><span>{this.state.declearedInfo? this.state.declearedInfo.hos_in_meddc:null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q1 ? this.state.q1.hos_in_med : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q2 ? this.state.q2.hos_in_med : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q3 ? this.state.q3.hos_in_med : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q4 ? this.state.q4.hos_in_med : null }</span></div>
              <div className="col-md-1">{this.state.totalBlockData ? this.state.totalBlockData.hos_in_med : null }</div>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3 border-right"><b>Education Loan Interest 80 E</b></div>
              <div className="col-md-2 border-right"><span>No Limit</span></div>
              <div className="col-md-2 border-right"><span>{this.state.declearedInfo? this.state.declearedInfo.edu_ln_dc:null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q1 ? this.state.q1.edu_ln : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q2 ? this.state.q2.edu_ln : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q3 ? this.state.q3.edu_ln : null }</span></div>
              <div className="col-md-1 border-right"><span>{this.state.q4 ? this.state.q4.edu_ln : null }</span></div>
              <div className="col-md-1">{this.state.totalBlockData ? this.state.totalBlockData.edu_ln : null }</div>
            </div>
            <div className="row border-bottom">
              <div className="col-md-3 border-right">Attachments</div>
              <div className="col-md-2 border-right"></div>
              <div className="col-md-2 border-right"></div>
              <div className="col-md-1 border-right">
                <a onClick={() => this.attachmentModal('q1')}>View Attachment</a>
                <AttachmentModal open={this.state.attachmentModalQ1} modalClose={this.closeModal} files={this.state.q1Attachments ? this.state.q1Attachments : null}/>
              </div>
              <div className="col-md-1 border-right">
                <a onClick={() => this.attachmentModal('q2')}>View Attachment</a>
                <AttachmentModal open={this.state.attachmentModalQ2} modalClose={this.closeModal} files={this.state.q2Attachments ? this.state.q2Attachments : null}/>
              </div>
              <div className="col-md-1 border-right">
                <a onClick={() => this.attachmentModal('q3')}>View Attachment</a>
                <AttachmentModal open={this.state.attachmentModalQ3} modalClose={this.closeModal} files={this.state.q3Attachments ? this.state.q3Attachments : null}/>
              </div>
              <div className="col-md-1 border-right">
                <a onClick={() => this.attachmentModal('q4')}>View Attachment</a>
                <AttachmentModal open={this.state.attachmentModalQ4} modalClose={this.closeModal} files={this.state.q4Attachments ? this.state.q4Attachments : null}/>
              </div>
            </div>
          </div>

      </div>
    );
  }
}
