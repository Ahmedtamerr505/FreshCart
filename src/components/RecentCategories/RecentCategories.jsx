import React, { useEffect, useState } from 'react'
import style from "./RecentCategories.module.css"
import axios from 'axios'

export default function RecentCategories() {
  const [categorys, setcategorys] = useState([])

  function getCategory(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      console.log(res.data.data);

      setcategorys(res.data.data)
    })
    .catch((res)=>{
      res

    })
  }
  useEffect(()=>{
    getCategory()
  })
  return <>
  <h1 className='text-center text-emerald-500 text-3xl font-bold'>All Categories</h1>
  <div className='row'>
    {categorys.length > 0 ? categorys.map((category)=>     <div key={category.id} className='w-1/4 p-2'>
    <div className='pb-3 hvr rounded-lg'>
    <img src={category.image} alt="" className='h-60 w-full object-cover'/>
    <h3 className='text-center p-4'>{category.name}</h3>
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
