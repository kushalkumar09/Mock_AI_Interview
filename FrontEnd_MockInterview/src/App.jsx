import { Navigate, Route, Routes } from "react-router";
import { Toaster } from "@/components/ui/toaster";
// import "./App.css";
import Home from "./screens/home/Home";
import Interview from "./screens/InterviewScreen/componentsInterview/Interview";
import Dashboard from "./screens/home/componentsHome/Dashboard";
import Startscreen from "./screens/StartScreen/Startscreen";
import Feedback from "./screens/InterviewScreen/Feedback";
import Login from "./screens/LoginSignup/login";
import Signup from "./screens/LoginSignup/Signup";
import Protected from "./screens/Protected";
import { useContext, useEffect } from "react";
import { AppContent } from "./context/Appcontext";
import UnknownRoute from "./screens/home/componentsHome/UnknownRoute";
import { ReactLenis } from 'lenis/react'

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContent);
  useEffect(() => {
    const loggedin = localStorage.getItem("login");
    if (loggedin === "true") {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      <ReactLenis root />
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
        <Route path="/" element={<Home />}>
          {/* Protected Routes  */}
          <Route element={<Protected />}>
            <Route path="login" element={<Navigate to={"/"}></Navigate>} />
            <Route path="signup" element={<Navigate to={"/"}></Navigate>} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="interview/:id" element={<Interview />} />
            <Route path="interview/:id/start" element={<Startscreen />} />
            <Route path="interview/:id/feedback" element={<Feedback />} />
          </Route>
        </Route>
        <Route path="/*" element={<UnknownRoute/>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
