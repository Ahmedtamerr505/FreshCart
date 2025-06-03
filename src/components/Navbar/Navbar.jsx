import React, { useContext, useState } from 'react';
import logo from '../../assets/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  let { numberItems } = useContext(CartContext);

  const [menuOpen, setMenuOpen] = useState(false);

  function signOut() {
    localStorage.removeItem('userToken');
    setuserLogin(null);
    navigate('/login');
  }

  return (
    <>
      <nav className="border-gray-200 fixed top-0 right-0 left-0 bg-slate-100 z-50 shadow-md">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          {/* Logo */}
          <NavLink to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </NavLink>

          {/* Centered Navigation Links */}
          <div
            className={`${
              menuOpen ? 'block' : 'hidden'
            } w-full md:flex md:w-auto md:items-center justify-center`}
          >
            {userLogin != null ? (
              <ul className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                <li>
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive
                        ? 'text-emerald-600 font-bold transition duration-200'
                        : 'hover:text-emerald-600 transition duration-200'
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="products"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-emerald-600 font-bold transition duration-200'
                        : 'hover:text-emerald-600 transition duration-200'
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="wishlist"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-emerald-600 font-bold transition duration-200'
                        : 'hover:text-emerald-600 transition duration-200'
                    }
                  >
                    Wish List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="categories"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-emerald-600 font-bold transition duration-200'
                        : 'hover:text-emerald-600 transition duration-200'
                    }
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="brands"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-emerald-600 font-bold transition duration-200'
                        : 'hover:text-emerald-600 transition duration-200'
                    }
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
                <li>
                  <NavLink
                    to="login"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-emerald-600 font-bold transition duration-200'
                        : 'hover:text-emerald-600 transition duration-200'
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="register"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-emerald-600 font-bold transition duration-200'
                        : 'hover:text-emerald-600 transition duration-200'
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Cart Icon and SignOut */}
          {userLogin != null && (
            <div className="flex items-center space-x-4">
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  isActive
                    ? 'text-emerald-600 font-bold transition duration-200'
                    : 'hover:text-emerald-600 transition duration-200'
                }
              >
                <div className="relative flex items-center">
                  <i className="fas fa-shopping-cart text-2xl"></i>
                  {numberItems > 0 && (
                    <div className="bg-emerald-600 text-white text-xs absolute top-[-5px] right-[-10px] rounded-full h-5 w-5 flex items-center justify-center shadow-md border-2 border-white">
                      {numberItems}
                    </div>
                  )}
                </div>
              </NavLink>
              <span
                onClick={signOut}
                className="hidden md:inline-block text-sm cursor-pointer hover:text-red-600 transition duration-200"
              >
                SignOut
              </span>
            </div>
          )}

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 text-2xl md:hidden focus:outline-none"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>
    </>
  );
}