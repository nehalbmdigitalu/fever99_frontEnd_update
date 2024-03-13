import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty } from "lodash";


function AddEdit(props) {
  const { handleClose, show, handleAdd, rowData, handleUpdate } = props;
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    if (!isEmpty(rowData)) {
      setForm(rowData);
    }
  }, [rowData]);

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

    handleAdd(form);
  };
  const handleUpdateData = (e) => {
    e.preventDefault();
    let vallidate = validator();

    if (!isEmpty(vallidate)) {
      return false;
    }

    handleUpdate(form);
  }

  const handleCloseModal = (value) => {
    handleClose(false)
    setForm({})
  }

  return (
    <>
      <Modal show={show} onHide={(e) => handleClose(false)} backdrop="static">
        <Modal.Header>
          <span>Medicine</span>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                className="form-control"
                value={form.name}
                placeholder="Name"
                required
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
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
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
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
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />

              {error && error.company && (
                <span className="text-danger">{error.company}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleCloseModal(false)}
          >
            Close
          </button>
          {update && form._id ? (
            <button
              className="btn btn-sm btn-success"
              onClick={(e) => handleUpdateData(e)}
            >
              Update Medicine
            </button>
          ) : (
            <button
              className="btn btn-sm btn-success"
              onClick={(e) => handleAddData(e)}
            >
              Add Medicine
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEdit;
