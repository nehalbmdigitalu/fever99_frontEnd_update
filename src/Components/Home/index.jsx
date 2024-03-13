import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./index.scss";
import "swiper/css";
import "swiper/css/pagination";
import { GoArrowRight } from "react-icons/go";
import "./index.css";
// import { MdOutlineClose } from "react-icons/md";
import "../../assets/css/main.css";
import { FaArrowRightLong } from "react-icons/fa6";
import "../../assets/main/vendor/bootstrap-icons/bootstrap-icons.min.css";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemList } from "../Services/dependencies/action";
// import doctor_at_home from "../../assets/img/doctor_at_home2.jpg";
// import heroBanner from "../../assets/img/heo_banner_new.png";
import { getBlogsList } from "../CaseStudy/dependencies/action";
import { getDocumentLink } from "../../dependencies/utils/helper";
// import ReadMore from "../common/ReadMore";
import { getTestmonial } from "../Testimonials/dependencies/action";
import MainHeader from "../common/MainHeader";
import MainFooter from "../common/MainFooter";
import { getTeamList } from "../Teams/dependencies/action";
// import CarouselComponent from "./Carousel";
// import AutoSlider from "../common/AutoSlider";
import Testimonials from "./Testemonial";
import { BsArrowRightCircleFill } from "react-icons/bs";
import Teams from "./Teams";
// import AutoScrollService from "./AutoScrollService";
// import OfferBanner from "./OfferBanner";
// import { storage } from "../../dependencies/store/storage";
// import { ROLES } from "../../constants/role";
// import videoSrc from "../../assets/video/video.mp4";
// import videoposter from "../../assets/video/poster.png";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import RequestDetails from '../../Services/view/RequestDetails'
import RequestDetails from "../Services/view/RequestDetails";
import ThankYouMessage from "../common/ThankYouMessage";
import { Link } from "react-router-dom";
import { createOrder, getServiceSlug } from "../Services/dependencies/action";

