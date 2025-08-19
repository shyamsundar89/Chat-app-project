import React from "react";
import { useTheme } from "../context/ThemeContext";
import { IoMoonOutline } from "react-icons/io5";
import { FaBars, FaSun } from "react-icons/fa";
import { useState } from "react";
import ChatDrawerdata from "./chat/ChatDrawerdata";
import ChatDrawer from "./chat/ChatDrawer";

const ChatHeader = ({ selectedUser, setSelectedUser, usersList, user, handleLogout, onlineUsers }) => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="text-xl font-bold border-b border-gray-400 dark:border-gray-700 border-gray-100 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-[17px] flex justify-between items-center">
        <button
          className="block md:hidden text-xl"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>
        <h2 className="sm:hidden block">
          {selectedUser
            ? `Chat with ${selectedUser?.username}`
            : "Pick a user"}
        </h2>
        <h2 className="hidden sm:block">
          {selectedUser
            ? `Chat with ${selectedUser?.username}`
            : "Select a user to start chatting"}
        </h2>
        <button
          className="text-2xl text-dark dark:text-white mr-0 sm:mr-4 border border-gray-400 rounded-full dark:border-gray-700 p-2"
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
      <ChatDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
      <ChatDrawerdata
        users={usersList.filter(u => u._id !== user?._id)}
        selectedUser={selectedUser}
        onSelect={setSelectedUser}
        onLogout={handleLogout}
        onlineUsers={onlineUsers}
        setIsOpen={setIsOpen}
      />
      </ChatDrawer>
    </>
  );
};

export default ChatHeader;
