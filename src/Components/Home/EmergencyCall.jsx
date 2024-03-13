import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {isEmpty} from 'lodash'

function EmergencyCall(props) {
  const { show, handleClose } = props;
  const [form, setForm] = useState({});
  const [error, setError] = useState({});

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validator = () => {
    let errors = {};
    if (!form.name) {
      errors = { ...errors, name: "This field is required!" };
    }
    if (!form.mobile) {
      errors = { ...errors, mobile: "This field is required!" };
    }

    setError(errors);

    return errors;
  };

  const handleRequestCall = (e) => {
    e.preventDefault();

    e.preventDefault();
    let vallidate = validator();

    if (!isEmpty(vallidate)) {
      return false;
    }
    handleClose(false);
  };
  return (
    <Modal show={show} onHide={() => handleClose(false)}>
      <Modal.Header>
        <h3>Request Call</h3>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              required
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            {error && error.name && (
              <span className="text-danger">{error.name}</span>
            )}
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              name="mobile"
              required
              type="text"
              className="form-control"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            {error && error.mobile && (
              <span className="text-danger">{error.mobile}</span>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleClose(false)}
        >
          Close
        </button>
        <button
          className="btn btn-sm btn-info"
          onClick={(e) => handleRequestCall(e)}
        >
          Request
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmergencyCall;
