import React, { useEffect, useState } from 'react'
import style from "./RecentBrands.module.css"
import axios from 'axios'

export default function RecentBrands() {
  const [brands, setbrands] = useState([])
  function getBrands(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res)=>{
      console.log(res.data.data);
      setbrands(res.data.data)
    })
    .catch((res)=>{
    })
  }
  useEffect(()=>{
    getBrands()
  })
  return <>
  <h1 className='mt-5 text-3xl text-emerald-500 font-bold'>All Brands</h1>
  <div className='row'>
    {brands.length > 0 ? brands.map((brand)=><div key={brand.id} className='w-1/4 p-4 '>
    <div className='hvr rounded-lg overflow-hidden p-4'>
    <img src={brand.image} className=''/>
    <h3 className='pb-5'>{brand.name}</h3>
    </div>
</div>): <div class="sk-chase">
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
