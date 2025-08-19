import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Drawer = ({ children, isOpen, setIsOpen }) => {
  return (
    <main
      className={`fixed overflow-hidden z-[9999999] bg-gray-900 bg-opacity-30 inset-0 transform ease-in-out ${
        isOpen
          ? "transition-opacity opacity-100 duration-300 translate-x-0"
          : "transition-all delay-300 opacity-0 -translate-x-full"
      }`}
    >
      <section
        className={`w-64 left-0 absolute bg-white dark:bg-dark h-full shadow-xl transition-all transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <article className="relative h-full flex flex-col">
          {/* Header with close icon */}
          <header className="p-4 flex items-center justify-between border-b dark:border-gray-700">
          <Link to="/">
            <h1 className="text-2xl font-bold text-center italic">
              FinTrack
            </h1>
          </Link>
            <XMarkIcon
              className="h-6 w-6 cursor-pointer dark:text-white"
              onClick={() => setIsOpen(false)}
            />
          </header>

          {/* Children (Drawer Links) */}
          <div
            onClick={() => setIsOpen(false)}
            className="flex-1 overflow-y-auto"
          >
            {children}
          </div>
        </article>
      </section>

      {/* Click Outside Area */}
      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => setIsOpen(false)}
      ></section>
    </main>
  );
};

export default Drawer;
