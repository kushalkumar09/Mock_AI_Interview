import { AuthEndPoints } from "@/constants/endpoint";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router";
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async(data) => {
    const signup = await fetch(AuthEndPoints.SignUp.endPoint, {
      method: AuthEndPoints.SignUp.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(signup);
    
    if (signup.ok) {
      const responseData = await signup.json();
      localStorage.setItem("token", responseData.token);
      navigate("/");
    } else {
      console.log("Signup failed");
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/3 bg-blue-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">Join Us!</h1>
        <p className="text-lg">Create an account to explore more features.</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-2/3 p-8">
        <h1 className="text-3xl font-semibold text-blue-600 mb-6">Signup</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-4"
        >
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="Username"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <span className=" text-red-600">Username is required</span>
          )}
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className=" text-red-600">Email is required</span>
          )}
          <input
            {...register("password", { required: true, minLength: 8 })}
            placeholder="Password"
            type="password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password?.type === "required" && (
            <span className="text-red-600">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-600">
              Password must be at least 8 characters
            </span>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Signup
          </button>
          <button
            type="button"
            className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            Continue with Google
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
