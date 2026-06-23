import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function RecentBrands() {
  const [brands, setBrands] = useState([]);

  function getBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        setBrands(res.data.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getBrands();
  }, []);

  const handleBrandClick = (brand) => {
    Swal.fire({
      title: brand.name,
      imageUrl: brand.image,
      imageAlt: brand.name,
      confirmButtonText: 'Close',
      confirmButtonColor: '#059669',
      position: 'center',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl text-emerald-500 font-bold">All Brands</h1>
      
      {brands.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="cursor-pointer"
              onClick={() => handleBrandClick(brand)}
            >
              <div className="rounded-lg border border-gray-100 overflow-hidden p-4 shadow-lg hover:shadow-emerald-500/50 transition duration-300 transform hover:scale-105">
                <img src={brand.image} className="w-full h-48 object-contain" alt={brand.name} />
                <h3 className="text-center font-medium py-4">{brand.name}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-20">
          <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
        </div>
      )}
    </div>
  );
}