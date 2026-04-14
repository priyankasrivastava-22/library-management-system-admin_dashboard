import React, { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [sectionFilter, setSectionFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

 useEffect(() => {
  fetch("http://localhost:5000/api/dashboard")
    .then((res) => res.json())
    .then((data) => {
      const formatted = data.map((b) => ({
        id: b.id,
        name: b.title,
        author: b.author,
        section: b.section,
        category: b.category,
        stockAdded: b.stock,
        issued: b.totalFine || 0,
        stockLeft: b.stock - (b.currentlyIssued || 0),
        totalIssued: b.totalIssued || 0,
        totalFine: b.totalFine || 0,
        admin: "Admin",
        date: new Date().toISOString().split("T")[0],
      }));

      setBooks(formatted);
    })
    .catch((err) => console.error(err));
}, []);

  const filteredBooks = books.filter(
    (b) =>
      (sectionFilter === "All" || b.section === sectionFilter) &&
      (categoryFilter === "All" || b.category === categoryFilter) &&
      (dateFilter === "" || b.date === dateFilter)
  );

  const sections = ["All", "Fiction", "Non Fiction", "Study"];
  const categories = {
    Fiction: ["All", "Fantasy", "Mystery", "Romance", "Thriller", "Historical", "Children", "Cook"],
    "Non-Fiction": ["All", "Biography", "Self Help", "History", "Science", "Philosophy", "Travel", "Truecrime"],
    Study: ["All", "Mathematics", "Economics", "Physics", "Chemistry", "Biology", "Engineering", "Law"],
  };

  const totalBooks = books.reduce((sum, b) => sum + b.stockAdded, 0);
  const totalIssuedToday = books.reduce((sum, b) => sum + b.issued, 0);
  const totalReturned = books.reduce((sum, b) => sum + (b.stockAdded - b.stockLeft), 0);
  const totalStockLeft = books.reduce((sum, b) => sum + b.stockLeft, 0);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="section-category-filters">
        <div className="filter-group">
          <label>Section</label>
          <select value={sectionFilter} onChange={(e) => { setSectionFilter(e.target.value); setCategoryFilter("All"); }}>
            {sections.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {(categories[sectionFilter] || ["All"]).map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Date</label>
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        </div>
      </div>

      <div className="summary-boxes">
        <div className="box"><h3>Total Books</h3><p>{totalBooks}</p></div>
        <div className="box"><h3>Issued Today</h3><p>{totalIssuedToday}</p></div>
        <div className="box"><h3>Returned</h3><p>{totalReturned}</p></div>
        <div className="box"><h3>Stock Left</h3><p>{totalStockLeft}</p></div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Book Name</th><th>Author</th><th>Section</th>
              <th>Category</th><th>Stock Added</th><th>Issued</th>
              <th>Stock Left</th><th>Total Issued</th><th>Total Fine</th>
              <th>Admin</th><th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.name}</td>
                <td>{b.author}</td>
                <td>{b.section}</td>
                <td>{b.category}</td>
                <td>{b.stockAdded}</td>
                <td>{b.issued}</td>
                <td>{b.stockLeft}</td>
                <td>{b.totalIssued}</td>
                <td>{b.totalFine}</td>
                <td>{b.admin}</td>
                <td>{b.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}