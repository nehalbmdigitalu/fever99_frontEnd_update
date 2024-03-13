import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCordinatorReport } from "../dependencies/action";

function CordinatorView(props) {
    const [data, setData] = useState({});
    console.log(data)
    const dispatch = useDispatch();
    const params = useParams();
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [query, setQuery] = useState({
        fromDate: new Date().toISOString(),
        toDate: new Date().toISOString(),
    });

    const [filterQuery, setFilterQuery] = useState({
        appointmentMode: "",
        paymentMode: "",
        userType: "",
    });

    const id = params.id;
    useEffect(() => {
        dispatch(getCordinatorReport(id, query)).then((res) => {
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

    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
        return formattedDate;
    }

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
                    {/* <div className="col-md-12">
            <p>
              Name: {data && data.user && data.user.name}, State:{" "}
              {data && data.user && data.user.state}, City:{" "}
              {data && data.user && data.user.city}, Gender:{" "}
              {data && data.user && data.user.gender}, Mobile:{" "}
              {data && data.user && data.user.mobile}, Spaciliazation:{" "}
              {data && data.user && data.user.specialization}, Appointment
              Charge: Rs. {data && data.user && data.user.serviceCharge}, Email:{" "}
              {data && data.user && data.user.email}, Address:{" "}
              {data && data.user && data.user.address}
            </p>
          </div> */}
                    <div className="col-md-12">
                        <br />
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

export default CordinatorView;