import React, { useState, useEffect } from "react";
import Inputs from "./Inputs";

function StudentSearch({ onFilterChange }) {
  const [searchName, setSearchName] = useState("");
  const [track, setTrack] = useState("");
  const [dateRange, setDateRange] = useState("");

  const token = localStorage.getItem("authToken");

  // Helper to map human-readable options to range strings backend expects
  const mapDateRange = (option) => {
    switch (option) {
      case "Last 7 Days":
        return "7d";
      case "Last 14 Days":
        return "14d";
      case "Last 21 Days":
        return "21d";
      case "Last 30 Days":
        return "30d";
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchFilteredData = async () => {
      try {
        let url = "https://bckprj25-1.onrender.com/api/v1/attendance/students-attendance";
        const params = new URLSearchParams();

        // Name filter
        if (searchName) {
          params.append("name", searchName);
        }

        // Track filter
        if (track) {
          url = `https://bckprj25-1.onrender.com/api/v1/attendance/student-track/${encodeURIComponent(track)}`;
        }

        // Date range filter
        if (dateRange) {
          const range = mapDateRange(dateRange);
          if (range) {
            url = `https://bckprj25-1.onrender.com/api/v1/attendance/date-range?range=${range}`;
          }
        }

        // Append query params (like name)
        const queryString = params.toString();
        const finalUrl = queryString ? `${url}?${queryString}` : url;

        const res = await fetch(finalUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        // Backend for date-range returns data in .data, others might use .students
        if (data.data) {
          onFilterChange(data.data);
        } else if (data.students) {
          onFilterChange(data.students);
        } else {
          onFilterChange([]);
        }
      } catch (err) {
        console.error("Failed to fetch filtered students:", err);
      }
    };

    fetchFilteredData();
  }, [searchName, track, dateRange, token, onFilterChange]);

  return (
    <div className="studentSearch flex flex-col gap-5 md:flex-row md:items-center w-full">
      {/* SEARCH BY NAME */}
      <div className="flex-1 w-full">
        <Inputs
          name="search"
          placeholder="Search by Name"
          bgcolor="#e6eaee"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          type="search"
          width="100%"
        />
      </div>

      {/* TRACK DROPDOWN */}
      <div className="flex-1 w-full">
        <Inputs
          name="track"
          placeholder="Select Track"
          bgcolor="#e6eaee"
          value={track}
          onChange={(e) => setTrack(e.target.value)}
          type="text"
          width="100%"
          options={[
            "FullStack Development",
            "Backend Development",
            "Cloud Computing",
            "Data Analysis",
            "Cyber Security",
          ]}
        />
      </div>

      {/* DATE FILTER */}
      <div className="flex-1 w-full">
        <Inputs
          name="date"
          placeholder="Sort By Date"
          bgcolor="#e6eaee"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          type="text"
          width="100%"
          options={[
            "Last 7 Days",
            "Last 14 Days",
            "Last 21 Days",
            "Last 30 Days",
          ]}
        />
      </div>
    </div>
  );
}

export default StudentSearch;
