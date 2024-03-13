import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getStateCity } from "../../Dashboard/dependencies/action";
import { getDocumentLink } from "../../../dependencies/utils/helper";
import Select from "react-select";

function AddUpdate(props) {
  const {
    handleClose,
    show,
    handleAdd,
    handleUpdate,
    data: { rowData },
  } = props;
  const { user } = useSelector((state) => state.login);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [update, setUpdate] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewMou, setPreviewMou] = useState(null);

  const { stateList } = useSelector((state) => state.stateCity);
  const [city, setCity] = useState([]);
  const dispach = useDispatch();
  const [spaciliaOther, setSpacialzation] = useState(false);
  const [languageOptions, setlanguageOption] = useState([
    { label: "English", value: "English" },
    { label: "Assamese", value: "Assamese" },
    { label: "Bengali", value: "Bengali" },
    { label: "Gujarati", value: "Gujarati" },
    { label: "Hindi", value: "Hindi" },
    { label: "Kannada", value: "Kannada" },
    { label: "Kashmiri", value: "Kashmiri" },
    { label: "Konkani", value: "Konkani" },
    { label: "Malayalam", value: "Malayalam" },
    { label: "Manipuri", value: "Manipuri" },
    { label: "Marathi", value: "Marathi" },
    { label: "Nepali", value: "Nepali" },
    { label: "Oriya", value: "Oriya" },
    { label: "Punjabi", value: "Punjabi" },
    { label: "Sanskrit", value: "Sanskrit" },
    { label: "Sindhi", value: "Sindhi" },
    { label: "Tamil", value: "Tamil" },
    { label: "Telugu", value: "Telugu" },
    { label: "Urdu ", value: "Urdu " },
    { label: "Bodo", value: "Bodo" },
    { label: "Santhali", value: "Santhali" },
    { label: "Maithili", value: "Maithili" },
    { label: "Dogri", value: "Dogri" },
  ]);

  useEffect(() => {
    if (!show) {
      setForm({});
      setUpdate(false);
    }
    dispach(getStateCity());
  }, [show]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleInputChange(e.target.name, file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleMouChange = (e) => {
    const file = e.target.files[0];
    handleInputChange(e.target.name, file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewMou(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewMou(null);
    }
  };
  const handleStateChange = (e) => {
    let id = e.target.value;

    let state = stateList.filter((e) => e._id == id);

    if (state && state.length > 0) {
      handleInputChange("state", state[0].state);
      setCity(state[0].city);
    }
  };

  useEffect(() => {
    if (!isEmpty(rowData)) {
      let newData = {
        ...rowData,
        degree: rowData.userExtraDetails.degree,
        registrationNumber: rowData.userExtraDetails.registrationNumber,
        totalExperience: rowData.userExtraDetails.totalExperience,
        currentOrganization: rowData.userExtraDetails.currentOrganization,
        whatsappNumber: rowData.userExtraDetails.whatsappNumber,
        panNumber: rowData.userExtraDetails.panNumber,
        aadharNumber: rowData.userExtraDetails.aadharNumber,
        mou: rowData.userExtraDetails.mou,
        dob: rowData.userExtraDetails.dob
          ? new Date(rowData.userExtraDetails.dob).toISOString().split("T")[0]
          : "",
      };

      if (rowData && rowData.userExtraDetails) {
        setForm(newData);
      } else {
        setForm(rowData);
      }

      let state = stateList.filter((e) => e.state == form.state);

      if (state && state.length > 0) {
        setCity(state[0].city);
      } else {
        setCity([rowData.city]);
      }

      setUpdate(true);
    }
  }, [rowData]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const emailValidate = (email) => {
    let tester =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email) return false;

    var emailParts = email.split("@");

    if (emailParts.length !== 2) return false;

    var account = emailParts[0];
    var address = emailParts[1];

    if (account.length > 64) return false;
    else if (address.length > 255) return false;

    var domainParts = address.split(".");

    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    )
      return false;

    return tester.test(email);
  };

  const isValidMobileNumber = (number) => {
    const pattern = /^[0-9]{10}$/;
    return pattern.test(number);
  };

  const validator = () => {
    let errors = {};
    if (!form.name) {
      errors = { ...errors, name: "This field is required!" };
    }
    if (!form.mobile) {
      errors = { ...errors, mobile: "This field is required!" };
    } else if (!isValidMobileNumber(form.mobile)) {
      errors = { ...errors, mobile: "Mobile is not valid!" };
    }
    if (!form.email) {
      errors = { ...errors, email: "This field is required!" };
    } else if (!emailValidate(form.email)) {
      errors = { ...errors, email: "Email is not valid!" };
    }
    if (!form.gender) {
      errors = { ...errors, gender: "This field is required!" };
    }
    if (!form.serviceCharge) {
      errors = { ...errors, serviceCharge: "This field is required!" };
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
    if (!form.specialization) {
      errors = { ...errors, specialization: "This field is required!" };
    }
    if (form.whatsappNumber && !isValidMobileNumber(form.whatsappNumber)) {
      errors = { ...errors, whatsappNumber: "This field is required!" };
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
    if (!form.serviceCharge) {
      errors = { ...errors, serviceCharge: "This field is required!" };
    }
    if (!form.address) {
      errors = { ...errors, address: "This field is required!" };
    }
    if (!form.specialization) {
      errors = { ...errors, specialization: "This field is required!" };
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

    let forFata = new FormData();

    Object.entries(form).map((entry) => {

      const [key, value] = entry;
      if(key == 'languageKnown') {
        forFata.append(key, JSON.stringify(value));
      }else {
        forFata.append(key, value);
      }
      
    });


    handleAdd(forFata);
  };
  const handleUpdateClick = (e) => {
    e.preventDefault();
    let vallidate = validatorUpdate();

    if (!isEmpty(vallidate)) {
      return false;
    }

    let forFata = new FormData();

    Object.entries(form).map((entry) => {
      const [key, value] = entry;
      forFata.append(key, value);
    });

    handleUpdate(form._id, forFata);
  };
  const handleChangeAvaliableUser = (name, value) => {
    if (form[name]) {
      handleInputChange(name, false);
    } else {
      handleInputChange(name, true);
    }
  };

  const handleSpaciliagationChange = (e) => {
    if (e.target.value === "Others") {
      setSpacialzation(true);
    } else {
      handleInputChange(e.target.name, e.target.value);
      setSpacialzation(false);
    }
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
          <span>{update ? "Update Doctor" : "Add Doctor"}</span>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
                <label>Known Language</label>
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={[]}
                  isMulti
                  options={languageOptions}
                  name="languageKnown"
                  onChange={(e) => handleInputChange('languageKnown', e)}
                />
              </div>

              <div className="form-group col-md-3">
                <label>Specialization</label>
                {/* <input
                  type="text"
                  name="specialization"
                  value={form.specialization}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  placeholder="Specialization"
                  className="form-control"
                /> */}
                <select
                  name="specialization"
                  className="form-select"
                  onChange={(e) => handleSpaciliagationChange(e)}
                  value={form.specialization}
                >
                  <option value="">--Select One--</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Consultant Physician">
                    Consultant Physician
                  </option>
                  <option value="General Surgeon">General Surgeon</option>
                  <option value="OBS Gynaecologist">OBS & Gynaecologist</option>
                  <option value="Paediatrician">Paediatrician</option>
                  <option value="Orthopaedician">Orthopaedician</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pulmonologist">Pulmonologist</option>
                  <option value="Psychiatrist">Psychiatrist</option>
                  <option value="ENT Surgeon">ENT Surgeon</option>
                  <option value="Ophthalmologist">Ophthalmologist</option>
                  <option value="Emergency Medicine">Emergency Medicine</option>
                  <option value="Diabetologist">Diabetologist</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Cardiac Surgeon">Cardiac Surgeon</option>
                  <option value="Nephrologist">Nephrologist</option>
                  <option value="Urologist">Urologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                  <option value="GI Surgeon">GI Surgeon</option>
                  <option value="Neurophysician">Neurophysician</option>
                  <option value="Neurosurgeon">Neurosurgeon</option>
                  <option value="Neonatologist">Neonatologist</option>
                  <option value="Endocrinologist">Endocrinologist</option>
                  <option value="Rheumatologist">Rheumatologist</option>
                  <option value="Oncologist">Oncologist</option>
                  <option value="Onco Surgeon">Onco Surgeon</option>
                  <option value="Haematologist">Haematologist</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Physiotherapist">Physiotherapist</option>
                  <option value="Dietetician">Dietetician</option>
                  <option value="Clinical Nutritionist">
                    Clinical Nutritionist
                  </option>
                  <option value="Psychologist">Psychologist</option>
                  <option value="Homoeopathy Specialist">
                    Homoeopathy Specialist
                  </option>
                  <option value="Ayurveda Specialist">
                    Ayurveda Specialist
                  </option>
                  <option value="Unani Specialist">Unani Specialist</option>
                  <option value="Electrohomeopathy Spcl.">
                    Electrohomeopathy Spcl.
                  </option>
                  <option value="Sexologist">Sexologist</option>
                  <option value="Others">Others</option>
                </select>

                {error && error.specialization && (
                  <span className="text-danger">{error.specialization}</span>
                )}
              </div>
              {spaciliaOther && (
                <div className="form-group col-md-3">
                  <label>Other</label>
                  <input
                    name="specialization"
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    className="form-control"
                    placeholder="Others"
                  />
                </div>
              )}
              <div className="form-group col-md-3">
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
              <div className="form-group col-md-3">
                <label>Fee at E-Clinic</label>
                <input
                  name="serviceCharge"
                  placeholder="Amount"
                  type="number"
                  min={0}
                  value={form.serviceCharge}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="form-control"
                />
                {error && error.serviceCharge && (
                  <span className="text-danger">{error.serviceCharge}</span>
                )}
              </div>

              <div className="form-group col-md-3">
                <label>Fee for Patient</label>
                <input
                  name="serviceChargepatient"
                  placeholder="Amount"
                  type="number"
                  min={0}
                  value={form.serviceChargepatient}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  className="form-control"
                />
                {error && error.serviceChargepatient && (
                  <span className="text-danger">
                    {error.serviceChargepatient}
                  </span>
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
                {error && error.serviceCharge && (
                  <span className="text-danger">{error.serviceCharge}</span>
                )}
              </div>
              <div className="form-group col-md-6">
                <label>State</label>
                <select
                  className="form-control"
                  onChange={(e) => handleStateChange(e)}
                >
                  <option>--Select One--</option>
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
                  className="form-control"
                  name="city"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                >
                  <option>--Select One--</option>
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
            </div>
            <hr />
            <div className="row">
              {/* extra details begain */}
              <div className="form-group col-md-4">
                <label>Degree</label>
                <input
                  name="degree"
                  className="form-control"
                  placeholder="Degree"
                  value={form.degree}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </div>
              <div className="form-group col-md-4">
                <label>Registration Number</label>
                <input
                  name="registrationNumber"
                  className="form-control"
                  placeholder="Registration Number"
                  value={form.registrationNumber}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </div>

              <div className="form-group col-md-4">
                <label>Total Experience (In Year)</label>
                <input
                  name="totalExperience"
                  type="number"
                  min={0}
                  className="form-control"
                  placeholder="Total Experience"
                  value={form.totalExperience}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </div>
              <div className="form-group col-md-4">
                <label>Current Oragnization</label>
                <input
                  name="currentOrganization"
                  className="form-control"
                  placeholder="Current Oragnization"
                  value={form.currentOrganization}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </div>
              <div className="form-group col-md-4">
                <label>WhatsApp Number</label>
                <input
                  type="number"
                  name="whatsappNumber"
                  className="form-control"
                  placeholder="WhatsApp Number"
                  value={form.whatsappNumber}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
                {error && error.whatsappNumber && (
                  <span className="text-danger">{error.whatsappNumber}</span>
                )}
              </div>
              <div className="form-group col-md-4">
                <label>Date Of Birth</label>
                <input
                  name="dob"
                  type="date"
                  className="form-control"
                  placeholder="DOB"
                  value={form.dob}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </div>
              <div className="form-group col-md-6">
                <label>Pan Number</label>
                <input
                  name="panNumber"
                  className="form-control"
                  placeholder="Pan Number"
                  value={form.panNumber}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </div>
              <div className="form-group col-md-6">
                <label>Aadhar Number</label>
                <input
                type="number"
                  name="aadharNumber"
                  className="form-control"
                  placeholder="Aadhar Number"
                  value={form.aadharNumber}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                />
              </div>
              <div className="form-group col-md-6">
                <label className="w-100">Doctor Avaliable For</label>
                {/* userAvaliableFor:  */}
                <label className="w-100">
                  <input
                    type="checkbox"
                    defaultChecked={form.userAvaliableForonPatient}
                    name="userAvaliableForonPatient"
                    onChange={(e) =>
                      handleChangeAvaliableUser(e.target.name, e.target.checked)
                    }
                  />{" "}
                  Patient
                </label>
                <label className="w-100">
                  <input
                    type="checkbox"
                    defaultChecked={form.userAvaliableForFranchise}
                    name="userAvaliableForFranchise"
                    onChange={(e) =>
                      handleChangeAvaliableUser(e.target.name, e.target.checked)
                    }
                  />{" "}
                  Franchise
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
  <div className="form-group col-md-8">
    <label>MOU Document</label>
    <input
      type="file"
      name="mou"
      className="form-control"
      placeholder="MOU Document"
      onChange={(e) => handleMouChange(e)}
    />
  </div>
  <div className="col-md-4">
  {previewMou && (
                  <img
                    src={previewMou}
                    alt="Preview"
                    style={{ maxWidth: "100px" }}
                  />
                )}
                {update && !previewMou && (
                  <img
                    src={getDocumentLink(form.mou)}
                    alt="Preview"
                    style={{ maxWidth: "100px" }}
                  />
                )}
  </div>
</div>


<div style={{ display: "flex", justifyContent: "space-between" }}>
  <div className="form-group col-md-8">
    <label>Profile Pic</label>
    <input
      type="file"
      name="image"
      className="form-control"
      onChange={(e) =>
        handleImageChange(e)}
    />
  </div>
  <div className="col-md-4">
  {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{ maxWidth: "100px" }}
                  />
                )}
                {update && !previewImage && (
                  <img
                    src={getDocumentLink(form.image)}
                    alt="Preview"
                    style={{ maxWidth: "100px" }}
                  />
                )}
  </div>
</div>


              {/* extra details end  */}
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
            onClick={(e) => (update ? handleUpdateClick(e) : handleAddData(e))}
          >
            {update ? "Update Doctor" : "Add Doctor"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUpdate;
