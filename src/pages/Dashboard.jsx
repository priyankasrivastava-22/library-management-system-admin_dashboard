import React, { useState, useEffect } from "react";
import "./Dashboard.css";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [sectionFilter, setSectionFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    // Dummy data for testing
    const dummyBooks = [
      {
        id: 1,
        name: "Harry Potter",
        author: "J.K. Rowling",
        section: "Fiction",
        category: "Fantasy",
        stockAdded: 10,
        issued: 5,
        stockLeft: 5,
        totalIssued: 12,
        totalFine: 0,
        date: "2025-09-08",
        admin: "Admin1",
      },
      {
        id: 2,
        name: "Economics 101",
        author: "Paul Samuelson",
        section: "Study",
        category: "Economics",
        stockAdded: 5,
        issued: 2,
        stockLeft: 3,
        totalIssued: 5,
        totalFine: 0,
        date: "2025-09-08",
        admin: "Admin2",
      },
    ];
    setBooks(dummyBooks);
  }, []);

  // Filter books dynamically
  const filteredBooks = books.filter((b) => 
    (sectionFilter === "All" || b.section === sectionFilter) &&
    (categoryFilter === "All" || b.category === categoryFilter) &&
    (dateFilter === "" || b.date === dateFilter)
  );

  const sections = ["All", "Fiction", "Non-Fiction", "Study"];
  const categories = {
    Fiction: ["All", "Fantasy", "Mystery", "Romance", "Thriller", "Historical", "Children", "Cook"],
    "Non-Fiction": ["All", "Biography", "Selfhelp", "History", "Science", "Philosophy", "Travel", "Truecrime"],
    Study: ["All", "Mathematics", "Economics", "Physics", "Chemistry", "Biology", "Engineering", "Law"],
  };

  // Summary boxes data
  const totalBooks = books.reduce((sum, b) => sum + b.stockAdded, 0);
  const totalIssuedToday = books.reduce((sum, b) => sum + b.issued, 0);
  const totalReturned = books.reduce((sum, b) => sum + (b.stockAdded - b.stockLeft), 0);
  const totalStockLeft = books.reduce((sum, b) => sum + b.stockLeft, 0);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📊 Admin Dashboard</h1>

      {/* Filters */}
      <div className="section-category-filters">
        <div className="filter-group">
          <label>Section</label>
          <select value={sectionFilter} onChange={(e) => { setSectionFilter(e.target.value); setCategoryFilter("All"); }}>
            {sections.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Category</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {(categories[sectionFilter] || ["All"]).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-group date-filter-container">
          <label>Date</label>
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="filter-input"/>
        </div>
      </div>

      {/* Summary Boxes */}
      <div className="summary-boxes">
        <div className="box">
          <h3>Total Books in Library</h3>
          <p>{totalBooks}</p>
        </div>
        <div className="box">
          <h3>Total Books Issued Today</h3>
          <p>{totalIssuedToday}</p>
        </div>
        <div className="box">
          <h3>Total Books Returned</h3>
          <p>{totalReturned}</p>
        </div>
        <div className="box">
          <h3>Total Stock Left</h3>
          <p>{totalStockLeft}</p>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Section</th>
              <th>Category</th>
              <th>Stock Added</th>
              <th>Issued Today</th>
              <th>Stock Left</th>
              <th>Total Issued</th>
              <th>Total Fine</th>
              <th>Admin</th>
              <th>Date</th>
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
