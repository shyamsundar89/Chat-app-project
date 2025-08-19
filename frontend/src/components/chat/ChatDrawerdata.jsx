import React from "react";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";

const ChatDrawerdata = ({
  users = [],
  selectedUser,
  onSelect,
  onLogout,
  onlineUsers = [],
  setIsOpen
}) => {
  return (
    <div className="flex flex-col justify-between h-full">
      {/* Users List */}
      <div className="space-y-2 p-4">
        {users.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          return (
            <div
              key={user._id}
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
              onClick={() => {
                onSelect(user);
                setIsOpen?.(false);
              }}
            >
              <div className="relative">
                <img
                  src={`https://avatar.iran.liara.run/public/boy?username=${user.username}`}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div
                className={`text-sm font-medium ${
                  selectedUser?._id === user._id
                    ? "text-purple dark:text-purple-300"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {user.username}
              </div>
            </div>
          );
        })}
      </div>

      {/* Logout */}
      <div className="sticky bottom-0 bg-gray-100 dark:bg-gray-800">
      <div className="border-t px-4 py-2 border-gray-300 dark:border-gray-700">
        <Link
          to="/dashboard"
          className="flex items-center hover:text-purple dark:text-gray-100 text-gray-900 gap-3 px-2 py-3 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900"
        >
          <CiLogout className="text-xl" />
          <p className="font-medium text-sm">Dashboard</p>
        </Link>
      </div>
      <div className="border-t px-4 py-2 border-gray-300 dark:border-gray-700">
        <div
          onClick={onLogout}
          className="flex items-center hover:text-purple dark:text-gray-100 text-gray-900 gap-3 px-2 py-3 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900"
        >
          <CiLogout className="text-xl" />
          <p className="font-medium text-sm">Logout</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ChatDrawerdata;
