import React from 'react';
import { Link } from 'react-router-dom';
import errorIllustration from '../../assets/error.svg';

export default function Notfound() {
  return <>
  <div className="min-h-screen flex items-center justify-center  px-6 py-12">
      <div className="text-center max-w-xl mx-auto flex flex-col items-center">
        
        {/* Modern Illustration */}
        <div className="w-full max-w-md mb-12">
          <img 
            src={errorIllustration} 
            alt="404 Error - Page Not Found" 
            className="w-full h-auto"
          />
        </div>

        {/* Text Content */}
        {/* <h1 className="text-6xl md:text-8xl font-extrabold text-emerald-600 mb-4">
          404
        </h1> */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-lg">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
          Please check the URL or try navigating back to the homepage.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/" 
            className="inline-block bg-emerald-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-600 transition"
          >
            Go to Homepage
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="inline-block bg-slate-100 text-gray-800 font-medium px-8 py-3 rounded-lg hover:bg-slate-200 transition border border-gray-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  </>
    
  
}
