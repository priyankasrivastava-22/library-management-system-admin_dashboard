import React, { useState } from "react";
import "../styles/components.css";

export default function TopBar({ theme, toggleTheme, activePage }) {

  const [showAdminMenu, setShowAdminMenu] = useState(false);

  // 🔹 Dynamic page title
  const getPageTitle = () => {
    switch (activePage) {
      case "dashboard": return "Dashboard";
      case "fiction": return "Fiction";
      case "nonfiction": return "Non-Fiction";
      case "study": return "Study";
      case "records": return "Records (CRUD)";
      default: return "Dashboard";
    }
  };

  return (
    <div className="topbar">

      {/* LEFT: PAGE NAME */}
      <div className="topbar-left">
        <h2>{getPageTitle()}</h2>
      </div>

      {/* RIGHT: ACTIONS */}
      <div className="topbar-right">
        
        {/* SEARCH FIRST */}
        <input type="text"placeholder="Search..."className="topbar-search"/>

        {/* THEME BUTTON */}
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* PROFILE */}
        <div className="admin-profile-wrapper">
          <button
            className="icon-btn"
            onClick={() => setShowAdminMenu(!showAdminMenu)}
          >
            👤
          </button>

          {showAdminMenu && (
            <div className="admin-dropdown">
              <div className="admin-menu-item">Complaints</div>
              <div className="admin-menu-item">Feedback</div>
              <div className="admin-menu-item">Sign Out</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}