import React from "react";
import AdminNavbar from "./AdminNavbar";
import StudentTotal from "./StudentTotal";
import StudentTable from "./StudentTable";

function LeftSection() {
  return (
    <div
      className="
        left-container 
        w-full 
        overflow-x-hidden 
        px-3 sm:px-6 lg:px-10 
        pb-10
      "
    >
      <AdminNavbar />
      <StudentTotal />
      <StudentTable />
    </div>
  );
}

export default LeftSection;
