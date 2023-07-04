import React, { useState, useEffect } from 'react';
import { Container, Image } from 'semantic-ui-react';

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    'https://nypost.com/wp-content/uploads/sites/2/2022/12/Magomed-Ankalaev.jpg?quality=75&strip=all',
    'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/04/16/16816385486644.jpg',
    'https://content.api.news/v3/images/bin/d143a99d79c3adf18726d97b934f4a79'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <Container className="slider-container">
      <Image src={images[activeIndex]} alt="Slider Image" fluid />
    </Container>
  );
};

export default ImageSlider;
