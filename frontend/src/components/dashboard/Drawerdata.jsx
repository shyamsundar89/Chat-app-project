import React from "react";
import {
  FaUsers,
  FaHome,
  FaUserCircle,
} from "react-icons/fa";
import { LuMessageSquareMore } from "react-icons/lu";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useGlobalContext } from "../../context/globalContext";

// Split into top and bottom items
const topItems = [
  { label: "Dashboard", icon: FaHome, path: "/dashboard" },
  { label: "Users", icon: FaUsers, path: "/users" },
  { label: "Recent Messages", icon: LuMessageSquareMore, path: "/recent-messages" },
  { label: "Profile", icon: FaUserCircle, path: "/profile" },
];

const bottomItems = [
  // { label: "Settings", icon: FaCog, path: "/settings" },
];


const Drawerdata = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutUser } = useGlobalContext();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };
  const renderLink = (item, index) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;

    return (
      <Link
        key={index}
        to={item.path}
        className={`flex items-center px-3 py-2 text-base rounded transition-all duration-200 relative space-x-3 ${
          isActive
            ? "bg-white text-purple dark:text-white dark:bg-gray-900 border-l-4 border-purple dark:border-white"
            : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
        }`}
      >
        <Icon />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Top Section */}
      <div className="space-y-2 p-4">{topItems.map(renderLink)}</div>

      {/* Bottom Section */}
      <div>
      <div className="space-y-2 p-4">{bottomItems.map(renderLink)}</div>
      <div className="relative mb-2 border-t pt-3 p-4 border-gray-300">
          <div
           onClick={handleLogout}
            className="flex items-center hover:text-purple gap-3 px-2 py-2 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-200"
          >
            <CiLogout className="text-xl" />
            <div>
              <p className="font-medium text-sm">Logout</p>
            </div>
          </div>

        </div>
    </div>
    </div>
  );
};

export default Drawerdata;
