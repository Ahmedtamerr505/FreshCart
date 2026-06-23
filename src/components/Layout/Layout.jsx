import React from "react";
import style from "./Layout.module.css";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./../Footer/Footer";

export default function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* This flex-grow pushes the footer down even if content is short */}
        <main className="flex-grow container mx-auto px-4 mt-20">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
}
