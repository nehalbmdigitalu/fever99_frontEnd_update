import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";

function AddUpdate(props) {
  const { handleClose, show, handleAdd,handleUpdate, data: {rowData} } = props;
  const { user } = useSelector((state) => state.login);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    if(!show) {
      setForm({})
      setUpdate(false)
    }
  },[show])

  useEffect(() => {
    if(!isEmpty(rowData)) {
      setForm(rowData);
      setUpdate(true)
    }
  },[rowData])

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
    if (!form.email) {
      errors = { ...errors, email: "This field is required!" };
    }
    if (!form.gender) {
      errors = { ...errors, gender: "This field is required!" };
    }
    
    if (!form.address) {
      errors = { ...errors, address: "This field is required!" };
    }
    if (!form.password) {
      errors = { ...errors, password: "This field is required!" };
    }
    if (!form.confirmPassword) {
      errors = { ...errors, confirmPassword: "This field is required!" };
    }
    if (form.confirmPassword != form.password) {
      errors = {
        ...errors,
        password: "Password and Confirm password not same!",
      };
    }
    
    setError(errors);

    return errors;
  };

  const validatorUpdate = () => {
    let errors = {};
    if (!form.name) {
      errors = { ...errors, name: "This field is required!" };
    }
    if (!form.mobile) {
      errors = { ...errors, mobile: "This field is required!" };
    }
    if (!form.email) {
      errors = { ...errors, email: "This field is required!" };
    }
    if (!form.gender) {
      errors = { ...errors, gender: "This field is required!" };
    }
    
    if (!form.address) {
      errors = { ...errors, address: "This field is required!" };
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
  const handleUpdateClick = (e) => {
    e.preventDefault();
    let vallidate = validatorUpdate();

    if (!isEmpty(vallidate)) {
      return false;
    }

    handleUpdate(form._id, form);
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
          <span>{update? 'Update Patient': 'Add Patient'}</span>
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
                {error && error.name && (
                  <span className="text-danger">{error.name}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Email"
                  className="form-control"
                />
                {error && error.email && (
                  <span className="text-danger">{error.email}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Mobile</label>
                <input
                  type="number"
                  name="mobile"
                  value={form.mobile}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Mobile Number"
                  className="form-control"
                />
                {error && error.mobile && (
                  <span className="text-danger">{error.mobile}</span>
                )}
              </div>

              
              <div className="form-group col-md-6">
                <label>Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                >
                  <option value="">--Select one--</option>
                  <option value="Male" selected={form.gender == 'Male'}>Male</option>
                  <option value="Female" selected={form.gender == 'Female'}>Female</option>
                </select>
                {error && error.email && (
                  <span className="text-danger">{error.email}</span>
                )}
              </div>
              
              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="form-control"
                ></textarea>
                {error && error.address && (
                  <span className="text-danger">{error.address}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Password</label> 
                <input
                  name="password"
                  className="form-control"
                  type="password"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Password"
                />
                {
                  update && (<small className="text-info">Leave Blank for keep same</small>)
                }
                {error && error.password && (
                  <span className="text-danger">{error.password}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>Confirm Password</label>
                <input
                  name="confirmPassword"
                  className="form-control"
                  type="password"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Confirm Password"
                />
                {
                  update && (<small className="text-info">Leave Blank for keep same</small>)
                }
                {error && error.confirmPassword && (
                  <span className="text-danger">{error.confirmPassword}</span>
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
            className="btn btn-sm btn-success"
            onClick={(e) => update? handleUpdateClick(e): handleAddData(e)}
          >
            {update? 'Update Patient': 'Add Patient'}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUpdate;
