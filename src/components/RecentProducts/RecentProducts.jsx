import React, { useContext, useEffect, useState } from 'react'
import style from "./RecentProducts.module.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { WishContext } from '../../Context/WishContext'

export default function RecentProducts() {
  let{addProduct}=useContext(CartContext) 
  let {addProductt} = useContext(WishContext)
const [products, setproducts] = useState([])
const [load, setload] = useState(false)
const [productID, setproductID] = useState(null)
  function getProducts(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
      setproducts(res.data.data)
    })
    .catch((res)=>{

    })
  }
  async function getProductToCart(prodid){
    setproductID(prodid)
    setload(true)
    let resp = await addProduct(prodid)
    console.log(resp);
    if(resp.data.status === 'success'){
      setload(false);
      toast.success(resp.data.message);
    }
    else{
      setload(false);
      toast.error(resp.data.message);
    }
    
  }
  async function getProductToWish(prodid){
    setproductID(prodid)
    setload(true)
    let resp = await addProductt(prodid)
    console.log(resp);
    if(resp.data.status === 'success'){
      setload(false);
      toast.success(resp.data.message);
    }
    else{
      setload(false);
      toast.error(resp.data.message);
    }
    
  }
  useEffect(()=>{
    getProducts()
  },[])



  return <>
  <div className='row'>
  {products.length > 0 ?   products.map((product)=> <div key={product.id} className='w-1/4 p-3'>
  <div className='product shadow rounded-lg p-2 hvr'>
  <Link to={`productdetails/${product.id}`}>
  <img src={product.imageCover} className='w-full' alt="" />
    <h3 className='text-emerald-500 '>{product.category.name}</h3>
    <h3 className='font-semibold mb-4'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
    <div className='flex justify-between p-3'>
      <span>{product.price}EGP</span>
      <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
    </div>
  </Link>
    <button onClick={()=>{getProductToCart(product.id)}} className='btn'>
      
      {load && productID == product.id ?  <i className='fas fa-spinner fa-spin text-white'></i> : '+ Add'}</button>
      <i onClick={()=>{getProductToWish(product.id)}}  className='fas fa-heart text-black ps-1 text-xl cursor-pointer focus:text-red-600'></i>
  </div>

</div>) : <div class="sk-chase">
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
</div>}
  </div>

  </>
    
  
}
