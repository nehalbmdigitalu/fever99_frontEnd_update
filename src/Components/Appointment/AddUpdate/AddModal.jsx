import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../dependiencies/action";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import DropzoneComponent from "./DropzoneComponent";
import { ROLES } from "../../../constants/role";
import { storage } from "../../../dependencies/store/storage";
import { createPaymentSession, encryptCCAvenueData } from "../../Dashboard/dependencies/action";
import { loadStripe } from "@stripe/stripe-js";
import DatePicker from "react-datepicker";

function AddModal(props) {
  const { showModal, handleClose, data, mode } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, wallet } = useSelector((state) => state.login);
  const [form, setForm] = useState({ paymentMode: "Online" });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState({});
  const role = storage.getUserRole();
  const formRef = useRef(null);
  const [encRequest, setEncRequest] = useState("");
  const [accessCode, setAccessCode] = useState("");

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
      setForm({
        ...form,
        doctorId: data._id,
        timeSlot: data.timeSlot,
        timeSlotoffline: data.timeSlotoffline,
      });
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

  const createAppointment = async (e) => {
    e.preventDefault();

    let validate = validator();

    if (!isEmpty(validate)) {
      return false;
    }

    if (wallet < data.serviceCharge && role === ROLES.FRANCHISE) {
      setError({
        wallet:
          "Sorry! you don't have sufficient amount to book an appointment!",
      });
      return false;
    }
    let newForm ={...form}
    // newForm.dateTime = new Date(new Date(form.dateTime).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).toISOString();

    let res = await dispatch(
      createItem({
        ...newForm,
        expertId: user._id,
        files: uploadedFiles,
        mode: mode,
      })
    );

    if (res.status) {
      // setForm({});
      if (role === ROLES.FRANCHISE) {
        handleClose(false);
        navigate("/appointments");
      } else {
        if (form && form.paymentMode == "Offline") {
          handleClose(false);
          navigate("/appointments");
        } else {
          if (res && res.appointment && res.appointment.serviceChargepatient) {
            let req = {
              amount: res.appointment.serviceChargepatient,
              name: user.name,
              payload: {
                email: user.email,
                reidrect_url: 'https://api.fever99.com/api/handle-response',
                // reidrect_url: 'http://127.0.0.1:8000/api/handle-response',
                appointmentId: res.appointment._id
                
              }
            }
            setAccessCode(process.env.REACT_APP_CCAVENUE_ACCESS_CODE);
            dispatch(encryptCCAvenueData(req)).then((res) => {
              const {status, data} = res
              setEncRequest(data)
              setTimeout(async () => {
                await formRef.current.submit();
              }, 1000);
            })


            // await sessionStorage.setItem('appointment', JSON.stringify(res.appointment))
            // const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
            // const paymentSessionRes = await dispatch(createPaymentSession({ amount: res.serviceChargepatient }));
            // const { status, sessionId } = paymentSessionRes;
            // if (status) {
            //   await stripe.redirectToCheckout({
            //     sessionId: sessionId,
            //   });
            // }
          } else {
            handleClose(false);
            navigate("/appointments");
          }
        }
      }
    }
  };

  console.log(form)

  // const createAppointment = (e) => {
  //   e.preventDefault();

  //   let vallidate = validator();

  //   if (!isEmpty(vallidate)) {
  //     return false;
  //   }

  //   if (wallet < data.serviceCharge) {
  //     setError({
  //       wallet: "Sorry! you don't have sufficent amount to book appointment!",
  //     });
  //   }
  //   let res = dispatch(
  //     createItem({
  //       ...form,
  //       expertId: user._id,
  //       files: uploadedFiles,
  //       mode: mode,
  //     })
  //   );
  //   res.then((res) => {
  //     if (res.status) {
  //       // setForm({});
  //       if (role === ROLES.FRANCHISE) {
  //       } else {
  //         if (form && form.paymentMode == "Offline") {
  //           handleClose(false);
  //           navigate("/appointment");
  //         } else {

  //           if (res && res.amount) {
  //             const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
  //             dispatch(createPaymentSession({amount: res.amount})).then(res => {
  //               const {status, sessionId} = res
  //               if(status) {
  //                 const result = stripe.redirectToCheckout({
  //                   sessionId: sessionId
  //                 })
  //               }
  //             })
  //           }
  //         }
  //       }
  //     }
  //   });
  // };
  return (
    <>
      <Modal
        size="xl"
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
          <form
            ref={formRef}
            id="nonseamless"
            method="post"
            name="redirect"
            action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
            // action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"
          >
            <input
              type="hidden"
              id="encRequest"
              name="encRequest"
              value={encRequest}
            ></input>
            <input
              type="hidden"
              name="access_code"
              id="access_code"
              value={accessCode}
            ></input>
          </form>

          <form onSubmit={(e) => createAppointment(e)}>
            <div className="row">
              <div className="form-group col-md-4">
                <label>Date:</label>
                {/* <input
                  type="date"
                  name="dateTime"
                  className="form-control"
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                /> */}
                <DatePicker
                  className="form-control"
                  minDate={new Date()}
                  title="Select Date"
                  name="dateTime"
                  selected={form.dateTime}
                  placeholderText="Select Date"
                  onChange={(e) => handleInputChange("dateTime", e)}
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
                  {mode == "Video" &&
                    form &&
                    form.timeSlot &&
                    form.timeSlot.map((d, index) => (
                      <option key={index} value={d.value}>
                        {d.value}
                      </option>
                    ))}

                  {mode !== "Video" &&
                    form &&
                    form.timeSlotoffline &&
                    form.timeSlotoffline.map((d, index) => (
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
            {mode === "Video" && (
              <>
                <hr />
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>
                      BP <b className="text-danger">mm of Hg</b> (Optional)
                    </label>
                    <input
                      name="bp"
                      type="text"
                      className="form-control"
                      placeholder='Eg: "120/80" mm of Hg'
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>
                      Pulse <b className="text-danger">Per minute</b> (Optional)
                    </label>
                    <input
                      name="pulse"
                      type="text"
                      className="form-control"
                      placeholder='Eg: "80" Per Minute'
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>
                      Body Temperature <b className="text-danger">℉</b>{" "}
                      (Optional){" "}
                    </label>
                    <input
                      name="bodyTemperature"
                      type="text"
                      className="form-control"
                      placeholder="Eg: 98 ℉"
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      S<sub>P</sub>O<sub>2</sub> % (Optional)
                    </label>
                    <input
                      name="oxigne"
                      type="text"
                      className="form-control"
                      placeholder="Eg: 98%"
                      onChange={(e) =>
                        handleInputChange(e.target.name, e.target.value)
                      }
                    />
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label>
                        Fasting Sugar <b className="text-danger">mg/dL</b> (FBS)
                      </label>
                      <input
                        name="suger1"
                        type="text"
                        className="form-control"
                        placeholder="Fasting Sugar (mg/dL) (FBS)"
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>
                        Postprandial Sugar <b className="text-danger">mg/dL</b>{" "}
                        (PPBS)
                      </label>
                      <input
                        name="suger2"
                        type="text"
                        className="form-control"
                        placeholder="Postprandial Sugar (PPBS)"
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                    <div className="form-group col-md-4">
                      {/* <label>Hemoglobin A1c (HbA1c)</label> */}
                      <label>
                        Random Sugar <b className="text-danger">mg/dL</b>
                      </label>
                      <input
                        name="suger3"
                        type="text"
                        className="form-control"
                        placeholder="Random Sugar (mg/dL)"
                        onChange={(e) =>
                          handleInputChange(e.target.name, e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <DropzoneComponent
                      uploadedFile={(file) => handleUploadFile(file)}
                    />
                  </div>
                </div>
              </>
            )}

            {mode === "Video" && (
              <div className="form-group">
                <label>
                  Send You Medical History On What's App{" "}
                  <i class="fab fa-whatsapp" style={{ color: "#42df16" }}></i>{" "}
                  <a href="https://wa.me/+916262808062" target="_blank">
                    Send Now
                  </a>
                </label>
              </div>
            )}
            {role === ROLES.PATIENT && mode !== "Video" && (
              <div className="form-group">
                <label className="w-100">Payment Mode</label>
                <label className="w-100">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="Online"
                    defaultChecked
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />{" "}
                  Pay Online
                </label>
                <label className="w-100">
                  <input
                    type="radio"
                    name="paymentMode"
                    value="Offline"
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  />{" "}
                  Pay at Clinic
                </label>
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => createAppointment(e)}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddModal;
