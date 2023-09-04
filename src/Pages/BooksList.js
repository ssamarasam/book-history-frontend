import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookImage from "../assets/book.png";

const BooksList = ({ books, onSelect }) => {
  const navigate = useNavigate();
  if (books.length === 0)
    return (
      <div className="alert alert-primary no Books" role="alert">
        No books in database!
      </div>
    );

  return (
    <>
      <ul className="books-list list-group d-flex flex-row flex-wrap">
        {books.map((book) => (
          <li
            className="bookslist list-group-item"
            onClick={() => {
              onSelect(book);
              navigate(`/books/${book.id}`);
            }}
            key={book.id}
          >
            <div className="books-list-box">
              <img
                src={bookImage}
                className="card-img-top book-image"
                alt="..."
              />
              <p className="book-name">{book.attributes.name}</p>
              <p>{book.attributes.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BooksList;
