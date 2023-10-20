import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import pages from "./redux/pages";
import SideBar from "./SideBar";

function App() {
    const pageName = useSelector((state) => state.page.value);

    return (
        <div className="w-100 h-100 d-flex flex-row">
            <SideBar />
            <div className="flex-grow-1 center">
                <Navbar />
                <div id="center-preve" className="h-100 w-100 p-5">
                    {pages[pageName]}
                </div>
            </div>
        </div>
    );
}

export default App;
