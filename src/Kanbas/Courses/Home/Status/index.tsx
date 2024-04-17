import React from "react";
import ToDo from "../Todo";
import ComingUp from "../ComingUp";
import { FaBan, FaCheckCircle, FaFileImport, FaFileExport, FaCrosshairs, FaBullhorn, FaBell, FaChartBar } from "react-icons/fa";
import "../index.css";

function Status() {
  return (
    // status bar
    <div className="status-bar">
      <div>
        <h4>Course Status</h4>
        <hr />
        <button className="btn btn-outline-secondary btn-custom"><FaBan /> Unpublish </button>
        <button className="btn btn-outline-secondary btn-custom-published"><FaCheckCircle /> Published</button>
        <br /><br />
        <button className="btn btn-outline-secondary btn-custom-full"><FaFileImport /> Import Existing Content</button>
        <button className="btn btn-outline-secondary btn-custom-full"><FaFileExport /> Import From Commons</button>
        <button className="btn btn-outline-secondary btn-custom-full"><FaCrosshairs /> Choose Home Page</button>
        <button className="btn btn-outline-secondary btn-custom-full"><FaChartBar /> View Course Stream</button>
        <button className="btn btn-outline-secondary btn-custom-full"><FaBullhorn />New Announcement</button>
        <button className="btn btn-outline-secondary btn-custom-full"><FaChartBar /> New Analytics</button>
        <button className="btn btn-outline-secondary btn-custom-full"><FaBell /> View Course Notifications</button>
      </div>

      {/* to do list */}
      <ToDo />

      {/* coming up list */}
      <ComingUp />

    </div>
  );
}
export default Status;
