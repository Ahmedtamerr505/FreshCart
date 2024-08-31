import React, { useContext, useState } from 'react'
import style from "./Register.module.css"
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { UserContext } from '../../Context/UserContext'

export default function Register() {
  let {userLogin , setuserLogin} = useContext(UserContext)
  const navigate = useNavigate()
  const [ApiError , setApiEroor] = useState("")
  const [isLoading , setisLoading] = useState(false)


  function handleRegister(values) {
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .then((res)=> {
      setisLoading(false)
      if(res.data.message == "success"){
        localStorage.setItem("userToken",res.data.token)
        setuserLogin(res.data.token)
        navigate("/")
      }
    })
    .catch((res)=> {
      setisLoading(false)
      setApiEroor(res.response.data.message)
    })
  }


  let validationSchema = Yup.object().shape({
    name : Yup.string().min(3,"min lenght is 3").max(15,"max lenght is 15").required("Name is required"),
    email : Yup.string().email("Invalid email").required("email is required"),
    phone : Yup.string().matches(/^01[0125][0-9]{8}$/,"Invalid phone number").required("Phone number is required"),
    password : Yup.string().matches(/^[A-Za-z0-9]{6,15}$/,"Password should be between 6 and 15 char").required("Password is required"),
    rePassword : Yup.string().oneOf([Yup.ref("password")],"rePassword and password are not the same").required("rePassword is required"),

  })



  let formik = useFormik({
    initialValues : {
      name :"",
      email :"",
      phone :"",
      password :"",
      rePassword :"",
    },
    validationSchema,
    onSubmit : handleRegister

  })
  return <>
  {ApiError ? <div className='bg-red-500 w-1/2 mx-auto text-white font-bold rounded-lg p-3 text-center'>
  {ApiError}
  </div> : null}
  <h1 className='p-4 text-2xl text-emerald-600 font-bold'>Register Now </h1>
  <form onSubmit={formik.handleSubmit} className="max-w-7xl mx-auto relative">
  <div className="mb-5 relative mt-10">
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' type="text" id="name" className="shadow-sm bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-emerald-600 dark:placeholder-gray-400  dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light" required />
    <label htmlFor="name" className="block py-2 absolute bottom-9 left-0 mb-2 text-sm font-medium text-gray-900">Your Name :</label>
  </div>
  {formik.errors.name && formik.touched.name? <span className='text-red-600'>{formik.errors.name}</span> : null }  
  <div className="mb-5 relative mt-10">
    <label htmlFor="email" className="block py-2 absolute bottom-9 left-0 mb-2 text-sm font-medium text-gray-900">Your Email :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' type="email" id="email" className="shadow-sm bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-emerald-600 dark:placeholder-gray-400  dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light" required />
  </div>
  {formik.errors.email && formik.touched.email? <span className='text-red-600'>{formik.errors.email}</span> : null }  
  <div className="mb-5 relative mt-10">
    <label htmlFor="password" className="block py-2 absolute bottom-9 left-0  mb-2 text-sm font-medium text-gray-900">Your Password :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' type="password" id="password" className="shadow-sm bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-emerald-600 dark:placeholder-gray-400  dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light" required />
  </div>
  {formik.errors.password && formik.touched.password? <span className='text-red-600'>{formik.errors.password}</span> : null }  
  <div className="mb-5 relative mt-10">
    <label htmlFor="rePassword" className="block py-2 absolute bottom-9 left-0  mb-2 text-sm font-medium text-gray-900">Your RePassword :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name='rePassword' type="password" id="rePassword" className="shadow-sm bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-emerald-600 dark:placeholder-gray-400  dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light" required />
  </div>
  {formik.errors.rePassword && formik.touched.rePassword? <span className='text-red-600'>{formik.errors.rePassword}</span> : null }  
  <div className="mb-5 relative mt-10">
    <label htmlFor="phone" className="block py-2 absolute bottom-9 left-0  mb-2 text-sm font-medium text-gray-900">Your Phone :</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' type="tel" id="phone" className="shadow-sm bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-emerald-600 dark:placeholder-gray-400  dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light" required />
  </div>
  {formik.errors.phone && formik.touched.phone? <span className='text-red-600 block pb-6'>{formik.errors.phone}</span> : null }  
  <div>
  <button type="submit" className="text-white absolute left-0 bg-emerald-800 hover:bg-emerald-600  focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center">
    {isLoading ? <i className='fas fa-spinner fa-spin text-white'></i> : "Register"}
  </button>
  <Link to={"/login"}><span className='text-blue-600 underline'> do you have an account? Login Now</span></Link>
  </div>
  </form>

  
  </>
    
  
}
