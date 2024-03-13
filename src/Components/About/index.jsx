import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReadMore from '../common/ReadMore';
import team5 from "../../assets/img/team/dr_lokesh1.png";
import team6 from "../../assets/img/team/dr_mukesh.jpg";
import MainHeader from "../common/MainHeader";
import MainFooter from "../common/MainFooter";
import { useEffect } from "react";
import { getTeamList } from "../Teams/dependencies/action";
import { getDocumentLink } from "../../dependencies/utils/helper";
import Iframe from 'react-iframe';

function About() {
  const dispatch = useDispatch();
  const { TeamList } = useSelector((state) => state.teams);
  useEffect(() => {
    dispatch(getTeamList());
  }, [dispatch]);

  console.log("TeamList____", TeamList);

  const medical = TeamList.filter((item) => item.type === "medical");
  // const Advasory = TeamList.filter((item) => item.type === "Advisory_Panel");
  console.log("Advisory_Panel");

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
                    <h2>About</h2>
                    <p>Fever99 is a leading healthcare provider dedicated to delivering exceptional medical services to individuals and families. Our journey began with a simple but profound mission: to make healthcare accessible, convenient, and compassionate.</p>
                    <nav>
                      <div className="container">
                        <ol>
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>About</li>
                        </ol>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="about py-5">
          <div className="container about-sec" >
            <div className="section-header py-2">
              <h2>Get To Know About Fever99</h2>
              <p>
                Fever99 is a leading healthcare provider dedicated to delivering
                exceptional medical services to individuals and families. Our
                journey began with a simple but profound mission: to make
                healthcare accessible, convenient, and compassionate.
              </p>
            </div>

            <div className="row img-sec py-3">
              <div className="col-lg-6">
                <div className="d-flex justify-content-center">
                  <img src="https://www.fever99.com/static/media/about.014a2dc522629e7deff6.jpg" alt="" className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-6 text px-3">
                <h2>Our Mission</h2>
                <img src="/image/index/header-bottom.svg" alt="" style={{ width: "200px" }} />
                <p>We embrace innovation and technology to continuously improve our services. From state-of-the-art medical equipment to telemedicine solutions, we leverage the latest advancements to offer you the most effective and convenient healthcare options.</p>
                <div className="list-style-one">
                  <ul className="row">
                    <li>
                      <h3>Experienced Professionals</h3>
                    </li>
                    <li>
                      <h3>Convenient Access</h3>
                    </li>
                    <li>
                      <h3>Compassionate Care</h3>
                    </li>
                  </ul>
                </div>
                <p>At Fever99, our team is our greatest asset. Our healthcare professionals are not only highly skilled and experienced but also deeply committed to improving the lives of our patients. We work collaboratively to ensure you receive the best care possible.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="p-3">
          <div className="container about-sec" >
            <div className="row img-sec py-3">
              <div className="col-lg-6 text px-3">
                <h2>Our Vision</h2>
                <img src="/image/index/header-bottom.svg" alt="" style={{ width: "200px" }} />
                <p>Our mission is to enhance the well-being of our patients by providing comprehensive and high-quality healthcare services. We believe that everyone deserves access to excellent medical care, and we strive to meet that need with professionalism and empathy.</p>
                <p>Fever99 is not just a healthcare provider; we are a part of the communities we serve. We actively engage in community initiatives and health education programs to promote overall well-being.</p>
                <p>At Fever99, our team is our greatest asset. Our healthcare professionals are not only highly skilled and experienced but also deeply committed to improving the lives of our patients. We work collaboratively to ensure you receive the best care possible.</p>
              </div>
              <div className="col-lg-6">
                <div className="d-flex justify-content-center">
                  <img src="https://www.fever99.com/static/media/about.014a2dc522629e7deff6.jpg" alt="" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="team">
          <div className="container py-4" >
            <div className="section-header">
              <h2>Founders</h2>
              <p>
                At Fever99, Our Expert Doctor Panel is our greatest asset. Our
                healthcare professionals are not only highly skilled and
                experienced but also deeply committed to improving the lives of
                our patients. We work collaboratively to ensure you receive the
                best care possible.
              </p>
            </div>

            <div className="row gy-4">
              <div className="col-xl-6 col-md-6 d-flex" >
                <div className="member">
                  <img src={team5} height={500} className="img-fluid" alt="" />
                  <h4>
                    <Link to="/people/lokeshGarg">Dr. Lokesh Garg</Link>
                  </h4>
                  <span>
                    MBBS, Diploma in Tuberculosis and Chest Diseases (DTCD)
                  </span>
                  <h5>Founder &amp; Chairman</h5>
                </div>
              </div>

              <div className="col-xl-6 col-md-6 d-flex">
                <div className="member">
                  <img src={team6} height={500} className="img-fluid" alt="" />
                  <h4>
                    <Link to="/people/mukeshjain">Dr. Mukesh Jain</Link>
                  </h4>
                  <span>MBBS, MD</span>
                  <h5>Co-Founder, Managing Director & CEO{" "}</h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="team" className="team">
          <div className="container" >
            <div className="section-header">
              <h2>Advisory Panel</h2>
              <p>
                At Fever99, Our Expert Doctor Panel is our greatest asset. Our
                healthcare professionals are not only highly skilled and
                experienced but also deeply committed to improving the lives of
                our patients. We work collaboratively to ensure you receive the
                best care possible.
              </p>
            </div>

            <div className="row gy-4">
              {Advasory &&
                Advasory.map((item, index) => (
                  <div
                    key={index}
                    className="col-xl-3 col-md-6 d-flex"
                    
                    data-aos-delay="100"
                  >
                    <div className="member">
                      <img
                        src={getDocumentLink(item.image)}
                        className="img-fluid"
                        alt=""
                      />
                      <h4>{item.name}</h4>
                      <span>{item.role}</span>
                      {
                        item.about && (
                          <ReadMore text={item.about} maxLength={100} />
                        )
                      }
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section> */}

        <section className="team py-5">
          <div className="container" >
            <div className="section-header">
              <h2>Medical Team</h2>
              <img src="/image/index/header-bottom.svg" alt="" />
              <p>At Fever99, Our Expert Doctor Panel is our greatest asset. Our healthcare professionals are not only highly skilled and experienced but also deeply committed to improving the lives of our patients. We work collaboratively to ensure you receive the best care possible.</p>
            </div>
            <div className="row">
              {medical &&
                medical.map((item, index) => (
                  <div key={index} className="col-lg-3 col-sm-6 employee-1">
                    <div className="employee">
                      <div className="employee-image">
                        <img src={getDocumentLink(item.image)} className="img-fluid d-block m-auto" alt="employee" />
                      </div>
                      <div className="employee-name" style={{ height: "120px" }}>
                        <h1 className="text-center">{item.name}<br /><span className="employee-role px-2">{item.role}</span></h1>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
        <section className="contact">
          <div className="aos-init aos-animate" >
            <div className="section-header">
              <h2 style={{ color: "#12416A", fontSize: "35px" }}>Contact US</h2>
            </div>
            <div>
              <Iframe src="https://www.google.com/maps/embed/v1/place?q=Shop+Number+97,+Conscient+Habitat+society+market,+Sector+78,+Faridabad,+Haryana+121002&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                width="640px"
                height="320px"
                className="w-100"
              />
            </div>
          </div>
        </section>
        <MainFooter />
      </main >
    </>
  );
}

export default About;
