import React from "react";
import {Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, ModalClose} from 'react-modal-bootstrap';

export class AttachmentModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Modal 
        size = "modal-lg"
        isOpen = {this.props.open} 
        contentLabel = "Modal">
        <ModalHeader>
          <ModalClose onClick={this.props.modalClose}/>
          <ModalTitle>
          <span>Quaterly Attachments</span>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <a href="">Attachment1</a>
          <a href="">Attachment2</a>
        </ModalBody>
        <ModalFooter>
          <button onClick={this.props.modalClose} className="btn btn-warning">Close</button>
        </ModalFooter>
      </Modal>
    );
  }
}