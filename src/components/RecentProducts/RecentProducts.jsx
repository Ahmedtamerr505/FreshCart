import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishContext } from '../../Context/WishContext';

export default function RecentProducts() {
  let { addProduct, setnumberItems, numberItems } = useContext(CartContext);
  let { addProductt, removeProductt } = useContext(WishContext);

  const [products, setproducts] = useState([]);
  const [load, setload] = useState(false);
  const [productID, setproductID] = useState(null);
  const [favoritedProducts, setFavoritedProducts] = useState([]);

  // Fetch products from the API
  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        setproducts(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // Add product to cart
  async function getProductToCart(prodid) {
    setproductID(prodid);
    setload(true);
    let resp = await addProduct(prodid);
    if (resp.data.status === 'success') {
      setnumberItems(numberItems + 1);
      setload(false);
      toast.success(resp.data.message);
    } else {
      setload(false);
      toast.error(resp.data.message);
    }
  }

  // Toggle product in wishlist
  async function toggleWishlist(prodid) {
    if (favoritedProducts.includes(prodid)) {
      setFavoritedProducts(favoritedProducts.filter((id) => id !== prodid));
      let resp = await removeProductt(prodid);
      if (resp.data.status === 'success') {
        toast.success(resp.data.message);
      } else {
        toast.error(resp.data.message);
      }
    } else {
      setFavoritedProducts([...favoritedProducts, prodid]);
      let resp = await addProductt(prodid);
      if (resp.data.status === 'success') {
        toast.success(resp.data.message);
      } else {
        toast.error(resp.data.message);
      }
    }
  }

  // Fetch products on component mount
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="p-3">
              <div className="product bg-white shadow-lg rounded-lg overflow-hidden p-2 transform transition duration-300 hover:scale-105 hover:shadow-emerald-500/50">
                {/* Navigate to Product Details */}
                <Link to={`productdetails/${product.id}`}>
                  <img
                    src={product.imageCover}
                    className="w-full"
                    alt={product.title}
                  />
                  <h3 className="text-emerald-500">{product.category.name}</h3>
                  <h3 className="font-semibold mb-4">
                    {product.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <div className="flex justify-between p-3">
                    <span>{product.price}EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    getProductToCart(product.id);
                  }}
                  className="btn"
                >
                  {load && productID === product.id ? (
                    <i className="fas fa-spinner fa-spin text-white"></i>
                  ) : (
                    '+ Add'
                  )}
                </button>
                {/* Add to Wishlist Icon */}
                <i
                  onClick={() => {
                    toggleWishlist(product.id);
                  }}
                  className={`fas fa-heart ps-1 text-2xl cursor-pointer ${
                    favoritedProducts.includes(product.id) ? 'text-red-600' : 'text-black'
                  } hover:text-red-600 transition duration-200`}
                ></i>
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