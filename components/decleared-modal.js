import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, ModalClose} from 'react-modal-bootstrap';
import {Form, Input, File, Select} from 'formsy-react-components';

export class DeclearedModal extends React.Component {
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
          <span>Declaration Form</span>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onValidSubmit={(model) => { this.props.update(model);}}   noValidate >
            <Input name="hm_ln" label="Home Loan Interest" rowClassName="form-input-row" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} validations="isNumeric,maxLength:6" validationErrors={{isNumeric:"Enter only number", maxLength:"It should not exceed 200000"}} value={this.props.declareObj ? this.props.declareObj.hm_ln : '' } required/>
            <Input name="med" label="Medicals Bills" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric,maxLength:5" validationErrors={{isNumeric:"Enter only number", maxLength:"It should not exceed 15000"}} value={this.props.declareObj ? this.props.declareObj.med : '' } required/>
            <div>
              <span>Excemption 80 C</span>
            </div>
            <Input name="lic" label="LIC" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.declareObj ? this.props.declareObj.lic : '' } required/>
            <Input name="bank" label="Bank Deposite" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row"  value={this.props.declareObj ? this.props.declareObj.bank : '' } required/>
            <Input name="ppf" label="Public Provident Fund" rowClassName="form-input-row" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} value={this.props.declareObj ? this.props.declareObj.ppf : '' } required/>
            <Input name="mutual_fund" label="Mutual Fund" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.declareObj ? this.props.declareObj.mutual_fund : '' } required/>
            <Input name="hm_ln_pr" label="Home Loan Principal" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.declareObj ? this.props.declareObj.hm_ln_pr : '' } required/>
            <Input name="tf_child" label="Tution Fee For Children" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" value={this.props.declareObj ? this.props.declareObj.tf_child : '' } required/>
            <Input name="hos_in_med" label="Hospitalization Insurance Mediclaim 80 D" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric,maxLength:5" validationErrors={{isNumeric:"Enter only number", maxLength:"It should not exceed 25000"}} value={this.props.declareObj ? this.props.declareObj.hos_in_med : '' } required/>
            <Input name="edu_ln" label="Education Loan Interest 80 E" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric" validationErrors={{isNumeric:"Enter only number"}} value={this.props.declareObj ? this.props.declareObj.edu_ln : '' } required/>

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
