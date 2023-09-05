import React, { useEffect, useRef, useState } from "react";
import { useBookContext } from "../context/BookContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditBook = ({ selectedBook, onUpdate }) => {
  const { id } = useParams();
  const { updateBook, getBookData } = useBookContext();
  const copiedBook = { ...selectedBook };
  const navigate = useNavigate();

  const [success, setSucess] = useState("");
  const nameRef = useRef(null);
  const authorRef = useRef(null);

  const handleBookUpdate = (e) => {
    e.preventDefault();
    let updatedName = nameRef.current.value;
    let updatedAuthor = authorRef.current.value;

    const updatedBook = {
      ...selectedBook,
      attributes: {
        ...selectedBook.attributes,
        name: updatedName,
        author: updatedAuthor,
      },
    };

    const data = JSON.stringify({
      data: {
        name: updatedName,
        author: updatedAuthor,
      },
    });

    onUpdate(updatedBook);
    updateBook(parseInt(selectedBook.id), data);

    formReset();

    navigate(`/books`);
  };

  const formReset = () => {
    nameRef.current.value = "";
    authorRef.current.value = "";
  };

  return (
    <>
      <form onSubmit={handleBookUpdate}>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">
            Name
          </label>
          <input
            defaultValue={copiedBook.attributes.name}
            ref={nameRef}
            type="text"
            className="form-control"
            id="fullname"
            placeholder="enter full name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            author
          </label>
          <input
            defaultValue={copiedBook.attributes.author}
            ref={authorRef}
            type="text"
            className="form-control"
            id="author"
            placeholder="enter author"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update Book
          </button>
        </div>
      </form>

      {success && (
        <p className="text-primary">
          Book details updated Successfully! Visit Books List page and view the
          book
        </p>
      )}
    </>
  );
};

export default EditBook;
