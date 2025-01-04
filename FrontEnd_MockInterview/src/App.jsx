import { Route, Routes } from "react-router";
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

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Protected Component={Home}></Protected>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="interview/:id" element={<Interview />} />
          <Route path="interview/:id/start" element={<Startscreen />} />
          <Route path="interview/:id/feedback" element={<Feedback />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
