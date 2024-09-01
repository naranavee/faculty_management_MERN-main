import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="h-screen w-[250px] bg-violet-300 p-4 flex flex-col ">
      <div className="text-[30px] place-self-center mt-10 font-bold font-serif">
        FacultyTrack
      </div>

      <div className="flex flex-col justify-center items-start ml-5 gap-[80px] mt-[100px] text-[20px] font-serif font-semibold">
        <Link to="/workshops" className="hover:text-white hover:opacity-80">
          Add Workshops
        </Link>
        <Link to="/journal" className="hover:text-white hover:opacity-80">
          Publish Journals
        </Link>
        <Link to="/leave" className="hover:text-white hover:opacity-80">
          Apply Leave
        </Link>
        <Link to="/profile" className="hover:text-white hover:opacity-80">
          Profile
        </Link>
        <Link to="/" className="hover:text-white hover:opacity-80">
          LogOut
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
