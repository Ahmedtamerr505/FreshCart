import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';

export default function CheckOut() {
  let { checkoutCart } = useContext(CartContext);

  let formik = useFormik({
    initialValues: {
      phone: "",
      details: "",
      city: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.phone) {
        errors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "Phone number must be 10 digits";
      }
      if (!values.details) {
        errors.details = "Details are required";
      }
      if (!values.city) {
        errors.city = "City is required";
      }
      return errors;
    },
    onSubmit: () => {
      handleCheckout('66b10e95ed0dc0016c0293a0', 'http://localhost:5173'); // Replace with dynamic values
    },
  });

  async function handleCheckout(cartId, url) {
    try {
      console.log('Submitting checkout request...');
      let resppo = await checkoutCart(cartId, url, formik.values);
      console.log('Response:', resppo);

      if (resppo.data.status === 'success') {
        console.log('Redirecting to:', resppo.data.session.url);
        window.location.href = resppo.data.session.url; // Redirect to payment page
      } else {
        console.error('Checkout failed:', resppo.data.message);
        alert('Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('An error occurred during checkout. Please try again.');
    }
  }

  return (
    <>
      <h1 className="p-4 text-2xl text-emerald-600 font-bold">Pay Now</h1>
      <form onSubmit={formik.handleSubmit} className="max-w-7xl mx-auto relative">
        <div className="mb-5 relative mt-10">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
            name="details"
            type="text"
            id="details"
            className="shadow-sm bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-emerald-600 dark:placeholder-gray-400 dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light"
            required
          />
          <label
            htmlFor="details"
            className="block py-2 absolute bottom-9 left-0 mb-2 text-sm font-medium text-gray-900"
          >
            Enter your details:
          </label>
        </div>

        <div className="mb-5 relative mt-10">
          <label
            htmlFor="city"
            className="block py-2 absolute bottom-9 left-0 mb-2 text-sm font-medium text-gray-900"
          >
            Enter your city:
          </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.city}
            name="city"
            type="text"
            id="city"
            className="shadow-sm bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-emerald-600 dark:placeholder-gray-400 dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light"
            required
          />
        </div>

        <div className="mb-5 relative mt-10">
          <label
            htmlFor="phone"
            className="block py-2 absolute bottom-9 left-0 mb-2 text-sm font-medium text-gray-900"
          >
            Your Phone:
          </label>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            type="tel"
            id="phone"
            className="shadow-sm bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-emerald-600 dark:placeholder-gray-400 dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="text-white bg-emerald-800 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center"
          >
            Check out
          </button>
        </div>
      </form>
    </>
  );
}