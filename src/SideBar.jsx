import React from "react";
import { useDispatch } from "react-redux";
import { setPage } from "./redux/pageSlice";

function SideBar() {
  const dispatch = useDispatch();

  const changePage = (pageName) => {
    dispatch(setPage(pageName));
  };

  return (
    <div id="sidebar" className="w-100 d-flex flex-column h-100">
      <div className="p-5">
        <a className="navbar-brand" href="#">
          ClonaVoce
        </a>
      </div>
      <div className="d-flex flex-column mt-5 p-5">
        <a onClick={() => changePage("voci")} className="nav-link">
          VOCI
        </a>
        <a onClick={() => changePage("registrazioni")} className="nav-link">
          REGISTRAZIONI
        </a>
        <a className="nav-link">CLIPS</a>
        <a className="nav-link">VOCI</a>
      </div>
    </div>
  );
}

export default SideBar;
