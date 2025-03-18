import React, { useContext,useEffect, useState } from 'react'
import style from "./WishList.module.css"
import { WishContext } from '../../Context/WishContext'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function WishList() {
  const [wishitem, setwishitem] = useState(null)
  let {getLoggedWish ,deleteProductt} = useContext(WishContext)
  let{addProduct ,setnumberItems ,numberItems}=useContext(CartContext) 
  const [load, setload] = useState(false)
  const [productID, setproductID] = useState(null)
  
  
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
  async function getProductToCarttt(prodid){
    setproductID(prodid)
    setload(true)
    let resp = await addProduct(prodid)
    console.log(resp);
    if(resp.data.status === 'success'){
      setnumberItems(numberItems +1)
      setload(false);
      toast.success(resp.data.message);
    }
    else{
      setload(false);
      toast.error(resp.data.message);
    }
    
  }
  return (
    <>
      <div className="mt-14 bg-gray-100 relative overflow-x-auto shadow-md sm:rounded-lg p-6">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <h1 className="text-start text-3xl text-gray-800 font-bold p-8">Wish List</h1>
          <tbody>
            {wishitem?.data.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="p-4">
                  <img
                    src={product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full rounded-md"
                    alt={product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800">
                  <h2 className="text-start text-lg">{product.category.name}</h2>
                  <h3 className="text-start text-gray-600">{product.price} EGP</h3>
                  <span
                    onClick={() => {
                      deleteWishProduct(product.id);
                    }}
                    className="font-medium text-md cursor-pointer text-red-600 hover:text-red-800 transition duration-200"
                  >
                    <i className="fa-solid fa-trash"></i> Remove
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      getProductToCarttt(product.id);
                    }}
                    className="bg-blue-500 text-white border-2 border-blue-500 rounded-md px-4 py-2 hover:bg-blue-600 hover:border-blue-600 transition duration-200"
                  >
                    {load && productID === product.id ? (
                      <i className="fas fa-spinner fa-spin text-white"></i>
                    ) : (
                      "Add to cart"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
    
  
}
