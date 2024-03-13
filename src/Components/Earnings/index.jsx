import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAptList } from "./Dependencies/action";
import { storage } from "../../dependencies/store/storage";
import { ROLES } from "../../constants/role";
function Earnings() {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 1);

  const [query, setQuery] = useState({
    page: 1,
    size: 10,
    fromDate: currentDate.toLocaleDateString(),
    toDate: futureDate.toLocaleDateString(),
    appointmentMode: "",
    paymentMode: "",
    userType: "",
  });
  const [fromDate, setFromDate] = useState(query.fromDate);
  const [toDate, setToDate] = useState(query.fromDate);
  const [filterQuery, setFilterQuery] = useState({
    appointmentMode: "",
    paymentMode: "",
    userType: "",
  });
  const { EarningList, totalEarning, upCommingEarning } = useSelector(
    (state) => state.Earning
  );
  const dispatch = useDispatch();
  const role = storage.getUserRole();

  useEffect(() => {
    dispatch(getAptList(query));
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();

    setQuery({ ...query, fromDate: fromDate, toDate: toDate, ...filterQuery });
  };
  const handleFilterQuery = (e) => {
    setFilterQuery({ ...filterQuery, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="form-group col-md-4">
              <label>From Date</label>
              <input
                name="fromDate"
                className="form-control"
                type="Date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label>To Date</label>
              <input
                name="toDate"
                className="form-control"
                type="Date"
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            {role === ROLES.DOCTOR && (
              <>
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
                    <option value="PATIENT">Patient</option>
                    <option value="FRANCHISE">Franchise</option>
                  </select>
                </div>
              </>
            )}

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
                  <p>Total Earnings</p>
                  <h4>Rs. {totalEarning}</h4>
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
                  <p>Total Upcomming</p>
                  <h4>Rs. {upCommingEarning}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient Name</th>
                  <th>Appointment Charge</th>
                  {role === ROLES.DOCTOR && (
                    <>
                      <th>Appointment Source</th>
                      <th>Consultation Mode</th>
                      <th>Payment Mode</th>
                    </>
                  )}
                  <th>Status</th>
                  <th>Date</th>
                  <th>Earning</th>
                </tr>
              </thead>
              <tbody>
                {EarningList &&
                  EarningList.map((appointment, index) => (
                    <tr key={appointment._id}>
                      <td>{index + 1}</td>
                      <td>{appointment.patientName}</td>
                      <td>Rs. {appointment.appointmentCharge.toFixed(2)}</td>
                      {role === ROLES.DOCTOR && (
                        <>
                          <td>
                            {appointment.expert && appointment.expert.role}
                          </td>
                          <td>
                            {appointment.mode === "Video"
                              ? "Online"
                              : "Offline"}
                          </td>
                          <td>
                            {appointment.paymentMode === "Online"
                              ? "Online"
                              : "Cash"}
                          </td>
                        </>
                      )}
                      <td>{appointment.status}</td>
                      <td>
                        {new Date(appointment.createdAt).toLocaleString()}
                      </td>
                      <td>Rs. {appointment.earning.toFixed(2)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Earnings;
