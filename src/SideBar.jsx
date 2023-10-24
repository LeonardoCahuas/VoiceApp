import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "./redux/pageSlice";

function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const changePage = (pageName) => {
        dispatch(setPage(pageName));
    };

    return (
        <div className="sidebar" style={{ 
            flex: isOpen ? '0 0 250px' : '0 0 75px', 
            backgroundColor: '#2c3e50', 
            color: '#ecf0f1', 
            transition: 'flex 0.3s',
            overflow: 'hidden',
            height: "100%"
        }}>
            
            <div className="d-flex align-items-center justify-content-between p-5">
                <div 
                    style={{ cursor: 'pointer', fontSize: '18px', zIndex: 1000 }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </div>

                {isOpen && <div style={{ fontSize: '24px', fontWeight: 'bold' }}>CLONA VOCE</div>}
            </div>

            {isOpen && (
                <div className="sidebar-content d-flex flex-column mt-5 p-5">
                    <a onClick={() => changePage("voci")} className="nav-link d-flex align-items-center mb-3">
            <i className="fas fa-microphone mr-2"></i>
            VOCI
          </a>
          <a onClick={() => changePage("registrazioni")} className="nav-link d-flex align-items-center mb-3">
            <i className="fas fa-file-audio mr-2"></i>
            REGISTRAZIONI
          </a>
          <a onClick={() => changePage("clips")} className="nav-link d-flex align-items-center mb-3">
            <i className="fas fa-video mr-2"></i>
            CLIPS
          </a>
          <a  onClick={() => changePage("styles")} className="nav-link d-flex align-items-center mb-3">
            <i className="fas fa-microphone mr-2"></i>
            STILI
          </a>
                </div>
            )}
        </div>
    );
}

export default SideBar;
