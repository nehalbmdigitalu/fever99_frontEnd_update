import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InsurenceModal(props) {
  const { handleClose, show, handleAdd } = props;
  const { user } = useSelector((state) => state.login);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [famelymember, setFamelyMember] = useState([{fname:'', age: ''}])

  useEffect(() => {
    if (!isEmpty(user)) {
      setForm(user);
    }
  }, [user]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const addMember = () => {
    setFamelyMember((old) => [...old, {fname:'', age:''}])
  }

  const removeMember = (i) => {
    const updatedMembers = [...famelymember];
    updatedMembers.splice(i, 1);
    setFamelyMember(updatedMembers);
  }

  const handleChange = (index, key, value) => {
    const updatedMembers = [...famelymember];
    updatedMembers[index][key] = value;
    setFamelyMember(updatedMembers);
  };

  const validator = () => {
    let errors = {};
    
    if (!form.mobile) {
      errors = { ...errors, mobile: "This field is required!" };
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
    const { mobile, name,age, gender, email, state, district, city, address, comment } = form;
    handleAdd({ mobile, name,age, gender, email, state, district, city, address, comment, famelymember});
  };
  return (
    <>
      <Modal
        size="xl"
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
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Email"
                  className="form-control"
                />
                <small
                  className="text-warning"
                  style={{ width: "100%", display: "inline-block" }}
                >
                  Confirm your Email number is Correct!
                </small>
                {error && error.email && (
                  <span className="text-danger">{error.email}</span>
                )}
              </div>
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
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Others</option>
                </select>
                {error && error.gender && (
                  <span className="text-danger">{error.gender}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>State</label>
                <input name="state" onChange={(e) => handleInputChange(e.target.name, e.target.value)} className="form-control" placeholder="state" />
              </div>
              <div className="form-group col-md-6">
                <label>District</label>
                <input name="district" onChange={(e) => handleInputChange(e.target.name, e.target.value)} className="form-control" placeholder="District" />
              </div>
              <div className="form-group col-md-6">
                <label>City</label>
                <input name="city" onChange={(e) => handleInputChange(e.target.name, e.target.value)} className="form-control" placeholder="city" />
              </div>
              {
                famelymember.map((item, i) => (
                    <>
                        <div className="row mb-4" >
                            <div className="col-md-6">
                                {
                                    !i && (
                                        <label>Member Name</label>
                                    )
                                }
                                <input onChange={(e) => handleChange(i, e.target.name, e.target.value)}  value={item.name} name="fname" className="form-control" placeholder="Member Name" />
                            </div>
                            <div className="col-md-4">
                                {
                                    !i && (
                                        <label>Age</label>
                                    )
                                }
                                <input type="number" min={1} onChange={(e) => handleChange(i, e.target.name, e.target.value)} value={item.age} name="age" className="form-control" placeholder="Age" />
                            </div>
                            <div className="col-md-2">
                               
                                {
                                    i ? (
                                        <i className="fa fa-trash" onClick={() => removeMember(i)} style={{ marginTop:'10px' }}></i>
                                    ): (
                                        <i onClick={() => addMember()} className="fa fa-plus" style={{ marginTop:'35px' }}></i>
                                    )
                                }
                                
                            </div>
                        </div>
                    </>
                ))
              }
              <div className="form-group col-md-6">
                <label>Address</label>
                <textarea name="address" placeholder="Address" onChange={(e) => handleInputChange(e.target.name, e.target.value)} className="form-control"></textarea>
              </div>
              <div className="form-group col-md-6">
                <label>Comment</label>
                <textarea name="comment" placeholder="Comment" onChange={(e) => handleInputChange(e.target.name, e.target.value)} className="form-control"></textarea>
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
            onClick={(e) => handleAddData(e)}
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InsurenceModal;
