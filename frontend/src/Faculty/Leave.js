import React, { useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const Leave = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [reason, setReason] = useState("");
  const id = localStorage.getItem("id");
  // Get current date information
  const today = new Date();
  const currentMonth = today.getMonth(); // Month index (0-11)
  const currentYear = today.getFullYear();

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Generate array of days for the current month
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleLeaveClick = (date) => {
    setSelectedDate(`${monthNames[currentMonth]} ${date}, ${currentYear}`);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const leaveData = {
      date: selectedDate,
      reason,
    };

    try {
      // Replace 'your-backend-url' with your actual backend URL
      const response = await axios.post("http://localhost:8080/leaves/create", {
        facultyId: id,
        reason: reason,
        date: selectedDate,
      });
      toast.success("Request sent!");
      console.log("Leave request saved successfully", response.data);
      setIsModalOpen(false); // Close modal after saving
      setReason(""); // Clear reason input
    } catch (error) {
      console.error("Error saving leave request", error);
    }
  };

  return (
    <div className="flex">
      <Toaster position="top-center" reverseOrder={false} />
      <SideBar />
      <div className=" w-full bg-[url('https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg?cs=srgb&dl=pexels-leeloothefirst-5386754.jpg&fm=jpg')] bg-cover ">
        <div className="flex-1 p-6 h-full w-full backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-6">Apply For Leave</h1>
          <h2 className="text-lg font-semibold mb-4">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="grid grid-cols-7 gap-4 text-white text-[16px]">
            {daysArray.map((day) => (
              <div
                key={day}
                className="border p-4 rounded-lg text-center flex flex-col items-center"
              >
                <span className="font-semibold">{day}</span>
                <button
                  className="bg-blue-500 text-white px-3 py-1 mt-2 rounded hover:bg-blue-600 transition"
                  onClick={() => handleLeaveClick(day)}
                >
                  Leave
                </button>
              </div>
            ))}
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Leave Request</h2>
                <p className="mb-4">
                  <strong>Date:</strong> {selectedDate}
                </p>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Reason for Leave:
                  </label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded outline-none"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    onClick={handleSave}
                  >
                    Send
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leave;
