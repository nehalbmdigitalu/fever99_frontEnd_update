import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDocumentLink } from "../../dependencies/utils/helper";
import { Link } from "react-router-dom";

function AutoScrollService(props) {
  const sliderRef = useRef(null);
  const { data } = props;

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };
  console.log(data);
  return (
    <div className="carousel-container">
      <Slider ref={sliderRef} {...settings}>
        {data &&
          data.map((item, index) => (
            <div class="icon-box" key={index}>
              <div class="icon">
                <img alt={item.name} src={getDocumentLink(item.image)} />
              </div>
              <h4 class="title">
                <Link class="stretched-link" to={`/home-service/${item.slug}`}>
                  {item.name}
                </Link>
              </h4>
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default AutoScrollService;
