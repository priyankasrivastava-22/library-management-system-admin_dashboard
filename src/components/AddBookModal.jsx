import React, { useState, useEffect } from "react";
import "../pages/Records.css";

const sections = ["Fiction", "Non-Fiction", "Study"];
const categories = {
  Fiction: ["Fantasy", "Mystery", "Romance", "Thriller", "Historical", "Children", "Cook"],
  "Non-Fiction": ["Biography", "Selfhelp", "History", "Science", "Philosophy", "Travel", "Truecrime"],
  Study: ["Mathematics", "Economics", "Physics", "Chemistry", "Biology", "Engineering", "Law"],
};

export default function AddBookModal({ open, onClose, onSubmit }) {
  const [bookData, setBookData] = useState({
    name: "",
    author: "",
    section: "",
    category: "",
    stockAdded: 1,
    date: new Date().toISOString().slice(0, 10),
    admin: "Admin",
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!open) {
      setBookData({
        name: "",
        author: "",
        section: "",
        category: "",
        stockAdded: 1,
        date: new Date().toISOString().slice(0, 10),
        admin: "Admin",
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSectionChange = (e) => {
    setBookData({ ...bookData, section: e.target.value, category: "" });
  };

  const handleSubmit = () => {
    if (!bookData.name || !bookData.author || !bookData.section || !bookData.category) {
      alert("Please fill all fields");
      return;
    }
    onSubmit(bookData);
  };

  // Only render modal if `open` is true
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Add New Book</h2>
        <div className="modal-form">
          <label>Name</label>
          <input name="name" value={bookData.name} onChange={handleChange} />

          <label>Author</label>
          <input name="author" value={bookData.author} onChange={handleChange} />

          <label>Section</label>
          <select value={bookData.section} onChange={handleSectionChange}>
            <option value="">Select Section</option>
            {sections.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <label>Category</label>
          <select
            name="category"
            value={bookData.category}
            onChange={handleChange}
            disabled={!bookData.section}
          >
            <option value="">Select Category</option>
            {bookData.section &&
              categories[bookData.section].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>

          <label>Copies / Stock Added</label>
          <input
            type="number"
            name="stockAdded"
            value={bookData.stockAdded}
            onChange={handleChange}
            min="1"
          />

          <label>Date of Entry</label>
          <input type="date" name="date" value={bookData.date} onChange={handleChange} />

          <div className="modal-buttons">
            <button className="btn-submit" onClick={handleSubmit}>
              Add Book
            </button>
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
