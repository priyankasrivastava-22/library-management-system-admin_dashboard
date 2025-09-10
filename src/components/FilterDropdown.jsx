// src/components/FilterDropdown.jsx
import React from "react";

export default function FilterDropdown({ label, options = [], value, onChange }) {
  return (
    <div className="filter-dropdown">
      <label>{label}</label>
      <select value={value || ""} onChange={(e) => onChange?.(e.target.value)}>
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
