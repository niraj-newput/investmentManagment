import React from "react";
import {Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, ModalClose} from 'react-modal-bootstrap';
import {Form, Input, File, Select} from 'formsy-react-components';

export class DeclearedModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('Decleared modal props');
    console.log(this.props);
    return (
      <Modal 
        size = "modal-md"
        isOpen = { this.props.open } 
        contentLabel = "Modal" >
        <ModalHeader>
          <ModalClose onClick={this.props.modalClose}/>
          <ModalTitle>
          <span>Decleared Form</span>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form onValidSubmit={(model) => { this.props.update(model);}}   noValidate >
            <Input name="hm_ln_dc" label="Home Loan interest" rowClassName="form-input-row" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} validations="isNumeric,maxLength:6" validationErrors={{isNumeric:"Enter only number", maxLength:"It should not exceed 200000"}}required/>
            <Input name="med_dc" label="Medicals Bills" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric,maxLength:5" validationErrors={{isNumeric:"Enter only number", maxLength:"It should not exceed 15000"}} required/>
            <div>
              <span>Excemption 80 C</span>
            </div>
            <Input name="lic_dc" label="LIC" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" required/>
            <Input name="bank_dc" label="Bank Deposite" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" required/>
            <Input name="ppf_dc" label="Public Provident Fund" rowClassName="form-input-row" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} required/>
            <Input name="mutual_fund_dc" label="Mutual Fund" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" required/>
            <Input name="hm_ln_pr_dc" label="Home Loan Principal" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" required/>
            <Input name="tf_child_dc" label="Tution Fee For children" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" required/>
            <Input name="hos_in_meddc" label="Hospitalization insurance Mediclaim 80 D" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric,maxLength:5" validationErrors={{isNumeric:"Enter only number", maxLength:"It should not exceed 25000"}} required/>
            <Input name="edu_ln_dc" label="Education Loan Interest 80 E" labelClassName={[{'col-sm-3': false}, 'col-sm-5']} elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-7']} rowClassName="form-input-row" validations="isNumeric" validationErrors={{isNumeric:"Enter only number"}} required/>
            
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