import React, { useState, useEffect } from "react";
import Table from "../components/Table";
import "../styles/components.css";
import { fetchBooks } from "../api";

export default function Nonfiction() {
  const [books, setBooks] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await fetchBooks();

      const formatted = data
        .filter((b) => (b.section || "").toLowerCase().includes("non"))
        .map((b) => ({
          id: b.id,
          name: b.title || "-",
          author: b.author || "-",
          section: (b.section || "").toLowerCase(),
          category: (b.category || "").toLowerCase(),
          copies: b.stock || 0,

          history: [
            {
              user: "-",
              issuedDate: "-",
              returnedDate: "-",
              fine: 0,
              issuedBy: "Admin",
              statusIssue: "-",
              statusReturn: "-",
              review: b.review || "-",
            },
          ],

          createdAt: new Date().toISOString(),
        }));

      setBooks(formatted);
    } catch (err) {
      console.error("Error loading books:", err);
    }
  };

  const columns = [
    { key: "slno", label: "Sl No", render: (r, i) => i + 1 },
    { key: "user", label: "Username", render: (r) => r.history.map(h => h.user).join(", ") },
    { key: "bookId", label: "Book ID", render: (r) => r.id },
    { key: "category", label: "Category", render: (r) => r.category },
    { key: "bookName", label: "Book Name", render: (r) => r.name },
    { key: "author", label: "Author", render: (r) => r.author },
    { key: "issuedDate", label: "Issued Date", render: () => "-" },
    { key: "statusIssue", label: "Status Issue", render: () => "-" },
    { key: "returnedDate", label: "Returned Date", render: () => "-" },
    { key: "statusReturn", label: "Status Return", render: () => "-" },
    { key: "review", label: "Review", render: (r) => r.history.map(h => h.review).join(", ") },
    { key: "fine", label: "Fine", render: () => 0 },
    { key: "issuedBy", label: "Issued By", render: () => "Admin" },
    { key: "date", label: "Date", render: (r) => new Date(r.createdAt).toLocaleDateString() },
    { key: "timestamp", label: "Time", render: (r) => new Date(r.createdAt).toLocaleTimeString() },
  ];

  const filteredBooks = books.filter(
    (b) => !dateFilter || b.createdAt.startsWith(dateFilter)
  );

  return (
    <div className="page">
      <h2>Non-Fiction Section</h2>

      <input
        type="date"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />

      <Table data={filteredBooks} columns={columns} section="nonfiction" />
    </div>
  );
}