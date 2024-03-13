import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../dependencies/store/storage";
import { ROLES } from "../../constants/role";
import Select from "react-select";
import { updateProfile } from "../EditProfile/dependiencies/action";
import { getDocumentLink } from "../../dependencies/utils/helper";

function MyProfile() {
  const [form, setForm] = useState({});
  const { user } = useSelector((state) => state.login);
  const [options, setOption] = useState([]);
  const dispatch = useDispatch();

  const role = storage.getUserRole();
  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleInputChange = (name, value) => {
    setForm({...form, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(form));
  }
  return (
    <>
      <div class="page-wrapper">
        <div class="content">
          <div class="row">
            <div class="col-sm-12">
              <h4 class="page-title">Settings</h4>
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="card-box">
              <h3 class="card-title">Basic Informations</h3>
              <div class="row">
                <div class="col-md-12">
                  <div class="profile-img-wrap">
                    <img class="inline-block" src={getDocumentLink(form.image)} alt="user" />
                    {/* <div class="fileupload btn">
                      <span class="btn-text">edit</span>
                      <input class="upload" type="file" />
                    </div> */}
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
                            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                          />
                        </div>
                      </div>
                      {ROLES.DOCTOR == role && (
                        <div class="col-md-6">
                          <div class="form-group form-focus">
                            <label class="focus-label">
                              Appointment per charge Rs.
                            </label>
                            <input
                              type="text"
                              name="serviceCharge"
                              readOnly
                              class="form-control floating"
                              value={form.serviceCharge}
                            />
                          </div>
                        </div>
                      )}

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
                          <input
                            value={form.gender}
                            name="gender"
                            readOnly
                            type="text"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {role === ROLES.PATIENT && (
              <>
                <div class="card-box">
                  
                  <div class="row">
                    <div className="form-group">
                      <label>ABHA ID</label>
                      <input name="abhaid" type="text" className="form-control" placeholder="ABHA ID" onChange={(e) => handleInputChange(e.target.name, e.target.value)}  />
                    </div>
                  </div>
                </div>

                <div class="text-center m-t-20">
                  <button
                    class="btn btn-primary submit-btn"
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
