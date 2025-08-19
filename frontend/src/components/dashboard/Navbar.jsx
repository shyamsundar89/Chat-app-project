import React, { useState } from "react";
import { FaBars, FaSun } from "react-icons/fa";
import { IoMoonOutline } from "react-icons/io5";

import { useTheme } from "../../context/ThemeContext";
import Drawer from "./Drawer"; // 🟢 Your working Drawer
import Drawerdata from "./Drawerdata"; // 🟢 Your working Drawerdata

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false); // 🔁 Drawer control

  return (
    <>
      <div className="bg-gray-100 sticky top-0 right-0 w-full text-gray-900 border-b border-gray-300 p-2 py-3 flex justify-between items-center dark:border-gray-700 dark:bg-gray-900 dark:text-white">
        {/* Left - Hamburger on mobile */}
        <div className="flex items-center space-x-4">
          <button
            className="block md:hidden text-xl"
            onClick={() => setIsOpen(true)}
          >
            <FaBars />
          </button>
          <h1 className="text-lg font-bold dark:text-white">Dashboard</h1>
        </div>

        {/* Right - Theme Toggle */}
        <button
          className="text-2xl text-dark dark:text-white mr-0 sm:mr-4 border border-gray-400 rounded-full dark:border-gray-800 p-2"
          onClick={toggleTheme}
          title="Toggle Theme"
        >
          {theme === "light" ? (
            <IoMoonOutline className="text-gray-600" />
          ) : (
            <FaSun className="text-gray-500" />
          )}
        </button>
      </div>

      {/* Drawer appears only on small screens */}
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <Drawerdata />
      </Drawer>
    </>
  );
};

export default Navbar;
