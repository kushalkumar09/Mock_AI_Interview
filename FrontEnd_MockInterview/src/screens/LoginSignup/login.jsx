import { AuthEndPoints } from "@/constants/endpoint";
import { AppContent } from "@/context/Appcontext";
import { useToast } from "@/hooks/use-toast";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContent);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isLoggedIn && localStorage.getItem("login")) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const { toast } = useToast();

  const onSubmit = async (data) => {
    const login = await fetch(AuthEndPoints.Login.endPoint, {
      method: AuthEndPoints.Login.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    if (login.ok) {
      const responseData = await login.json();
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("login", true);
      setIsLoggedIn(true);
      navigate("/");
      toast("Login successful");
    } else {
      toast("Login failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/3 bg-blue-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-lg">
          Log in to access your dashboard and explore more.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-2/3 p-8">
        <h1 className="text-3xl font-semibold text-blue-600 mb-6">Login</h1>
        <form
          className="w-full max-w-sm space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email Input */}
          <div>
            <input
              type="text"
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          {/* Google Button */}
          <button
            type="button"
            className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-600 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
