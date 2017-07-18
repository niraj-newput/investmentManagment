import React from "react";
import {Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter, ModalClose} from 'react-modal-bootstrap';

export class AttachmentModal extends React.Component {
  constructor(props) {
    super(props);
  }

  showAttachments() {
    var attachments  ;
    if(this.props.files) {
      attachments = this.props.files.map(function(file) {
       return (<div key={Math.random()}><a href={file.url} >{file.name}</a></div>);
     });
    return attachments;
    }
    return "Attachment not available";
  }

  render() {
    var attachments ;
    if(this.props.files){
       attachments = this.props.files.map(file => {
       return (
         <div key={Math.random()}>
           <a href={file.url} target="_blank"> {file.name}</a>
         </div>
      );
    });
    }


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
        <ModalBody>{this.showAttachments()}
        </ModalBody>
        <ModalFooter>
          <button onClick={this.props.modalClose} className="btn btn-warning">Close</button>
        </ModalFooter>
      </Modal>
    );
  }
}
