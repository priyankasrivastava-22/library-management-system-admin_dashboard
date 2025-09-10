import axios from "axios";

const API = "http://localhost:5000/api";

export const fetchBooks = async () => {
  const res = await axios.get(`${API}/books`);
  return res.data;
};

export const addBook = async (book) => {
  const res = await axios.post(`${API}/books`, book);
  return res.data;
};

export const deleteBook = async (id) => {
  const res = await axios.delete(`${API}/books/${id}`);
  return res.data;
};
