import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // State variables for the form fields
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role === "Admin") {
      if (email === "admin@gmail.com" && password === "admin12345") {
        navigate("/admin-faculties");
      }
    }

    try {
      const response = await axios.post("http://localhost:8080/faculty/login", {
        email,
        password,
      });

      // Handle success (e.g., save token, redirect, etc.)
      if (response.data) {
        localStorage.setItem("id", response?.data?.faculty?._id);
        navigate("/workshops");
      }
      console.log("Login successful:", response.data);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <div className="h-screen bg-[#478fc2] flex ">
      <img
        className="h-full w-full opacity-85 -mr-[100px]"
        src="https://www.academyfront.com/images/blog/school-software.png"
        alt="background"
      />

      <div className="bg-white opacity-90 p-4 h-[600px] w-[450px] rounded-xl -ml-[400px] z-10 place-self-center flex flex-col">
        <h1 className="font-bold text-[50px] place-self-center text-blue-700 underline underline-offset-4">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-20 text-lg"
            placeholder="Enter Your Email"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 text-lg"
            placeholder="Enter Your Password"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 text-lg cursor-pointer"
          >
            <option value="" hidden>
              Select Your Role
            </option>
            <option value="User">Faculty</option>
            <option value="Admin">Administration</option>
          </select>

          <button
            type="submit"
            className="p-2 w-[200px] rounded-lg bg-blue-400 mt-12 font-bold text-xl hover:scale-105 cursor-pointer"
          >
            Login
          </button>
        </form>

        <span className="place-self-center mt-5 text-xl">OR</span>

        <h1 className="mt-5 place-self-center text-lg font-semibold">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="hover:underline underline-offset-2 cursor-pointer"
          >
            Register
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Login;
