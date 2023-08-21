import React, { useRef, useState } from "react";

const AddBook = ({ addingBook }) => {
  const [success, setSucess] = useState(false);
  const nameRef = useRef(null);
  const deptRef = useRef(null);
  const book = { name: "", department: "" };

  const handleBookAdd = (e) => {
    e.preventDefault();
    book.name = nameRef.current.value;
    book.department = deptRef.current.value;
    addingBook(book);
    formReset();
    setSucess(true);

    setTimeout(() => {
      setSucess(false);
    }, 5000);
  };

  const formReset = () => {
    nameRef.current.value = "";
    deptRef.current.value = "";
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
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <input
            ref={deptRef}
            type="text"
            className="form-control"
            id="department"
            placeholder="enter department"
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
          Used Added Successfully! Visit books List page to find the newly added
          book.
        </p>
      )}
    </>
  );
};

export default AddBook;
