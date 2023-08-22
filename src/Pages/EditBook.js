import React, { useRef, useState } from "react";

const EditBook = ({ selectedEditBook, updatingBook }) => {
  const copiedBook = { ...selectedEditBook };
  console.log(selectedEditBook);
  const [success, setSucess] = useState("");
  const nameRef = useRef(null);
  const authorRef = useRef(null);

  const handleBookUpdate = (e) => {
    e.preventDefault();
    let updatedName = nameRef.current.value;
    let updatedAuthor = authorRef.current.value;
    console.log(updatedName, updatedAuthor);
    const updatedBook = {
      ...selectedEditBook,
      name: updatedName,
      author: updatedAuthor,
    };

    updatingBook(updatedBook);
    formReset();
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
            defaultValue={copiedBook.name}
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
            defaultValue={copiedBook.author}
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
