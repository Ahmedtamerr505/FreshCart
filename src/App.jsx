import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Brands from './components/Brands/Brands';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Categories from './components/Categories/Categories';
import Notfound from './components/Notfound/Notfound';
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import WishList from './components/WishList/WishList';
import WishContextProvider from './Context/WishContext';
import CheckOut from './components/CheckOut/CheckOut';

let x = createBrowserRouter([
  {path:"",element: <Layout/>,children:[
    {index: true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path: "cart",element:<ProtectedRoute><Cart/></ProtectedRoute> },
    {path: "products",element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path: "brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path: "wishlist",element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path: "checkout",element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path: "productdetails/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path: "register",element:<Register/>},
    {path: "login",element:<Login/>},
    {path: "categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path: "*",element:<Notfound/>},
  ]}
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <WishContextProvider>
    <CartContextProvider>
    <UserContextProvider>
      <CounterContextProvider>
        <RouterProvider router={x}></RouterProvider>
        <Toaster />
      </CounterContextProvider>
    </UserContextProvider>
    </CartContextProvider>
    </WishContextProvider>

    </>)

   
}

export default App
