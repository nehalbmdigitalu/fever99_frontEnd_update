import React, { useEffect, useState } from "react";
import serviceIcon from "../../../assets/img/service.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createInsurence, createOrder, getServiceDetails } from "../dependencies/action";
import RequestDetails from "./RequestDetails";
import { getDocumentLink } from "../../../dependencies/utils/helper";
import ThankYouMessage from "../../common/ThankYouMessage";
import InsurenceModal from "./InsurenceModal";
function View() {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showThankyou, setShowThankyou] = useState(false);
  const [modalContent, setModalContent] = useState('')
  const [showInsurenceModal, setShowInsurenceModal] = useState(false)


  useEffect(() => {
    if (id) {
      dispatch(getServiceDetails(id)).then((res) => {
        if (res && res.data) {
          setDetails(res.data);
        }
      });
    }
  }, [dispatch, id]);


  const handleSetModal = (id) => {
    if (id == '653513c38fbfe494aca4f832') {
      setShowInsurenceModal(true)
      return false
    }
    setShowModal(true)
  }

  const handleShowInsurenceModal = (value) => {
    setShowInsurenceModal(false)
  }

  const createServiceInsurenceOrder = (data) => {

    dispatch(createInsurence(data)).then(res => {
      setShowInsurenceModal(false)
    })
  }
  const createServiceOrder = (value) => {
    let data = {
      serviceId: details._id,
      customerName: value.name,
      serviceName: details.name,
      amount: details.price,
      mobile: value.mobile,
      age: value.age,
      gender: value.gender,
      medicalProblem: value.medicalProblem,
      date: value.date,
      time: value.time,
      state: value.state,
      city: value.city,
      pin_code: value.pin_code
    };

    dispatch(createOrder(data)).then((res) => {
      setModalContent(res.message)
      setShowModal(false);
      setShowThankyou(true);
    });
  };
  const handleThankyouClose = () => {
    setShowThankyou(false);
    navigate("/request");
  };
  return (
    <>
      <div class="page-wrapper">
        <div class="content">
          <div class="row">
            <div class="col-sm-7 col-4">
              <h4 class="page-title">{details.name}</h4>
            </div>
            <div class="col-sm-5 col-8 m-b-30" style={{ textAlign: "right" }}>

              {details._id == "64e110436e8e3e26e117c1ae" ? (
                <Link to="/appointment/create" class="btn btn-primary btn-rounded">
                  Book Service
                </Link>
              ) : (
                <a
                  href="#0"
                  class="btn btn-primary btn-rounded"
                  onClick={(e) => handleSetModal(details._id)}
                >
                  Book Service
                </a>
              )}
            </div>
          </div>
          <div class="card-box profile-header">
            <div class="row">
              <div class="col-md-12">
                <div class="profile-view">
                  <div class="profile-img-wrap">
                    <div class="profile-img">
                      <a href="#">
                        <img
                          class="avatar"
                          src={getDocumentLink(details.image)}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div class="profile-basic">
                    <div class="row">
                      <div class="col-md-5">
                        <div class="profile-info-left">
                          <h3 class="user-name m-t-0 m-b-0">{details.name}</h3>
                          <small class="text-muted">{details.name}</small>
                          <div class="staff-id">
                            {/* Charge : Rs. {details.price} /- */}
                          </div>
                          <div class="staff-msg">
                            {details._id == "64e110436e8e3e26e117c1ae" ? (
                              <Link
                                to="/appointment/create"
                                class="btn btn-primary"
                              >
                                Book Service
                              </Link>
                            ) : (
                              <a
                                href="#0"
                                class="btn btn-primary"
                                onClick={(e) => handleSetModal(details._id)}
                              >
                                Book Service
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-7">
                        <ul class="personal-info">
                          <li>
                            <span class="title">Emergency Number:</span>
                            <span class="text">
                              <a href>6262-8080-62</a>
                            </span>
                          </li>
                          <li>
                            <span class="title">Email:</span>
                            <span class="text">
                              <a href>
                                <span class="__cf_email__">
                                  support@fever99.com
                                </span>
                              </a>
                            </span>
                          </li>
                          {/* <li>
                            <span class="title">Date:</span>
                            <span class="text">3rd March</span>
                          </li>   */}
                          {/* <li>
                            <span class="title">Address:</span>
                            <span class="text">New Delhi India</span>
                          </li> */}
                          {/* <li>
                            <span class="title">Gender:</span>
                            <span class="text">Female</span>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="profile-tabs">
            {/* <ul class="nav nav-tabs nav-tabs-bottom">
              <li class="nav-item">
                <a class="nav-link active" href="#about-cont" data-toggle="tab">
                  About
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#bottom-tab2" data-toggle="tab">
                  Profile
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#bottom-tab3" data-toggle="tab">
                  Messages
                </a>
              </li>
            </ul> */}

            <div class="tab-content">
              <div class="tab-pane show active" id="about-cont">
                <div class="row">
                  <div class="col-md-12">
                    <div class="card-box">
                      <h3 class="card-title">About</h3>
                      <div class="experience-box">
                        <p>{details.description}</p>
                      </div>
                    </div>
                    {details &&
                      details.keyFeture &&
                      details.keyFeture.length > 0 ? (
                      <>
                        {/* <div class="card-box m-b-0">
                          <h3 class="card-title">Key features</h3>
                          <div class="experience-box">
                            <ul class="experience-list">
                              {details &&
                                details.keyFeture &&
                                details.keyFeture.map((d, index) => (
                                  <li>
                                    <div class="experience-user">
                                      <div class="before-circle"></div>
                                    </div>
                                    <div class="experience-content">
                                      <div class="timeline-content">
                                        <a href="#/" class="name">
                                          {d.key}
                                        </a>
                                        <span class="time">{d.featers}</span>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div> */}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="bottom-tab2">
                Tab content 2
              </div>
              <div class="tab-pane" id="bottom-tab3">
                Tab content 3
              </div>
            </div>
          </div>
        </div>
      </div>
      <RequestDetails
        show={showModal}
        handleClose={(value) => setShowModal(value)}
        handleAdd={(value) => createServiceOrder(value)}
        rowData={details}
      />
      <ThankYouMessage
        show={showThankyou}
        message={modalContent}
        handleClose={() => handleThankyouClose()}
      />

      <InsurenceModal
        show={showInsurenceModal}
        handleClose={(value) => handleShowInsurenceModal(value)}
        handleAdd={(value) => createServiceInsurenceOrder(value)}
      />
    </>
  );
}

export default View;
