import React, { useState } from "react";
import logoimg from "../assets/ekiti-logo-1.png";
import dashboardIcon from "../assets/dashboard.png";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function SidePanel() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-orange-600 text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* SIDEBAR */}
      <div
        className={`
          side-panel 
          fixed top-0 left-0 h-full w-64 
          bg-white shadow-xl 
          flex flex-col pt-10 px-6 gap-10
          transition-transform duration-300
          z-40
          
          ${menuOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0   /* ALWAYS visible on desktop */
        `}
      >
        {/* LOGO */}
        <div className="logo mb-10">
          <img className="w-32" src={logoimg} />
        </div>

        {/* MENU ITEMS */}

        
        <div className="side-links flex flex-col gap-20">
          <div className="dashboard-txt flex items-center gap-2">
            <img className="w-6" src={dashboardIcon} />
            <Link to="/admin-dashboard">
              <h1 className="text-lg font-semibold hover:text-orange-600 transition">
                Dashboard
              </h1>
            </Link>
          </div>

          <Link to="/enroll">
            <h1 className="text-lg font-semibold hover:text-orange-600 transition">
              Enroll a student
            </h1>
          </Link>
        </div>
      </div>

      {/* DARK OVERLAY (MOBILE ONLY) */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        ></div>
      )}
    </>
  );
}

export default SidePanel;
