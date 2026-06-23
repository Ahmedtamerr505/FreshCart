import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, 
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="py-10">
      <h2 className="text-xl font-bold text-gray-800 mb-6 px-4">Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="px-2">
            <img 
              src={category.image} 
              className="w-full h-[200px] object-cover rounded-lg" 
              alt={category.name} 
            />
            <h4 className="mt-2 text-center text-sm font-medium">{category.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}