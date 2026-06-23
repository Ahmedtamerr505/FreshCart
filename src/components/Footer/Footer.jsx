import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-10 mt-10 border-t border-gray-200 mx-auto">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">FreshCart</h2>
            <p className="text-gray-500 mt-2">Get your groceries delivered to your home.</p>
          </div>
          
          <div className="flex gap-6">
            <Link to="/" className="text-gray-600 hover:text-emerald-600 transition">Home</Link>
            <Link to="/products" className="text-gray-600 hover:text-emerald-600 transition">Products</Link>
            <Link to="/cart" className="text-gray-600 hover:text-emerald-600 transition">Cart</Link>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300" />

        {/* Copyright Section */}
        <div className="text-center mt-8 text-gray-500">
          <p>&copy; {currentYear} FreshCart Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}