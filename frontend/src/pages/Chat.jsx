// pages/Chat.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserList from "../components/UserList";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import MessageInput from "../components/MessageInput";
import { useGlobalContext } from "../context/globalContext";
import { socket } from "../socket";
import { MdMarkUnreadChatAlt } from "react-icons/md";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const navigate = useNavigate();
  const {
    user,
    usersList,
    messages,
    fetchUsers,
    getMessages,
    sendMessage,
    logoutUser,
  } = useGlobalContext();

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Fetch messages when selectedUser changes
  useEffect(() => {
    if (selectedUser && user) {
      getMessages(user._id, selectedUser._id);
    }
  }, [getMessages, selectedUser, user]);

  // Handle message sending
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      sender: user._id,
      receiver: selectedUser._id,
      content: newMessage,
    };

    // Update immediately (optimistic UI)
    await sendMessage(messageData); // backend
    socket.emit("newMessage", {
      receiverId: selectedUser._id,
      message: newMessage,
    });

    setNewMessage("");
  };

  // Fetch online users
  useEffect(() => {
    socket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, []);

  // Logout
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  // Connect socket and pass token
  useEffect(() => {
    if (user) {
      socket.io.opts.query = {
        token: localStorage.getItem("token"),
      };
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [user]);

  // Handle incoming messages via socket
  useEffect(() => {
    socket.on("newMessage", (data) => {
      const { senderId, receiverId } = data;

      if (
        (user?._id === senderId && selectedUser?._id === receiverId) ||
        (user?._id === receiverId && selectedUser?._id === senderId)
      ) {
        getMessages(user._id, selectedUser._id);
      }
    });

    return () => socket.off("newMessage");
  }, [user, selectedUser, getMessages]);

  return (
    <div className="flex min-h-screen sm:h-screen bg-white dark:bg-gray-100">
      <UserList
        users={usersList.filter((u) => u._id !== user?._id)}
        selectedUser={selectedUser}
        onSelect={setSelectedUser}
        onLogout={handleLogout}
        currentUser={user}
        onlineUsers={onlineUsers}
      />
      <div className="flex flex-col flex-1 bg-gray-300 dark:bg-gray-900">
        <ChatHeader
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          usersList={usersList}
          user={usersList.filter((u) => u._id !== user?._id)}
          handleLogout={handleLogout}
          onlineUsers={onlineUsers}
        />
        {selectedUser ? (
          <>
            <ChatMessages
              messages={messages}
              userId={user?._id}
              selectedUser={selectedUser}
            />
          </>
        ) : (
          <div className="flex-1 sm:h-full h-screen flex flex-col items-center justify-center text-white text-xl">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-5 px-7 text-center">
              <div className="text-center flex justify-center text-gray-900 items-center mb-4">
                <MdMarkUnreadChatAlt className="text-purple" style={{ fontSize: "160px" }} />
              </div>

              <div className="dark:text-gray-400 text-gray-900">
                Select a user to Chat...
              </div>
            </div>
          </div>
        )}
        <MessageInput
          newMessage={newMessage}
          onChange={setNewMessage}
          onSend={handleSend}
        />
      </div>
    </div>
  );
};

export default Chat;
