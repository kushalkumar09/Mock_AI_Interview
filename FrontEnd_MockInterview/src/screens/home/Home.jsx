import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Navbar } from "./componentsHome/Navbar";
import Footer from "./componentsHome/Footer";
import { AppContent } from "@/context/Appcontext";

const IntroSection = () => {
  const { isLoggedIn } = useContext(AppContent);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-8">
          Mock AI Interview
        </h1>
        <p className="mt-4 text-2xl text-gray-700 text-center max-w-3xl">
          Prepare for your next interview with AI-driven mock interviews
        </p>
        <h2 className="text-3xl font-semibold mt-10 mb-6 text-gray-800">
          Get Started with Your Interview Preparation
        </h2>
        <p className="text-lg mb-12 text-center max-w-2xl text-gray-600">
          Our AI-driven platform provides realistic mock interviews to help you
          practice and improve your interview skills. Get instant feedback and
          tips to ace your next interview.
        </p>
        <Link
          to={isLoggedIn?"/dashboard":"/login"}
          className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-medium shadow-lg hover:bg-blue-500 transition duration-300"
        >
          Start Your Mock Interview
        </Link>
      </main>
    </div>
  );
};

const Home = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path !== "/") {
    return (
      <>
        <div className="flex flex-col justify-between min-h-screen">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <IntroSection />
      <Footer />
    </>
  );
};

export default Home;
