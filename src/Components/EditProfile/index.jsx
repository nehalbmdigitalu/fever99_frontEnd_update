import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { passwordChange, updateProfile } from "./dependiencies/action";
import { getDocumentLink } from "../../dependencies/utils/helper";
import { isEmpty } from "lodash";
import { storage } from "../../dependencies/store/storage";
import { ROLES } from "../../constants/role";

function EditProfile() {
  const { user } = useSelector((state) => state.login);
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState({});
  const role = storage.getUserRole();
  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let forFata = new FormData();
    let newForm = { ...form };
    delete newForm["pinCode"];
    Object.entries(newForm).map((entry) => {
      const [key, value] = entry;
      forFata.append(key, value);
    });

    dispatch(updateProfile(forFata));
  };

  const validator = () => {
    let errors = {};
    if (!form.oldPassword) {
      errors = { ...errors, oldPassword: "This field is required!" };
    }
    if (!form.newPassword) {
      errors = { ...errors, newPassword: "This field is required!" };
    }
    if (!form.confirmPassword) {
      errors = { ...errors, confirmPassword: "This field is required!" };
    } else if (form.newPassword !== form.confirmPassword) {
      errors = {
        ...errors,
        confirmPassword: "New password and confirm password is not same!",
      };
    }

    setError(errors);

    return errors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      handleInputChange("image", file);
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();

    let vallidate = validator();

    if (!isEmpty(vallidate)) {
      return false;
    }

    dispatch(
      passwordChange({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      })
    );
  };

  return (
    <>
      <div class="page-wrapper">
        <div class="content">
          <div class="row">
            <div class="col-sm-12">
              <h4 class="page-title">Edit Profile</h4>
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="card-box">
              <h3 class="card-title">Basic Informations</h3>
              <div class="row">
                <div class="col-md-12">
                  <div class="profile-img-wrap">
                    {previewImage ? (
                      <img class="inline-block" src={previewImage} alt="user" />
                    ) : (
                      <img
                        class="inline-block"
                        src={getDocumentLink(form.image)}
                        alt="user"
                      />
                    )}

                    <div class="fileupload btn">
                      <span class="btn-text">edit</span>
                      <input
                        class="upload"
                        type="file"
                        onChange={(e) => handleImageChange(e)}
                      />
                    </div>
                  </div>
                  <div class="profile-basic">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group form-focus">
                          <label class="focus-label">Name</label>
                          <input
                            type="text"
                            name="name"
                            class="form-control floating"
                            value={form.name}
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                          />
                        </div>
                      </div>
                      {role === ROLES.DOCTOR && (
                        <div class="col-md-6">
                          <div class="form-group form-focus">
                            <label class="focus-label">
                              Appointment per charge Rs.
                            </label>
                            <input
                              type="number"
                              name="serviceCharge"
                              class="form-control floating"
                              value={form.serviceCharge}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                            />
                          </div>
                        </div>
                      )}

                      {/* <div class="col-md-6">
											<div class="form-group form-focus">
												<label class="focus-label">Birth Date</label>
												<div class="input-group date" id="datetimepicker1"
													data-target-input="nearest">
													<input type="text" value="05/06/1985"
														class="form-control datetimepicker-input"
														data-target="#datetimepicker1" />
													<div class="input-group-append" data-target="#datetimepicker1"
														data-toggle="datetimepicker">
														<div class="input-group-text"><i
																class="fas fa-calendar-alt"></i></div>
													</div>
												</div>
											</div>
										</div> */}
                      <div className="col-md-6">
                        <div class="form-group form-focus">
                          <label class="focus-label">Email</label>
                          <input
                            type="text"
                            class="form-control floating"
                            value={form.email}
                            readOnly
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group form-focus select-focus">
                          <label class="focus-label">Gendar</label>
                          <select
                            class="select form-control floating"
                            name="gender"
                            onChange={(e) =>
                              handleInputChange(e.target.name, e.target.value)
                            }
                          >
                            <option
                              value="Male"
                              selected={form.gender === "Male" ? true : false}
                            >
                              Male
                            </option>
                            <option
                              value="Female"
                              selected={form.gender === "Female" ? true : false}
                            >
                              Female
                            </option>
                            <option
                              value="Other"
                              selected={form.gender === "Other" ? true : false}
                            >
                              Other
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-box">
              <h3 class="card-title">Contact Informations</h3>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group form-focus">
                    <label class="focus-label">Address</label>
                    <input
                      type="text"
                      class="form-control floating"
                      value={form.address}
                      name="address"
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">State</label>
                    <input
                      type="text"
                      class="form-control floating"
                      value={form.state}
                      name="state"
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Country</label>
                    <input
                      type="text"
                      class="form-control floating"
                      value="India"
                      readOnly
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Pin Code</label>
                    <input
                      type="text"
                      class="form-control floating"
                      value={form.pinCode}
                      name="pinCode"
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Phone Number</label>
                    <input
                      type="text"
                      class="form-control floating"
                      value={form.mobile}
                      name="mobile"
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                </div>
                {role === ROLES.DOCTOR && (
                  <div class="col-md-4">
                    <div class="form-group form-focus">
                      <label class="focus-label">Specialization</label>
                      <input
                        type="text"
                        class="form-control floating"
                        value={form.specialization}
                        name="specialization"
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div class="card-box">
              <h3 class="card-title">Change Password</h3>
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="focus-label">Old Password</label>
                    <input
                      type="password"
                      class="form-control"
                      value={form.oldPassword}
                      name="oldPassword"
                      placeholder="Old Password"
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {error && error.oldPassword && (
                      <span className="text-danger d-inline-block w-100">
                        {error.oldPassword}
                      </span>
                    )}
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="focus-label">New Password</label>
                    <input
                      type="password"
                      class="form-control floating"
                      value={form.newPassword}
                      name="newPassword"
                      placeholder="New Password"
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {error && error.newPassword && (
                      <span className="text-danger d-inline-block w-100">
                        {error.newPassword}
                      </span>
                    )}
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label class="focus-label">Confirm Password</label>
                    <input
                      type="password"
                      class="form-control floating"
                      value={form.confirmPassword}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                    {error && error.confirmPassword && (
                      <span className="text-danger d-inline-block w-100">
                        {error.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div class="add-more d-flex justify-content-end">
                <a
                  href="#"
                  class="btn btn-primary"
                  onClick={(e) => handleChangePassword(e)}
                >
                  Change Password
                </a>
              </div>
            </div>

            {/*  <div class="card-box">
              <h3 class="card-title">Education Informations</h3>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Institution</label>
                    <input
                      type="text"
                      class="form-control floating"
                      value="Oxford University"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Subject</label>
                    <input
                      type="text"
                      class="form-control floating"
                      value="Computer Science"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Starting Date</label>
                    <div
                      class="input-group date"
                      id="datetimepicker2"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        value="01/06/2002"
                        class="form-control datetimepicker-input"
                        data-target="#datetimepicker2"
                      />
                      <div
                        class="input-group-append"
                        data-target="#datetimepicker2"
                        data-toggle="datetimepicker"
                      >
                        <div class="input-group-text">
                          <i class="fas fa-calendar-alt"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Complete Date</label>
                    <div
                      class="input-group date"
                      id="datetimepicker5"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        value="01/06/2002"
                        class="form-control datetimepicker-input"
                        data-target="#datetimepicker5"
                      />
                      <div
                        class="input-group-append"
                        data-target="#datetimepicker5"
                        data-toggle="datetimepicker"
                      >
                        <div class="input-group-text">
                          <i class="fas fa-calendar-alt"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Degree</label>
                    <input
                      type="text"
                      class="form-control floating"
                      value="BE Computer Science"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Grade</label>
                    <input
                      type="text"
                      class="form-control floating"
                      value="Grade A"
                    />
                  </div>
                </div>
              </div>
              <div class="add-more">
                <a href="#" class="btn btn-primary">
                  <i class="fa fa-plus"></i> Add More Institute
                </a>
              </div>
            </div>
            
            <div class="card-box">
              <h3 class="card-title">Experience Informations</h3>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Company Name</label>
                    <input
                      type="text"
                      class="form-control floating"
                      value="Digital Devlopment Inc"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Location</label>
                    <input
                      type="text"
                      class="form-control floating"
                      value="United States"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Job Position</label>
                    <input
                      type="text"
                      class="form-control floating"
                      value="Web Developer"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Period From</label>
                    <div
                      class="input-group date"
                      id="datetimepicker6"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        value="01/06/2002"
                        class="form-control datetimepicker-input"
                        data-target="#datetimepicker6"
                      />
                      <div
                        class="input-group-append"
                        data-target="#datetimepicker6"
                        data-toggle="datetimepicker"
                      >
                        <div class="input-group-text">
                          <i class="fas fa-calendar-alt"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group form-focus">
                    <label class="focus-label">Period To</label>
                    <div
                      class="input-group date"
                      id="datetimepicker7"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        value="01/06/2002"
                        class="form-control datetimepicker-input"
                        data-target="#datetimepicker7"
                      />
                      <div
                        class="input-group-append"
                        data-target="#datetimepicker7"
                        data-toggle="datetimepicker"
                      >
                        <div class="input-group-text">
                          <i class="fas fa-calendar-alt"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add-more">
                <a href="#" class="btn btn-primary">
                  <i class="fa fa-plus"></i> Add More Experience
                </a>
              </div>
            </div> */}
            <div class="text-center m-t-20">
              <button
                class="btn btn-primary submit-btn"
                type="button"
                onClick={(e) => handleSubmit(e)}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
