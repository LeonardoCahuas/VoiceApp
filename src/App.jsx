import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import VoiceManagement from "./VoiceManagment";

function App() {
    const pageName = useSelector((state) => state.page.value);

    return (
        /*  <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
             Assicurati che i componenti Sidebar e Navbar siano commentati se non vengono utilizzati, 
                 altrimenti influenzeranno il layout del componente VoiceManagement 
             /* <SideBar />
             <Navbar /> 
             <div id="center-preve" className="w-100">
                 <VoiceManagement/>
             </div>
         </div> */

        <div id="center-preve" className="w-100 d-flex justify-content-center align-items-center">
            <VoiceManagement />
        </div>
    );
}

export default App;
