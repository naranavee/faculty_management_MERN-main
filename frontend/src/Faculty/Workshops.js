import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import toast, { Toaster } from "react-hot-toast";

const Workshops = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // State to manage input fields
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [ended, setEnded] = useState("");
  const [started, setStarted] = useState("");
  const [venue, setVenue] = useState("");
  const [days, setDays] = useState("");
  const [workshops, setWorkshops] = useState([]);
  const [editingWorkshop, setEditingWorkshop] = useState(null); // For editing workshop
  const id = localStorage.getItem("id");

  const getAllWorkshops = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/faculty/single",
        { id: id }
      );
      setWorkshops(data?.faculty?.workshops || []);
    } catch (error) {
      console.error("Error getting data", error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingWorkshop) {
        // Update existing workshop
        await axios.post("http://localhost:8080/workshop/update", {
          workshopId: editingWorkshop._id,
          mail,
          name,
          venue,
          started,
          ended,
          days,
        });
        toast.success("Workshop updated successfully");
        setIsUpdateModalOpen(false);
      } else {
        // Create new workshop
        await axios.post("http://localhost:8080/workshop/create", {
          mail,
          name,
          venue,
          started,
          ended,
          days,
          facultyId: id,
        });
        toast.success("Workshop created successfully");
        setIsModalOpen(false);
      }

      // Reset fields and fetch updated list
      setMail("");
      setName("");
      setVenue("");
      setStarted("");
      setEnded("");
      setDays("");
      getAllWorkshops();
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const handleDel = async (workshopID) => {
    try {
      await axios.post("http://localhost:8080/workshop/delete", {
        workshopID: workshopID,
      });
      toast.success("Workshop Deleted Successfully");
      getAllWorkshops();
    } catch (error) {
      console.error("Error deleting workshop", error);
    }
  };

  const handleEdit = (workshop) => {
    setEditingWorkshop(workshop);
    setMail(workshop.mail);
    setName(workshop.name);
    setVenue(workshop.venue);
    setStarted(workshop.started);
    setEnded(workshop.ended);
    setDays(workshop.days);
    setIsUpdateModalOpen(true);
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  };

  useEffect(() => {
    getAllWorkshops();
  }, []);

  const WorkshopList = ({ workshops }) => {
    return (
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-6 text-start">
          Published Workshops
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop, index) => (
            <div
              key={index}
              className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg flex flex-col space-y-4"
            >
              <h3 className="text-2xl font-semibold mb-2">{workshop.name}</h3>
              <p className="text-gray-700 mb-1">
                <strong>Mail:</strong> {workshop.mail}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Venue:</strong> {workshop.venue}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Started On:</strong>{" "}
                {formatDateForInput(workshop.started)}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Ended On:</strong> {formatDateForInput(workshop.ended)}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>No. of Days:</strong> {workshop.days}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Approved:</strong> {workshop.approved ? "Yes" : "No"}
              </p>
              <button
                onClick={() => handleEdit(workshop)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition mb-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDel(workshop?._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex">
      <SideBar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full bg-cover h-screen bg-[url('https://cdn.create.vista.com/api/media/small/174752460/stock-photo-untidy-overworked-businesspeople-working-together-office')]">
        <div className="backdrop-blur-md h-full w-full flex flex-col p-4 relative overflow-auto">
          <button
            className="bg-blue-500 text-white px-4 py-2 text-lg font-bold rounded-lg hover:bg-blue-600 transition mb-6 self-end"
            onClick={() => setIsModalOpen(true)}
          >
            Add Workshop
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg w-[700px]">
                <h2 className="text-2xl font-bold text-center mb-6">
                  Add Workshop
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-700">
                        Faculty Mail:
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 outline-none"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700">
                        Name of Workshop:
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-700">Venue:</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 outline-none"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700">Started On:</label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 outline-none"
                        value={started}
                        onChange={(e) => setStarted(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-700">Ended On:</label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 outline-none"
                        value={ended}
                        onChange={(e) => setEnded(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700">
                        No. of Days:
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 outline-none"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isUpdateModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg w-[700px]">
                <h2 className="text-2xl font-bold text-center mb-6">
                  Update Workshop
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-700">
                        Faculty Mail:
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 outline-none"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700">
                        Name of Workshop:
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-700">Venue:</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 outline-none"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700">Started On:</label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 outline-none"
                        value={formatDateForInput(started)}
                        onChange={(e) => setStarted(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      <label className="block text-gray-700">Ended On:</label>
                      <input
                        type="date"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 outline-none"
                        value={formatDateForInput(ended)}
                        onChange={(e) => setEnded(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-gray-700">
                        No. of Days:
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg mt-1 outline-none"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() => setIsUpdateModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <WorkshopList workshops={workshops} />
        </div>
      </div>
    </div>
  );
};

export default Workshops;
