import React from 'react';
import ReactDOM from 'react-dom';
import Formsy from 'formsy-react';
import Confirm from "react-confirm-bootstrap";
import {Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, ModalClose} from 'react-modal-bootstrap';

import {Form, Input, File, Select} from 'formsy-react-components';
Formsy.addValidationRule('isSetPrecision', function(values, value) {
  if(value.indexOf('.') != -1) {
    return ((value.slice((value.indexOf('.')+ 1), value.length).length) > 2 ? false : true);
  }
  return true;
});

export class QuaterlyModal extends React.Component {
  constructor(props) {
    super(props);
    this.showAttachments = this.showAttachments.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.state = {
      btnState: true,
    };
  }

  onChange() {
    this.setState({
      btnState: false
    });
  }

  onConfirm(fileName) {
    this.props.deleteFile(fileName);
  }

  onClose(e) {
    e.preventDefault();
    var obj = this.refs.modalForm;
    this.setState({btnState: true});
    this.props.modalClose();
  }

  showAttachments() {
    var self = this;
    var attachments  ;
    if(this.props.files) {
        attachments = this.props.files.map(function(file) {
         return (<div key={Math.random()} className="row">
           <div className="col-sm-8">
              <span>{file.name.replace(self.props.quaterNo+ ".", "")}</span>
           </div>
           <div className="col-sm-2">
              <a href={file.url} target="_blank">View</a>
           </div>
           <div className="col-sm-2">
           <Confirm
             onConfirm={() => { self.onConfirm(file.name); }}
             body="Are you sure you want to delete this file?"
             confirmText="Confirm Delete"
             title="Deleting Stuff">
             <i className="fa fa-trash-o" aria-hidden="true"></i>
           </Confirm>
           </div>
         </div>);
       });
      return attachments;
    }
  }

  render() {
    return (
      <Modal
        size = "modal-md"
        isOpen = { this.props.open }
        contentLabel = "Modal"
        id="modal">
        <ModalHeader>
          <ModalClose onClick={this.props.modalClose}/>
          <ModalTitle>
          <span>{this.props.quaterName} Investment Form</span>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onValidSubmit={(model) => { this.props.update(model,this.props.quaterNo); this.setState({btnState: true});}}  id="modalForm" noValidate >
            <Input name="hm_ln" label="Home Loan interest" onChange={this.onChange} labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric,isSetPrecision" validationErrors={{isNumeric:"Enter only number", isSetPrecision: 'Enter only 2 digit after decimal'}} value={ (this.props.qObj && this.props.qObj["hm_ln"] != '0') ? this.props.qObj["hm_ln"] : '' } />
            <Input name="med" label="Medicals Bills" onChange={this.onChange} labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric" validationErrors={{isNumeric:"Enter only number"}} value={(this.props.qObj && this.props.qObj["med"] != '0') ? this.props.qObj["med"] : ''} />
            <div>
              <span>Excemption 80 C</span>
            </div>
            <Input name="lic" label="LIC" onChange={this.onChange} labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric" validationErrors={{isNumeric:"Enter only number"}}  value={(this.props.qObj && this.props.qObj["lic"] != '0') ? this.props.qObj["lic"] : ''} />
            <Input name="bank" label="Bank Deposite" onChange={this.onChange} labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric" validationErrors={{isNumeric:"Enter only number"}} value={(this.props.qObj && this.props.qObj["bank"] != '0') ? this.props.qObj["bank"] : ''} />
            <Input name="ppf" label="Public Provident Fund" onChange={this.onChange} labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric" validationErrors={{isNumeric:"Enter only number"}} value={(this.props.qObj && this.props.qObj["ppf"] != '0') ? this.props.qObj["ppf"] : ''} />
            <Input name="mutual_fund" label="Mutual Funds" onChange={this.onChange} labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric" validationErrors={{isNumeric:"Enter only number"}} value={(this.props.qObj && this.props.qObj["mutual_fund"] != '0') ? this.props.qObj["mutual_fund"] : ''} />
            <Input name="hm_ln_pr" label="Home Loan Principal" onChange={this.onChange} labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric" validationErrors={{isNumeric:"Enter only number"}} value={(this.props.qObj && this.props.qObj["hm_ln_pr"] != '0') ? this.props.qObj["hm_ln_pr"] : ''} />
            <Input name="tf_child" label="Tution Fee For children" onChange={this.onChange} labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric" validationErrors={{isNumeric:"Enter only number"}} value={(this.props.qObj && this.props.qObj["tf_child"] != '0') ? this.props.qObj["tf_child"] : ''} />
            <Input name="hos_in_med" label="Hospitalization insurance Mediclaim 80 D" onChange={this.onChange} labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric" validationErrors={{isNumeric:"Enter only number"}} value={(this.props.qObj && this.props.qObj["hos_in_med"] != '0')  ? this.props.qObj["hos_in_med"] : ''} />
            <Input name="edu_ln" label="Education Loan Interest 80 E" onChange={this.onChange} labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric" validationErrors={{isNumeric:"Enter only number"}} value={(this.props.qObj && this.props.qObj["edu_ln"] != '0') ? this.props.qObj["edu_ln"] : ''} />
            <File className="form-control" name="file" label="Add Files" onChange={this.onChange} id="file" ref="file" accept="application/pdf,image/*" multiple labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" />
            {this.showAttachments()}
            <div className="row btn-group model-footer">
              <div className="col-md-6"><button type="submit" className="btn btn-primary app-btn" disabled={this.state.btnState} >Save Details</button></div>
              <div className="col-md-6"><button onClick={this.onClose} className="btn btn-warning app-btn">Close</button></div>
            </div>
            <div className={ this.props.msg}>
              <span className="alert alert-success"> Saved successfully</span>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
