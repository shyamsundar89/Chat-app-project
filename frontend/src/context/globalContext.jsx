import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const GlobalContext = createContext();
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [usersList, setUsersList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);

  // Axios defaults
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, [token]);

  // Register
  const registerUser = async ({ username, email, password }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/auth/register`, { username, email, password });
      toast.success(data.message);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  // Login
  const loginUser = async ({ email, password }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      toast.success(data.message);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
    toast.success("Logged out");
  };

  // Get all users
  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/auth/users`);
      setUsersList(data.userExists);
      return data.userExists;
    } catch (error) {
      toast.error('Failed to fetch users');
      return [];
    }
  }, []); 

  
  // Delete a message
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/auth/users/${id}`);
      setUsersList((prev) => prev.filter((msg) => msg._id !== id));
      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  // Get messages between 2 users
  const getMessages = useCallback(async (sender, receiver) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/messages`, {
        params: { sender, receiver },
      });
      setMessages(data);
    } catch (err) {
      toast.error('Failed to fetch messages');
    }
  }, []);

  // Get messages between 2 users
  const getAllMessages = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/messages/all-messages`);
      setAllMessages(data);
      return data.messageExists;
    } catch (err) {
      toast.error('Failed to fetch all messages');
      return [];
    }
  }, []);

  // Update user profile
  const updateProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem("token"); // Ya context se le lo
      const { data } = await axios.put(
        `${BASE_URL}/api/auth/users/update-profile`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setUser(data.user);
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success(data.message);
      return true;
    } catch (error) {
      console.log(error);
      toast.error('Failed to update profile');
      return false;
    }
  };

  // Send a new message
  const sendMessage = async ({ sender, receiver, content }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/messages`, {
        sender,
        receiver,
        content,
      });
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  // Update a message
  const updateMessage = async (id, content) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/api/messages/${id}`, { content });
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, content: data.content } : msg))
      );
      toast.success('Message updated');
    } catch (error) {
      toast.error('Failed to update message');
    }
  };

  // Delete a message
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        token,
        usersList,
        messages,
        allMessages,
        registerUser,
        loginUser,
        logoutUser,
        fetchUsers,
        deleteUser,
        getMessages,
        getAllMessages,
        updateProfile,
        sendMessage,
        updateMessage,
        deleteMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
