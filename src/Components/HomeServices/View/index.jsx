import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getServiceById } from "../dependencies/action";
import { getDocumentLink } from "../../../dependencies/utils/helper";
import MainFooter from "../../common/MainFooter";
import MainHeader from "../../common/MainHeader";
import { createOrder, getServiceSlug } from "../../Services/dependencies/action";
import RequestDetails from '../../Services/view/RequestDetails'
import ThankYouMessage from "../../common/ThankYouMessage";

function ServiceDetails() {
  const { isLogin } = useSelector((state) => state.login);
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false)
  const [showThankyou, setShowThankyou] = useState(false)

  useEffect(() => {
    dispatch(getServiceSlug(id)).then((res) => {
      const { data } = res;
      sessionStorage.setItem('redirect_url', `/service/view/${data._id}`)
      setData({
        ...data,
        about: data.about.replace(/<br>/g, "")
      });
    });

  }, [dispatch, id]);

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
  return (
    <>
      <MainHeader />
      <main id="main">
        <div class="breadcrumbs">
          <div className="wrapper" style={{ backgroundImage: `url("https://wordpress.themeholy.com/mediax/wp-content/uploads/2023/12/breadcumb-bg.jpg")` }}>
            <div class="page-header d-flex align-items-center">
              <div class="container position-relative">
                <div class="row d-flex justify-content-center">
                  <div class="col-lg-12 text-center">
                    <h2>{data.name}</h2>
                    <p>{data.description}</p>
                    <nav>
                      <div class="container">
                        <ol>
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>{data.name}</li>
                        </ol>
                      </div>
                    </nav>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: "12px" }}>
                      {
                        (
                          <>
                            <button onClick={() => setShowModal(true)} type="button" className="btn btn-primary" >Book Now</button>
                          </>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="about" className="about">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="service-content py-5">
                  <h6>{data.title}</h6>
                  <img
                    src={getDocumentLink(data.image)}
                    style={{ width: "100%" }} alt=""
                  />
                  <div className="py-4">
                    <p dangerouslySetInnerHTML={{ __html: data.about }}></p>
                    <div className="">
                      <ul style={{ listStyle: "none" }}></ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MainFooter />
      </main>
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

export default ServiceDetails;