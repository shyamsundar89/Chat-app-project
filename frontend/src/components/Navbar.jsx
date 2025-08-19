import React, { useState } from "react";
import { FaBars, FaSun, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { IoMoonOutline } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <>
      <header className="fixed top-0 left-0 w-full py-2 bg-white dark:bg-gray-900 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-600 dark:text-white">
            ChatApp
          </h2>

          {/* Hamburger for small screens */}
          <button
            className="sm:hidden text-2xl text-gray-600 dark:text-white"
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation links */}
          <nav
            className={`${
              isOpen ? "block" : "hidden"
            } sm:flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-8 absolute sm:static top-full left-0 w-full sm:w-auto bg-white dark:bg-gray-900 px-4 sm:px-0 py-4 sm:py-0 shadow sm:shadow-none transition-all`}
          >
            {["Home", "About", "Contact", "Login", "Register", "Chat"].map(
              (label) => {
                const path = label === "Home" ? "/" : `/${label.toLowerCase()}`;
                const isActive = location.pathname === path;

                return (
                  <Link
                    key={label}
                    to={path}
                    className={`flex text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition ${isActive ? "text-blue-600 dark:text-blue-400 font-semibold underline underline-offset-4" : "" }`}
                  >
                    {label}
                  </Link>
                );
              }
            )}

            <button
              className="text-2xl text-white  dark:text-white mr-0 sm:mr-4 border border-gray-400 rounded-full dark:border-gray-800 p-2"
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {theme === "light" ? (
                <IoMoonOutline className="text-gray-600" />
              ) : (
                <FaSun className="text-gray-500" />
              )}
            </button>
          </nav>
        </div>
      </header>
      <div className="h-20 sm:h-[72px] bg-white dark:bg-gray-900"></div>
    </>
  );
};

export default Navbar;
