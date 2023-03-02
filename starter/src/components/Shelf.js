import React from "react";
import Book from "./Book";

export default function Shelf({ bookList, title, onBookShelfChange }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookList.map((book) => {
            return (
              <li key={book.id}>
                <Book book={book} updateBookShelf={onBookShelfChange} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
