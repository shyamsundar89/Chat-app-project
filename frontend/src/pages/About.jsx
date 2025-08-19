import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-80px-45px)] flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
        <div className="max-w-4xl p-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md mb-5">
      <h1 className="mb-4 text-3xl font-bold text-center text-gray-900 dark:text-white">About Chat App</h1>
          <p className="mb-4 text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
            Welcome to our Chat App! 🚀 This is a real-time messaging platform built with modern tech like 
            <span className="font-semibold text-gray-800 dark:text-blue-600"> React</span>, 
            <span className="font-semibold text-gray-800 dark:text-blue-600"> Tailwind CSS</span>, and 
            <span className="font-semibold text-gray-800 dark:text-blue-600"> Node.js / Socket.io</span> (backend).
          </p>

          <p className="mb-4 text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
            Our goal is to provide a fast, secure, and clean UI experience for people to connect with their friends, 
            colleagues, or communities — without the clutter of traditional messaging apps.
          </p>

          <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
            Whether you're chatting one-on-one or in a group, we've got you covered. 
            Stay tuned for exciting features like emojis, file sharing, notifications, and more!
          </p>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-800 dark:text-gray-300">Made with ❤️ by Team ChatApp</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
