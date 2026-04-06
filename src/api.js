const BASE_URL = "http://localhost:5000/api";

// ================= FETCH BOOKS =================
export const fetchBooks = async () => {
  const res = await fetch(`${BASE_URL}/books`);
  const data = await res.json();

  // ensure always array
  return Array.isArray(data) ? data : [];
};

// ================= ADD BOOK =================
export const addBook = async (book) => {
  const res = await fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  return res.json();
};

// ================= DELETE BOOK =================
export const deleteBook = async (id) => {
  await fetch(`${BASE_URL}/books/${id}`, {
    method: "DELETE",
  });
};