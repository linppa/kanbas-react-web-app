import "./index.css"
import React from "react";
import { FaArrowCircleRight, FaCheckCircle, FaFileImport, FaPlusCircle, FaRegBell, FaStream } from "react-icons/fa";
import { MdAdsClick } from "react-icons/md"
import { Bs5Circle, Bs5CircleFill, BsMegaphone } from "react-icons/bs"
function StatusList() {
    return (
        <div style={{padding: "15px"}}>
            <button className="btn btn-outline-secondary btn-custom buttons">
                <FaFileImport className="me-2" />
                Import Existing Content
            </button>
            <br />
            <button className="btn btn-outline-secondary btn-custom buttons">
                <FaArrowCircleRight /> Import From Commons
            </button>
            <br />
            <button  className="btn btn-outline-secondary btn-custom buttons">
                <MdAdsClick className="me-2" /> Choose Home Page
            </button>
            <br />
            <button className="btn btn-outline-secondary btn-custom buttons">
                <FaStream className="me-2" /> View Course Stream
            </button>
            <br />
            <button className="btn btn-outline-secondary btn-custom buttons">
                <BsMegaphone className="me-2" /> New Announcement
            </button>
            <br />
            <button className="btn btn-outline-secondary btn-custom buttons">
                <FaStream className="me-2" /> New Analytics
            </button>
            <br />
            <button className="btn btn-outline-secondary btn-custom buttons">
                <FaRegBell className="me-2" /> View Course Notifications
            </button>
            <br />
            <br />
            <div>
            {/* To Do List of section */}
            <h6>To Do</h6>
            <hr style={{width: "250px"}}/>
            <ul style={{ listStyleType: "none" }}>
                <li>
                    <span className="ToDo">
                    <Bs5CircleFill className="me-2" />Grade A1 - ENV + HTML
                    </span>
                    <br />
                    <span className="subText_ToDo">100 points ● Sep 18 at 11:59pm</span>
                </li>
                <li>
                    <span className="ToDo">
                    <Bs5CircleFill className="me-2" />Grade A2 - CSS + BOOTSTRAP
                    </span>
                    <br />
                    <span className="subText_ToDo">100 points ● Sep 18 at 11:59pm</span>
                </li>
            </ul>
            </div>
        </div>
    );
}
export default StatusList;