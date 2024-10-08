import React, { useContext, useEffect, useState } from 'react'
import style from "./Cart.module.css"
import { CartContext } from '../../Context/CartContext'
import Products from './../Products/Products';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Cart() {
  const [cartitems, setcartitems] = useState(null)
  let {getLoggedCart , updateProduct,deleteProduct,numberItems, setnumberItems,clearCart} = useContext(CartContext)

  async function getCartItems() {
    let respon = await getLoggedCart()
    // console.log(respon.data.data);
    setcartitems(respon.data.data);
  }
  async function updateCartProduct(prodid , count) {
    let respon = await updateProduct(prodid , count)
    setcartitems(respon.data.data);
 
  }
  async function deleteCartProduct(prodid) {
    let respon = await deleteProduct(prodid)
    if(respon.data.status == 'success'){
      setnumberItems(numberItems -1);
      setcartitems(respon.data.data);
      toast.success("Product removed successfully")
    }
   
 
  }
  async function clearCarttt() {
    let respon = await clearCart()
    setcartitems(null)
  }
  useEffect(()=>{
    getCartItems()
    deleteCartProduct()
    updateCartProduct()

  })

  return <>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-emerald-500 dark:bg-emerald-700 dark:text-gray-700">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {cartitems?.products.map((product)=>   <tr key={product.product.id} className="bg-white border-b dark:bg-emerald-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-emerald-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>{updateCartProduct(product.product.id,product.count - 1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span>{product.count}</span>
            </div>
            <button onClick={()=>{updateCartProduct(product.product.id,product.count + 1)}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price}EGP
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>{deleteCartProduct(product.product.id)}} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">Remove</span>
        </td>
      </tr>)}
    </tbody>
  </table>
  <h3 className='text-center p-4 text-2xl text-gray-600'>Total price<span className='text-emerald-500 text-2xl'>{cartitems?.totalCartPrice}EGP</span></h3>
 
</div>
<br />
<div className='flex justify-between'>
<button onClick={()=>{clearCarttt()}} className='text-red-500 border-2 border-red-500 rounded-md px-4 py-2 hover:text-white hover:bg-red-500'>Clear cart</button>
<Link to={'/checkout'} className=' text-emerald-500 border-2 border-emerald-500 rounded-md px-4 py-2 hover:text-white hover:bg-emerald-500'>Check Out</Link>

</div>


  </>
    
  
}
