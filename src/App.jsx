import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import pages from "./redux/pages";
import SideBar from "./SideBar";

function App() {
  const pageName = useSelector((state) => state.page.value);

  return (
    <div className="w-100 h-100 d-flex flex-row">
      <div className="w-25">
        <SideBar />
      </div>
      <div className="w-75">
        <Navbar />
        <div id="center-preve" className="h-100 w-100">
          {pages[pageName]}
        </div>
      </div>
    </div>
  );
}

export default App;
