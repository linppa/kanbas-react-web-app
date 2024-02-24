import ModuleList from "./List";
import { FaFileImport, FaFileExport, FaCrosshairs, FaPlus, FaEllipsisV } from "react-icons/fa";

function Modules() {
  return (
    <div>
      {/* action buttons */}
      <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-outline-secondary btn-custom mr-2"><FaFileImport /> Collapse All</button>
          <button className="btn btn-outline-secondary btn-custom mr-2"><FaFileExport /> View Progress</button>
          <button className="btn btn-outline-secondary btn-custom mr-2"><FaCrosshairs /> Publish All</button>
          <button className="btn btn-outline-secondary btn-custom-module mr-2"><FaPlus /> Module</button>
          <button className="btn btn-outline-secondary btn-custom-ellipses"><FaEllipsisV /></button>
        </div>
        <hr className="horizontal-line"></hr>

      {/* modules list */}
      <ModuleList />
    </div>
  );
}
export default Modules;