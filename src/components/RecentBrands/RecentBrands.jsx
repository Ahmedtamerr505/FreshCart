import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function RecentBrands() {
  const [brands, setbrands] = useState([]);

  function getBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then((res) => {
        console.log(res.data.data);
        setbrands(res.data.data);
      })
      .catch((res) => {});
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
      position: 'top',
    });
  };

  return (
    <>
      <h1 className="mt-5 text-3xl text-emerald-500 font-bold">All Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {brands.length > 0 ? (
          brands.map((brand) => (
            <div
              key={brand.id}
              className="p-4"
              onClick={() => handleBrandClick(brand)}
            >
              <div className="hvr rounded-lg overflow-hidden p-4 min-w-72 shadow-lg hover:shadow-emerald-500/50 transition duration-300">
                <img src={brand.image} className="" alt={brand.name} />
                <h3 className="pb-5">{brand.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
        )}
      </div>
    </>
  );
}