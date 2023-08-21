import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookImage from "../assets/book.png";

const BooksList = ({ books, onSelect }) => {
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }, [books]);

  const navigate = useNavigate();
  if (books.length === 0)
    return (
      <div class="alert alert-primary no Books" role="alert">
        No books in database!
      </div>
    );

  return (
    <>
      {showAlert && <p>Books List updated!</p>}
      <ul className="userslist list-group d-flex flex-row flex-wrap">
        {books.map((book) => (
          <li
            className="userslist list-group-item"
            onClick={() => {
              onSelect(book);
              navigate(`/books/${book.id}`);
            }}
            key={book.id}
          >
            <div className="users-list-box">
              <img
                src={bookImage}
                className="card-img-top user-image"
                alt="..."
              />
              <p className="user-name">{book.name}</p>
              <p>{book.department}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BooksList;
