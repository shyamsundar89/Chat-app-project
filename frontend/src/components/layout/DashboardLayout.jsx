import React from "react";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen dark:bg-gray-900 overflow-y-auto">
      <Sidebar />
      <div
        className="flex flex-col flex-1 overflow-hidden ml-0 md:ml-64 h-full lg:min-h-screen bg-gray-100 text-gray-900
        dark:bg-gray-900 dark:text-white"
      >
        <Navbar />
        <div className="p-0 sm:p-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
