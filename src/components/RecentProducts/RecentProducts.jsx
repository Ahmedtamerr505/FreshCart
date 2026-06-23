import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishContext } from "../../Context/WishContext";

export default function RecentProducts() {
  const { addProduct, setnumberItems, numberItems } = useContext(CartContext);
  const { addProductt, removeProductt } = useContext(WishContext);
  
  // 1. Get search params to detect category filter from URL
  const [searchParams] = useSearchParams();
  const subCatId = searchParams.get("subcategory");

  const [products, setproducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [load, setload] = useState(false);
  const [productID, setproductID] = useState(null);
  const [favoritedProducts, setFavoritedProducts] = useState([]);

  // 2. Fetch products
  function getProducts() {
    const url = subCatId
      ? `https://ecommerce.routemisr.com/api/v1/products?subcategory=${subCatId}`
      : `https://ecommerce.routemisr.com/api/v1/products`;

    axios
      .get(url)
      .then((res) => setproducts(res.data.data))
      .catch((err) => console.error("Error fetching products:", err));
  }

  // 3. Re-run fetch when subcategory changes
  useEffect(() => {
    getProducts();
  }, [subCatId]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function getProductToCart(e, prodid) {
    e.preventDefault();
    setproductID(prodid);
    setload(true);
    try {
      let resp = await addProduct(prodid);
      if (resp?.data?.status === "success") {
        setnumberItems(numberItems + 1);
        toast.success(resp.data.message);
      } else {
        toast.error(resp?.data?.message || "Error");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setload(false);
    }
  }

  async function toggleWishlist(e, prodid) {
    e.preventDefault();
    const isFav = favoritedProducts.includes(prodid);
    setFavoritedProducts((prev) =>
      isFav ? prev.filter((id) => id !== prodid) : [...prev, prodid]
    );
    try {
      if (isFav) await removeProductt(prodid);
      else await addProductt(prodid);
      toast.success("Wishlist updated");
    } catch (err) {
      toast.error("Failed");
      setFavoritedProducts((prev) =>
        isFav ? [...prev, prodid] : prev.filter((id) => id !== prodid)
      );
    }
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      {/* Search Input */}
      <div className="mb-10 relative max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-4 pl-12 border-2 border-gray-200 rounded-full focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-3">
              <Link to={`/productdetails/${product.id}`} className="block group">
                <div className="product bg-white shadow-lg rounded-lg overflow-hidden p-2 transform transition duration-300 hover:scale-105 hover:shadow-emerald-500/50">
                  <img src={product.imageCover} className="w-full" alt={product.title} />
                  <h3 className="text-emerald-500 px-2 mt-2">{product.category.name}</h3>
                  <h3 className="font-semibold mb-4 px-2 truncate">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>

                  <div className="flex justify-between p-3">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 px-2 pb-2">
                    <button
                      onClick={(e) => getProductToCart(e, product.id)}
                      className="btn flex-grow"
                    >
                      {load && productID === product.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        "+ Add"
                      )}
                    </button>
                    <i
                      onClick={(e) => toggleWishlist(e, product.id)}
                      className={`fas fa-heart text-2xl cursor-pointer ${
                        favoritedProducts.includes(product.id) ? "text-red-600" : "text-black"
                      }`}
                    ></i>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 text-xl">
          No products found.
        </div>
      )}
    </div>
  );
}