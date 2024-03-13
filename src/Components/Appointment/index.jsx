import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import userImg from "../../assets/img/user.jpg";
import Table from "../common/Table";
import TableColumn from "./dependiencies/TableColumn";
import { useDispatch, useSelector } from "react-redux";
import {
  getItemList,
  getItemListWithLoader,
  prescriptionAppointmentId,
  updateAppointment,
  updateCallStatus,
  sendNotificationObj,
  VideoCallToken,
} from "./dependiencies/action";
import { Link, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { ROLES } from "../../constants/role";
import { storage } from "../../dependencies/store/storage";
import SimplePeer from "simple-peer";
import RaiseComplent from "./RaiseComplent";
import "./apppointment.scss";
import { Howl } from "howler";
import soundSrc from "../../assets/beep.mp3";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AgoraUIKit from "agora-react-uikit";

function Appointment(props) {
  const dispatch = useDispatch();
  const { ItemList, ItemTotalPage } = useSelector((state) => state.appointment);
  const { user } = useSelector((state) => state.login);
  const [sfromDate, setFromDate] = useState("");
  const [stoDate, settoDate] = useState("");
  const [videoCall, setVideoCall] = useState(false);
  const [uid, setuid] = useState(Math.floor(Math.random() * 1000));

  const [rtcProps, setRtcProps] = useState({
    appId: "b671aeda83ee48d582e9cc33f83b30cb",
    channel: "test",

  });
  console.log(sfromDate, stoDate)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");
  let finalStatus = status ?? "";
  let toady = "";

  if (status === "today") {
    finalStatus = "";

    let today = new Date().toISOString();
    const day = new Date(today).getDate();
    const month = new Date(today).getMonth() + 1;
    const year = new Date(today).getFullYear();
    toady = `${year}-${month}-${day}`;
  }

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    formData: toady ?? "",
    toDate: toady ?? "",
    status: finalStatus,
  });
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   setQuery({ ...query, fromDate: fromDate, toDate, toDate, ...filterQuery });
  // };  
  const navigate = useNavigate();
  const role = storage.getUserRole();
  const [raiseComplent, setRaiseComplent] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);

  useEffect(() => {
    if (getItemList && !isEmpty(user)) {
      dispatch(getItemList(query));
    }
  }, [dispatch, query, user]);

  const handleApplyDate = (e) => {
    setQuery({ ...query, formData: sfromDate, toDate: stoDate });
  };

  const handleEdit = (id, status) => {
    if (status == "completed") {
      dispatch(updateCallStatus(id, { callInprogress: false }));
    }
    let updateStatus = dispatch(updateAppointment(id, { status: status }));
    updateStatus.then((res) => {
      if (res.status) {
        dispatch(getItemList(query));
      }
    });
  };

  useEffect(() => {
    const fetchData = () => {
      // Assuming query is a state variable
      dispatch(getItemListWithLoader(query));
    };

    // Call the API initially
    fetchData();

    // Set up an interval to call the API every 15 seconds
    const intervalId = setInterval(() => {
      // Fetch data with the updated query
      fetchData();
    }, 15000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [query]); // Include query in the dependency array

  const HandlejoinMetting = (id) => {
    // dispatch(sendNotificationObj({ appointmentId: id }));
    dispatch(updateCallStatus(id, { callInprogress: true }));
    dispatch(VideoCallToken({ channelName: id, uid: uid })).then((res) => {
      const { tokenA, status } = res;
      if (status) {
        setRtcProps({ ...rtcProps, channel: id });
        setVideoCall(true);
      }
    });

    // window.open(`https://meet.jit.si/${id}`, "_blank");
  };

  const handlePageChange = (page) => {
    setQuery({ ...query, page: page });
  };
  const handleCall = (e) => {
    e.preventDefault();

    // fetch("http://localhost:8000/peer")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const peer = new SimplePeer({ initiator: false });

    //     peer.on("signal", (data) => {
    //       // Send the signal data to the other peer
    //     });

    //     peer.on("data", (data) => {
    //       // Handle the received data
    //     });
    //     peer.on("connect", () => {
    //       // The connection has been established
    //     });
    //     peer.on("close", () => {
    //       // The connection has been closed
    //     });
    //   });
  };
  const handleComplent = (id) => {
    setAppointmentId(id);
    setRaiseComplent(true);
  };

  const downloadPrescription = (id) => {
    dispatch(prescriptionAppointmentId(id)).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "prescription.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const callInProgress = (status) => {
    // const intervalId = setInterval(() => {
    //   const sound = new Howl({
    //     src: [soundSrc],
    //   });
    //   sound.play();
    // }, 1000);
    // return () => clearInterval(intervalId);
    // JSON.stringify;
  };
  const callbacks = {
    EndCall: () => {
      setVideoCall(false)
      dispatch(updateCallStatus(rtcProps.channel, { callInprogress: false }));
      dispatch(getItemListWithLoader(query))
    },
  };

  if (videoCall) {
    return (
      <>
        <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="card call-video">
                  <AgoraUIKit
                    rtcProps={rtcProps}
                    settings={{
                      mode: 0,
                    }}
                    callbacks={callbacks}

                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {/* <div className="form-group col-md-4">
              <label>From Date</label>
              <input
                name="fromDate"
                className="form-control"
                type="Date"
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label>To Date</label>
              <input
                name="toDate"
                className="form-control"
                type="Date"
                onChange={(e) => settoDate(e.target.value)}
              />
            </div> */}
            <div>
              <div className="col-sm-4 col-3">
                <h4 className="page-title">Appointments</h4>
              </div>
              <div className="d-flex justify-content-start">
                <div className="form-group col-md-4">
                  <label>From Date</label>
                  <input
                    name="fromDate"
                    className="form-control"
                    type="Date"
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-4 px-2">
                  <label>To Date</label>
                  <input
                    name="toDate"
                    className="form-control"
                    type="Date"
                    onChange={(e) => settoDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div
              className="col-sm-8 col-9 text-right m-b-20"
              style={{ textAlign: "end" }}
            >
              {(ROLES.FRANCHISE == role || ROLES.PATIENT == role) && (
                <Link
                  to="/appointment/create"
                  className="btn btn btn-primary btn-rounded float-right"
                >
                  <i className="fa fa-plus"></i> Book Appointment
                </Link>
              )}
              {/* <span>&nbsp;</span> */}
              {/* {
                ROLES.PATIENT == role && (
                  <Link
                  to="/appointment/create/clinic"
                  className="btn btn btn-info btn-rounded float-right"
                >
                  <i className="fa fa-plus"></i> Clinic appointment
                </Link>
                )
              } */}
            </div>
          </div>
          {(role === ROLES.FRANCHISE || role === ROLES.DOCTOR) && (
            <div className="row m-b-20">
              <div className="col-4">
                <label>From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  className="form-control"
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="col-4">
                <label>To Date</label>
                <input
                  type="date"
                  name="toDate"
                  className="form-control"
                  onChange={(e) => settoDate(e.target.value)}
                />
              </div>
              <div className="col-4">
                <button
                  className="btn btn-sm btn-info"
                  style={{ marginTop: "27px" }}
                  onClick={(e) => handleApplyDate(e)}
                  type="button"
                >
                  Apply
                </button>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <Table
                      columns={TableColumn({
                        handleEdit,
                        HandlejoinMetting,
                        handleCall,
                        downloadPrescription,
                        handleComplent,
                        callInProgress,
                        pageNo: query.page - 1,
                        size: query.size,
                      })}
                      dataTable={ItemList}
                      totalRecord={ItemTotalPage}
                      onPageChange={handlePageChange}
                      onTableChange={() => { }}
                      keyField="_id"
                      sizePerPage={query.size}
                    // pageSizeChange={(value) => handlePageSizeChange(value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RaiseComplent
        handleClose={(value) => setRaiseComplent(value)}
        show={raiseComplent}
        appointmentId={appointmentId}
      />
    </>
  );
}

export default Appointment;
