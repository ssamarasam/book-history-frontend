import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../Components/Card";
import { useBookContext } from "../context/BookContext";

// const Book = ({ book, handleDelete, onEdit }) => {
const Book = ({ handleDelete, onEdit }) => {
  const { books } = useBookContext();
  const { id } = useParams();

  let book = books.find((b) => b.id === parseInt(id));
  console.log("book::: ", book);

  return (
    <div>
      <h3>Details of the individual Book </h3>
      <p>Book# {id} </p>

      <p> BookName: {book.attributes.name}</p>
      <Card book={book} handleDelete={handleDelete} onEdit={onEdit} />
    </div>
  );
};

export default Book;
