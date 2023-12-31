import React, { createContext, useContext, useEffect, useState } from "react";
import http from "../api-service/http";
import { getToken } from "../helpers";
const BookContext = createContext();
const headers = {
  Authorization: `Bearer ${getToken()}`,
};

export const useBookContext = () => {
  return useContext(BookContext);
};

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState("");
  const [nav_value, set_nav_value] = useState("BookList");
  const [bookId, setBookId] = useState("");

  // add new book
  const createNewBook = async (data) => {
    await http.post("/api/books", data, { headers });
  };
  // update a book entry
  const updateBook = async (bookId, data) => {
    await http.put(`/api/books/${bookId}`, data, { headers });
  };
  // get the book data
  const getBookData = async (bookId) => {
    const book = await http.get(`/api/books/${bookId}`);
    const bookData = await book.data.data;
    console.log("book data ", bookData);
    return bookData;
  };
  // delete a book entry
  const deleteBook = async (bookId) => {
    await http.delete(`/api/books/${bookId}`, { headers });
  };
  // change navigation value
  const changeNavValue = (value) => {
    set_nav_value(value);
  };
  // get book id value
  const getBookId = (id) => {
    setBookId(id);
  };

  useEffect(() => {
    const readAllBooks = async () => {
      const response = await http.get("/api/books");
      const responseArr = Object.values(response.data.data);
      setBooks(responseArr);
    };
    return readAllBooks;
  }, []);

  const value = {
    createNewBook,
    books,
    updateBook,
    getBookData,
    deleteBook,
    changeNavValue,
    nav_value,
    getBookId,
    bookId,
  };

  // context provider
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
