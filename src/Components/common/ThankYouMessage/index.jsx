import React from "react";
import { Modal } from "react-bootstrap";

function ThankYouMessage(props) {
  const { show, handleClose, message } = props;
  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header>
        <h4 style={{ color:'#FFF' }}>Thanks!</h4>
      </Modal.Header>
      <Modal.Body>
        <p>
          {message}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn  btn-sm btn-info" onClick={() => handleClose(false) }>Close</button>
      </Modal.Footer>
    </Modal>
  );
}

export default ThankYouMessage;
