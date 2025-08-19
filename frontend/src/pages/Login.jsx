import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useGlobalContext } from '../context/globalContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await loginUser({ email, password });
    if (success) navigate('/chat');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px-45px)] flex items-center justify-center bg-gray-100 dark:bg-gray-900 bg-gray-100">
        <div className="w-full max-w-md p-4 sm:p-8 space-y-6  bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md mb-5">
          <h2 className="text-2xl font-bold text-center dark:text-white">Login to Chat App</h2>
          <form onSubmit={handleLogin} className="space-y-4">
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
              className="w-full py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
            <p className="text-sm text-center dark:text-gray-300 text-gray-900">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
            </p>
          </form>
        </div>
      </div>
    <Footer />
    </>
  );
};

export default Login;
