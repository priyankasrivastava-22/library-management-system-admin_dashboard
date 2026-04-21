// import React, { useEffect, useState } from "react";
// import { fetchBooks, addBook, deleteBook } from "../api";

// export default function Records() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [newBook, setNewBook] = useState({
//     title: "",
//     author: "",
//     publisher: "",
//     stock: 1,
//     section: "Fiction",
//     category: "Fantasy",
//   });

//   // ================= SECTION MAP =================
//   const sectionMap = {
//     "Fiction": 1,
//     "Non-Fiction": 2,
//     "Study": 3,
//   };

//   // ================= CATEGORY MAP =================
//   const categoryMap = {
//     // Fiction
//     "Fantasy": 1,
//     "Mystery": 2,
//     "Romance": 3,
//     "Thriller": 8,
//     "Historical": 9,
//     "Children": 10,
//     "Cook": 11,

//     // Non-Fiction
//     "Biography": 4,
//     "Science": 5,
//     "Selfhelp": 12,
//     "History": 13,
//     "Philosophy": 14,
//     "Travel": 15,
//     "Truecrime": 16,

//     // Study
//     "Mathematics": 6,
//     "Physics": 7,
//     "Economics": 17,
//     "Chemistry": 18,
//     "Biology": 19,
//     "Engineering": 20,
//     "Law": 21,
//   };

//   useEffect(() => {
//     loadBooks();
//   }, []);

//   const loadBooks = async () => {
//     try {
//       const data = await fetchBooks();
//       setBooks(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error(error);
//       setBooks([]);
//     }
//   };

//   const handleAddBook = async () => {
//     if (loading) return;

//     if (!newBook.title || !newBook.author) {
//       alert("Fill required fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         title: newBook.title,
//         author: newBook.author,
//         publisher: newBook.publisher,
//         stock: newBook.stock,
//         section_id: sectionMap[newBook.section],
//         category_id: categoryMap[newBook.category],
//       };

//       console.log("PAYLOAD:", payload);

//       await addBook(payload);

//       await loadBooks();

//       setNewBook({
//         title: "",
//         author: "",
//         publisher: "",
//         stock: 1,
//         section: "Fiction",
//         category: "Fantasy",
//       });

//       alert("Book added successfully");

//     } catch (error) {
//       console.error(error);
//       alert("Error adding book");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteBook = async (id) => {
//     await deleteBook(id);
//     loadBooks();
//   };

//   return (
//     <div className="page">
//       <h2>Records</h2>

//       <div className="form">
//         <input
//           placeholder="Title"
//           value={newBook.title}
//           onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
//         />

//         <input
//           placeholder="Author"
//           value={newBook.author}
//           onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
//         />

//         <input
//           placeholder="Publisher"
//           value={newBook.publisher}
//           onChange={(e) => setNewBook({ ...newBook, publisher: e.target.value })}
//         />

//         <input
//           type="number"
//           value={newBook.stock}
//           onChange={(e) =>
//             setNewBook({ ...newBook, stock: Number(e.target.value) })
//           }
//         />

//         <select
//           value={newBook.section}
//           onChange={(e) =>
//             setNewBook({ ...newBook, section: e.target.value, category: "" })
//           }
//         >
//           <option>Fiction</option>
//           <option>Non-Fiction</option>
//           <option>Study</option>
//         </select>

//         <select
//           value={newBook.category}
//           onChange={(e) =>
//             setNewBook({ ...newBook, category: e.target.value })
//           }
//         >
//           <option>Fantasy</option>
//           <option>Mystery</option>
//           <option>Romance</option>
//           <option>Thriller</option>
//           <option>Biography</option>
//           <option>Science</option>
//           <option>Mathematics</option>
//         </select>

//         <button onClick={handleAddBook} disabled={loading}>
//           {loading ? "Adding..." : "Add Book"}
//         </button>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th><th>Title</th><th>Author</th><th>Stock</th><th>Section</th><th>Category</th><th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {books.map((b) => (
//             <tr key={b.id}>
//               <td>{b.id}</td>
//               <td>{b.title}</td>
//               <td>{b.author}</td>
//               <td>{b.stock}</td>
//               <td>{b.section}</td>
//               <td>{b.category}</td>
//               <td>
//                 <button onClick={() => handleDeleteBook(b.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function Records() {
//   const [sections, setSections] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "", author: "", publisher: "", stock: 1, section_id: "", category_id: "", review: ""
//   });

