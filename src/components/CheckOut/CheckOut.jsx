import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function CheckOut() {
  const { checkoutCart, getLoggedCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  // Validation for shipping fields
  const validationSchema = Yup.object({
    details: Yup.string().required("Shipping details are required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .matches(/^(010|011|012|015)[0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: { phone: "", details: "", city: "" },
    validationSchema,
    onSubmit: (values) => handleCheckout(values),
  });

  async function handleCheckout(values) {
    setIsLoading(true);
    try {
      // 1. Get the latest cart to retrieve the correct dynamic cartId
      const cartRes = await getLoggedCart();
      const activeCartId = cartRes?.data?.data?._id;

      if (!activeCartId) {
        toast.error("No active cart found.");
        setIsLoading(false);
        return;
      }

      // 2. Call checkout service
      const res = await checkoutCart(activeCartId, window.location.origin, values);

      // 3. Redirect to Stripe payment session if successful
      if (res?.data?.status === 'success') {
        window.location.href = res.data.session.url;
      } else {
        toast.error("Checkout failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during checkout.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-bold text-emerald-600 mb-8 text-center">Shipping & Checkout</h1>
        
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Shipping Details */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Details</label>
            <input
              name="details"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.details}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
              placeholder="Building, Street, Apartment"
            />
            {formik.touched.details && formik.errors.details && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.details}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
            <input
              name="city"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
              placeholder="Your City"
            />
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              name="phone"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
              placeholder="010XXXXXXXX"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all disabled:bg-emerald-300"
          >
            {isLoading ? (
              <span><i className="fas fa-spinner fa-spin mr-2"></i> Processing...</span>
            ) : (
              "Proceed to Payment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}