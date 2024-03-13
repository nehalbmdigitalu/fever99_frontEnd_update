import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ScheduleFollowUp,
  addHistory,
  fileUpload,
  getItemById,
  prescriptionById,
  updateAppointment,
} from "../dependiencies/action";
import { Link, useParams } from "react-router-dom";
import patient from "../../../assets/img/doctor-thumb-02.jpg";
import io from "socket.io-client";
import { isEmpty } from "lodash";
import { storage } from "../../../dependencies/store/storage";
import { ROLES } from "../../../constants/role";
import "./message.style.scss";
import { getDocumentLink } from "../../../dependencies/utils/helper";
import AddPrescription from "../AddPrescription";
import PDFGenerator from "../../common/PDFGenerator";
import FlowwUp from "./FlowwUp";
import DropzoneComponent from "../AddUpdate/DropzoneComponent";
import moment from "moment";
import EditPrescription from "../EditPrescription";

function AppointmentView() {
  const chatBoxRef = useRef(null);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [messages, setMessages] = useState("");
  const [apntHistory, setApntHistory] = useState([]);
  const { user } = useSelector((state) => state.login);
  const role = storage.getUserRole();
  const params = useParams();
  const [form, setForm] = useState({});
  const [prescriptionContent, setPrescriptionContent] = useState("");
  const [prescriptionRow, setPrescriptionRow] = useState(null);
  const [showAddprescription, setShowAddPrescription] = useState(false);
  const id = params.id;
  const socket = io(process.env.REACT_APP_API_BASE);
  const [flowUpModal, setFlowUpModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [showEditprescription, setShowEditPrescription] = useState(false);

  useEffect(() => {
    dispatch(getItemById(id)).then((res) => {
      setData(res);
      setForm(res);
      if (res && res.history) {
        let newNewHistoru = res.history.sort(
          (a, b) => b.timestamp - a.timestamp
        );
        setApntHistory(newNewHistoru);
        setUploadedFiles(res.files);
      }
    });
    if (!isEmpty(user)) {
      socket.emit("join", user._id);
    }
  }, [id]);

  useEffect(() => {
    if (!showEditprescription) {
      dispatch(getItemById(id)).then((res) => {
        setData(res);
        setForm(res);
        if (res && res.history) {
          let newNewHistoru = res.history.sort(
            (a, b) => b.timestamp - a.timestamp
          );
          setApntHistory(newNewHistoru);
          setUploadedFiles(res.files);
        }
      });
    }
  }, [showEditprescription]);

  const handleUploadFile = (file) => {
    setUploadedFiles((prevUploadedFiles) => [
      ...prevUploadedFiles,
      { fileName: file },
    ]);
  };

  const handleUpdateAppointment = (e) => {
    e.preventDefault();
    let {
      bp,
      oxigne,
      bodyTemperature,
      pulse,
      suger1,
      suger2,
      suger3,
      respiratoryRate,
    } = form;
    dispatch(
      updateAppointment(form._id, {
        bp,
        oxigne,
        bodyTemperature,
        pulse,
        suger1,
        suger2,
        suger3,
        respiratoryRate,
        files: uploadedFiles,
      })
    ).then((res) => {});
  };

  useEffect(() => {
    socket.on(user._id, (data) => {
      setApntHistory((prevData) => [...prevData, data]);
    });

    return () => {
      //   socket.emit("leave", data.expert);
    };
  }, []);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let toUserId = "";
    if (ROLES.DOCTOR === role) {
      toUserId = data.expert;
    } else {
      toUserId = data.doctor._id;
    }

    socket.emit("message", {
      toUserId: toUserId,
      message: messages,
      userId: user._id,
      type: "text",
    });
    setMessages("");

    setApntHistory([
      ...apntHistory,
      {
        toId: toUserId,
        message: messages,
        fromId: user._id,
        type: "text",
      },
    ]);

    dispatch(
      addHistory(data._id, { message: messages, toId: toUserId, type: "text" })
    );
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [apntHistory]);

  const handleSchedileFloip = (flowUpa) => {
    dispatch(ScheduleFollowUp(data._id, flowUpa)).then((res) => {
      if (res.status) {
        dispatch(getItemById(id)).then((res) => {
          setData(res);
          setForm(res);
          if (res && res.history) {
            let newNewHistoru = res.history.sort(
              (a, b) => b.timestamp - a.timestamp
            );
            setApntHistory(newNewHistoru);
          }
        });

        setFlowUpModal(false);
      }
    });
  };

  const downloadPrescription = (id, name) => {
    dispatch(prescriptionById(id)).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "prescription.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const handleEditPrescription = (rowData) => {
    setShowEditPrescription(true);
    setPrescriptionRow(rowData);
  };

  const handleEditPrescriptionShow = (value) => {
    setShowEditPrescription(value);
    setPrescriptionRow(null);
  };
  const HandleFileBtnClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const allowedFile = [
      "image/png",
      "application/pdf",
      "image/jpeg",
      "image/jpg",
    ];
    const selectedFile = e.target.files[0];
    const file = new FormData();
    file.append("file", selectedFile);

    let toUserId = "";
    if (ROLES.DOCTOR === role) {
      toUserId = data.expert;
    } else {
      toUserId = data.doctor._id;
    }

    if (allowedFile.includes(selectedFile.type)) {
      dispatch(fileUpload(file)).then((res) => {
        fileInputRef.current.value = null;
        // const {status, data} = res
        dispatch(
          addHistory(data._id, {
            message: res.data,
            toId: toUserId,
            type: selectedFile.type,
          })
        );

        socket.emit("message", {
          toUserId: toUserId,
          message: res.data,
          userId: user._id,
          type: selectedFile.type,
        });

        setApntHistory([
          ...apntHistory,
          {
            toId: toUserId,
            message: res.data,
            fromId: user._id,
            type: selectedFile.type,
          },
        ]);
      });
    } else {
      fileInputRef.current.value = null;
      alert("Only Files alloed is PNG, JPEG, JPG  and PDF");
    }
  };

  const renderTextMessage = (index, data) => (
    <label key={index}>{data.message}</label>
  );

  const renderPdfMessage = (data) => (
    <a target="_blank" href={getDocumentLink(data.message)}>
      Download PDF
    </a>
  );

  const renderImageMessage = (data) => (
    <a href={getDocumentLink(data.message)} target="_blank">
      <img
        src={getDocumentLink(data.message)}
        alt={getDocumentLink(data.message)}
        height={90}
      />
    </a>
  );
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-8 offset-md-1">
              <h4 className="page-title">View Appointment</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="card mb-0">
                <div className="card-body">
                  <div style={{ display: "flex", justifyContent: "start" }}>
                    <a href="" class="avatar">
                      <img
                        alt="Cristina Groves"
                        src={getDocumentLink(user.image)}
                        class="img-fluid rounded-circle"
                      />
                    </a>
                    <div class="chat-content">
                      {role === ROLES.DOCTOR ? (
                        <>
                          <label
                            class="task-chat-user"
                            style={{ width: "100%" }}
                          >
                            {data && data.patientName}
                          </label>
                          <span class="chat-time">{data && data.status}</span>
                        </>
                      ) : (
                        <>
                          <label
                            class="task-chat-user"
                            style={{ width: "100%" }}
                          >
                            {data && data.doctor && data.doctor.name}
                          </label>
                          <span class="chat-time">
                            {data && data.doctor && data.doctor.specialization}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div>
                    <div className="row">
                      <div className="form-group col-md-3">
                        <label>BP</label>
                        <input
                          name="bp"
                          type="text"
                          value={form.bp}
                          className="form-control"
                          placeholder="Blood Pressure"
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Pulse</label>
                        <input
                          name="pulse"
                          type="text"
                          className="form-control"
                          placeholder="Pulse"
                          value={form.pulse}
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>Temp</label>
                        <input
                          name="bodyTemperature"
                          type="text"
                          value={form.bodyTemperature}
                          className="form-control"
                          placeholder="Temp"
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>
                          S<sub>p</sub>O<sub>2</sub>
                        </label>
                        <input
                          name="oxigne"
                          type="text"
                          value={form.oxigne}
                          className="form-control"
                          placeholder="Oxygen Saturation"
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group col-md-3">
                        <label>FBS</label>
                        <input
                          name="suger1"
                          type="text"
                          value={form.suger1}
                          className="form-control"
                          placeholder="FBS"
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group col-md-2">
                        <label>PPBS</label>
                        <input
                          name="suger2"
                          type="text"
                          value={form.suger2}
                          className="form-control"
                          placeholder="PPBS"
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group col-md-2">
                        <label>RBS</label>
                        <input
                          name="suger3"
                          type="text"
                          value={form.suger3}
                          className="form-control"
                          placeholder="RBS"
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                      </div>
                      <div className="form-group col-md-2">
                        <label>RR</label>
                        <input
                          name="respiratoryRate"
                          type="text"
                          value={form.respiratoryRate}
                          className="form-control"
                          placeholder="RR"
                          onChange={(e) =>
                            handleInputChange(e.target.name, e.target.value)
                          }
                        />
                      </div>

                      <div className="form-group col-md-3">
                        <label
                          style={{ display: "inline-block", width: "100%" }}
                        >
                          &nbsp;
                        </label>
                        <button
                          className="btn btn-info text-white"
                          onClick={(e) => handleUpdateAppointment(e)}
                        >
                          Update
                        </button>
                      </div>
                      <div className="form-group">
                        <DropzoneComponent
                          uploadedFile={(file) => handleUploadFile(file)}
                        />
                      </div>

                      <div className="form-group">
                        <label className="w-100">History</label>
                        {data &&
                          data.files &&
                          data.files.map((d, index) => (
                            <>
                              <a
                                key={index}
                                className="btn badge badge-success m-2 ml-0 text-white"
                                target="_new"
                                href={getDocumentLink(d.fileName)}
                              >
                                View File
                              </a>
                            </>
                          ))}
                      </div>

                      <div className="form-group">
                        <label className="w-100">Prescription</label>
                        {data &&
                          data.prescription &&
                          data.prescription.map((d, index) => (
                            <>
                              <div className="btn-group btn">
                                <a
                                  key={index}
                                  className="btn badge badge-info ml-0 text-white"
                                  onClick={(e) =>
                                    downloadPrescription(
                                      d._id,
                                      `Prescription ${moment(
                                        d.createdAt
                                      ).format("DD/MM/YYYY h:mm A")}`
                                    )
                                  }
                                >
                                  Prescriptin{""}
                                  {moment(d.createdAt).format(
                                    "DD/MM/YYYY h:mm A"
                                  )}
                                </a>
                                {role === ROLES.DOCTOR && (
                                  <a
                                    className="btn badge badge-warning ml-0 text-white"
                                    onClick={(e) => handleEditPrescription(d)}
                                  >
                                    <i className="fas fa-pen m-r-5"></i> Edit
                                  </a>
                                )}
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>

                  {role !== ROLES.CORDINATOR && (
                    <>
                      <hr />
                      {apntHistory && apntHistory.length > 0 ? (
                        <>
                          <div
                            style={{
                              border: "1px solid #dbdbdb",
                              margin: "10px 0px",
                              padding: "5px 50px",
                              maxHeight: "300px",
                              minHeight: "100px",
                              overflowY: "auto",
                            }}
                            ref={chatBoxRef}
                          >
                            {apntHistory &&
                              apntHistory.map((d, index) =>
                                user && user._id === d.fromId ? (
                                  <p className="from-message">
                                    {d.type === "text" &&
                                      renderTextMessage(index, d)}
                                    {d.type === "application/pdf" &&
                                      renderPdfMessage(d)}
                                    {(d.type === "image/png" ||
                                      d.type === "image/jpg" ||
                                      d.type === "image/jpeg") &&
                                      renderImageMessage(d)}
                                  </p>
                                ) : (
                                  <p className="to-message">
                                    {d.type === "text" &&
                                      renderTextMessage(index, d)}
                                    {d.type === "application/pdf" &&
                                      renderPdfMessage(d)}
                                    {(d.type === "image/png" ||
                                      d.type === "image/jpg" ||
                                      d.type === "image/jpeg") &&
                                      renderImageMessage(d)}
                                  </p>
                                )
                              )}
                          </div>
                        </>
                      ) : (
                        ""
                      )}

                      <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="input-group">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={(e) => HandleFileBtnClick(e)}
                          >
                            <i class="fas fa-paperclip"></i>
                          </button>
                          <input
                            name="message"
                            type="text"
                            value={messages}
                            className="form-control"
                            placeholder="Message"
                            onChange={(e) => setMessages(e.target.value)}
                          />

                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={(e) => handleSubmit(e)}
                          >
                            <i className="fas fa-paper-plane"></i>
                          </button>
                        </div>
                      </form>
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />

                      <div className="m-t-20 text-center">
                        <div className="btn btn-group">
                          {role !== ROLES.DOCTOR && (
                            <>
                              <Link
                                to="/appointment/create"
                                className="btn btn-primary submit-btn"
                              >
                                Book New Appointment
                              </Link>
                              {data && data.status !== "Follow-up" && (
                                <bottom
                                  className="btn btn-success submit-btn"
                                  onClick={(e) => setFlowUpModal(true)}
                                >
                                  Schedule a Follow-up
                                </bottom>
                              )}
                            </>
                          )}
                          {role === ROLES.DOCTOR && (
                            <>
                              <bottom
                                className="btn btn-warning submit-btn"
                                onClick={(e) => setShowAddPrescription(true)}
                              >
                                Write Prescription
                              </bottom>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddPrescription
        show={showAddprescription}
        handleClose={(value) => setShowAddPrescription(value)}
        rowData={data}
      />
      <FlowwUp
        show={flowUpModal}
        data={data}
        handleClose={(value) => setFlowUpModal(value)}
        createFollo={(data) => handleSchedileFloip(data)}
      />
      <EditPrescription
        show={showEditprescription}
        handleClose={(value) => handleEditPrescriptionShow(value)}
        rowData={prescriptionRow}
      />
    </>
  );
}

export default AppointmentView;
