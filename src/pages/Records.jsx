import React, { useEffect, useState } from "react";
import { fetchBooks, addBook, deleteBook } from "../api";

export default function Records() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    publisher: "",
    stock: 1,
    section: "Fiction",
    category: "Fantasy",
  });

  // ================= SECTION MAP =================
  const sectionMap = {
    "Fiction": 1,
    "Non-Fiction": 2,
    "Study": 3,
  };

  // ================= CATEGORY MAP =================
  const categoryMap = {
    // Fiction
    "Fantasy": 1,
    "Mystery": 2,
    "Romance": 3,
    "Thriller": 8,
    "Historical": 9,
    "Children": 10,
    "Cook": 11,

    // Non-Fiction
    "Biography": 4,
    "Science": 5,
    "Selfhelp": 12,
    "History": 13,
    "Philosophy": 14,
    "Travel": 15,
    "Truecrime": 16,

    // Study
    "Mathematics": 6,
    "Physics": 7,
    "Economics": 17,
    "Chemistry": 18,
    "Biology": 19,
    "Engineering": 20,
    "Law": 21,
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await fetchBooks();
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setBooks([]);
    }
  };

  const handleAddBook = async () => {
    if (loading) return;

    if (!newBook.title || !newBook.author) {
      alert("Fill required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: newBook.title,
        author: newBook.author,
        publisher: newBook.publisher,
        stock: newBook.stock,
        section_id: sectionMap[newBook.section],
        category_id: categoryMap[newBook.category],
      };

      console.log("PAYLOAD:", payload);

      await addBook(payload);

      await loadBooks();

      setNewBook({
        title: "",
        author: "",
        publisher: "",
        stock: 1,
        section: "Fiction",
        category: "Fantasy",
      });

      alert("Book added successfully");

    } catch (error) {
      console.error(error);
      alert("Error adding book");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (id) => {
    await deleteBook(id);
    loadBooks();
  };

  return (
    <div className="page">
      <h2>Records</h2>

      <div className="form">
        <input
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />

        <input
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />

        <input
          placeholder="Publisher"
          value={newBook.publisher}
          onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
        />

        <input
          type="number"
          value={newBook.stock}
          onChange={(e) =>
            setNewBook({ ...newBook, stock: Number(e.target.value) })
          }
        />

        <select
          value={newBook.section}
          onChange={(e) =>
            setNewBook({ ...newBook, section: e.target.value, category: "" })
          }
        >
          <option>Fiction</option>
          <option>Non-Fiction</option>
          <option>Study</option>
        </select>

        <select
          value={newBook.category}
          onChange={(e) =>
            setNewBook({ ...newBook, category: e.target.value })
          }
        >
          <option>Fantasy</option>
          <option>Mystery</option>
          <option>Romance</option>
          <option>Thriller</option>
          <option>Biography</option>
          <option>Science</option>
          <option>Mathematics</option>
        </select>

        <button onClick={handleAddBook} disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>Stock</th><th>Section</th><th>Category</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.stock}</td>
              <td>{b.section}</td>
              <td>{b.category}</td>
              <td>
                <button onClick={() => handleDeleteBook(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}