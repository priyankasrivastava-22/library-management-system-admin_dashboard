import React, { useState, useEffect } from "react";

const AddBookModal = ({ onClose, onSubmit }) => {
  const [bookData, setBookData] = useState({
    name: "",
    author: "",
    section_id: "",
    category_id: "",
    stockAdded: ""
  });

  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    fetchSections();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (bookData.section_id) {
      const filtered = categories.filter(
        (cat) => Number(cat.section_id) === Number(bookData.section_id)
      );
      setFilteredCategories(filtered);
    }
  }, [bookData.section_id, categories]);

  const fetchSections = async () => {
    const res = await fetch("http://localhost:5000/api/books/sections");
    const data = await res.json();
    setSections(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:5000/api/books/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleSectionChange = (e) => {
    const sectionId = parseInt(e.target.value);

    setBookData((prev) => ({
      ...prev,
      section_id: sectionId,
      category_id: ""
    }));
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: bookData.name,
        author: bookData.author,
        section_id: bookData.section_id,
        category_id: bookData.category_id,
        stock: bookData.stockAdded
      })
    });

    onSubmit && onSubmit();
    onClose();
  };

  return (
    <div className="modal">
      <h2>Add Book</h2>

      <input
        type="text"
        placeholder="Book Name"
        value={bookData.name}
        onChange={(e) =>
          setBookData({ ...bookData, name: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Author"
        value={bookData.author}
        onChange={(e) =>
          setBookData({ ...bookData, author: e.target.value })
        }
      />

      <select value={bookData.section_id} onChange={handleSectionChange}>
        <option value="">Select Section</option>
        {sections.map((sec) => (
          <option key={sec.id} value={sec.id}>
            {sec.name}
          </option>
        ))}
      </select>

      <select
        value={bookData.category_id}
        onChange={(e) =>
          setBookData({
            ...bookData,
            category_id: parseInt(e.target.value)
          })
        }
      >
        <option value="">Select Category</option>
        {filteredCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Stock"
        value={bookData.stockAdded}
        onChange={(e) =>
          setBookData({ ...bookData, stockAdded: e.target.value })
        }
      />

      <button onClick={handleSubmit}>Add Book</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddBookModal;