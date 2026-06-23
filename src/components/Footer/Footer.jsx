import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-10 mt-10 border-t border-gray-200 mx-auto">
      <div className="container mx-auto px-4">


        {/* Copyright Section */}
        <div className="text-center  text-gray-500">
          <p>&copy; {currentYear} FreshCart Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}