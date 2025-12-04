import { useState } from "react";
import logoimg from "../assets/ekiti-logo-1.png";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // ✅ USE REACT ICONS
import MarkAttendanceModal from "./MarkAttendanceModal";
import "../index.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* NAVBAR */}
      <nav className="nav-container sticky z-30 top-0 shadow-lg px-4 md:px-10 py-3 flex items-center justify-between bg-[#D64700]">
        
        {/* LOGO */}
        <Link to={"/"}>
          <div className="logo flex space-x-5 items-center">
            <img src={logoimg} alt="Main Logo" className="w-20 h-auto" />
            <h1 className="text-xl md:text-2xl font-bold text-white">
              EKITI MSME ICT HUB
            </h1>
          </div>
        </Link>

        {/* NAV LINKS */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col md:flex md:flex-row items-center justify-center gap-5 mt-10 md:mt-0 text-white absolute md:static top-16 left-0 w-full md:w-auto bg-[#D64700] md:bg-transparent md:gap-10 p-5 md:p-0 transition-all duration-300`}
        >
          {/* STUDENT BUTTONS */}
          <div className="student flex flex-col md:flex-row gap-3 md:gap-5 items-center">
            <Link to="/enroll">
              <button className="button-1">Enroll</button>
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="button-1 w-full md:w-auto"
            >
              Mark Attendance
            </button>
          </div>

          {/* ADMIN BUTTON */}
          <div className="admin border-t-2 md:border-t-0 md:border-l-2 border-dotted mt-4 md:mt-0 pt-3 md:pt-0 md:pl-10 flex justify-center">
            <Link to="/admin-signin">
              <button className="button-1 w-full md:w-auto">Admin</button>
            </Link>
          </div>
        </div>

        {/* HAMBURGER ICON */}
        <button
          className="text-white text-3xl md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />} {/* ✅ REACT ICONS */}
        </button>
      </nav>

      {/* MODAL POPUP */}
      {showModal && <MarkAttendanceModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Header;
