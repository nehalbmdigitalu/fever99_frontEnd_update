import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getStateCity } from "../../Dashboard/dependencies/action";

function RequestDetails(props) {
  const { handleClose, show, handleAdd, rowData } = props;
  const { user } = useSelector((state) => state.login);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const { stateList } = useSelector((state) => state.stateCity);
  const [city, setCity] = useState([]);
  const dispatch = useDispatch();
  const [submitDisable, setSubmitDisable] = useState(true)
  const [avaliableMessage, setAvaliableMessage] = useState('')
  useEffect(() => {
    if (!isEmpty(user)) {
      setForm(user);
    }
  }, [user]);

  useEffect(() => {
    dispatch(getStateCity());
  }, []);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const validator = () => {
    let errors = {};
    if (!form.date) {
      errors = { ...errors, date: "This field is required!" };
    }
    if (!form.mobile) {
      errors = { ...errors, mobile: "This field is required!" };
    }
    if (!form.time) {
      errors = { ...errors, time: "This field is required!" };
    }
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

    const { mobile, date, time, name, age, gender, medicalProblem, state, city, pin_code } = form;
    handleAdd({ mobile, date, time, name, age, gender, medicalProblem , state, city, pin_code});
  };

  const handleStateChange = (e) => {
    const id = e.target.value;
    handleInputChange('state', id)
    let state = stateList.filter((e) => e.state == id);
    if (state && state.length > 0) {
      setCity(state[0].city);
    }
  };

  const handlePinCodeChange = (value) => {
    const checkAvality = rowData.pinCode.includes(value);
    if(checkAvality) {
      setSubmitDisable(false)
      setAvaliableMessage('Service is avaliable in selected area!')
    }else {
      setAvaliableMessage('Service is not avaliable in selected area!')
    }
    
    handleInputChange('pin_code', value)
  }
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={(e) => handleClose(false)}
        backdrop="static"
      >
        <Modal.Header>
          <span>Service Request Details</span>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Name"
                  className="form-control"
                />
                <small
                  className="text-warning"
                  style={{ width: "100%", display: "inline-block" }}
                >
                  Confirm your name!
                </small>
                {error && error.name && (
                  <span className="text-danger">{error.name}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={form.mobile}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Mobile Number"
                  className="form-control"
                />
                <small
                  className="text-warning"
                  style={{ width: "100%", display: "inline-block" }}
                >
                  Confirm your mobile number is Correct!
                </small>
                {error && error.mobile && (
                  <span className="text-danger">{error.mobile}</span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Age</label>
                <input
                  name="age"
                  className="form-control"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {error && error.age && (
                  <span className="text-danger">{error.age}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Gender</label>
                <select
                  className="form-control"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  name="gender"
                >
                  <option value="">Select One</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
                {error && error.gender && (
                  <span className="text-danger">{error.gender}</span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-4">
                <label>State</label>
                <select
                  className="form-select"
                  name="state"
                  onChange={(e) => handleStateChange(e)}
                >
                  <option value="">--Select State--</option>
                  {stateList &&
                    stateList.map((st, inde) => (
                      <option key={inde} value={st.state}>
                        {st.state}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group col-md-4">
                <label>City</label>
                <select
                  className="form-select"
                  name="city"
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                >
                  <option value="">--Select City--</option>
                  {city &&
                    city.map((cty, inde) => (
                      <option key={inde} value={cty}>
                        {cty}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group col-md-4">
                <label>Pin Code</label>
                <input name="pin_code" className="form-control" placeholder="Pin Code" onBlur={(e) => handlePinCodeChange(e.target.value)} />
                {/* <span className={submitDisable ? `text-danger`: `text-success`}>{avaliableMessage}</span> */}
              </div>
            </div>
            <div className="form-group">
              <label>Medical Problem</label>
              <textarea
                name="medicalProblem"
                className="form-control"
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
                placeholder="Please write your medical issues"
              ></textarea>
              {error && error.medicalProblem && (
                <span className="text-danger">{error.medicalProblem}</span>
              )}
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Select Date</label>
                <DatePicker
                  className="form-control"
                  minDate={new Date()}
                  title="Select Date"
                  name="date"
                  selected={form.date}
                  onChange={(e) => handleInputChange("date", e)}
                />
                {error && error.date && (
                  <span className="text-danger">{error.date}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Select Time</label>
                <input
                  type="time"
                  name="time"
                  className="form-control"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {error && error.time && (
                  <span className="text-danger">{error.time}</span>
                )}
              </div>
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
            className={`${submitDisable ? `btn btn-sm btn-success`: `btn btn-sm btn-success`}`}
            onClick={(e) => handleAddData(e)}
          >
            Create Request
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RequestDetails;
