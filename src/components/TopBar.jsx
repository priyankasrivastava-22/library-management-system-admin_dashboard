import React, { useState } from "react";
import "../styles/components.css";

export default function TopBar({ search, setSearch, theme, toggleTheme }) {

  // NEW STATE (for admin dropdown)
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <h2>Admin Panel</h2>
      </div>

      <div className="topbar-center">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="topbar-search"
        />
      </div>

      <div className="topbar-right">
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {/* PROFILE BUTTON */}
        <div className="admin-profile-wrapper">
          <button
            className="icon-btn"
            onClick={() => setShowAdminMenu(!showAdminMenu)}
          >
            👤
          </button>

          {/* DROPDOWN MENU */}
          {showAdminMenu && (
            <div className="admin-dropdown">
              <div
                className="admin-menu-item"
                onClick={() => window.location.href = "/admin/complaints"}
              >
                Complaints
              </div>

              <div
                className="admin-menu-item"
                onClick={() => window.location.href = "/admin/feedback"}
              >
                Feedback
              </div>

              <div
                className="admin-menu-item"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Sign Out
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}