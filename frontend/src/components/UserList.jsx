import React from "react";
import { Link } from "react-router-dom";
import { FaRegCircleRight } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";

const UserList = ({
  users,
  selectedUser,
  onSelect,
  onLogout,
  currentUser,
  onlineUsers = [],
}) => {
  return (
    <div className="w-1/4 min-h-screen hidden md:block flex flex-col bg-gray-100 dark:bg-gray-800 border-r border-gray-400 dark:border-gray-700 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      <div className="sticky top-0 z-[99] bg-gray-100 dark:bg-gray-800 flex items-center justify-between mb-2 border-b border-gray-400 dark:border-gray-700 pb-4 pt-5 px-4">
        {/* <h2 className="text-xl font-bold text-white">Users</h2> */}
        <div className="flex items-center gap-3 text-white">
          <img
            src={`https://avatar.iran.liara.run/public/boy?username=${
              currentUser?.usernam || "Unknown"
            }`}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="text-sm text-gray-800 dark:text-gray-400 font-semibold">
              {currentUser?.username || "Unknown"}
            </div>
            <div className="text-xs text-gray-800 dark:text-gray-400">
              {currentUser?.email || "unknown@gmail.com"}
            </div>
          </div>
        </div>
        {/* <button
          onClick={onLogout}
          className="px-3 md:hidden block py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Logout
        </button> */}
        <button
          onClick={onLogout}
          title="Logout"
          className="bg-gray-200 md:block hidden rounded-md shadow-md dark:bg-gray-900 p-2"
        >
          <FaSignOutAlt className="text-purple text-xl dark:text-white" />
        </button>
      </div>
      <ul className="space-y-2 p-4 min-h-screen">
        {[...users].map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          return (
            <div
              key={user._id}
              className="flex items-center border-b border-gray-400 dark:border-gray-700 pb-2"
            >
              <div className="relative">
                <img
                  src={`https://avatar.iran.liara.run/public/boy?username=${user.username}`}
                  alt={user.username}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              <li
                onClick={() => onSelect(user)}
                className={`ml-3 p-2 rounded cursor-pointer font-medium w-full ${
                  selectedUser?._id === user._id
                    ? "bg-purple text-gray-200 dark:text-gray-200"
                    : "text-gray-800 dark:text-white hover:bg-purple hover:dark:text-gray-200 hover:text-gray-200"
                }`}
              >
                {user?.username || "Unknown"}

                {/* {isOnline && <span className="ml-2 text-green-400 text-sm">(Online)</span>} */}
              </li>
            </div>
          );
        })}
      </ul>
      <div className="sticky bottom-0 left-0 bg-white dark:bg-gray-800 mt-auto p-4 border-t border-gray-300 dark:border-gray-700">
        <Link
          to="/dashboard"
          className="block w-full flex justify-center items-center text-center px-4 py-2 bg-purple hover:bg-purple-700 text-white font-medium rounded"
        >
          <div>
            <FaRegCircleRight className="mr-2" />
          </div>
          <div> Go to Dashboard</div>
        </Link>
      </div>
    </div>
  );
};

export default UserList;
