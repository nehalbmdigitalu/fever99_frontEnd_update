import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAptList } from "./Dependencies/action";


const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short",
};

function AdminEarning() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 1);

  const [query, setQuery] = useState({
    page: 1,
    size: 10,
    fromDate: currentDate.toISOString(),
    toDate: futureDate.toISOString(),
    appointmentMode: "",
    paymentMode: "",
    userType: "",
  });
  const [fromDate, setFromDate] = useState(query.fromDate);
  const [toDate, setToDate] = useState(query.fromDate);
  const [filterQuery, setFilterQuery] = useState({
    appointmentMode: '',
    paymentMode: '',
    userType: '',
  })
  const {
    EarningList,
    totalEarnings,
    totalDoctorEarning,
    totalFranchiseEarning,
  } = useSelector((state) => state.AdminEarning);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAptList(query));
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();

    setQuery({ ...query, fromDate: fromDate, toDate: toDate, ...filterQuery });
  };
  const handleFilterQuery = (e) => {
    setFilterQuery({...filterQuery, [e.target.name]: e.target.value})
  }
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div
            className="row"
          >
            <div className="form-group col-md-4">
              <label>From Date</label>
              <input
                name="fromDate"
                className="form-control"
                type="Date"
                value={fromDate.toLocaleString(undefined, options)}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div
              className="form-group col-md-4"
            >
              <label>To Date</label>
              <input
                name="toDate"
                className="form-control"
                value={toDate.toLocaleString(undefined, options)}
                type="Date"
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label>Consultation Mode</label>
              <select
                className="form-select"
                name="appointmentMode"
                onChange={(e) => handleFilterQuery(e)}
              >
                <option value="">All</option>
                <option value="Video">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label>Payment Mode</label>
              <select
                className="form-select"
                name="paymentMode"
                onChange={(e) => handleFilterQuery(e)}
              >
                <option value="">All</option>
                <option value="Online">Online</option>
                <option value="Offline">Cash</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label>User Type</label>
              <select
                className="form-select"
                name="userType"
                onChange={(e) => handleFilterQuery(e)}
              >
                <option value="">All</option>
                <option value="PATIENT">User</option>
                <option value="FRANCHISE">Franchise</option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <button
                className="btn btn-sm btn-warning"
                style={{
                  marginTop: "24px",
                }}
                onClick={(e) => handleSearch(e)}
              >
                Get Result
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0 bg-white m-1">
              <div className="dash-widget d-flex">
                <span className="dash-widget-bg1">
                  <i class="fas fa-rupee-sign"></i>
                </span>
                <div
                  className="dash-widget-info float-left pl-2 "
                  style={{ marginLeft: "5px" }}
                >
                  <p>Fever99 Earnings</p>
                  <h4>Rs. {totalEarnings}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0 bg-white m-1">
              <div className="dash-widget d-flex">
                <span className="dash-widget-bg2">
                  <i class="fas fa-rupee-sign"></i>
                </span>
                <div
                  className="dash-widget-info float-left pl-2 "
                  style={{ marginLeft: "5px" }}
                >
                  <p>Doctor Earning</p>
                  <h4>Rs. {totalDoctorEarning}</h4>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3 pr-0 bg-white m-1">
              <div className="dash-widget d-flex">
                <span className="dash-widget-bg3">
                  <i class="fas fa-rupee-sign"></i>
                </span>
                <div
                  className="dash-widget-info float-left pl-2 "
                  style={{ marginLeft: "5px" }}
                >
                  <p>Freanchise Earning</p>
                  <h4>Rs. {totalFranchiseEarning}</h4>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient Name</th>
                    <th>Appointment Charge</th>
                    <th>Appointment Source</th>
                    <th>Consultation Mode</th>
                    <th>Payment Mode</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Admin Earning</th>
                    <th>Doctor Earning</th>
                    <th>Franchise Earning</th>
                  </tr>
                </thead>
                <tbody>
                  {EarningList &&
                    EarningList.map((appointment, index) => (
                      <tr key={appointment._id}>
                        <td>{index + 1}</td>
                        <td>{appointment.patientName}</td>
                        <td>Rs. {appointment.appointmentCharge.toFixed(2)}</td>
                        <td>{appointment.expert && appointment.expert.role}</td>
                        <td>
                          {appointment.mode === "Video" ? "Online" : "Offline"}
                        </td>
                        <td>
                          {appointment.paymentMode === "Online"
                            ? "Online"
                            : "Cash"}
                        </td>
                        <td>{appointment.status}</td>
                        <td>
                          {new Date(appointment.createdAt).toLocaleDateString()}
                        </td>
                        <td>Rs. {appointment.AdminEarning.toFixed(2)}</td>
                        <td>Rs. {appointment.doctorEarning.toFixed(2)}</td>
                        <td>Rs. {appointment.FranchiseEarning.toFixed(2)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminEarning;
