import React, { useEffect, useState } from "react";
import DoctorImg from "../../../assets/img/doctor-thumb-01.jpg";
import DoctorFemale from "../../../assets/img/doctor-thumb-02.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorList } from "../dependiencies/action";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AddModal from "./AddModal";
import { getDocumentLink } from "../../../dependencies/utils/helper";

function AppointmentAddClinic(props) {
  const [query, setQuery] = useState({ page: 1, limit: 12, query: "" });
  const [showModal, setShowModal] = useState(false);
  const [doctoe, setDoctor] = useState(null);
  // const [showCalendar, setShowCalendar] = useState({ status: false, id: "" });
  // const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [string, setString] = useState("");
  const [type, setType] = useState("name");

  const { ItemList } = useSelector((state) => state.doctors);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleDoctorSearchChange = (value) => {
    setQuery({ ...query, query: value });
  };

  useEffect(() => {
    dispatch(getDoctorList(query));
  }, [query]);

  const handleBookApointment = (row) => {
    setShowModal(true);
    setDoctor(row);
  };
  const handletypeChange = (e) => {
    if(e.target.value) {
      setType(e.target.value);
    }
    
  };

  const searchDoctors = (e) => {
    e.preventDefault();
    setQuery({ ...query, query: string });
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-6 col-9 m-b-20">
              <h4 className="page-title">Book Appointment</h4>
            </div>
            <div className="col-sm-6 col-9 m-b-20">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <select
                  className="form-select"
                  name="type"
                  onChange={(e) => handletypeChange(e)}
                >
                  <option value="">Select One</option>
                  <option value="name">Doctor Name</option>
                  <option value="speacialisation">Speacialization</option>
                </select>
                {type === "name" && (
                  <input
                    name="query"
                    className="form-control"
                    placeholder="Doctor Name"
                    onChange={(e) => setString(e.target.value)}
                  />
                )}
                {
                  type === 'speacialisation' && (
                    <select name="query" onChange={(e) => setString(e.target.value)} className="form-select">
                      <option value="">Select One</option>
                      <option value='Cardiologist'>Cardiologist</option>
                      <option value='General'>General Physician </option>
                    </select>
                  )
                }

                <button
                  type="button"
                  className="btn btn-sm btn-info"
                  onClick={(e) => searchDoctors(e)}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="row doctor-grid">
            {ItemList &&
              ItemList.map((item, index) => (
                <div
                  className="col-md-4 col-sm-4 col-xs-6 col-lg-3"
                  key={index}
                >
                  <div className="profile-widget">
                    <div className="doctor-img">
                      <a className="avatar" href="#0">
                        <img alt src={getDocumentLink(item.image)} />
                      </a>
                    </div>
                    
                    <h4 className="doctor-name text-ellipsis">
                      <a href="#0">{item.name}</a>
                    </h4>
                    <div className="doc-prof">{item.specialization}</div>
                    <div className="user-country">
                      {item && item.address && (
                        <>
                          <i className="fas fa-map-marker-alt"></i>{" "}
                          {item.address}
                        </>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.serviceCharge === 0 ? (
                        <span className="btn btn-sm btn-info">Free</span>
                      ) : (
                        <span className="btn btn-sm btn-info">
                          Rs {item.serviceCharge}
                        </span>
                      )}

                      <button
                        type="button"
                        className="btn btn-sm btn-warning"
                        onClick={() => handleBookApointment(item)}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {!ItemList && <h3>No Record Found!</h3>}
          </div>
        </div>
      </div>
      <AddModal
        showModal={showModal}
        handleClose={(value) => setShowModal(value)}
        data={doctoe}
      />
    </>
  );
}

export default AppointmentAddClinic;
