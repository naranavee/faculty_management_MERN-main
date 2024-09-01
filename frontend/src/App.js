import React from "react";
import Leave from "./Faculty/Leave";
import SideBar from "./components/SideBar";
import Profile from "./Faculty/Profile";
import PublishJournal from "./Faculty/PublishJournal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Workshops from "./Faculty/Workshops";
import Login from "./Login";
import AdminLeaves from "./Admin/AdminLeaves";
import AdminFaculty from "./Admin/AdminFaculty";
import AdminJournals from "./Admin/AdminJournals";
import AdminWorkshops from "./Admin/AdminWorkshops";
import SignUp from "./SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/journal" element={<PublishJournal />} />
        <Route path="/leave" element={<Leave />} />

        <Route path="/admin-leave" element={<AdminLeaves />} />
        <Route path="/admin-faculties" element={<AdminFaculty />} />
        <Route path="/admin-journal" element={<AdminJournals />} />
        <Route path="/admin-workshops" element={<AdminWorkshops />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
