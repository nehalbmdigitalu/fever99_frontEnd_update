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
import { storage } from "../../../dependencies/store/storage";
import "./style.scss";
import { ROLES } from "../../../constants/role";
import { getStateCity } from "../../Dashboard/dependencies/action";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import DynamicPagination from "./DynamicPagination";

function AppointmentAddUpdate(props) {
  const location = storage.getLocation() ?? "";
  const role = storage.getUserRole();
  const [query, setQuery] = useState({
    page: 1,
    limit: 6,
    query: "",
    state: "",
    city: "",
    pricesort:'DESC'
  });
  const [showModal, setShowModal] = useState(false);
  const [doctoe, setDoctor] = useState(null);
  // const [showCalendar, setShowCalendar] = useState({ status: false, id: "" });
  // const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [string, setString] = useState("");
  const [type, setType] = useState("name");
  const [mode, setMode] = useState("video");
  const { stateList } = useSelector((state) => state.stateCity);
  const sortedStateList = stateList.slice().sort((a, b) => {
    const stateA = a.state.toUpperCase(); // Convert to uppercase for case-insensitive sorting
    const stateB = b.state.toUpperCase();

    if (stateA < stateB) {
      return -1;
    }
    if (stateA > stateB) {
      return 1;
    }
    return 0;
  });

  const [city, setCity] = useState([]);

  const { ItemList, ItemTotalPage, Spacility } = useSelector(
    (state) => state.doctors
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleDoctorSearchChange = (value) => {
    setQuery({ ...query, query: value });
  };

  useEffect(() => {
    dispatch(getDoctorList(query));
    dispatch(getStateCity());
  }, [query]);

  const handleBookApointment = (row, mode) => {
    setMode(mode);
    setShowModal(true);
    setDoctor(row);
  };
  const handletypeChange = (e) => {
    if (e.target.value) {
      setType(e.target.value);
    }
  };

  const handleStateChange = (e) => {
    let stateName = e.target.value;
  
    let selectedState = stateList.find((state) => state.state === stateName);
  
    if (selectedState) {
      let sortedCities = selectedState.city.slice().sort((a, b) => {
        const cityA = a.toUpperCase(); 
        const cityB = b.toUpperCase();
  
        if (cityA < cityB) {
          return -1;
        }
        if (cityA > cityB) {
          return 1;
        }
        return 0;
      });
  
      setQuery({
        ...query,
        state: selectedState.state,
      });
  
      setCity(sortedCities);
    }
  };
  

  const handleCityChange = (value) => {
    setQuery({ ...query, city: value });
  };

  const searchDoctors = (e) => {
    e.preventDefault();
    setQuery({ ...query, query: string });
  };

  const handlePageClick = (page) => {
    setQuery({ ...query, page: page });

    window.scrollTo({ top: 0, behavior: "smooth" });
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
                  <option value="Location">Location</option>
                </select>
                {type === "name" && (
                  <input
                    name="query"
                    className="form-control"
                    placeholder="Doctor Name"
                    onChange={(e) => setString(e.target.value)}
                  />
                )}
                {type === "speacialisation" && (
                  <select
                    name="query"
                    onChange={(e) => setString(e.target.value)}
                    className="form-select"
                  >
                    <option value="">Select One</option>
                    {Spacility &&
                      Spacility.map((item, index) => (
                        <option value={item} key={index}>
                          {item}
                        </option>
                      ))}
                  </select>
                )}
                {type === "Location" && (
                  <>
                    <select
                      name="state"
                      onChange={(e) => handleStateChange(e)}
                      className="form-select"
                    >
                      <option value="">Select State</option>
                      {sortedStateList &&
                        sortedStateList.map((itm, index) => (
                          <option value={itm.state} key={index}>
                            {itm.state}
                          </option>
                        ))}
                    </select>

                    <select
                      name="city"
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="form-select"
                    >
                      <option value="">Select City</option>
                      {city &&
                        city.map((cit, index) => (
                          <option value={cit} key={index}>
                            {cit}
                          </option>
                        ))}
                    </select>
                  </>
                )}

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
          <div class="doctor-list">
            {ItemList &&
              ItemList.map((item, index) => (
                <div class="doctor-card" key={index}>
                  <label
                    style={{
                      position: "relative",
                      top: "-28px",
                      right: "-230px",
                      fontWeight: "bolder",
                    }}
                  >
                    <span
                      className={`status ${item.userStatus ?? "offline"}`}
                      style={{
                        position: "absolute",
                        left: "-14px",
                        top: "8px",
                      }}
                    ></span>{" "}
                    {item.userStatus == "online"
                      ? "Avaliable"
                      : "Not Avaliable"}
                  </label>
                  <div class="doctor-img">
                    <a class="avatar" href="#0">
                      <img src={getDocumentLink(item.image)} alt={item.name} />
                      {/* <span
                        className={`status ${item.userStatus ?? "offline"}`}
                      ></span> */}
                    </a>
                  </div>

                  <div class="doctor-details">
                    <h4 class="doctor-name text-ellipsis text-center">
                      <a href="#0">{item.name}</a>
                    </h4>

                    <p class="label">
                      {item.userExtraDetails && item.userExtraDetails.degree}
                    </p>
                    <p class="label">{item.specialization ?? ""}</p>
                    <p>
                      <b>Location: </b> {item.city}, {item.state}
                    </p>
                    <p className="badge bg-success">
                      <b>Experience: </b>
                      {item.userExtraDetails &&
                        item.userExtraDetails.totalExperience}{" "}
                      Years
                    </p>
                    <p style={{ minHeight: "48px" }}>
                      <b>Working: </b>
                      {item.userExtraDetails &&
                        item.userExtraDetails.currentOrganization}
                    </p>
                    
                    {
                      item && item.languageKnown && item.languageKnown.lenth && (
                        {/* <p><b>Language: </b> Hindi, English</p> */}
                      )
                    }
                  </div>
                  {ROLES.PATIENT === role ? (                    
                    <>
                      <p class="service-charge">
                        {item.serviceChargepatient === 0 || item.serviceChargepatient === undefined ? (
                          <span>Free</span>
                        ) : (
                          <span>Rs {item.serviceChargepatient}</span>
                        )}
                      </p>
                    </>
                  ) : (
                    <>
                      <p class="service-charge">
                        {item.serviceCharge === 0 ? (
                          <span>Free</span>
                        ) : (
                          <span>Rs {item.serviceCharge}</span>
                        )}
                      </p>
                    </>
                  )}

                  <div class="appointment-buttons">
                    <button
                      type="button"
                      class="btn btn-sm btn-success"
                      onClick={() => handleBookApointment(item, "Video")}
                    >
                      Book Video Consult
                    </button>
                    {ROLES.PATIENT == role && (
                      <button
                        type="button"
                        class="btn btn-sm btn-warning"
                        onClick={() => handleBookApointment(item, "Offline")}
                      >
                        Book Clinic Visit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            {!ItemList && <h3>No Record Found!</h3>}
          </div>
          <DynamicPagination
            totalRecords={ItemTotalPage}
            recordsPerPage={6}
            currentPage={query.page}
            onPageChange={handlePageClick}
          />
          {/* <div className="d-flex justify-content-center pt-4">
            
            <Pagination>
            
              <PageItem className={query.page == 1 ? 'active': ''} onClick={() => handlePageClick(1)}>1</PageItem>
              <PageItem className={query.page == 2 ? 'active': ''} onClick={() => handlePageClick(2)}>2</PageItem>
              <PageItem className={query.page == 3 ? 'active': ''} onClick={() => handlePageClick(3)}>3</PageItem>
              <PageItem className={query.page == 4 ? 'active': ''} onClick={() => handlePageClick(4)}>4</PageItem>
              <PageItem className={query.page == 5 ? 'active': ''} onClick={() => handlePageClick(5)}>5</PageItem>
            </Pagination>
          </div> */}
        </div>
      </div>
      <AddModal
        mode={mode}
        showModal={showModal}
        handleClose={(value) => setShowModal(value)}
        data={doctoe}
      />
    </>
  );
}

export default AppointmentAddUpdate;
