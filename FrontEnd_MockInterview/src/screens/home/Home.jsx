import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { Navbar } from "./componentsHome/Navbar";
import Footer from "./componentsHome/Footer";
import { AppContent } from "@/context/Appcontext";
import aiImage from "@/assets/Images/ai-tools.webp";

const HeroSection = () => {
  const { isLoggedIn } = useContext(AppContent);
  console.log(isLoggedIn);
  return (
    <div
      className="h-screen w-full flex flex-col items-center justify-center relative text-white bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0,0,0,0.2)), url(${aiImage})`,
      }}
    >
      <h1 className="text-6xl font-extrabold text-center">Mock AI Interview</h1>
      <p className="text-lg mt-4 text-center max-w-2xl">
        Prepare with AI-driven mock interviews and ace your next job interview!
      </p>
      <Link
        to={isLoggedIn ? "dashboard" : "login"}
        className="mt-8 bg-blue-600 py-3 px-8 rounded-full text-lg font-medium shadow-lg hover:bg-blue-500 transition duration-300"
      >
        Start Your Mock Interview
      </Link>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="h-screen w-full py-20 bg-gray-100 text-center flex flex-col justify-center items-center px-6">
      <h2 className="text-5xl font-bold mb-12">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl">
        <div className="p-8 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold">AI-Powered Feedback</h3>
          <p className="mt-4 text-gray-600">Get real-time feedback on your responses.</p>
        </div>
        <div className="p-8 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold">Wide Range of Questions</h3>
          <p className="mt-4 text-gray-600">Practice with diverse questions across industries.</p>
        </div>
        <div className="p-8 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold">Personalized Insights</h3>
          <p className="mt-4 text-gray-600">Receive personalized improvement suggestions.</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <div className="h-screen w-full py-20 bg-white text-center flex flex-col justify-center items-center px-6">
      <h2 className="text-5xl font-bold mb-12">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        <blockquote className="p-8 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
          "This platform helped me gain confidence and ace my job interview!"
          <cite className="block mt-4 font-semibold">- John Doe</cite>
        </blockquote>
        <blockquote className="p-8 border-l-4 border-blue-600 bg-gray-50 rounded-lg">
          "The AI feedback was precise and incredibly helpful. Highly recommended!"
          <cite className="block mt-4 font-semibold">- Jane Smith</cite>
        </blockquote>
      </div>
    </div>
  );
};

const CallToActionSection = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center py-20 bg-blue-600 text-center text-white px-6">
      <h2 className="text-5xl font-bold mb-6">Ready to Ace Your Interview?</h2>
      <p className="text-lg mb-8">Join our platform and prepare with the best AI tools available.</p>
      <Link
        to="/register"
        className="bg-white text-blue-600 py-3 px-8 rounded-full text-lg font-medium shadow-lg hover:bg-gray-100 transition duration-300"
      >
        Get Started Now
      </Link>
    </div>
  );
};

const Home = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path !== "/") {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
      <Footer />
    </>
  );
};

export default Home;