function Home() {
  const { ItemList } = useSelector((state) => state.service);
  const { blogList } = useSelector((state) => state.blogs);
  const { testmonial } = useSelector((state) => state.testmonial);
  const { TeamList } = useSelector((state) => state.teams);
  // const { isLogin } = useSelector((state) => state.login);
  // const role = storage.getUserRole();
  // console.log("ItemList_____", ItemList);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemList());
    dispatch(getBlogsList());
    dispatch(getTestmonial());
    dispatch(getTeamList());
  }, [dispatch]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1000) {
          clearInterval(interval);
          return prevCount;
        } else {
          return prevCount + 1;
        }
      });
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const [counttwo, setCounttwo] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounttwo((prevCount) => {
        if (prevCount === 30) {
          clearInterval(interval);
          return prevCount;
        } else {
          return prevCount + 1;
        }
      });
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const [countthree, setCountthree] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountthree((prevCount) => {
        if (prevCount === 500) {
          clearInterval(interval);
          return prevCount;
        } else {
          return prevCount + 1;
        }
      });
    }, 1);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const [countfour, setCountfour] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCountfour((prevCount) => {
        if (prevCount === 315) {
          clearInterval(interval);
          return prevCount;
        } else {
          return prevCount + 1;
        }
      });
    }, 1);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // const [typedText] = useState("");
  // const [modalOpen, setModalOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const [showThankyou, setShowThankyou] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");




  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredServices = ItemList
  ? ItemList.filter((service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];

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
    const createServiceOrder = (value) => {
      setShowModal(false);
      setShowThankyou(true);
    };

    dispatch(createOrder(req)).then((res) => {
      setShowModal(false);
      setShowThankyou(true);
    });
  };
  const handleThankyouClose = () => {
    setShowThankyou(false);
  };

  const CompanyData = [
    {
      num: "1",
      title: "Doctors available around the clock.",
      data: count,
    },
    {
      num: "2",
      title: "Specialities Available",
      data: counttwo,
    },
    {
      num: "3",
      title: "E- clinics across india",
      data: countthree,
    },
    {
      num: "4",
      title: "Total Frinchies",
      data: countfour,
    },
  ];

  const slider = useRef();
  const setting = {
    infinite: true,
    speed: 400,
    autoplay: true,
    slidesToShow: 3,
    arrows: false,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Modal open

  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      <MainHeader />
      <div>
        {/* <section id="hero" className="hero">
          <CarouselComponent />
          <div className="icon-boxes position-relative" style={{ marginTop: '-203px' }}>
            <div
              className="container position-relative"
              style={{ paddingTop: "-150px" }}
            >
              <Swiper
                spaceBetween={20}
                slidesPerView={4}
                navigation={true}
                loop={true}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1190: {
                    slidesPerView: 3,
                  },
                }}
                autoplay={{ delay: 30 }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {ItemList &&
                  ItemList.map((ser, index) => (
                    <SwiperSlide style={{ maxHeight: "305px" }}>
                      <div className="icon-box">
                        <div className="icon">
                          <img alt={ser.name} src={getDocumentLink(ser.image)} />
                        </div>
                        <h4 className="title">
                          <Link
                            className="stretched-link"
                            to={`/home-service/${ser.slug}`}
                          >
                            {ser.name}
                          </Link>

                        </h4>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </section> */}
      </div>

      <section className="banner">
        <div
          className="banner-bg"
          style={{
            backgroundImage: `url("https://img.freepik.com/free-photo/doctor-white-coat-using-digital-tablet-reading-medical-data-gadget-working-hospital-standin_1258-121765.jpg?t=st=1710145505~exp=1710149105~hmac=0efad73113cb4a910334868b4a617bdcce2d8ba9c840c94f932161751551eec7&w=1060")`,
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="block">
                  <h1 className="mb-3 mt-3">Welcome to Fever99</h1>
                  <p className="mb-4 pr-5 text-dark">
                    At Fever99, we are dedicated to providing you the highest
                    quality healthcare services at your door step. We understand
                    that your health is your most precious asset, and we are
                    committed to ensuring that you receive the care and
                    attention you deserve.
                  </p>

                  <div className="col-lg-10 banner-input">
                    <input type="text" className="w-100  rounded-pill px-3" placeholder="Ex. Name, Specialization..." value={searchQuery} onChange={handleSearchInputChange}/>
                    <div className="d-flex justify-content-center py-3 btn-style banner-btn">
                      <button className="bg-primary rounded-pill" onClick={() => setShowModal(true)}><GoArrowRight className="text-light" /></button>
                    </div>
                  </div>

{/* 
                  <div className="col-lg-6">
                    <div className="block" >
                    
                      <div className="col-lg-10 banner-input " style={{display:"flex" ,}}>
                        <input  style={{width:"400px",padding:"13px",borderRadius:"12px"}}
                          type="text"
                          placeholder="Search Services"
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                          
                        /> <BsArrowRightCircleFill className="right"  />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* <div className="col-lg-6">
                <div className='box'>
                  <img src="https://wordpress.themeholy.com/mediax/wp-content/uploads/2023/12/hero_2_1.png" alt="" style={{ height: "510px" }} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <div className="service container position-relative py-3">
          <div className="">
            <div className="mb-5">
              <h1 className="text-center fw-bolder">Our Services</h1>
              <div className="d-flex justify-content-center">
                <img
                  src="/image/index/header-bottom.svg"
                  alt=""
                  style={{ width: "200px" }}
                />
              </div>
              <p className="mb-0 text-center">
                Fever99.com offers a diverse array of healthcare services...
              </p>
            </div>
            <div className="row g-4 justify-content-center">
              <Slider
                className="w-full flex items-center"
                infinite={true}
                speed={400}
                autoplay={true}
                slidesToShow={3}
                arrows={false}
                slidesToScroll={1}
                responsive={[
                  // ... (existing code) ...
                ]}
              >
                {filteredServices.map((d, index) => (
                  <div key={index} className="col-md-3 col-lg-3 col-xl-3 fadeInUp">
                    <div className="service-item rounded">
                      <div className="service-img rounded-top">
                        <img
                          src={getDocumentLink(d.image)}
                          className="img-fluid rounded-top w-100"
                          alt=""
                        />
                      </div>
                      <div className="service-content rounded-bottom bg-light p-4">
                        <div className="service-content-inner">
                          <h3 className="">{d.name}</h3>
                          <p className="line-clamp1">{d.description}</p>
                          <div className="d-flex justify-content-between">
                            <button
                              onClick={() => setShowModal(true)}
                              className="btn"
                            >
                              Book Now
                            </button>
                            <Link
                              to={`/home-service/${d.slug}`}
                              className="btn btn-sm"
                            >
                              Read Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

      {/* <section className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="outer-box">
              <div className="d-flex flex-column bg-light  position-relative overflow-hidden card">
                <img src="https://wp4.ourwpdemo.com/docpro/wp-content/uploads/2021/02/shape-5.png" alt="" className="bg-shape" />
                <img src="https://wp4.ourwpdemo.com/docpro/wp-content/uploads/2021/02/shape-9.png" alt="" className="bg-shape1" />
                <div className="d-flex justify-content-center">
                  <img src="/image/icon/body-variant.png" alt="" className="py-3 w-25" />
                </div>
                <p className="py-1s text-center">Appointment With</p>
                <h3 className="text-center">Nearest Clinic</h3>
                <div className="d-flex justify-content-center py-4 btn-style">
                  <Link to="/service"><button className=""><FaArrowRightLong className="text-light" /></button></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="outer-box" >
              <div className="d-flex flex-column bg-light  position-relative overflow-hidden card">
                <img src="https://wp4.ourwpdemo.com/docpro/wp-content/uploads/2021/02/shape-7.png" alt="" className="bg-shape" />
                <img src="https://wp4.ourwpdemo.com/docpro/wp-content/uploads/2021/02/shape-9.png" alt="" className="bg-shape1" />
                <div className="d-flex justify-content-center">
                  <img src="/image/icon/drugs.png" alt="" className="py-3 w-25" />
                </div>
                <p className="py-1s text-center">Appointment With</p>
                <h3 className="text-center">Nearest Clinic</h3>
                <div className="d-flex justify-content-center py-4 btn-style">
                  <Link to="/service"><button className=""><FaArrowRightLong className="text-light" /></button></Link>
                </div>
              </div>
            </div>
          </div><div className="col-lg-3">
            <div className="outer-box">
              <div className="d-flex flex-column bg-light  position-relative overflow-hidden card">
                <img src="https://wp4.ourwpdemo.com/docpro/wp-content/uploads/2021/02/shape-5.png" alt="" className="bg-shape" />
                <img src="https://wp4.ourwpdemo.com/docpro/wp-content/uploads/2021/02/shape-9.png" alt="" className="bg-shape1" />
                <div className="d-flex justify-content-center">
                  <img src="/image/icon/laboratory.png" alt="" className="py-3 w-25" />
                </div>
                <p className="py-1s text-center">Appointment With</p>
                <h3 className="text-center">Nearest Clinic</h3>
                <div className="d-flex justify-content-center py-4 btn-style">
                  <Link to="/service"><button className=""><FaArrowRightLong className="text-light" /></button></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="outer-box">
              <div className="d-flex flex-column bg-light position-relative overflow-hidden card">
                <img src="https://wp4.ourwpdemo.com/docpro/wp-content/uploads/2021/02/shape-7.png" alt="" className="bg-shape" />
                <img src="https://wp4.ourwpdemo.com/docpro/wp-content/uploads/2021/02/shape-9.png" alt="" className="bg-shape1" />
                <div className="d-flex justify-content-center">
                  <img src="/image/icon/recovery.png" alt="" className="py-3 w-25" />
                </div>
                <p className="py-1s text-center">Appointment With</p>
                <h3 className="text-center">Nearest Clinic</h3>
                <div className="d-flex justify-content-center py-4 btn-style">
                  <Link to="/service"><button className=""><FaArrowRightLong className="text-light" /></button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="container pt-5 pb-2">
        <div className="row docpro">
          <div className="col-lg-6 bg-image">
            <img
              src="https://wp4.ourwpdemo.com/docpro/wp-content/uploads/2021/02/about-1.png"
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6 docpro-text py-5 px-5">
            <h2 className="text-capitalize">
              Bring care to your home with one click
            </h2>
            <img
              src="/image/index/header-bottom.svg"
              alt=""
              style={{ width: "200px" }}
            />
            <p className="py-1">
              Fever99 Provides you with a comprehensive list of doctors,
              hospitals, and other healthcare facilities in your area. Our
              website is designed to help you find the right healthcare
              professional for your needs.
            </p>
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
            <div>
              <Link to="/about">
                <button className="click-btn btn-style505">
                  Read More
                  <GoArrowRight className="text-black " />{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-3">
        <div
          className="timer"
          style={{
            backgroundImage: `url("https://img.freepik.com/free-photo/unity-four-happy-successful-doctors-isolated-white_186202-2191.jpg?t=st=1709183108~exp=1709186708~hmac=fa16f3ac6751b3df003565a1ff40f928bb7b2e7a216b0c35761bdec175590ff4&w=996")`,
          }}
        >
          <div className="timer-section">
            <div className="row">
              {CompanyData.map((elem, index) => {
                const { title, data } = elem;
                return (
                  <div key={index} className="col-lg-3 p-3">
                    <div className="timer-text">
                      <h3 className="text-center">{data} +</h3>
                      <p className="text-center">{title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ADVERTISERS SERVICE CARD ENDED  */}

      <div className="service container position-relative py-3">
        <div className="">
          <div className="mb-5 ">
            <h1 className="text-center fw-bolder">Our Services</h1>
            <div className="d-flex justify-content-center">
              <img
                src="/image/index/header-bottom.svg"
                alt=""
                style={{ width: "200px" }}
              />
            </div>
            <p className="mb-0 text-center">
              Fever99.com offers a diverse array of healthcare services, easily
              accessible in the convenience of our patients' residences.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            <Slider
              ref={(c) => (slider.current = c)}
              {...setting}
              className="w-full flex items-center"
            >
              {ItemList &&
                ItemList.map((d, index) => (
                  <div className=" px-3">
                    <div className="service-item rounded">
                      <div className="service-img rounded-top">
                        <img
                          src={getDocumentLink(d.image)}
                          className="img-fluid rounded-top w-100"
                          alt=""
                        />
                      </div>
                      <div className="service-content rounded-bottom bg-light p-4">
                        <div className="service-content-inner">
                          <h3 className="">{d.name}</h3>
                          <p className="line-clamp1">{d.description}</p>
                          <div className="d-flex justify-content-between">
                            <button
                              onClick={() => setShowModal(true)}
                              className="btn"
                            >
                              Book Now
                            </button>

                            <Link
                              to={`/home-service/${d.slug}`}
                              className="btn btn-sm"
                            >
                              Read Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        {/* {modalOpen ? (
          <div className="modal d-flex justify-content-center w-100">
            <RequestDetails />
          </div>
        ) : null} */}
      </div>
      {/* <!-- Services End */}

      {/* doctor start  */}
      <section className="team py-5">
        <div className="container">
          <div className="section-header">
            <h2>Our Expert Doctor Panel</h2>
            <img
              src="/image/index/header-bottom.svg"
              alt=""
              style={{ width: "200px" }}
            />
            <p>
              At Fever99, Our Expert Doctor Panel is our greatest asset. Our
              healthcare professionals are not only highly skilled and
              experienced but also deeply committed to improving the lives of
              our patients. We work collaboratively to ensure you receive the
              best care possible.
            </p>
          </div>
          <Teams data={TeamList} />
        </div>
      </section>
      {/* doctor end */}

      {/* Testimonial Start */}
      <section
        className="testimonial-sec"
        style={{
          backgroundImage: `url("https://t3.ftcdn.net/jpg/02/68/37/02/360_F_268370211_1HcOx7KV9J7grtWtMU6kyN0TBOScMlJE.jpg`,
        }}
      >
        <div className=" testimonial py-5">
          <div className="container">
            <div className="text-center mx-auto">
              <h3 className="text-uppercase">Testimonial</h3>
              <img
                src="/image/index/header-bottom.svg"
                alt=""
                style={{ width: "100px" }}
              />
              <p className="">What Our Clients Say!</p>
            </div>
            <div className="owl-carousel testimonial-carousel">
              <Testimonials data={testmonial} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial End  */}

      {/* Blog Start */}
      <div className="container-fluid blog py-5">
        <div className="container">
          <div className="section-title mb-5  fadeInUp">
            <div className="sub-style">
              <h4 className="sub-title px-3 mb-0 text-center py-2">Our Blog</h4>
              <img
                src="/image/index/header-bottom.svg"
                alt=""
                style={{ width: "100px" }}
              />
              <p className="mb-0 text-center">
                From the latest medical trends to tips for a healthier life, our
                blog is your trusted resource for staying informed and empowered
                on your journey to complete healthcare solutions delivered right
                to your doorstep.
              </p>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            {blogList &&
              blogList.map((data, index) => (
                <div
                  key={index}
                  className="col-md-6 col-lg-6 col-xl-4  fadeInUp"
                >
                  <div className="blog-item rounded">
                    <div className="blog-img">
                      <img
                        src={getDocumentLink(data.image)}
                        className="img-fluid rounded-top w-100"
                        alt=""
                      />
                    </div>
                    <div className="blog-centent p-4 bg-white shadow-lg border-bottom">
                      <div className="d-flex justify-content-between mb-4">
                        <p className="mb-0 text-muted">
                          <i className="fa fa-calendar-alt text-primary"></i> 01
                          Jan 2045
                        </p>
                        <Link href="#" className="text-muted">
                          <span className="fa fa-comments text-primary"></span>{" "}
                          3 Comments
                        </Link>
                      </div>
                      <h3>
                        {" "}
                        <Link
                          href="#"
                          style={{
                            fontSize: "14px",
                            fontWeight: "bolder",
                            fontFamily: '"Roboto",sans-serif',
                          }}
                          className="py-2 text-dark"
                        >
                          {data.name}
                        </Link>
                      </h3>
                      <p className="">{data.title}</p>
                      <Link
                        to={`/blog/${data.slug}`}
                        className="btn btn-primary rounded-pill text-white py-2 px-4 mb-1"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Blog End */}

      <MainFooter />

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

export default Home;
