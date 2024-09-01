import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSideBar from "../components/AdminSideBar";
import toast, { Toaster } from "react-hot-toast";

const AdminWorkshops = () => {
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch all faculty data
  const getAllFaculties = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/faculty/all");
      console.log(data);
      setFaculties(data || []);
    } catch (error) {
      console.error("Error fetching faculty data", error);
    }
  };

  // Handle faculty deletion
  const handleApprove = async (workshopId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/workshop/approve",
        { workshopId: workshopId }
      );
      toast.success("Succesfully approved");
      getAllFaculties();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDel = async (workshopId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/workshop/delete",
        { workshopId: workshopId }
      );
      toast.error("Rejected");
    } catch (error) {
      console.error(error);
    }
  };

  // Open modal with selected faculty
  const openModal = (faculty) => {
    setSelectedFaculty(faculty);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedFaculty(null);
    setModalOpen(false);
  };

  useEffect(() => {
    getAllFaculties();
  }, []);

  // FacultyCard component
  const FacultyCard = ({ faculty }) => {
    return (
      <div
        className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg flex flex-col gap-2 mt-10 hover:scale-105 hover:opacity-95 cursor-pointer"
        onClick={() => openModal(faculty)}
      >
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
          <strong>Total Workshops:</strong> {faculty.workshops.length}
        </p>
      </div>
    );
  };

  // Modal component
  const Modal = ({ faculty, onClose }) => {
    if (!faculty) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] h-[600px] overflow-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold mb-4">
              Workshops By {faculty.name}
            </h3>
            <button
              onClick={onClose}
              className="  text-gray-800 p-2 rounded  text-2xl"
            >
              X
            </button>
          </div>

          <div className="space-y-4 mt-8">
            {faculty.workshops.map((workshop) => (
              <div
                key={workshop._id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col justify-center items-center gap-4"
              >
                <div className="text-gray-700 flex justify-center items-start gap-4 flex-col">
                  <p>
                    <strong>Name:</strong> {workshop.name}
                  </p>
                  <p>
                    <strong>Mail:</strong> {workshop.mail}
                  </p>
                  <p>
                    <strong>Venue:</strong> {workshop.venue}
                  </p>

                  <p>
                    <strong>Started On:</strong> {workshop.started}
                  </p>
                  <p>
                    <strong>Ended On:</strong> {workshop.ended}
                  </p>
                  <p>
                    <strong>No. of days:</strong> {workshop.days}
                  </p>
                  <p>
                    <strong>Approved:</strong>{" "}
                    {workshop.approved ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(workshop._id)}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDel(workshop._id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex">
        <AdminSideBar />
        <Toaster position="top-center" reverseOrder={false} />
        <div className="bg-[url('https://img.freepik.com/free-vector/teacher-collection-concept_52683-37015.jpg')] bg-cover h-screen w-full">
          <div className="w-full p-6 h-full backdrop-blur-sm overflow-auto">
            <h2 className="text-3xl font-bold mb-4">Approve Workshops</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {faculties.map((faculty) => (
                <FacultyCard key={faculty._id} faculty={faculty} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal faculty={selectedFaculty} onClose={closeModal} />
    </>
  );
};

export default AdminWorkshops;
