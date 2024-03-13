import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createComplet } from "../dependiencies/action";

function RaiseComplent(props) {
  const { handleClose, show, handleAdd, appointmentId } = props;
//   const { user } = useSelector((state) => state.login);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (appointmentId) {
      setForm({appointmentId: appointmentId});
    }
  }, [appointmentId]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validator = () => {
    let errors = {};
    if (!form.title) {
      errors = { ...errors, title: "This field is required!" };
    }
    if (!form.details) {
      errors = { ...errors, details: "This field is required!" };
    }
    if(!form.appointmentId) {
        errors = { ...errors, appointmentId: "This field is required!" };
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


    dispatch(createComplet(form)).then(res => {
        handleClose(false)
        setForm({})
    })
  };
  console.log(error, form)
  return (
    <>
      <Modal show={show} onHide={(e) => handleClose(false)} backdrop="static">
        <Modal.Header>
          <span>Raise A Complent</span>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                placeholder="Title"
                className="form-control"
              />
              
              {error && error.title && (
                <span className="text-danger">{error.title}</span>
              )}
            </div>
            <div className="form-group">
              <label>Details</label>
              <textarea
                type="text"
                name="details"
                value={form.details}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                placeholder="Details"
                className="form-control"
              ></textarea>
              
              {error && error.details && (
                <span className="text-danger">{error.details}</span>
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
            Raise A Complent
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RaiseComplent;
