import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [load, setLoad] = useState(false);
  const { addProduct, setnumberItems, numberItems } = useContext(CartContext);
  const { id } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  async function getProductToCart(prodid) {
    setLoad(true);
    let resp = await addProduct(prodid);
    setLoad(false);
    if (resp?.data?.status === 'success') {
      setnumberItems(numberItems + 1);
      toast.success(resp.data.message);
    } else {
      toast.error(resp?.data?.message || "Failed to add to cart");
    }
  }

  function getProduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getProduct(id);
  }, [id]);

  if (!product) return <div className="text-center py-20 text-emerald-600 font-bold">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Slider Section */}
        <div className="w-full md:w-1/3">
          <Slider {...settings}>
            {product.images.map((src, index) => (
              <img key={index} src={src} className="w-full rounded-lg" alt={product.title} />
            ))}
          </Slider>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          <span className="text-emerald-600 font-medium">{product.category.name}</span>
          
          <div className="flex justify-between items-center my-6">
            <span className="text-xl font-bold text-gray-800">{product.price} EGP</span>
            <span className="flex items-center gap-1">
              <i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage}
            </span>
          </div>

          <button 
            onClick={() => getProductToCart(product.id)} 
            className="w-full md:w-auto bg-emerald-600 text-white py-3 px-10 rounded-lg hover:bg-emerald-700 transition"
          >
            {load ? <i className="fas fa-spinner fa-spin"></i> : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}