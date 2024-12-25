import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "./componentsHome/Navbar";
import Footer from "./componentsHome/Footer";

const Home = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
      <Footer/>
    </>
  );
};

export default Home;
