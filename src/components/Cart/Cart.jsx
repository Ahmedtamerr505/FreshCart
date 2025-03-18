import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Cart() {
  const [cartitems, setcartitems] = useState(null);
  let { getLoggedCart, updateProduct, deleteProduct, numberItems, setnumberItems, clearCart } = useContext(CartContext);

  // Fetch cart items
  async function getCartItems() {
    try {
      let respon = await getLoggedCart();
      setcartitems(respon.data.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Failed to fetch cart items.');
    }
  }

  // Update product quantity in the cart
  async function updateCartProduct(prodid, count) {
    try {
      let respon = await updateProduct(prodid, count);
      if (respon.data.status === 'success') {
        setcartitems(respon.data.data);
        toast.success('Product quantity updated.');
      } else {
        toast.error('Failed to update product quantity.');
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
      toast.error('Failed to update product quantity.');
    }
  }

  // Remove product from the cart
  async function deleteCartProduct(prodid) {
    try {
      let respon = await deleteProduct(prodid);
      if (respon.data.status === 'success') {
        setnumberItems(numberItems - 1);
        setcartitems(respon.data.data);
        toast.success('Product removed successfully.');
      } else {
        toast.error('Failed to remove product.');
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
      toast.error('Failed to remove product.');
    }
  }

  // Clear the cart
  async function clearCarttt() {
    let respon = await clearCart();
    setcartitems(null);
  }

  // Fetch cart items on component mount
  useEffect(() => {
    getCartItems(); // Only fetch cart items on mount
  }, []);

  return (
    <>
      <div className="mt-14 bg-gray-100 relative overflow-x-auto shadow-md sm:rounded-lg p-6">
        {cartitems?.products?.length > 0 ? (
          <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">Product</th>
                  <th scope="col" className="px-6 py-3">Qty</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartitems.products.map((product) => (
                  <tr
                    key={product.product.id}
                    className="bg-white border-b hover:bg-gray-100 transition duration-200"
                  >
                    <td className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full rounded-md"
                        alt={product.product.title}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateCartProduct(product.product.id, product.count - 1)}
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-blue-500 bg-white border border-blue-300 rounded-full focus:outline-none hover:bg-blue-100 focus:ring-4 focus:ring-blue-200"
                          type="button"
                        >
                          <span className="sr-only">Decrease quantity</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button
                          onClick={() => updateCartProduct(product.product.id, product.count + 1)}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-blue-500 bg-white border border-blue-300 rounded-full focus:outline-none hover:bg-blue-100 focus:ring-4 focus:ring-blue-200"
                          type="button"
                        >
                          <span className="sr-only">Increase quantity</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {product.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteCartProduct(product.product.id)}
                        className="font-medium cursor-pointer text-red-600 hover:text-red-800 transition duration-200 flex items-center gap-2"
                      >
                        <i className="fas fa-trash"></i> Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="text-center p-4 text-2xl text-gray-600">
              Total price <span className="text-emerald-500 text-2xl">{cartitems?.totalCartPrice} EGP</span>
            </h3>
          </>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-2xl text-gray-600">Your cart is empty.</h2>
          </div>
        )}
      </div>
      {cartitems?.products?.length > 0 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => clearCarttt()}
            className="text-red-500 border-2 border-red-500 rounded-md px-4 py-2 hover:text-white hover:bg-red-500"
          >
            Clear cart
          </button>
          <Link
            to={'/checkout'}
            className="text-green-500 border-2 border-green-500 rounded-md px-4 py-2 hover:text-white hover:bg-green-500"
          >
            Check Out
          </Link>
        </div>
      )}
    </>
  );
}