import React, { useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { useContext } from 'react';

export default function ProductDetails() {
  const [product, setproduct] = useState(null)
  let{addProduct ,setnumberItems ,numberItems}=useContext(CartContext) 
  const [load, setload] = useState(false)
  const [productID, setproductID] = useState(null)
  let {id} =useParams()
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getProductToCartt(prodid){
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
  function getProduct(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{
      console.log(res.data.data);
      setproduct(res.data.data)
    })
    .catch((res)=>{
      console.log(res);
    })
  }
  useEffect(()=>{
    getProduct(id)
  },[])
  return <>
  <div className='row items-center'>
    <div className='w-1/4'>
    <Slider {...settings}>
      {product?.images.map((src)=> <img src={src} className='w-full'/>) }
    </Slider>
    </div>
    <div className='w-3/4 p-4 '>
    <h3 className='font-semibold capitalize text-2xl text-start'>{product?.title}</h3>
    <h4 className='text-gray-700 my-3 text-start'>{product?.description}</h4>
    <h4 className='text-start'>{product?.category.name}</h4>
    <div className='flex justify-between p-3 my-5'>
      <span>{product?.price}EGP</span>
      <span><i className='fas fa-star text-yellow-400'></i> {product?.ratingsAverage}</span>
    </div>
    <button onClick={()=>{getProductToCartt(product.id)}} className='btn'>
    {load && productID == product.id ?  <i className='fas fa-spinner fa-spin text-white'></i> : '+ Add'} </button>
    </div>

  </div>
  </>
    
  
}
