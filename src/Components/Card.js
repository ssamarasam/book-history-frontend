import React from "react";
import { useNavigate } from "react-router-dom";
import bookImage from "../assets/book.png";

const Card = ({ book, handleDelete, onEdit }) => {
  const navigate = useNavigate();

  const editBookDetails = (book) => {
    onEdit(book);
    navigate(`/books/:${book.id}/editBook`);
  };
  return (
    <div className="card card-content" style={{ width: "18rem" }}>
      <img src={bookImage} className="card-img-top book-image" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{book.attributes.name}</h5>
        <h6 className="card-title">author: {book.attributes.author}</h6>
        <p className="card-text">{book.attributes.review}</p>

        <div className="d-flex flex-row">
          <button
            className="btn btn-dark text-white"
            onClick={() => editBookDetails(book)}
          >
            Edit Book
          </button>
          <button
            onClick={() => handleDelete(book)}
            className="btn btn-dark mx-2 text-white"
          >
            Delete Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
