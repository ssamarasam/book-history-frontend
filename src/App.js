import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Book from "./Pages/Book";
import BooksList from "./Pages/BooksList";
import AddBook from "./Pages/AddBook";
import EditBook from "./Pages/EditBook";
import AuthPage from "./Pages/AuthPage";
import NotFound from "./Pages/NotFound";
import { removeToken } from "./helpers";
import { getToken } from "./helpers";
import { useBookContext } from "./context/BookContext";

const App = () => {
  const [booksList, setBooksList] = useState([]);
  const { books, deleteBook } = useBookContext();
  const [selectedBook, setSelectedBook] = useState({});

  useEffect(() => {
    setBooksList(books);
  }, [books]);

  const navigate = useNavigate();

  const onAdd = (newBook) => {
    let originalBooks = [...booksList];
    const newBooks = [...booksList, { ...newBook, id: books.length + 1 }];
    setBooksList(newBooks);
  };

  const onUpdate = (updatedBook) => {
    let originalBooks = [...books];
    const updatedBooks = booksList.map((u) =>
      u.id === updatedBook.id ? updatedBook : u
    );
    setBooksList(updatedBooks);
    navigate(`/books`);
  };

  const handleDelete = (id) => {
    const originalBooks = [...books];
    const newBooks = booksList.filter((u) => u.id !== id);
    setBooksList(newBooks);
    deleteBook(id);
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
          <button className="logout_button" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books">
          <Route
            index
            element={
              <BooksList
                books={booksList}
                onSelect={(book) => {
                  setSelectedBook(book);
                }}
              />
            }
          />
          <Route
            path=":id"
            element={<Book book={selectedBook} handleDelete={handleDelete} />}
          />
          <Route
            path=":id/editBook"
            element={
              <EditBook selectedBook={selectedBook} onUpdate={onUpdate} />
            }
          />
          <Route path="add" element={<AddBook onAdd={onAdd} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
