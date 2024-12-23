import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./screens/home/Home";
import Interview from "./screens/InterviewScreen/componentsInterview/Interview";
import Dashboard from "./screens/home/componentsHome/Dashboard";
import Startscreen from "./screens/StartScreen/Startscreen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="interview/:id" element={<Interview />} />
          <Route path="interview/:id/start" element={<Startscreen />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
