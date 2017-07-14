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
        size = "modal-lg"
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
            <Input name="hm_ln_dc" label="Home Loan interest"  required/>
            <Input name="med_dc" label="Medicals Bills"  required/>
            <div>
              <span>Excemption 80 C</span>
            </div>
            <Input name="lic_dc" label="LIC"  required/>
            <Input name="bank_dc" label="Bank Deposite"  required/>
            <Input name="ppf_dc" label="Public Provident Fund"  required/>
            <Input name="mutual_fund_dc" label="Mutual Fund"  required/>
            <Input name="hm_ln_pr_dc" label="Home Loan Principal"  required/>
            <Input name="tf_child_dc" label="Tution Fee For children"  required/>
            <Input name="hos_in_meddc" label="Hospitalization insurance Mediclaim 80 D"  required/>
            <Input name="edu_ln_dc" label="Education Loan Interest 80 E"  required/>
            
            <div className="form-group">
              <button type="submit" className="btn btn-primary register-button">Save Details</button>
            </div>
          </Form> 
        </ModalBody>
        <ModalFooter>
          <button onClick={this.props.modalClose} className="btn btn-warning">Close</button>
        </ModalFooter>
      </Modal>
    );
  }
}