//   // Step 1: Load sections as soon as I open the page
//   useEffect(() => {
//     axios.get("http://localhost:5000/api/admin/sections")
//       .then(res => setSections(res.data))
//       .catch(err => console.error("Error loading sections", err));
//   }, []);

//   // Step 2: Load categories only after a section is selected
//   useEffect(() => {
//     if (formData.section_id) {
//       axios.get(`http://localhost:5000/api/admin/categories/${formData.section_id}`)
//         .then(res => setCategories(res.data))
//         .catch(err => console.error("Error loading categories", err));
//     } else {
//       setCategories([]);
//     }
//   }, [formData.section_id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/books", formData);
//       alert("Book added! It will now show up for students.");
//       setFormData({ title: "", author: "", publisher: "", stock: 1, section_id: "", category_id: "", review: "" });
//     } catch (err) {
//       alert("Something went wrong with the connection.");
//     }
//   };

//   return (
//     <div className="records-page">
//       <h2>Add New Book Record</h2>
//       <form onSubmit={handleSubmit} className="record-form">
//         <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        
//         {/* Section Selection */}
//         <select value={formData.section_id} onChange={e => setFormData({...formData, section_id: e.target.value})} required>
//           <option value="">Select Section</option>
//           {sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
//         </select>

//         {/* Category Selection (updates based on section) */}
//         <select value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} required disabled={!formData.section_id}>
//           <option value="">Select Category</option>
//           {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
//         </select>

//         <input type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
//         <button type="submit">Add to Database</button>
//       </form>
//     </div>
//   );
// }





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Records.css'; // We are adding this to fix the layout!


const Records = () => {
    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '', author: '', publisher: '', stock: 1, section_id: '', category_id: ''
    });

    // 1. Fetch Sections on load
    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/sections')
            .then(res => setSections(res.data))
            .catch(err => console.error("Error loading sections", err));
    }, []);

    // 2. Fetch Categories when Section changes
    useEffect(() => {
        if (formData.section_id) {
            axios.get(`http://localhost:5000/api/admin/categories/${formData.section_id}`)
                .then(res => setCategories(res.data))
                .catch(err => console.error("Error loading categories", err));
        } else {
            setCategories([]); // Clear if no section is selected
        }
    }, [formData.section_id]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/books', formData);
            alert("Book added successfully!");
            // Reset form after saving
            setFormData({ title: '', author: '', publisher: '', stock: 1, section_id: '', category_id: '' });
        } catch (err) {
            alert("Failed to save book. Check console for details.");
            console.error(err);
        }
    };

    return (
  <div className="records-page">
    <div className="records-container">

      <h2 className="records-title">Records Management</h2>
      <p className="records-subtitle">
        Add new books to the catalog or remove existing records.
      </p>

      <div className="record-card">
        <form onSubmit={handleSave} className="record-form">

          <div className="form-header">
            <h3>Add New Record</h3>
            <p>Enter the details to catalog a new book.</p>
          </div>

          {/* Title */}
          <div className="form-group full">
            <label>Title</label>
            <input
              type="text"
              placeholder="e.g. The Lord of the Rings"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Author + Publisher */}
          <div className="form-row">
            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                placeholder="e.g. J.R.R. Tolkien"
                value={formData.author}
                onChange={e => setFormData({ ...formData, author: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Publisher (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Allen & Unwin"
                value={formData.publisher}
                onChange={e => setFormData({ ...formData, publisher: e.target.value })}
              />
            </div>
          </div>

          {/* Section + Category */}
          <div className="form-row">
            <div className="form-group">
              <label>Section</label>
              <select
                value={formData.section_id}
                onChange={e =>
                  setFormData({
                    ...formData,
                    section_id: e.target.value,
                    category_id: ""
                  })
                }
                required
              >
                <option value="">Select a section</option>
                {sections.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category_id}
                onChange={e =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
                disabled={!formData.section_id}
                required
              >
                <option value="">Select a category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Stock */}
          <div className="form-group">
            <label>Initial Stock</label>
            <input
              type="number"
              min="1"
              value={formData.stock}
              onChange={e => setFormData({ ...formData, stock: e.target.value })}
              required
            />
          </div>

          {/* Button */}
          <div className="form-actions">
            <button type="submit">Add Book Record</button>
          </div>

        </form>
      </div>
    </div>
  </div>
)
}

export default Records;
