import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";

const Profile = () => {
  const id = localStorage.getItem("id");
  const [profileData, setProfileData] = useState({
    name: "",
    mobileNumber: "",
    gender: "",
    dateOfBirth: "",
    dateOfJoining: "",
    address: "",
    designation: "",
    department: "",
    qualification: "",
    salary: "",
    married: "",
    avatarUrl:
      "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(profileData);

  // Fetch user data from backend
  const getUser = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/faculty/single",
        { id }
      );
      const fetchedData = data?.faculty;
      setProfileData({
        name: fetchedData?.name,
        mobileNumber: fetchedData?.mobile,
        gender: fetchedData?.gender,
        dateOfBirth: fetchedData?.dob,
        dateOfJoining: fetchedData?.doj,
        address: fetchedData?.address,
        designation: fetchedData?.designation,
        department: fetchedData?.department,
        qualification: fetchedData?.qualification,
        salary: fetchedData?.salary,
        married: fetchedData?.married,
        avatarUrl:
          "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format date to "MM/DD/YYYY" by default
  };
  useEffect(() => {
    getUser();
  }, []);

  // Handle input changes in the modal form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update profile data
  const handleSave = async () => {
    try {
      await axios.post("http://localhost:8080/faculty/update", {
        id,
        ...formData,
      });
      setProfileData(formData); // Update profile data after successful save
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="bg-[url('https://c0.wallpaperflare.com/preview/437/75/614/whitespace-desktop-business-office.jpg')] bg-cover w-full">
        <div className="flex-1 backdrop-blur-sm p-6 flex justify-center items-center h-full">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] flex flex-col items-center">
            {/* Avatar Image */}
            <img
              className="w-32 h-32 rounded-full object-cover mb-4"
              src={profileData.avatarUrl}
              alt="Profile Avatar"
            />

            {/* Profile Title */}
            <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>

            {/* Profile Information */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div>
                <p className="font-semibold">Name:</p>
                <p>{profileData.name}</p>
              </div>
              <div>
                <p className="font-semibold">Mobile Number:</p>
                <p>{profileData.mobileNumber}</p>
              </div>
              <div>
                <p className="font-semibold">Gender:</p>
                <p>{profileData.gender}</p>
              </div>
              <div>
                <p className="font-semibold">Date of Birth:</p>
                <p>{formatDate(profileData.dateOfBirth)}</p>
              </div>
              <div>
                <p className="font-semibold">Date of Joining:</p>
                <p>{formatDate(profileData.dateOfJoining)}</p>
              </div>
              <div>
                <p className="font-semibold">Designation:</p>
                <p>{profileData.designation}</p>
              </div>
              <div>
                <p className="font-semibold">Department:</p>
                <p>{profileData.department}</p>
              </div>
              <div>
                <p className="font-semibold">Qualification:</p>
                <p>{profileData.qualification}</p>
              </div>
              <div>
                <p className="font-semibold">Salary:</p>
                <p>{profileData.salary}</p>
              </div>
              <div>
                <p className="font-semibold">Married:</p>
                <p>{profileData.married}</p>
              </div>
              <div className="col-span-2">
                <p className="font-semibold">Address:</p>
                <p>{profileData.address}</p>
              </div>
              <div className="col-span-2">
                <button
                  className="font-semibold p-2 text-lg w-[200px] bg-violet-400 rounded-lg hover:bg-violet-300 cursor-pointer"
                  onClick={() => {
                    setFormData(profileData); // Set initial form data
                    setIsModalOpen(true); // Open modal
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Input fields for editing */}
              {Object.keys(profileData).map((key) =>
                key !== "avatarUrl" ? ( // Exclude avatarUrl from being editable
                  <div key={key}>
                    <label className="font-semibold">{key}:</label>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  </div>
                ) : null
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="font-semibold p-2 text-lg bg-violet-400 rounded-lg hover:bg-violet-300 cursor-pointer mr-2"
                onClick={handleSave}
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

export default Profile;
