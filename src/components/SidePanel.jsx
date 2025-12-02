import React from "react";
import logoimg from "../assets/ekiti-logo-1.png";
import dashboardIcon from "../assets/dashboard.png";
import { Link } from "react-router";

function SidePanel() {
  return (
    <div className="side-panel flex h-screen pt-10 flex-col gap-30 items-start">
      <div className="logo">
        <img className="w-30" src={logoimg} />
      </div>

      <div className="dashboard-txt flex items-center gap-2">
        <img className="w-6" src={dashboardIcon} />
        <Link to='/admin-dashboard'>
          <h1>Dashboard</h1>
        </Link>
      </div>

      {/* <div className="mark-attendance">
        <h1>Manage Attendance</h1>
      </div> */}
    </div>
  );
}

export default SidePanel;
