import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDocumentLink } from "../../dependencies/utils/helper";

function Testimonials(props) {
  const { data } = props;
  const sliderRef = useRef(null);

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 2,
    arrows: false,
    slidesToScroll: 1,


    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
        }
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          initialSlide: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          slidesToScroll: 1
        }
      }
    ]
  };


  return (
    <div className="carousel-container">
      <div className="d-flex justify-content-between py-2" style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: "130px", left: "-50px" }}>
          <button onClick={goToPrev} className="btn btn-success">
            <i className="fas fa-angle-left"></i>
          </button>
        </div>
        <div style={{ position: "absolute", top: "130px", right: "-50px" }}>
          <button onClick={goToNext} className="btn btn-success">
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
      </div>
      <Slider ref={sliderRef} {...settings}>
        {data &&
          data.map((item, index) => (
            <div key={index} className="owl-carousel testimonial-carousel">
              <div className="testimonial-item rounded p-4">
                <div className="row">
                  <div className="col-4">
                    <div className="d-flex flex-column mx-auto">
                      <div className="rounded-circle d-flex justify-content-center" >
                        <img src={getDocumentLink(item.image)} className="img-fluid w-100" alt="" style={{ height: "180px", width: "220px", borderRadius: "100px" }} />
                      </div>
                      <div className="text-center">
                        <h4 className="">{item.name}</h4>
                        <p className="m-0">{item.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="testimonial-content">
                      {/* {/* <div>
                        <div className="d-flex mb-4">
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star text-primary"></i>
                          <i className="fas fa-star"></i>
                        </div>
                      </div> */}
                      <p className="mb-0 text-white line-clamp" >{item.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider >
    </div >
  );
}

export default Testimonials;
