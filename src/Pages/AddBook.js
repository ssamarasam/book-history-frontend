import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookContext } from "../context/BookContext";

const AddBook = ({ onAdd }) => {
  const [success, setSucess] = useState(false);
  const nameRef = useRef(null);
  const authorRef = useRef(null);
  const book = { name: "", author: "" };
  const { createNewBook } = useBookContext();
  const navigate = useNavigate();

  const handleBookAdd = (e) => {
    e.preventDefault();
    book.name = nameRef.current.value;
    book.author = authorRef.current.value;

    const data = JSON.stringify({
      data: {
        name: book.name,
        author: book.author,
      },
    });
    let newBook = {
      attributes: {
        name: book.name,
        author: book.author,
      },
    };
    onAdd(newBook);
    createNewBook(data);

    formReset();
    setSucess(true);

    setTimeout(() => {
      setSucess(false);
    }, 5000);
    navigate(`/books`);
  };

  const formReset = () => {
    nameRef.current.value = "";
    authorRef.current.value = "";
  };

  return (
    <section className="add_form">
      <form onSubmit={handleBookAdd}>
        <div className="form-input">
          <label htmlFor="fullname" className="form-label">
            Name
          </label>
          <input
            ref={nameRef}
            type="text"
            className="form-control"
            id="fullname"
            placeholder="enter full name"
            minLength={3}
            required
          />
        </div>
        <div className="form-input">
          <label htmlFor="author" className="form-label">
            author
          </label>
          <input
            ref={authorRef}
            type="text"
            className="form-control"
            id="author"
            placeholder="enter author"
            minLength={3}
            required
          />
        </div>
        <div className="form-input">
          <button type="submit" className="submit-button">
            Add
          </button>
        </div>
      </form>

      {success && (
        <p className="text-primary">
          Book Added Successfully! Visit books List page to find the newly added
          book.
        </p>
      )}
    </section>
  );
};

export default AddBook;
