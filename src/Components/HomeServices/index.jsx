import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemList } from "../Services/dependencies/action";
import MainFooter from "../common/MainFooter";
import MainHeader from "../common/MainHeader";
import { getDocumentLink } from "../../dependencies/utils/helper";

import RequestDetails from '../Services/view/RequestDetails';
import ThankYouMessage from "../common/ThankYouMessage";
import { createOrder, getServiceSlug } from "../Services/dependencies/action";

function HomeServices() {
  const { ItemList } = useSelector((state) => state.service);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemList());
  }, [dispatch]);

  console.log("getItemListgetItemListgetItemListgetItemListgetItemList", ItemList);


  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState({});
  const [showThankyou, setShowThankyou] = useState(false)

  const createServiceOrder = (value) => {
    let req = {
      serviceId: data._id,
      customerName: value.name,
      serviceName: data.name,
      amount: data.price,
      mobile: value.mobile,
      age: value.age,
      gender: value.gender,
      medicalProblem: value.medicalProblem,
      date: value.date,
      time: value.time,
    };

    dispatch(createOrder(req)).then((res) => {
      setShowModal(false);
      setShowThankyou(true);
    });
  }
  const handleThankyouClose = () => {
    setShowThankyou(false);
  };


  // const { isLogin } = useSelector((state) => state.login);
  return (
    <>
      <MainHeader />
      <main id="main">
        <div className="breadcrumbs">
          <div className="wrapper" style={{ backgroundImage: `url("https://wordpress.themeholy.com/mediax/wp-content/uploads/2023/12/breadcumb-bg.jpg")` }}>
            <div className="page-header d-flex align-items-center">
              <div className="container position-relative">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-6 text-center">
                    <h2>Services</h2>
                    <p>
                      Fever99 is a leading healthcare provider dedicated to
                      delivering exceptional medical services to individuals and
                      families. Our journey began with a simple but profound
                      mission: to make healthcare accessible, convenient, and
                      compassionate.
                    </p>
                    <nav>
                      <div className="container">
                        <ol>
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>Service</li>
                        </ol>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="service">
          <div className="container py-4">
            <div className="mb-5 wow fadeInUp" data-wow-delay="0.2s">
              <h1 className="text-center fw-bolder">Our Services</h1>
              <div className="d-flex justify-content-center">
                <img src="/image/index/header-bottom.svg" alt="" style={{ width: "200px" }} />
              </div>
              <p className="mb-0 text-center">Fever99.com offers a diverse array of healthcare services, easily accessible in the convenience of our patients' residences.</p>
            </div>
            <div className="row g-4 justify-content-center">
              {ItemList &&
                ItemList.map((d, index) => (
                  <div key={index} className="col-lg-4 col-md-2">
                    <div className="wow fadeInUp px-3" data-wow-delay="0.1s">
                      <div className="service-item rounded">
                        <div className="service-img rounded-top">
                          <img src={getDocumentLink(d.image)} className="img-fluid rounded-top w-100" alt="" style={{ height: "300px" }} />
                        </div>
                        <div className="service-content rounded-bottom bg-light p-4 shadow-sm">
                          <div className="service-content-inner">
                            <h3 className="line-clamp">{d.name}</h3>
                            <p className="line-clamp1">{d.description}</p>
                            <div className="d-flex justify-content-between">
                              <button onClick={() => setShowModal(true)} className="btn">Book Now</button>
                              <Link
                                to={`/home-service/${d.slug}`}
                                className="btn btn-sm btn-warning"
                                style={{ backgroundColor: "#f25922", color: "#fff" }}
                              >
                                Read Now
                              </Link>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <MainFooter />
      </main >

      <RequestDetails
        show={showModal}
        handleClose={(value) => setShowModal(value)}
        handleAdd={(value) => createServiceOrder(value)}
      />

      <ThankYouMessage
        show={showThankyou}
        handleClose={() => handleThankyouClose()}
      />
    </>
  );
}

export default HomeServices;
