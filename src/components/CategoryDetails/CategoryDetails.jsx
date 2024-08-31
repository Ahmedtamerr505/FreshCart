import React, { useEffect, useState } from 'react'
import style from "./CategoryDetails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function CategoryDetails() {
  const [categor, setcategor] = useState(null)
  let {id} =useParams()

  function getCategorii(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    .then((res)=>{
      console.log(res);
      
    })
    .catch((res)=>{
      res

    })
  }
  useEffect(()=>{
    getCategorii(id)
  },[])
  return <>
  <h1>aaaaaaa</h1>
  </>
    
  
}
