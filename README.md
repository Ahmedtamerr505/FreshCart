# FreshCart E-Commerce App

FreshCart is a modern, full-featured e-commerce web application built with **React.js** and **Vite**. It provides a seamless shopping experience with user authentication, product browsing, cart and wishlist management, checkout with payment integration, and a fully responsive UI.

## Features

- ⚡ **Built with React.js & Vite** for fast development and lightning-fast HMR.
- 🛒 **Product Catalog**: Browse products with categories, brands, and detailed product pages.
- ❤️ **Wishlist**: Add products to your wishlist for later.
- 🛍️ **Cart Management**: Add, update, and remove products from your cart.
- 🔒 **Authentication**: Secure registration and login.
- 💳 **Checkout & Payment**: Integrated checkout flow with payment redirection.
- 📱 **Responsive Design**: Looks great on desktop and mobile.
- 🌈 **Modern UI**: Styled with Tailwind CSS for a clean and modern look.
- 🔗 **Protected Routes**: Only authenticated users can access shopping features.

## Tech Stack

- [React.js](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Formik](https://formik.org/) for forms
- [React Hot Toast](https://react-hot-toast.com/) for notifications
- [Axios](https://axios-http.com/) for API requests

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/freshcart.git
   cd freshcart

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev

### 🌐 Live Demo

You can try the app live here:  
[https://fresh-cart-one-eta.vercel.app/](https://fresh-cart-one-eta.vercel.app/)

---

### 📁 Project Structure
src/
  components/
    Cart/
    Home/
    Layout/
    Navbar/
    Products/
    ProductDetails/
    Brands/
    Categories/
    WishList/
    CheckOut/
    ...
  Context/
    CartContext.js
    UserContext.js
    WishContext.js
    ...
  App.jsx
  main.jsx

---

### ⚙️ Customization

- **API Integration:**  
  The app is integrated with a RESTful e-commerce API. You can update the API endpoints in the relevant context files.

- **Styling:**  
  Tailwind CSS is used for styling. You can customize the theme in `tailwind.config.js`.

---

### 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

### 📄 License
This project is licensed under the MIT License.

---

**FreshCart** – A modern shopping experience, built with React and Vite.