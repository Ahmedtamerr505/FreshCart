import React from 'react';
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import slide4 from "../../assets/grocery-banner-2.jpeg";
import slide5 from "../../assets/grocery-banner.png";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, 
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="flex flex-col md:flex-row">
        {/* Main Slider Section */}
        <div className="w-full md:w-3/4">
          <Slider {...settings}>
            <img src={slide1} className="w-full h-[300px] md:h-[400px] object-cover" alt="Main Promo" />
            <img src={slide4} className="w-full h-[300px] md:h-[400px] object-cover" alt="Grocery Promo" />
            <img src={slide5} className="w-full h-[300px] md:h-[400px] object-cover" alt="Banner" />
          </Slider>
        </div>

        {/* Side Banners Section */}
        <div className="w-full md:w-1/4 flex flex-col">
          <img src={slide2} className="w-full h-[150px] md:h-[200px] object-cover" alt="Side Banner 1" />
          <img src={slide3} className="w-full h-[150px] md:h-[200px] object-cover" alt="Side Banner 2" />
        </div>
      </div>
    </div>
  );
}