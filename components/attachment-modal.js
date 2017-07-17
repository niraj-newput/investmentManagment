import React from "react";
import {Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, ModalClose} from 'react-modal-bootstrap';

export class AttachmentModal extends React.Component {
  constructor(props) {
    super(props);
  }

  showAttachments() {
    if(this.props.files) {
      var attachments = [];
      for(var i = 0; i < this.props.files.length; i++) {
        attachments.push(<div><a href={ this.props.files[i]} target="_blank"> attachments</a></div>);
      }
      return attachments;
    }
    return "Attachments are not available";
  }

  render() {
    return (
      <Modal
        size = "modal-md"
        isOpen = {this.props.open}
        contentLabel = "Modal">
        <ModalHeader>
          <ModalClose onClick={this.props.modalClose}/>
          <ModalTitle>
          <span>Quaterly Attachments</span>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          {this.showAttachments()}
        </ModalBody>
        <ModalFooter>
          <button onClick={this.props.modalClose} className="btn btn-warning">Close</button>
        </ModalFooter>
      </Modal>
    );
  }
}
