import React, { useState, useEffect } from "react";
import dropDown from "../assets/arrow-square-down.png";
import notification from "../assets/notification.png";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const [user, setUser] = useState({ name: "Loading...", role: "" });

  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // remove token
      navigate("/admin-signin");
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) return;

    fetch("https://bckprj25-1.onrender.com/api/v1/auth/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let extractedName = "";

        if (data.message) {
          // remove the greeting part
          extractedName = data.message
            .replace("Welcome to your admin dashboard", "")
            .replace("!", "")
            .trim();
        }

        setUser({
          name: extractedName || "Admin User",
          role: "Admin",
        });
      })
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  return (
    <div
      className="
    admin-nav 
    flex flex-col sm:flex-row 
    items-center 
    justify-end 
    sm:justify-end 
    gap-3 sm:gap-5 
    mx-4 sm:mx-10 
    my-5 
    border-b 
    border-gray-400 
    pb-6
  "
    >
      {/* Notification Icon */}
      <img src={notification} alt="Notifications" className="w-6 h-6" />

      {/* User Info */}
      <div className="username text-center sm:text-left">
        <h1 className="text-orange-600 font-semibold text-base sm:text-lg">
          {user.name}
        </h1>
        <p className="position text-gray-500 text-sm">{user.role}</p>
      </div>

      {/* Dropdown Arrow */}
      <img
        src={dropDown}
        alt="Dropdown"
        className="w-5 h-5 cursor-pointer"
        onClick={() => setOpenDropdown(!openDropdown)}
      />

      {openDropdown && (
        <div className="absolute right-10 top-20 bg-white shadow-lg border rounded-lg w-40 py-2">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminNavbar;
