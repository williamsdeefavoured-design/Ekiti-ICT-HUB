import React, { useState, useEffect } from "react";
import StudentTotCard from "./StudentTotCard";
// import AttendancePercent from "./AttendancePercent";

function StudentTotal() {
  const [user, setUser] = useState({ name: "Loading...", role: "" });
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user info
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    fetch("https://bckprj25-1.onrender.com/api/v1/auth/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const firstName = data.auth?.name?.split(" ")[0] || "Admin";
        setUser({ name: firstName, role: "Admin" });
      })
      .catch((err) => console.error("Failed to fetch user:", err));
  }, []);

  // Fetch overall attendance
  useEffect(() => {
    const getOverallAttendance = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://bckprj25-1.onrender.com/api/v1/attendance/overall-attendance",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setAttendance(data);
      } catch (err) {
        console.error("Failed to fetch attendance:", err);
        setError("Failed to fetch attendance data.");
      } finally {
        setLoading(false);
      }
    };

    getOverallAttendance();
  }, []);

  // Format current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Show loading or error messages
  if (loading)
    return <p className="mx-10 my-5 text-orange-600 font-semibold">Loading...</p>;
  if (error)
    return <p className="mx-10 my-5 text-red-500 font-semibold">{error}</p>;

  return (
    <div>
      {/* Top section */}
      <div className="top-section mx-4 md:mx-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <div className="left">
          <h1 className="text-xl md:text-2xl text-orange-600 font-bold">
            Welcome {user.name}
          </h1>
        </div>
        <div className="right">
          <p className="date text-sm md:text-base text-orange-600 font-medium">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="studentDet flex flex-col md:flex-row gap-10">
        <div className="dashboard-cards grid grid-cols-1 md:grid-cols-3 gap-5 mx-10 my-5">
          <StudentTotCard
            title="Total Students"
            value={attendance.totalStudents || 0}
            bgColor="bg-yellow-400"
            textColor="text-black"
          />
          <StudentTotCard
            title="Total Present"
            value={attendance.totalPresent || 0}
            bgColor="bg-[#0B7300]"
          />
          <StudentTotCard
            title="Total Absent"
            value={attendance.totalAbsent || 0}
            bgColor="bg-[#D64700]"
          />
          <StudentTotCard
            title="Overall Attendance %"
            value={attendance.overallAttendancePercentage || 0}
            bgColor="bg-[#D64700]"
          />
          <StudentTotCard
            title="Best Attendance"
            value={attendance.bestAttendance?.attendancePercentage || 0}
            subtitle={attendance.bestAttendance?.name}
            bgColor="bg-[#0B7300]"
          />
          <StudentTotCard
            title="Worst Attendance"
            value={attendance.worstAttendance?.attendancePercentage || 0}
            subtitle={attendance.worstAttendance?.name}
            bgColor="bg-yellow-400"
            textColor="text-black"
          />
        </div>
      </div>
    </div>
  );
}

export default StudentTotal;
