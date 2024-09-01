import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSideBar from "../components/AdminSideBar";
import { toast, Toaster } from "react-hot-toast";

const AdminFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState();

  const getAllFaculties = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/faculty/all");
      setFaculties(data || []);
    } catch (error) {
      console.error("Error fetching faculty data", error);
    }
  };

  const handleDel = async (id) => {
    try {
      await axios.post("http://localhost:8080/faculty/delete", {
        id: id,
      });
      toast.success("Faculty deleted successfully");
      getAllFaculties();
    } catch (error) {
      console.error("Error deleting faculty", error);
    }
  };

  const handleUpdateClick = async (faculty) => {
    try {
      setSelectedFaculty(faculty);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error updating faculty", error);
    }
  };

  const handleSave = async (id) => {
    try {
      await axios.post("http://localhost:8080/faculty/update", {
        id,
        ...selectedFaculty,
      });
      setIsModalOpen(false); // Close modal
      getAllFaculties();
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  useEffect(() => {
    getAllFaculties();
  }, []);

  const FacultyCard = ({ faculty }) => {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg w-[350px] flex flex-col gap-2">
        <img
          className="w-32 h-32 rounded-full object-cover mb-4 place-self-center"
          src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          alt="Profile Avatar"
        />
        <h3 className="text-xl font-semibold mb-2">{faculty.name}</h3>
        <p className="text-gray-700 mb-1">
          <strong>Email:</strong> {faculty.email}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Gender:</strong> {faculty.gender}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Mobile:</strong> {faculty.mobile}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Date of Birth:</strong> {faculty.dob}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Date of Joining:</strong> {faculty.doj}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Address:</strong> {faculty.address}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Designation:</strong> {faculty.designation}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Department:</strong> {faculty.department}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Qualification:</strong> {faculty.qualification}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>Salary:</strong> {faculty.salary}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Married:</strong> {faculty.married}
        </p>

        <button
          onClick={() => handleUpdateClick(faculty)}
          className="bg-green-400 text-white p-2 rounded hover:bg-green-600 transition mt-2"
        >
          Update
        </button>
        <button
          onClick={() => handleDel(faculty._id)}
          className="bg-red-400 text-white p-2 rounded hover:bg-red-600 transition mt-2"
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-[url('https://img.freepik.com/free-vector/teacher-collection-concept_52683-37015.jpg')] bg-cover h-screen w-full">
        <div className="w-full p-6  h-full backdrop-blur-sm overflow-auto">
          <h2 className="text-3xl font-bold mb-4">All Faculty Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {faculties.map((faculty) => (
              <FacultyCard key={faculty._id} faculty={faculty} />
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Input fields for editing */}
              {Object.keys(selectedFaculty)
                .filter(
                  (key) =>
                    !["_id", "workshops", "journals", "__v", "leaves"].includes(
                      key
                    )
                )
                .map((key) => (
                  <div key={key} className="mb-2">
                    <label className="font-semibold capitalize">{key}:</label>
                    <input
                      type="text"
                      name={key}
                      className="border p-1 rounded w-full"
                      value={selectedFaculty[key]}
                      onChange={(e) =>
                        setSelectedFaculty({
                          ...selectedFaculty,
                          [key]: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="font-semibold p-2 text-lg bg-violet-400 rounded-lg hover:bg-violet-300 cursor-pointer mr-2"
                onClick={() => handleSave(selectedFaculty?._id)}
              >
                Save
              </button>
              <button
                className="font-semibold p-2 text-lg bg-gray-400 rounded-lg hover:bg-gray-300 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFaculty;
