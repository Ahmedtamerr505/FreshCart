import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const RecentCategories = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [chosenCategoryName, setChosenCategoryName] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategoryId(categoryId);
    const chosen = categories.find(c => c._id === categoryId);
    setChosenCategoryName(chosen ? chosen.name : '');
    setLoadingSubCategories(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories?category=${categoryId}`);
      setSubCategories(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSubCategories(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 mt-20">
      {loadingCategories ? (
        <div className="flex justify-center py-20"><ClipLoader color="#4fa74f" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="group border border-gray-200 rounded-2xl p-2 cursor-pointer hover:shadow-xl hover:shadow-[#4fa74f]/30 transition-all"
              onClick={() => handleCategoryClick(category._id)}
            >
              <img src={category.image} className="w-full h-64 object-cover rounded-xl" alt={category.name} />
              <h3 className="text-center text-xl font-bold py-4 text-[#4fa74f]">{category.name}</h3>
            </div>
          ))}
        </div>
      )}

      {selectedCategoryId && (
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8 text-[#4fa74f]">{chosenCategoryName} Subcategories</h2>
          {loadingSubCategories ? (
            <div className="flex justify-center py-10"><ClipLoader color="#4fa74f" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {subCategories.map((sub) => (
                <div
                  key={sub._id}
                  className="p-6 border border-gray-200 rounded-xl cursor-pointer hover:border-[#4fa74f] hover:bg-green-50 transition"
                  onClick={() => navigate(`/products?subcategory=${sub._id}`)}
                >
                  <h3 className="text-lg font-semibold">{sub.name}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentCategories;