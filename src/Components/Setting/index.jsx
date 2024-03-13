import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../../constants/role";
import Select from "react-select";
import { storage } from "../../dependencies/store/storage";
import differenceInSeconds from "date-fns/fp/differenceInSeconds/index";
import { updateSlot } from "../EditProfile/dependiencies/action";
import { getDocumentLink } from "../../dependencies/utils/helper";

function Setting(props) {
  const [form, setForm] = useState({});
  const { user } = useSelector((state) => state.login);
  const [options, setOption] = useState([]);
  const dispatch = useDispatch();

  const role = storage.getUserRole();
  useEffect(() => {
    setForm(user);
  }, [user]);

  useEffect(() => {
    const startTime = new Date("2000-01-01 12:00 AM");
    const endTime = new Date("2000-01-02 12:00 AM");
    const interval = 15;

    let currentTime = startTime;

    while (currentTime < endTime) {
      const formattedTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const addedMunite = currentTime.setMinutes(
        currentTime.getMinutes() + interval
      );

      const extraFormated = new Date(addedMunite).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setOption((old) => [
        ...old,
        {
          value: `${formattedTime} ${extraFormated}`,
          label: `${formattedTime} ${extraFormated}`,
        },
      ]);
    }
  }, []);
  const handleTimeSlotChange = (value) => {
    setForm({ ...form, timeSlot: value });
  };
  const handleTimeSlotChangeOffline = (value) => {
    setForm({ ...form, timeSlotoffline: value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSlot({ timeSlot: form.timeSlot, timeSlotoffline: form.timeSlotoffline }));
  };
  console.log('form', form)
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
                            readOnly
                            name="name"
                            class="form-control floating"
                            value={form.name}
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
            {role === ROLES.DOCTOR && (
              <>
                <div class="card-box">
                  <h3 class="card-title">
                    Avaliable time slot For Appointment 
                  </h3>
                  <div class="row">
                    <div className="form-group">
                      <label>Select Time Slot (Online)</label>
                      <Select
                        options={options}
                        closeMenuOnSelect={false}
                        isMulti
                        value={form.timeSlot}
                        onChange={(e) => handleTimeSlotChange(e)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Select Time Slot (Offline)</label>
                      <Select
                        options={options}
                        closeMenuOnSelect={false}
                        isMulti
                        value={form.timeSlotoffline}
                        onChange={(e) => handleTimeSlotChangeOffline(e)}
                      />
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

export default Setting;
