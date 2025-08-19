import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px-45px)] flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-gray-100">
        <div className="w-full max-w-xl text-center p-4 sm:p-8 space-y-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md mb-5">
          <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-500 dark:bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
