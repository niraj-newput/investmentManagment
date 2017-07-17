import React from "react";
import {Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, ModalClose} from 'react-modal-bootstrap';
import {Form, Input, File, Select} from 'formsy-react-components';

export class QuaterlyModal extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Modal 
        size = "modal-md"
        isOpen = { this.props.open } 
        contentLabel = "Modal" >
        <ModalHeader>
          <ModalClose onClick={this.props.modalClose}/>
          <ModalTitle>
          <span>Quaterly Form</span>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onValidSubmit={(model) => { this.props.update(model,this.props.quaterNo); }}  ref="dec_modal" noValidate >
            <Input name="hm_ln" label="Home Loan interest" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.qObj ? this.props.qObj["hm_ln"] : ''} required/>
            <Input name="med" label="Medicals Bills" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.qObj ? this.props.qObj["med"] : ''} required/>
            <div>
              <span>Excemption 80 C</span>
            </div>
            <Input name="lic" label="LIC" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.qObj ? this.props.qObj["lic"] : ''} required/>
            <Input name="bank" label="Bank Deposite" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.qObj ? this.props.qObj["bank"] : ''} required/>
            <Input name="ppf" label="Public Provident Fund" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.qObj ? this.props.qObj["ppf"] : ''} required/>
            <Input name="mutual_fund" label="Mutual Fund" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.qObj ? this.props.qObj["mutual_fund"] : ''} required/>
            <Input name="hm_ln_pr" label="Home Loan Principal" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.qObj ? this.props.qObj["hm_ln_pr"] : ''} required/>
            <Input name="tf_child" label="Tution Fee For children" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.qObj ? this.props.qObj["tf_child"] : ''} required/>
            <Input name="hos_in_med" label="Hospitalization insurance Mediclaim 80 D" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.qObj ? this.props.qObj["hos_in_med"] : ''} required/>
            <Input name="edu_ln" label="Education Loan Interest 80 E" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.qObj ? this.props.qObj["edu_ln"] : ''} required/>
            
            <div className="row btn-group model-footer">
                <div className="col-md-6"><button type="submit" className="btn btn-primary app-btn">Save Details</button></div>
                <div className="col-md-6"><button onClick={this.props.modalClose} className="btn btn-warning app-btn">Close</button></div>
            </div>
          </Form> 
        </ModalBody>
      </Modal>
    );
  }
}