import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} ChatApp. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
