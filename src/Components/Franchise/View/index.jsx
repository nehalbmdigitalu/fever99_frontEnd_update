import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getFranchiseReport } from "../dependencies/action";

function FranchiseView(props) {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const params = useParams();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 1);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const [query, setQuery] = useState({
    fromDate: currentDate.toLocaleDateString(),
    toDate: futureDate.toLocaleDateString(),
    appointmentMode: "",
    paymentMode: "",
    userType: "",
  });

  const [filterQuery, setFilterQuery] = useState({
    appointmentMode: "",
    paymentMode: "",
    userType: "",
  });

  const id = params.id;
  useEffect(() => {
    dispatch(getFranchiseReport(id, query)).then((res) => {
      setData(res);
    });
  }, [id, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery({ ...query, fromDate: fromDate, toDate, toDate, ...filterQuery });
  };

  const handleFilterQuery = (e) => {
    setFilterQuery({ ...filterQuery, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="form-group col-md-4">
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
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="form-group col-md-4">
            <label>Appointment Mode</label>
            <select
              className="form-select"
              name="appointmentMode"
              onChange={(e) => handleFilterQuery(e)}
            >
              <option value="">All</option>
              <option value="Video">Video</option>
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
              <option value="Offline">Offline</option>
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
          <div className="col-md-12">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Gender</th>
                  <th>Mobile</th>
                  <th>Specialization</th>
                  <th>Appointment Fees</th>
                  <th>Email</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatDate(data?.user?.createdAt)}</td>
                  <td>{data?.user?.name}</td>
                  <td>{data?.user?.state}</td>
                  <td>{data?.user?.city}</td>
                  <td>{data?.user?.gender}</td>
                  <td>{data?.user?.mobile}</td>
                  <td>{data?.user?.specialization}</td>
                  <td>{data?.user?.serviceCharge}</td>
                  <td>{data?.user?.email}</td>
                  <td>{data?.user?.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-Gender: {data && data.user && data.user.name}md-12 d-flex">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 pr-0 bg-white">
              <div className="dash-widget d-flex">
                <span className="dash-widget-bg2">
                  <i class="fas fa-rupee-sign"></i>
                </span>
                <div
                  className="dash-widget-info float-left pl-2 "
                  style={{ marginLeft: "5px" }}
                >
                  <p>Total Appointments</p>
                  <h4>
                    {data && data.appointmentCount ? data.appointmentCount : 0}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-6 pr-0 bg-white">
              <div className="dash-widget d-flex">
                <span className="dash-widget-bg1">
                  <i class="fas fa-rupee-sign"></i>
                </span>
                <div
                  className="dash-widget-info float-left pl-2 "
                  style={{ marginLeft: "5px" }}
                >
                  <p>Total Earning</p>
                  <h4>
                    Rs. {data && data.totalEarning ? data.totalEarning : 0}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <br />
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient Name</th>
                  <th>Appointment Charge</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Earning</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.appointments &&
                  data.appointments.map((appointment, index) => (
                    <tr key={appointment._id}>
                      <td>{index + 1}</td>
                      <td>{appointment.patientName}</td>
                      <td>Rs. {appointment.appointmentCharge.toFixed(2)}</td>
                      <td>{appointment.status}</td>
                      <td>
                        {new Date(appointment.createdAt).toLocaleString()}
                      </td>
                      <td>Rs. {appointment.earning.toFixed(2)}</td>
                    </tr>
                  ))}
                {data && data.appointments && data.appointments.length < 1 && (
                  <tr>
                    <td className="text-center" colSpan={6}>
                      <b>Record not found!</b>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FranchiseView;
