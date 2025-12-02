import React from "react";
import AdminNavbar from "./AdminNavbar";
import StudentTotal from "./StudentTotal";
import StudentTable from "./StudentTable";

function LeftSection() {
  return (
    <div className="left-container">
      <AdminNavbar />
      <StudentTotal />
      <StudentTable />
    </div>
  );
}

export default LeftSection;
