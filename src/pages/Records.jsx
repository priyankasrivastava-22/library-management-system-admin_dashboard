import React, { useEffect, useState } from "react";
import { fetchBooks, addBook, deleteBook } from "../api";

export default function Records() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    section_id: 1,
    category_id: 1,
    title: "",
    author: "",
    publisher: "",
    stock: 1,
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await fetchBooks();
    setBooks(data);
  };

  const handleAddBook = async () => {
    await addBook(newBook);
    setNewBook({ section_id: 1, category_id: 1, title: "", author: "", publisher: "", stock: 1 });
    loadBooks();
  };

  const handleDeleteBook = async (id) => {
    await deleteBook(id);
    loadBooks();
  };

  return (
    <div className="page">
      <h2>📚 Records</h2>

      {/* Add Book Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Publisher"
          value={newBook.publisher}
          onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newBook.stock}
          onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
        />
        <button onClick={handleAddBook}>➕ Add Book</button>
      </div>

      {/* Books Table */}
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>Publisher</th>
            <th>Stock</th><th>Section</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.stock}</td>
              <td>{b.section}</td>
              <td>{b.category}</td>
              <td>
                <button onClick={() => handleDeleteBook(b.id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
