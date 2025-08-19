import React from "react";
import { FaHome, FaUserCircle, FaUsers } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";
import { CiLogout } from "react-icons/ci";
import { LuMessageSquareMore } from "react-icons/lu";

// Split items
const topItems = [
  { label: "Dashboard", icon: FaHome, path: "/dashboard" },
  { label: "Users", icon: FaUsers, path: "/users" },
  { label: "Recent Messages", icon: LuMessageSquareMore, path: "/recent-messages" },
  { label: "Profile", icon: FaUserCircle, path: "/profile" },
];

const bottomItems = [
  //   { label: "Profile", icon: FaUserCircle, path: "/profile" },
  //   // { label: "Settings", icon: FaCog, path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutUser } = useGlobalContext();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const renderLink = (item, index) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;

    return (
      <li key={index} className="py-1">
        <Link
          to={item.path}
          className={`flex items-center py-2 px-2 space-x-4 transition-all duration-200 relative ${
            isActive
              ? "bg-white text-purple dark:text-white dark:bg-gray-900 border-l-4 border-purple dark:border-white"
              : "hover:bg-gray-200 hover:text-purple"
          }`}
        >
          <Icon />
          <span className="hidden md:inline">{item.label}</span>
        </Link>
      </li>
    );
  };

  return (
    <div className="hidden md:flex flex-col justify-between bg-gray-100 text-gray-900 h-screen fixed w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-purple dark:text-white">
      <div className="flex flex-col h-full overflow-y-auto">
        <Link
          to="/"
          className="border-b border-gray-300 dark:border-gray-600 p-2 py-3"
        >
          <h1 className="text-2xl font-bold p-[4.8px] text-center italic">
            FinTrack
          </h1>
        </Link>

        {/* Scrollable top items */}
        <ul className="flex flex-col mt-5 text-base overflow-y-auto flex-grow custom-scrollbar px-4">
          {topItems.map(renderLink)}
        </ul>

        {/* Bottom items stay fixed at bottom */}
        <ul className="flex flex-col mb-2 text-base px-4">
          {bottomItems.map(renderLink)}
        </ul>
        <div className="relative mb-6 text-base px-4 border-t pt-3 border-gray-300">
          <div
            onClick={handleLogout}
            className="flex items-center hover:text-purple gap-3 px-2 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-200"
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

export default Sidebar;
