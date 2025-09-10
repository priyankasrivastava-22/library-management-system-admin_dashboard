import React from "react";
import "../styles/components.css";

export default function TopBar({ search, setSearch, theme, toggleTheme }) {
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
        <button className="icon-btn">👤</button>
      </div>
    </div>
  );
}
