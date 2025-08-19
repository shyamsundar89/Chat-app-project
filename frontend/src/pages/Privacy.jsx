import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="mb-4">
            We value your privacy and are committed to protecting your personal data. This policy explains how we handle your information.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
          <p className="mb-4">
            We collect minimal personal data such as your email and name for account setup and chat functionality. We do not share your information with third parties.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Data</h2>
          <p className="mb-4">
            Your data is used to provide a better chat experience, manage sessions, and for communication related to the app only.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
          <p className="mb-4">
            We implement strong encryption and secure protocols to ensure your data is protected from unauthorized access.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Choices</h2>
          <p className="mb-4">
            You can request to delete your account or data by contacting our support. We respect your rights and decisions.
          </p>

          <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
