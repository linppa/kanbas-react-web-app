import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt, FaInbox, FaClock, FaYoutube, FaQuestionCircle, FaArrowCircleRight, FaNeos } from "react-icons/fa";
import "./index.css";
import "../../Kanbas/styles.css";

/* main black navigation bar */
function KanbasNavigation() {
  const links = [
    { label: "Northeastern", icon: <FaNeos className="fs-2" /> },
    { label: "Account", icon: <FaRegUserCircle className="fs-2" /> },
    { label: "Dashboard", icon: <FaTachometerAlt className="fs-2" /> },
    { label: "Courses", icon: <FaBook className="fs-2" /> },
    { label: "Calendar", icon: <FaRegCalendarAlt className="fs-2" /> },
    { label: "Inbox", icon: <div><FaInbox className="fs-2" /></div> },
    { label: "History", icon: <div><FaClock className="fs-2" /></div> },
    { label: "Studio", icon: <div><FaYoutube className="fs-2" /></div> },
    { label: "Commons", icon: <div><FaArrowCircleRight className="fs-2" /></div> },
    { label: "Quizes", icon: <div><FaBook className="fs-2" /></div> },
    { label: "Help", icon: <div><FaQuestionCircle className="fs-2" /></div> }
  ];

  const { pathname } = useLocation();
  return (
    <ul className="wd-kanbas-navigation">
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link.label) ? "wd-active" : ""}>
          <Link to={`/Kanbas/${link.label}`}> {link.icon} <span className="nav-label">{link.label}</span> </Link>
        </li>
      ))}
    </ul>
  );
}
export default KanbasNavigation;