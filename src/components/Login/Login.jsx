import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  let { setuserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [ApiError, setApiEroor] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function handleLogin(values) {
    setisLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setisLoading(false);
        if (res.data.message === "success") {
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        setisLoading(false);
        setApiEroor(err.response?.data.message || "Something went wrong");
      });
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().matches(/^[A-Za-z0-9]{6,15}$/, "Password must be 6-15 characters").required("Password is required"),
  });

  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: handleLogin
  });

  return (
    <div className="py-10 max-w-md mx-auto px-4">
      {ApiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {ApiError}
        </div>
      )}
      
      <h1 className="text-3xl text-emerald-600 font-bold mb-6">Login Now</h1>
      
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-start ms-2 text-gray-700 mb-1">Email :</label>
          <input 
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.email} 
            name='email' 
            type="email" 
            id="email" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
          />
          {formik.errors.email && formik.touched.email && (
            <span className='text-red-500 text-sm'>{formik.errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-start ms-2 text-gray-700 mb-1">Password :</label>
          <input 
            onBlur={formik.handleBlur} 
            onChange={formik.handleChange} 
            value={formik.values.password} 
            name='password' 
            type="password" 
            id="password" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
          />
          {formik.errors.password && formik.touched.password && (
            <span className='text-red-500 text-sm'>{formik.errors.password}</span>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <button type="submit" className="w-full bg-emerald-700 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-600 transition">
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Login"}
          </button>
          <Link to={"/register"} className="text-center text-sm text-blue-600 hover:underline">
            Don't have an account? Register Now
          </Link>
        </div>
      </form>
    </div>
  );
}