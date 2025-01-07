import { AppContent } from "@/context/Appcontext";
import { useToast } from "@/hooks/use-toast";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router";

export const Navbar = () => {
  const { setIsLoggedIn } = useContext(AppContent);
  const { toast } = useToast();
  const login = localStorage.getItem("login");

  const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast({
      title: "Success!",
      description: "Logged out successfully",
    });
  };
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button className="text-gray-800 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <span className="text-gray-800 text-xl ml-4 font-semibold">
            Mock Interview
          </span>
        </div>
        {!login && (
          <div className="flex items-center gap-3">
            <Link
              to={"/login"}
              className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-all"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-all"
            >
              SignUp
            </Link>
          </div>
        )}
        {login && (
          <>
            <button
              onClick={handleLogout}
              className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-all"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};
