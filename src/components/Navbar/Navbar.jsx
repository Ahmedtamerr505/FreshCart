import React, { useContext } from 'react'
import style from "./Navbar.module.css"
import logo from "../../assets/freshcart-logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'


export default function Navbar() {
  
  let {userLogin , setuserLogin} = useContext(UserContext)
  let navigate = useNavigate()
  let {numberItems} = useContext(CartContext)

  function signOut(){
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }


  return <>
  
<nav className=" border-gray-200 fixed top-0 right-0 left-0 bg-slate-100 z-50">
    <div className="flex flex-wrap justify-between items-center  mx-auto max-w-screen-xl p-4">
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Flowbite Logo" />
        </Link>
        {userLogin != null ? 
        <>
        <ul className='flex gap-4'>
              <li><Link to="">Home</Link></li>
              <li><Link to="cart">
              Cart <div className='absolute top-[-13px] right-[-13px] size-5 p-1 bg-emerald-600 text-white rounded-full flex items-center justify-center '>
              {numberItems}
              </div>
              </Link></li>
              <li><Link to="products">Products</Link></li>
              <li><Link to="wishlist">Wish List</Link></li>
              <li><Link to="categories">Categories</Link></li>
              <li><Link to="brands">Brands</Link></li>
        </ul>
        </>: null}
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className='links flex gap-4'>
              {userLogin != null ?<span onClick={signOut} className="text-sm cursor-pointer">SignOut</span> : <>
                <Link to="login" className="text-sm">Login</Link>
                <Link to="register" className="text-sm">Register</Link>
              </> }
            </div>
        </div>
    </div>
</nav>

  </>
    
  
}
