import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useGlobalContext } from '../context/globalContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { registerUser } = useGlobalContext();


  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await registerUser({ username, email, password });
    if (success) navigate('/login');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px-45px)] flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-gray-100">
        <div className="w-full max-w-md p-4 sm:p-8 space-y-6  bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md mb-5">
          <h2 className="text-2xl font-bold text-center dark:text-white">Create Your Account</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border dark:border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="yourusername"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border dark:border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border dark:border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Register
            </button>
            <p className="text-sm text-center text-gray-900 dark:text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
