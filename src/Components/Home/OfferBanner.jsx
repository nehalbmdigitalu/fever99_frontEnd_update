import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDocumentLink } from "../../dependencies/utils/helper";
import image1 from '../../assets/img/offer/1.jpg'
import image2 from '../../assets/img/offer/2.jpg'
import image3 from '../../assets/img/offer/3.jpg'
import { Link } from "react-router-dom";

function OfferBanner(props) {
  const sliderRef = useRef(null);
//   const { data } = props;
const [data, setData] = useState([
    {
        name: '1',
        image: image1
    },
    {
        name: '1',
        image: image2
    },
    {
        name: '1',
        image: image3
    },
])

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
      <Slider ref={sliderRef} {...settings}>
        {data &&
          data.map((item, index) => (
            <div key={index}>
              <div>
                <Link to="/service"><img alt={item.name} src={item.image} /></Link>
              </div>
            </div>
          ))}
      </Slider>
  );
}

export default OfferBanner;
