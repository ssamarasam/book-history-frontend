import { Link, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Book from "./Pages/Book";
import AddBook from "./Pages/AddBook";
import "./App.css";
import BooksList from "./Pages/BooksList";

import { useState } from "react";
import NotFound from "./Pages/NotFound";
import { useNavigate } from "react-router-dom";
import EditBook from "./Pages/EditBook";
import AuthPage from "./Pages/AuthPage";
import { removeToken } from "./helpers";
import { getToken } from "./helpers";

const App = () => {
  // const [token, setToken] = useState("");
  const [books, setBooks] = useState([
    { id: "1", name: "harry Potter 1", author: "JK Rwoling" },
    { id: "2", name: "Kural", author: "Valluvar" },
    { id: "3", name: "DSA", author: "BalaGurusamy" },
  ]);

  const [selectedBook, setSelectedBook] = useState("");
  const [selectedEditBook, setSelectedEditBook] = useState("");

  const addingBook = (newBookData) => {
    let originalBooks = [...books];
    setBooks([...books, { ...newBookData, id: books.length + 1 }]);
  };

  const updatingBook = (updatedbook) => {
    let originalBooks = [...books];
    console.log("in updating book: ", updatedbook);
    const updatedBooks = books.map((u) =>
      u.id === updatedbook.id ? updatedbook : u
    );
    console.log("after update: ", updatedBooks);
    setBooks(updatedBooks);
    navigate(`/books`);
  };

  const navigate = useNavigate();

  const handleDelete = (book) => {
    const originalBooks = [...books];
    const updatedBooks = books.filter((u) => u.id !== book.id);
    setBooks(updatedBooks);
    navigate(`/books`);
  };

  const handleUpdate = (book) => {
    const originalBooks = [...books];
    const updatedBooks = books.map((u) => (u.id === book.id ? book : u));
    setBooks(updatedBooks);
    navigate(`/books`);
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login", { replace: true });
  };

  if (!getToken()) {
    return <AuthPage />;
  }

  return (
    <>
      <nav className="navbar">
        <ul className="">
          <li className="">
            <Link to="/">Home</Link>
          </li>

          <li className="">
            <Link to="/books">Books List</Link>
          </li>
          <li className="">
            <Link to="/books/add">Add Book</Link>
          </li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books">
          <Route
            index
            element={
              <BooksList
                books={books}
                onSelect={(book) => {
                  console.log("selected book", book);
                  setSelectedBook(book);
                }}
              />
            }
          />
          <Route
            path=":id"
            element={
              <Book
                book={selectedBook}
                handleDelete={handleDelete}
                onEdit={(book) => setSelectedEditBook(book)}
              />
            }
          />
          <Route
            path=":id/editBook"
            element={
              <EditBook
                selectedEditBook={selectedEditBook}
                updatingBook={updatingBook}
              />
            }
          />
          <Route path="add" element={<AddBook addingBook={addingBook} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
