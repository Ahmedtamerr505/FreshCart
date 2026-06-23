import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { UserContext } from '../../Context/UserContext';

export default function Register() {
  let { setuserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [ApiError, setApiEroor] = useState("");
  const [isLoading, setisLoading] = useState(false);

  function handleRegister(values) {
    setisLoading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
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
        setApiEroor(err.response?.data.message || "An error occurred");
      });
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Min length 3").max(15, "Max length 15").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid phone number").required("Phone number is required"),
    password: Yup.string().matches(/^[A-Za-z0-9]{6,15}$/, "Password must be 6-15 characters").required("Password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match").required("RePassword is required"),
  });

  let formik = useFormik({
    initialValues: { name: "", email: "", phone: "", password: "", rePassword: "" },
    validationSchema,
    onSubmit: handleRegister
  });

  return (
    <div className="py-10 max-w-lg mx-auto px-4">
      {ApiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {ApiError}
        </div>
      )}

      <h1 className="text-3xl text-emerald-600 font-bold mb-6">Register Now</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {[
          { name: 'name', label: 'Full Name :', type: 'text' },
          { name: 'email', label: 'Email :', type: 'email' },
          { name: 'password', label: 'Password :', type: 'password' },
          { name: 'rePassword', label: 'Confirm Password :', type: 'password' },
          { name: 'phone', label: 'Phone :', type: 'tel' },
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm text-start ms-2 text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values[field.name]}
              name={field.name}
              type={field.type}
              id={field.name}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            {formik.errors[field.name] && formik.touched[field.name] && (
              <span className='text-red-500 text-sm'>{formik.errors[field.name]}</span>
            )}
          </div>
        ))}

        <div className="pt-2">
          <button type="submit" className="w-full bg-emerald-700 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-600 transition">
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}
          </button>
          <div className="text-center mt-4">
            <Link to={"/login"} className="text-sm text-blue-600 hover:underline">
              Already have an account? Login Now
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}