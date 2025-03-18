import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecentCategories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);

  // Fetch categories from the API
  function getCategory() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }

  // Fetch items for the selected category
  function fetchCategoryItems(categoryId) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/items`)
      .then((res) => {
        setCategoryItems(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching category items:', error);
      });
  }

  // Handle category click
  function handleCategoryClick(category) {
    setSelectedCategory(category);
    fetchCategoryItems(category.id); // Fetch items for the selected category
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <h1 className="mt-5 text-3xl text-emerald-500 font-bold mb-7">All Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-emerald-500/50 border border-gray-200"
            >
              <div className="p-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-48 w-full object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold text-gray-800 hover:text-emerald-500 transition duration-200 text-center mt-4">
                  {category.name}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full">
            <div className="sk-chase">
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
              <div className="sk-chase-dot"></div>
            </div>
          </div>
        )}
      </div>

      {/* Render selected category details */}
      {selectedCategory && (
        <div className="mt-12 p-6 rounded-lg shadow-lg bg-gradient-to-r from-emerald-100 to-white">
          <h2 className="text-4xl font-bold text-emerald-600 text-center mb-6">
            {selectedCategory.name}
          </h2>
          <div className="flex justify-center">
            <img
              src={selectedCategory.image}
              alt={selectedCategory.name}
              className="h-60 w-60 object-cover rounded-lg shadow-md border-4 border-emerald-500"
            />
          </div>
          <p className="text-center mt-6 text-gray-700 text-lg">
            Discover the amazing items in the <strong>{selectedCategory.name}</strong> category.
          </p>

          {/* Render items in the selected category */}
          {categoryItems.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-700 text-center mb-4">Items in this Category:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
                {categoryItems.map((item) => (
                  <li
                    key={item.id}
                    className="bg-white shadow-md rounded-lg p-4 text-center text-gray-800 hover:bg-emerald-50 transition duration-200"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-center mt-6 text-gray-600">No items found in this category.</p>
          )}
        </div>
      )}
    </>
  );
}