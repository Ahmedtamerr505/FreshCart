import React, { useContext, useState } from 'react';
import logo from '../../assets/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  const { userLogin, setuserLogin } = useContext(UserContext);
  const { numberItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const signOut = () => {
    localStorage.removeItem('userToken');
    setuserLogin(null);
    navigate('/login');
  };

  // Helper for NavLink styling
  const getLinkClass = ({ isActive }) =>
    `block py-2 px-3 transition duration-200 ${
      isActive ? 'text-emerald-600 font-bold' : 'hover:text-emerald-600'
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-100 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        {/* Logo */}
        <NavLink to="" className="flex items-center">
          <img src={logo} className="h-8" alt="FreshCart Logo" />
        </NavLink>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 text-2xl focus:outline-none"
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* Navigation Links */}
        <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:items-center`}>
          <ul className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-4 md:mt-0">
            {userLogin ? (
              <>
                <li><NavLink to="" className={getLinkClass}>Home</NavLink></li>
                <li><NavLink to="products" className={getLinkClass}>Products</NavLink></li>
                <li><NavLink to="wishlist" className={getLinkClass}>Wish List</NavLink></li>
                <li><NavLink to="categories" className={getLinkClass}>Categories</NavLink></li>
                <li><NavLink to="brands" className={getLinkClass}>Brands</NavLink></li>
              </>
            ) : (
              <>
                <li><NavLink to="login" className={getLinkClass}>Login</NavLink></li>
                <li><NavLink to="register" className={getLinkClass}>Register</NavLink></li>
              </>
            )}
          </ul>

          {/* User Actions (Cart & Logout) */}
          {userLogin && (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0 md:ml-6 border-t md:border-0 pt-4 md:pt-0">
              <NavLink to="cart" className="relative flex items-center hover:text-emerald-600">
                <i className="fas fa-shopping-cart text-xl"></i>
                {numberItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                    {numberItems}
                  </span>
                )}
              </NavLink>
              <button onClick={signOut} className="text-sm text-gray-700 hover:text-red-600 transition">
                SignOut
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}