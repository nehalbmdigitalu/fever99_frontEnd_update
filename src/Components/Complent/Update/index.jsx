import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Answer(props) {
  const { handleClose, show, handleAdd, rowData } = props;
  const { user } = useSelector((state) => state.login);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});

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
    if (!form.resolution) {
      errors = { ...errors, resolution: "This field is required!" };
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

    const { resolution } = form;
    handleAdd(form._id, { resolution });
  };
  return (
    <>
      <Modal show={show} onHide={(e) => handleClose(false)} backdrop="static">
        <Modal.Header>
          <span>Answer Complents</span>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Answer</label>
              <textarea
                type="text"
                name="resolution"
                value={form.answer}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                placeholder="Resolution"
                className="form-control"
              ></textarea>
              
              {error && error.name && (
                <span className="text-danger">{error.name}</span>
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
            className="btn btn-sm btn-success"
            onClick={(e) => handleAddData(e)}
          >
            Answer
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Answer;
