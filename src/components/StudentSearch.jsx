import React, { useState, useEffect } from "react";
import Inputs from "./Inputs";

function StudentSearch({ onFilterChange }) {
  const [searchName, setSearchName] = useState("");
  const [track, setTrack] = useState("");
  const [dateRange, setDateRange] = useState("");

  const token = localStorage.getItem("authToken");

  const mapDateRange = (option) => {
    switch (option) {
      case "Last 7 Days": return "7d";
      case "Last 14 Days": return "14d";
      case "Last 21 Days": return "21d";
      case "Last 30 Days": return "30d";
      default: return null;
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchFiltered = async () => {
      try {
        let url = "";
        let params = new URLSearchParams();

        // 🔹 PRIORITY LOGIC
        // 1. Name search
        if (searchName) {
          url = "https://bckprj25-1.onrender.com/api/v1/attendance/search";
          params.append("search", searchName);
        }
        // 2. Track search
        else if (track) {
          url = `https://bckprj25-1.onrender.com/api/v1/attendance/student-track/${encodeURIComponent(track)}`;
        }
        // 3. Date range search
        else if (dateRange) {
          url = "https://bckprj25-1.onrender.com/api/v1/attendance/date-range";
          const mapped = mapDateRange(dateRange);
          if (mapped) params.append("range", mapped);
        }
        // 4. Default: all students
        else {
          url = "https://bckprj25-1.onrender.com/api/v1/attendance/students-attendance";
        }

        const finalUrl = params.toString()
          ? `${url}?${params.toString()}`
          : url;

        const res = await fetch(finalUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        // Normalize backend differences
        const results = data.data || data.students || [];

        onFilterChange(results);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchFiltered();
  }, [searchName, track, dateRange, token, onFilterChange]);

  // 🔹 When typing a name, clear track + date
  const handleNameChange = (e) => {
    setSearchName(e.target.value);
    setTrack("");
    setDateRange("");
  };

  // 🔹 When picking a track, clear name + date
  const handleTrackChange = (e) => {
    setTrack(e.target.value);
    setSearchName("");
    setDateRange("");
  };

  // 🔹 When picking a date range, clear search + track
  const handleDateChange = (e) => {
    setDateRange(e.target.value);
    setTrack("");
    setSearchName("");
  };

  return (
    <div className="studentSearch flex flex-col gap-5 md:flex-row md:items-center w-full">

      {/* Search by Name */}
      <Inputs
        name="search"
        placeholder="Search by Name"
        bgcolor="#e6eaee"
        value={searchName}
        onChange={handleNameChange}
        type="search"
      />

      {/* Track */}
      <Inputs
        name="track"
        placeholder="Select Track"
        bgcolor="#e6eaee"
        value={track}
        onChange={handleTrackChange}
        type="select"
        options={[
          "FullStack Development",
          "Backend Development",
          "Cloud Computing",
          "Data Analysis",
          "Cyber Security",
        ]}
      />

      {/* Date */}
      <Inputs
        name="date"
        placeholder="Sort By Date"
        bgcolor="#e6eaee"
        value={dateRange}
        onChange={handleDateChange}
        type="select"
        options={[
          "Last 7 Days",
          "Last 14 Days",
          "Last 21 Days",
          "Last 30 Days",
        ]}
      />
    </div>
  );
}

export default StudentSearch;
