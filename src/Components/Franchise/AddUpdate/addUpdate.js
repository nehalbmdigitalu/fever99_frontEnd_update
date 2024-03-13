import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import image from "../../../assets/img/Hero_Banner.jpeg.jpg";
import { getStateCity } from "../../Dashboard/dependencies/action";

function AddUpdate(props) {
  const { handleClose, show, handleAdd } = props;
  const { user } = useSelector((state) => state.login);
  const [form, setForm] = useState({ previus_experience_with_us: "No" });
  const [error, setError] = useState({});
  const [previewPanImage, setPreviewPanImage] = useState(null);
  const [previewLicenseImage, setPreviewLicenseImage] = useState(null);
  const [previewAadharImage, setPreviewAadharImage] = useState(null);
  const [previewProfileImage, setPreviewProfileImage] = useState(null);
  const handlePanImageChange = (e) => {
    const file = e.target.files[0];
    handleInputChange(e.target.name, file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewPanImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewPanImage(null);
    }
  };

  const handleLicenseImageChange = (e) => {
    const file = e.target.files[0];
    handleInputChange(e.target.name, file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewLicenseImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewLicenseImage(null);
    }
  };

  const handleAadharImageChange = (e) => {
    const file = e.target.files[0];
    handleInputChange(e.target.name, file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewAadharImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewAadharImage(null);
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    handleInputChange(e.target.name, file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewProfileImage(null);
    }
  };

  const [update, setUpdate] = useState(false);
  const { stateList } = useSelector((state) => state.stateCity);
  const [city, setCity] = useState([]);
  const [profession, setProfession] = useState([
    { key: "Doctor", value: "Doctor" },
    { key: "Nurse", value: "Nurse" },
    { key: "Lab_Owner_Lab_Technician", value: "Lab Owner / Lab Technician" },
    { key: "Chemist_Owner_Pharmacist", value: "Chemist Owner / Pharmacist" },
    { key: "Paramedical_Staff", value: "Paramedical Staff" },
    { key: "Other", value: "Other" },
  ]);
  const [selectedProfession, setSelectedProfession] = useState([]);
  const dispach = useDispatch();

  useEffect(() => {
    if (!show) {
      setForm({});
      setUpdate(false);
    }
    dispach(getStateCity());
  }, [show]);

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

  const handleAddData = (e) => {
    e.preventDefault();
    let vallidate = validator();

    if (!isEmpty(vallidate)) {
      return false;
    }

    let data = new FormData();

    for (const key in form) {
      data.append(key, form[key]);
    }
    data.append("profession", JSON.stringify(selectedProfession));

    handleAdd(data);
  };

  const handleStateChange = (e) => {
    const id = e.target.value;

    let state = stateList.filter((e) => e._id == id);

    if (state && state.length > 0) {
      handleInputChange("state", state[0].state);
      setCity(state[0].city);
    }
  };
  const handleCheckboxChange = (checkboxName) => {
    setSelectedProfession((old) => {
      if (old.includes(checkboxName)) {
        return old.filter((item) => item !== checkboxName);
      } else {
        return [...old, checkboxName];
      }
    });
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
          <span>{update ? "Update Franchise" : "Add Franchise"}</span>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="form-group col-md-4">
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
              <div className="form-group col-md-4">
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
              <div className="form-group col-md-4">
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
              <div className="form-group col-md-4">
                <label>WhatsApp Number</label>
                <input
                  type="number"
                  name="whatsappNumber"
                  value={form.whatsappNumber}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="What's App Number"
                  className="form-control"
                />
                {error && error.whatsappNumber && (
                  <span className="text-danger">{error.whatsappNumber}</span>
                )}
              </div>

              <div className="form-group col-md-4">
                <label>Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                >
                  <option value="">--Select one--</option>
                  <option value="Male" selected={form.gender == "Male"}>
                    Male
                  </option>
                  <option value="Female" selected={form.gender == "Female"}>
                    Female
                  </option>
                </select>
                {error && error.email && (
                  <span className="text-danger">{error.email}</span>
                )}
              </div>

              <div className="form-group col-md-4">
                <label>Date Of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Date Of Birth"
                  className="form-control"
                />
                {error && error.dob && (
                  <span className="text-danger">{error.dob}</span>
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
                <label>State</label>
                <select
                  name="state"
                  className="form-select"
                  onChange={(e) => handleStateChange(e)}
                >
                  <option value="">--Select One--</option>
                  {stateList &&
                    stateList.map((sta, index) => (
                      <option
                        value={sta._id}
                        key={index}
                        selected={sta.state === form.state}
                      >
                        {sta.state}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>City</label>
                <select
                  name="city"
                  className="form-select"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                >
                  <option value="">--Select One--</option>
                  {city &&
                    city.map((city, index) => (
                      <option
                        value={city}
                        key={index}
                        selected={city === form.city}
                      >
                        {city}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group col-md-12">
                <label>Firm / Clinic / Hospital Name</label>
                <input
                  name="clinicName"
                  placeholder="Firm / Clinic / Hospital Name"
                  value={form.clinicName}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="form-control"
                />
                {error && error.clinicName && (
                  <span className="text-danger">{error.clinicName}</span>
                )}
              </div>

              <div className="form-group row">
                <label>Your Profession</label>
                {profession.map((item, index) => (
                  <span>
                    <input
                      name="profession"
                      type="checkbox"
                      value={item.key}
                      onChange={() => handleCheckboxChange(item.key)}
                    />{" "}
                    {item.value}
                  </span>
                ))}
                {error && error.clinicName && (
                  <span className="text-danger">{error.clinicName}</span>
                )}
              </div>

              <div className="form-group col-md-6">
                <label>Experience In Healthcare Line (In Year)</label>
                <input
                  name="experience"
                  type="number"
                  placeholder="Experience In Healthcare"
                  value={form.experience}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="form-control"
                />
                {error && error.experience && (
                  <span className="text-danger">{error.experience}</span>
                )}
              </div>

              <div className="form-group col-md-6">
                <label>Qualification / Degree</label>
                <input
                  name="qualification"
                  placeholder="Qualification / Degree"
                  value={form.qualification}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="form-control"
                />
                {error && error.qualification && (
                  <span className="text-danger">{error.qualification}</span>
                )}
              </div>

              <div className="form-group col-md-6">
                <label>Pan Card</label>
                <input
                  name="pan"
                  className="form-control"
                  type="file"
                  onChange={handlePanImageChange}
                />
                {previewPanImage && (
                  <img
                    src={previewPanImage}
                    alt="Preview"
                    style={{ maxWidth: "100px", marginTop: "10px" }}
                  />
                )}
                {error && error.pan && (
                  <span className="text-danger">{error.pan}</span>
                )}
              </div>

              <div className="form-group col-md-6">
                <label>Aadhar Card</label>
                <input
                  name="aadhar_card"
                  className="form-control"
                  type="file"
                  onChange={
                    handleAadharImageChange
                  }
                />
                 {previewAadharImage && (
                  <img
                    src={previewAadharImage}
                    alt="Preview"
                    style={{ maxWidth: "100px", marginTop: "10px" }}
                  />
                )}
                {error && error.pan && (
                  <span className="text-danger">{error.pan}</span>
                )}
              </div>
              <div className="form-group col-md-12">
                <label>Licence/ Registration/ Degree</label>
                <input
                  name="licence"
                  className="form-control"
                  type="file"
                  onChange={
                    handleLicenseImageChange
                  }
                />
                {previewLicenseImage && (
                  <img
                    src={previewLicenseImage}
                    alt="Preview"
                    style={{ maxWidth: "100px", marginTop: "10px" }}
                  />
                )}
                {error && error.pan && (
                  <span className="text-danger">{error.pan}</span>
                )}
              </div>

              <div className="d-flex justify-content-between col-md-12">
                <div className="form-group col-md-8">
                  <label className="d-inline-block w-100">Profile Pic</label>
                  <input
                    name="image"
                    type="file"
                    className="form-control"
                    onChange={
                      handleProfileImageChange
                    }
                  />
                  {previewProfileImage && (
                  <img
                    src={previewProfileImage}
                    alt="Preview"
                    style={{ maxWidth: "100px", marginTop: "10px" }}
                  />
                )}
                {error && error.pan && (
                  <span className="text-danger">{error.pan}</span>
                )}
                </div>
                <div>{/* <img alt="" src={image} height={100} /> */}</div>
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
                {update && (
                  <small className="text-info">Leave Blank for keep same</small>
                )}
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
                {update && (
                  <small className="text-info">Leave Blank for keep same</small>
                )}
                {error && error.confirmPassword && (
                  <span className="text-danger">{error.confirmPassword}</span>
                )}
              </div>
              <div className="form-group">
                <label>Any Previous E-Clinic Experience</label>
                <label className="d-d-inline-block w-100">
                  <input
                    type="radio"
                    name="previus_experience_with_us"
                    onChange={(e) => handleInputChange(e.target.name, "Yes")}
                  />{" "}
                  Yes
                </label>
                <label className="d-d-inline-block w-100">
                  <input
                    type="radio"
                    name="previus_experience_with_us"
                    defaultChecked
                    onChange={(e) => handleInputChange(e.target.name, "No")}
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </form>
        </Modal.Body>
        <div className="clearfix"></div>
        <br />
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
            {update ? "Update Franchise" : "Add Franchise"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUpdate;
