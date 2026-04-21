import React from "react";
import {
  FaHome,
  FaBook,
  FaLayerGroup,
  FaClipboardList,
  FaExchangeAlt,
  FaUsers
} from "react-icons/fa";

function Sidebar({ setActivePage }) {
  return (
    <div className="sidebar">

      <div className="logo">Athenaeum</div>

      <div className="menu">
        <div className="menu-item" onClick={() => setActivePage("dashboard")}>
          <FaHome /> Dashboard
        </div>

        <div className="menu-item" onClick={() => setActivePage("fiction")}>
          <FaBook /> Fiction
        </div>

        <div className="menu-item" onClick={() => setActivePage("nonfiction")}>
          <FaLayerGroup /> Non-Fiction
        </div>

        <div className="menu-item" onClick={() => setActivePage("study")}>
          <FaBook /> Study
        </div>

        <div className="menu-item" onClick={() => setActivePage("records")}>
          <FaClipboardList /> Records (CRUD)
        </div>

        <div className="menu-item">
          <FaExchangeAlt /> Transactions
        </div>

        <div className="menu-item">
          <FaUsers /> Users
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="avatar">LA</div>
        <div>
          <div>Lead Admin</div>
          <small>admin@athenaeum.edu</small>
        </div>
      </div>

    </div>
  );
}

export default Sidebar;