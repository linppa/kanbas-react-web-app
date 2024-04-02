import Nav from "../Nav";
import store from "./store";
import { Provider } from "react-redux";
import Assignment3 from "./a3";
import Assignment4 from "./a4";
import Assignment5 from "./a5";
import { Routes, Route, Navigate }
  from "react-router";

function Labs() {
  return (
    <Provider store={store}>
      <div className="container-fluid">

        <div>
          <Nav />
          <Routes>
            {/* default path on main page */}
            <Route path="/"
              element={<Navigate
                to="a5" />} />

            <Route path="a3"
              element={<Assignment3 />} />
            <Route path="a4"
              element={<Assignment4 />} />
            <Route path="a5"
              element={<Assignment5 />} />

          </Routes>
        
        </div>

      </div>
    </Provider>
  );
}
export default Labs;