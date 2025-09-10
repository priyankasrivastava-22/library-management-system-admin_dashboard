import React from "react";
import "../styles/components.css";

function Sidebar({ setActivePage }) {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin Panel</h2>
      <ul>
        <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
        <li onClick={() => setActivePage("fiction")}>Fiction</li>
        <li onClick={() => setActivePage("nonfiction")}>Non-Fiction</li>
        <li onClick={() => setActivePage("study")}>Study</li>
        <li onClick={() => setActivePage("records")}>Records</li>
      </ul>
    </div>
  );
}

export default Sidebar;
