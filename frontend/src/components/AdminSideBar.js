import React from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <div className="h-screen w-[300px] bg-orange-400 p-4 flex flex-col ">
      <div className="text-[30px] place-self-center mt-10 font-bold font-serif">
        FacultyTrack
      </div>

      <div className="flex flex-col justify-center items-start ml-3 gap-[80px] mt-[100px] text-[20px] font-serif font-semibold">
        <Link
          to="/admin-faculties"
          className="hover:text-white hover:opacity-80"
        >
          Faculties
        </Link>

        <Link
          to="/admin-workshops"
          className="hover:text-white hover:opacity-80"
        >
          Approve Workshops
        </Link>
        <Link to="/admin-journal" className="hover:text-white hover:opacity-80">
          Approve Journals
        </Link>
        <Link to="/admin-leave" className="hover:text-white hover:opacity-80">
          Approve Leave
        </Link>

        <Link to="/" className="hover:text-white hover:opacity-80">
          LogOut
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
