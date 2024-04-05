import React from "react";
import ModuleList from "../Modules/List";
import Status from "./Status";

function Home() {
  return (
    <div className="d-flex">
      <div style={{ flex: 1 }}>
        {/* modules list */}
        <ModuleList />
      </div>
      
      {/* status bar */}
      <Status />
    </div>
  );
}
export default Home;