import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Cart() {
  const [cartItems, setCartItems] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getLoggedCart, updateProduct, deleteProduct, setnumberItems, clearCart } = useContext(CartContext);

  async function getCart() {
    try {
      const res = await getLoggedCart();
      setCartItems(res.data.data);
    } catch (error) {
      toast.error('Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  }

  async function updateCart(id, count) {
    if (count < 1) return deleteCart(id);
    const res = await updateProduct(id, count);
    setCartItems(res.data.data);
  }

  async function deleteCart(id) {
    const res = await deleteProduct(id);
    setCartItems(res.data.data);
    setnumberItems(res.data.numOfCartItems);
    toast.success('Product removed');
  }

  async function clear() {
    await clearCart();
    setCartItems(null);
    setnumberItems(0);
  }

  useEffect(() => {
    getCart();
  }, []);

  if (isLoading) return <div className="text-center py-20 font-bold text-emerald-600">Loading your cart...</div>;

  return (
    <div className="container mx-auto px-4 mt-20 mb-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

      {cartItems?.products?.length > 0 ? (
        <div className="bg-white shadow-lg rounded-2xl p-6 border">
          {/* Cart List */}
          <div className="divide-y">
            {cartItems.products.map((item) => (
              <div key={item.product.id} className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
                <div className="flex items-center gap-4 w-full sm:w-1/2">
                  <img src={item.product.imageCover} className="w-20 h-20 object-cover rounded-lg" alt={item.product.title} />
                  <div>
                    <h3 className="font-semibold text-lg">{item.product.title.split(" ").slice(0, 3).join(" ")}</h3>
                    <p className="text-emerald-600 font-bold">{item.price} EGP</p>
                    <button onClick={() => deleteCart(item.product.id)} className="text-red-500 text-sm hover:underline mt-1">
                      <i className="fas fa-trash mr-1"></i> Remove
                    </button>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button onClick={() => updateCart(item.product.id, item.count - 1)} className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
                    <i className="fas fa-minus text-sm"></i>
                  </button>
                  <span className="font-bold text-lg w-8 text-center">{item.count}</span>
                  <button onClick={() => updateCart(item.product.id, item.count + 1)} className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600">
                    <i className="fas fa-plus text-sm"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xl font-bold">
              Total Price: <span className="text-emerald-600">{cartItems.totalCartPrice} EGP</span>
            </div>
            <div className="flex gap-4">
              <button onClick={clear} className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">Clear Cart</button>
              <Link to="/checkout" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Checkout</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
          <Link to="/" className="text-emerald-600 font-bold underline mt-2 block">Go Shopping</Link>
        </div>
      )}
    </div>
  );
}