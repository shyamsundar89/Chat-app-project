import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded shadow">
          <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

          <p className="mb-4">
            By using ChatApp, you agree to the following terms and conditions. Please read them carefully.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using our service, you agree to be bound by these terms. If you disagree with any part, please do not use ChatApp.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. User Conduct</h2>
          <p className="mb-4">
            Users must not use the app to send harmful, illegal, or offensive content. Violation may lead to account termination.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">3. Account Responsibility</h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
          <p className="mb-4">
            ChatApp is not liable for any direct or indirect damages arising from the use or inability to use the app.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">5. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance.
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

export default Terms;
