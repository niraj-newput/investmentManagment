import React from "react";
import {Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, ModalClose} from 'react-modal-bootstrap';

export class AttachmentModal extends React.Component {
  constructor(props) {
    super(props);
  }

  showAttachments() {
    if(this.props.files) {
     var attachments = [];
     this.props.files.map((file) => {
          attachments.push(<div key={Math.random()}><a href={file.path} target="_blank">{file.fileName}</a></div>);
      });
      return attachments;
    }
    return "Attachments are not available";
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
          {this.showAttachments()}
        </ModalBody>
        <ModalFooter>
          <button onClick={this.props.modalClose} className="btn btn-warning">Close</button>
        </ModalFooter>
      </Modal>
    );
  }
}
