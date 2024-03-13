import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function AutoSlider() {
  const sliderRef = useRef(null);

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
  };

  return (
    <div>
      <Slider ref={sliderRef} {...settings}>
        <div>
          <img src="image1.jpg" alt="Image 1" />
        </div>
        <div>
          <img src="image2.jpg" alt="Image 2" />
        </div>
        <div>
          <img src="image3.jpg" alt="Image 3" />
        </div>
        <div>
          <img src="image3.jpg" alt="Image 3" />
        </div>
        <div>
          <img src="image3.jpg" alt="Image 3" />
        </div>
      </Slider>
      <div>
        <button onClick={goToPrev}>Previous</button>
        <button onClick={goToNext}>Next</button>
      </div>
    </div>
  );
}

export default AutoSlider;
