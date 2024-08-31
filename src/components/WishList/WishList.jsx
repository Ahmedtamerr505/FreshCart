import React, { useContext,useEffect, useState } from 'react'
import style from "./WishList.module.css"
import { WishContext } from '../../Context/WishContext'

export default function WishList() {
  const [wishitem, setwishitem] = useState(null)
  let {getLoggedWish ,deleteProductt} = useContext(WishContext)
  
  async function getWishItems() {
    let respon = await getLoggedWish()
    console.log(respon.data);
    setwishitem(respon.data);
  }
  async function deleteWishProduct(prodId) {
    let respon = await deleteProductt(prodId)
    setwishitem(respon.data);
 
  }
  useEffect(()=>{
    getWishItems()
    deleteWishProduct()

  })
  return <>
  
    <div className='mt-14 bg-gray-400 relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <h1 className='text-start text-2xl text-gray-800 font-semibold p-8'>Wish List</h1>
        <tbody>
          {wishitem?.data.map((product)=>       <tr key={product.id} className='bg-white border-b dark:bg-emerald-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-emerald-600"'>
          <td className="p-4">
          <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full"  />
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          <h2 className='text-start text-xl'>{product.category.name}</h2>
          <h3 className='text-start text-black'>{product.price} EGP</h3>
          <span onClick={()=>{deleteWishProduct(product.id)}} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">Remove</span>
          </td>

          </tr>) }

        </tbody>
      </table>
    </div>

  
  </>
    
  
}
