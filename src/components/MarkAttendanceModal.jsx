import React, { useState } from "react";
import Inputs from "./Inputs";
import { FaSpinner } from "react-icons/fa";

function MarkAttendanceModal({ onClose }) {
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setServerMsg("");

    try {
      const response = await fetch(
        "https://bckprj25-1.onrender.com/api/v1/attendance/mark-attendance",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log("📩 Attendance Response:", data);

      if (response.ok) {
        setServerMsg("Attendance marked successfully 🎉");

        // Optional: Close modal after 2 secs
        setTimeout(() => {
          onClose();
        }, 2000);

        setFormData({ email: "" }); // reset input
      } else {
        setServerMsg(data?.message || "Unable to mark attendance ❌");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setServerMsg("Server error. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 w-80">
        <h2 className="text-xl font-bold text-green-600 text-center">
          Input Your Gmail to Mark Your Attendance
        </h2>

        <form onSubmit={handleSubmit} className="w-full">
          <Inputs
            name="email"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            disabled={isLoading}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition w-full duration-300"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <FaSpinner className="animate-spin" />
                <p>Loading...</p>
              </div>
            ) : (
              "Mark Attendance"
            )}
          </button>
        </form>

        {/* Server Response Message */}
        {serverMsg && (
          <p className="text-center text-sm mt-2 text-gray-700">{serverMsg}</p>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default MarkAttendanceModal;
