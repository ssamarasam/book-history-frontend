import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../Components/Card";

const Book = ({ book, handleDelete, onEdit }) => {
  const { id } = useParams();

  return (
    <div>
      <h3>Details of the individual Book </h3>
      <p>Book# {id} </p>
      <p> BookName: {book.name}</p>
      <Card book={book} handleDelete={handleDelete} onEdit={onEdit} />
    </div>
  );
};

export default Book;
