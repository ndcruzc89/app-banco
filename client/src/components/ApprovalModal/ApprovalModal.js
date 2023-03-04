import { Button, Modal } from 'react-bootstrap';

function ApprovalModal(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} className="mt-5">
      <Modal.Header closeButton className={props.headerColor} data-testid="modal-header">
        <Modal.Title><i className={props.titleIcon}></i>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.content}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={props.handleSave}>
          Aprobar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ApprovalModal;