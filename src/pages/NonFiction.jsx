// src/pages/Fiction.jsx
import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import "../styles/components.css";

export default function NonFiction() {
  const [books, setBooks] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  // Dummy data
  const dummyBooks = [
    {
      id: "B001",
      name: "Harry Potter",
      author: "J.K. Rowling",
      section: "fiction",
      category: "fantasy",
      copies: 5,
      history: [
        {
          user: "Student1",
          issuedDate: "2025-09-08",
          returnedDate: "2025-09-10",
          fine: 0,
          issuedBy: "Admin1",
          statusIssue: "Good",
          statusReturn: "Good",
          review: "Loved it",
        },
      ],
      createdAt: "2025-09-07T10:30:00",
    },
  ];

  useEffect(() => {
    setBooks(dummyBooks);
  }, []);

  const columns = [
    { key: "slno", label: "Sl No", render: (r, i) => i + 1 },
    { key: "user", label: "Username", render: (r) => r.history?.map((h) => h.user).join(", ") || "-" },
    { key: "bookId", label: "Book ID", render: (r) => r.id || "-" },
    { key: "category", label: "Category", render: (r) => r.category || "-" },
    { key: "bookName", label: "Book Name", render: (r) => r.name || "-" },
    { key: "author", label: "Author", render: (r) => r.author || "-" },
    { key: "issuedDate", label: "Issued Date", render: (r) => r.history?.map((h) => h.issuedDate).join(", ") || "-" },
    { key: "statusIssue", label: "Status on Issue", render: (r) => r.history?.map((h) => h.statusIssue).join(", ") || "-" },
    { key: "returnedDate", label: "Returned Date", render: (r) => r.history?.map((h) => h.returnedDate).join(", ") || "-" },
    { key: "statusReturn", label: "Status on Return", render: (r) => r.history?.map((h) => h.statusReturn).join(", ") || "-" },
    { key: "review", label: "Review", render: (r) => r.history?.map((h) => h.review).join(", ") || "-" },
    { key: "fine", label: "Fine per Day", render: (r) => r.history?.map((h) => h.fine || 0).reduce((a, b) => a + b, 0) },
    { key: "issuedBy", label: "Issued By", render: (r) => r.history?.map((h) => h.issuedBy).join(", ") || "-" },
    { key: "date", label: "Date", render: (r) => r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "-" },
    { key: "timestamp", label: "Timestamp", render: (r) => r.createdAt ? new Date(r.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }) : "-" },
  ];

  // Filter by date
  const filteredBooks = books.filter((b) => !dateFilter || b.createdAt.startsWith(dateFilter));

  return (
    <div className="page">
      <div className="page-header">
        <h2>Non-Fiction Section</h2>
        <div className="top-controls">
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        </div>
      </div>

      <Table data={filteredBooks} columns={columns} section="fiction" />
    </div>
  );
}
