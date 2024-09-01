import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

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

      if (response.data) {
        localStorage.setItem("id", response?.data?.faculty?._id);
        navigate("/workshops");
      }
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error.response.data);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="w-1/2 bg-cover bg-center p-12 relative"
        style={{
          backgroundImage: 'url("https://wallpapercave.com/wp/wp9764081.jpg")', // Use the same URL as in AdminLogin
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="text-4xl font-bold mb-4">
            <h1 className="text-5xl">Hello! welcome</h1>
            <h1 className="text-5xl">to our</h1>
            <h1 className="text-5xl">community</h1>
          </div>
          <p className="text-lg mb-8">
            Make your dream comes true and achieve your success
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
            Getting Started
          </button>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Login to your account
          </h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Role:
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" hidden>
                  Select Your Role
                </option>
                <option value="User">Faculty</option>
                <option value="Admin">Administration</option>
              </select>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                LOGIN
              </button>
            </div>
            <p className="text-center text-gray-500 text-xs">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-blue-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
