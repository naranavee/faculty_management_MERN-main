import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  // State variables for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [married, setMarried] = useState("");

  const navigate = useNavigate(); // Use navigate hook to redirect

  // Handle sign-up submission
  const handleSignUp = async () => {
    const userData = {
      name,
      email,
      password,
      gender,
      contact,
      dob,
      joiningDate,
      designation,
      department,
      salary,
      address,
      qualification,
      married,
    };

    try {
      await axios.post("http://localhost:8080/faculty/register", {
        name: name,
        email: email,
        password: password,
        gender: gender,
        mobile: contact,
        dob: dob,
        doj: joiningDate,
        designation: designation,
        department: department,
        salary: salary,
        address: address,
        qualification: qualification,
        married: married,
      });
      toast.success("Registration successful!");
      navigate("/"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Error during registration", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-screen bg-[url('https://www.academyfront.com/images/blog/school-software.png')] bg-cover flex justify-center items-center">
      <div className="bg-white opacity-90 p-4 w-[800px] rounded-xl mt-5 flex flex-col">
        <h1 className="font-bold text-[50px] place-self-center text-blue-700 underline underline-offset-4">
          SignUp
        </h1>

        <div className="flex justify-center items-center gap-6">
          <input
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 place-self-center text-lg"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 place-self-center text-lg"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 place-self-center text-lg"
            placeholder="Enter Your Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center gap-6">
          <select
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 text-lg cursor-pointer"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" hidden>
              Select Your Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 place-self-center text-lg"
            placeholder="Enter Your Contact No."
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <input
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 place-self-center text-lg"
            placeholder="Enter Your DOB"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center gap-6">
          <input
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 place-self-center text-lg"
            placeholder="Enter date of joining"
            type="date"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
          />
          <input
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 place-self-center text-lg"
            placeholder="Enter Your Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <input
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 place-self-center text-lg"
            placeholder="Enter Your Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center gap-6">
          <input
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 place-self-center text-lg"
            placeholder="Enter Your Salary"
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <input
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 place-self-center text-lg"
            placeholder="Enter Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="p-2 rounded-md w-[400px] border-[#478fc2] border-2 outline-none mt-10 place-self-center text-lg"
            placeholder="Enter Your Qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
        </div>

        <select
          className="p-2 rounded-md w-[250px] border-[#478fc2] border-2 outline-none mt-10 text-lg cursor-pointer"
          value={married}
          onChange={(e) => setMarried(e.target.value)}
        >
          <option value="" hidden>
            Are You Married
          </option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <button
          className="place-self-center p-2 w-[200px] rounded-lg bg-blue-400 mt-3 font-bold text-xl hover:scale-105 cursor-pointer"
          onClick={handleSignUp}
        >
          SignUp
        </button>

        <span className="place-self-center mt-2 text-xl">OR</span>

        <h1 className="mt-2 place-self-center text-lg font-semibold">
          Already have an account?{" "}
          <Link
            to="/"
            className="hover:underline underline-offset-2 cursor-pointer"
          >
            Login
          </Link>
        </h1>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default SignUp;
