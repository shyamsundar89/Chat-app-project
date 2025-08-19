import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const HomeLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default HomeLayout;
