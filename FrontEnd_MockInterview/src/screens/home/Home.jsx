import React from "react";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Outlet />
      <h1>Home Page End</h1>
    </div>
  );
};

export default Home;
