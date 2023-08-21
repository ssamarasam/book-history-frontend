import React, { useRef, useState } from "react";

const EditBook = ({ selectedEditBook, updatingBook }) => {
  const copiedBook = { ...selectedEditBook };
  console.log(selectedEditBook);
  const [success, setSucess] = useState("");
  const nameRef = useRef(null);
  const deptRef = useRef(null);

  const handleBookUpdate = (e) => {
    e.preventDefault();
    let updatedName = nameRef.current.value;
    let updatedDept = deptRef.current.value;
    console.log(updatedName, updatedDept);
    const updatedBook = {
      ...selectedEditBook,
      name: updatedName,
      department: updatedBook,
    };

    updatingBook(updatedBook);
    formReset();
  };

  const formReset = () => {
    nameRef.current.value = "";
    deptRef.current.value = "";
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
          <label htmlFor="department" className="form-label">
            Department
          </label>
          <input
            defaultValue={copiedBook.department}
            ref={deptRef}
            type="text"
            className="form-control"
            id="department"
            placeholder="enter department"
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
