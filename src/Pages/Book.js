import React from "react";
import { useParams } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import { useNavigate } from "react-router-dom";
import bookImage from "../assets/book.png";

const Book = ({ book, handleDelete }) => {
  const { books } = useBookContext();
  const { id } = useParams();

  // let book = books.find((b) => b.id === parseInt(id));

  const navigate = useNavigate();

  const editBookDetails = (book) => {
    navigate(`/books/${book.id}/editBook`);
  };

  return (
    <div className="book-page">
      <div className="book-component " style={{ width: "18rem" }}>
        <img src={bookImage} className="card-img-top book-image" alt="..." />
        <div className="book-card">
          <h5 className="card-title">Name: {book.attributes.name}</h5>
          <h5 className="card-title">Author: {book.attributes.author}</h5>
          <h5 className="card-title">Review: {book.attributes.review}</h5>
        </div>
        <div className="edit-delete-btns">
          <button className="edit-btn" onClick={() => editBookDetails(book)}>
            Edit Book
          </button>
          <button onClick={() => handleDelete(book.id)} className="edit-btn">
            Delete Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
