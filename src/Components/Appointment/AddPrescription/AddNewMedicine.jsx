import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty } from "lodash";
import { AddMedicine } from "../../AdminMedicines/dependiencies/action";
import { useDispatch } from "react-redux";

function AddNewMedicine(props) {
  const { show, handleCloseMedicine } = props;
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validator = () => {
    let errors = {};
    if (!form.name) {
      errors = { ...errors, name: "This field is required!" };
    }

    setError(errors);

    return errors;
  };

  const handleAddData = (e) => {
    e.preventDefault();
    let vallidate = validator();

    if (!isEmpty(vallidate)) {
      return false;
    }

    dispatch(AddMedicine(form)).then((res) => {
      if (res.status) {
        setForm({})
        handleCloseMedicine(false);
      }
    });
  };

  return (
    <Modal show={show} onHide={() => handleCloseMedicine(false)} backdrop="static">
      <Modal.Body>
        <div style={{ boxShadow: "initial" }}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              className="form-control"
              value={form.name}
              placeholder="Name"
              required
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />

            {error && error.name && (
              <span className="text-danger">{error.name}</span>
            )}
          </div>

          <div className="form-group">
            <label>Composition</label>
            <input
              name="combination"
              className="form-control"
              placeholder="Composition"
              value={form.combination}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />

            {error && error.combination && (
              <span className="text-danger">{error.combination}</span>
            )}
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              name="company"
              className="form-control"
              value={form.company}
              placeholder="Name"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />

            {error && error.company && (
              <span className="text-danger">{error.company}</span>
            )}
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-sm btn-danger" style={{ marginRight:'10px' }} onClick={() => handleCloseMedicine(false)}>Close</button>
            <button
              className="btn btn-sm btn-success"
              onClick={(e) => handleAddData(e)}
            >
              Add Medicine
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddNewMedicine;
