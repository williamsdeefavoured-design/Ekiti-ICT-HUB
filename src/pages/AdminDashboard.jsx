import React from "react";
import LeftSection from "../components/LeftSection";
import SidePanel from "../components/SidePanel";

function AdminDashboard() {
  return (
    <div
      className="
        admin-section 
        flex 
        w-full 
        overflow-x-hidden 
        min-h-screen 
      "
    >
      {/* Side Panel */}
      <div className="hidden lg:block w-64 shrink-0">
        <SidePanel />
      </div>

      {/* Left Section */}
      <div className="flex-1 px-3 sm:px-6 lg:px-10 overflow-x-hidden">
        <LeftSection />
      </div>
    </div>
  );
}

export default AdminDashboard;
