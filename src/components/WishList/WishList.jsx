import React, { useContext, useEffect, useState } from 'react';
import { WishContext } from '../../Context/WishContext';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function WishList() {
  const [wishItems, setWishItems] = useState([]);
  const { getLoggedWish, deleteProductt } = useContext(WishContext);
  const { addProduct, setnumberItems, numberItems } = useContext(CartContext);
  
  const [loadingCartId, setLoadingCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getWishItems() {
    setIsLoading(true);
    try {
      const response = await getLoggedWish();
      setWishItems(response?.data?.data || []);
    } catch (err) {
      toast.error("Failed to load wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteWishProduct(prodId) {
    try {
      await deleteProductt(prodId);
      setWishItems((prev) => prev.filter((item) => item.id !== prodId));
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Error removing item");
    }
  }

  async function addToCart(prodId) {
    setLoadingCartId(prodId);
    try {
      const resp = await addProduct(prodId);
      if (resp?.data?.status === 'success') {
        setnumberItems(numberItems + 1);
        toast.success("Added to cart!");
      }
    } catch (err) {
      toast.error("Failed to add to cart");
    } finally {
      setLoadingCartId(null);
    }
  }

  useEffect(() => {
    getWishItems();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Wish List</h1>
      
      {isLoading ? (
        <div className="text-center py-20 text-emerald-600 font-bold">Loading...</div>
      ) : wishItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500">Your wishlist is empty.</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden border">
          <table className="w-full text-left">
            <tbody className="divide-y">
              {wishItems.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <img src={product.imageCover} className="w-24 h-24 object-cover rounded-md" alt={product.title} />
                  </td>
                  <td className="px-6 py-4">
                    <h2 className="font-bold text-lg">{product.category.name}</h2>
                    <p className="text-emerald-600 font-semibold">{product.price} EGP</p>
                    <button 
                      onClick={() => deleteWishProduct(product.id)}
                      className="text-red-500 hover:text-red-700 mt-2 flex items-center gap-1"
                    >
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition"
                    >
                      {loadingCartId === product.id ? <i className="fas fa-spinner fa-spin"></i> : "Add to cart"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}