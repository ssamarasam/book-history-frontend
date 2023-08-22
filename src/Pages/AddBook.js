import React, { useRef, useState } from "react";

const AddBook = ({ addingBook }) => {
  const [success, setSucess] = useState(false);
  const nameRef = useRef(null);
  const authorRef = useRef(null);
  const book = { name: "", author: "" };

  const handleBookAdd = (e) => {
    e.preventDefault();
    book.name = nameRef.current.value;
    book.author = authorRef.current.value;
    addingBook(book);
    formReset();
    setSucess(true);

    setTimeout(() => {
      setSucess(false);
    }, 5000);
  };

  const formReset = () => {
    nameRef.current.value = "";
    authorRef.current.value = "";
  };

  return (
    <>
      <form onSubmit={handleBookAdd}>
        <div className="mb-3">
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
        <div className="mb-3">
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
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
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
    </>
  );
};

export default AddBook;
