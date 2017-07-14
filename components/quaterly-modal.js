import React from "react";
import {Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, ModalClose} from 'react-modal-bootstrap';
import {Form, Input, File, Select} from 'formsy-react-components';

export class QuaterlyModal extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    console.log('quaterly modal');
    console.log(this.props);
    return (
      <Modal 
        size = "modal-lg"
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
            <Input name={"hm_ln_"+this.props.quaterNo} label="Home Loan interest"  required/>
            <Input name={"med_"+this.props.quaterNo} label="Medicals Bills"  required/>
            <div>
              <span>Excemption 80 C</span>
            </div>
            <Input name={"lic_"+ this.props.quaterNo} label="LIC"  required/>
            <Input name={"bank_"+this.props.quaterNo} label="Bank Deposite"  required/>
            <Input name={"ppf_"+this.props.quaterNo} label="Public Provident Fund"  required/>
            <Input name={"mutual_fund_"+this.props.quaterNo} label="Mutual Fund"  required/>
            <Input name={"hm_ln_pr_"+this.props.quaterNo} label="Home Loan Principal"  required/>
            <Input name={"tf_child_"+this.props.quaterNo} label="Tution Fee For children"  required/>
            <Input name={"hos_in_med_"+this.props.quaterNo} label="Hospitalization insurance Mediclaim 80 D"  required/>
            <Input name={"edu_ln_"+this.props.quaterNo} label="Education Loan Interest 80 E"  required/>
            
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