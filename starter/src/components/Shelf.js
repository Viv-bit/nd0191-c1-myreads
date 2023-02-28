import React from "react";
import Book from "./Book";

export default function Shelf({ bookList, title }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookList.map((book) => {
            return (
              <li>
                <Book book={book} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
