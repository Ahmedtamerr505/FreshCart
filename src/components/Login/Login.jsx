import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { UserContext } from '../../Context/UserContext'


export default function Login() {
  let {userLogin , setuserLogin} = useContext(UserContext)
  const navigate = useNavigate()
  const [ApiError , setApiEroor] = useState("")
  const [isLoading , setisLoading] = useState(false)


  function handleLogin(values) {
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
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
    email : Yup.string().email("Invalid email").required("email is required"),
    password : Yup.string().matches(/^[A-Za-z0-9]{6,15}$/,"Password should be between 6 and 15 char").required("Password is required"),
  })



  let formik = useFormik({
    initialValues : {
      email :"",
      password :"",
    },
    validationSchema,
    onSubmit : handleLogin

  })
  return <>
  {ApiError ? <div className='bg-red-500 w-1/2 mx-auto text-white font-bold rounded-lg p-3 text-center'>
  {ApiError}
  </div> : null}
  <h1 className='p-4 text-2xl text-emerald-600 font-bold'>Login Now </h1>
  <form onSubmit={formik.handleSubmit} className="max-w-7xl mx-auto relative">
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
  <div>
  <button type="submit" className="text-white absolute left-0 bg-emerald-800 hover:bg-emerald-600  focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center">
    {isLoading ? <i className='fas fa-spinner fa-spin text-white'></i> : "Login"}
  </button>
  <Link to={"/register"}><span className='text-blue-600 underline'> don't you have an account? Register Now</span></Link>
  </div>
  </form>

  
  </>
    
  
}