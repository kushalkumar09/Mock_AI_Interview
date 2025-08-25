import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import Footer from "./componentsHome/Footer.jsx";
import { AppContent } from "@/context/Appcontext.jsx";
import Loader from "./componentsHome/Loader.jsx";
import Header from "./componentsHome/Header.jsx";
import Hero from "./componentsHome/Hero.jsx";
import Features from "./componentsHome/Feature.jsx";
import HowItWorks from "./componentsHome/HowItWorks.jsx";
import Testimonials from "./componentsHome/Testimonials.jsx";
import CTA from "./componentsHome/Cta.jsx";

const Home = () => {
  const { isLoggedIn } = useContext(AppContent);
  const [login, setLogin] = useState(null); // Start with `null` to indicate "loading"
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  console.log(path);

  useEffect(() => {
    if (isLoggedIn !== undefined) {
      setLogin(isLoggedIn);
      if (isLoggedIn && path === "/") {
        navigate("/dashboard");
      }
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      {/* <Navbar /> */}
      <Header/>
      {login && path !== "/" ? (
        <Outlet />
      ) : (
        <>
          <Hero/>
          <Features/>
          <HowItWorks/>
          <Testimonials/>
          <CTA/>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
