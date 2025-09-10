// src/components/Table.jsx
import React, { useState } from "react";
import "../styles/Table.css";

export default function Table({ data, columns, section }) {
  const [catFilter, setCatFilter] = useState("");

  // Category options
  const categories = {
    fiction: ["fantasy","mystery","romance","thriller","historical","children","cook"],
    nonfiction: ["biography","selfhelp","history","science","philosophy","travel","truecrime"],
    study: ["mathematics","economics","physics","chemistry","biology","engineering","law"]
  };

  // Filtered data
  const filteredData = data.filter(b => 
    (!catFilter || b.category === catFilter) &&
    (!section || b.section?.toLowerCase() === section.toLowerCase())
  );

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>
                <div className="th-header">
                  <span>{col.label}</span>
                  {col.key === "category" && (
                    <select
                      className="filter-dropdown"
                      value={catFilter}
                      onChange={(e) => setCatFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      {categories[section]?.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((r, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(r, i) : r[col.key] || "-"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="no-data">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
