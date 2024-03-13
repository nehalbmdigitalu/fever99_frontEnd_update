import React, { useCallback, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../dependiencies/action";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

function AddModal(props) {
  const { showModal, handleClose, data } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, wallet } = useSelector((state) => state.login);
  const [form, setForm] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadFile = (file) => {
    setUploadedFiles((prevUploadedFiles) => [
      ...prevUploadedFiles,
      { fileName: file },
    ]);
  };
  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    if (!isEmpty(data)) {
      setForm({ ...form, doctorId: data._id, timeSlot: data.timeSlot });
    }
  }, [data]);

  const validator = () => {
    let errors = {};
    if (!form.selectedTimeSlot) {
      errors = { ...errors, selectedTimeSlot: "This field is required!" };
    }
    if (!form.dateTime) {
      errors = { ...errors, dateTime: "This field is required!" };
    }
    if (!form.patientName) {
      errors = { ...errors, patientName: "This field is required!" };
    }
    if (!form.age) {
      errors = { ...errors, age: "This field is required!" };
    }
    if (!form.gender) {
      errors = { ...errors, gender: "This field is required!" };
    }
    setError(errors);

    return errors;
  };

  const createAppointment = (e) => {
    e.preventDefault();

    let vallidate = validator();

    if (!isEmpty(vallidate)) {
      return false;
    }

    if (wallet < data.serviceCharge) {
      setError({
        wallet: "Sorry! you don't have sufficent amount to book appointment!",
      });
      return false;
    }
    let res = dispatch(
      createItem({ ...form, expertId: user._id, files: uploadedFiles, mode:'Offline' })
    );
    res.then((res) => {
      if (res.status) {
        setForm({});
        handleClose(false);
        navigate("/appointments");
      }
    });
  };
  // console.log(form);
  return (
    <>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => handleClose(false)}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && error.wallet && (
            <p className="text-danger">{error.wallet}</p>
          )}
          <form onSubmit={(e) => createAppointment(e)}>
            <div className="row">
              <div className="form-group col-md-4">
                <label>Date:</label>
                <input
                  type="date"
                  name="dateTime"
                  className="form-control"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {error && error.dateTime && (
                  <span className="text-danger">{error.dateTime}</span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label>Select Slot</label>
                <select
                  name="selectedTimeSlot"
                  className="form-select"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                >
                  <option value="">--Select Slot--</option>
                  {form &&
                    form.timeSlot &&
                    form.timeSlot.map((d, index) => (
                      <option key={index} value={d.value}>
                        {d.value}
                      </option>
                    ))}
                </select>
                {error && error.selectedTimeSlot && (
                  <span className="text-danger">{error.selectedTimeSlot}</span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label>Patient Name:</label>
                <input
                  type="text"
                  name="patientName"
                  className="form-control"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Patient Name"
                />
                {error && error.patientName && (
                  <span className="text-danger">{error.patientName}</span>
                )}
              </div>

              <div className="form-group col-md-6">
                <label>Patient Age:</label>
                <input
                  type="number"
                  name="age"
                  min={1}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="form-control"
                  placeholder="Patient Age"
                />
                {error && error.age && (
                  <span className="text-danger">{error.age}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Patient Gender:</label>
                <select
                  name="gender"
                  className="form-select"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                >
                  <option value="">--Select Gender--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="other">Other</option>
                </select>
                {error && error.gender && (
                  <span className="text-danger">{error.gender}</span>
                )}
              </div>
            </div>
            

            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => createAppointment(e)}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModal;
