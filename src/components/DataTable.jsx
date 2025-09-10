// src/components/DataTable.jsx
import React from "react";

export default function DataTable({ columns = [], data = [], renderActions }) {
  return (
    <div className="datatable">
      <table>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>
                <div className="col-head">
                  <span>{c.label}</span>
                  {c.filterIcon && <span className="filter-icon">🔍</span>}
                </div>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} style={{ textAlign: "center", opacity: 0.7 }}>
                No records
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={row.id || idx}>
                {columns.map((c) => (
                  <td key={c.key + "_" + idx}>{c.render ? c.render(row) : row[c.key]}</td>
                ))}
                <td>{renderActions ? renderActions(row) : null}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
