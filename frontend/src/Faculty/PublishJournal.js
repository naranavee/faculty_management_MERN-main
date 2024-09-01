import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import toast, { Toaster } from "react-hot-toast";

const PublishJournal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); // Track if updating
  const id = localStorage.getItem("id");
  const [publisherName, setPublisherName] = useState("");
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const [volume, setVolume] = useState("");
  const [issue, setIssue] = useState("");
  const [date, setDate] = useState("");
  const [otherInfo, setOtherInfo] = useState("");
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);

  const getAllJournals = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/faculty/single",
        { id: id }
      );
      setJournals(data?.faculty?.journals || []);
    } catch (error) {
      console.error("Error getting data", error);
    }
  };

  const handleSave = async () => {
    try {
      if (isUpdating) {
        // Update existing journal
        await axios.post("http://localhost:8080/journal/update", {
          journalId: selectedJournal._id, // The ID of the journal to update
          name: publisherName,
          department: department,
          title: title,
          volume: volume,
          issue: issue,
          date: date,
          otherInfo: otherInfo,
        });
        toast.success("Journal updated successfully");
      } else {
        // Create new journal
        await axios.post("http://localhost:8080/journal/create", {
          name: publisherName,
          department: department,
          title: title,
          volume: volume,
          issue: issue,
          date: date,
          otherInfo: otherInfo,
          facultyId: id,
        });
        toast.success("Journal has been sent to admin");
      }
      console.log("Data saved successfully");
      setIsModalOpen(false); // Close modal after saving
      setIsUpdateModalOpen(false); // Close update modal if open
      getAllJournals(); // Refresh journals list after saving
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const handleDel = async (journalID) => {
    try {
      await axios.post("http://localhost:8080/journal/delete", {
        journalID: journalID,
      });
      toast.success("Journal Deleted Successfully");
      getAllJournals();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (journal) => {
    setSelectedJournal(journal);
    setPublisherName(journal.name);
    setDepartment(journal.department);
    setTitle(journal.title);
    setVolume(journal.volume);
    setIssue(journal.issue);
    setDate(formatDateForInput(journal.date));
    setOtherInfo(journal.otherInfo);
    setIsUpdating(true); // Set flag to indicate updating
    setIsUpdateModalOpen(true);
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  };

  useEffect(() => {
    getAllJournals();
  }, []);

  const JournalsList = ({ journals }) => {
    return (
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-4">Published Journals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journals.map((journal, index) => (
            <div
              key={index}
              className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg flex flex-col gap-4"
            >
              <h3 className="text-xl font-semibold mb-2">{journal.title}</h3>
              <p className="text-gray-700 mb-1">
                <strong>Publisher:</strong> {journal.name}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Department:</strong> {journal.department}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Volume:</strong> {journal.volume}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Issue:</strong> {journal.issue}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Date:</strong> {formatDateForInput(journal.date)}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Other Info:</strong> {journal.otherInfo}
              </p>
              <p className="text-gray-700">
                <strong>Approved:</strong> {journal.approved ? "Yes" : "No"}
              </p>
              <button
                onClick={() => handleUpdate(journal)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDel(journal?._id)}
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
      <div className="w-full h-screen bg-[url('https://www.wallpaperflare.com/static/477/810/354/notebook-paper-write-postcards-memories-wallpaper.jpg')] bg-cover">
        <div className="backdrop-blur-sm h-full w-full flex flex-col p-4 relative overflow-auto">
          <button
            className="bg-blue-500 mb-4 text-white p-4 text-lg font-bold font-serif w-[200px] rounded hover:bg-blue-600 transition place-self-end"
            onClick={() => setIsModalOpen(true)}
          >
            Publish
          </button>
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg w-[700px] h-[600px]">
                <h2 className="text-2xl font-bold text-center">
                  Publish Journal
                </h2>
                <div className="space-y-4 mt-10">
                  <div className="flex justify-center items-center gap-10">
                    <div>
                      <label className="block text-gray-700">
                        Publisher Name:
                      </label>
                      <input
                        type="text"
                        className="w-[300px] p-2 border border-gray-300 rounded mt-1 outline-none"
                        value={publisherName}
                        onChange={(e) => setPublisherName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Department:</label>
                      <input
                        type="text"
                        className="w-[300px] p-2 border border-gray-300 rounded mt-1 outline-none"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-10">
                    <div>
                      <label className="block text-gray-700">
                        Title of Paper:
                      </label>
                      <input
                        type="text"
                        className="w-[300px] p-2 border border-gray-300 rounded mt-1 outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Volume:</label>
                      <input
                        type="text"
                        className="w-[300px] p-2 border border-gray-300 rounded mt-1 outline-none"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-10">
                    <div>
                      <label className="block text-gray-700">Issue:</label>
                      <input
                        type="text"
                        className="w-[300px] p-2 border border-gray-300 rounded mt-1 outline-none"
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Date:</label>
                      <input
                        type="date"
                        className="w-[300px] p-2 border border-gray-300 rounded mt-1 outline-none"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700">Other Info:</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded mt-1 outline-none"
                      rows="4"
                      value={otherInfo}
                      onChange={(e) => setOtherInfo(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isUpdateModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
              <div className="bg-white p-8 rounded-lg shadow-lg w-[700px] h-[600px]">
                <h2 className="text-2xl font-bold text-center">
                  Update Journal
                </h2>
                <div className="space-y-4 mt-10">
                  <div className="flex justify-center items-center gap-10">
                    <div>
                      <label className="block text-gray-700">
                        Publisher Name:
                      </label>
                      <input
                        type="text"
                        className="w-[300px] p-2 border border-gray-300 rounded mt-1 outline-none"
                        value={publisherName}
                        onChange={(e) => setPublisherName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Department:</label>
                      <input
                        type="text"
                        className="w-[300px] p-2 border border-gray-300 rounded mt-1 outline-none"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-10">
                    <div>
                      <label className="block text-gray-700">
                        Title of Paper:
                      </label>
                      <input
                        type="text"
                        className="w-[300px] p-2 border border-gray-300 rounded mt-1 outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Volume:</label>
                      <input
                        type="text"
                        className="w-[300px] p-2 border border-gray-300 rounded mt-1 outline-none"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-10">
                    <div>
                      <label className="block text-gray-700">Issue:</label>
                      <input
                        type="text"
                        className="w-[300px] p-2 border border-gray-300 rounded mt-1 outline-none"
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700">Date:</label>
                      <input
                        type="date"
                        className="w-[300px] p-2 border border-gray-300 rounded mt-1 outline-none"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700">Other Info:</label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded mt-1 outline-none"
                      rows="4"
                      value={otherInfo}
                      onChange={(e) => setOtherInfo(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsUpdateModalOpen(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <JournalsList journals={journals} />
        </div>
      </div>
    </div>
  );
};

export default PublishJournal;
