import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import hero1 from '../../assets/img/hero1.png'

function CarouselComponent() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (newIndex) => {
    setActiveIndex(newIndex);
  };

  return (
    <Carousel indicators={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={hero1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={hero1}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={hero1}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
