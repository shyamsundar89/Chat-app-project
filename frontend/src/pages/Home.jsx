import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
        <div className="min-h-[calc(100vh-80px-45px)] flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-gray-100">
        <div className="p-4 sm:p-8 space-y-6 text-gray-800 dark:text-gray-200 rounded-lg shadow-md mb-5 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-200 mb-6">
            Welcome to <span className="text-blue-600">ChatApp</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-900 dark:text-gray-400 mb-8">
            Connect. Chat. Share. Your favorite messaging app, built with ❤️ using React, Tailwind CSS, and modern web tech.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/login"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition"
            >
              Register
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
