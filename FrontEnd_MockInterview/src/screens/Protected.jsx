import { Navigate, Outlet } from "react-router";

const Protected = () => {
  const login = localStorage.getItem("login");

  return login === "true" ? <Outlet /> : <Navigate to={"/login"}></Navigate>;
};

export default Protected;
