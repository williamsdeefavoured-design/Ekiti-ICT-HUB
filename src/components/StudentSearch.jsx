import React from "react";
import Inputs from "./Inputs";

function StudentSearch() {
  return (
    <div className="studentSearch flex gap-5">
      <div className="by-name flex-1">
        <Inputs
          name="search"
          placeholder="Search by Name"
          bgcolor="#e6eaee"
          value=""
          onChange=""
          type="search"
        />
      </div>

      <div className="by-track">
        <Inputs
          name="track"
          placeholder="Select Track"
          bgcolor="#e6eaee"
          value=""
          onChange=""
          type="text"
          options={[
            "FullStack Development",
            "Backend Development",
            "Cloud Computing",
            "Data Analysis",
            "Cyber Security",
          ]} // ⬅️ Dropdown
        />
      </div>

      <div className="by-date">
        <Inputs
          name="date"
          placeholder="Sort By Date"
          bgcolor="#e6eaee"
          value=""
          onChange=""
          type="text"
          options={[
            "Last 7 Days",
            "Last 14 Days",
            "Last 21 Days",
            "Last 30 Days",
          ]} // ⬅️ Dropdown
        />
      </div>
    </div>
  );
}

export default StudentSearch;
