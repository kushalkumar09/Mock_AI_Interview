import { AppContent } from "@/context/Appcontext";
import { useToast } from "@/hooks/use-toast";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

const Protected = ({ Component }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContent);
  const login = localStorage.getItem("login");

  useEffect(() => {
    if (!login && !isLoggedIn) {
      if (window.location.pathname === "/") return;
      toast({ description: "You are not logged in, please login to continue" });
      navigate("/login");
    } else {
      setIsLoggedIn(true);
      toast({ description: "You are logged in successfully" });
    }
  }, [isLoggedIn]);
  return <Component />;
};

export default Protected;
